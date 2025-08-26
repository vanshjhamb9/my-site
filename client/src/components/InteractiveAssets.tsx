import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { FaCode, FaMobile, FaBrain, FaCloud, FaShieldAlt, FaRocket } from "react-icons/fa";

// Interactive Service Cards with Hover Effects
export function InteractiveServiceGrid() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const services = [
    {
      id: 1,
      title: "AI Solutions & Integration",
      subtitle: "Automate",
      icon: FaBrain,
      color: "from-primary to-secondary",
      features: ["Machine Learning", "Neural Networks", "Predictive Analytics"]
    },
    {
      id: 2,
      title: "Mobile App Development", 
      subtitle: "Optimize",
      icon: FaMobile,
      color: "from-secondary to-accent",
      features: ["iOS & Android", "Cross-Platform", "AI-Powered Apps"]
    },
    {
      id: 3,
      title: "Full-Stack Development",
      subtitle: "Scale", 
      icon: FaCode,
      color: "from-accent to-primary",
      features: ["Web Apps", "APIs", "Cloud Integration"]
    },
    {
      id: 4,
      title: "Cloud & DevOps",
      subtitle: "Deploy",
      icon: FaCloud,
      color: "from-primary/80 to-secondary/80", 
      features: ["AWS/Azure", "CI/CD", "Infrastructure"]
    },
    {
      id: 5,
      title: "Cybersecurity",
      subtitle: "Secure",
      icon: FaShieldAlt,
      color: "from-secondary/80 to-accent/80",
      features: ["Threat Detection", "Security Audits", "Compliance"]
    },
    {
      id: 6,
      title: "Innovation Lab",
      subtitle: "Innovate",
      icon: FaRocket,
      color: "from-accent/80 to-primary/80",
      features: ["R&D", "Prototyping", "Emerging Tech"]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <motion.div
          key={service.id}
          className="group relative glassmorphism-strong p-6 rounded-2xl cursor-pointer overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          viewport={{ once: true }}
          whileHover={{ 
            scale: 1.05,
            rotateY: 5,
            rotateX: 5,
          }}
          onHoverStart={() => setHoveredCard(service.id)}
          onHoverEnd={() => setHoveredCard(null)}
        >
          {/* Background gradient that changes on hover */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
            animate={{
              scale: hoveredCard === service.id ? 1.1 : 1,
              rotate: hoveredCard === service.id ? 5 : 0,
            }}
          />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <motion.div
                className={`p-3 bg-gradient-to-br ${service.color} rounded-xl`}
                whileHover={{ rotate: 10, scale: 1.1 }}
                animate={{
                  rotateY: hoveredCard === service.id ? 180 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <service.icon className="text-white text-xl" />
              </motion.div>
              <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">
                {service.subtitle}
              </span>
            </div>
            
            <h3 className="font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
              {service.title}
            </h3>
            
            {/* Features list that appears on hover */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: hoveredCard === service.id ? 1 : 0,
                height: hoveredCard === service.id ? "auto" : 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <ul className="space-y-1 text-sm text-muted-foreground">
                {service.features.map((feature, featureIndex) => (
                  <motion.li
                    key={feature}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{
                      x: hoveredCard === service.id ? 0 : -20,
                      opacity: hoveredCard === service.id ? 1 : 0,
                    }}
                    transition={{ delay: featureIndex * 0.1, duration: 0.2 }}
                    className="flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-primary rounded-full" />
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {/* Call to action that appears on hover */}
            <motion.button
              className="mt-4 w-full py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 hover:shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Animated Counter Component
export function AnimatedCounter({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const counter = useTransform(scrollYProgress, [0, 1], [0, value]);
  
  return (
    <div ref={containerRef} className="text-center">
      <motion.div
        className="text-4xl font-bold text-primary mb-2"
        animate={{
          textShadow: [
            "0 0 10px rgba(91, 206, 213, 0.3)",
            "0 0 20px rgba(91, 206, 213, 0.6)",
            "0 0 10px rgba(91, 206, 213, 0.3)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {Math.round(counter.get())}{suffix}
      </motion.div>
    </div>
  );
}

// Floating Call-to-Action
export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  
  // Show CTA when user scrolls down 50%
  const opacity = useTransform(scrollYProgress, [0.3, 0.5, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.3, 0.5], [100, 0]);

  return (
    <motion.div
      ref={ctaRef}
      className="fixed bottom-8 right-8 z-50"
      style={{ opacity, y }}
    >
      <motion.div
        className="glassmorphism-strong p-4 rounded-2xl shadow-2xl max-w-sm"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
          <div>
            <p className="text-sm font-semibold text-foreground">Ready to start?</p>
            <p className="text-xs text-muted-foreground">Let's build something amazing</p>
          </div>
          <motion.button
            className="px-4 py-2 bg-primary text-black rounded-lg text-sm font-semibold hover:bg-primary/80 transition-colors"
            whileHover={{ x: 5 }}
          >
            Get Started →
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Tech Stack Showcase
export function TechStackShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const technologies = [
    { name: "React", icon: "⚛️", category: "Frontend" },
    { name: "Node.js", icon: "🟢", category: "Backend" },
    { name: "Python", icon: "🐍", category: "AI/ML" },
    { name: "AWS", icon: "☁️", category: "Cloud" },
    { name: "Docker", icon: "🐳", category: "DevOps" },
    { name: "TensorFlow", icon: "🧠", category: "AI/ML" },
    { name: "React Native", icon: "📱", category: "Mobile" },
    { name: "PostgreSQL", icon: "🐘", category: "Database" },
  ];

  return (
    <div ref={containerRef} className="py-16 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.h3
          className="text-2xl font-bold text-center mb-12 text-gradient-visible"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our Technology Stack
        </motion.h3>
        
        <div className="relative">
          <motion.div
            className="flex gap-6 will-change-transform"
            style={{
              x: useTransform(scrollYProgress, [0, 1], [200, -200]),
            }}
          >
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="flex-shrink-0 glassmorphism p-6 rounded-xl text-center min-w-[120px] hover-lift"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.1,
                  rotateY: 10,
                  boxShadow: "0 20px 40px rgba(91, 206, 213, 0.2)"
                }}
              >
                <div className="text-3xl mb-2 animate-bounce" style={{ animationDelay: `${index * 0.1}s` }}>
                  {tech.icon}
                </div>
                <h4 className="font-semibold text-foreground text-sm">{tech.name}</h4>
                <p className="text-xs text-primary">{tech.category}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}