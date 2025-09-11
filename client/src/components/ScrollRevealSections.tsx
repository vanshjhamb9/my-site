import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { FaCheck, FaArrowRight, FaStar, FaLightbulb, FaBullseye, FaUsers } from "react-icons/fa";
import growth from "../image/profit-growth.png"
import twentyseven from "../image/24-7.png"
import satisfaction from "../image/satisfaction-guaranteed.png"
import experience from "../image/certification.png"
import { 
  Lightbulb, 
  PenTool, 
  Code, 
  Bug, 
  Rocket, 
  LifeBuoy  
} from "lucide-react";

import { 
  SiTensorflow, 
  SiEthereum, 
  SiAdobecreativecloud, 
  SiAmazon, 
  SiCoursera, 
  SiAntdesign, 
  SiRaspberrypi, 
  SiVirtualbox, 
  SiChainlink 
} from "react-icons/si";


// Why Choose Us Section
export function WhyChooseUsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const reasons = [
    {
      title: "Smart Choice",
      description: "Partner with experts who build AI that learns, adapts, and safeguards your future.",
      icon: FaLightbulb,
      color: "text-primary"
    },
    {
      title: "Expertise", 
      description: "Powered by top-tier talent, we engineer intelligent systems built to last.",
      icon: FaBullseye,
      color: "text-secondary"
    },
    {
      title: "Security",
      description: "Your data's safety is our priority — trusted, robust, and built with integrity.",
      icon: FaCheck,
      color: "text-accent"
    },

  ];

  return (
    <div ref={containerRef} className="py-20 relative overflow-hidden">
      <motion.div style={{ y, opacity, scale }} className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why <span className="text-gradient-visible animate-aurora-wave">Choose Us?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Partner with experts who build AI that learns, adapts, and safeguards your future.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              className="glassmorphism-strong p-8 rounded-2xl hover-lift group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                boxShadow: "0 20px 40px rgba(91, 206, 213, 0.2)"
              }}
            >
              <motion.div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${reason.color} bg-current/10 group-hover:bg-current/20 transition-all duration-300`}
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <reason.icon className={`text-2xl ${reason.color}`} />
              </motion.div>
              <h3 className="text-xl font-bold mb-4 text-foreground">
                {reason.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ 
            rotate: useTransform(scrollYProgress, [0, 1], [0, 180]),
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5])
          }}
          className="absolute top-1/4 right-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-xl"
        />
        <motion.div
          style={{ 
            rotate: useTransform(scrollYProgress, [0, 1], [180, 0]),
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 1])
          }}
          className="absolute bottom-1/4 left-10 w-24 h-24 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-lg"
        />
      </div>
    </div>
  );
}

// Stats Counter Section
export function StatsCounterSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const stats = [
    { value: "150+", label: "Projects to 10 Countries", icon: growth},
    { value: "100%", label: "Client Satisfaction", icon: satisfaction },
    { value: "24/7", label: "Expert Support", icon: twentyseven },
    { value: "10+", label: "Years Experience", icon: experience }
  ];

  return (
    <div ref={containerRef} className="py-16 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="glassmorphism-strong p-12 rounded-3xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-br from-[#FF671F] via-[#FFFFFF] to-[#046A38] text-transparent bg-clip-text">
  Rooted in India, Reaching the World
</h2>




            <p className="text-lg text-muted-foreground">
              Innovation that transforms ideas into impact
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const springValue = useSpring(0, { 
                stiffness: 100, 
                damping: 30,
                restDelta: 0.001
              });

              return (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      delay: index * 0.1,
                      duration: 0.6,
                      onComplete: () => {
                        if (stat.value.includes('+')) {
                          const numValue = parseInt(stat.value);
                          springValue.set(numValue);
                        }
                      }
                    }
                  }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="mb-2 flex justify-center text-#FFFFFF">
  <img src={stat.icon} alt={stat.label} className="h-20 w-20 object-contain animate-bounce" />
</div>

                  <div className="text-3xl font-bold text-primary mb-2">
                    {stat.value.includes('+') ? (
                      <motion.span>
                        {Math.round(springValue.get())}{stat.value.slice(-1)}
                      </motion.span>
                    ) : (
                      stat.value
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
"use client";


// Process Timeline Section
export function ProcessTimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const steps = [
    {
      title: "Get the Gist",
      description:
        "We dive deep into your vision and figure out exactly what you need — no guessing games.",
      icon: Lightbulb,
      phase: "Discover & Design",
    },
    {
      title: "Dream & Scheme",
      description:
        "Wireframes, blueprints, and bold plans come to life. Because great design is everything.",
      icon: PenTool,
      phase: "Design & Prototype",
    },
    {
      title: "Robust Software Build",
      description:
        "We build it, break it, and rebuild it until it's flawless. Agile? We run it flawlessly.",
      icon: Code,
      phase: "Develop & Integrate",
    },
    {
      title: "Test Till It's Tight",
      description:
        "Bugs don't stand a chance. We stress-test, hack-test, and user-test till it's rock solid.",
      icon: Bug,
      phase: "Test & Refine",
    },
    {
      title: "Launch, Love & Scale",
      description:
        "Live and kicking! But we don't ghost — continuous tweaks and loving care keep it fresh.",
      icon: Rocket,
      phase: "Deploy & Evolve",
    },
    {
      title: "Support & Evolve",
      description:
        "Post-launch, we're your tech partner, offering support, updates, and upgrades that keep you ahead.",
      icon: LifeBuoy,
      phase: "Support & Grow",
    },
  ];

  const lineProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our{" "}
            <span className="text-gradient-visible animate-aurora-wave">
              Process
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our development approach blends structure with flexibility,
            ensuring clear milestones alongside continuous iteration.
          </p>
        </motion.div>

        <div className="relative">
          {/* Static background line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-muted/20 transform -translate-x-1/2" />
          {/* Animated progress line */}
          <motion.div
            className="absolute left-1/2 top-0 w-px bg-primary transform -translate-x-1/2"
            style={{ height: lineProgress }}
          />

          <div className="space-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div
                    className={`flex-1 ${
                      index % 2 === 0 ? "text-right" : "text-left"
                    }`}
                  >
                    <motion.div
                      className="glassmorphism-strong p-6 rounded-2xl hover-lift"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="text-sm text-primary font-semibold mb-2">
                        {step.phase}
                      </div>
                      <h3 className="text-xl font-bold mb-4 text-accent">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Center icon */}
                  <motion.div
                    className="relative z-10 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileInView={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      delay: index * 0.1 + 0.3,
                      duration: 0.6,
                    }}
                    viewport={{ once: true }}
                  >
                    <Icon className="w-8 h-8" />
                    <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20" />
                  </motion.div>

                  <div className="flex-1" /> {/* Spacer */}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Success Stories Carousel
export function SuccessStoriesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });


const stories = [
  {
    title: "AI-Powered Health Assistant",
    description: "500,000+ users getting personalized health insights daily",
    tech: "Machine Learning • Mobile App",
    impact: "500K+ Active Users",
    icon: SiTensorflow,
  },
  {
    title: "Blockchain Casino Platform",
    description: "Decentralized gaming with cryptocurrency integration",
    tech: "Web3 • Blockchain • DeFi",
    impact: "Secure Gaming",
    icon: SiEthereum,
  },
  {
    title: "Creative AI Art Generator",
    description: "AI-powered digital art creation for artists and hobbyists",
    tech: "Computer Vision • AI Art",
    impact: "Creative Innovation",
    icon: SiAdobecreativecloud,
  },
  {
    title: "Smart Retail Analytics",
    description: "Helping 1,000+ stores boost sales with AI-driven insights",
    tech: "AI • Cloud • Big Data",
    impact: "30% Revenue Growth",
    icon: SiAmazon,
  },
  {
    title: "EdTech Learning Platform",
    description: "Interactive video courses with adaptive learning paths",
    tech: "E-Learning • AI • Web Platform",
    impact: "1M+ Students Trained",
    icon: SiCoursera,
  },
  {
    title: "FinTech Fraud Detection",
    description: "AI engine reducing fraud detection time by 80%",
    tech: "Big Data • AI • FinTech",
    impact: "80% Faster Detection",
    icon: SiAntdesign,
  },
  {
    title: "IoT Smart Farming",
    description: "Precision farming with smart sensors and automation",
    tech: "IoT • Cloud • Agriculture",
    impact: "40% Yield Increase",
    icon: SiRaspberrypi, // used instead of non-existent SiIot
  },
  {
    title: "AR/VR Fitness App",
    description: "Immersive workouts with VR-powered fitness experiences",
    tech: "AR/VR • Mobile App",
    impact: "Engaging 200K+ Users",
    icon: SiVirtualbox,
  },
  {
    title: "Supply Chain Optimizer",
    description: "Reducing logistics delays using AI-driven forecasting",
    tech: "AI • Blockchain • SaaS",
    impact: "25% Faster Deliveries",
    icon: SiChainlink,
  },
];

  const x = useTransform(scrollYProgress, [0, 1], [0, -300]);

  return (
    <div ref={containerRef} className="py-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Success <span className="text-gradient-visible animate-aurora-wave">Stories</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Take a look at how we've made impact across different sectors
          </p>
        </motion.div>

        <motion.div 
          className="flex gap-8"
          style={{ x }}
        >
          {stories.map((story, index) => (
            <motion.div
              key={story.title}
              className="flex-shrink-0 w-80 glassmorphism-strong p-8 rounded-2xl hover-lift"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="text-primary font-semibold text-sm mb-2">{story.tech}</div>
              <h3 className="text-xl font-bold mb-4 text-foreground">{story.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{story.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-primary font-semibold">{story.impact}</span>
                <FaArrowRight className="text-primary" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}