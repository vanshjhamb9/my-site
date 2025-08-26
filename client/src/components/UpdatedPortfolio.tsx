import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { FaMobile, FaRobot, FaChartLine, FaCogs, FaRocket, FaTimes, FaGamepad, FaHeart, FaCar, FaUsers } from "react-icons/fa";
import { SiReact, SiPython, SiTensorflow, SiNodedotjs, SiMongodb, SiAmazon, SiDocker, SiKubernetes } from "react-icons/si";
import { useInView } from "react-intersection-observer";
import { 
  AIBrainNetwork, 
  CircuitBoard, 
  DataFlow, 
  HolographicInterface, 
  AbstractWaves 
} from "./CustomIllustrations";

const caseStudies = [
  {
    id: 1,
    title: "Gaming and Live Streaming Commerce Platform",
    shortDescription: "AI-powered streaming marketplace serving viewers, influencers, and vendors at scale",
    illustration: AIBrainNetwork,
    category: "AI Commerce",
    techStack: [SiPython, SiTensorflow, SiReact, SiNodedotjs],
    fullDescription: "Built a streaming-first marketplace with AI at the core. Recommendation models using collaborative filtering and sequence models ranked streams, highlights, and VODs per user. Real-time embeddings updated interests from watch time, chat activity, and purchase signals.",
    challenges: "Serving three very different audiences simultaneously - viewers wanting the right live games and sports, influencers wanting growth and fair monetization, and vendors wanting clean product listings and conversion tracking.",
    results: "40% increase in viewer engagement, 30% increase in influencer revenue per hour, 50% reduction in vendor deal cycle time, 18% increase in checkout conversion.",
    features: ["Real-time Recommendations", "Creator Growth Engine", "Vendor-Influencer Matching", "Multimodal Moderation"],
    color: "from-purple-500/20 to-pink-500/20",
    icon: FaGamepad,
    countries: ["🇺🇸", "🇰🇷", "🇯🇵"]
  },
  {
    id: 2,
    title: "Healthcare AI Consultation Assistant",
    shortDescription: "AI consultation assistant automating medical document processing and patient preparation",
    illustration: CircuitBoard,
    category: "Healthcare",
    techStack: [SiPython, SiTensorflow, SiNodedotjs, SiAmazon],
    fullDescription: "Comprehensive AI consultation assistant for online medical platforms. OCR models digitized handwritten prescriptions and low-quality scans. NLP pipelines extracted symptoms, diagnoses, and medications from unstructured documents. Contextual summarizers condensed patient history into concise, doctor-ready notes.",
    challenges: "Doctors were spending too much time on admin work, digging through uploaded prescriptions, scanned lab reports, and handwritten notes. Information was scattered and unstructured, leading to longer prep times and sometimes missed critical details.",
    results: "50% reduction in pre-consultation prep time, improved diagnostic accuracy as important details were never missed, patients no longer had to repeat medical history during calls.",
    features: ["Medical OCR Processing", "Clinical NLP Models", "Patient History Summarization", "Workflow Integration"],
    color: "from-emerald-500/20 to-teal-500/20",
    icon: FaHeart,
    countries: ["🇮🇳", "🇨🇦", "🇬🇧"]
  },
  {
    id: 3,
    title: "Predictive Maintenance for Vehicle Fleets",
    shortDescription: "IoT and AI-powered predictive maintenance system reducing fleet breakdowns by 40%",
    illustration: DataFlow,
    category: "Automotive",
    techStack: [SiPython, SiTensorflow, SiAmazon, SiDocker],
    fullDescription: "Built a predictive maintenance system for fleet operators. IoT sensors embedded in vehicles tracked engine health, fuel efficiency, temperature, and braking patterns. Time-series deep learning models (LSTMs) learned normal vs failing performance patterns with anomaly detection flagging deviations.",
    challenges: "Fleet operators managing hundreds of vehicles faced costly breakdowns and unplanned downtime. Preventive maintenance based on mileage or time wasn't enough — engines, brakes, and electronics still failed unpredictably.",
    results: "40% reduction in breakdowns across the fleet, significant decrease in warranty and repair costs, improved vehicle uptime leading to more reliable service and happier customers.",
    features: ["Real-time IoT Monitoring", "LSTM Failure Prediction", "Anomaly Detection", "Fleet Management Dashboard"],
    color: "from-blue-500/20 to-cyan-500/20",
    icon: FaCar,
    countries: ["🇺🇸", "🇩🇪", "🇦🇺"]
  },
  {
    id: 4,
    title: "Virtual Avatars for Human Interaction",
    shortDescription: "Scalable AI avatars providing human-like interaction across healthcare, retail, and education",
    illustration: HolographicInterface,
    category: "AI Avatars",
    techStack: [SiPython, SiTensorflow, SiReact, SiNodedotjs],
    fullDescription: "Developed AI-powered avatar system combining conversational intelligence, visual realism, and multimodal input. Avatars could see, listen, and respond like people — available 24/7, at scale, adaptable to different domains. Neural rendering techniques created 3D avatars with perfect lip-sync and emotional expressions.",
    challenges: "Digital platforms needed human-like interaction for millions of users without scaling staff proportionally. Traditional chatbots lacked personality, emotional nuance, and contextual understanding — they didn't feel alive.",
    results: "Healthcare: Doctors saved hours per day. Retail: Higher conversion rates with digital sales assistants. Education: Higher satisfaction and retention with interactive tutoring. Entertainment: Successful hybrid engagement and commerce.",
    features: ["Speech-to-Animation Models", "Neural Rendering", "Multimodal Understanding", "Domain-Specific Grounding"],
    color: "from-indigo-500/20 to-purple-500/20",
    icon: FaUsers,
    countries: ["🇺🇸", "🇯🇵", "🇸🇬", "🇮🇳"]
  }
];

const categories = ["All", "AI Commerce", "Healthcare", "Automotive", "AI Avatars"];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function UpdatedPortfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof caseStudies[0] | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const filteredProjects = activeFilter === "All" 
    ? caseStudies 
    : caseStudies.filter(project => project.category === activeFilter);

  const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const openModal = (project: typeof caseStudies[0]) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="portfolio" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6" ref={sectionRef}>
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-foreground"
            whileHover={{ scale: 1.02 }}
          >
            Our <span className="text-primary">Case Studies</span>
          </motion.h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Real solutions, real impact. Discover how we've transformed businesses across industries with cutting-edge AI technology.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div 
          className="flex justify-center mb-12 flex-wrap gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeFilter === category
                  ? "bg-primary text-black shadow-lg shadow-primary/25"
                  : "bg-muted/20 text-muted-foreground hover:bg-muted/30 hover:text-foreground"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              data-testid={`filter-${category.toLowerCase().replace(" ", "-")}`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-20">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const IllustrationComponent = project.illustration;
              const IconComponent = project.icon;
              
              return (
                <motion.div
                  key={`${activeFilter}-${project.id}`}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  layout
                  className="perspective-1000"
                >
                  <motion.div
                    className={`relative glassmorphism-strong rounded-3xl overflow-hidden cursor-pointer group h-full ${
                      hoveredCard === project.id ? "shadow-2xl shadow-primary/20" : ""
                    }`}
                    whileHover={{ 
                      rotateY: 3,
                      rotateX: 3,
                      scale: 1.02,
                      transition: { duration: 0.3 }
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15, duration: 0.6 }}
                    onHoverStart={() => setHoveredCard(project.id)}
                    onHoverEnd={() => setHoveredCard(null)}
                    onClick={() => openModal(project)}
                    data-testid={`card-portfolio-${project.id}`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Countries flags */}
                    <div className="absolute top-4 right-4 flex gap-1 z-10">
                      {project.countries.map((flag, i) => (
                        <motion.span
                          key={i}
                          className="text-lg"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            delay: i * 0.3
                          }}
                        >
                          {flag}
                        </motion.span>
                      ))}
                    </div>

                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-60`} />
                    
                    {/* Content */}
                    <div className="relative p-8 flex flex-col h-full">
                      {/* Icon and Category */}
                      <div className="flex items-center justify-between mb-4">
                        <motion.div
                          className="p-3 bg-primary/20 rounded-xl"
                          whileHover={{ rotate: 10, scale: 1.1 }}
                        >
                          <IconComponent className="text-primary text-xl" />
                        </motion.div>
                        <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {project.category}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                        {project.shortDescription}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex gap-3 mb-4">
                        {project.techStack.slice(0, 4).map((TechIcon, techIndex) => (
                          <motion.div
                            key={techIndex}
                            className="p-2 bg-muted/20 rounded-lg"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            <TechIcon className="text-primary text-sm" />
                          </motion.div>
                        ))}
                        {project.techStack.length > 4 && (
                          <div className="p-2 bg-muted/20 rounded-lg text-xs text-muted-foreground flex items-center">
                            +{project.techStack.length - 4}
                          </div>
                        )}
                      </div>

                      {/* CTA */}
                      <motion.button
                        className="w-full py-3 bg-primary text-black rounded-xl font-semibold hover:bg-primary/80 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        View Case Study →
                      </motion.button>
                    </div>

                    {/* Illustration - positioned in background */}
                    <div className="absolute top-1/2 right-4 transform -translate-y-1/2 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none w-32 h-32">
                      <IllustrationComponent />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Global Impact Stats */}
        <motion.div
          className="glassmorphism-strong p-8 rounded-3xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-8 text-primary">Global Impact</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-foreground mb-2">10+</div>
              <div className="text-sm text-muted-foreground">Countries</div>
              <div className="text-lg mt-2">🌍</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground mb-2">1M+</div>
              <div className="text-sm text-muted-foreground">Users Impacted</div>
              <div className="text-lg mt-2">👥</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground mb-2">40%</div>
              <div className="text-sm text-muted-foreground">Avg. Efficiency Gain</div>
              <div className="text-lg mt-2">📈</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">AI Support</div>
              <div className="text-lg mt-2">🤖</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="glassmorphism-strong rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              data-testid={`modal-project-${selectedProject.id}`}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-muted/20 hover:bg-muted/30 transition-colors"
                data-testid="button-close-modal"
              >
                <FaTimes className="text-muted-foreground" />
              </button>

              {/* Countries */}
              <div className="flex gap-2 mb-4">
                {selectedProject.countries.map((flag, i) => (
                  <span key={i} className="text-2xl">{flag}</span>
                ))}
              </div>

              <div className="flex items-center gap-4 mb-6">
                <selectedProject.icon className="text-primary text-3xl" />
                <div>
                  <h2 className="text-3xl font-bold text-foreground">{selectedProject.title}</h2>
                  <p className="text-primary font-semibold">{selectedProject.category}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-foreground">The Challenge</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{selectedProject.challenges}</p>
                  
                  <h3 className="text-xl font-bold mb-4 text-foreground">Our Solution</h3>
                  <p className="text-muted-foreground leading-relaxed">{selectedProject.fullDescription}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 text-foreground">Key Features</h3>
                  <ul className="space-y-3 mb-6">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-xl font-bold mb-4 text-foreground">Results</h3>
                  <p className="text-muted-foreground leading-relaxed">{selectedProject.results}</p>

                  <h3 className="text-xl font-bold mb-4 mt-6 text-foreground">Technologies Used</h3>
                  <div className="flex gap-3">
                    {selectedProject.techStack.map((TechIcon, techIndex) => (
                      <div key={techIndex} className="p-3 bg-muted/20 rounded-xl">
                        <TechIcon className="text-primary text-xl" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}