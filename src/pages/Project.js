"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Rocket,  
  CheckCircle, 
  Sparkles, 
  ArrowRight,
  Search,
  BarChart3,
  Shield,
  Zap,
  Globe,
  Server,
  ArrowLeft,
  Moon,
  Sun
} from "lucide-react";

const PROJECTS = [
  { 
    name: "BidBot", 
    description: "Automated bidding and procurement system",
    icon: <Rocket className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500",
    stats: "• Documents • JIRA • Confluence"
  },
  { 
    name: "PVE", 
    description: "Product Validation and Evaluation platform",
    icon: <Shield className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
    stats: "• Documents • JIRA • Confluence"
  }
];

export default function ProjectPage() {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Load saved theme
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleStart = () => {
    if (!selectedProject) return;

    setIsAnimating(true);
    
    // Store in sessionStorage
    sessionStorage.setItem("selected_project", selectedProject.name);
    sessionStorage.setItem(
      "project_key",
      selectedProject.name.toLowerCase().replace(/[\s.]/g, "_")
    );

    // Add animation delay before navigation
    setTimeout(() => {
      navigate("/chat");
    }, 500);
  };

  useEffect(() => {
    // Reset animation when selection changes
    setIsAnimating(false);
  }, [selectedProject]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100 overflow-hidden transition-colors duration-200">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(139, 92, 246, 0.2) 2px, transparent 0)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Header with back button and theme toggle */}
      <header className="relative z-10 p-6 border-b border-purple-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="hidden md:inline">Back</span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg shadow">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-purple-700 dark:text-purple-300">InsightsHub</span>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-500" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 md:px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full mb-6 border border-purple-200 dark:border-purple-800">
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Project Selection</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gray-900 dark:text-white">Select Your</span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 dark:from-purple-500 dark:via-blue-500 dark:to-cyan-500 bg-clip-text text-transparent">
              Knowledge Project
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose a project to start exploring with AI-powered insights, documentation analysis, and intelligent assistance.
          </p>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-4xl w-full">
          {PROJECTS.map((project) => (
            <div
              key={project.name}
              onClick={() => setSelectedProject(project)}
              className={`relative cursor-pointer p-6 bg-white dark:bg-gray-800 rounded-2xl border-2 transition-all duration-300 group ${
                selectedProject?.name === project.name
                  ? "border-purple-500 dark:border-purple-600 shadow-xl scale-[1.02]"
                  : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-lg"
              }`}
            >
              {/* Selection indicator */}
              {selectedProject?.name === project.name && (
                <div className="absolute -top-2 -right-2">
                  <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-lg">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                </div>
              )}

              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`p-3 rounded-xl bg-gradient-to-br ${project.color} shadow-md`}>
                  <div className="text-white">
                    {project.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Server className="w-3 h-3" />
                    {project.stats}
                  </div>
                </div>
              </div>

              {/* Hover effect line */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl bg-gradient-to-r ${project.color} transition-transform duration-300 ${
                selectedProject?.name === project.name ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`} />
            </div>
          ))}
        </div>

        {/* Features Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl">
          <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg mb-2">
              <Search className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 text-center">Multi Type Search</div>
          </div>
          
          <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg mb-2">
              <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 text-center">Instant Answers</div>
          </div>
          
          <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg mb-2">
              <BarChart3 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 text-center">Project Insight</div>
          </div>
          
          <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="p-2 bg-cyan-50 dark:bg-cyan-900/30 rounded-lg mb-2">
              <Globe className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 text-center">Multi Project</div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="relative">
          <button
            onClick={handleStart}
            disabled={!selectedProject || isAnimating}
            className={`group relative px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 overflow-hidden ${
              selectedProject && !isAnimating
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-xl hover:scale-105"
                : "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
            }`}
          >
            {/* Shimmer effect */}
            <div className={`absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] ${
              selectedProject && "group-hover:translate-x-[100%]"
            } transition-transform duration-700`} />
            
            <span className="flex items-center justify-center gap-3 relative">
              {isAnimating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Launching...</span>
                </>
              ) : (
                <>
                  {selectedProject ? (
                    <>
                      <span>Start with {selectedProject.name}</span>
                      <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </>
                  ) : (
                    "Select a Project"
                  )}
                </>
              )}
            </span>
          </button>
          
          {!selectedProject && (
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-gray-500 dark:text-gray-400">
              {/* Optional: Add hint text here */}
            </div>
          )}
        </div>

        {/* Bottom info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-600 dark:text-gray-400">All systems operational • Powered by Azure AI</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Secure • Enterprise-ready • Real-time updates
          </p>
        </div>
      </div>

      {/* Floating helper */}
      <div className="fixed bottom-6 left-6 z-20">
        <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Ready to assist</span>
          </div>
        </div>
      </div>
    </div>
  );
}