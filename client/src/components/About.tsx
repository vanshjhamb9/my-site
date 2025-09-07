import { motion, useScroll, useTransform } from "framer-motion";
import { FaLightbulb, FaUsers, FaCogs, FaStar, FaBullseye, FaEye } from "react-icons/fa";
import LogoComponent from "./LogoComponent";
import { AIBrainNetwork, CircuitBoard, HolographicInterface } from "./CustomIllustrations";
import { useRef } from "react";
import { TechStackShowcase } from "./InteractiveAssets";
import { AnimatedCountryFlags } from "./CountryFlags";

export default function About() {
  const aboutRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={aboutRef} id="about" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Mission and Vision Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div className="glassmorphism-strong p-8 rounded-2xl hover-lift mb-8">
              <FaBullseye className="text-4xl text-primary mb-4" />
              <h3 className="text-2xl font-bold text-primary mb-4 animate-aurora-wave">Our Mission</h3>
              <h2 className="text-3xl font-bold mb-6">
                Smart choice: Partner with experts who build AI that learns, adapts, and safeguards your future.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-primary">Expertise:</strong> Powered by top-tier talent, we engineer intelligent systems built to last.
                <br /><br />
                <strong className="text-primary">Security:</strong> Your data's safety is our priority — trusted, robust, and built with integrity.
              </p>
            </motion.div>

            <motion.div 
              className="glassmorphism-strong p-8 rounded-2xl hover-lift"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <FaEye className="text-4xl text-primary mb-4" />
              <h3 className="text-2xl font-bold text-primary mb-4 animate-galaxy-pulse">Our Vision</h3>
              <motion.p 
                className="text-lg text-primary font-bold italic animate-neural-network"
                whileHover={{ scale: 1.05 }}
              >
                "AI isn't the enemy — it's your advantage. Own it or fall behind."
              </motion.p>
              <p className="text-sm text-muted-foreground mt-2">
                - Isaac John, 2025
              </p>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="glassmorphism-strong p-8 rounded-3xl text-center"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex flex-col items-center mb-8">
                <LogoComponent size="lg" showText={false} animate={true} className="mb-4" />
                <h2 className="text-4xl font-bold text-gradient-visible">Neural Coder AI</h2>
              </div>
              <div className="space-y-6">
                <motion.p 
                  className="text-lg text-primary font-semibold animate-data-flow"
                  whileHover={{ scale: 1.05 }}
                >
                  🌏 Rooted in India, Reaching the World
                </motion.p>
                <motion.p 
                  className="text-lg font-bold text-gradient-visible"
                  whileHover={{ scale: 1.05 }}
                >
                  150+ Projects to 10 Countries
                </motion.p>
                <motion.p 
                  className="text-base text-muted-foreground"
                  whileHover={{ scale: 1.05 }}
                >
                  Innovation that transforms ideas into impact.
                </motion.p>
                <div className="mt-8 pt-8 border-t border-primary/20">
                  <p className="text-xl font-bold text-foreground">
                    We don't just build software—we invest our vision in your journey.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Partners Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl font-bold mb-4"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-primary">Global Reach</span>
          </motion.h2>
          <p className="text-xl text-muted-foreground mb-12">
            <span className="text-primary font-semibold">Empowering industries, one innovation at a time</span>
          </p>
          <div className="glassmorphism-strong p-12 rounded-3xl">
            <AnimatedCountryFlags />
          </div>
        </motion.div>

        {/* Tech Stack Section */}
        <TechStackShowcase />

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button 
              className="glassmorphism-strong px-8 py-4 rounded-full text-primary font-semibold hover:bg-primary hover:text-black transition-all duration-300 hover-glow animate-galaxy-pulse"
              whileHover={{ scale: 1.05, rotateZ: 2 }}
              whileTap={{ scale: 0.95 }}
              data-testid="button-meet-team"
            >
              🚀 Meet Our Team
            </motion.button>
            <motion.button 
              className="border border-primary px-8 py-4 rounded-full text-primary font-semibold hover:bg-primary hover:text-black transition-all duration-300 animate-data-flow"
              whileHover={{ scale: 1.05, rotateZ: -2 }}
              whileTap={{ scale: 0.95 }}
              data-testid="button-collaborate"
            >
              💡 Start Your Project
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}