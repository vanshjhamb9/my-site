import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import { WhyChooseUsSection, StatsCounterSection, ProcessTimelineSection, SuccessStoriesSection } from "@/components/ScrollRevealSections";
import EnhancedPortfolio from "@/components/EnhancedPortfolio";
import EnhancedServices from "@/components/EnhancedServices";
import EnhancedAbout from "@/components/EnhancedAbout";
import ClientLogos from "@/components/ClientLogos";
import Testimonials from "@/components/Testimonials";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Primodia from "@/components/Primodia";
import { useEffect } from "react";


export default function Home() {

   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Hero />
      <StatsCounterSection />
      <WhyChooseUsSection />
      <EnhancedServices />
      <ProcessTimelineSection />
      <Primodia />
      <SuccessStoriesSection />
      <EnhancedPortfolio />
      <EnhancedAbout />
      <ClientLogos />
      <Testimonials />
      <Team />
      <Contact />
    </Layout>
  );
}
