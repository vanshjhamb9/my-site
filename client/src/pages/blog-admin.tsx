import Layout from "@/components/Layout";
import BlogAdminGate from "@/components/BlogAdminGate";
import { useDocumentMeta } from "@/hooks/use-document-title";

export default function BlogAdminPage() {
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