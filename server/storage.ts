import { 
  type User, 
  type InsertUser,
  type BlogPost,
  type InsertBlogPost,
  type BlogCategory,
  type InsertBlogCategory,
  type BlogMedia,
  type InsertBlogMedia,
  users,
  blogCategories,
  blogPosts,
  blogMedia
} from "@shared/schema";
import { randomUUID } from "crypto";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq, and, desc, sql as drizzleSql } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Blog Category operations
  getAllCategories(): Promise<BlogCategory[]>;
  getCategory(id: string): Promise<BlogCategory | undefined>;
  getCategoryBySlug(slug: string): Promise<BlogCategory | undefined>;
  createCategory(category: InsertBlogCategory): Promise<BlogCategory>;
  updateCategory(id: string, category: Partial<InsertBlogCategory>): Promise<BlogCategory | undefined>;
  deleteCategory(id: string): Promise<boolean>;

  // Blog Post operations
  getAllPosts(filters?: { published?: boolean; categoryId?: string; featured?: boolean }): Promise<BlogPost[]>;
  getPost(id: string): Promise<BlogPost | undefined>;
  getPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createPost(post: InsertBlogPost): Promise<BlogPost>;
  updatePost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deletePost(id: string): Promise<boolean>;
  incrementViewCount(id: string): Promise<void>;

  // Blog Media operations
  getMediaByPostId(postId: string): Promise<BlogMedia[]>;
  createMedia(media: InsertBlogMedia): Promise<BlogMedia>;
  deleteMedia(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private blogCategories: Map<string, BlogCategory>;
  private blogPosts: Map<string, BlogPost>;
  private blogMedia: Map<string, BlogMedia>;

  constructor() {
    this.users = new Map();
    this.blogCategories = new Map();
    this.blogPosts = new Map();
    this.blogMedia = new Map();

    // Add some default categories
    this.initializeDefaultCategories();
  }

  private initializeDefaultCategories() {
    const defaultCategories: BlogCategory[] = [
      {
        id: randomUUID(),
        name: "Technology",
        slug: "technology",
        description: "Latest trends in technology and AI",
        color: "#3B82F6",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        name: "Innovation",
        slug: "innovation",
        description: "Breakthrough innovations and case studies",
        color: "#8B5CF6",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        name: "Industry Insights",
        slug: "industry-insights",
        description: "Deep dives into industry trends",
        color: "#10B981",
        createdAt: new Date(),
      }
    ];

    defaultCategories.forEach(category => {
      this.blogCategories.set(category.id, category);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Blog Category methods
  async getAllCategories(): Promise<BlogCategory[]> {
    return Array.from(this.blogCategories.values());
  }

  async getCategory(id: string): Promise<BlogCategory | undefined> {
    return this.blogCategories.get(id);
  }

  async getCategoryBySlug(slug: string): Promise<BlogCategory | undefined> {
    return Array.from(this.blogCategories.values()).find(cat => cat.slug === slug);
  }

  async createCategory(insertCategory: InsertBlogCategory): Promise<BlogCategory> {
    const id = randomUUID();
    const category: BlogCategory = { 
      ...insertCategory, 
      id, 
      description: insertCategory.description || null,
      color: insertCategory.color || null,
      createdAt: new Date() 
    };
    this.blogCategories.set(id, category);
    return category;
  }

  async updateCategory(id: string, updateData: Partial<InsertBlogCategory>): Promise<BlogCategory | undefined> {
    const category = this.blogCategories.get(id);
    if (!category) return undefined;
    
    const updatedCategory = { ...category, ...updateData };
    this.blogCategories.set(id, updatedCategory);
    return updatedCategory;
  }

  async deleteCategory(id: string): Promise<boolean> {
    return this.blogCategories.delete(id);
  }

  // Blog Post methods
  async getAllPosts(filters?: { published?: boolean; categoryId?: string; featured?: boolean }): Promise<BlogPost[]> {
    let posts = Array.from(this.blogPosts.values());
    
    if (filters?.published !== undefined) {
      posts = posts.filter(post => post.published === filters.published);
    }
    if (filters?.categoryId) {
      posts = posts.filter(post => post.categoryId === filters.categoryId);
    }
    if (filters?.featured !== undefined) {
      posts = posts.filter(post => post.featuredPost === filters.featured);
    }

    return posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getPost(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async getPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }

  async createPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const now = new Date();
    const post: BlogPost = { 
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

  async updatePost(id: string, updateData: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const post = this.blogPosts.get(id);
    if (!post) return undefined;
    
    const updatedPost = { 
      ...post, 
      ...updateData, 
      updatedAt: new Date(),
      publishedAt: updateData.published && !post.published ? new Date() : post.publishedAt
    };
    this.blogPosts.set(id, updatedPost);
    return updatedPost;
  }

  async deletePost(id: string): Promise<boolean> {
    // Also delete associated media
    const mediaItems = Array.from(this.blogMedia.values()).filter(media => media.blogPostId === id);
    mediaItems.forEach(media => this.blogMedia.delete(media.id));
    
    return this.blogPosts.delete(id);
  }

  async incrementViewCount(id: string): Promise<void> {
    const post = this.blogPosts.get(id);
    if (post) {
      post.viewCount += 1;
      this.blogPosts.set(id, post);
    }
  }

  // Blog Media methods
  async getMediaByPostId(postId: string): Promise<BlogMedia[]> {
    return Array.from(this.blogMedia.values()).filter(media => media.blogPostId === postId);
  }

  async createMedia(insertMedia: InsertBlogMedia): Promise<BlogMedia> {
    const id = randomUUID();
    const media: BlogMedia = { 
      ...insertMedia, 
      id, 
      title: insertMedia.title || null,
      description: insertMedia.description || null,
      altText: insertMedia.altText || null,
      fileSize: insertMedia.fileSize || null,
      mimeType: insertMedia.mimeType || null,
      width: insertMedia.width || null,
      height: insertMedia.height || null,
      createdAt: new Date() 
    };
    this.blogMedia.set(id, media);
    return media;
  }

  async deleteMedia(id: string): Promise<boolean> {
    return this.blogMedia.delete(id);
  }
}

// PostgreSQL Database Storage Implementation
export class DatabaseStorage implements IStorage {
  private db;

  constructor() {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not set");
    }
    const queryClient = neon(process.env.DATABASE_URL);
    this.db = drizzle(queryClient);
    
    // Initialize default categories
    this.initializeDefaultCategories();
  }

  private async initializeDefaultCategories() {
    try {
      const existingCategories = await this.db.select().from(blogCategories);
      if (existingCategories.length === 0) {
        const defaultCategories = [
          {
            name: "Technology",
            slug: "technology",
            description: "Latest trends in technology and AI",
            color: "#3B82F6",
          },
          {
            name: "Innovation",
            slug: "innovation",
            description: "Breakthrough innovations and case studies",
            color: "#8B5CF6",
          },
          {
            name: "Industry Insights",
            slug: "industry-insights",
            description: "Deep dives into industry trends",
            color: "#10B981",
          }
        ];
        
        for (const category of defaultCategories) {
          await this.db.insert(blogCategories).values(category);
        }
      }
    } catch (error) {
      console.error("Error initializing default categories:", error);
    }
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Blog Category operations
  async getAllCategories(): Promise<BlogCategory[]> {
    return await this.db.select().from(blogCategories);
  }

  async getCategory(id: string): Promise<BlogCategory | undefined> {
    const result = await this.db.select().from(blogCategories).where(eq(blogCategories.id, id));
    return result[0];
  }

  async getCategoryBySlug(slug: string): Promise<BlogCategory | undefined> {
    const result = await this.db.select().from(blogCategories).where(eq(blogCategories.slug, slug));
    return result[0];
  }

  async createCategory(category: InsertBlogCategory): Promise<BlogCategory> {
    const result = await this.db.insert(blogCategories).values(category).returning();
    return result[0];
  }

  async updateCategory(id: string, category: Partial<InsertBlogCategory>): Promise<BlogCategory | undefined> {
    const result = await this.db
      .update(blogCategories)
      .set(category)
      .where(eq(blogCategories.id, id))
      .returning();
    return result[0];
  }

  async deleteCategory(id: string): Promise<boolean> {
    const result = await this.db.delete(blogCategories).where(eq(blogCategories.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // Blog Post operations
  async getAllPosts(filters?: { published?: boolean; categoryId?: string; featured?: boolean }): Promise<BlogPost[]> {
    let query = this.db.select().from(blogPosts);
    
    const conditions = [];
    if (filters?.published !== undefined) {
      conditions.push(eq(blogPosts.published, filters.published));
    }
    if (filters?.categoryId) {
      conditions.push(eq(blogPosts.categoryId, filters.categoryId));
    }
    if (filters?.featured !== undefined) {
      conditions.push(eq(blogPosts.featuredPost, filters.featured));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }

    const result = await query.orderBy(desc(blogPosts.createdAt));
    return result;
  }

  async getPost(id: string): Promise<BlogPost | undefined> {
    const result = await this.db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return result[0];
  }

  async getPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const result = await this.db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return result[0];
  }

  async createPost(post: InsertBlogPost): Promise<BlogPost> {
    const result = await this.db.insert(blogPosts).values({
      ...post,
      publishedAt: post.published ? new Date() : null
    }).returning();
    return result[0];
  }

  async updatePost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const existing = await this.getPost(id);
    if (!existing) return undefined;

    const result = await this.db
      .update(blogPosts)
      .set({
        ...post,
        updatedAt: new Date(),
        publishedAt: post.published && !existing.published ? new Date() : existing.publishedAt
      })
      .where(eq(blogPosts.id, id))
      .returning();
    return result[0];
  }

  async deletePost(id: string): Promise<boolean> {
    // Delete associated media first
    await this.db.delete(blogMedia).where(eq(blogMedia.blogPostId, id));
    
    const result = await this.db.delete(blogPosts).where(eq(blogPosts.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  async incrementViewCount(id: string): Promise<void> {
    await this.db
      .update(blogPosts)
      .set({ viewCount: drizzleSql`${blogPosts.viewCount} + 1` })
      .where(eq(blogPosts.id, id));
  }

  // Blog Media operations
  async getMediaByPostId(postId: string): Promise<BlogMedia[]> {
    return await this.db.select().from(blogMedia).where(eq(blogMedia.blogPostId, postId));
  }

  async createMedia(media: InsertBlogMedia): Promise<BlogMedia> {
    const result = await this.db.insert(blogMedia).values(media).returning();
    return result[0];
  }

  async deleteMedia(id: string): Promise<boolean> {
    const result = await this.db.delete(blogMedia).where(eq(blogMedia.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }
}

// Use DatabaseStorage if DATABASE_URL is available, otherwise use MemStorage
export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();
