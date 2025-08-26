import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { FloatingCTA } from "./InteractiveAssets";
import ScrollProgress from "./ScrollProgress";
import { GalaxyParticles } from "./GalaxyEffects";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <ScrollProgress />
      <GalaxyParticles />
      <Header />
      <main className="relative z-10">{children}</main>
      <Footer />
      <FloatingCTA />
      
      {/* Enhanced Floating Particles Background */}
      <div className="floating-particles fixed inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div 
            key={i}
            className="particle" 
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}
