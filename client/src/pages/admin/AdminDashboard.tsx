import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Users, BarChart3, FileText, LogOut } from "lucide-react";
import LeadsManagement from "./LeadsManagement";
import Analytics from "./Analytics";
import BlogManagement from "./BlogManagement";

type TabType = "leads" | "analytics" | "blogs";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<TabType>("leads");

  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuth");
    if (!adminAuth) {
      setLocation("/admin/login");
    }
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setLocation("/admin/login");
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white" data-testid="text-admin-title">
            Admin Dashboard
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2" data-testid="nav-admin-sidebar">
          <button
            onClick={() => setActiveTab("leads")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "leads"
                ? "bg-accent text-accent-foreground"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
            }`}
            data-testid="button-nav-leads"
          >
            <Users className="h-5 w-5" />
            <span>Leads</span>
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "analytics"
                ? "bg-accent text-accent-foreground"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
            }`}
            data-testid="button-nav-analytics"
          >
            <BarChart3 className="h-5 w-5" />
            <span>Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab("blogs")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "blogs"
                ? "bg-accent text-accent-foreground"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
            }`}
            data-testid="button-nav-blogs"
          >
            <FileText className="h-5 w-5" />
            <span>Blogs</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <Button
            variant="outline"
            className="w-full justify-start gap-3"
            onClick={handleLogout}
            data-testid="button-logout"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {activeTab === "leads" && <LeadsManagement />}
        {activeTab === "analytics" && <Analytics />}
        {activeTab === "blogs" && <BlogManagement />}
      </main>
    </div>
  );
}
