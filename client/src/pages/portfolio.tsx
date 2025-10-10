import Layout from "@/components/Layout";
import Portfolio from "@/components/Portfolio";
import { useEffect } from "react";

export default function PortfolioPage() {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <Layout>
      <div className="min-h-screen pt-24">
        <Portfolio />
      </div>
    </Layout>
  );
}