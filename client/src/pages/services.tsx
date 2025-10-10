import Layout from "@/components/Layout";
import Services from "@/components/Services";
import { useEffect } from "react";

export default function ServicesPage() {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <Layout>
      <div className="min-h-screen pt-24">
        <Services />
      </div>
    </Layout>
  );
}