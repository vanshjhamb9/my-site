import Layout from "@/components/Layout";
import About from "@/components/About";
import { useEffect } from "react";

export default function AboutPage() {

  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <Layout>
      <div className="min-h-screen pt-24">
        <About />
      </div>
    </Layout>
  );
}