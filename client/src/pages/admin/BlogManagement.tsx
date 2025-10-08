import { useState, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { BlogPost, BlogCategory, InsertBlogPost, InsertBlogCategory } from "@shared/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

type SortField = "date" | "views" | "title";
type SortOrder = "asc" | "desc";

export default function BlogManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [publishedFilter, setPublishedFilter] = useState<"all" | "published" | "draft">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [featuredFilter, setFeaturedFilter] = useState<"all" | "featured" | "not-featured">("all");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  
  const [postDialogOpen, setPostDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [editingCategory, setEditingCategory] = useState<BlogCategory | null>(null);
  
  const { toast } = useToast();

  // Fetch posts
  const { data: posts = [], isLoading: postsLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog/posts"],
  });

  // Fetch categories
  const { data: categories = [], isLoading: categoriesLoading } = useQuery<BlogCategory[]>({
    queryKey: ["/api/blog/categories"],
  });

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = [...posts];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Published filter
    if (publishedFilter === "published") {
      filtered = filtered.filter((post) => post.published);
    } else if (publishedFilter === "draft") {
      filtered = filtered.filter((post) => !post.published);
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((post) => post.categoryId === categoryFilter);
    }

    // Featured filter
    if (featuredFilter === "featured") {
      filtered = filtered.filter((post) => post.featuredPost);
    } else if (featuredFilter === "not-featured") {
      filtered = filtered.filter((post) => !post.featuredPost);
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortField === "date") {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortField === "views") {
        comparison = a.viewCount - b.viewCount;
      } else if (sortField === "title") {
        comparison = a.title.localeCompare(b.title);
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [posts, searchQuery, publishedFilter, categoryFilter, featuredFilter, sortField, sortOrder]);

  // Post mutations
  const createPostMutation = useMutation({
    mutationFn: async (data: InsertBlogPost) => {
      return await apiRequest("POST", "/api/blog/posts", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog/posts"] });
      setPostDialogOpen(false);
      toast({ title: "Success", description: "Blog post created successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create post", variant: "destructive" });
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertBlogPost> }) => {
      return await apiRequest("PUT", `/api/blog/posts/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog/posts"] });
      setPostDialogOpen(false);
      toast({ title: "Success", description: "Blog post updated successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update post", variant: "destructive" });
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/blog/posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog/posts"] });
      toast({ title: "Success", description: "Blog post deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete post", variant: "destructive" });
    },
  });

  const togglePublishedMutation = useMutation({
    mutationFn: async ({ id, published }: { id: string; published: boolean }) => {
      return await apiRequest("PUT", `/api/blog/posts/${id}`, { 
        published,
        publishedAt: published ? new Date() : null 
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog/posts"] });
      toast({ title: "Success", description: "Post status updated" });
    },
  });

  const toggleFeaturedMutation = useMutation({
    mutationFn: async ({ id, featured }: { id: string; featured: boolean }) => {
      return await apiRequest("PUT", `/api/blog/posts/${id}`, { featuredPost: featured });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog/posts"] });
      toast({ title: "Success", description: "Featured status updated" });
    },
  });

  // Category mutations
  const createCategoryMutation = useMutation({
    mutationFn: async (data: InsertBlogCategory) => {
      return await apiRequest("POST", "/api/blog/categories", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog/categories"] });
      setCategoryDialogOpen(false);
      toast({ title: "Success", description: "Category created successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create category", variant: "destructive" });
    },
  });

  const handleDeletePost = (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      deletePostMutation.mutate(id);
    }
  };

  const getCategoryName = (categoryId: string | null) => {
    if (!categoryId) return "Uncategorized";
    const category = categories.find((c) => c.id === categoryId);
    return category?.name || "Unknown";
  };

  return (
    <div className="p-8 space-y-8">
      {/* Blog Posts Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle data-testid="text-blog-posts-title">Blog Posts Management</CardTitle>
            <Button onClick={() => { setEditingPost(null); setPostDialogOpen(true); }} data-testid="button-create-post">
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters and Search */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Input
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search-posts"
            />
            
            <Select value={publishedFilter} onValueChange={(value: any) => setPublishedFilter(value)}>
              <SelectTrigger data-testid="select-filter-published">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger data-testid="select-filter-category">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={featuredFilter} onValueChange={(value: any) => setFeaturedFilter(value)}>
              <SelectTrigger data-testid="select-filter-featured">
                <SelectValue placeholder="Featured" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Posts</SelectItem>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="not-featured">Not Featured</SelectItem>
              </SelectContent>
            </Select>

            <Select value={`${sortField}-${sortOrder}`} onValueChange={(value) => {
              const [field, order] = value.split("-");
              setSortField(field as SortField);
              setSortOrder(order as SortOrder);
            }}>
              <SelectTrigger data-testid="select-sort">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Newest First</SelectItem>
                <SelectItem value="date-asc">Oldest First</SelectItem>
                <SelectItem value="views-desc">Most Views</SelectItem>
                <SelectItem value="views-asc">Least Views</SelectItem>
                <SelectItem value="title-asc">Title A-Z</SelectItem>
                <SelectItem value="title-desc">Title Z-A</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Posts Table */}
          {postsLoading ? (
            <div className="flex justify-center items-center py-12" data-testid="loader-posts">
              <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
          ) : filteredAndSortedPosts.length === 0 ? (
            <div className="text-center py-12 text-slate-500" data-testid="text-no-posts">
              No posts found
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedPosts.map((post) => (
                  <TableRow key={post.id} data-testid={`row-post-${post.id}`}>
                    <TableCell data-testid={`text-post-title-${post.id}`}>{post.title}</TableCell>
                    <TableCell data-testid={`text-post-category-${post.id}`}>
                      {getCategoryName(post.categoryId)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => togglePublishedMutation.mutate({ id: post.id, published: !post.published })}
                        data-testid={`button-toggle-published-${post.id}`}
                      >
                        <Badge variant={post.published ? "default" : "secondary"}>
                          {post.published ? "Published" : "Draft"}
                        </Badge>
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFeaturedMutation.mutate({ id: post.id, featured: !post.featuredPost })}
                        data-testid={`button-toggle-featured-${post.id}`}
                      >
                        {post.featuredPost ? (
                          <Eye className="h-4 w-4 text-yellow-500" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell data-testid={`text-post-views-${post.id}`}>{post.viewCount}</TableCell>
                    <TableCell data-testid={`text-post-date-${post.id}`}>
                      {format(new Date(post.createdAt), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => { setEditingPost(post); setPostDialogOpen(true); }}
                          data-testid={`button-edit-post-${post.id}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeletePost(post.id)}
                          data-testid={`button-delete-post-${post.id}`}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Categories Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle data-testid="text-categories-title">Categories Management</CardTitle>
            <Button onClick={() => { setEditingCategory(null); setCategoryDialogOpen(true); }} data-testid="button-create-category">
              <Plus className="h-4 w-4 mr-2" />
              New Category
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {categoriesLoading ? (
            <div className="flex justify-center items-center py-12" data-testid="loader-categories">
              <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {categories.map((category) => (
                <Card key={category.id} data-testid={`card-category-${category.id}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: category.color || "#3B82F6" }}
                        />
                        <CardTitle className="text-lg" data-testid={`text-category-name-${category.id}`}>
                          {category.name}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400" data-testid={`text-category-desc-${category.id}`}>
                      {category.description || "No description"}
                    </p>
                    <p className="text-xs text-slate-500 mt-2" data-testid={`text-category-slug-${category.id}`}>
                      Slug: {category.slug}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Post Dialog */}
      <PostFormDialog
        open={postDialogOpen}
        onOpenChange={setPostDialogOpen}
        post={editingPost}
        categories={categories}
        onSubmit={(data) => {
          if (editingPost) {
            updatePostMutation.mutate({ id: editingPost.id, data });
          } else {
            createPostMutation.mutate(data as InsertBlogPost);
          }
        }}
        isLoading={createPostMutation.isPending || updatePostMutation.isPending}
      />

      {/* Category Dialog */}
      <CategoryFormDialog
        open={categoryDialogOpen}
        onOpenChange={setCategoryDialogOpen}
        category={editingCategory}
        onSubmit={(data) => {
          createCategoryMutation.mutate(data);
        }}
        isLoading={createCategoryMutation.isPending}
      />
    </div>
  );
}

// Post Form Dialog Component
interface PostFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: BlogPost | null;
  categories: BlogCategory[];
  onSubmit: (data: Partial<InsertBlogPost>) => void;
  isLoading: boolean;
}

function PostFormDialog({ open, onOpenChange, post, categories, onSubmit, isLoading }: PostFormDialogProps) {
  const [formData, setFormData] = useState<Partial<InsertBlogPost>>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    categoryId: "",
    tags: [],
    published: false,
    featuredPost: false,
    metaTitle: "",
    metaDescription: "",
    socialImage: "",
    authorId: "default-author",
  });

  const [tagsInput, setTagsInput] = useState("");

  // Update form when post changes
  useState(() => {
    if (post) {
      setFormData({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage ?? "",
        categoryId: post.categoryId ?? "",
        tags: post.tags ?? [],
        published: post.published,
        featuredPost: post.featuredPost,
        metaTitle: post.metaTitle ?? "",
        metaDescription: post.metaDescription ?? "",
        socialImage: post.socialImage ?? "",
        authorId: post.authorId,
      });
      setTagsInput((post.tags ?? []).join(", "));
    } else {
      setFormData({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        coverImage: "",
        categoryId: "",
        tags: [],
        published: false,
        featuredPost: false,
        metaTitle: "",
        metaDescription: "",
        socialImage: "",
        authorId: "default-author",
      });
      setTagsInput("");
    }
  });

  const handleTitleChange = (title: string) => {
    setFormData({ ...formData, title });
    if (!post) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .trim();
      setFormData((prev) => ({ ...prev, title, slug }));
    }
  };

  const handleSubmit = () => {
    const tags = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    onSubmit({ ...formData, tags });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" data-testid="dialog-post-form">
        <DialogHeader>
          <DialogTitle>{post ? "Edit Blog Post" : "Create Blog Post"}</DialogTitle>
          <DialogDescription>
            {post ? "Update the blog post details" : "Fill in the details to create a new blog post"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter post title"
              data-testid="input-post-title"
            />
          </div>

          <div>
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="post-slug"
              data-testid="input-post-slug"
            />
          </div>

          <div>
            <Label htmlFor="excerpt">Excerpt *</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Brief description of the post"
              rows={3}
              data-testid="textarea-post-excerpt"
            />
          </div>

          <div>
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Write your blog post content here"
              rows={8}
              data-testid="textarea-post-content"
            />
          </div>

          <div>
            <Label htmlFor="coverImage">Cover Image URL</Label>
            <Input
              id="coverImage"
              value={formData.coverImage ?? ""}
              onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
              placeholder="https://example.com/image.jpg"
              data-testid="input-post-cover-image"
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.categoryId ?? ""}
              onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
            >
              <SelectTrigger data-testid="select-post-category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="AI, Technology, Innovation"
              data-testid="input-post-tags"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="published"
              checked={formData.published}
              onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
              data-testid="switch-post-published"
            />
            <Label htmlFor="published">Published</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="featured"
              checked={formData.featuredPost}
              onCheckedChange={(checked) => setFormData({ ...formData, featuredPost: checked })}
              data-testid="switch-post-featured"
            />
            <Label htmlFor="featured">Featured Post</Label>
          </div>

          <div>
            <Label htmlFor="metaTitle">Meta Title (SEO)</Label>
            <Input
              id="metaTitle"
              value={formData.metaTitle ?? ""}
              onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
              placeholder="SEO meta title"
              data-testid="input-post-meta-title"
            />
          </div>

          <div>
            <Label htmlFor="metaDescription">Meta Description (SEO)</Label>
            <Textarea
              id="metaDescription"
              value={formData.metaDescription ?? ""}
              onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
              placeholder="SEO meta description"
              rows={2}
              data-testid="textarea-post-meta-desc"
            />
          </div>

          <div>
            <Label htmlFor="socialImage">Social Image URL (OG)</Label>
            <Input
              id="socialImage"
              value={formData.socialImage ?? ""}
              onChange={(e) => setFormData({ ...formData, socialImage: e.target.value })}
              placeholder="https://example.com/social-image.jpg"
              data-testid="input-post-social-image"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="button-cancel-post">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading} data-testid="button-submit-post">
            {isLoading ? "Saving..." : post ? "Update Post" : "Create Post"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Category Form Dialog Component
interface CategoryFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: BlogCategory | null;
  onSubmit: (data: InsertBlogCategory) => void;
  isLoading: boolean;
}

function CategoryFormDialog({ open, onOpenChange, category, onSubmit, isLoading }: CategoryFormDialogProps) {
  const [formData, setFormData] = useState<InsertBlogCategory>({
    name: "",
    slug: "",
    description: "",
    color: "#3B82F6",
  });

  useState(() => {
    if (category) {
      setFormData({
        name: category.name,
        slug: category.slug,
        description: category.description ?? "",
        color: category.color ?? "#3B82F6",
      });
    } else {
      setFormData({
        name: "",
        slug: "",
        description: "",
        color: "#3B82F6",
      });
    }
  });

  const handleNameChange = (name: string) => {
    setFormData({ ...formData, name });
    if (!category) {
      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .trim();
      setFormData((prev) => ({ ...prev, name, slug }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-testid="dialog-category-form">
        <DialogHeader>
          <DialogTitle>{category ? "Edit Category" : "Create Category"}</DialogTitle>
          <DialogDescription>
            {category ? "Update the category details" : "Create a new blog category"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="cat-name">Name *</Label>
            <Input
              id="cat-name"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Category name"
              data-testid="input-category-name"
            />
          </div>

          <div>
            <Label htmlFor="cat-slug">Slug *</Label>
            <Input
              id="cat-slug"
              value={formData.slug ?? ""}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="category-slug"
              data-testid="input-category-slug"
            />
          </div>

          <div>
            <Label htmlFor="cat-desc">Description</Label>
            <Textarea
              id="cat-desc"
              value={formData.description ?? ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Category description"
              rows={3}
              data-testid="textarea-category-desc"
            />
          </div>

          <div>
            <Label htmlFor="cat-color">Color</Label>
            <Input
              id="cat-color"
              type="color"
              value={formData.color ?? "#3B82F6"}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              data-testid="input-category-color"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="button-cancel-category">
            Cancel
          </Button>
          <Button onClick={() => onSubmit(formData)} disabled={isLoading} data-testid="button-submit-category">
            {isLoading ? "Saving..." : category ? "Update Category" : "Create Category"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
