import { motion } from "framer-motion";
import { ClientLogoDisplay, TechStackVisualization } from "./CreativeAssets";
import { SiReact, SiNodedotjs, SiPython, SiTensorflow, SiMongodb, SiAmazon, SiDocker, SiKubernetes } from "react-icons/si";
import ezbuzz from "../image/Easebuzz_Logo.jpg";
import e2e from "../image/66f39d4fdfb2bfc1091c408a_e2e-logo-white.webp"
import shopify from "../image/60ccab9786c6e542b5601be6_5f0439b0f26a5acaf2f50e1a_shopify.png"
import aws from "../image/aws.png"
import phonepay from "../image/PhonePe-Logo.wine.png"

const clientLogos = [
  { name: "Easebuzz", logo: ezbuzz },
  { name: "E2E Networks", logo: e2e },
  { name: "aws", logo: aws },
  { name: "shopify", logo: shopify },
  { name: "phonepay", logo: phonepay },
 
];

const technologies = [
  { name: "React & React Native", icon: SiReact, level: 95 },
  { name: "Node.js & Express", icon: SiNodedotjs, level: 92 },
  { name: "Python & Django", icon: SiPython, level: 90 },
  { name: "TensorFlow & AI/ML", icon: SiTensorflow, level: 88 },
  { name: "MongoDB & Databases", icon: SiMongodb, level: 85 },
  { name: "AWS & Cloud Services", icon: SiAmazon, level: 87 },
  { name: "Docker & Containerization", icon: SiDocker, level: 83 },
  { name: "Kubernetes & DevOps", icon: SiKubernetes, level: 80 }
];

export default function ClientLogos() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Client Logos Section */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            Trusted by <span className="text-accent">Leading Companies</span>
          </h2>
          <ClientLogoDisplay logos={clientLogos} />
        </motion.div>

        {/* Technology Stack Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-6">
              Our <span className="text-accent">Technology Stack</span>
            </h3>
            <p className="text-xl text-white/70 mb-8 leading-relaxed">
              We leverage cutting-edge technologies and frameworks to build scalable, 
              high-performance solutions that drive business growth and innovation.
            </p>
            <motion.button 
              className="glassmorphism-strong px-8 py-4 rounded-full text-accent font-semibold hover:bg-accent hover:text-black transition-all duration-300 hover-glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-testid="button-view-tech-stack"
            >
              Explore Our Capabilities
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <TechStackVisualization technologies={technologies} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
