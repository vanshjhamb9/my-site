import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Galaxy-themed background effects
export function GalaxyParticles() {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, duration: number}>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 5 + 3
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, var(--primary) 0%, transparent 70%)`
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 1, 0],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

// Constellation effect
export function ConstellationBackground() {
  const stars = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="w-full h-full opacity-20">
        {/* Constellation lines */}
        <defs>
          <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--secondary)" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        
        {stars.map((star, index) => {
          const nextStar = stars[(index + 1) % stars.length];
          return (
            <motion.line
              key={`line-${star.id}`}
              x1={`${star.x}%`}
              y1={`${star.y}%`}
              x2={`${nextStar.x}%`}
              y2={`${nextStar.y}%`}
              stroke="url(#starGradient)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{
                duration: 2,
                delay: star.delay,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 1
              }}
            />
          );
        })}
      </svg>

      {/* Stars */}
      {stars.map((star) => (
        <motion.div
          key={`star-${star.id}`}
          className="absolute w-2 h-2 rounded-full bg-primary"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 3,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

// Orbiting elements
export function OrbitingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[1, 2, 3].map((orbit) => (
        <motion.div
          key={orbit}
          className="absolute top-1/2 left-1/2 w-4 h-4 bg-primary/30 rounded-full"
          style={{
            marginLeft: `-${orbit * 100}px`,
            marginTop: `-${orbit * 100}px`
          }}
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 10 + orbit * 5,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div
            className="w-2 h-2 bg-primary rounded-full"
            style={{
              position: "absolute",
              top: 0,
              left: `${orbit * 100}px`
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

// Neural network connection lines
export function NeuralNetworkLines() {
  const nodes = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: 10 + (i % 4) * 25 + Math.random() * 10,
    y: 20 + Math.floor(i / 4) * 50 + Math.random() * 10
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <svg className="w-full h-full">
        <defs>
          <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.6" />
            <stop offset="50%" stopColor="var(--secondary)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        
        {nodes.map((node, index) => (
          <g key={node.id}>
            {nodes
              .slice(index + 1)
              .filter((_, i) => Math.random() > 0.4) // Only connect some nodes
              .map((connectedNode) => (
                <motion.line
                  key={`${node.id}-${connectedNode.id}`}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${connectedNode.x}%`}
                  y2={`${connectedNode.y}%`}
                  stroke="url(#neuralGradient)"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: [0, 1, 0],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{
                    duration: 4,
                    delay: Math.random() * 2,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 3
                  }}
                />
              ))
            }
            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r="3"
              fill="var(--primary)"
              animate={{
                r: [2, 4, 2],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                delay: Math.random() * 2,
                repeat: Infinity
              }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}