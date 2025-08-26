import { motion } from "framer-motion";
import { TestimonialCard } from "./CreativeAssets";

const testimonials = [
  {
    quote: "Neural Coder AI transformed our business with their AI-powered inventory system. We've seen a 45% reduction in costs and 300% increase in efficiency. Their team's expertise is unmatched.",
    author: "Michael Chen",
    position: "CTO",
    company: "TechFlow Solutions"
  },
  {
    quote: "The mobile banking app they developed for us exceeded all expectations. The AI-driven fraud detection has saved us millions, and our customer satisfaction scores have never been higher.",
    author: "Sarah Williams",
    position: "VP of Digital Innovation", 
    company: "Metro Bank"
  },
  {
    quote: "Working with Neural Coder AI was a game-changer. Their chatbot platform handles over 100k conversations daily with 95% accuracy. The ROI was visible within the first month.",
    author: "David Rodriguez",
    position: "Head of Customer Experience",
    company: "Global Retail Corp"
  },
  {
    quote: "Their IoT solution for our smart city project has been phenomenal. Traffic optimization, energy savings, and emergency response times have all improved dramatically.",
    author: "Lisa Thompson",
    position: "Smart City Director",
    company: "Metropolitan Council"
  },
  {
    quote: "The healthcare analytics platform they built helps us predict patient outcomes with incredible accuracy. It's revolutionized how we approach treatment planning.",
    author: "Dr. James Park",
    position: "Chief Medical Officer",
    company: "Advanced Healthcare Systems"
  },
  {
    quote: "Neural Coder AI delivered our e-commerce transformation ahead of schedule and under budget. The AI recommendations system has tripled our conversion rates.",
    author: "Emma Johnson",
    position: "E-commerce Director",
    company: "Fashion Forward"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-primary/5 to-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/5 to-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Our <span className="text-gradient-visible">Clients Say</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Hear from industry leaders who have transformed their businesses with our AI solutions and development expertise.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <TestimonialCard {...testimonial} />
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          className="text-center glassmorphism-strong p-12 rounded-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-6">
            Trusted by Industry Leaders Worldwide
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {[
              { metric: "98%", label: "Client Satisfaction" },
              { metric: "150+", label: "Projects Delivered" },
              { metric: "25+", label: "Countries Served" },
              { metric: "24/7", label: "Support Available" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl font-bold text-primary mb-2">{stat.metric}</div>
                <div className="text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
          <motion.button 
            className="glassmorphism px-8 py-4 rounded-full text-primary font-semibold hover:bg-primary hover:text-black transition-all duration-300 hover-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-testid="button-view-case-studies"
          >
            View All Case Studies
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}