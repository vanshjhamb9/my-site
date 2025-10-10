import Layout from "@/components/Layout";
import BlogListing from "@/components/BlogListing";
import { useDocumentMeta } from "@/hooks/use-document-title";
import { useEffect } from "react";

export default function BlogPage() {

  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  // Set document meta for SEO
  useDocumentMeta({
    title: "Blog | Neural Coder AI - AI Technology Insights",
    description: "Explore the latest insights, innovations, and industry expertise from Neural Coder AI's team of specialists in artificial intelligence and technology.",
    url: typeof window !== 'undefined' ? window.location.href : '',
  });

  return (
    <Layout>
      <BlogListing showFilters={true} />
    </Layout>
  );
}