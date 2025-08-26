import { motion } from "framer-motion";

// AI Brain Network Illustration
export const AIBrainNetwork = ({ size = 200 }: { size?: number }) => (
  <motion.svg 
    width={size} 
    height={size} 
    viewBox="0 0 200 200" 
    fill="none"
    animate={{ rotate: [0, 5, 0, -5, 0] }}
    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
  >
    <defs>
      <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(51, 100%, 70%)" />
        <stop offset="100%" stopColor="hsl(51, 100%, 50%)" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Neural Network Connections */}
    {[
      { x1: 50, y1: 60, x2: 150, y2: 80 },
      { x1: 70, y1: 120, x2: 130, y2: 40 },
      { x1: 40, y1: 150, x2: 160, y2: 120 },
      { x1: 100, y1: 30, x2: 80, y2: 170 },
      { x1: 120, y1: 90, x2: 60, y2: 140 }
    ].map((line, index) => (
      <motion.line
        key={index}
        x1={line.x1}
        y1={line.y1}
        x2={line.x2}
        y2={line.y2}
        stroke="url(#brainGradient)"
        strokeWidth="2"
        opacity="0.6"
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: index * 0.3, duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />
    ))}
    
    {/* Neural Nodes */}
    {[
      { cx: 50, cy: 60 }, { cx: 150, cy: 80 }, { cx: 70, cy: 120 },
      { cx: 130, cy: 40 }, { cx: 40, cy: 150 }, { cx: 160, cy: 120 },
      { cx: 100, cy: 30 }, { cx: 80, cy: 170 }, { cx: 120, cy: 90 },
      { cx: 60, cy: 140 }, { cx: 100, cy: 100 }
    ].map((node, index) => (
      <motion.circle
        key={index}
        cx={node.cx}
        cy={node.cy}
        r="6"
        fill="url(#brainGradient)"
        filter="url(#glow)"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.7, 1, 0.7] 
        }}
        transition={{ 
          delay: index * 0.2, 
          duration: 2, 
          repeat: Infinity 
        }}
      />
    ))}
  </motion.svg>
);

// Circuit Board Pattern
export const CircuitBoard = ({ size = 300 }: { size?: number }) => (
  <motion.svg 
    width={size} 
    height={size} 
    viewBox="0 0 300 300" 
    fill="none"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.5 }}
  >
    <defs>
      <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(51, 100%, 70%)" stopOpacity="0.8" />
        <stop offset="50%" stopColor="hsl(200, 100%, 70%)" stopOpacity="0.6" />
        <stop offset="100%" stopColor="hsl(280, 100%, 70%)" stopOpacity="0.4" />
      </linearGradient>
    </defs>
    
    {/* Circuit Paths */}
    <g stroke="url(#circuitGradient)" strokeWidth="2" fill="none">
      <motion.path
        d="M50 50 L250 50 L250 150 L150 150 L150 250 L50 250"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.path
        d="M100 100 L200 100 L200 200 L100 200 Z"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.5, duration: 3, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.path
        d="M75 25 L225 25 L225 125 L125 125 L125 275 L75 275"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1, duration: 3, repeat: Infinity, repeatType: "reverse" }}
      />
    </g>
    
    {/* Circuit Nodes */}
    {[
      { x: 50, y: 50 }, { x: 250, y: 50 }, { x: 150, y: 150 },
      { x: 100, y: 100 }, { x: 200, y: 200 }, { x: 150, y: 250 }
    ].map((node, index) => (
      <motion.circle
        key={index}
        cx={node.x}
        cy={node.y}
        r="8"
        fill="url(#circuitGradient)"
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.6, 1, 0.6] 
        }}
        transition={{ 
          delay: index * 0.3, 
          duration: 2, 
          repeat: Infinity 
        }}
      />
    ))}
  </motion.svg>
);

// Data Flow Visualization
export const DataFlow = ({ size = 250 }: { size?: number }) => (
  <motion.svg 
    width={size} 
    height={size} 
    viewBox="0 0 250 250" 
    fill="none"
  >
    <defs>
      <linearGradient id="dataGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="hsl(51, 100%, 70%)" />
        <stop offset="50%" stopColor="hsl(200, 100%, 70%)" />
        <stop offset="100%" stopColor="hsl(280, 100%, 70%)" />
      </linearGradient>
    </defs>
    
    {/* Data Particles */}
    {Array.from({ length: 12 }).map((_, index) => (
      <motion.circle
        key={index}
        r="3"
        fill="url(#dataGradient)"
        animate={{
          cx: [25, 225, 225, 25, 25],
          cy: [25, 25, 225, 225, 25]
        }}
        transition={{
          delay: index * 0.2,
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    ))}
    
    {/* Data Path */}
    <motion.path
      d="M25 25 L225 25 L225 225 L25 225 Z"
      stroke="url(#dataGradient)"
      strokeWidth="2"
      fill="none"
      strokeDasharray="10 5"
      animate={{ strokeDashoffset: [0, -15] }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
    
    {/* Central Hub */}
    <motion.circle
      cx="125"
      cy="125"
      r="20"
      stroke="url(#dataGradient)"
      strokeWidth="3"
      fill="rgba(255, 215, 0, 0.1)"
      animate={{ 
        scale: [1, 1.2, 1],
        rotate: [0, 360] 
      }}
      transition={{ 
        scale: { duration: 2, repeat: Infinity },
        rotate: { duration: 8, repeat: Infinity, ease: "linear" }
      }}
    />
  </motion.svg>
);

// Holographic Interface
export const HolographicInterface = ({ size = 280 }: { size?: number }) => (
  <motion.svg 
    width={size} 
    height={size} 
    viewBox="0 0 280 280" 
    fill="none"
  >
    <defs>
      <linearGradient id="holoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(200, 100%, 70%)" stopOpacity="0.8" />
        <stop offset="50%" stopColor="hsl(51, 100%, 70%)" stopOpacity="0.6" />
        <stop offset="100%" stopColor="hsl(280, 100%, 70%)" stopOpacity="0.4" />
      </linearGradient>
      <filter id="hologram">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Holographic Grid */}
    <g stroke="url(#holoGradient)" strokeWidth="1" opacity="0.6" filter="url(#hologram)">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.line
          key={`h${i}`}
          x1="20"
          y1={40 + i * 30}
          x2="260"
          y2={40 + i * 30}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ delay: i * 0.1, duration: 2, repeat: Infinity }}
        />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.line
          key={`v${i}`}
          x1={40 + i * 30}
          y1="20"
          x2={40 + i * 30}
          y2="260"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ delay: i * 0.15, duration: 2, repeat: Infinity }}
        />
      ))}
    </g>
    
    {/* Floating Elements */}
    {[
      { x: 80, y: 80, size: 15 },
      { x: 200, y: 120, size: 20 },
      { x: 120, y: 180, size: 12 },
      { x: 180, y: 60, size: 18 }
    ].map((elem, index) => (
      <motion.rect
        key={index}
        x={elem.x}
        y={elem.y}
        width={elem.size}
        height={elem.size}
        fill="url(#holoGradient)"
        filter="url(#hologram)"
        animate={{
          y: [elem.y, elem.y - 20, elem.y],
          rotate: [0, 180, 360]
        }}
        transition={{
          delay: index * 0.5,
          duration: 3,
          repeat: Infinity
        }}
      />
    ))}
  </motion.svg>
);

// Abstract Wave Pattern
export const AbstractWaves = ({ size = 320 }: { size?: number }) => (
  <motion.svg 
    width={size} 
    height={size/2} 
    viewBox="0 0 320 160" 
    fill="none"
  >
    <defs>
      <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="hsl(51, 100%, 70%)" stopOpacity="0.8" />
        <stop offset="33%" stopColor="hsl(200, 100%, 70%)" stopOpacity="0.6" />
        <stop offset="66%" stopColor="hsl(280, 100%, 70%)" stopOpacity="0.4" />
        <stop offset="100%" stopColor="hsl(51, 100%, 70%)" stopOpacity="0.2" />
      </linearGradient>
    </defs>
    
    {/* Animated Waves */}
    {[0, 1, 2].map((layer) => (
      <motion.path
        key={layer}
        d={`M0 ${80 + layer * 10} Q80 ${40 + layer * 5} 160 ${80 + layer * 10} T320 ${80 + layer * 10} V160 H0 Z`}
        fill="url(#waveGradient)"
        opacity={0.7 - layer * 0.2}
        animate={{
          d: [
            `M0 ${80 + layer * 10} Q80 ${40 + layer * 5} 160 ${80 + layer * 10} T320 ${80 + layer * 10} V160 H0 Z`,
            `M0 ${80 + layer * 10} Q80 ${120 - layer * 5} 160 ${80 + layer * 10} T320 ${80 + layer * 10} V160 H0 Z`,
            `M0 ${80 + layer * 10} Q80 ${40 + layer * 5} 160 ${80 + layer * 10} T320 ${80 + layer * 10} V160 H0 Z`
          ]
        }}
        transition={{
          delay: layer * 0.5,
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    ))}
  </motion.svg>
);