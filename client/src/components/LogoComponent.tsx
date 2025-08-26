import { motion } from "framer-motion";

interface LogoComponentProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  animate?: boolean;
  className?: string;
}

export default function LogoComponent({ 
  size = "md", 
  showText = true, 
  animate = false,
  className = "" 
}: LogoComponentProps) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16"
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
  };

  return (
    <motion.div 
      className={`flex items-center gap-3 ${className}`}
      whileHover={animate ? { scale: 1.05 } : {}}
    >
      <motion.img 
        src="https://i.ibb.co/FLT3WvM3/Jejjb-GC0-400x400.jpg" 
        alt="Neural Coder AI Logo" 
        className={`${sizes[size]} rounded-lg shadow-lg`} 
        animate={animate ? {
          y: [0, -2, 0],
          rotate: [0, 1, 0, -1, 0]
        } : {}}
        transition={animate ? { 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        } : {}}
      />
      {showText && (
        <motion.span 
          className={`${textSizes[size]} font-bold logo-text`}
          animate={animate ? {
            textShadow: [
              "0 2px 4px rgba(0, 0, 0, 0.3)",
              "0 4px 8px rgba(255, 215, 0, 0.2)",
              "0 2px 4px rgba(0, 0, 0, 0.3)"
            ]
          } : {}}
          transition={animate ? { 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          } : {}}
        >
          Neural Coder AI
        </motion.span>
      )}
    </motion.div>
  );
}