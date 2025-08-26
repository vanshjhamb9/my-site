import { motion } from "framer-motion";

// Country flags and data for global reach
export const countriesData = [
  { flag: "🇺🇸", name: "United States", projects: 15, code: "US" },
  { flag: "🇮🇳", name: "India", projects: 12, code: "IN" },
  { flag: "🇬🇧", name: "United Kingdom", projects: 8, code: "GB" },
  { flag: "🇨🇦", name: "Canada", projects: 6, code: "CA" },
  { flag: "🇦🇺", name: "Australia", projects: 5, code: "AU" },
  { flag: "🇩🇪", name: "Germany", projects: 7, code: "DE" },
  { flag: "🇯🇵", name: "Japan", projects: 4, code: "JP" },
  { flag: "🇸🇬", name: "Singapore", projects: 3, code: "SG" },
  { flag: "🇰🇷", name: "South Korea", projects: 2, code: "KR" },
  { flag: "🇫🇷", name: "France", projects: 3, code: "FR" }
];

export function AnimatedCountryFlags() {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {countriesData.map((country, index) => (
        <motion.div
          key={country.code}
          className="flex flex-col items-center glassmorphism p-4 rounded-xl hover-lift"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          viewport={{ once: true }}
          whileHover={{ 
            scale: 1.1,
            y: -5,
            boxShadow: "0 10px 25px rgba(91, 206, 213, 0.2)"
          }}
        >
          <motion.div 
            className="text-4xl mb-2"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              delay: index * 0.5
            }}
          >
            {country.flag}
          </motion.div>
          <div className="text-center">
            <div className="text-sm font-semibold text-foreground">{country.name}</div>
            <div className="text-xs text-primary">{country.projects} projects</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function FloatingCountryBadges() {
  const topCountries = countriesData.slice(0, 5);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {topCountries.map((country, index) => (
        <motion.div
          key={country.code}
          className="absolute"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0
          }}
          animate={{
            x: Math.random() * (window.innerWidth - 100),
            y: Math.random() * (window.innerHeight - 100),
            opacity: [0, 0.6, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 8 + index * 2,
            repeat: Infinity,
            delay: index * 1.5
          }}
        >
          <div className="glassmorphism p-2 rounded-lg text-center">
            <div className="text-xl">{country.flag}</div>
            <div className="text-xs text-primary font-semibold mt-1">
              {country.projects}+
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}