"use client";

import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
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
  MessageSquarePlus,
  Layers,
  Database,
  Sparkles,
  Bot,
  Moon,
  Sun,
  Target
} from "lucide-react";
import * as THREE from 'three';
import ProfileDropdown from './components/ProfileDropdown';

export default function Info() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [theme, setTheme] = useState("light");
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  // Modern color palette matching other pages
  const colors = {
    light: {
      primary: '#8B5CF6', // Vibrant purple
      secondary: '#EC4899', // Pink
      accent: '#3B82F6', // Blue
    },
    dark: {
      primary: '#A78BFA', // Light purple
      secondary: '#F472B6', // Light pink
      accent: '#60A5FA', // Light blue
    }
  };

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
    
    // Initialize 3D scene
    initThreeScene();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        if (sceneRef.current.renderer) {
          sceneRef.current.renderer.dispose();
        }
      }
    };
  }, []);

  useEffect(() => {
    // Update scene colors when theme changes
    if (sceneRef.current) {
      const currentColors = theme === 'light' ? colors.light : colors.dark;
      if (sceneRef.current.particles) {
        sceneRef.current.particles.material.color.setStyle(currentColors.primary);
      }
      if (sceneRef.current.orb) {
        sceneRef.current.orb.material.color.setStyle(currentColors.primary);
      }
      if (sceneRef.current.ring1) {
        sceneRef.current.ring1.material.color.setStyle(currentColors.secondary);
      }
      if (sceneRef.current.ring2) {
        sceneRef.current.ring2.material.color.setStyle(currentColors.accent);
      }
      if (sceneRef.current.ring3) {
        sceneRef.current.ring3.material.color.setStyle(currentColors.secondary);
      }
    }
  }, [theme]);

 const initThreeScene = () => {
       if (!canvasRef.current) return;
   
       const scene = new THREE.Scene();
       const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
       const renderer = new THREE.WebGLRenderer({ 
         canvas: canvasRef.current, 
         alpha: true,
         antialias: true 
       });
   
       renderer.setSize(window.innerWidth, window.innerHeight);
       renderer.setPixelRatio(window.devicePixelRatio);
   
       
   
       // Create a BIG central glowing orb (globe) - LIGHTER VERSION
 const orbGeometry = new THREE.SphereGeometry(3.5, 128, 128);
 
 // Create texture for the globe - LIGHTER COLORS
 const canvas = document.createElement('canvas');
 canvas.width = 1024;
 canvas.height = 512;
 const ctx = canvas.getContext('2d');
 
 // LIGHTER gradient colors
 const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
 gradient.addColorStop(0, '#C084FC'); // Lighter purple (from violet-400)
 gradient.addColorStop(0.5, '#F9A8D4'); // Lighter pink (from fuchsia-300)
 gradient.addColorStop(1, '#93C5FD'); // Lighter blue (from blue-300)
 
 ctx.fillStyle = gradient;
 ctx.fillRect(0, 0, canvas.width, canvas.height);
 
 // Add grid lines - MORE SUBTLE
 ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)'; // Whiter, more visible
 ctx.lineWidth = 2; // Thinner lines
 
 // Draw latitude lines
 for(let i = 0; i <= 16; i++) {
   const y = (i / 16) * canvas.height;
   ctx.beginPath();
   ctx.moveTo(0, y);
   ctx.lineTo(canvas.width, y);
   ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
   ctx.stroke();
 }
 
 // Draw longitude lines
 for(let i = 0; i <= 24; i++) {
   const x = (i / 24) * canvas.width;
   ctx.beginPath();
   ctx.moveTo(x, 0);
   ctx.lineTo(x, canvas.height);
   ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
   ctx.stroke();
 }
 
 const texture = new THREE.CanvasTexture(canvas);
 
 // MORE TRANSPARENT material
 const orbMaterial = new THREE.MeshPhongMaterial({
   map: texture,
   transparent: true,
   opacity: 0.15, // Reduced from 0.2 to 0.15
   shininess: 30, // Reduced shininess
   emissive: new THREE.Color('#E879F9'), // Lighter emissive color
   emissiveIntensity: 0.2 // Reduced intensity
 });
 
 const orb = new THREE.Mesh(orbGeometry, orbMaterial);
 scene.add(orb);
 
 // LIGHTER wireframe sphere
 const wireframeGeometry = new THREE.SphereGeometry(3.52, 64, 64);
 const wireframeMaterial = new THREE.MeshBasicMaterial({
   color: '#E879F9', // Lighter purple
   wireframe: true,
   transparent: true,
   opacity: 0.1 // More transparent
 });
 const wireframeSphere = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
 scene.add(wireframeSphere);
 
 // LIGHTER rings
 const ringGeometry = new THREE.TorusGeometry(5.0, 0.06, 32, 200); // Thinner rings
 
 // Ring 1 - Lighter pink
 const ringMaterial1 = new THREE.MeshPhongMaterial({
   color: '#F9A8D4', // Fuchsia-300
   transparent: true,
   opacity: 0.15,
   emissive: new THREE.Color('#F9A8D4'),
   emissiveIntensity: 0.05
 });
 
 const ring1 = new THREE.Mesh(ringGeometry, ringMaterial1);
 ring1.rotation.x = Math.PI / 2;
 ring1.rotation.z = 0.3;
 scene.add(ring1);
 
 // Ring 2 - Lighter blue
 const ringMaterial2 = new THREE.MeshPhongMaterial({
   color: '#93C5FD', // Blue-300
   transparent: true,
   opacity: 0.15
 });
 
 const ring2 = new THREE.Mesh(ringGeometry, ringMaterial2);
 ring2.rotation.y = Math.PI / 3;
 ring2.rotation.x = Math.PI / 4;
 scene.add(ring2);
 
 // Ring 3 - Lighter purple
 const ringMaterial3 = new THREE.MeshPhongMaterial({
   color: '#C084FC', // Violet-400
   transparent: true,
   opacity: 0.15
 });
 
 const ring3 = new THREE.Mesh(ringGeometry, ringMaterial3);
 ring3.rotation.y = Math.PI / 1.5;
 ring3.rotation.x = Math.PI / 3;
 scene.add(ring3);
 
 // LIGHTER orbiting particles
 const orbitParticlesGeometry = new THREE.BufferGeometry();
 const orbitCount = 200;
 const orbitPosArray = new Float32Array(orbitCount * 3);
 
 for(let i = 0; i < orbitCount; i++) {
   const angle = (i / orbitCount) * Math.PI * 2;
   const radius = 6.0;
   const height = Math.sin(angle * 3) * 1.5;
   orbitPosArray[i*3] = Math.cos(angle) * radius;
   orbitPosArray[i*3+1] = Math.sin(angle) * radius * 0.5 + height;
   orbitPosArray[i*3+2] = Math.sin(angle) * radius * 0.5;
 }
 
 orbitParticlesGeometry.setAttribute('position', new THREE.BufferAttribute(orbitPosArray, 3));
 const orbitParticlesMaterial = new THREE.PointsMaterial({
   color: '#93C5FD', // Light blue
   size: 0.08, // Smaller particles
   transparent: true,
   opacity: 0.3
 });
 const orbitParticles = new THREE.Points(orbitParticlesGeometry, orbitParticlesMaterial);
 scene.add(orbitParticles);
 
 // LIGHTER background particles
 const particlesGeometry = new THREE.BufferGeometry();
 const particlesCount = 2000; // Fewer particles
 const posArray = new Float32Array(particlesCount * 3);
 const colorArray = new Float32Array(particlesCount * 3);
 
 for(let i = 0; i < particlesCount * 3; i += 3) {
   // Position - spread particles
   posArray[i] = (Math.random() - 0.5) * 60; // Wider spread
   posArray[i+1] = (Math.random() - 0.5) * 60;
   posArray[i+2] = (Math.random() - 0.5) * 60;
 
   // Lighter colors
   const colors = ['#C084FC', '#F9A8D4', '#93C5FD'];
   const selectedColor = colors[Math.floor(Math.random() * colors.length)];
   colorArray[i] = parseInt(selectedColor.slice(1,3), 16) / 255;
   colorArray[i+1] = parseInt(selectedColor.slice(3,5), 16) / 255;
   colorArray[i+2] = parseInt(selectedColor.slice(5,7), 16) / 255;
 }
 
 particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
 particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
 
 const particlesMaterial = new THREE.PointsMaterial({
   size: 0.06,
   vertexColors: true,
   transparent: true,
   opacity: 0.25,
   blending: THREE.AdditiveBlending,
   sizeAttenuation: true
 });
 
 const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
 scene.add(particlesMesh);
 
 // LIGHTER lights
 const ambientLight = new THREE.AmbientLight(0x404060);
 scene.add(ambientLight);
 
 const light1 = new THREE.PointLight(0xFFFFFF, 1); // White light
 light1.position.set(5, 5, 8);
 scene.add(light1);
 
 const light2 = new THREE.PointLight(0xFFFFFF, 1); // White light
 light2.position.set(-5, -3, 6);
 scene.add(light2);
 
 const light3 = new THREE.PointLight(0xFFFFFF, 0.8);
 light3.position.set(0, 5, 10);
 scene.add(light3);
   
       // Position camera
       camera.position.z = 12;
       camera.position.y = 1;
   
       // Store references
       sceneRef.current = {
         scene,
         camera,
         renderer,
         particles: particlesMesh,
         orb,
         wireframeSphere,
         ring1,
         ring2,
         ring3,
         orbitParticles,
         animationId: null
       };
   
       // Animation loop
       const animate = () => {
         if (!sceneRef.current) return;
   
         // Rotate globe slowly
         sceneRef.current.orb.rotation.y += 0.001;
         sceneRef.current.orb.rotation.x += 0.0005;
         sceneRef.current.wireframeSphere.rotation.y += 0.001;
         sceneRef.current.wireframeSphere.rotation.x += 0.0005;
   
         // Rotate rings at different speeds
         sceneRef.current.ring1.rotation.y += 0.0008;
         sceneRef.current.ring1.rotation.x += 0.0004;
         sceneRef.current.ring2.rotation.y += 0.0012;
         sceneRef.current.ring2.rotation.z += 0.0008;
         sceneRef.current.ring3.rotation.x += 0.0015;
         sceneRef.current.ring3.rotation.z += 0.001;
   
         // Rotate orbiting particles
         sceneRef.current.orbitParticles.rotation.y += 0.002;
         sceneRef.current.orbitParticles.rotation.x += 0.0005;
   
         // Rotate background particles slowly
         sceneRef.current.particles.rotation.y += 0.0001;
         sceneRef.current.particles.rotation.x += 0.00005;
   
         renderer.render(scene, camera);
         sceneRef.current.animationId = requestAnimationFrame(animate);
       };
   
       animate();
   
       // Handle resize
       const handleResize = () => {
         camera.aspect = window.innerWidth / window.innerHeight;
         camera.updateProjectionMatrix();
         renderer.setSize(window.innerWidth, window.innerHeight);
       };
   
       window.addEventListener('resize', handleResize);
   
       sceneRef.current.cleanup = () => {
         window.removeEventListener('resize', handleResize);
       };
     };
   
 

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
    { id: "analytics", label: "Analytics", icon: <BarChart3 size={18} /> },
    { id: "automation", label: "Automation", icon: <Zap size={18} /> },
  ];

  const features = [
   {
    id: 1,
    title: "Global Search",
    description: "Context-aware AI search that unifies project data and live web intelligence — delivering comprehensive answers from a single interface.",
    icon: <Search size={24} />,
    category: "ai",
    status: "live",
    benefits: [
      "Project context switching",
      "Internal + web results",
      "Single unified interface"
    ],
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/30",
    borderColor: "border-blue-200 dark:border-blue-800"
  },
    {
    id: 2,
    title: "Project-Specific Search",
    description: "AI-powered search within selected project context, delivering precise and relevant insights from project-specific data sources.",
    icon: <FileSearch size={24} />,
    category: "ai",
    status: "live",
    benefits: [
      "Context-aware results",
      "Project-level filtering",
      "Cross-source data retrieval"
    ],
    color: "from-purple-500 to-indigo-500",
    bgColor: "bg-purple-50 dark:bg-purple-900/30",
    borderColor: "border-purple-200 dark:border-purple-800"
  },
   {
      id: 3,
      title: "Project-Specific AI Intelligence",
      description: "Powered by GPT-4.o, delivering context-aware insights tailored to each project's data and workflows.",
      icon: <Cpu size={24} />,
      category: "ai",
      status: "beta",
      benefits: [
        "GPT-4.o powered reasoning",
        "Project-context adaptation",
        "Intelligent summarization & analysis"
      ],
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/30",
      borderColor: "border-emerald-200 dark:border-emerald-800"
    },
   {
      id: 4,
      title: "Smart Ticket Intelligence",
      description: "GPT-4 powered analysis of Jira tickets with contextual summarization, impact assessment, and intelligent categorization.",
      icon: <MessageSquare size={24} />,
      category: "ai",
      status: "live",
      benefits: [
        "Reduces manual triage effort",
        "Highlights critical blockers",
        "Auto-generates concise summaries"
      ],
      color: "from-blue-600 to-blue-700",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      borderColor: "border-blue-300 dark:border-blue-700"
    },
    {
      id: 5,
      title: "Intelligent Confluence Discovery",
      description: "Real-time AI search across Confluence spaces with contextual understanding and instant content summarization.",
      icon: <BookOpen size={24} />,
      category: "ai",
      status: "live",
      benefits: [
        "Instant knowledge retrieval",
        "Summarizes lengthy documentation",
        "Surfaces related decisions & references"
      ],
      color: "from-purple-600 to-purple-700",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
      borderColor: "border-purple-300 dark:border-purple-700"
    },
   {
      id: 6,
      title: "AI-Powered Test Case Generation",
      description: "Automatically generate structured, traceable test cases from requirements and user stories using GPT-4 powered intelligence.",
      icon: <FileCode size={24} />,
      category: "automation",
      status: "beta",
      benefits: [
        "Reduces test design effort significantly",
        "Improves requirement traceability",
        "Maintains alignment with evolving requirements"
      ],
      color: "from-emerald-600 to-emerald-700",
      bgColor: "bg-emerald-100 dark:bg-emerald-900/20",
      borderColor: "border-emerald-300 dark:border-emerald-700"
    },
   {
      id: 7,
      title: "Automated Reporting & Release Insights",
      description: "Generate AI-powered sprint, release, and executive reports from Jira and connected systems with a single click.",
      icon: <FileText size={24} />,
      category: "automation",
      status: "live",
      benefits: [
        "Real-time release metrics from Jira",
        "Executive-ready summaries",
        "Consistent, auto-formatted reports"
      ],
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/30",
      borderColor: "border-orange-200 dark:border-orange-800"
    },
    {
      id: 8,
      title: "Knowledge Graph & Delivery Mapping",
      description: "Visualize relationships between Jira tickets, Confluence docs, code repositories, releases, and team members for complete delivery visibility.",
      icon: <Network size={24} />,
      category: "analytics",
      status: "beta",
      benefits: [
        "End-to-end release traceability",
        "Identifies blockers & dependency risks",
        "Accelerates onboarding & impact analysis"
      ],
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/30",
      borderColor: "border-green-200 dark:border-green-800"
    }
  ];

  const upcomingFeatures = [
  {
    title: "SharePoint Integration",
    description: "Direct access, indexing, and semantic search across SharePoint documents — unifying structured and unstructured enterprise repositories.",
    icon: <Database size={22} />,
    eta: "Q1 2026"
  },
  {
    title: "Personalized Intelligence Layer",
    description: "Dedicated personal project spaces with configurable databases and flexible schemas for domain-specific knowledge management.",
    icon: <Layers size={22} />,
    eta: "Q2 2026"
  },
  {
    title: "AI-Assisted Jira Task & Bug Creation",
    description: "Automatically create Jira tasks and bugs from AI conversations with contextual suggestions and smart field mapping.",
    icon: <MessageSquarePlus size={22} />,
    eta: "Feasibility Phase"
  },
  {
    title: "Automated Release Document Generation",
    description: "Generate structured release notes and delivery summaries from Jira ticket history and sprint data.",
    icon: <FileText size={22} />,
    eta: "Feasibility Phase"
  }
];


  const stats = [
    { value: "99%", label: "Uptime", description: "Service reliability" },
    { value: "90%", label: "Accuracy", description: "Accuracy Rate" },
    { value: "10s", label: "Response Time", description: "Average query speed" },
  ];

  const filteredFeatures = activeCategory === "all" 
    ? features 
    : features.filter(feature => feature.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] via-white to-[#DBEAFE] dark:from-[#1E1B4B] dark:via-[#1E1B4B] dark:to-[#172554] text-gray-900 dark:text-gray-100 overflow-hidden transition-colors duration-200 relative">
      
      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Enhanced Background with Multiple Layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 via-transparent to-blue-100/30 dark:from-purple-950/20 dark:via-transparent dark:to-blue-950/20" />
        
        <div className="absolute top-0 -left-40 w-[500px] h-[500px] bg-gradient-to-r from-violet-400/30 to-fuchsia-400/30 dark:from-violet-700/20 dark:to-fuchsia-700/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-blob" />
        <div className="absolute top-0 -right-40 w-[500px] h-[500px] bg-gradient-to-r from-blue-400/30 to-cyan-400/30 dark:from-blue-700/20 dark:to-cyan-700/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-20 w-[600px] h-[600px] bg-gradient-to-r from-pink-400/30 to-purple-400/30 dark:from-pink-700/20 dark:to-purple-700/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-blob animation-delay-4000" />
        
        <div className="absolute inset-0 opacity-20 dark:opacity-30" 
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '50px 50px',
            color: theme === 'light' ? '#8B5CF6' : '#A78BFA'
          }} 
        />
        
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-violet-400/30 to-fuchsia-400/30 dark:from-violet-500/20 dark:to-fuchsia-500/20 animate-float"
              style={{
                width: Math.random() * 8 + 4 + 'px',
                height: Math.random() * 8 + 4 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: Math.random() * 5 + 's',
                animationDuration: Math.random() * 10 + 15 + 's',
                filter: 'blur(1px)'
              }}
            />
          ))}
        </div>
      </div>

      {/* Light follow effect */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.08), transparent 70%)`,
          zIndex: 1
        }}
      />

      {/* Header */}
      <header className="relative" style={{ zIndex: 50 }}>
        <div className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-xl border-b border-white/50 dark:border-gray-800 sticky top-0">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 px-4 py-2 text-violet-700 dark:text-violet-300 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/30 dark:border-gray-700"
                >
                  <ArrowLeft size={20} />
                  <span className="hidden md:inline">Back</span>
                </button>
                <div className="flex items-center gap-3">
                  <img 
                    src="/accenture.png" 
                    alt="Accenture" 
                    className="h-8 w-auto object-contain"
                  />
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                      InsightsHub
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Features & Capabilities</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Profile Dropdown */}
                <ProfileDropdown />
                
                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-xl bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 backdrop-blur-sm border border-purple-200/50 dark:border-gray-700 shadow-lg hover:shadow-xl transform hover:scale-110"
                  title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
                >
                  {theme === "light" ? (
                    <Moon className="w-5 h-5 text-violet-600" />
                  ) : (
                    <Sun className="w-5 h-5 text-yellow-500" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-full mb-6 border border-white/50 dark:border-gray-700">
              <Target size={16} className="text-violet-600 dark:text-violet-400" />
              <span className="text-sm font-medium bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                Powerful Features Ahead
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-blue-600 dark:from-violet-400 dark:via-fuchsia-400 dark:to-blue-400 bg-clip-text text-transparent">
                Everything You Need
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">To Supercharge Your Delivery</span>
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Explore how InsightsHub redefines modern delivery workflows with AI-powered insights that enhance efficiency, governance, and release velocity.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
            {stats.map((stat, idx) => (
              <div 
                key={idx}
                className="group backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 p-6 rounded-xl border border-white/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-violet-300 dark:hover:border-violet-600"
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent mb-2">
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
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
              Explore Features
            </h2>
            <div className="flex flex-wrap gap-3 mb-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 backdrop-blur-sm ${
                    activeCategory === category.id
                      ? "bg-gradient-to-r from-violet-600 via-fuchsia-600 to-blue-600 text-white shadow-xl scale-105"
                      : "bg-white/40 dark:bg-gray-800/40 text-gray-700 dark:text-gray-300 border border-white/50 dark:border-gray-700/50 hover:border-violet-300 dark:hover:border-violet-600 hover:bg-white/60 dark:hover:bg-gray-800/60 hover:scale-105"
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
                className={`group relative p-6 backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 rounded-xl border border-white/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-violet-300 dark:hover:border-violet-600`}
              >
                {/* Status badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                    feature.status === 'live' 
                      ? 'bg-green-100/80 dark:bg-green-900/50 text-green-800 dark:text-green-300 border border-green-200/50 dark:border-green-800'
                      : 'bg-blue-100/80 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800'
                  }`}>
                    {feature.status === 'live' ? '🚀 Live' : '🔬 Beta'}
                  </span>
                </div>

                {/* Icon */}
                <div className={`mb-5 p-3 w-fit rounded-lg bg-gradient-to-r ${feature.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
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
              </div>
            ))}
          </div>

          {/* Upcoming Features */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent mb-2">
                  Coming Soon
                </h2>
                <p className="text-gray-600 dark:text-gray-400">Exciting features currently in development</p>
              </div>
              <div className="px-4 py-2 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-lg border border-white/50 dark:border-gray-700">
                <span className="text-sm font-medium bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                  Roadmap
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {upcomingFeatures.map((feature, idx) => (
                <div 
                  key={idx}
                  className="group backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 p-6 rounded-xl border border-white/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-violet-300 dark:hover:border-violet-600"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-br from-violet-100/80 to-fuchsia-100/80 dark:from-gray-800 dark:to-gray-900 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <div className="px-3 py-1 bg-gradient-to-r from-amber-100/80 to-amber-50/80 dark:from-amber-900/50 dark:to-amber-800/50 backdrop-blur-sm rounded-full border border-amber-200/50 dark:border-amber-800">
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
          <div className="backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 rounded-2xl border border-white/50 dark:border-gray-700/50 p-8 mb-16 shadow-xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-blue-600 dark:from-violet-400 dark:via-fuchsia-400 dark:to-blue-400 bg-clip-text text-transparent mb-4">
                Why Choose InsightsHub?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Compare how we stack up against traditional methods
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="backdrop-blur-sm bg-white/60 dark:bg-gray-900/70 p-6 rounded-xl border border-white/60 dark:border-gray-700/70 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow">
                    <Clock size={20} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Time Savings → Accelerated Delivery Execution</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle size={16} className="text-green-500" />
                    <span> Instant AI-powered ticket and document analysis</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>Unified project and web search from a single interface</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>One-click sprint, release, and executive reporting</span>
                  </li>
                </ul>
              </div>

              <div className="backdrop-blur-sm bg-white/60 dark:bg-gray-900/70 p-6 rounded-xl border border-white/60 dark:border-gray-700/70 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow">
                    <Shield size={20} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Quality & Accuracy → Intelligent Precision & Governance</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>Context-aware categorization powered by GPT-4.o</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>Structured, traceable insights across Jira and Confluence</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>Consistent, AI-driven documentation standards</span>
                  </li>
                </ul>
              </div>

              <div className="backdrop-blur-sm bg-white/60 dark:bg-gray-900/70 p-6 rounded-xl border border-white/60 dark:border-gray-700/70 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg shadow">
                    <Users size={20} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Team Productivity → Enhanced Team Performance</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>Faster onboarding through centralized knowledge access</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>Reduced dependency on manual updates and status meetings</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>Clear visibility across tickets, documentation, and releases</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center py-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-blue-600 dark:from-violet-400 dark:via-fuchsia-400 dark:to-blue-400 bg-clip-text text-transparent mb-6">
                Ready to Redefine How Your Team Delivers?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
               Smarter workflows. Unified intelligence. Faster outcomes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate("/project")}
                  className="group relative px-8 py-4 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-blue-600 hover:from-violet-700 hover:via-fuchsia-700 hover:to-blue-700 text-white rounded-xl font-semibold transition-all duration-500 hover:shadow-2xl overflow-hidden transform hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <span className="flex items-center justify-center gap-3 relative">
                    <Bot size={20} />
                    Launch AI Assistant
                    <ChevronRight className="group-hover:translate-x-2 transition-transform duration-300" size={18} />
                  </span>
                </button>
              </div>
              
              <div className="mt-8 text-sm text-gray-500 dark:text-gray-400 backdrop-blur-sm inline-block px-4 py-2 rounded-full border border-white/30 dark:border-gray-700/30">
                • Demo Application  • Full feature access
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative" style={{ zIndex: 10 }}>
        <div className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-xl border-t border-white/50 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-3 mb-3">
                  <img 
                    src="/accenture.png" 
                    alt="Accenture" 
                    className="h-6 w-auto object-contain"
                  />
                  <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                    accenture
                  </span>
                  <span className="text-gray-400 text-sm">|</span>
                  <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                    InsightsHub
                  </span>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={() => navigate("/main")}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-violet-700 dark:hover:text-violet-400 transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => navigate("/project")}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-violet-700 dark:hover:text-violet-400 transition-colors"
                >
                  Assistant
                </button>
                <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-violet-700 dark:hover:text-violet-400 transition-colors">
                  Contact
                </button>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/50 dark:border-gray-800 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} Accenture. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-float {
          animation: float 15s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}