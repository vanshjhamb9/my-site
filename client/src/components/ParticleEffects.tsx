import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { FaCode, FaBrain, FaCogs, FaRocket, FaAtom, FaGem } from "react-icons/fa";

// Advanced Particle System
export const AdvancedParticleSystem = () => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    speed: number;
    direction: number;
  }>>([]);

  useEffect(() => {
    const particleCount = 50;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 1,
      color: Math.random() > 0.5 ? "rgba(0, 71, 171, 0.6)" : "rgba(192, 192, 192, 0.4)",
      speed: Math.random() * 2 + 0.5,
      direction: Math.random() * Math.PI * 2
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full"
          style={{
            backgroundColor: particle.color,
            boxShadow: `0 0 6px ${particle.color}`
          }}
          initial={{
            x: particle.x,
            y: particle.y,
            scale: 0
          }}
          animate={{
            x: particle.x + Math.cos(particle.direction) * 200,
            y: particle.y + Math.sin(particle.direction) * 200,
            scale: [0, particle.size, 0]
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

// Floating Tech Icons Background
export const FloatingTechBackground = () => {
  const icons = [FaCode, FaBrain, FaCogs, FaRocket, FaAtom, FaGem];
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => {
        const Icon = icons[i % icons.length];
        return (
          <motion.div
            key={i}
            className="absolute text-primary/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${20 + Math.random() * 40}px`
            }}
            animate={{
              y: [0, -100, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          >
            <Icon />
          </motion.div>
        );
      })}
    </div>
  );
};

// Morphing Blob Background
export const MorphingBlob = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(0, 71, 171, 0.4) 0%, transparent 70%)",
          filter: "blur(40px)"
        }}
        animate={{
          x: [100, 200, 50, 150, 100],
          y: [100, 300, 200, 50, 100],
          scale: [1, 1.5, 0.8, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute w-80 h-80 rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(192, 192, 192, 0.3) 0%, transparent 70%)",
          filter: "blur(30px)",
          right: "10%",
          top: "20%"
        }}
        animate={{
          x: [-50, 50, -100, 0, -50],
          y: [0, -100, 100, 50, 0],
          scale: [0.8, 1.3, 0.9, 1.1, 0.8],
          rotate: [360, 180, 0]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

// Neural Network Visualization
export const NeuralNetworkVisualization = () => {
  const nodes = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: (i % 4) * 25 + 10,
    y: Math.floor(i / 4) * 25 + 20,
    delay: i * 0.2
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <svg width="100%" height="100%" className="absolute">
        {/* Neural Network Connections */}
        {nodes.map((node, i) => 
          nodes.slice(i + 1).map((targetNode, j) => (
            <motion.line
              key={`${i}-${j}`}
              x1={`${node.x}%`}
              y1={`${node.y}%`}
              x2={`${targetNode.x}%`}
              y2={`${targetNode.y}%`}
              stroke="rgba(0, 71, 171, 0.3)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 0],
                opacity: [0, 0.6, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: (i + j) * 0.3,
                ease: "easeInOut"
              }}
            />
          ))
        )}
        
        {/* Neural Network Nodes */}
        {nodes.map((node) => (
          <motion.circle
            key={node.id}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r="3"
            fill="rgba(0, 71, 171, 0.8)"
            initial={{ scale: 0 }}
            animate={{ 
              scale: [0, 1.2, 1, 1.2, 1],
              opacity: [0.3, 1, 0.7, 1, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: node.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>
    </div>
  );
};

// Interactive Magnetic Field
export const MagneticField = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-20 h-20 rounded-full border border-primary/20"
          style={{
            left: `${20 + (i % 3) * 30}%`,
            top: `${20 + Math.floor(i / 3) * 25}%`,
            x: springX,
            y: springY
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5
          }}
        />
      ))}
    </div>
  );
};

// Constellation Effect
export const ConstellationEffect = () => {
  const stars = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-primary rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: `0 0 ${star.size * 2}px rgba(0, 71, 171, 0.8)`
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Holographic Grid
export const HolographicGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 71, 171, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 71, 171, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px"
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 50, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Grid intersection points */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary rounded-full"
          style={{
            left: `${(i % 5) * 25 + 12.5}%`,
            top: `${Math.floor(i / 5) * 25 + 12.5}%`
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};