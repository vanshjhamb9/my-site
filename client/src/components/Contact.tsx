import { motion } from "framer-motion";
import { useState } from "react";
import { FaPhone, FaEnvelope, FaPaperPlane, FaMapMarkerAlt } from "react-icons/fa";
import LogoComponent from "./LogoComponent";

const offices = [
  { country: "INDIA", location: "Ahmedabad, Gujarat" },
  { country: "UK", location: "London" },
  { country: "UAE", location: "Dubai" },
  { country: "USA", location: "New York" },
];

const businessNeeds = [
  "AI-Powered Mobile App Development",
  "Custom CRM and Web Applications", 
  "AI Integration for Automation",
  "IoT Solutions",
  "Machine Learning & Analytics",
  "Computer Vision Implementation",
  "Robotics Automation",
  "Blockchain Solutions",
  "Other"
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessNeeds: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Ready to <span className="text-gradient-visible">Collaborate?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Let's build your next breakthrough together.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            className="glassmorphism-strong rounded-3xl p-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <LogoComponent size="sm" showText={false} animate={true} />
              <h3 className="text-2xl font-bold text-primary">Quick Inquiry Form</h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <label htmlFor="name" className="block text-sm font-semibold mb-2 text-foreground">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl glassmorphism border-0 focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground"
                  placeholder="Your full name"
                  required
                  data-testid="input-name"
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <label htmlFor="email" className="block text-sm font-semibold mb-2 text-foreground">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl glassmorphism border-0 focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground"
                  placeholder="your.email@company.com"
                  required
                  data-testid="input-email"
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <label htmlFor="businessNeeds" className="block text-sm font-semibold mb-2 text-foreground">
                  Business Needs *
                </label>
                <select
                  id="businessNeeds"
                  name="businessNeeds"
                  value={formData.businessNeeds}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl glassmorphism border-0 focus:ring-2 focus:ring-primary text-foreground"
                  required
                  data-testid="select-business-needs"
                >
                  <option value="">Select your business needs</option>
                  {businessNeeds.map((need) => (
                    <option key={need} value={need} className="bg-background text-foreground">
                      {need}
                    </option>
                  ))}
                </select>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <label htmlFor="message" className="block text-sm font-semibold mb-2 text-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl glassmorphism border-0 focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground resize-none"
                  placeholder="Tell us about your project..."
                  data-testid="textarea-message"
                />
              </motion.div>

              <motion.button
                type="submit"
                className="w-full bg-primary text-black font-bold py-4 px-8 rounded-xl hover:bg-primary/80 transition-all duration-300 flex items-center justify-center gap-3 hover-glow"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-testid="button-send-inquiry"
              >
                <FaPaperPlane />
                Send Inquiry
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Global Offices */}
            <div className="glassmorphism-strong rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-primary flex items-center gap-3">
                <FaMapMarkerAlt />
                Global Offices
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {offices.map((office, index) => (
                  <motion.div
                    key={office.country}
                    className="glassmorphism p-4 rounded-xl text-center hover-lift"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    data-testid={`office-${office.country.toLowerCase()}`}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/50 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-sm font-bold text-black">{office.country.charAt(0)}</span>
                    </div>
                    <h4 className="font-semibold text-primary text-sm">{office.country}</h4>
                    <p className="text-xs text-muted-foreground">{office.location}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Direct Contact */}
            <div className="glassmorphism-strong rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-primary">Direct Contact</h3>
              <div className="space-y-4">
                <motion.div 
                  className="flex items-center gap-4 p-4 glassmorphism rounded-xl hover-lift"
                  whileHover={{ x: 5 }}
                >
                  <FaEnvelope className="text-primary text-xl" />
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <p className="text-muted-foreground">hello@neuralcoder.ai</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-4 p-4 glassmorphism rounded-xl hover-lift"
                  whileHover={{ x: 5 }}
                >
                  <FaPhone className="text-primary text-xl" />
                  <div>
                    <p className="font-semibold text-foreground">Phone</p>
                    <p className="text-muted-foreground">Schedule a call</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* CTA Button */}
            <motion.button 
              className="w-full border border-primary px-8 py-4 rounded-xl text-primary font-semibold hover:bg-primary hover:text-black transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-testid="button-book-intro-call"
            >
              Book Intro Call
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}