import { motion } from "framer-motion";
import { FaTwitter, FaLinkedin, FaGithub, FaEnvelope, FaInstagram, FaFacebook } from "react-icons/fa";
import LogoComponent from "./LogoComponent";

export default function Footer() {
  return (
    <footer className="py-16 glassmorphism-strong border-t border-primary/20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Logo and Company Info */}
          <div className="md:col-span-2">
            <LogoComponent size="xl" showText={true} animate={true} className="mb-4" />
            <p className="text-white/70 mb-6 leading-relaxed">
              Empowering businesses with AI-driven solutions, innovative mobile applications, and transformative digital experiences. 
              Your trusted partner for intelligent technology solutions.
            </p>
            <div className="flex gap-4">
              <motion.a
                href="https://x.com/NeuralcoderAi"
                className="w-10 h-10 glassmorphism rounded-full flex items-center justify-center text-white/70 hover:text-primary transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                data-testid="link-twitter"
              >
                <FaTwitter />
              </motion.a>
              <motion.a
                href="https://in.linkedin.com/company/neural-coder-ai"
                className="w-10 h-10 glassmorphism rounded-full flex items-center justify-center text-white/70 hover:text-primary transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                data-testid="link-linkedin"
              >
                <FaLinkedin />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/neuralcoder.ai/?utm_source=qr&igsh=ZHJ2dW9qOTk0OGlt"
                className="w-10 h-10 glassmorphism rounded-full flex items-center justify-center text-white/70 hover:text-primary transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                data-testid="link-insta"
              >
                <FaInstagram />
              </motion.a>
              <motion.a
                href="https://www.facebook.com/p/Neural-Coder-Ai-61558052496811/"
                className="w-10 h-10 glassmorphism rounded-full flex items-center justify-center text-white/70 hover:text-primary transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                data-testid="link-email"
              >
                <FaFacebook />
              </motion.a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {['AI Development', 'Mobile Apps', 'Web Applications', 'IoT Solutions', 'Machine Learning'].map((service) => (
                <li key={service}>
                  <a 
                    href="#services" 
                    className="text-white/70 hover:text-primary transition-colors"
                    data-testid={`link-service-${service.toLowerCase().replace(' ', '-')}`}
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-white/70">
              <li>hello@neuralcoder.ai</li>
              <li>Global Offices:</li>
              <li>• India (Bangalore)</li>
              <li>• India (Gurgaon)</li>
              <li>• India (Chandigarh)</li>
              <li>• UK (London)</li>
              <li>• UAE (Dubai)</li>
              <li>• USA (New York)</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © 2024 Neural Coder AI. All rights reserved. Coding the Future.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-white/50 hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/50 hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="text-white/50 hover:text-primary transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}