"use client";

import { useNavigate } from "react-router-dom";
// Add this import at the top with other imports
import ProfileDropdown from './components/ProfileDropdown'; 
import { useState, useEffect, useRef } from "react";
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
import * as THREE from 'three';

export default function Main() {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [theme, setTheme] = useState("light");
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  // Modern color palette matching login page
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
      if (sceneRef.current.ring) {
        sceneRef.current.ring.material.color.setStyle(currentColors.secondary);
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

  const features = [
    { 
      icon: <MessageSquare />, 
      title: "Jira Tickets", 
      desc: "Automated ticket analysis with intelligent summaries, impact insights, and action recommendations.",  
      color: "bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-800",
      iconBg: "bg-gradient-to-br from-indigo-500 to-indigo-600",
      textColor: "text-indigo-800 dark:text-indigo-300"
    },
    { 
      icon: <BookOpen />, 
      title: "Confluence Docs", 
      desc: "Extract structured knowledge, summaries, and key decisions from Confluence spaces effortlessly.", 
      color: "bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800",
      iconBg: "bg-gradient-to-br from-purple-500 to-purple-600",
      textColor: "text-purple-800 dark:text-purple-300"
    },
    { 
      icon: <Search />, 
      title: "Global Search", 
      desc: "Seamlessly toggle from project-specific knowledge to live web search for comprehensive answers.", 
      color: "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800",
      iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
      textColor: "text-blue-800 dark:text-blue-300"
    },
        { 
      icon: <FileText />, 
      title: "Document Search", 
      desc: "AI-powered semantic search to instantly discover relevant insights across enterprise documents.",  
      color: "bg-cyan-50 dark:bg-cyan-900/30 border-cyan-200 dark:border-cyan-800",
      iconBg: "bg-gradient-to-br from-cyan-500 to-teal-500",
      textColor: "text-cyan-800 dark:text-cyan-300"
    },
    { 
      icon: <Database />, 
      title: "Test Data", 
      desc: "Centralized access to Jira test case records for traceability, validation, and reporting.", 
      color: "bg-violet-50 dark:bg-violet-900/30 border-violet-200 dark:border-violet-800",
      iconBg: "bg-gradient-to-br from-violet-500 to-violet-600",
      textColor: "text-violet-800 dark:text-violet-300"
    },
    { 
      icon: <Users />, 
      title: "Team Insights", 
      desc: "Get visibility into team members, responsibilities, and collaboration mapping.", 
      color: "bg-pink-50 dark:bg-pink-900/30 border-pink-200 dark:border-pink-800",
      iconBg: "bg-gradient-to-br from-pink-500 to-pink-600",
      textColor: "text-pink-800 dark:text-pink-300"
    }
  ];

  const stats = [
    { value: "10x", label: "Faster Resolution", icon: <Zap size={20} />, color: "text-blue-600 dark:text-blue-400" },
    { value: "24/7", label: "AI Assistant", icon: <Clock size={20} />, color: "text-purple-600 dark:text-purple-400" },
    { value: "90%", label: "Accuracy", icon: <Shield size={20} />, color: "text-emerald-600 dark:text-emerald-400" },
  ];
 
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
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 via-transparent to-blue-100/30 dark:from-purple-950/20 dark:via-transparent dark:to-blue-950/20" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-0 -left-40 w-[500px] h-[500px] bg-gradient-to-r from-violet-400/30 to-fuchsia-400/30 dark:from-violet-700/20 dark:to-fuchsia-700/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-blob" />
        <div className="absolute top-0 -right-40 w-[500px] h-[500px] bg-gradient-to-r from-blue-400/30 to-cyan-400/30 dark:from-blue-700/20 dark:to-cyan-700/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-20 w-[600px] h-[600px] bg-gradient-to-r from-pink-400/30 to-purple-400/30 dark:from-pink-700/20 dark:to-purple-700/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-blob animation-delay-4000" />
        
        {/* Geometric Pattern */}
        <div className="absolute inset-0 opacity-20 dark:opacity-30" 
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '50px 50px',
            color: theme === 'light' ? '#8B5CF6' : '#A78BFA'
          }} 
        />
        
        {/* Floating Particles */}
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
        <div className="p-6 border-b border-purple-200/50 dark:border-gray-800 backdrop-blur-xl bg-white/30 dark:bg-gray-900/30">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="/accenture.png" 
                alt="Accenture" 
                className="h-8 w-auto object-contain"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                InsightsHub
              </span>
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
      </header>

      {/* Hero Section */}
      <main className="relative" style={{ zIndex: 10 }}>
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16">
          {/* Title */}
          <div className="relative mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-full mb-6 border border-white/50 dark:border-gray-700">
              <Target size={16} className="text-violet-600 dark:text-violet-400" />
              <span className="text-sm font-medium bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                AI-Powered Knowledge Platform
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-gray-900 dark:text-white">Insights Hub</span>
              <br />
              <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-blue-600 dark:from-violet-400 dark:via-fuchsia-400 dark:to-blue-400 bg-clip-text text-transparent">
                Your Intelligent Knowledge Companion
              </span>
            </h1>
            
            <p className="text-lg md:text-xl font-semibold text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mt-6">
              A unified AI assistant designed to streamline Jira, Confluence, and project delivery workflows — empowering QA, DevOps, and Development teams with instant, actionable insights.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-12 max-w-2xl">
            {stats.map((stat, idx) => (
              <div 
                key={idx}
                className="group backdrop-blur-xl bg-white/60 dark:bg-gray-900/70 p-6 rounded-xl border border-white/60 dark:border-gray-700/70 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-violet-300 dark:hover:border-violet-600"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className={`p-3 rounded-full bg-gradient-to-br from-violet-200/80 to-white dark:from-gray-800 dark:to-gray-900 ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                    {stat.icon}
                  </div>
                  <div className={`text-3xl font-bold ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <button
              onClick={() => navigate("/project")}
              className="group relative px-8 py-4 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-blue-600 hover:from-violet-700 hover:via-fuchsia-700 hover:to-blue-700 text-white rounded-xl font-semibold transition-all duration-500 hover:shadow-2xl overflow-hidden transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_50%)]" />
              <span className="flex items-center justify-center gap-3 relative">
                <Bot size={20} />
                Launch AI Assistant
                <ChevronRight className="group-hover:translate-x-2 transition-transform duration-300" size={18} />
              </span>
            </button>

            <button
              onClick={() => navigate("/Info")}
              className="group px-8 py-4 bg-white/60 dark:bg-gray-900/70 backdrop-blur-sm border border-white/60 dark:border-gray-700/70 hover:border-violet-400 dark:hover:border-violet-600 text-violet-700 dark:text-violet-300 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl transform hover:scale-105"
            >
              <span className="flex items-center justify-center gap-3">
                <BarChart3 size={20} />
                Explore Features
              </span>
            </button>
          </div>

          {/* Features Grid */}
          <div className="w-full max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
              Everything You Need in One Place
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`group relative p-6 backdrop-blur-sm bg-white/60 dark:bg-gray-900/70 ${feature.color.replace('bg-', '')} rounded-xl border border-white/60 dark:border-gray-700/70 shadow-lg hover:shadow-2xl transition-all duration-300 hover:translate-y-[-4px] hover:border-violet-300 dark:hover:border-violet-600`}
                >
                  <div className="flex flex-col">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`p-3 rounded-lg ${feature.iconBg} shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        {feature.icon}
                      </div>
                      <h3 className={`text-lg font-semibold ${feature.textColor} mt-2`}>{feature.title}</h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm font-medium">{feature.desc}</p>
                    
                    <div className="mt-6 pt-4 border-t border-white/60 dark:border-gray-700">
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
              <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent mb-3">
                See It In Action
              </h3>
              <p className="text-gray-600 dark:text-gray-400">Experience how our AI assistant delivers instant insights</p>
            </div>
            
            <div className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/70 rounded-xl border border-white/60 dark:border-gray-700/70 shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="bg-gradient-to-r from-violet-200/80 to-fuchsia-200/80 dark:from-violet-900/50 dark:to-fuchsia-800/50 px-6 py-4 border-b border-white/60 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full" />
                      <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                    </div>
                    <div className="text-sm font-medium bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                      AI Assistant Demo
                    </div>
                  </div>
                  <div className="text-xs px-3 py-1 bg-white/60 dark:bg-gray-900/70 backdrop-blur-sm text-violet-700 dark:text-violet-300 rounded-full border border-white/60 dark:border-gray-700">
                    Live Preview
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 flex items-center justify-center shadow group-hover:scale-110 transition-transform duration-300">
                      <Bot size={18} className="text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-white/60 dark:bg-gray-900/70 backdrop-blur-sm rounded-lg p-4 border border-white/60 dark:border-gray-700">
                      <p className="text-gray-800 dark:text-gray-200 font-medium">
                        I can analyze Jira tickets, extract insights from Confluence docs, 
                        explain automation frameworks, and search across all your documents. 
                        What would you like assistance with today?
                      </p>
                    </div>
                    <div className="mt-3 text-xs text-gray-600 dark:text-gray-400">
                      Try asking: "How can I optimize our test automation strategy?"
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative" style={{ zIndex: 10 }}>
        <div className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-xl border-t border-white/50 dark:border-gray-800 mt-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-col items-center md:items-start">
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
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
                  Accelerating delivery excellence through AI-driven knowledge.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3 justify-center">
                <span className="px-3 py-1.5 bg-white/60 dark:bg-gray-900/70 backdrop-blur-sm text-violet-700 dark:text-violet-300 rounded-lg text-xs border border-white/60 dark:border-gray-700">Azure OpenAI</span>
                <span className="px-3 py-1.5 bg-white/60 dark:bg-gray-900/70 backdrop-blur-sm text-violet-700 dark:text-violet-300 rounded-lg text-xs border border-white/60 dark:border-gray-700">AI Search</span>
                <span className="px-3 py-1.5 bg-white/60 dark:bg-gray-900/70 backdrop-blur-sm text-violet-700 dark:text-violet-300 rounded-lg text-xs border border-white/60 dark:border-gray-700">Enterprise Ready</span>
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

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6" style={{ zIndex: 40 }}>
        <button
          onClick={() => navigate("/project")}
          className="p-4 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:rotate-12"
          aria-label="Launch Assistant"
        >
          <Bot size={22} />
        </button>
      </div>

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