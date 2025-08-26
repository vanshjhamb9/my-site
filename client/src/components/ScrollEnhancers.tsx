import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// Smooth Scroll Indicator
export function SmoothScrollIndicator() {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent z-50 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

// Section Entrance Animation
export function SectionEntrance({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.div>
  );
}

// Magnetic Button
export function MagneticButton({ children, className = "", ...props }: any) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    
    setPosition({ x: deltaX * 0.1, y: deltaY * 0.1 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.button
      ref={buttonRef}
      className={`relative overflow-hidden ${className}`}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// Parallax Text
export function ParallaxText({ children, speed = 0.5 }: { children: React.ReactNode; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}

// Scroll-triggered Counter
export function ScrollCounter({ from, to, duration = 2, suffix = "" }: { from: number; to: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const animatedValue = useTransform(scrollYProgress, [0, 1], [from, to]);

  useEffect(() => {
    const unsubscribe = animatedValue.onChange((latest) => {
      setCount(Math.round(latest));
    });
    return unsubscribe;
  }, [animatedValue]);

  return (
    <span ref={ref} className="text-primary font-bold">
      {count}{suffix}
    </span>
  );
}

// Glitch Text Effect
export function GlitchText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div 
      className={`relative ${className}`}
      whileHover={{
        textShadow: [
          "0 0 0px rgba(91, 206, 213, 0)",
          "2px 0 0px rgba(91, 206, 213, 0.8), -2px 0 0px rgba(156, 39, 176, 0.8)",
          "0 0 0px rgba(91, 206, 213, 0)"
        ]
      }}
      transition={{ duration: 0.3, repeat: 0 }}
    >
      {children}
    </motion.div>
  );
}

// Staggered List Animation
export function StaggeredList({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div 
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggeredItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}