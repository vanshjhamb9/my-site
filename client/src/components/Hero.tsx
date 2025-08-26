import { motion, useScroll, useTransform } from "framer-motion";
import { FaBrain, FaCogs, FaRocket } from "react-icons/fa";
import { useRef } from "react";
import { FloatingNeuralNetwork, ParticleSystem } from "./ScrollAnimations";
import image1 from "../../../attached_assets/1.svg";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={heroRef} id="home" className="min-h-screen flex items-center relative blob-bg pt-20 marble-bg overflow-hidden">
      {/* Scroll-based background animations */}
      <FloatingNeuralNetwork />
      <ParticleSystem />
      
      <motion.div 
        style={{ y, opacity }} 
        className="container mx-auto px-6 relative z-10"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-black mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              GREAT TECH DOESN'T JUST {" "}
              <span className="text-gradient-visible">
                SOLVE PROBLEMS
              </span>
              <br />
              <motion.span 
                className="text-gradient-visible"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                IT UNDERSTANDS THEM,
              </motion.span>
              <br />
              <motion.span 
                className="text-gradient-visible animate-aurora-wave"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
              >
                ADAPTS, AND EVOLVES WITH YOU.
              </motion.span>
            </motion.h1>
            <motion.div 
              className="glassmorphism-strong p-6 rounded-2xl mb-6 animate-galaxy-pulse"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <motion.p 
                className="text-xl text-primary font-bold mb-2"
                whileHover={{ scale: 1.05 }}
              >
                @ NEURAL CODER AI
              </motion.p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We are more than coders — we are your AI partners.
                <br />
                <span className="text-primary font-semibold">Together we create today and evolve for tomorrow.</span>
              </p>
            </motion.div>
            <motion.div 
              className="grid md:grid-cols-2 gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.div 
                className="glassmorphism p-4 rounded-xl hover-lift"
                whileHover={{ scale: 1.02, rotateY: 2 }}
              >
                <p className="text-sm text-muted-foreground">
                  We build AI-powered products that think, learn, and adapt with you.
                </p>
              </motion.div>
              <motion.div 
                className="glassmorphism p-4 rounded-xl hover-lift"
                whileHover={{ scale: 1.02, rotateY: -2 }}
              >
                <p className="text-sm text-muted-foreground">
                  From smart apps to predictive platforms, we engineer what's next.
                </p>
              </motion.div>
            </motion.div>
            <motion.p 
              className="text-base text-primary font-semibold mb-8 animate-neural-network"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Idea to impact → with clarity and confidence
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <motion.button 
                className="glassmorphism-strong px-8 py-4 rounded-full text-primary font-semibold hover:bg-primary hover:text-black transition-all duration-300 hover-glow animate-galaxy-pulse"
                whileHover={{ scale: 1.05, rotateZ: 2 }}
                whileTap={{ scale: 0.95 }}
                data-testid="button-consultation"
              >
                🚀 Start Your AI Journey
              </motion.button>
              <motion.button 
                className="border border-primary px-8 py-4 rounded-full text-primary font-semibold hover:bg-primary hover:text-black transition-all duration-300 animate-data-flow"
                whileHover={{ scale: 1.05, rotateZ: -2 }}
                whileTap={{ scale: 0.95 }}
                data-testid="button-portfolio"
              >
                🎯 Explore Our Work
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative flex items-center justify-center animate-float"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative w-full h-96 flex items-center justify-center">
              {/* Floating Neural Network Elements */}
              <motion.div 
                className="absolute top-10 left-10 w-4 h-4 bg-primary rounded-full animate-neural-network"
                animate={{
                  x: [0, 20, -10, 0],
                  y: [0, -20, 10, 0],
                  scale: [1, 1.5, 0.8, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute bottom-10 right-10 w-3 h-3 bg-secondary rounded-full animate-neural-network"
                animate={{
                  x: [0, -15, 25, 0],
                  y: [0, 15, -20, 0],
                  scale: [1, 0.5, 2, 1]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute top-1/2 left-1/4 w-2 h-2 bg-accent rounded-full animate-neural-network"
                animate={{
                  rotate: [0, 180, 360],
                  scale: [1, 2, 0.5, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity
                }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/15 rounded-3xl blur-3xl animate-aurora-wave" />
              <motion.div 
                className="relative glassmorphism-strong p-12 rounded-3xl hover-lift animate-galaxy-pulse"
                whileHover={{ rotateY: 10, scale: 1.05, rotateX: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.img 
                  src="https://i.ibb.co/kVgCVqjZ/Untitled-design-1-removebg-previe.png" 
                  alt="Neural Coder AI - Coding the Future"
                  className="w-48 h-48 rounded-2xl shadow-2xl shadow-primary/30"
                  animate={{ 
                    y: [0, -15, 0],
                    rotateY: [0, 10, 0, -10, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
                
                {/* Data Flow Lines */}
                <motion.div 
                  className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-data-flow"
                  animate={{
                    scaleX: [0, 1, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                />
                <motion.div 
                  className="absolute bottom-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent animate-data-flow"
                  animate={{
                    scaleX: [0, 1, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                    delay: 1
                  }}
                />
                
                <motion.div 
                  className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/15 to-accent/20 rounded-3xl"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>
              
              {/* Surprise Elements */}
              <motion.div
                className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-2xl"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 15, -15, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: 2
                }}
              >
                🧠
              </motion.div>
              <motion.div
                className="absolute -bottom-5 right-1/4 text-xl"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.3, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 1
                }}
              >
                ⚡
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}