import Layout from "@/components/Layout";
import Team from "@/components/Team";
import { useEffect } from "react";

export default function TeamPage() {
  
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <Layout>
      <div className="min-h-screen pt-24">
        <Team />
      </div>
    </Layout>
  );
}