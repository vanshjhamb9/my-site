import { 
  type User, 
  type InsertUser,
  type BlogPost,
  type InsertBlogPost,
  type BlogCategory,
  type InsertBlogCategory,
  type BlogMedia,
  type InsertBlogMedia
} from "@shared/schema";
import { randomUUID } from "crypto";

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

export const storage = new MemStorage();
