import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll as useFramerScroll, useTransform } from "framer-motion";
import { useScroll } from "@/hooks/use-scroll";
import { Link, useLocation } from "wouter";
import LogoComponent from "./LogoComponent";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Offerings" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/primodia", label: "Primodia", special: true },
  { href: "/contact", label: "Contact" },
];

// Floating illustration components
const FloatingShape = ({ delay, className }: { delay: number, className: string }) => (
  <motion.div
    className={`absolute ${className}`}
    animate={{
      y: [0, -20, 0],
      x: [0, 10, -5, 0],
      rotate: [0, 180, 360],
      scale: [1, 1.2, 0.8, 1]
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
  />
);

const HeaderIllustrations = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Floating geometric shapes */}
    <FloatingShape delay={0} className="top-4 left-1/4 w-6 h-6 bg-gradient-to-br from-accent to-secondary rounded-full opacity-20" />
    <FloatingShape delay={2} className="top-8 right-1/3 w-4 h-4 bg-secondary border border-accent rounded-sm opacity-30" />
    <FloatingShape delay={1} className="bottom-6 left-1/3 w-3 h-8 bg-gradient-to-t from-accent to-transparent rounded-full opacity-25" />
    <FloatingShape delay={3} className="top-1/2 right-1/4 w-5 h-5 border-2 border-secondary rounded-full opacity-20" />
    
    {/* Animated connection lines */}
    <motion.div
      className="absolute top-6 left-1/4 w-32 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent"
      animate={{
        scaleX: [0, 1, 0],
        opacity: [0, 0.5, 0]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay: 1
      }}
    />
    <motion.div
      className="absolute bottom-8 right-1/3 w-24 h-0.5 bg-gradient-to-l from-transparent via-secondary to-transparent"
      animate={{
        scaleX: [0, 1, 0],
        opacity: [0, 0.4, 0]
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        delay: 2.5
      }}
    />
  </div>
);

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollY = useScroll();
  const { scrollYProgress } = useFramerScroll();
  const [location] = useLocation();
  
  // Transform scroll into header effects
  const headerScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const isActiveLink = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location === href) return true;
    return false;
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrollY > 100 ? "glassmorphism-strong" : "glassmorphism"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ scale: headerScale, opacity: headerOpacity }}
      >
        <HeaderIllustrations />
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <LogoComponent size="md" showText={true} animate={true} />
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                >
                  <motion.div
                    className={`transition-colors duration-300 relative group cursor-pointer ${
                      link.special 
                        ? `font-bold border px-4 py-2 rounded-full ${
                            isActiveLink(link.href) 
                              ? "text-accent border-accent/50 bg-accent/10" 
                              : "text-accent border-accent/30 hover:bg-accent/10"
                          }` 
                        : `${
                            isActiveLink(link.href) 
                              ? "text-accent" 
                              : "text-white hover:text-accent"
                          }`
                    }`}
                    whileHover={{ y: -2, scale: link.special ? 1.05 : 1 }}
                    data-testid={`nav-link-${link.label.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.special && <span className="mr-2">👑</span>}
                    {link.label}
                    {!link.special && (
                      <span 
                        className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 ${
                          isActiveLink(link.href) ? "w-full" : "w-0 group-hover:w-full"
                        }`} 
                      />
                    )}
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                className={`hamburger ${mobileMenuOpen ? "active" : ""}`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed top-0 left-0 w-full h-screen glassmorphism-strong md:hidden z-40"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8 text-xl">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                >
                  <motion.div
                    className={`transition-colors duration-300 cursor-pointer ${
                      isActiveLink(link.href) ? "text-secondary" : "text-white hover:text-secondary"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.special && <span className="mr-2">👑</span>}
                    {link.label}
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
