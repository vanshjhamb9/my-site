import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import AboutPage from "@/pages/about";
import ServicesPage from "@/pages/services";
import PortfolioPage from "@/pages/portfolio";
import TeamPage from "@/pages/team";
import ContactPage from "@/pages/contact";
import PrimodiaPage from "@/pages/primodia";
import BlogPage from "@/pages/blog";
import BlogDetailPage from "@/pages/blog-detail";
import BlogAdminPage from "@/pages/blog-admin";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";


function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={AboutPage} />
      <Route path="/services" component={ServicesPage} />
      <Route path="/portfolio" component={PortfolioPage} />
      <Route path="/team" component={TeamPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/primodia" component={PrimodiaPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:slug" component={BlogDetailPage} />
      <Route path="/admin/blog" component={BlogAdminPage} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
