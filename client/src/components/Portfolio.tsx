import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaTimes, FaExternalLinkAlt } from "react-icons/fa";
import { SiReact, SiPython, SiTensorflow, SiNodedotjs, SiMongodb, SiAmazon, SiDocker, SiKubernetes } from "react-icons/si";
import tito from "../image/Tito.png";
import taikonz from "../image/taikonz.webp";
import polara from "../image/getplara.png"
import jivi from "../image/jivi.webp";
import airena from "../image/Home Screen.png";
import metaverse from "../image/unnamed.webp";
import bayut from "../image/bayut.png";
import bigO from "../image/bigo.webp"
import lakshay from "../image/Lakshay.webp"


// Portfolio Data
const portfolioData = [
  {
    id: 2,
    title: "Tito ICO",
    category: "Web3 & Blockchain",
    description: "ICO project showcasing token presales & investor info.",
    link: "https://tito-ico-peach.vercel.app/",
    image: tito,
    techStack: [SiReact, SiNodedotjs],
    features: ["Token Presales", "Investor Dashboard", "Smart Contract Integration"],
    fullDescription: "Template-based ICO project to showcase token presales, investor details, and blockchain transparency.",
    challenges: "Managing real-time token metrics securely.",
    results: "Professional ICO template for investor engagement.",
  },
  {
    id: 3,
    title: "Taikonz DeFi Platform",
    category: "Web3 & Blockchain",
    description: "Decentralized finance platform with yield farming & cross-chain support.",
    link: "https://taikonz.io/",
    image: taikonz,
    techStack: [SiReact, SiNodedotjs, SiMongodb],
    features: ["Yield Farming", "Cross-Chain Support", "Staking"],
    fullDescription: "DeFi platform allowing users to stake assets, farm yields, and interact across blockchain networks.",
    challenges: "Cross-chain liquidity and smart contract reliability.",
    results: "Secure DeFi platform with high user trust.",
  },
  {
    id: 4,
    title: "Polara AI",
    category: "AI Projects",
    description: "AI tool for digital marketers & eCommerce to optimize ad campaigns.",
    link: "http://getpolara.ai/en",
    image: polara,
    techStack: [SiPython, SiTensorflow, SiReact],
    features: ["Predictive Models", "Ad Optimization", "Cross-platform Integration"],
    fullDescription: "AI-powered platform to optimize ad creatives and campaigns using predictive models across platforms.",
    challenges: "Ensuring high prediction accuracy across ad campaigns.",
    results: "Increased ad ROI and efficiency.",
  },
  {
    id: 5,
    title: "Jivi AI Health",
    category: "AI Projects",
    description: "AI-powered health assistant with symptom check, meal planning, and more.",
    link: "https://play.google.com/store/apps/details?id=com.jivi.ai",
    image: jivi,
    techStack: [SiPython, SiReact],
    features: ["Symptom Checker", "Meal Planning", "Health Recommendations"],
    fullDescription: "Virtual health assistant that provides personalized advice and health tracking.",
    challenges: "Integrating AI with medical data accurately.",
    results: "Improved user engagement in health management.",
  },
  
  {
    id: 7,
    title: "Airena Streaming",
    category: "AI Projects",
    description: "Live streaming gaming platform with AI recommendation engine.",
    link: "https://airena.app/",
    image: airena,
    techStack: [SiReact, SiPython],
    features: ["Live Streaming", "AI Recommendations", "Interactive Chat"],
    fullDescription: "Streaming platform recommending content using AI to enhance user experience.",
    challenges: "Real-time AI recommendations for live content.",
    results: "High viewer engagement and content discovery.",
  },
  {
    id: 8,
    title: "Metaverse Gaming",
    category: "Gaming & Entertainment",
    description: "Immersive metaverse game with blockchain assets & NFTs.",
    link: "https://play.google.com/store/apps/details?id=com.easewingaming.metaverse",
    image: metaverse,
    techStack: [SiReact, SiNodedotjs, SiMongodb],
    features: ["Virtual Worlds", "NFTs", "Blockchain Assets", "Quests & Multiplayer"],
    fullDescription: "Metaverse game with NFT assets, virtual worlds, and multiplayer quests.",
    challenges: "Performance optimization for multiplayer environments.",
    results: "Engaging gameplay with blockchain integration.",
  },
  {
    id: 9,
    title: "Bayut",
    category: "Real Estate",
    description: "UAE property portal with 3D tours & pricing analytics.",
    link: "https://www.bayut.com/",
    image: bayut,
    techStack: [SiReact, SiMongodb, SiNodedotjs],
    features: ["Property Listings", "3D Tours", "Analytics", "Agent Management"],
    fullDescription: "UAE property portal providing 3D tours, analytics, and agent management.",
    challenges: "Handling large datasets and 3D visualization.",
    results: "Streamlined property search experience.",
  },
  {
    id: 10,
    title: "BigoHealth",
    category: "Health & Wellness",
    description: "Telemedicine platform connecting patients with doctors for consultations.",
    link: "https://www.bigohealth.com/",
    image: bigO,
    techStack: [SiReact, SiPython, SiDocker],
    features: ["Video Consultations", "Lab Bookings", "Prescriptions"],
    fullDescription: "Platform connecting patients with doctors for consultations and prescriptions.",
    challenges: "Secure video consultations and data privacy.",
    results: "Improved healthcare accessibility.",
  },
  {
    id: 11,
    title: "Lakshya Classes",
    category: "EdTech & Finance",
    description: "Live & recorded coaching with practice tests and performance tracking.",
    link: "https://play.google.com/store/apps/details?id=com.appx.lakshya_classes",
    image: lakshay,
    techStack: [SiReact, SiPython],
    features: ["Live Classes", "Practice Tests", "Performance Analytics"],
    fullDescription: "EdTech platform providing coaching, tests, and tracking student progress.",
    challenges: "Integrating live classes with analytics in real-time.",
    results: "Enhanced learning experience and student performance.",
  },
  
];

// Filters
const filters = ["All", "Web3 & Blockchain", "AI Projects", "Gaming & Entertainment", "Real Estate", "Health & Wellness", "EdTech & Finance", "E-Commerce & D2C"];

// Tech Stack Color Mapping
const getTechStackColor = (TechIcon: any) => {
  const colors: Record<string, string> = {
    SiReact: "text-blue-400",
    SiPython: "text-yellow-400",
    SiTensorflow: "text-orange-400",
    SiNodedotjs: "text-green-400",
    SiMongodb: "text-green-500",
    SiAmazon: "text-orange-500",
    SiDocker: "text-blue-500",
    SiKubernetes: "text-blue-600"
  };
  return colors[TechIcon.name] || "text-primary";
};

// Portfolio Component
export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof portfolioData[0] | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const filteredProjects = activeFilter === "All"
    ? portfolioData
    : portfolioData.filter(p => p.category === activeFilter);

  return (
    <section id="portfolio" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Title */}
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-5xl font-bold mb-4">Our <span className="golden-text">Projects</span></h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore our curated projects spanning Web3, AI, Gaming, Health, Real Estate, and E-Commerce.
          </p>
        </motion.div>

        {/* Interactive Filters */}
        <div className="flex justify-center gap-4 mb-16 flex-wrap">
          {filters.map(filter => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 shadow-md ${
                activeFilter === filter ? "bg-primary text-black" : "bg-white text-primary border border-primary"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {filter}
            </motion.button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                className="relative rounded-3xl overflow-hidden shadow-lg cursor-pointer group"
                whileHover={{ y: -10 }}
                onClick={() => setSelectedProject(project)}
              >
                {/* Project Image */}
               <div className="relative h-64 overflow-hidden rounded-t-3xl flex items-center justify-center bg-gray-100">
  <motion.img
    src={project.image}
    alt={project.title}
    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
  />
  {/* Overlay */}
  <motion.div
    className="absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  >
    <p className="text-white font-semibold text-lg text-center px-4">{project.title}</p>
  </motion.div>
</div>

                {/* Project Info */}
                <div className="p-6 bg-card/50 backdrop-blur-md rounded-b-3xl">
                  <p className="text-muted-foreground mb-2 text-sm">{project.category}</p>
                  <h3 className="text-xl font-bold mb-3 text-primary">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {project.techStack.map((TechIcon, idx) => (
                      <TechIcon key={idx} className={`text-xl ${getTechStackColor(TechIcon)}`} />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA Section */}
        <div className="text-center glassmorphism-strong p-12 rounded-3xl mt-20">
          <h3 className="text-3xl font-bold mb-6 golden-text">Ready to Build Your Dream Project?</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We bring innovative ideas to life across Web3, AI, Gaming, Health, and E-Commerce.
          </p>
          <button className="glassmorphism-strong px-12 py-4 rounded-full button-gold">
            Start Your Project
          </button>
        </div>
      </div>

      {/* Dynamic Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-card/80 glassmorphism-strong rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto p-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-3xl font-bold text-primary">{selectedProject.title}</h3>
                <motion.button
                  onClick={() => setSelectedProject(null)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-primary transition"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                >
                  <FaTimes className="text-white" />
                </motion.button>
              </div>

              {/* Modal Content */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left - Image & Description */}
                <div className="space-y-6">
                  <img src={selectedProject.image} alt={selectedProject.title} className="rounded-2xl object-cover w-full h-64" />
                  <div>
                    <h4 className="text-xl font-semibold text-primary mb-2">Project Overview</h4>
                    <p className="text-muted-foreground">{selectedProject.fullDescription}</p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-primary mb-2">Challenges & Results</h4>
                    <p className="text-muted-foreground mb-1"><strong>Challenges:</strong> {selectedProject.challenges}</p>
                    <p className="text-muted-foreground"><strong>Results:</strong> {selectedProject.results}</p>
                  </div>
                </div>

                {/* Right - Features & Tech Stack */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-primary mb-2">Key Features</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      {selectedProject.features.map((feat, idx) => (
                        <li key={idx}>{feat}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-primary mb-2">Tech Stack</h4>
                    <div className="flex gap-3 flex-wrap">
                      {selectedProject.techStack.map((TechIcon, idx) => (
                        <div key={idx} className={`flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 ${getTechStackColor(TechIcon)}`}>
                          <TechIcon /> <span className="text-sm">{TechIcon.name.replace("Si", "")}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary font-semibold mt-4 hover:underline"
                  >
                    Visit Live Project <FaExternalLinkAlt />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
