import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaMobile, FaRobot, FaChartLine, FaCogs, FaRocket, FaTimes } from "react-icons/fa";
import { SiReact, SiPython, SiTensorflow, SiNodedotjs, SiMongodb, SiAmazon, SiDocker, SiKubernetes } from "react-icons/si";
import { useInView } from "react-intersection-observer";

const portfolioSections = [
  {
    id: 1,
    title: "AI-Powered Mobile Banking App",
    description: "Personalized financial insights with AI-driven recommendations and fraud detection.",
    icon: FaMobile,
    category: "Mobile",
    image: "/api/placeholder/400/250",
    techStack: [SiReact, SiNodedotjs, SiTensorflow, SiMongodb],
    features: ["AI Integration", "Cross-platform", "Real-time Analytics", "Push Notifications"],
    fullDescription: "Revolutionary mobile banking application that leverages artificial intelligence to provide personalized financial insights, predictive analytics for spending patterns, and real-time fraud detection. Built with React Native for cross-platform compatibility and integrated with TensorFlow for machine learning capabilities.",
    challenges: "Implementing real-time fraud detection while maintaining app performance and ensuring bank-grade security.",
    results: "40% reduction in fraudulent transactions, 60% increase in user engagement, 4.8/5 app store rating."
  },
  {
    id: 2,
    title: "Enterprise AI Chatbot Platform",
    description: "Multi-language conversational AI for customer support automation across industries.",
    icon: FaRobot,
    category: "AI",
    image: "/api/placeholder/400/250",
    techStack: [SiPython, SiTensorflow, SiNodedotjs, SiAmazon],
    features: ["Natural Language Processing", "Multi-channel Support", "Learning Capabilities", "Custom Workflows"],
    fullDescription: "Comprehensive AI chatbot platform serving enterprise clients with multi-language support, sentiment analysis, and intelligent routing. Processes over 100,000 conversations daily with 95% accuracy rate.",
    challenges: "Building context-aware conversations that maintain coherence across complex multi-turn dialogues.",
    results: "85% reduction in support tickets, 24/7 availability, support for 12+ languages."
  },
  {
    id: 3,
    title: "AI-First E-commerce Transformation",
    description: "Complete digital transformation with AI-powered recommendations and inventory management.",
    icon: FaChartLine,
    category: "AI",
    image: "/api/placeholder/400/250",
    techStack: [SiReact, SiPython, SiTensorflow, SiAmazon],
    features: ["Strategic Planning", "Implementation Roadmap", "Change Management", "ROI Optimization"],
    fullDescription: "End-to-end digital transformation for a major retail chain, implementing AI-driven product recommendations, dynamic pricing, and predictive inventory management across 500+ stores.",
    challenges: "Integrating AI systems with legacy infrastructure while maintaining business continuity.",
    results: "300% increase in online sales, 45% reduction in inventory costs, 2.5x improvement in customer lifetime value."
  },
  {
    id: 4,
    title: "Healthcare Data Analytics Platform",
    description: "HIPAA-compliant platform for medical data analysis and patient outcome prediction.",
    icon: FaCogs,
    category: "Web",
    image: "/api/placeholder/400/250",
    techStack: [SiReact, SiPython, SiTensorflow, SiDocker],
    features: ["2-week Sprints", "Continuous Feedback", "Quality Assurance", "Flexible Scope"],
    fullDescription: "Advanced healthcare analytics platform that processes medical records to predict patient outcomes, optimize treatment plans, and identify potential health risks. Fully HIPAA-compliant with enterprise-grade security.",
    challenges: "Ensuring data privacy compliance while building sophisticated ML models for medical predictions.",
    results: "30% improvement in treatment outcomes, 50% reduction in readmission rates, deployed across 25 hospitals."
  },
  {
    id: 5,
    title: "Smart City IoT Infrastructure",
    description: "Comprehensive IoT network for traffic management, energy optimization, and public safety.",
    icon: FaRocket,
    category: "Design",
    image: "/api/placeholder/400/250",
    techStack: [SiNodedotjs, SiPython, SiMongodb, SiKubernetes],
    features: ["Full Lifecycle", "Post-launch Support", "Maintenance", "Scaling Assistance"],
    fullDescription: "City-wide IoT infrastructure managing traffic lights, energy grids, and emergency response systems. Real-time data processing and AI-driven optimization for urban planning and resource allocation.",
    challenges: "Coordinating thousands of IoT devices while ensuring system reliability and scalability.",
    results: "25% reduction in traffic congestion, 40% energy savings, 60% faster emergency response times."
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

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof portfolioSections[0] | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const filteredProjects = activeFilter === "All" 
    ? portfolioSections 
    : portfolioSections.filter(project => project.category === activeFilter);

  const openModal = (project: typeof portfolioSections[0]) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="portfolio" className="py-20 relative overflow-hidden" ref={sectionRef}>
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Floating Filter Tab */}
        <motion.div 
          className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: inView ? 0 : -100, opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="glassmorphism-strong p-2 rounded-2xl">
            <div className="flex flex-col gap-2">
              {filters.map((filter) => (
                <motion.button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    activeFilter === filter
                      ? "bg-primary text-black"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-testid={`filter-${filter.toLowerCase()}`}
                >
                  {filter}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Success in <span className="text-gradient gold-accent">Action</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            See success in action—discover our approach to AI-first adoption, mobile excellence, and agile delivery.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <AnimatePresence>
            {filteredProjects.map((section, index) => (
              <motion.div
                key={`${activeFilter}-${section.id}`}
                className={`relative glassmorphism-strong rounded-3xl overflow-hidden hover-lift group cursor-pointer ${
                  section.id === 4 ? "lg:col-span-2" : ""
                } ${hoveredCard === section.id ? "shadow-2xl shadow-primary/20" : ""}`}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.9 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                onHoverStart={() => setHoveredCard(section.id)}
                onHoverEnd={() => setHoveredCard(null)}
                onClick={() => openModal(section)}
                data-testid={`card-portfolio-${section.id}`}
              >
                {/* Hover Glow Effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r from-primary via-primary/50 to-primary rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-300`} />
                
                <div className="relative bg-gradient-to-br from-primary/20 to-primary/10 h-48 flex items-center justify-center overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <section.icon className="text-5xl text-primary" />
                  </motion.div>

                  {/* Tech Stack Icons on Hover */}
                  <AnimatePresence>
                    {hoveredCard === section.id && (
                      <motion.div 
                        className="absolute bottom-4 right-4 flex gap-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        {section.techStack.map((TechIcon, idx) => (
                          <motion.div
                            key={idx}
                            className={`w-8 h-8 glassmorphism rounded-lg flex items-center justify-center ${getTechStackColor(TechIcon)}`}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.4 }}
                          >
                            <TechIcon className="text-sm" />
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="relative p-6 bg-card/50 backdrop-blur-sm">
                  <h3 className="text-xl font-bold mb-2 text-primary">{section.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm">{section.description}</p>
                  <div className="space-y-2">
                    {section.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-muted-foreground">
                        <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                        {feature}
                      </div>
                    ))}
                  </div>
                  <motion.div 
                    className="mt-4 text-primary text-sm font-semibold flex items-center gap-2"
                    whileHover={{ x: 5 }}
                  >
                    View Details →
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center glassmorphism-strong p-12 rounded-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-6 text-primary">
            Ready to Transform Your Vision?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            From ideation to launch and beyond, we're your partners in digital transformation.
          </p>
          <motion.button 
            className="glassmorphism-strong px-12 py-4 rounded-full text-primary font-semibold hover:bg-primary hover:text-black transition-all duration-300 hover-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-testid="button-start-project"
          >
            Start Your Project
          </motion.button>
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
              className="glassmorphism-strong rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              data-testid="modal-portfolio"
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 glassmorphism rounded-2xl flex items-center justify-center">
                      <selectedProject.icon className="text-2xl text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-primary">{selectedProject.title}</h3>
                      <p className="text-muted-foreground">{selectedProject.category}</p>
                    </div>
                  </div>
                  <motion.button
                    onClick={closeModal}
                    className="w-10 h-10 glassmorphism rounded-full flex items-center justify-center text-muted-foreground hover:text-primary"
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
                      <h4 className="text-lg font-semibold text-primary mb-3">Project Overview</h4>
                      <p className="text-muted-foreground leading-relaxed">{selectedProject.fullDescription}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-primary mb-3">Key Challenges</h4>
                      <p className="text-muted-foreground leading-relaxed">{selectedProject.challenges}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-primary mb-3">Results Achieved</h4>
                      <p className="text-muted-foreground leading-relaxed">{selectedProject.results}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-primary mb-3">Technology Stack</h4>
                      <div className="flex flex-wrap gap-3">
                        {selectedProject.techStack.map((TechIcon, idx) => (
                          <motion.div
                            key={idx}
                            className={`glassmorphism px-4 py-2 rounded-xl flex items-center gap-2 ${getTechStackColor(TechIcon)}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <TechIcon className="text-lg" />
                            <span className="text-sm font-medium text-foreground">
                              {TechIcon.name?.replace('Si', '') || 'Tech'}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-primary mb-3">Key Features</h4>
                      <div className="space-y-3">
                        {selectedProject.features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            className="flex items-center gap-3 glassmorphism p-3 rounded-xl"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <span className="w-3 h-3 bg-primary rounded-full"></span>
                            <span className="text-foreground font-medium">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4">
                      <motion.button 
                        className="w-full bg-primary text-black font-semibold py-3 rounded-xl hover:bg-primary/80 transition-all"
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