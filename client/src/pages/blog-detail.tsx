import Layout from "@/components/Layout";
import BlogDetail from "@/components/BlogDetail";
import { useEffect } from "react";

export default function BlogDetailPage() {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <Layout>
      <BlogDetail />
    </Layout>
  );
}