import { motion } from "framer-motion";
import { TeamAvatar, StatsDisplay } from "./CreativeAssets";
import isaacImage from "../image/john.jpg"
import HelenImage from "../image/CFO.jpg"


const teamMembers = [
  {
    name: "Isaac John",
    role: "Founder & CEO",
    specialty: "Visionary Leader & AI Strategy",
    image: isaacImage,
  },
  {
    name: "Harshit",    
    role: "Chief Technology Officer", 
    specialty: "Technical Architecture & Innovation",
    image: isaacImage,
  },
  {
    name: "Helen Hemalatha",
    role: "Chief Financial Officer",
    specialty: "Financial Strategy & Operations",
    image: HelenImage,
  },
  {
    name: "Aniket Gupta",
    role: "Chief Marketing officer",
    specialty: "Marketing Strategy & Operations",
    image: HelenImage,
  },

];

const companyStats = [
  { label: "Projects Delivered", value: "150+", icon: "🚀" },
  { label: "Countries Reached", value: "10", icon: "🌍" },
  { label: "AI Solutions", value: "100+", icon: "🧠" },
  { label: "Expert Team", value: "25+", icon: "👥" }
];

export default function Team() {
  return (
    <section id="team" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            whileHover={{ scale: 1.02 }}
          >
            Meet Our <span className="golden-text animate-aurora-wave">Team</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            whileHover={{ y: -2 }}
          >
            <span className="text-primary font-semibold">Meet our team seasoned professionals with deep expertise and rich experience,</span>
            <br />ready to bring your vision to life.
          </motion.p>
        </motion.div>

        {/* Company Stats */}
        {/* <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <StatsDisplay stats={companyStats} />
        </motion.div> */}

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <TeamAvatar {...member} />
              <div className="mt-4 text-center">
                <p className="text-white/60 text-sm leading-relaxed">{member.specialty}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Leadership Message */}
        <motion.div
          className="glassmorphism-strong p-12 rounded-3xl text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-cyan-500/5"></div>
          <div className="relative z-10">
            <motion.div
              className="w-24 h-24 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mx-auto mb-6"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <span className="text-black font-bold text-2xl">NC</span>
            </motion.div>
            <motion.h3 
              className="text-2xl font-bold text-primary mb-6 animate-galaxy-pulse"
              whileHover={{ scale: 1.05 }}
            >
              "AI isn't the enemy it's your advantage. Own it or fall behind."
            </motion.h3>
            <p className="text-sm text-muted-foreground mb-2">- Isaac John, 2025</p>
            <motion.p 
              className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
              whileHover={{ scale: 1.02 }}
            >
              We're not just here to build. We're here to support, to solve, and to stand by you when it matters most.
              <br /><br />
              <span className="text-primary font-semibold">Your success is our mission.</span>
              <br />
              We're not just a vendor we're your growth partner.
            </motion.p>
            <div className="flex justify-center gap-4">
              <motion.button 
                className="glassmorphism px-8 py-3 rounded-full text-primary font-semibold hover:bg-primary hover:text-black transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-testid="button-join-team"
              >
                Join Our Team
              </motion.button>
              <motion.button 
                className="border border-primary px-8 py-3 rounded-full text-primary font-semibold hover:bg-primary hover:text-black transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-testid="button-meet-leadership"
              >
                Meet Leadership
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}