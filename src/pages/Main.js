"use client";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  Sparkles, 
  MessageSquare,
  Search, 
  Zap, 
  BookOpen, 
  GitBranch, 
  Shield,
  ChevronRight,
  Bot,
  Users,
  Database,
  Clock,
  Target,
  BarChart3,
  FileText,
  Cloud,
  Cpu,
  Moon,
  Sun
} from "lucide-react";

export default function Main() {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // const [hoveredCard, setHoveredCard] = useState(null);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Load saved theme
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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

  const features = [
    { 
      icon: <FileText />, 
      title: "Document Search", 
      desc: "Intelligent semantic search across documents", 
      color: "bg-cyan-50 dark:bg-cyan-900/30 border-cyan-200 dark:border-cyan-800",
      iconBg: "bg-gradient-to-br from-cyan-500 to-teal-500",
      textColor: "text-cyan-800 dark:text-cyan-300"
    },
    { 
      icon: <MessageSquare />, 
      title: "Jira Tickets", 
      desc: "Instant ticket analysis and summaries", 
      color: "bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-800",
      iconBg: "bg-gradient-to-br from-indigo-500 to-indigo-600",
      textColor: "text-indigo-800 dark:text-indigo-300"
    },
    { 
      icon: <BookOpen />, 
      title: "Confluence Docs", 
      desc: "Document search and knowledge extraction", 
      color: "bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800",
      iconBg: "bg-gradient-to-br from-purple-500 to-purple-600",
      textColor: "text-purple-800 dark:text-purple-300"
    },
    { 
      icon: <Search />, 
      title: "Global Search", 
      desc: "Unified search across all connected platforms", 
      color: "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800",
      iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
      textColor: "text-blue-800 dark:text-blue-300"
    },
    { 
      icon: <Cpu />, 
      title: "AI Models", 
      desc: "Multiple AI models for different Projects", 
      color: "bg-fuchsia-50 dark:bg-fuchsia-900/30 border-fuchsia-200 dark:border-fuchsia-800",
      iconBg: "bg-gradient-to-br from-fuchsia-500 to-purple-600",
      textColor: "text-fuchsia-800 dark:text-fuchsia-300"
    },
    { 
      icon: <GitBranch />, 
      title: "Automation Code", 
      desc: "Code explanations and best practices", 
      color: "bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800",
      iconBg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      textColor: "text-emerald-800 dark:text-emerald-300"
    },
    { 
      icon: <Database />, 
      title: "Test Data", 
      desc: "Test case generation and validation", 
      color: "bg-violet-50 dark:bg-violet-900/30 border-violet-200 dark:border-violet-800",
      iconBg: "bg-gradient-to-br from-violet-500 to-violet-600",
      textColor: "text-violet-800 dark:text-violet-300"
    },
    { 
      icon: <Users />, 
      title: "Team Insights", 
      desc: "Collaboration patterns and workflows", 
      color: "bg-pink-50 dark:bg-pink-900/30 border-pink-200 dark:border-pink-800",
      iconBg: "bg-gradient-to-br from-pink-500 to-pink-600",
      textColor: "text-pink-800 dark:text-pink-300"
    },
    { 
      icon: <Cloud />, 
      title: "Cloud Integration", 
      desc: "Seamless connection with cloud services and APIs", 
      color: "bg-rose-50 dark:bg-rose-900/30 border-rose-200 dark:border-rose-800",
      iconBg: "bg-gradient-to-br from-rose-500 to-pink-600",
      textColor: "text-rose-800 dark:text-rose-300"
    },
  ];

  const stats = [
    { value: "10x", label: "Faster Resolution", icon: <Zap size={20} />, color: "text-blue-600 dark:text-blue-400" },
    { value: "24/7", label: "AI Assistant", icon: <Clock size={20} />, color: "text-purple-600 dark:text-purple-400" },
    { value: "90%", label: "Accuracy", icon: <Shield size={20} />, color: "text-emerald-600 dark:text-emerald-400" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100 overflow-hidden transition-colors duration-200">
      {/* Light background */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(168, 85, 247, 0.08), transparent 70%)`,
        }}
      />

      {/* Header */}
      <header className="relative z-10 p-6 border-b border-purple-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg shadow">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-purple-700 dark:text-purple-300">
              InsightsHub
            </span>
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

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-16">
        {/* Title */}
        <div className="relative mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-6 border border-purple-200 dark:border-purple-800">
            <Target size={16} className="text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">AI-Powered Knowledge Platform</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="text-gray-900 dark:text-white">Insights Hub</span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 dark:from-purple-500 dark:via-purple-600 dark:to-purple-700 bg-clip-text text-transparent">
              Your Intelligent Knowledge Companion
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mt-6">
            One AI assistant to streamline Jira tickets, Confluence pages, and automation knowledge. 
            Get instant insights and answers for all your QA and DevOps needs.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-12 max-w-2xl">
          {stats.map((stat, idx) => (
            <div 
              key={idx}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-purple-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300"
            >
              <div className="flex flex-col items-center gap-3">
                <div className={`p-3 rounded-full bg-gradient-to-br from-purple-50 to-white dark:from-gray-800 dark:to-gray-900 ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className={`text-3xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <button
            onClick={() => navigate("/project")}
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="flex items-center justify-center gap-3 relative">
              <Bot size={20} />
              Launch AI Assistant
              <ChevronRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </span>
          </button>

          <button
            onClick={() => navigate("/Info")}
            className="group px-8 py-4 bg-white dark:bg-gray-800 border border-purple-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-600 text-purple-700 dark:text-purple-300 rounded-lg font-semibold transition-all duration-300 hover:shadow-md"
          >
            <span className="flex items-center justify-center gap-3">
              <BarChart3 size={20} />
              Explore Features
            </span>
          </button>
        </div>

        {/* Features Grid */}
        <div className="w-full max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-white">
            Everything You Need in One Place
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                // onMouseEnter={() => setHoveredCard(index)}
                // onMouseLeave={() => setHoveredCard(null)}
                className={`group relative p-6 ${feature.color} rounded-xl border shadow-sm hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px]`}
              >
                <div className="flex flex-col">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded-lg ${feature.iconBg} shadow-md`}>
                      {feature.icon}
                    </div>
                    <h3 className={`text-lg font-semibold ${feature.textColor} mt-2`}>{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.desc}</p>
                  
                  <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      {/* Optional: Add learn more link if needed */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Demo Preview */}
        <div className="mt-16 w-full max-w-4xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">See It In Action</h3>
            <p className="text-gray-600 dark:text-gray-400">Experience how our AI assistant delivers instant insights</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-purple-100 dark:border-gray-700 shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 px-6 py-4 border-b border-purple-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full" />
                    <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                  </div>
                  <div className="text-sm font-medium text-purple-700 dark:text-purple-300">AI Assistant Demo</div>
                </div>
                <div className="text-xs px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full border border-purple-200 dark:border-purple-800">
                  Live Preview
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 flex items-center justify-center shadow">
                    <Bot size={18} className="text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-purple-50 dark:bg-gray-900 rounded-lg p-4 border border-purple-100 dark:border-gray-700">
                    <p className="text-gray-700 dark:text-gray-300">
                      I can analyze Jira tickets, extract insights from Confluence docs, 
                      explain automation frameworks, and search across all your documents. 
                      What would you like assistance with today?
                    </p>
                  </div>
                  <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                    Try asking: "How can I optimize our test automation strategy?"
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-white dark:bg-gray-900 border-t border-purple-100 dark:border-gray-800 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-purple-700 dark:text-purple-300">InsightsHub</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
                Your intelligent knowledge companion for QA and DevOps excellence.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3 justify-center">
              <span className="px-3 py-1.5 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg text-xs border border-purple-100 dark:border-purple-800">Azure OpenAI</span>
              <span className="px-3 py-1.5 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg text-xs border border-purple-100 dark:border-purple-800">AI Search</span>
              <span className="px-3 py-1.5 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg text-xs border border-purple-100 dark:border-purple-800">Enterprise Ready</span>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} InsightsHub • AI-Powered Knowledge Platform • POC by Bhavesh Gupta
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-20">
        <button
          onClick={() => navigate("/project")}
          className="p-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          aria-label="Launch Assistant"
        >
          <Bot size={22} />
        </button>
      </div>
    </div>
  );
}