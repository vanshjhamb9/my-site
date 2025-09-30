import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaPhone, FaEnvelope, FaPaperPlane, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import LogoComponent from "./LogoComponent";
import ind from "../image/india-flag-icon.svg";
import us from "../image/united-states-flag-icon.svg";
import uk from "../image/united-kingdom-flag-icon.svg";
import uae from "../image/united-arab-emirates-flag-icon.svg";
import ReactCountryFlag from "react-country-flag";

declare global {
  interface Window {
    Calendly?: any;
  }
}



const offices = [
  { 
    code: "IN",
    country: "INDIA", 
    location: "Bangalore", 
    address: "Unit, 101, Oxford Towers, 139, HAL Old Airport Rd, Kodihalli, Bengaluru, Karnataka 560008" 
  },
  { 
    code: "IN",
    country: "INDIA", 
    location: "Gurgaon", 
    address: "E-52, 1st Floor, Sushant Lok-3, Gurgaon, 122003"
  },
  { 
    code: "IN",
    country: "INDIA", 
    location: "Chandigarh", 
    address: "Sushma Infinium,Chandigarh-Delhi ,NH-22, Zirakpur" 
  },
  { 
    code: "GB",
    country: "UK", 
    location: "London", 
    address: "34-37 Liverpool St, London EC2M 7PP, United Kingdom" 
  },
  { 
    code: "AE",
    country: "UAE", 
    location: "Dubai", 
    address: "10th floor, Dubai World Trade Center Sheikh Zayed Road, P.O. Box 293816 Dubai, United Arab Emirates" 
  },
  { 
    code: "US",
    country: "USA", 
    location: "San Francisco", 
    address: "WeWork : 600 California St, San Francisco, CA 94108, United States" 
  }
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{type: 'success' | 'error', message: string} | null>(null);

  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: data.message });
        setFormData({ name: "", email: "", businessNeeds: "", message: "" });
      } else {
        setSubmitStatus({ type: 'error', message: data.error || 'Failed to send message' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: 'https://calendly.com/sales-neuralcoderai' });
    }
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
            Ready to <span className="text-accent">Collaborate?</span>
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
              <h3 className="text-2xl font-bold text-accent">Quick Inquiry Form</h3>
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
                  className="w-full px-4 py-3 rounded-xl glassmorphism border-0 focus:ring-2 focus:ring-accent text-foreground placeholder-muted-foreground"
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
                  className="w-full px-4 py-3 rounded-xl glassmorphism border-0 focus:ring-2 focus:ring-accent text-foreground placeholder-muted-foreground"
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
                  className="w-full px-4 py-3 rounded-xl glassmorphism border-0 focus:ring-2 focus:ring-accent text-foreground"
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
                  className="w-full px-4 py-3 rounded-xl glassmorphism border-0 focus:ring-2 focus:ring-accent text-foreground placeholder-muted-foreground resize-none"
                  placeholder="Tell us about your project..."
                  data-testid="textarea-message"
                />
              </motion.div>

              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl flex items-center gap-3 ${
                    submitStatus.type === 'success' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {submitStatus.type === 'success' && <FaCheckCircle />}
                  <p className="text-sm">{submitStatus.message}</p>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent text-black font-bold py-4 px-8 rounded-xl hover:bg-accent/80 transition-all duration-300 flex items-center justify-center gap-3 hover-glow disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                data-testid="button-send-inquiry"
              >
                <FaPaperPlane />
                {isSubmitting ? 'Sending...' : 'Send Inquiry'}
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
      <h3 className="text-2xl font-bold mb-6 text-accent flex items-center gap-3">
        <FaMapMarkerAlt />
        Global Offices
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {offices.map((office, index) => (
          <motion.div
            key={`${office.country}-${office.location}-${index}`}
            className="glassmorphism p-4 rounded-xl text-center hover-lift"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 bg-white shadow-lg"
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <ReactCountryFlag
                countryCode={office.code} // pass ISO 2-letter code
                svg
                style={{ width: "3em", height: "3em", borderRadius: "50%" }}
              />
            </motion.div>

            <h4 className="font-semibold text-accent text-sm">{office.country}</h4>
            <p className="text-xs text-muted-foreground">{office.location}</p>
          </motion.div>
        ))}
      </div>
    </div>


            {/* Direct Contact */}
            <div className="glassmorphism-strong rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-accent">Direct Contact</h3>
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

            {/* CTA Button with Calendly */}
            <motion.button 
              onClick={openCalendly}
              className="w-full border border-accent px-8 py-4 rounded-xl text-accent font-semibold hover:bg-accent hover:text-black transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-testid="button-book-intro-call"
            >
              Book Intro Call
            </motion.button>
            <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}