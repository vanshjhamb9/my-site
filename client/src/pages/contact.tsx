import Layout from "@/components/Layout";
import Contact from "@/components/Contact";
import { useEffect } from "react";

export default function ContactPage() {

  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  return (
    <Layout>
      <div className="min-h-screen pt-24">
        <Contact />
      </div>
    </Layout>
  );
}