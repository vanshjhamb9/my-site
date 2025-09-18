import { motion } from "framer-motion";
import { FaTwitter, FaFacebook, FaLinkedin, FaWhatsapp, FaLink, FaEnvelope } from "react-icons/fa";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface SocialShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  size?: "sm" | "md" | "lg";
}

export function SocialShareButtons({ url, title, description, size = "md" }: SocialShareButtonsProps) {
  const { toast } = useToast();
  const [isSharing, setIsSharing] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || title);

  const socialPlatforms = [
    {
      name: "Twitter",
      icon: FaTwitter,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "#1DA1F2",
      hoverColor: "#0d8bd9"
    },
    {
      name: "Facebook",
      icon: FaFacebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "#4267B2",
      hoverColor: "#365899"
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "#2867B2",
      hoverColor: "#235999"
    },
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: "#25D366",
      hoverColor: "#20ba5a"
    },
    {
      name: "Email",
      icon: FaEnvelope,
      url: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
      color: "#6B7280",
      hoverColor: "#4B5563"
    }
  ];

  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg"
  };

  const copyToClipboard = async () => {
    setIsSharing(true);
    try {
      if (navigator.share && size === "lg") {
        // Use native sharing if available and on mobile
        await navigator.share({
          title,
          text: description,
          url
        });
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(url);
        toast({
          title: "Link copied!",
          description: "Post URL has been copied to your clipboard.",
        });
      }
    } catch (error) {
      // Silent fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      
      toast({
        title: "Link copied!",
        description: "Post URL has been copied to your clipboard.",
      });
    } finally {
      setIsSharing(false);
    }
  };

  const openShareWindow = (shareUrl: string, platform: string) => {
    const width = 600;
    const height = 400;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    
    const shareWindow = window.open(
      shareUrl,
      `share-${platform}`,
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );
    
    // Focus the share window
    if (shareWindow) {
      shareWindow.focus();
    }
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Social Platform Buttons */}
      {socialPlatforms.map((platform, index) => (
        <motion.button
          key={platform.name}
          onClick={() => openShareWindow(platform.url, platform.name.toLowerCase())}
          className={`${sizeClasses[size]} rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg hover:shadow-xl`}
          style={{ backgroundColor: platform.color }}
          whileHover={{ 
            scale: 1.1,
            backgroundColor: platform.hoverColor
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          data-testid={`button-share-${platform.name.toLowerCase()}`}
        >
          <platform.icon />
        </motion.button>
      ))}

      {/* Copy Link Button */}
      <motion.button
        onClick={copyToClipboard}
        disabled={isSharing}
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center bg-muted/20 text-muted-foreground hover:bg-primary hover:text-black transition-all duration-300 shadow-lg hover:shadow-xl`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: socialPlatforms.length * 0.1, duration: 0.3 }}
        data-testid="button-copy-link"
      >
        <FaLink className={isSharing ? "animate-pulse" : ""} />
      </motion.button>
    </div>
  );
}

// Social Share Stats Component (for analytics)
export function SocialShareStats({ postId }: { postId: string }) {
  // This could be enhanced to track share counts
  // For now, it's a placeholder for future analytics
  return (
    <div className="text-sm text-muted-foreground">
      Share this post with your network
    </div>
  );
}