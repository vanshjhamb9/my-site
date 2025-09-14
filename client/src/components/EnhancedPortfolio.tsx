import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { FaMobile, FaRobot, FaChartLine, FaCogs, FaRocket, FaTimes } from "react-icons/fa";
import { SiReact, SiPython, SiTensorflow, SiNodedotjs, SiMongodb, SiAmazon, SiDocker, SiKubernetes } from "react-icons/si";
import { useInView } from "react-intersection-observer";
import { 
  AIBrainNetwork, 
  CircuitBoard, 
  DataFlow, 
  HolographicInterface, 
  AbstractWaves 
} from "./CustomIllustrations";

const portfolioProjects = [
  {
    id: 1,
    title: "AI-Powered Mobile Banking App",
    shortDescription: "Revolutionary fintech with AI-driven insights and fraud detection",
    illustration: AIBrainNetwork,
    category: "Mobile",
    techStack: [SiReact, SiNodedotjs, SiTensorflow, SiMongodb],
    fullDescription: "Revolutionary mobile banking application that leverages artificial intelligence to provide personalized financial insights, predictive analytics for spending patterns, and real-time fraud detection. Built with React Native for cross-platform compatibility and integrated with TensorFlow for machine learning capabilities.",
    challenges: "Implementing real-time fraud detection while maintaining app performance and ensuring bank-grade security.",
    results: "40% reduction in fraudulent transactions, 60% increase in user engagement, 4.8/5 app store rating.",
    features: ["AI-Powered Fraud Detection", "Predictive Analytics", "Cross-platform Compatibility", "Real-time Notifications"],
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    id: 2,
    title: "Enterprise AI Chatbot Platform",
    shortDescription: "Multi-language conversational AI automating customer support",
    illustration: CircuitBoard,
    category: "AI",
    techStack: [SiPython, SiTensorflow, SiNodedotjs, SiAmazon],
    fullDescription: "Comprehensive AI chatbot platform serving enterprise clients with multi-language support, sentiment analysis, and intelligent routing. Processes over 100,000 conversations daily with 95% accuracy rate.",
    challenges: "Building context-aware conversations that maintain coherence across complex multi-turn dialogues.",
    results: "85% reduction in support tickets, 24/7 availability, support for 12+ languages.",
    features: ["Natural Language Processing", "Multi-channel Support", "Sentiment Analysis", "Custom Workflows"],
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    id: 3,
    title: "AI-First E-commerce Transformation",
    shortDescription: "Complete digital transformation with intelligent recommendations",
    illustration: DataFlow,
    category: "AI",
    techStack: [SiReact, SiPython, SiTensorflow, SiAmazon],
    fullDescription: "End-to-end digital transformation for a major retail chain, implementing AI-driven product recommendations, dynamic pricing, and predictive inventory management across 500+ stores.",
    challenges: "Integrating AI systems with legacy infrastructure while maintaining business continuity.",
    results: "300% increase in online sales, 45% reduction in inventory costs, 2.5x improvement in customer lifetime value.",
    features: ["AI Recommendations", "Dynamic Pricing", "Inventory Optimization", "Customer Analytics"],
    color: "from-emerald-500/20 to-teal-500/20"
  },
  {
    id: 4,
    title: "Healthcare Data Analytics Platform",
    shortDescription: "HIPAA-compliant platform for medical data analysis",
    illustration: HolographicInterface,
    category: "Web",
    techStack: [SiReact, SiPython, SiTensorflow, SiDocker],
    fullDescription: "Advanced healthcare analytics platform that processes medical records to predict patient outcomes, optimize treatment plans, and identify potential health risks. Fully HIPAA-compliant with enterprise-grade security.",
    challenges: "Ensuring data privacy compliance while building sophisticated ML models for medical predictions.",
    results: "30% improvement in treatment outcomes, 50% reduction in readmission rates, deployed across 25 hospitals.",
    features: ["Predictive Analytics", "HIPAA Compliance", "Treatment Optimization", "Risk Assessment"],
    color: "from-red-500/20 to-orange-500/20"
  },
  {
    id: 5,
    title: "Smart City IoT Infrastructure",
    shortDescription: "Comprehensive IoT network for urban optimization",
    illustration: AbstractWaves,
    category: "Design",
    techStack: [SiNodedotjs, SiPython, SiMongodb, SiKubernetes],
    fullDescription: "City-wide IoT infrastructure managing traffic lights, energy grids, and emergency response systems. Real-time data processing and AI-driven optimization for urban planning and resource allocation.",
    challenges: "Coordinating thousands of IoT devices while ensuring system reliability and scalability.",
    results: "25% reduction in traffic congestion, 40% energy savings, 60% faster emergency response times.",
    features: ["Real-time Monitoring", "Energy Optimization", "Traffic Management", "Emergency Response"],
    color: "from-indigo-500/20 to-blue-500/20"
  },
  {
  id: 6,
  title: "Gaming & Live Streaming Commerce Platform",
  shortDescription: "AI-powered marketplace for viewers, influencers, and vendors blending entertainment with commerce.",
  illustration: HolographicInterface,
  category: "Media & Entertainment",
  techStack: [SiReact, SiNodedotjs, SiTensorflow, SiMongodb], 
  fullDescription: "We built a streaming-first marketplace with AI at the core combining personalization, creator growth, vendor matching, dynamic pricing, and trust & safety systems, all running in real time.",
  challenges: [
    "Balancing needs of viewers, influencers, and vendors simultaneously",
    "Real-time personalization at scale",
    "Fraud detection without breaking user experience"
  ],
  results: [
    "Viewer engagement increased by 40%",
    "Influencer revenue/hour up by 30%",
    "Vendor deal cycle time reduced by half",
    "Checkout conversion improved by 18%"
  ],
  features: [
    "AI-powered recommendations & homepage ranking",
    "Influencer growth engine with quality scoring",
    "Vendor-influencer matching & LLM-based negotiation",
    "Dynamic pricing and uplift modeling",
    "Real-time multimodal moderation & fraud detection"
  ],
  color: "violet"
},
{
  id: 7,
  title: "Healthcare AI-Powered Online Consultations",
  shortDescription: "AI assistant that prepares doctors by extracting insights from patient documents instantly.",
  illustration: DataFlow,
  category: "Healthcare",
  techStack: [SiReact, SiNodedotjs, SiTensorflow, SiMongodb],
  fullDescription: "We automated pre-consultation prep for doctors with OCR, NLP pipelines, and contextual summarization — integrating results directly into the consultation workflow.",
  challenges: [
    "Unstructured medical data from scans, notes, and prescriptions",
    "Ensuring accuracy across multiple languages and terminologies",
    "Maintaining strict privacy compliance"
  ],
  results: [
    "Doctors saved 50% prep time per consultation",
    "Patients avoided repeating history",
    "Diagnostic accuracy improved significantly"
  ],
  features: [
    "Handwriting OCR for prescriptions",
    "Entity extraction for symptoms, diagnoses, and medications",
    "Summarized patient histories",
    "Seamless workflow integration"
  ],
  color: "emerald"
},
{
  id: 8,
  title: "Automobile Predictive Maintenance for Fleets",
  shortDescription: "IoT-powered system predicting vehicle failures before they happen.",
  illustration: CircuitBoard,
  category: "Automotive",
  techStack: [SiReact, SiNodedotjs, SiTensorflow, SiMongodb],
  fullDescription: "We deployed an AI-driven predictive maintenance system using IoT telemetry, anomaly detection, and deep learning to forecast failures and reduce downtime.",
  challenges: [
    "Unpredictable breakdowns despite preventive schedules",
    "Noisy sensor signals requiring preprocessing",
    "Need for real-time actionable insights"
  ],
  results: [
    "Breakdowns reduced by 40%",
    "Warranty & repair costs cut significantly",
    "Vehicle uptime and reliability improved"
  ],
  features: [
    "Real-time telemetry ingestion",
    "Deep learning for degradation trend detection",
    "Anomaly detection on sensor data",
    "Fleet dashboards with risk prioritization"
  ],
  color: "amber"
},
{
  id: 4,
  title: "Virtual Avatars Human Interaction at Scale",
  shortDescription: "AI-driven avatars delivering lifelike, domain-specific human interactions.",
  illustration: AIBrainNetwork,
  category: "Cross-Industry",
  techStack: [SiReact, SiNodedotjs, SiTensorflow, SiMongodb],
  fullDescription: "We built avatars with conversational AI, 3D neural rendering, multimodal understanding, and scalable infrastructure — enabling lifelike engagement across healthcare, retail, education, and entertainment.",
  challenges: [
    "Creating avatars that feel human, not scripted bots",
    "Handling multimodal input (voice, text, images, documents)",
    "Scaling across platforms from web to AR/VR"
  ],
  results: [
    "Healthcare: Doctors saved hours/day via avatar assistants",
    "Retail: Conversion rates boosted through digital sales avatars",
    "Education: Improved satisfaction & retention with interactive tutors",
    "Entertainment: Engaging avatars as companions & moderators"
  ],
  features: [
    "Multilingual speech recognition & expressive TTS",
    "GAN-powered facial realism & micro-expressions",
    "Lip-sync aligned to speech in real time",
    "Domain-specific knowledge grounding with RAG",
    "Cross-platform deployment including AR/VR"
  ],
  color: "indigo"
}

  
  
];

const filters = ["All", "AI", "Design", "Web", "Mobile"];

const getTechStackColor = (TechIcon: any): string => {
  const colors: Record<string, string> = {
    'SiReact': "text-blue-400",
    'SiPython': "text-yellow-400", 
    'SiTensorflow': "text-orange-400",
    'SiNodedotjs': "text-green-400",
    'SiMongodb': "text-green-500",
    'SiAmazon': "text-orange-500",
    'SiDocker': "text-blue-500",
    'SiKubernetes': "text-blue-600"
  };
  return colors[TechIcon.name] || "text-primary";
};

export default function EnhancedPortfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof portfolioProjects[0] | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const filteredProjects = activeFilter === "All" 
    ? portfolioProjects 
    : portfolioProjects.filter(project => project.category === activeFilter);

  const openModal = (project: typeof portfolioProjects[0]) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  const getCardAnimation = (index: number) => {
    const animations = [
      { x: -100, rotate: 0 }, // Slide from left
      { scale: 0.8, rotate: 0 }, // Scale in
      { rotate: -5, x: 0 }, // Rotate slightly
      { y: 50, rotate: 0 }, // Slide from bottom
      { x: 100, rotate: 0 } // Slide from right
    ];
    return animations[index % animations.length];
  };

  return (
    <section id="portfolio" className="py-20 relative overflow-hidden min-h-screen" ref={sectionRef}>
      {/* Enhanced Background with Mesh Gradient */}
      <div className="absolute inset-0">
        {/* Mesh gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/5 to-cyan-900/10"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-primary/5 to-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/5 to-primary/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-emerald-500/5 to-blue-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Floating Filter Tab */}
        <motion.div 
          className="fixed left-6 top-1/2 transform -translate-y-1/2 z-50"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: inView ? 0 : -100, opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="glassmorphism-strong p-3 rounded-2xl backdrop-blur-xl">
            <div className="flex flex-col gap-3">
              {filters.map((filter) => (
                <motion.button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 relative overflow-hidden ${
                    activeFilter === filter
                      ? "bg-primary text-black shadow-lg shadow-primary/25"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-testid={`filter-${filter.toLowerCase()}`}
                >
                  {activeFilter === filter && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary to-yellow-400"
                      layoutId="activeFilter"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{filter}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Header with Animated Title */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-black mb-8 relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          >
            Our <span className="text-accent relative">
              Projects
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-cyan-400"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Discover our portfolio of cutting-edge AI solutions, mobile applications, and digital transformations that drive real business results.
          </motion.p>
        </motion.div>
        
        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const IllustrationComponent = project.illustration;
              const cardAnimation = getCardAnimation(index);
              
              return (
                <motion.div
                  key={`${activeFilter}-${project.id}`}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  layout
                  className={`perspective-1000 ${project.id === 4 ? "lg:col-span-2" : ""}`}
                >
                  <motion.div
                    className={`relative glassmorphism-strong rounded-3xl overflow-hidden cursor-pointer group h-full ${
                      hoveredCard === project.id ? "shadow-2xl shadow-primary/20" : ""
                    }`}
                    whileHover={{ 
                      rotateY: 5,
                      rotateX: 5,
                      scale: 1.02,
                      transition: { duration: 0.3 }
                    }}
                    initial={{ opacity: 0, ...cardAnimation }}
                    animate={{ x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ delay: index * 0.15, duration: 0.6 }}
                    onHoverStart={() => setHoveredCard(project.id)}
                    onHoverEnd={() => setHoveredCard(null)}
                    onClick={() => openModal(project)}
                    data-testid={`card-portfolio-${project.id}`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Hover Glow Effect */}
                    <motion.div 
                      className={`absolute -inset-0.5 bg-gradient-to-r from-primary via-cyan-400 to-primary rounded-3xl opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-500`}
                      animate={hoveredCard === project.id ? {
                        background: [
                          "linear-gradient(45deg, #FFD700, #00FFFF, #FFD700)",
                          "linear-gradient(90deg, #00FFFF, #FFD700, #00FFFF)",
                          "linear-gradient(135deg, #FFD700, #00FFFF, #FFD700)"
                        ]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    
                    {/* Card Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-30`} />
                    
                    {/* Illustration Section */}
                    <div className="relative h-48 flex items-center justify-center p-8 overflow-hidden">
                      <motion.div
                        className="w-32 h-32"
                        animate={hoveredCard === project.id ? {
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        } : {}}
                        transition={{ duration: 2, repeat: hoveredCard === project.id ? Infinity : 0 }}
                      >
                        <IllustrationComponent animate={hoveredCard === project.id} />
                      </motion.div>
                      
                      {/* Parallax Background Elements */}
                      <motion.div
                        className="absolute top-4 right-4 w-2 h-2 bg-primary/40 rounded-full"
                        animate={hoveredCard === project.id ? {
                          y: [-5, 5, -5],
                          opacity: [0.4, 0.8, 0.4]
                        } : {}}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute bottom-4 left-4 w-1 h-1 bg-cyan-400/60 rounded-full"
                        animate={hoveredCard === project.id ? {
                          y: [5, -5, 5],
                          opacity: [0.6, 1, 0.6]
                        } : {}}
                        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                      />
                    </div>

                    {/* Content Section */}
                    <div className="relative p-6 bg-black/40 backdrop-blur-sm">
                      <motion.h3 
                        className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors"
                        layout
                      >
                        {project.title}
                      </motion.h3>
                      <motion.p 
                        className="text-white/70 mb-4 text-sm leading-relaxed"
                        layout
                      >
                        {project.shortDescription}
                      </motion.p>
                      
                      {/* Tech Stack */}
                      <motion.div 
                        className="flex flex-wrap gap-2 mb-4"
                        layout
                      >
                        {project.techStack.slice(0, 4).map((TechIcon, idx) => (
                          <motion.div
                            key={idx}
                            className={`w-8 h-8 glassmorphism rounded-lg flex items-center justify-center ${getTechStackColor(TechIcon)}`}
                            whileHover={{ scale: 1.2, rotate: 15 }}
                            transition={{ duration: 0.2 }}
                          >
                            <TechIcon className="text-sm" />
                          </motion.div>
                        ))}
                      </motion.div>

                      {/* CTA Button */}
                      <motion.div 
                        className="pt-4"
                        layout
                      >
                        <motion.button
                          className="w-full glassmorphism px-4 py-3 rounded-xl text-white font-semibold hover:bg-accent hover:text-black transition-all duration-300 group-hover:shadow-lg"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          View Project Details
                        </motion.button>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center glassmorphism-strong p-12 rounded-3xl relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-cyan-500/5"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-6 text-white">
              Ready to Transform Your Vision?
            </h3>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              From ideation to launch and beyond, we're your partners in digital transformation.
            </p>
            <motion.button 
              className="glassmorphism-strong px-12 py-4 rounded-full text-accent font-semibold hover:bg-accent hover:text-black transition-all duration-300 hover-glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-testid="button-start-project"
            >
              Start Your Project
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="glassmorphism-strong rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              data-testid="modal-portfolio"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${selectedProject.color} opacity-20 rounded-3xl`} />
              <div className="relative z-10 p-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 glassmorphism rounded-2xl flex items-center justify-center p-4">
                      <selectedProject.illustration animate={true} />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h3>
                      <p className="text-accent font-semibold">{selectedProject.category}</p>
                    </div>
                  </div>
                  <motion.button
                    onClick={closeModal}
                    className="w-12 h-12 glassmorphism rounded-full flex items-center justify-center text-white/70 hover:text-white"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    data-testid="button-close-modal"
                  >
                    <FaTimes />
                  </motion.button>
                </div>

                {/* Content */}
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl font-semibold text-accent mb-3">Project Overview</h4>
                      <p className="text-white/80 leading-relaxed">{selectedProject.fullDescription}</p>
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold text-accent mb-3">Key Challenges</h4>
                      <p className="text-white/80 leading-relaxed">{selectedProject.challenges}</p>
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold text-accent mb-3">Results Achieved</h4>
                      <p className="text-white/80 leading-relaxed">{selectedProject.results}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl font-semibold text-accent mb-4">Technology Stack</h4>
                      <div className="flex flex-wrap gap-3">
                        {selectedProject.techStack.map((TechIcon, idx) => (
                          <motion.div
                            key={idx}
                            className={`glassmorphism px-4 py-3 rounded-xl flex items-center gap-3 ${getTechStackColor(TechIcon)}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <TechIcon className="text-lg" />
                            <span className="text-sm font-medium text-white">
                              {TechIcon.name?.replace('Si', '') || 'Tech'}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold text-accent mb-4">Key Features</h4>
                      <div className="space-y-3">
                        {selectedProject.features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            className="flex items-center gap-3 glassmorphism p-4 rounded-xl"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <span className="w-3 h-3 bg-primary rounded-full flex-shrink-0"></span>
                            <span className="text-white font-medium">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4">
                      <motion.button 
                        className="w-full bg-accent text-black font-semibold py-4 rounded-xl hover:bg-accent/80 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        data-testid="button-start-similar-project"
                      >
                        Start Similar Project
                      </motion.button>
                    </div>
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