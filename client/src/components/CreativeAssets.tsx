import { motion } from "framer-motion";

// Floating Code Particles
export const FloatingCodeParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {["{}", "[]", "</>", "AI", "ML", "IoT", "API", "UI"].map((code, index) => (
      <motion.div
        key={index}
        className="absolute text-primary/20 font-mono text-sm"
        initial={{
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          opacity: 0.3
        }}
        animate={{
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          opacity: [0.1, 0.4, 0.1]
        }}
        transition={{
          duration: 15 + Math.random() * 10,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {code}
      </motion.div>
    ))}
  </div>
);

// Professional Team Avatar
export const TeamAvatar = ({ name, role, image }: { name: string; role: string; image?: string }) => (
  <motion.div 
    className="glassmorphism-strong p-6 rounded-2xl text-center hover-lift group"
    whileHover={{ y: -10, rotateY: 5 }}
    transition={{ duration: 0.3 }}
  >
    <div className="w-24 h-24 mx-auto mb-4 relative">
      <div className="w-full h-full bg-gradient-to-br from-primary/30 to-primary/10 rounded-full flex items-center justify-center">
        {image ? (
          <img src={image} alt={name} className="w-full h-full rounded-full object-cover" />
        ) : (
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-xl">{name.charAt(0)}</span>
          </div>
        )}
      </div>
      <motion.div 
        className="absolute -inset-1 bg-gradient-to-r from-primary via-transparent to-primary rounded-full opacity-0 group-hover:opacity-30"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </div>
    <h4 className="font-semibold text-white mb-1">{name}</h4>
    <p className="text-primary text-sm font-medium">{role}</p>
  </motion.div>
);

// Creative Statistics Display
export const StatsDisplay = ({ stats }: { stats: { label: string; value: string; icon: string }[] }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    {stats.map((stat, index) => (
      <motion.div
        key={stat.label}
        className="glassmorphism-strong p-6 rounded-xl text-center hover-lift"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="text-3xl mb-2">{stat.icon}</div>
        <motion.div
          className="text-2xl font-bold text-primary mb-1"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.5, type: "spring" }}
          viewport={{ once: true }}
        >
          {stat.value}
        </motion.div>
        <p className="text-white/70 text-sm">{stat.label}</p>
      </motion.div>
    ))}
  </div>
);

// Interactive Process Steps
export const ProcessSteps = ({ steps }: { steps: { title: string; description: string; icon: string }[] }) => (
  <div className="space-y-8">
    {steps.map((step, index) => (
      <motion.div
        key={step.title}
        className="flex items-start gap-6"
        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.2, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.div 
          className="flex-shrink-0 w-16 h-16 glassmorphism-strong rounded-2xl flex items-center justify-center text-2xl"
          whileHover={{ scale: 1.1, rotateY: 180 }}
          transition={{ duration: 0.5 }}
        >
          {step.icon}
        </motion.div>
        <div className="flex-1">
          <motion.div 
            className="flex items-center gap-4 mb-2"
            whileHover={{ x: 10 }}
          >
            <h3 className="text-xl font-semibold text-primary">{step.title}</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
          </motion.div>
          <p className="text-white/70 leading-relaxed">{step.description}</p>
        </div>
      </motion.div>
    ))}
  </div>
);

export const ClientLogoDisplay = ({ logos }: { logos: { name: string; logo: string }[] }) => {
  // helper: check if logo looks like an image path
  const isImage = (logo: string) => /\.(png|jpe?g|webp|svg)$/i.test(logo);

  return (
    <motion.div 
      className="glassmorphism-strong p-8 rounded-3xl"
      whileInView={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
        {logos.map((client, index) => (
          <motion.div
            key={client.name}
            className="aspect-square flex items-center justify-center p-4 glassmorphism rounded-xl hover-lift group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, rotateY: 10 }}
          >
            <div className="w-full h-full bg-gradient-to-br from-white/10 to-white/5 rounded-lg flex items-center justify-center text-white/60 font-bold text-lg group-hover:text-primary transition-colors">
              {isImage(client.logo) ? (
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-12 max-w-[80%] object-contain"
                />
              ) : (
                client.logo
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};


// Technology Stack Visualization
export const TechStackVisualization = ({ technologies }: { technologies: { name: string; icon: React.ComponentType<any>; level: number }[] }) => (
  <div className="space-y-6">
    {technologies.map((tech, index) => (
      <motion.div
        key={tech.name}
        className="glassmorphism-strong p-4 rounded-xl hover-lift"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-4 mb-3">
          <tech.icon className="text-2xl text-primary" />
          <span className="font-semibold text-white">{tech.name}</span>
        </div>
        <div className="relative h-2 bg-black/30 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary/70 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: `${tech.level}%` }}
            transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          />
        </div>
        <div className="text-right text-sm text-primary mt-1">{tech.level}%</div>
      </motion.div>
    ))}
  </div>
);

// Interactive Feature Cards
export const FeatureCard = ({ 
  title, 
  description, 
  icon: IconComponent, 
  color = "from-primary/20 to-primary/10" 
}: { 
  title: string; 
  description: string; 
  icon: React.ComponentType<any>; 
  color?: string;
}) => (
  <motion.div
    className="relative glassmorphism-strong p-8 rounded-3xl overflow-hidden hover-lift group cursor-pointer"
    whileHover={{ 
      y: -10,
      transition: { duration: 0.3 }
    }}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-30`} />
    <div className="relative z-10">
      <motion.div
        className="w-16 h-16 glassmorphism rounded-2xl flex items-center justify-center mb-6 text-2xl text-primary"
        whileHover={{ scale: 1.2, rotate: 15 }}
        transition={{ duration: 0.3 }}
      >
        <IconComponent />
      </motion.div>
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <p className="text-white/70 leading-relaxed">{description}</p>
      <motion.div 
        className="mt-6 flex items-center text-primary font-semibold"
        whileHover={{ x: 10 }}
      >
        Learn More →
      </motion.div>
    </div>
  </motion.div>
);

// Testimonial Card
export const TestimonialCard = ({ 
  quote, 
  author, 
  position, 
  company,
  avatar 
}: {
  quote: string;
  author: string;
  position: string;
  company: string;
  avatar?: string;
}) => (
  <motion.div
    className="glassmorphism-strong p-8 rounded-3xl hover-lift"
    whileHover={{ scale: 1.02 }}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  >
    <div className="text-4xl text-primary mb-4">"</div>
    <p className="text-white/80 leading-relaxed mb-6 italic">{quote}</p>
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center">
        {avatar ? (
          <img src={avatar} alt={author} className="w-full h-full rounded-full object-cover" />
        ) : (
          <span className="text-black font-bold">{author.charAt(0)}</span>
        )}
      </div>
      <div>
        <p className="font-semibold text-white">{author}</p>
        <p className="text-sm text-primary">{position} at {company}</p>
      </div>
    </div>
  </motion.div>
);