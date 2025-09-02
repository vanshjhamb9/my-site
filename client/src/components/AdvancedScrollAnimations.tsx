import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

// Parallax text component with word-by-word reveal
export const ParallaxRevealText = ({ 
  text, 
  className = "",
  stagger = 0.1 
}: { 
  text: string; 
  className?: string;
  stagger?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const words = text.split(" ");
  
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      {words.map((word, index) => {
        const start = index / words.length;
        const end = start + 1 / words.length;
        const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
        const y = useTransform(scrollYProgress, [start, end], [50, 0]);
        
        return (
          <motion.span
            key={index}
            style={{ opacity, y }}
            className="inline-block mr-2"
            transition={{ delay: index * stagger }}
          >
            {word}
          </motion.span>
        );
      })}
    </div>
  );
};

// Magnetic hover effect
export const MagneticElement = ({ 
  children, 
  strength = 0.3 
}: { 
  children: React.ReactNode; 
  strength?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const x = useSpring(0, { stiffness: 300, damping: 30 });
  const y = useSpring(0, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    document.addEventListener('mousemove', handleMouseMove);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    document.removeEventListener('mousemove', handleMouseMove);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="cursor-pointer"
    >
      {children}
    </motion.div>
  );
};

// Morphing shapes background
export const MorphingShapes = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const shape1 = useTransform(scrollYProgress, [0, 0.5, 1], [
    "M0,100 C50,0 100,0 200,50 L200,200 L0,200 Z",
    "M0,50 C100,0 150,100 200,100 L200,200 L0,200 Z", 
    "M0,200 C50,100 150,50 200,150 L200,200 L0,200 Z"
  ]);

  const shape2 = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [
    "M50,0 C150,50 200,100 150,200 L0,200 L0,50 Z",
    "M100,0 C200,25 200,75 100,200 L0,200 L0,100 Z",
    "M25,0 C125,75 175,125 125,200 L0,200 L0,25 Z",
    "M75,0 C175,100 150,150 75,200 L0,200 L0,75 Z"
  ]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
        <motion.path
          d={shape1}
          fill="url(#gradient1)"
          opacity={0.1}
        />
        <motion.path
          d={shape2}
          fill="url(#gradient2)"
          opacity={0.08}
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(221, 100%, 34%)" />
            <stop offset="100%" stopColor="hsl(0, 0%, 75%)" />
          </linearGradient>
          <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(0, 0%, 75%)" />
            <stop offset="100%" stopColor="hsl(221, 100%, 34%)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

// Scroll-triggered counter
export const ScrollCounter = ({ 
  end, 
  duration = 2,
  prefix = "",
  suffix = "" 
}: { 
  end: number; 
  duration?: number;
  prefix?: string;
  suffix?: string;
}) => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      let startTime: number | null = null;
      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * end));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [inView, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count}{suffix}
    </span>
  );
};

// Typewriter effect with cursor
export const TypewriterText = ({ 
  text, 
  speed = 50,
  className = "" 
}: { 
  text: string; 
  speed?: number;
  className?: string;
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });

  useEffect(() => {
    if (inView && currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      
      return () => clearTimeout(timer);
    }
  }, [inView, currentIndex, text, speed]);

  return (
    <div ref={ref} className={className}>
      {displayText}
      <motion.span
        className="inline-block w-0.5 h-5 bg-primary ml-1"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </div>
  );
};

// Scroll-triggered reveal with different directions
// export const ScrollReveal = ({ 
//   children, 
//   direction = "up",
//   delay = 0,
//   duration = 0.8,
//   className = ""
// }: { 
//   children: React.ReactNode;
//   direction?: "up" | "down" | "left" | "right";
//   delay?: number;
//   duration?: number;
//   className?: string;
// }) => {
//   const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

//   const variants = {
//     hidden: {
//       opacity: 0,
//       x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
//       y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
//     },
//     visible: {
//       opacity: 1,
//       x: 0,
//       y: 0,
//     }
//   };

//   return (
//     <motion.div
//       ref={ref}
//       initial="hidden"
//       animate={inView ? "visible" : "hidden"}
//       variants={variants}
//       transition={{ duration, delay }}
//       className={className}
//     >
//       {children}
//     </motion.div>
//   );
// };

// Text mask reveal effect
export const TextMaskReveal = ({ 
  text, 
  className = "" 
}: { 
  text: string; 
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  );

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div className="text-muted-foreground/30">{text}</div>
      <motion.div
        className="absolute inset-0 text-primary font-bold"
        style={{ clipPath }}
      >
        {text}
      </motion.div>
    </div>
  );
};

// Staggered grid animation (keeping the existing one for compatibility)
export const StaggeredGrid = ({ 
  children, 
  stagger = 0.1,
  className = "" 
}: { 
  children: React.ReactNode[];
  stagger?: number;
  className?: string;
}) => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: index * stagger, duration: 0.6 }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
};

// ScrollReveal Component for enhanced services
export const ScrollReveal = ({ 
  children, 
  direction = "up", 
  delay = 0, 
  className = "" 
}: { 
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  className?: string;
}) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const variants = {
    up: { y: 50, opacity: 0 },
    down: { y: -50, opacity: 0 },
    left: { x: -50, opacity: 0 },
    right: { x: 50, opacity: 0 }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={variants[direction]}
      animate={inView ? { x: 0, y: 0, opacity: 1 } : {}}
      transition={{ 
        duration: 0.8, 
        delay,
        type: "spring",
        stiffness: 100
      }}
    >
      {children}
    </motion.div>
  );
};

// ScrollCounter Component
// export const ScrollCounter = ({ 
//   end, 
//   start = 0, 
//   duration = 2, 
//   suffix = "", 
//   prefix = "" 
// }: { 
//   end: number;
//   start?: number;
//   duration?: number;
//   suffix?: string;
//   prefix?: string;
// }) => {
//   const [count, setCount] = useState(start);
//   const [ref, inView] = useInView({
//     threshold: 0.5,
//     triggerOnce: true
//   });

//   useEffect(() => {
//     if (!inView) return;

//     let startTime: number;
//     const animate = (timestamp: number) => {
//       if (!startTime) startTime = timestamp;
//       const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
//       const current = Math.floor(progress * (end - start) + start);
//       setCount(current);
      
//       if (progress < 1) {
//         requestAnimationFrame(animate);
//       }
//     };
    
//     requestAnimationFrame(animate);
//   }, [inView, end, start, duration]);

//   return (
//     <span ref={ref}>
//       {prefix}{count}{suffix}
//     </span>
//   );
// };

// TypewriterText Component
// export const TypewriterText = ({ 
//   text, 
//   speed = 50, 
//   className = "",
//   onComplete 
// }: { 
//   text: string;
//   speed?: number;
//   className?: string;
//   onComplete?: () => void;
// }) => {
//   const [displayText, setDisplayText] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [ref, inView] = useInView({
//     threshold: 0.3,
//     triggerOnce: true
//   });

//   useEffect(() => {
//     if (!inView || isTyping) return;

//     setIsTyping(true);
//     let index = 0;
    
//     const timer = setInterval(() => {
//       setDisplayText(text.slice(0, index + 1));
//       index++;
      
//       if (index >= text.length) {
//         clearInterval(timer);
//         setIsTyping(false);
//         onComplete?.();
//       }
//     }, speed);

//     return () => clearInterval(timer);
//   }, [inView, text, speed, isTyping, onComplete]);

//   return (
//     <span ref={ref} className={className}>
//       {displayText}
//       {isTyping && (
//         <motion.span
//           className="inline-block w-0.5 h-5 bg-primary ml-1"
//           animate={{ opacity: [0, 1, 0] }}
//           transition={{ duration: 0.8, repeat: Infinity }}
//         />
//       )}
//     </span>
//   );
// };