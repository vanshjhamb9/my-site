import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ScrollReveal, StaggeredGrid } from "./AdvancedScrollAnimations";
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
    title: "Full-Stack Web Apps",
    description: "Complete web solutions built for performance, scalability, and user engagement.",
    icon: FaDatabase,
    special: false,
    colSpan: ""
  },
  {
    id: 4,
    title: "IoT Solutions",
    description: "Connect your devices and unlock the power of intelligent automation.",
    icon: FaWifi,
    special: false,
    colSpan: ""
  },
  {
    id: 5,
    title: "Computer Vision",
    description: "Advanced image processing and analysis powered by cutting-edge AI algorithms.",
    icon: FaEye,
    special: false,
    colSpan: ""
  },
  {
    id: 6,
    title: "API Development",
    description: "Robust and scalable APIs that power modern applications and integrations.",
    icon: FaLink,
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

// Enhanced Service Card Component
const EnhancedServiceCard = ({ service, index }: { service: any, index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      className={`professional-card perspective-card p-8 rounded-3xl ${service.colSpan} relative overflow-hidden group cursor-pointer`}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        type: "spring",
        stiffness: 100
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.02,
        rotateY: 5,
        z: 50
      }}
      data-testid={`service-card-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {/* Animated Background Effects */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-primary/20 rounded-3xl"
        animate={{
          scale: isHovered ? 1.1 : 1,
          opacity: isHovered ? 1 : 0.3
        }}
        transition={{ duration: 0.4 }}
      />
      
      {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0 shimmer-effect rounded-3xl opacity-0 group-hover:opacity-100"
        transition={{ duration: 0.3 }}
      />
      
      <div className="relative z-10">
        <motion.div
          className="flex items-center justify-between mb-6"
          animate={isHovered ? { y: -5 } : { y: 0 }}
        >
          <motion.div
            className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-2xl"
            whileHover={{ 
              rotate: 360,
              scale: 1.1,
              boxShadow: "0 0 30px rgba(0, 71, 171, 0.6)"
            }}
            transition={{ duration: 0.6 }}
          >
            <service.icon className="text-2xl text-white" />
          </motion.div>
          
          {service.special && (
            <motion.div
              className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-full text-sm font-bold"
              animate={{ 
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 0 rgba(0, 71, 171, 0)",
                  "0 0 20px rgba(0, 71, 171, 0.4)",
                  "0 0 0 rgba(0, 71, 171, 0)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨ FEATURED
            </motion.div>
          )}
        </motion.div>
        
        <motion.h3
          className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300"
          animate={isHovered ? { x: 5 } : { x: 0 }}
        >
          {service.title}
        </motion.h3>
        
        <motion.p
          className="text-muted-foreground group-hover:text-gray-300 transition-colors duration-300 leading-relaxed"
          animate={isHovered ? { x: 5 } : { x: 0 }}
          transition={{ delay: 0.1 }}
        >
          {service.description}
        </motion.p>
        
        {/* Floating Elements */}
        <motion.div
          className="absolute -top-2 -right-2 w-8 h-8 bg-primary/20 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
};

// Floating Tech Icons
const FloatingTechIcons = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[FaCogs, FaRobot, FaCubes, FaGamepad, FaShoppingCart, FaHome, FaGraduationCap, FaHeart, FaSeedling].map((Icon, index) => (
      <motion.div
        key={index}
        className="absolute"
        style={{
          left: `${10 + (index * 10)}%`,
          top: `${20 + (index % 3) * 30}%`,
        }}
        animate={{
          y: [0, -30, 0],
          rotate: [0, 360],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{
          duration: 8 + index,
          repeat: Infinity,
          delay: index * 0.5
        }}
      >
        <Icon className="text-primary/20 text-3xl" />
      </motion.div>
    ))}
  </div>
);

export default function EnhancedServices() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.section
      ref={containerRef}
      id="services"
      className="py-20 relative overflow-hidden"
      style={{ 
        background: "linear-gradient(135deg, #000000 0%, #0a0a0a 25%, #1a1a1a 50%, #0a0a0a 75%, #000000 100%)",
        y: backgroundY,
        scale,
        opacity
      }}
      data-testid="services-section"
    >
      <FloatingTechIcons />
      
      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal direction="up" delay={0.2}>
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-3 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <FaCogs className="text-white text-xl" />
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-black text-gradient-visible">
                Our Offerings
              </h2>
            </motion.div>
            
            <motion.p
              className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              We create intelligent solutions that transform businesses and empower growth through cutting-edge technology.
            </motion.p>
          </div>
        </ScrollReveal>

        {/* Enhanced Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            
              <EnhancedServiceCard service={service} index={index} />
           
          ))}
        </div>

        {/* Call to Action */}
        <ScrollReveal direction="up" delay={0.8}>
          <div className="text-center">
            <motion.div
              className="glassmorphism-strong p-8 rounded-3xl max-w-2xl mx-auto"
              whileHover={{ scale: 1.02, rotateX: 2 }}
            >
              <h3 className="text-2xl font-bold text-primary mb-4">
                Ready to Transform Your Vision?
              </h3>
              <p className="text-muted-foreground mb-6">
                Let's discuss how our AI-powered solutions can accelerate your business growth.
              </p>
             
                <motion.button
                  className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 71, 171, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  data-testid="button-start-project"
                >
                  🚀 Start Your Project
                </motion.button>
              
            </motion.div>
          </div>
        </ScrollReveal>
      </div>

      {/* Background Tech Constellation */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(0, 71, 171, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(192, 192, 192, 0.1) 0%, transparent 50%)`,
          backgroundSize: "400% 400%"
        }}
      />
    </motion.section>
  );
}