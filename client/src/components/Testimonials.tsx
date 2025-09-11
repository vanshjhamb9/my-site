import { motion } from "framer-motion";
import { TestimonialCard } from "./CreativeAssets";

const testimonials = [
  {
    quote: "Working with Neural Coder AI completely changed how we approach product development. Instead of spending weeks prototyping, we now validate ideas in days. Isaac and his team don’t just deliver tools. They help you think sharper about the problem you’re solving. It feels like having an extension of our founding team.",
    author: "Sarah Kim",
    position: "Founder",
    company: "Lumina Health (Digital Health)"
  },
  {
    quote: "In blockchain, trust comes from transparency. Neural Coder AI helped us analyze smart contract risks at scale, something we couldn’t have done manually without a large security team. The accuracy of those insights gave our investors and users confidence, which is priceless in the DeFi space.",
    author: "Ragib Ali Khan",
    position: "Founder",
    company: "ChainSphere (Blockchain/DeFi)"
  },
  {
    quote: "The first few meetings with Neural Coder AI felt long, and honestly, I wasn’t sure if all the talk would lead anywhere. But once their system was in place, it proved its value right away. Engagement went up, sales followed, and all that early skepticism turned into relief that we stuck with it.",
    author: "Omar Al-Mansoori",
    position: "CEO",
    company: "ZaytoonMart (E-commerce with AI)"
  },
  {
    quote: "Neural Coder AI helped me from starting till end. Even small things like domain, they guided. The process was simple, step by step, no confusion. Everything was done smooth, and system is working good now. I feel they are part of my team, not outside company.",
    author: "Deepak M",
    position: "",
    company: "Chennai (Fleet Management AI)"
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
            What Our <span className="text-accent">Clients Say</span>
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
                <div className="text-3xl font-bold text-accent mb-2">{stat.metric}</div>
                <div className="text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
          <motion.button 
            className="glassmorphism px-8 py-4 rounded-full text-accent font-semibold hover:bg-accent hover:text-black transition-all duration-300 hover-glow"
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