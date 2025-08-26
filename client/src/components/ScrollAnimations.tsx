import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FaBrain, FaRocket, FaCogs, FaEye, FaNetworkWired, FaCode, FaMicrochip, FaAtom } from "react-icons/fa";

// Floating Neural Network Animation
export function FloatingNeuralNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        style={{ y, rotate, opacity }}
        className="absolute top-1/4 right-10 w-20 h-20"
      >
        <motion.div
          className="relative w-full h-full"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {/* Neural Network Nodes */}
          <div className="absolute top-0 left-1/2 w-3 h-3 bg-primary rounded-full transform -translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-2 h-2 bg-secondary rounded-full" />
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-accent rounded-full" />
          <div className="absolute top-1/2 left-0 w-2 h-2 bg-primary/70 rounded-full transform -translate-y-1/2" />
          <div className="absolute top-1/2 right-0 w-2 h-2 bg-secondary/70 rounded-full transform -translate-y-1/2" />
          
          {/* Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 80 80">
            <motion.line
              x1="40" y1="6" x2="8" y2="74"
              stroke="currentColor"
              strokeWidth="1"
              className="text-primary/30"
              animate={{
                pathLength: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            />
            <motion.line
              x1="40" y1="6" x2="72" y2="74"
              stroke="currentColor"
              strokeWidth="1"
              className="text-secondary/30"
              animate={{
                pathLength: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
            <motion.line
              x1="8" y1="40" x2="72" y2="40"
              stroke="currentColor"
              strokeWidth="1"
              className="text-accent/30"
              animate={{
                pathLength: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Data Flow Visualization
export function DataFlowVisualization() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [-200, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        style={{ x, opacity }}
        className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
      />
      <motion.div
        style={{ x: useTransform(x, v => v + 100), opacity }}
        className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent mt-4"
      />
      <motion.div
        style={{ x: useTransform(x, v => v - 50), opacity }}
        className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent mt-8"
      />
    </div>
  );
}

// Particle System
export function ParticleSystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const particles = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((i) => {
        const y = useTransform(scrollYProgress, [0, 1], [100 + i * 20, -100 - i * 20]);
        const x = useTransform(scrollYProgress, [0, 1], [Math.sin(i) * 50, Math.cos(i) * 100]);
        const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.8, 0.8, 0]);

        return (
          <motion.div
            key={i}
            style={{ y, x, opacity }}
            className={`absolute w-1 h-1 rounded-full ${
              i % 3 === 0 ? 'bg-primary' : i % 3 === 1 ? 'bg-secondary' : 'bg-accent'
            }`}
            initial={{ 
              left: `${10 + (i * 8) % 80}%`,
              top: `${20 + (i * 15) % 60}%`
            }}
            animate={{
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        );
      })}
    </div>
  );
}

// Tech Icon Constellation
export function TechConstellation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const icons = [
    { Icon: FaBrain, position: { x: 20, y: 30 }, delay: 0 },
    { Icon: FaRocket, position: { x: 80, y: 20 }, delay: 0.2 },
    { Icon: FaCogs, position: { x: 60, y: 60 }, delay: 0.4 },
    { Icon: FaEye, position: { x: 10, y: 70 }, delay: 0.6 },
    { Icon: FaNetworkWired, position: { x: 90, y: 80 }, delay: 0.8 },
    { Icon: FaCode, position: { x: 40, y: 10 }, delay: 1 },
    { Icon: FaMicrochip, position: { x: 70, y: 40 }, delay: 1.2 },
    { Icon: FaAtom, position: { x: 30, y: 90 }, delay: 1.4 }
  ];

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map(({ Icon, position, delay }, index) => {
        const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
        const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

        return (
          <motion.div
            key={index}
            style={{ scale, opacity, y, rotate }}
            className="absolute"
            initial={{ 
              left: `${position.x}%`, 
              top: `${position.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            animate={{
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: delay
            }}
          >
            <div className="p-2 glassmorphism rounded-xl">
              <Icon className="text-primary text-xl animate-pulse" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// Progress Ring Animation
export function ProgressRing({ value, maxValue, label }: { value: string; maxValue: number; label: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, (parseInt(value) / maxValue) * 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);

  return (
    <div ref={containerRef} className="relative w-32 h-32 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 128 128">
        <circle
          cx="64"
          cy="64"
          r="56"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-muted/20"
        />
        <motion.circle
          cx="64"
          cy="64"
          r="56"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-primary"
          strokeLinecap="round"
          style={{
            pathLength: useTransform(progress, [0, 100], [0, 1]),
            opacity
          }}
          initial={{ pathLength: 0 }}
        />
      </svg>
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center"
      >
        <span className="text-2xl font-bold text-primary">{value}</span>
        <span className="text-sm text-muted-foreground">{label}</span>
      </motion.div>
    </div>
  );
}

// Morphing Shape
export function MorphingShape() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  return (
    <div ref={containerRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div style={{ scale }} className="w-40 h-40">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <motion.path
            d="M100,20 C140,20 180,60 180,100 C180,140 140,180 100,180 C60,180 20,140 20,100 C20,60 60,20 100,20 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary/30"
            animate={{
              d: [
                "M100,20 C140,20 180,60 180,100 C180,140 140,180 100,180 C60,180 20,140 20,100 C20,60 60,20 100,20 Z",
                "M100,30 C130,40 170,70 170,100 C170,130 130,160 100,170 C70,160 30,130 30,100 C30,70 70,40 100,30 Z",
                "M100,10 C150,30 190,50 190,100 C190,150 150,170 100,190 C50,170 10,150 10,100 C10,50 50,30 100,10 Z",
                "M100,20 C140,20 180,60 180,100 C180,140 140,180 100,180 C60,180 20,140 20,100 C20,60 60,20 100,20 Z"
              ]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
      </motion.div>
    </div>
  );
}