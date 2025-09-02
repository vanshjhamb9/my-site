import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { FeatureCard, ProcessSteps } from "./CreativeAssets";
import { useRef, useState } from "react";
import { TechConstellation, DataFlowVisualization } from "./ScrollAnimations";
import { InteractiveServiceGrid } from "./InteractiveAssets";
import { ScrollReveal, StaggeredGrid, MagneticElement } from "./AdvancedScrollAnimations";
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
  FaSeedling
} from "react-icons/fa";

const services = [
  {
    id: 1,
    title: "AI Solutions & Integration",
    description: "Transform your business with intelligent AI systems that automate, optimize, and scale.",
    icon: FaBrain,
    special: true,
    colSpan: "lg:col-span-2"
  },
  {
    id: 2,
    title: "AI-Powered Mobile Apps",
    description: "Smart mobile applications that learn, adapt, and deliver personalized experiences.",
    icon: FaMobile,
    special: false,
    colSpan: ""
  },
  {
    id: 3,
    title: "Custom CRM and Web Application Solutions",
    description: "Complete web solutions built for performance, scalability, and user engagement.",
    icon: FaDatabase,
    special: false,
    colSpan: ""
  },
  {
    id: 4,
    title: "Custom SDKs for All Users",
    description: "Developer-friendly SDKs that make integration seamless and powerful.",
    icon: FaCubes,
    special: false,
    colSpan: ""
  },
  {
    id: 5,
    title: "Web3 & Blockchain Development",
    description: "Next-generation decentralized applications with blockchain security.",
    icon: FaLink,
    special: false,
    colSpan: ""
  },
  {
    id: 6,
    title: "Computer Vision & ML",
    description: "Advanced visual recognition and machine learning capabilities.",
    icon: FaEye,
    special: false,
    colSpan: ""
  },
  {
    id: 7,
    title: "Robotics & Automation",
    description: "Intelligent robotic solutions for enhanced efficiency and precision.",
    icon: FaRobot,
    special: false,
    colSpan: ""
  },
  {
    id: 8,
    title: "DevOps & Cyber Security",
    description: "Secure, scalable infrastructure with robust DevOps practices.",
    icon: FaCogs,
    special: false,
    colSpan: ""
  },
  {
    id: 9,
    title: "IoT Solutions for Connected Enterprises",
    description: "Secure, scalable infrastructure with robust DevOps practices.",
    icon: FaCogs,
    special: false,
    colSpan: ""
  },
  {
    id: 10,
    title: "Machine Learning & Predictive Analytics",
    description: "Leverage data-driven models to forecast trends and optimize decisions.",
    icon: FaCogs,
    special: false,
    colSpan: ""
},
{
    id: 11,
    title: "Computer Vision Implementation",
    description: "Empower applications with real-time image and video analysis.",
    icon: FaCogs,
    special: false,
    colSpan: ""
}

];




const industries = [
  { name: "HealthTech", icon: FaHeart, color: "text-red-400" },
  { name: "Fintech & BFSI", icon: FaShoppingCart, color: "text-primary" },
  { name: "E-Commerce & D2C", icon: FaShoppingCart, color: "text-secondary" },
  { name: "Real Estate", icon: FaHome, color: "text-accent" },
  { name: "EdTech", icon: FaGraduationCap, color: "text-purple-400" },
  { name: "Travel & Leisure", icon: FaGamepad, color: "text-cyan-400" },
  { name: "Manufacturing", icon: FaCubes, color: "text-orange-400" },
  { name: "AgriTech", icon: FaSeedling, color: "text-green-500" }
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
            Our <span className="text-gradient-visible animate-aurora-wave">Services</span>
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
        <div className="mb-16">
          <InteractiveServiceGrid />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20" style={{ display: 'none' }}>
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className={`glassmorphism-strong p-8 rounded-2xl hover-lift group ${service.colSpan} ${
                service.special ? "lg:row-span-1" : ""
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              data-testid={`card-service-${service.id}`}
            >
              <motion.div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${
                  service.special 
                    ? "bg-primary/20 border-2 border-primary" 
                    : "glassmorphism"
                }`}
                whileHover={{ rotate: 10 }}
              >
                <service.icon className={`text-2xl ${
                  service.special ? "text-primary" : "text-primary"
                }`} />
              </motion.div>
              <h3 className={`text-xl font-bold mb-4 ${
                service.special ? "text-primary" : "text-foreground"
              }`}>
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
              {service.special && (
                <motion.button 
                  className="mt-6 px-6 py-2 bg-primary text-black rounded-full font-semibold hover:bg-primary/80 transition-all"
                  whileHover={{ scale: 1.05 }}
                  data-testid="button-book-demo"
                >
                  Book a Demo
                </motion.button>
              )}
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
            Our <span className="text-gradient-visible">Development Process</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <ProcessSteps 
                steps={[
                  {
                    title: "Discovery & Strategy",
                    description: "We dive deep into your business needs, analyze requirements, and create a comprehensive strategy aligned with your goals.",
                    icon: "🔍"
                  },
                  {
                    title: "Design & Prototyping", 
                    description: "Our team creates intuitive designs and interactive prototypes to visualize your solution before development begins.",
                    icon: "🎨"
                  },
                  {
                    title: "Development & Testing",
                    description: "Using agile methodologies, we build your solution with rigorous testing at every stage to ensure quality and performance.",
                    icon: "⚡"
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
                    icon: "🚀"
                  },
                  {
                    title: "Support & Optimization",
                    description: "Post-launch, we provide ongoing support, monitoring, and optimization to ensure your solution continues to excel.",
                    icon: "📈"
                  },
                  {
                    title: "Scale & Evolve",
                    description: "As your business grows, we help scale your solution and add new features to meet evolving requirements.",
                    icon: "🌟"
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
          <h3 className="text-2xl font-bold mb-6 text-primary">
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