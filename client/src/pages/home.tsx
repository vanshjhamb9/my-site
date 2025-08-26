import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import { WhyChooseUsSection, StatsCounterSection, ProcessTimelineSection, SuccessStoriesSection } from "@/components/ScrollRevealSections";
import UpdatedPortfolio from "@/components/UpdatedPortfolio";
import Services from "@/components/Services";
import About from "@/components/About";
import ClientLogos from "@/components/ClientLogos";
import Testimonials from "@/components/Testimonials";
import Team from "@/components/Team";
import Contact from "@/components/Contact";


export default function Home() {
  return (
    <Layout>
      <Hero />
      <StatsCounterSection />
      <WhyChooseUsSection />
      <Services />
      <ProcessTimelineSection />
      <SuccessStoriesSection />
      <UpdatedPortfolio />
      <About />
      <ClientLogos />
      <Testimonials />
      <Team />
      <Contact />
    </Layout>
  );
}
