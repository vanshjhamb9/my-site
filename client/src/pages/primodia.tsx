import Layout from "@/components/Layout";
import Primodia from "@/components/Primodia";
import { useEffect } from "react";

export default function PrimodiaPage() {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <Layout>
      <div className="min-h-screen pt-24">
        <Primodia />
      </div>
    </Layout>
  );
}