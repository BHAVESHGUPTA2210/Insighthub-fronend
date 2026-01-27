"use client";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  ArrowLeft,
  Zap,
  Shield,
  Users,
  FileText,
  Cpu,
  FileSearch,
  GitMerge,
  BarChart3,
  MessageSquare,
  CheckCircle,
  Clock,
  FileCode,
  Network,
  Puzzle,
  Search,
  BookOpen,
  ChevronRight,
  Sparkles,
  Bot,
  Moon,
  Sun
} from "lucide-react";

export default function Info() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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

  const categories = [
    { id: "all", label: "All Features", icon: <Sparkles size={18} /> },
    { id: "ai", label: "AI Capabilities", icon: <Bot size={18} /> },
    { id: "integration", label: "Integrations", icon: <GitMerge size={18} /> },
    { id: "analytics", label: "Analytics", icon: <BarChart3 size={18} /> },
    { id: "automation", label: "Automation", icon: <Zap size={18} /> },
    // { id: "security", label: "Security", icon: <Shield size={18} /> },
  ];

const features = [
    {
      id: 1,
      title: "Global Search",
      description: "Unified search across all platforms - Jira, Confluence, documents, code repositories, and more.",
      icon: <Search size={24} />,
      category: "ai",
      status: "live",
      benefits: ["Single search interface", "Cross-platform results", "Fuzzy matching"],
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/30",
      borderColor: "border-blue-200 dark:border-blue-800"
    },
    {
      id: 2,
      title: "Document Search",
      description: "Advanced semantic search across all document types with intelligent ranking and filtering.",
      icon: <FileSearch size={24} />,
      category: "ai",
      status: "live",
      benefits: ["Semantic understanding", "OCR for scanned docs", "Version comparison"],
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/30",
      borderColor: "border-purple-200 dark:border-purple-800"
    },
    {
      id: 3,
      title: "Project-Specific AI Models",
      description: "Custom-trained AI models optimized for different project types and domains.",
      icon: <Cpu size={24} />,
      category: "ai",
      status: "beta",
      benefits: ["Domain-specific optimization", "Custom training", "Adaptive learning"],
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/30",
      borderColor: "border-emerald-200 dark:border-emerald-800"
    },
    {
      id: 4,
      title: "Smart Ticket Analysis",
      description: "AI-powered analysis of Jira tickets with sentiment detection, priority scoring, and automated categorization.",
      icon: <MessageSquare size={24} />,
      category: "ai",
      status: "live",
      benefits: ["Reduces manual review time", "Identifies high-priority issues", "Automates categorization"],
      color: "from-blue-600 to-blue-700",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      borderColor: "border-blue-300 dark:border-blue-700"
    },
    {
      id: 5,
      title: "Real-time Confluence Search",
      description: "Instant semantic search across all Confluence pages with intelligent relevance ranking and content summarization.",
      icon: <BookOpen size={24} />,
      category: "ai",
      status: "live",
      benefits: ["Finds relevant docs instantly", "Summarizes long articles", "Cross-references related content"],
      color: "from-purple-600 to-purple-700",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
      borderColor: "border-purple-300 dark:border-purple-700"
    },
    {
      id: 6,
      title: "Test Case Generation",
      description: "Generate comprehensive test cases from requirements and user stories using AI.",
      icon: <FileCode size={24} />,
      category: "automation",
      status: "beta",
      benefits: ["Saves 80% test planning time", "Ensures coverage", "Updates with requirements"],
      color: "from-emerald-600 to-emerald-700",
      bgColor: "bg-emerald-100 dark:bg-emerald-900/20",
      borderColor: "border-emerald-300 dark:border-emerald-700"
    },
    {
      id: 7,
      title: "Multi-platform Integration",
      description: "Seamlessly connect with Jira, Confluence, GitHub, Azure DevOps, and Slack.",
      icon: <GitMerge size={24} />,
      category: "integration",
      status: "live",
      benefits: ["Unified workflow", "Real-time sync", "No context switching"],
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50 dark:bg-pink-900/30",
      borderColor: "border-pink-200 dark:border-pink-800"
    },
    {
      id: 8,
      title: "Automated Reporting",
      description: "Generate comprehensive reports with one click - from sprint reviews to executive summaries.",
      icon: <FileText size={24} />,
      category: "automation",
      status: "live",
      benefits: ["Saves hours weekly", "Consistent formatting", "Real-time data"],
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/30",
      borderColor: "border-orange-200 dark:border-orange-800"
    },
    {
      id: 9,
      title: "Knowledge Graph",
      description: "Visual representation of connections between tickets, docs, code, and team members.",
      icon: <Network size={24} />,
      category: "analytics",
      status: "beta",
      benefits: ["Visual relationships", "Identifies knowledge gaps", "Improves onboarding"],
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/30",
      borderColor: "border-green-200 dark:border-green-800"
    },
  ];

  const upcomingFeatures = [
     {
      title: "Personal Projects",
      description: "Create your personal database to answer your query",
      eta: "Q1 2025",
      icon: <Puzzle size={20} />
    }
  ];

  const stats = [
    { value: "20+", label: "Integrations", description: "Supported platforms" },
    { value: "99%", label: "Uptime", description: "Service reliability" },
    { value: "90%", label: "Accuracy", description: "Accuracy Rate" },
    { value: "5s", label: "Response Time", description: "Average query speed" },
  ];

  const filteredFeatures = activeCategory === "all" 
    ? features 
    : features.filter(feature => feature.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100 overflow-hidden transition-colors duration-200">
      {/* Animated background */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(168, 85, 247, 0.05), transparent 80%)`,
        }}
      />

      {/* Header */}
      <header className="relative z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
              </button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">InsightsHub</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Features & Capabilities</p>
                </div>
              </div>
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
              
              <button
                onClick={() => navigate("/project")}
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:shadow-md transition-all duration-300"
              >
                Try Now
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full mb-6 border border-purple-100 dark:border-purple-800">
            <Zap size={16} className="text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Powerful Features Ahead</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 dark:from-purple-500 dark:via-purple-600 dark:to-purple-700 bg-clip-text text-transparent">
              Everything You Need
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">To Supercharge Your Workflow</span>
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Discover how InsightsHub transforms your QA and DevOps processes with 
            AI-powered features designed to boost productivity, ensure quality, and accelerate delivery.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <div 
              key={idx}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="text-3xl font-bold text-purple-700 dark:text-purple-400 mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Category Filter */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Explore Features</h2>
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-gray-700"
                }`}
              >
                {category.icon}
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredFeatures.map((feature) => (
            <div
              key={feature.id}
              className={`group relative p-6 ${feature.bgColor} rounded-xl border ${feature.borderColor} shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
            >
              {/* Status badge */}
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  feature.status === 'live' 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800'
                    : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                }`}>
                  {feature.status === 'live' ? '🚀 Live' : '🔬 Beta'}
                </span>
              </div>

              {/* Icon */}
              <div className={`mb-5 p-3 w-fit rounded-lg bg-gradient-to-r ${feature.color} shadow`}>
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-5">
                {feature.description}
              </p>

              {/* Benefits */}
              <div className="space-y-2 mb-6">
                {feature.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.color}`} />
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Learn more
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <button className="flex items-center gap-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
                  Learn more
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div> */}
            </div>
          ))}
        </div>

        {/* Upcoming Features */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Coming Soon</h2>
              <p className="text-gray-600 dark:text-gray-400">Exciting features currently in development</p>
            </div>
            <div className="px-4 py-2 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 rounded-lg border border-purple-100 dark:border-purple-800">
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Roadmap</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingFeatures.map((feature, idx) => (
              <div 
                key={idx}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg">
                    {feature.icon}
                  </div>
                  <div className="px-3 py-1 bg-gradient-to-r from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-800/30 rounded-full border border-amber-200 dark:border-amber-800">
                    <span className="text-sm font-medium text-amber-700 dark:text-amber-400">{feature.eta}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Comparison */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl border border-purple-100 dark:border-purple-900/30 p-8 mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Choose InsightsHub?</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Compare how we stack up against traditional methods
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                  <Clock size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Time Savings</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>90% faster ticket analysis</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>80% reduction in manual searches</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>70% faster report generation</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
                  <Shield size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Quality & Accuracy</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>90% accuracy in categorization</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>Zero missed compliance checks</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>Consistent SOP adherence</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg">
                  <Users size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Team Productivity</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>40% faster onboarding</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>50% fewer meetings needed</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>Better cross-team collaboration</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Join thousands of teams who have accelerated their QA and DevOps processes with InsightsHub.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/project")}
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:shadow-xl transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-3">
                  <Bot size={20} />
                  Start Free Trial
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </span>
              </button>
              
              <button
                onClick={() => navigate("/")}
                className="px-8 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:border-purple-400 dark:hover:border-purple-600 hover:text-purple-700 dark:hover:text-purple-400 transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-3">
                  <BookOpen size={20} />
                  View Documentation
                </span>
              </button>
            </div>
            
            <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
              • 15-day free trial • Full feature access
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-purple-700 dark:text-purple-300">InsightsHub</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">Features & Capabilities</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/")}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-700 dark:hover:text-purple-400 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => navigate("/project")}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-700 dark:hover:text-purple-400 transition-colors"
              >
                Assistant
              </button>
              <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-700 dark:hover:text-purple-400 transition-colors">
                Documentation
              </button>
              <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-700 dark:hover:text-purple-400 transition-colors">
                Contact
              </button>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} InsightsHub • AI-Powered Knowledge Platform • Enterprise Ready
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}