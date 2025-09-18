import { motion } from "framer-motion";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaPlus, FaSave, FaEye, FaTrash, FaEdit } from "react-icons/fa";
import { insertBlogPostSchema, type InsertBlogPost, type BlogPost, type BlogCategory } from "@shared/schema";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

// Form schema for UI (separate from API schema)
const blogPostFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  coverImage: z.string().optional(),
  categoryId: z.string().optional(),
  published: z.boolean().optional().default(false),
  featuredPost: z.boolean().optional().default(false),
  readTime: z.number().min(1).optional().default(5),
  tagsInput: z.string().optional(), // String input that we'll split
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  socialImage: z.string().optional(),
});

type BlogPostFormData = z.infer<typeof blogPostFormSchema>;

export default function BlogAdmin() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch posts and categories
  const { data: posts = [] } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog/posts'],
  });

  const { data: categories = [] } = useQuery<BlogCategory[]>({
    queryKey: ['/api/blog/categories'],
  });

  // Form setup
  const form = useForm<BlogPostFormData>({
    resolver: zodResolver(blogPostFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      coverImage: "",
      categoryId: "",
      published: false,
      featuredPost: false,
      readTime: 5,
      tagsInput: "",
      metaTitle: "",
      metaDescription: "",
      socialImage: "",
    },
  });

  // Mutations
const createPostMutation = useMutation({
  mutationFn: (data: InsertBlogPost) => {
    const token = localStorage.getItem("token"); // or wherever you store admin token after login

    return apiRequest("POST", "/api/blog/posts", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["/api/blog/posts"] });
    form.reset();
    setIsCreating(false);
    toast({
      title: "Post created!",
      description: "Your blog post has been created successfully.",
    });
  },
  onError: (error: any) => {
    toast({
      title: "Error",
      description:
        error?.response?.data?.error || "Failed to create post. Please try again.",
      variant: "destructive",
    });
  },
});


  const updatePostMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InsertBlogPost> }) =>
      apiRequest('PUT', `/api/blog/posts/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog/posts'] });
      form.reset();
      setEditingPost(null);
      toast({
        title: "Post updated!",
        description: "Your blog post has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update post. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: (id: string) => apiRequest('DELETE', `/api/blog/posts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog/posts'] });
      toast({
        title: "Post deleted!",
        description: "Your blog post has been deleted.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete post. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: BlogPostFormData) => {
    // Transform form data to API format
    const postData: InsertBlogPost = {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      authorId: "admin", // Default author for now
      tags: data.tagsInput ? data.tagsInput.split(',').map(tag => tag.trim()).filter(Boolean) : [],
      coverImage: data.coverImage || undefined,
      categoryId: data.categoryId || undefined,
      published: data.published || false,
      featuredPost: data.featuredPost || false,
      readTime: data.readTime || 5,
      metaTitle: data.metaTitle || undefined,
      metaDescription: data.metaDescription || undefined,
      socialImage: data.socialImage || undefined,
    };

    if (editingPost) {
      updatePostMutation.mutate({ id: editingPost.id, data: postData });
    } else {
      createPostMutation.mutate(postData);
    }
  };

  const startEditing = (post: BlogPost) => {
    setEditingPost(post);
    setIsCreating(true);
    form.reset({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage || "",
      categoryId: post.categoryId || "",
      published: post.published,
      featuredPost: post.featuredPost,
      readTime: post.readTime,
      tagsInput: post.tags?.join(', ') || "",
      metaTitle: post.metaTitle || "",
      metaDescription: post.metaDescription || "",
      socialImage: post.socialImage || "",
    });
  };

  const cancelEditing = () => {
    setIsCreating(false);
    setEditingPost(null);
    form.reset();
  };

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Blog Administration</h1>
          {!isCreating && (
            <Button
              onClick={() => setIsCreating(true)}
              className="bg-primary text-black hover:bg-primary/80"
              data-testid="button-create-post"
            >
              <FaPlus className="mr-2" />
              Create New Post
            </Button>
          )}
        </div>

        {/* Create/Edit Form */}
        {isCreating && (
          <motion.div
            className="glassmorphism-strong rounded-3xl p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                {editingPost ? "Edit Post" : "Create New Post"}
              </h2>
              <Button
                variant="outline"
                onClick={cancelEditing}
                data-testid="button-cancel-edit"
              >
                Cancel
              </Button>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Title */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter post title..."
                            {...field}
                            data-testid="input-post-title"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Slug */}
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="post-url-slug"
                            {...field}
                            data-testid="input-post-slug"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Excerpt */}
                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Excerpt</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Brief description of the post..."
                          rows={3}
                          {...field}
                          data-testid="textarea-post-excerpt"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Content */}
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write your post content here..."
                          rows={12}
                          {...field}
                          data-testid="textarea-post-content"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Category */}
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-post-category">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Read Time */}
                  <FormField
                    control={form.control}
                    name="readTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Read Time (minutes)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 5)}
                            data-testid="input-read-time"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Tags */}
                <FormField
                  control={form.control}
                  name="tagsInput"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags (comma-separated)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="AI, Technology, Innovation"
                          {...field}
                          data-testid="input-post-tags"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Cover Image */}
                <FormField
                  control={form.control}
                  name="coverImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cover Image URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/image.jpg"
                          {...field}
                          data-testid="input-cover-image"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Toggles */}
                <div className="flex gap-6">
                  <FormField
                    control={form.control}
                    name="published"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-2">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="switch-published"
                          />
                        </FormControl>
                        <FormLabel>Published</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="featuredPost"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-2">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="switch-featured"
                          />
                        </FormControl>
                        <FormLabel>Featured Post</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={createPostMutation.isPending || updatePostMutation.isPending}
                    className="bg-primary text-black hover:bg-primary/80"
                    data-testid="button-save-post"
                  >
                    <FaSave className="mr-2" />
                    {editingPost ? "Update Post" : "Create Post"}
                  </Button>
                </div>
              </form>
            </Form>
          </motion.div>
        )}

        {/* Posts List */}
        <div className="grid gap-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              className="glassmorphism-strong rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              data-testid={`card-admin-post-${post.id}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-foreground">{post.title}</h3>
                    {post.published && (
                      <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                        Published
                      </Badge>
                    )}
                    {post.featuredPost && (
                      <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground mb-3">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Views: {post.viewCount}</span>
                    <span>Read time: {post.readTime} min</span>
                    {post.tags && post.tags.length > 0 && (
                      <span>Tags: {post.tags.join(", ")}</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => startEditing(post)}
                    data-testid={`button-edit-${post.id}`}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deletePostMutation.mutate(post.id)}
                    disabled={deletePostMutation.isPending}
                    data-testid={`button-delete-${post.id}`}
                  >
                    <FaTrash />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}