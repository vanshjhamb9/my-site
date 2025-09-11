import { motion } from "framer-motion";
import { FaRocket } from "react-icons/fa";

export default function FloatingCTA() {
  const handleClick = () => {
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-40"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <motion.button
        onClick={handleClick}
        className="glassmorphism px-6 py-3 rounded-full button-gold animate-bounce-custom hover-glow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="mr-2">🎯</span>
        Ready to Transform Your Vision?
      </motion.button>
    </motion.div>
  );
}
