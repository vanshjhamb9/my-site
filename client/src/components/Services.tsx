import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { FeatureCard, ProcessSteps } from "./CreativeAssets";
import { useRef, useState } from "react";
import { TechConstellation, DataFlowVisualization } from "./ScrollAnimations";
import { InteractiveServiceGrid } from "./InteractiveAssets";
import { ScrollReveal, StaggeredGrid, MagneticElement } from "./AdvancedScrollAnimations";
import { Icon } from "@iconify/react";
  import { Search, Layout, Code , Rocket, BarChart3, TrendingUp } from "lucide-react";



import { 
  FaMobile, 
  FaBrain, 
  FaDatabase, 
  FaRobot, 
  FaWifi, 
  FaEye, 
  FaLink, 
  FaCubes,
  FaCogs,
  FaGamepad,
  FaShoppingCart,
  FaHome,
  FaGraduationCap,
  FaHeart,
  FaSeedling,
  FaIndustry,
  FaUsers,
  FaCar,
  FaHandshake,
  FaNewspaper,
  FaTractor,
  FaGlobe,
  FaLandmark
} from "react-icons/fa";



// Services
const services = [
  { id: 1, title: "AI Solutions & Integration", description: "Transform your business with intelligent AI systems that automate, optimize, and scale.", icon: "mdi:brain", color: "text-indigo-400", special: true, colSpan: "lg:col-span-2" },
  { id: 2, title: "AI-Powered Mobile Apps", description: "Smart mobile applications that learn, adapt, and deliver personalized experiences.", icon: "mdi:cellphone-nfc", color: "text-blue-400" },
  { id: 3, title: "Web3 & Blockchain Development", description: "Next-generation decentralized applications with blockchain security.", icon: "logos:ethereum", color: "text-purple-400" },
  { id: 4, title: "Computer Vision & ML", description: "Advanced visual recognition and machine learning capabilities.", icon: "mdi:eye-scan", color: "text-cyan-400" },
  { id: 5, title: "Robotics & Automation", description: "Intelligent robotic solutions for enhanced efficiency and precision.", icon: "mdi:robot-industrial", color: "text-pink-400" },
  { id: 6, title: "DevOps & Cyber Security", description: "Secure, scalable infrastructure with robust DevOps practices.", icon: "mdi:shield-lock-outline", color: "text-red-400" },
  { id: 7, title: "IoT Solutions for Connected Enterprises", description: "Smart, secure IoT ecosystems for businesses.", icon: "mdi:access-point-network", color: "text-green-400" },
  { id: 8, title: "Machine Learning & Predictive Analytics", description: "Leverage data-driven models to forecast trends and optimize decisions.", icon: "mdi:chart-timeline-variant-shimmer", color: "text-yellow-400" },
  { id: 9, title: "Computer Vision Implementation", description: "Empower applications with real-time image and video analysis.", icon: "mdi:camera-control", color: "text-orange-400" },
];




// Industries Served
const industries = [
  { name: "HealthTech", icon: FaHeart, color: "text-red-400" },
  { name: "Fintech & BFSI", icon: FaShoppingCart, color: "text-primary" },
  { name: "E-Commerce & D2C", icon: FaShoppingCart, color: "text-secondary" },
  { name: "Real Estate", icon: FaHome, color: "text-accent" },
  { name: "EdTech", icon: FaGraduationCap, color: "text-purple-400" },
  { name: "Travel & Leisure", icon: FaGamepad, color: "text-cyan-400" },
  { name: "Manufacturing", icon: FaIndustry, color: "text-orange-400" },
  { name: "AgriTech", icon: FaSeedling, color: "text-green-500" },

  // New ones you asked for
  { name: "Logistics", icon: FaTractor, color: "text-yellow-500" },
  { name: "Government & PSU", icon: FaLandmark, color: "text-indigo-500" },
  { name: "HR Tech & Job Portals", icon: FaUsers, color: "text-pink-500" },
  { name: "Mobility & MAAS", icon: FaCar, color: "text-blue-500" },
  { name: "Social & Relationship Tech", icon: FaHandshake, color: "text-emerald-500" },
  { name: "Media & Entertainment", icon: FaNewspaper, color: "text-purple-500" },
  { name: "Social Impact", icon: FaGlobe, color: "text-teal-500" },
  { name: "Enabling Smarter Industries", icon: FaCogs, color: "text-gray-500" }
];

export default function Services() {
  const servicesRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: servicesRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={servicesRef} id="services" className="py-20 relative overflow-hidden">
      {/* Background animations */}
      <motion.div style={{ y: backgroundY, opacity }} className="absolute inset-0">
        <TechConstellation />
        <DataFlowVisualization />
      </motion.div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            whileHover={{ scale: 1.02 }}
          >
            Our <span className="logo-text animate-aurora-wave">Services</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            whileHover={{ y: -2 }}
          >
            <span className="text-primary font-semibold">Automate. Optimize. Scale.</span>
            <br />
            Full-Stack Innovation in AI, Mobile, Web & Developer Tools
            <br />
            <em className="text-sm text-accent">Innovation that transforms ideas into impact.</em>
          </motion.p>
        </motion.div>

      

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div key={service.id} className={`glassmorphism-strong p-8 rounded-2xl hover-lift group ${service.colSpan || ""}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.8 }} viewport={{ once: true }} whileHover={{ scale: 1.03 }}>
              <motion.div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 glassmorphism" whileHover={{ rotate: 10, scale: 1.1 }}>
                <Icon icon={service.icon} className={`text-4xl ${service.color} group-hover:drop-shadow-glow animate-float`} />
              </motion.div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Industries Served */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            Industries <span className="text-gradient-visible">We Serve</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                className="glassmorphism p-6 rounded-xl text-center hover-lift group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                data-testid={`card-industry-${industry.name.toLowerCase().replace(' ', '-')}`}
              >
                <industry.icon className={`text-3xl mb-4 mx-auto ${industry.color} group-hover:text-primary transition-colors`} />
                <h4 className="font-semibold text-foreground">{industry.name}</h4>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Our Process */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            Our <span className="text-accent">Development Process</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-12">
            <div>

<ProcessSteps 
  steps={[
    {
      title: "Discovery & Strategy",
      description: "We dive deep into your business needs, analyze requirements, and create a comprehensive strategy aligned with your goals.",
      icon: <Search className="w-6 h-6 text-blue-600" />
    },
    {
      title: "Design & Prototyping", 
      description: "Our team creates intuitive designs and interactive prototypes to visualize your solution before development begins.",
      icon: <Layout className="w-6 h-6 text-purple-600" />
    },
    {
      title: "Development & Testing",
      description: "Using agile methodologies, we build your solution with rigorous testing at every stage to ensure quality and performance.",
      icon: <Code className="w-6 h-6 text-green-600" />
    }
  ]}
/>

             
            </div>
            <div>
            
<ProcessSteps 
  steps={[
    {
      title: "Deployment & Launch",
      description: "We handle the complete deployment process, ensuring smooth launch with minimal downtime and maximum performance.",
      icon: <Rocket className="w-6 h-6 text-orange-600" />
    },
    {
      title: "Support & Optimization",
      description: "Post-launch, we provide ongoing support, monitoring, and optimization to ensure your solution continues to excel.",
      icon: <BarChart3 className="w-6 h-6 text-blue-600" />
    },
    {
      title: "Scale & Evolve",
      description: "As your business grows, we help scale your solution and add new features to meet evolving requirements.",
      icon: <TrendingUp className="w-6 h-6 text-green-600" />
    }
  ]}
/>

            </div>
          </div>
        </motion.div>

        {/* Success Message and CTAs */}
        <motion.div
          className="text-center glassmorphism-strong p-12 rounded-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-6 text-accent">
            Success Where It Matters Most
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We don't just deploy AI; we architect lasting advantages, helping you innovate faster and drive results where it matters most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button 
              className="glassmorphism px-8 py-4 rounded-full text-primary font-semibold hover:bg-primary hover:text-black transition-all duration-300 hover-glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-testid="button-talk-expert"
            >
              Talk to an Expert
            </motion.button>
            <motion.button 
              className="border border-primary px-8 py-4 rounded-full text-primary font-semibold hover:bg-primary hover:text-black transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-testid="button-explore-work"
            >
              Explore How We Work
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}