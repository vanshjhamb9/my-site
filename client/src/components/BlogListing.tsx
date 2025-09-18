import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "wouter";
import { useInView } from "react-intersection-observer";
import { FaClock, FaEye, FaTag, FaCalendarAlt, FaUser } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { BlogPost, BlogCategory } from "@shared/schema";

interface BlogListingProps {
  featured?: boolean;
  limit?: number;
  showFilters?: boolean;
}

export default function BlogListing({ featured = false, limit, showFilters = true }: BlogListingProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Fetch blog posts
  const { data: allPosts = [], isLoading: postsLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog/posts'],
    enabled: true,
  });

  // Filter posts client-side
  const posts = allPosts.filter(post => {
    if (!post.published) return false;
    if (featured && !post.featuredPost) return false;
    return true;
  });

  // Fetch categories
  const { data: categories = [] } = useQuery<BlogCategory[]>({
    queryKey: ['/api/blog/categories'],
    enabled: showFilters,
  });

  // Filter posts
  const filteredPosts = posts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === "all" || post.categoryId === selectedCategory;
      
      return matchesSearch && matchesCategory;
    })
    .slice(0, limit);

  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return "";
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  if (postsLoading) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glassmorphism-strong rounded-3xl p-6 animate-pulse">
              <div className="h-48 bg-muted/20 rounded-xl mb-4" />
              <div className="h-4 bg-muted/20 rounded mb-2" />
              <div className="h-4 bg-muted/20 rounded w-3/4 mb-4" />
              <div className="h-20 bg-muted/20 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-foreground"
            whileHover={{ scale: 1.02 }}
          >
            {featured ? "Featured " : "Latest "}
            <span className="text-primary">Blog Posts</span>
          </motion.h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Insights, innovations, and industry expertise from our team of AI specialists.
          </p>
        </motion.div>

        {/* Filters */}
        {showFilters && (
          <motion.div
            className="glassmorphism-strong p-6 rounded-3xl mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-background/50 border-primary/20"
                  data-testid="input-search-posts"
                />
              </div>
              <div className="md:w-64">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="bg-background/50 border-primary/20" data-testid="select-category">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        {filteredPosts.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-foreground mb-4">No posts found</h3>
            <p className="text-muted-foreground">
              {searchTerm || selectedCategory !== "all" 
                ? "Try adjusting your search or filter criteria." 
                : "Check back soon for new content!"}
            </p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="group"
                data-testid={`card-blog-post-${post.id}`}
              >
                <Link href={`/blog/${post.slug}`}>
                  <motion.div
                    className="glassmorphism-strong rounded-3xl overflow-hidden cursor-pointer h-full flex flex-col"
                    whileHover={{ 
                      scale: 1.02,
                      y: -5,
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Cover Image */}
                    {post.coverImage && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          data-testid={`img-cover-${post.id}`}
                        />
                      </div>
                    )}

                    <div className="p-6 flex-1 flex flex-col">
                      {/* Category Badge */}
                      {post.categoryId && (
                        <div className="mb-3">
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            {categories.find(c => c.id === post.categoryId)?.name || "Uncategorized"}
                          </Badge>
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-muted-foreground mb-4 flex-1 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map((tag, tagIndex) => (
                            <motion.span
                              key={tagIndex}
                              className="inline-flex items-center gap-1 text-xs bg-muted/20 text-muted-foreground px-2 py-1 rounded-full"
                              whileHover={{ scale: 1.05 }}
                            >
                              <FaTag className="text-xs" />
                              {tag}
                            </motion.span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="text-xs text-muted-foreground">
                              +{post.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* Meta Information */}
                      <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-muted/20">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <FaClock className="text-xs" />
                            <span>{post.readTime} min read</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaEye className="text-xs" />
                            <span>{post.viewCount}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaCalendarAlt className="text-xs" />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Load More Button (if limited) */}
        {limit && filteredPosts.length >= limit && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link href="/blog">
              <motion.button
                className="px-8 py-4 bg-primary text-black rounded-xl font-semibold hover:bg-primary/80 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-testid="button-view-all-posts"
              >
                View All Posts →
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}