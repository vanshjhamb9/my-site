import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBlogPostSchema, insertBlogCategorySchema, insertBlogMediaSchema, contactFormSchema } from "@shared/schema";
import { getUncachableResendClient } from "./resend-client";

// Admin authentication middleware using environment variables
const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  // Check for Bearer token from environment
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7);
    const adminToken = process.env.ADMIN_TOKEN;
    if (adminToken && token === adminToken) {
      return next();
    }
  }
  
  // Check for session-based auth from environment
  const adminPassword = req.headers['x-admin-password'];
  const envAdminPassword = process.env.ADMIN_PASSWORD;
  if (envAdminPassword && adminPassword === envAdminPassword) {
    return next();
  }
  
  return res.status(401).json({ error: 'Unauthorized: Admin access required' });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Blog Categories API
  app.get("/api/blog/categories", async (req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  app.get("/api/blog/categories/:id", async (req, res) => {
    try {
      const category = await storage.getCategory(req.params.id);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch category" });
    }
  });

  app.post("/api/blog/categories", adminAuth, async (req, res) => {
    try {
      const result = insertBlogCategorySchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid category data", details: result.error.issues });
      }
      
      const category = await storage.createCategory(result.data);
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ error: "Failed to create category" });
    }
  });

  // Blog Posts API
  app.get("/api/blog/posts", async (req, res) => {
    try {
      const { published, categoryId, featured } = req.query;
      const filters: any = {};
      
      if (published !== undefined) filters.published = published === 'true';
      if (categoryId) filters.categoryId = categoryId as string;
      if (featured !== undefined) filters.featured = featured === 'true';
      
      const posts = await storage.getAllPosts(filters);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });

  app.get("/api/blog/posts/:slug", async (req, res) => {
    try {
      const post = await storage.getPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      
      // Increment view count
      await storage.incrementViewCount(post.id);
      
      // Get associated media
      const media = await storage.getMediaByPostId(post.id);
      
      res.json({ ...post, media });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch post" });
    }
  });

  app.post("/api/blog/posts", adminAuth, async (req, res) => {
    try {
      const result = insertBlogPostSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid post data", details: result.error.issues });
      }
      
      // Generate slug from title if not provided
      if (!result.data.slug) {
        result.data.slug = result.data.title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .trim();
      }
      
      // Check if slug already exists
      const existingPost = await storage.getPostBySlug(result.data.slug);
      if (existingPost) {
        result.data.slug = `${result.data.slug}-${Date.now()}`;
      }
      
      const post = await storage.createPost(result.data);
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to create post" });
    }
  });

  app.put("/api/blog/posts/:id", adminAuth, async (req, res) => {
    try {
      const result = insertBlogPostSchema.partial().safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid post data", details: result.error.issues });
      }
      
      const post = await storage.updatePost(req.params.id, result.data);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to update post" });
    }
  });

  app.delete("/api/blog/posts/:id", adminAuth, async (req, res) => {
    try {
      const success = await storage.deletePost(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Post not found" });
      }
      
      res.json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete post" });
    }
  });

  // Blog Media API
  app.get("/api/blog/posts/:postId/media", async (req, res) => {
    try {
      const media = await storage.getMediaByPostId(req.params.postId);
      res.json(media);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch media" });
    }
  });

  app.post("/api/blog/media", adminAuth, async (req, res) => {
    try {
      const result = insertBlogMediaSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid media data", details: result.error.issues });
      }
      
      const media = await storage.createMedia(result.data);
      res.status(201).json(media);
    } catch (error) {
      res.status(500).json({ error: "Failed to create media" });
    }
  });

  app.delete("/api/blog/media/:id", adminAuth, async (req, res) => {
    try {
      const success = await storage.deleteMedia(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Media not found" });
      }
      
      res.json({ message: "Media deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete media" });
    }
  });

  // Contact Form API
  app.post("/api/contact", async (req, res) => {
    try {
      const result = contactFormSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          error: "Invalid form data", 
          details: result.error.issues 
        });
      }

      const { name, email, businessNeeds, message } = result.data;
      
      // Get Resend client and send email
      const { client, fromEmail } = await getUncachableResendClient();
      
      // Send email to sales team
      const emailResponse = await client.emails.send({
        from: fromEmail || 'onboarding@resend.dev',
        to: 'sales@neuralcoderai.com',
        subject: `New Contact Inquiry from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Business Needs:</strong> ${businessNeeds}</p>
          <p><strong>Message:</strong> ${message || 'No message provided'}</p>
          <hr>
          <p><small>This email was sent from the contact form on your website.</small></p>
        `,
      });

      res.status(200).json({ 
        success: true, 
        message: "Your message has been sent successfully! We'll get back to you soon." 
      });
    } catch (error: any) {
      console.error("Contact form error:", error);
      res.status(500).json({ 
        error: "Failed to send message. Please try again later.",
        details: error.message 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
