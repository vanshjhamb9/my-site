import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLocation } from "wouter";
import { ScrollReveal, ScrollCounter, MagneticElement, TypewriterText } from "./AdvancedScrollAnimations";
import { FaRocket, FaUsers, FaAward, FaGlobe, FaCode, FaBrain, FaHeart, FaStar } from "react-icons/fa";

const stats = [
  { number: 150, suffix: "+", title: "Projects Delivered", icon: FaRocket },
  { number: 98, suffix: "%", title: "Client Satisfaction", icon: FaHeart },
  { number: 25, suffix: "+", title: "Team Members", icon: FaUsers },
  { number: 12, suffix: "+", title: "Countries Served", icon: FaGlobe }
];

const values = [
  {
    icon: FaBrain,
    title: "Innovation First",
    description: "We push boundaries with cutting-edge AI and emerging technologies to deliver tomorrow's solutions today."
  },
  {
    icon: FaCode,
    title: "Quality Craftsmanship",
    description: "Every line of code is meticulously crafted with attention to detail, performance, and maintainability."
  },
  {
    icon: FaUsers,
    title: "Client Partnership",
    description: "We believe in long-term partnerships, working closely with clients to achieve their vision and goals."
  },
  {
    icon: FaStar,
    title: "Excellence Driven",
    description: "We strive for excellence in everything we do, from initial concept to final deployment and beyond."
  }
];

const ValueCard = ({ value, index }: { value: any, index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      className="professional-card perspective-card p-6 rounded-2xl relative overflow-hidden group"
      initial={{ opacity: 0, x: -50, rotateY: -15 }}
      animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        type: "spring"
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, z: 30 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="relative z-10">
        <motion.div
          className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-4"
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          <value.icon className="text-white text-xl" />
        </motion.div>
        
        <motion.h3
          className="text-xl font-bold text-white mb-3"
          animate={isHovered ? { y: -2 } : { y: 0 }}
        >
          {value.title}
        </motion.h3>
        
        <motion.p
          className="text-muted-foreground leading-relaxed"
          animate={isHovered ? { y: -2 } : { y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {value.description}
        </motion.p>
      </div>
    </motion.div>
  );
};

const StatCard = ({ stat, index }: { stat: any, index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="glassmorphism-strong p-8 rounded-3xl text-center group perspective-card"
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        type: "spring"
      }}
      whileHover={{ 
        scale: 1.05, 
        rotateY: 5,
        boxShadow: "0 20px 40px rgba(0, 71, 171, 0.3)"
      }}
    >
      <motion.div
        className="w-16 h-16 bg-gradient-to-br from-accent to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.8 }}
      >
        <stat.icon className="text-2xl text-white" />
      </motion.div>
      
      <motion.div
        className="text-4xl font-black text-accent mb-2"
        whileHover={{ scale: 1.1 }}
      >
        {isInView && <ScrollCounter end={stat.number} suffix={stat.suffix} />}
      </motion.div>
      
      <p className="text-muted-foreground font-medium">{stat.title}</p>
    </motion.div>
  );
};

export default function EnhancedAbout() {
  const containerRef = useRef<HTMLElement>(null);
  const [, setLocation] = useLocation();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.05]);

  return (
    <motion.section
      ref={containerRef}
      id="about"
      className="py-20 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #000000 0%, #0f0f0f 25%, #1a1a1a 50%, #0f0f0f 75%, #000000 100%)",
        y: backgroundY,
        scale
      }}
      data-testid="about-section"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-3 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <FaRocket className="text-white text-xl" />
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-black text-accent">
                About Us
              </h2>
            </motion.div>
            
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <TypewriterText
                text="We are passionate technologists and AI pioneers, dedicated to transforming businesses through intelligent innovation and cutting-edge solutions."
                className="text-xl text-muted-foreground leading-relaxed"
                speed={30}
              />
            </motion.div>
          </div>
        </ScrollReveal>

        {/* Stats Section */}
        <ScrollReveal direction="up" delay={0.4}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => (
              <StatCard key={stat.title} stat={stat} index={index} />
            ))}
          </div>
        </ScrollReveal>

        {/* Mission Statement */}
        <ScrollReveal direction="left" delay={0.6}>
          <div className="glassmorphism-strong p-12 rounded-3xl mb-20 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent/5 via-secondary/10 to-primary/5"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 10, repeat: Infinity }}
            />
            
            <div className="relative z-10 text-center">
              <motion.h3
                className="text-3xl md:text-4xl font-bold text-accent mb-6"
                whileHover={{ scale: 1.05 }}
              >
                Our Mission
              </motion.h3>
              <motion.p
                className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                To democratize AI technology and empower businesses of all sizes to harness the transformative power of artificial intelligence, creating solutions that not only solve today's challenges but anticipate tomorrow's opportunities.
              </motion.p>
            </div>
          </div>
        </ScrollReveal>

        {/* Values */}
        <ScrollReveal direction="up" delay={0.8}>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-gradient-visible">Core Values</span>
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do and define who we are as a team.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {values.map((value, index) => (
            <ValueCard key={value.title} value={value} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <ScrollReveal direction="up" delay={1}>
          <div className="text-center">
            <motion.div
              className="glassmorphism-strong p-8 rounded-3xl max-w-2xl mx-auto"
              whileHover={{ scale: 1.02, rotateX: 2 }}
            >
              <h3 className="text-2xl font-bold text-accent mb-4">
                Ready to Build the Future Together?
              </h3>
              <p className="text-muted-foreground mb-6">
                Join us on a journey of innovation and technological excellence.
              </p>
              
                <motion.button
                  onClick={() => setLocation('/contact')}
                  className="bg-gradient-to-r from-accent to-secondary text-white px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all duration-300"
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 0 30px rgba(0, 71, 171, 0.5)" 
                  }}
                  whileTap={{ scale: 0.95 }}
                  data-testid="button-get-in-touch"
                >
                  💬 Get in Touch
                </motion.button>
              
            </motion.div>
          </div>
        </ScrollReveal>
      </div>

      {/* Background Pattern */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(0, 71, 171, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(192, 192, 192, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 40% 40%, rgba(0, 71, 171, 0.2) 0%, transparent 50%)`,
          backgroundSize: "600% 600%"
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
    </motion.section>
  );
}