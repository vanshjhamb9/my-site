// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  users;
  blogCategories;
  blogPosts;
  blogMedia;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.blogCategories = /* @__PURE__ */ new Map();
    this.blogPosts = /* @__PURE__ */ new Map();
    this.blogMedia = /* @__PURE__ */ new Map();
    this.initializeDefaultCategories();
  }
  initializeDefaultCategories() {
    const defaultCategories = [
      {
        id: randomUUID(),
        name: "Technology",
        slug: "technology",
        description: "Latest trends in technology and AI",
        color: "#3B82F6",
        createdAt: /* @__PURE__ */ new Date()
      },
      {
        id: randomUUID(),
        name: "Innovation",
        slug: "innovation",
        description: "Breakthrough innovations and case studies",
        color: "#8B5CF6",
        createdAt: /* @__PURE__ */ new Date()
      },
      {
        id: randomUUID(),
        name: "Industry Insights",
        slug: "industry-insights",
        description: "Deep dives into industry trends",
        color: "#10B981",
        createdAt: /* @__PURE__ */ new Date()
      }
    ];
    defaultCategories.forEach((category) => {
      this.blogCategories.set(category.id, category);
    });
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = randomUUID();
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Blog Category methods
  async getAllCategories() {
    return Array.from(this.blogCategories.values());
  }
  async getCategory(id) {
    return this.blogCategories.get(id);
  }
  async getCategoryBySlug(slug) {
    return Array.from(this.blogCategories.values()).find((cat) => cat.slug === slug);
  }
  async createCategory(insertCategory) {
    const id = randomUUID();
    const category = {
      ...insertCategory,
      id,
      description: insertCategory.description || null,
      color: insertCategory.color || null,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.blogCategories.set(id, category);
    return category;
  }
  async updateCategory(id, updateData) {
    const category = this.blogCategories.get(id);
    if (!category) return void 0;
    const updatedCategory = { ...category, ...updateData };
    this.blogCategories.set(id, updatedCategory);
    return updatedCategory;
  }
  async deleteCategory(id) {
    return this.blogCategories.delete(id);
  }
  // Blog Post methods
  async getAllPosts(filters) {
    let posts = Array.from(this.blogPosts.values());
    if (filters?.published !== void 0) {
      posts = posts.filter((post) => post.published === filters.published);
    }
    if (filters?.categoryId) {
      posts = posts.filter((post) => post.categoryId === filters.categoryId);
    }
    if (filters?.featured !== void 0) {
      posts = posts.filter((post) => post.featuredPost === filters.featured);
    }
    return posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  async getPost(id) {
    return this.blogPosts.get(id);
  }
  async getPostBySlug(slug) {
    return Array.from(this.blogPosts.values()).find((post) => post.slug === slug);
  }
  async createPost(insertPost) {
    const id = randomUUID();
    const now = /* @__PURE__ */ new Date();
    const post = {
      ...insertPost,
      id,
      viewCount: 0,
      tags: insertPost.tags || [],
      published: insertPost.published || false,
      featuredPost: insertPost.featuredPost || false,
      readTime: insertPost.readTime || 5,
      coverImage: insertPost.coverImage || null,
      categoryId: insertPost.categoryId || null,
      metaTitle: insertPost.metaTitle || null,
      metaDescription: insertPost.metaDescription || null,
      socialImage: insertPost.socialImage || null,
      createdAt: now,
      updatedAt: now,
      publishedAt: insertPost.published ? now : null
    };
    this.blogPosts.set(id, post);
    return post;
  }
  async updatePost(id, updateData) {
    const post = this.blogPosts.get(id);
    if (!post) return void 0;
    const updatedPost = {
      ...post,
      ...updateData,
      updatedAt: /* @__PURE__ */ new Date(),
      publishedAt: updateData.published && !post.published ? /* @__PURE__ */ new Date() : post.publishedAt
    };
    this.blogPosts.set(id, updatedPost);
    return updatedPost;
  }
  async deletePost(id) {
    const mediaItems = Array.from(this.blogMedia.values()).filter((media) => media.blogPostId === id);
    mediaItems.forEach((media) => this.blogMedia.delete(media.id));
    return this.blogPosts.delete(id);
  }
  async incrementViewCount(id) {
    const post = this.blogPosts.get(id);
    if (post) {
      post.viewCount += 1;
      this.blogPosts.set(id, post);
    }
  }
  // Blog Media methods
  async getMediaByPostId(postId) {
    return Array.from(this.blogMedia.values()).filter((media) => media.blogPostId === postId);
  }
  async createMedia(insertMedia) {
    const id = randomUUID();
    const media = {
      ...insertMedia,
      id,
      title: insertMedia.title || null,
      description: insertMedia.description || null,
      altText: insertMedia.altText || null,
      fileSize: insertMedia.fileSize || null,
      mimeType: insertMedia.mimeType || null,
      width: insertMedia.width || null,
      height: insertMedia.height || null,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.blogMedia.set(id, media);
    return media;
  }
  async deleteMedia(id) {
    return this.blogMedia.delete(id);
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var blogCategories = pgTable("blog_categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  color: text("color").default("#3B82F6"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  coverImage: text("cover_image"),
  categoryId: varchar("category_id").references(() => blogCategories.id),
  authorId: varchar("author_id").references(() => users.id).notNull(),
  published: boolean("published").default(false).notNull(),
  featuredPost: boolean("featured_post").default(false).notNull(),
  readTime: integer("read_time").default(5).notNull(),
  // in minutes
  viewCount: integer("view_count").default(0).notNull(),
  tags: text("tags").array().default(sql`'{}'::text[]`),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  socialImage: text("social_image"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var blogMedia = pgTable("blog_media", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  blogPostId: varchar("blog_post_id").references(() => blogPosts.id).notNull(),
  type: text("type").notNull(),
  // 'image', 'video', 'document'
  url: text("url").notNull(),
  title: text("title"),
  description: text("description"),
  altText: text("alt_text"),
  fileSize: integer("file_size"),
  // in bytes
  mimeType: text("mime_type"),
  width: integer("width"),
  height: integer("height"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertBlogCategorySchema = createInsertSchema(blogCategories).omit({
  id: true,
  createdAt: true
});
var insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  viewCount: true
}).extend({
  tags: z.array(z.string()).optional()
});
var insertBlogMediaSchema = createInsertSchema(blogMedia).omit({
  id: true,
  createdAt: true
});

// server/routes.ts
var adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.slice(7);
    if (token === "admin-token-123") {
      return next();
    }
  }
  const adminPassword = req.headers["x-admin-password"];
  if (adminPassword === "admin123") {
    return next();
  }
  return res.status(401).json({ error: "Unauthorized: Admin access required" });
};
async function registerRoutes(app2) {
  app2.get("/api/blog/categories", async (req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });
  app2.get("/api/blog/categories/:id", async (req, res) => {
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
  app2.post("/api/blog/categories", adminAuth, async (req, res) => {
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
  app2.get("/api/blog/posts", async (req, res) => {
    try {
      const { published, categoryId, featured } = req.query;
      const filters = {};
      if (published !== void 0) filters.published = published === "true";
      if (categoryId) filters.categoryId = categoryId;
      if (featured !== void 0) filters.featured = featured === "true";
      const posts = await storage.getAllPosts(filters);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });
  app2.get("/api/blog/posts/:slug", async (req, res) => {
    try {
      const post = await storage.getPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      await storage.incrementViewCount(post.id);
      const media = await storage.getMediaByPostId(post.id);
      res.json({ ...post, media });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch post" });
    }
  });
  app2.post("/api/blog/posts", adminAuth, async (req, res) => {
    try {
      const result = insertBlogPostSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid post data", details: result.error.issues });
      }
      if (!result.data.slug) {
        result.data.slug = result.data.title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").trim();
      }
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
  app2.put("/api/blog/posts/:id", adminAuth, async (req, res) => {
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
  app2.delete("/api/blog/posts/:id", adminAuth, async (req, res) => {
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
  app2.get("/api/blog/posts/:postId/media", async (req, res) => {
    try {
      const media = await storage.getMediaByPostId(req.params.postId);
      res.json(media);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch media" });
    }
  });
  app2.post("/api/blog/media", adminAuth, async (req, res) => {
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
  app2.delete("/api/blog/media/:id", adminAuth, async (req, res) => {
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "3000", 10);
  server.listen({
    port,
    host: "127.0.0.1",
    // or "localhost"
    reusePort: false
    // disable for Windows
  }, () => {
    log(`serving on http://127.0.0.1:${port}`);
  });
})();
