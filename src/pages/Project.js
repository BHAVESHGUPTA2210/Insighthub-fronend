"use client";

import { useState, useEffect, useRef } from "react";
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
  Sun,
  Target,
  Bot
} from "lucide-react";
import * as THREE from 'three';
import ProfileDropdown from './components/ProfileDropdown';

const PROJECTS = [
  { 
    name: "Recon Lite", 
    description: "AI-powered reverse engineering using LLM agents to analyze and decode codebases.",
    icon: <Rocket className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500",
    stats: "AI Search • Ticket Insights • Knowledge Discovery"
  }
];

export default function ProjectPage() {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [theme, setTheme] = useState("light");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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
        sceneRef.current.ring2.material.color.setStyle(currentColors.secondary);
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

      {/* Header with back button, profile, and theme toggle */}
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
                    <p className="text-sm text-gray-600 dark:text-gray-400">Project Selection</p>
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

      {/* Main container */}
      <div className="relative" style={{ zIndex: 10 }}>
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 md:px-6 py-12">
          {/* Header */}
          <div className="text-center mb-12 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-full mb-6 border border-white/50 dark:border-gray-700">
              <Target size={16} className="text-violet-600 dark:text-violet-400" />
              <span className="text-sm font-medium bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                Project Selection
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-gray-900 dark:text-white">Select Your</span>
              <br />
              <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-blue-600 dark:from-violet-400 dark:via-fuchsia-400 dark:to-blue-400 bg-clip-text text-transparent">
                Knowledge Project
              </span>
            </h1>
            
            <p className="text-lg font-semibold text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Choose a project to access context-aware AI insights, structured knowledge discovery, and intelligent workflow support.
            </p>
          </div>

          {/* Project Cards - Single project */}
          <div className="grid grid-cols-1 gap-6 mb-12 max-w-2xl w-full">
            {PROJECTS.map((project) => (
              <div
                key={project.name}
                onClick={() => setSelectedProject(project)}
                className={`relative cursor-pointer p-8 backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 rounded-2xl border-2 transition-all duration-300 group ${
                  selectedProject?.name === project.name
                    ? "border-violet-500 dark:border-violet-600 shadow-2xl scale-[1.02] bg-white/60 dark:bg-gray-800/60"
                    : "border-white/50 dark:border-gray-700/50 hover:border-violet-300 dark:hover:border-violet-600 hover:shadow-2xl hover:scale-[1.02]"
                }`}
              >
                {/* Selection indicator */}
                {selectedProject?.name === project.name && (
                  <div className="absolute -top-2 -right-2">
                    <div className="p-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full shadow-lg animate-pulse">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${project.color} shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {project.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      {project.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-2 text-base text-gray-500 dark:text-gray-400 bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm p-3 rounded-lg border border-white/30 dark:border-gray-700">
                      <Server className="w-4 h-4 text-violet-500" />
                      <span className="font-medium">{project.stats}</span>
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
            <div className="group backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 p-4 rounded-xl border border-white/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-violet-300 dark:hover:border-violet-600">
              <div className="flex flex-col items-center">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg mb-2 group-hover:scale-110 transition-transform duration-300">
                  <Search className="w-5 h-5 text-white" />
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300 text-center font-medium">Multi Type Search</div>
              </div>
            </div>
            
            <div className="group backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 p-4 rounded-xl border border-white/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-violet-300 dark:hover:border-violet-600">
              <div className="flex flex-col items-center">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mb-2 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300 text-center font-medium">Instant Answers</div>
              </div>
            </div>
            
            <div className="group backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 p-4 rounded-xl border border-white/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-violet-300 dark:hover:border-violet-600">
              <div className="flex flex-col items-center">
                <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg mb-2 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300 text-center font-medium">Project Insight</div>
              </div>
            </div>
            
            <div className="group backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 p-4 rounded-xl border border-white/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-violet-300 dark:hover:border-violet-600">
              <div className="flex flex-col items-center">
                <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg mb-2 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300 text-center font-medium">Multi Project</div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="relative">
            <button
              onClick={handleStart}
              disabled={!selectedProject || isAnimating}
              className={`group relative px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-500 overflow-hidden ${
                selectedProject && !isAnimating
                  ? "bg-gradient-to-r from-violet-600 via-fuchsia-600 to-blue-600 hover:from-violet-700 hover:via-fuchsia-700 hover:to-blue-700 text-white hover:shadow-2xl hover:scale-105"
                  : "bg-white/40 dark:bg-gray-800/40 text-gray-400 cursor-not-allowed backdrop-blur-sm border border-white/30 dark:border-gray-700"
              }`}
            >
              {/* Shimmer effect */}
              <div className={`absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 translate-x-[-100%] ${
                selectedProject && "group-hover:translate-x-[100%]"
              } transition-transform duration-1000`} />
              
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
                        <Bot size={20} />
                        <span>Start with {selectedProject.name}</span>
                        <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                      </>
                    ) : (
                      "Select a Project"
                    )}
                  </>
                )}
              </span>
            </button>
          </div>

          {/* Bottom info */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg border border-white/30 dark:border-gray-700">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-600 dark:text-gray-400">All systems operational</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Secure • Enterprise-ready • Real-time updates
            </p>
          </div>
        </div>
      </div>

      {/* Footer with Accenture Copyright */}
      <footer className="relative" style={{ zIndex: 10 }}>
        <div className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-xl border-t border-white/50 dark:border-gray-800 mt-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-3">
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
              
              <div className="flex gap-6">
                <button
                  onClick={() => navigate("/main")}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-violet-700 dark:hover:text-violet-400 transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => navigate("/Info")}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-violet-700 dark:hover:text-violet-400 transition-colors"
                >
                  Features
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

      {/* Floating helper */}
      <div className="fixed bottom-6 left-6" style={{ zIndex: 40 }}>
        <div className="backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 p-3 rounded-xl shadow-lg border border-white/50 dark:border-gray-700/50">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">Ready to assist</span>
          </div>
        </div>
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