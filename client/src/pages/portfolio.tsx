import Layout from "@/components/Layout";
import Portfolio from "@/components/Portfolio";

export default function PortfolioPage() {
  return (
    <Layout>
      <div className="min-h-screen pt-24">
        <Portfolio />
      </div>
    </Layout>
  );
}