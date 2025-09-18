import { useState } from "react";
import { motion } from "framer-motion";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import BlogAdmin from "./BlogAdmin";

// Simple admin gate - in production, use proper authentication
const ADMIN_PASSWORD = "admin123"; // In production, this should be in environment variables

export default function BlogAdminGate() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API check delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast({
        title: "Access granted",
        description: "Welcome to the blog administration panel.",
      });
    } else {
      toast({
        title: "Access denied",
        description: "Incorrect password. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  if (isAuthenticated) {
    return <BlogAdmin />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="glassmorphism-strong">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
              <FaLock className="text-primary" />
              Admin Access
            </CardTitle>
            <p className="text-muted-foreground">
              Enter the admin password to access the blog management panel.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-12"
                  data-testid="input-admin-password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-muted-foreground" />
                  ) : (
                    <FaEye className="text-muted-foreground" />
                  )}
                </Button>
              </div>
              <Button
                type="submit"
                className="w-full bg-primary text-black hover:bg-primary/80"
                disabled={isLoading || !password.trim()}
                data-testid="button-admin-login"
              >
                {isLoading ? "Authenticating..." : "Access Admin Panel"}
              </Button>
            </form>
            
            {/* Demo hint */}
            <div className="mt-6 p-3 bg-muted/20 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">
                <strong>Demo Password:</strong> admin123
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                In production, implement proper authentication
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}