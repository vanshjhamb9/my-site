import Layout from "@/components/Layout";
import BlogAdminGate from "@/components/BlogAdminGate";
import { useDocumentMeta } from "@/hooks/use-document-title";
import { useEffect } from "react";

export default function BlogAdminPage() {

  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  // Set document meta for SEO
  useDocumentMeta({
    title: "Blog Admin | Neural Coder AI",
    description: "Blog administration panel for Neural Coder AI website.",
  });

  return (
    <Layout>
      <BlogAdminGate />
    </Layout>
  );
}