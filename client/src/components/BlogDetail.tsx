import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { useInView } from "react-intersection-observer";
import { FaClock, FaEye, FaTag, FaCalendarAlt, FaUser, FaArrowLeft, FaShare } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SocialShareButtons } from "@/components/SocialShare";
import { useDocumentMeta } from "@/hooks/use-document-title";
import type { BlogPost, BlogCategory } from "@shared/schema";

export default function BlogDetail() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Fetch blog post
  const { data: postData, isLoading: postLoading, error } = useQuery<BlogPost & { media?: any[] }>({
    queryKey: ['/api/blog/posts', slug],
    enabled: !!slug,
  });

  // Fetch categories
  const { data: categories = [] } = useQuery<BlogCategory[]>({
    queryKey: ['/api/blog/categories'],
  });

  // Fetch all posts for related posts filtering
  const { data: allPosts = [] } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog/posts'],
    enabled: !!postData?.categoryId,
  });

  // Filter related posts client-side
  const relatedPosts = allPosts.filter(post => 
    post.published && 
    post.categoryId === postData?.categoryId && 
    post.id !== postData?.id
  );

  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return "";
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  // Set document meta for SEO
  useDocumentMeta({
    title: postData ? `${postData.title} | Neural Coder AI Blog` : 'Blog | Neural Coder AI',
    description: postData?.metaDescription || postData?.excerpt || undefined,
    image: postData?.socialImage || postData?.coverImage || undefined,
    url: currentUrl,
  });

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button data-testid="button-back-to-blog">
              <FaArrowLeft className="mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (postLoading) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Loading skeleton */}
          <div className="animate-pulse">
            <div className="h-8 bg-muted/20 rounded w-1/4 mb-6" />
            <div className="h-12 bg-muted/20 rounded w-3/4 mb-4" />
            <div className="h-6 bg-muted/20 rounded w-1/2 mb-8" />
            <div className="h-64 bg-muted/20 rounded-xl mb-8" />
            <div className="space-y-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-4 bg-muted/20 rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!postData) return null;

  const categoryName = categories.find(c => c.id === postData.categoryId)?.name;
  const filteredRelatedPosts = relatedPosts.slice(0, 3);

  return (
    <motion.div
      className="min-h-screen py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Back Button */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/blog">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground" data-testid="button-back-to-blog">
              <FaArrowLeft className="mr-2" />
              Back to Blog
            </Button>
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.header
          className="mb-12"
          ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Category Badge */}
          {categoryName && (
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {categoryName}
              </Badge>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            data-testid="text-post-title"
          >
            {postData.title}
          </motion.h1>

          {/* Excerpt */}
          <motion.p
            className="text-xl text-muted-foreground mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {postData.excerpt}
          </motion.p>

          {/* Meta Information */}
          <motion.div
            className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <FaCalendarAlt />
              <span>{formatDate(postData.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock />
              <span>{postData.readTime} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEye />
              <span>{postData.viewCount} views</span>
            </div>
          </motion.div>

          {/* Tags */}
          {postData.tags && postData.tags.length > 0 && (
            <motion.div
              className="flex flex-wrap gap-2 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {postData.tags.map((tag, index) => (
                <motion.span
                  key={index}
                  className="inline-flex items-center gap-1 text-sm bg-muted/20 text-muted-foreground px-3 py-1 rounded-full"
                  whileHover={{ scale: 1.05 }}
                  data-testid={`tag-${tag}`}
                >
                  <FaTag className="text-xs" />
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          )}

          {/* Social Share */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <SocialShareButtons
              url={currentUrl}
              title={postData.title}
              description={postData.excerpt}
            />
          </motion.div>
        </motion.header>

        {/* Cover Image */}
        {postData.coverImage && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="rounded-3xl overflow-hidden glassmorphism">
              <img
                src={postData.coverImage}
                alt={postData.title}
                className="w-full h-auto"
                data-testid="img-cover-image"
              />
            </div>
          </motion.div>
        )}

        {/* Article Content */}
        <motion.article
          className="glassmorphism-strong rounded-3xl p-8 md:p-12 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div 
            className="prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80"
            dangerouslySetInnerHTML={{ __html: postData.content }}
            data-testid="content-post-body"
          />
        </motion.article>

        {/* Social Share Footer */}
        <motion.div
          className="glassmorphism-strong rounded-3xl p-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center justify-center gap-2">
              <FaShare />
              Share this post
            </h3>
            <SocialShareButtons
              url={currentUrl}
              title={postData.title}
              description={postData.excerpt}
              size="lg"
            />
          </div>
        </motion.div>

        {/* Related Posts */}
        {filteredRelatedPosts.length > 0 && (
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-8">Related Posts</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {filteredRelatedPosts.map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                  data-testid={`card-related-post-${relatedPost.id}`}
                >
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <motion.div
                      className="glassmorphism rounded-xl p-4 cursor-pointer h-full"
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {relatedPost.coverImage && (
                        <img
                          src={relatedPost.coverImage}
                          alt={relatedPost.title}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                      )}
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                        <FaClock />
                        <span>{relatedPost.readTime} min read</span>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </motion.div>
  );
}