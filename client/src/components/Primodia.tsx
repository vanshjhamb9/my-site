import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FaCrown, FaRocket, FaNetworkWired, FaBrain, FaGem, FaLightbulb } from "react-icons/fa";

// Premium animated background component
const PremiumBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Floating diamonds */}
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-4 h-4 border border-primary rounded-full"
        style={{
          left: `${10 + (i * 12)}%`,
          top: `${20 + (i % 3) * 30}%`,
        }}
        animate={{
          y: [0, -30, 0],
          rotate: [0, 180, 360],
          scale: [0.5, 1, 0.5],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{
          duration: 4 + i,
          repeat: Infinity,
          delay: i * 0.5,
          ease: "easeInOut"
        }}
      />
    ))}
    
    {/* Premium gradient mesh */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/10 to-primary/5 animate-pulse" />
    
    {/* Floating particles */}
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={`particle-${i}`}
        className="absolute w-1 h-1 bg-primary rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -50, 0],
          x: [0, Math.random() * 20 - 10, 0],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 6 + Math.random() * 4,
          repeat: Infinity,
          delay: Math.random() * 2
        }}
      />
    ))}
  </div>
);

// Feature card component with luxury animations
const PrimordiaFeature = ({ icon: Icon, title, description, delay }: {
  icon: any, title: string, description: string, delay: number
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="relative glassmorphism-strong p-8 rounded-2xl hover-lift group cursor-pointer"
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      whileHover={{ 
        scale: 1.05, 
        rotateY: 5,
        boxShadow: "0 25px 50px rgba(0, 71, 171, 0.3)"
      }}
      data-testid={`primodia-feature-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
      
      <motion.div 
        className="relative z-10"
        whileHover={{ scale: 1.1 }}
      >
        <motion.div
          className="w-16 h-16 bg-gradient-to-br from-accent to-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-primary/50 transition-all duration-300"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <Icon className="text-2xl text-white" />
        </motion.div>
        
        <h3 className="text-xl font-bold text-accent mb-4 group-hover:text-white transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-muted-foreground group-hover:text-gray-200 transition-colors duration-300">
          {description}
        </p>
      </motion.div>
      
      {/* Animated border effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-primary opacity-0 group-hover:opacity-100"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

export default function Primodia() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

  const features = [
    {
      icon: FaBrain,
      title: "Bespoke Mentorship",
      description: "Learn from India's brightest minds in tech and business with personalized guidance tailored to your unique journey."
    },
    {
      icon: FaRocket,
      title: "Strategic Support",
      description: "From market entry to scaling, get hands-on help for every growth stage with proven frameworks and methodologies."
    },
    {
      icon: FaNetworkWired,
      title: "VC Introductions",
      description: "Meet the investors who power innovation through our exclusive network of venture capitalists and angel investors."
    },
    {
      icon: FaLightbulb,
      title: "Domain Consulting",
      description: "Specialized advice tailored to your sector from industry experts with deep domain knowledge and experience."
    }
  ];

  return (
    <motion.section
      ref={sectionRef}
      id="primodia"
      className="min-h-screen py-20 relative overflow-hidden"
      style={{ 
        background: "linear-gradient(135deg, #000000 0%, #0a0a0a 25%, #1a1a1a 50%, #0a0a0a 75%, #000000 100%)",
        y: backgroundY,
        scale,
        opacity
      }}
      data-testid="primodia-section"
    >
      <PremiumBackground />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header with crown animation */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="inline-flex items-center gap-4 mb-8"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaCrown className="text-4xl text-primary" />
            </motion.div>
            <motion.h2
              className="text-5xl md:text-7xl font-black text-accent"
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(0, 71, 171, 0.5)",
                  "0 0 40px rgba(0, 71, 171, 0.8)",
                  "0 0 20px rgba(0, 71, 171, 0.5)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              PRIMODIA
            </motion.h2>
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
               <FaCrown className="text-4xl text-accent" />
            </motion.div>
          </motion.div>
          
          <motion.div
            className="glassmorphism-strong p-6 rounded-2xl max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.p
              className="text-2xl font-bold text-primary mb-4"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              (Invite-Only)
            </motion.p>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Unlock elite mentorship, strategic guidance, and exclusive connections.
            </p>
          </motion.div>
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <PrimordiaFeature
              key={feature.title}
              {...feature}
              delay={index * 0.2}
            />
          ))}
        </div>

        {/* Success message with premium animation */}
        <motion.div
          className="glassmorphism-strong p-12 rounded-3xl text-center mb-12 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          whileHover={{ scale: 1.02, rotateX: 2 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/20 to-primary/10"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          
          <motion.p
            className="text-2xl md:text-3xl font-bold text-accent leading-relaxed relative z-10"
            animate={{
              scale: [1, 1.02, 1],
              textShadow: [
                "0 0 10px rgba(0, 71, 171, 0.3)",
                "0 0 20px rgba(0, 71, 171, 0.6)",
                "0 0 10px rgba(0, 71, 171, 0.3)"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Primodia is the inner circle for founders who want more
            <br />
            <span className="text-secondary">more impact, more clarity, more network.</span>
          </motion.p>
        </motion.div>

        {/* Premium CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <motion.button
            className="glassmorphism-strong px-12 py-6 rounded-full text-lg font-bold text-primary border-2 border-primary relative overflow-hidden group"
            whileHover={{ scale: 1.05, rotateZ: 1 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setHoveredButton("apply")}
            onHoverEnd={() => setHoveredButton(null)}
            data-testid="button-apply-invite"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-20 transition-opacity duration-300"
            />
            <motion.span
              className="relative z-10 flex items-center gap-3"
              animate={hoveredButton === "apply" ? { x: [0, 5, 0] } : {}}
              transition={{ duration: 0.5 }}
            >
              <FaCrown className="text-xl" />
              Apply for Invite
            </motion.span>
          </motion.button>

          
        </motion.div>
      </div>
    </motion.section>
  );
}