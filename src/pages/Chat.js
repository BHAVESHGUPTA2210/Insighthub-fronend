"use client";
import { 
  getQAAnswer, 
  checkAPIHealth, 
  getMockAnswer,
  getProjectConfig,
  cancelRequest
} from '../service/Api';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  ArrowLeft, 
  Loader2, 
  Copy,
  CheckCheck,
  AlertCircle,
  Globe,
  Database,
  Moon,
  Sun,
  XCircle,
  ChevronDown,
  Search
} from "lucide-react";
import * as THREE from 'three';
import ProfileDropdown from './components/ProfileDropdown';

export default function Chat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState("Unknown Project");
  const [projectKey, setProjectKey] = useState("unknown_project");
  const [copiedMessageId, setCopiedMessageId] = useState(null);
  const [backendStatus, setBackendStatus] = useState("checking");
  const [searchType, setSearchType] = useState("project");
  const [theme, setTheme] = useState("light");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showOptions, setShowOptions] = useState(false);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const optionsRef = useRef(null);

  // Modern color palette
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

  // ============================================
  // Light Globe with 3 Rings Background (Like Project Page)
  // ============================================
  useEffect(() => {
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

    return () => {
      window.removeEventListener('resize', handleResize);
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        if (sceneRef.current.renderer) {
          sceneRef.current.renderer.dispose();
        }
      }
    };
  }, [theme]);

  // ============================================
  // REST OF THE COMPONENT (KEEP EXACTLY AS IS)
  // ============================================
  // ... (keep all the existing state, effects, and handlers exactly as they are)
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    const project = sessionStorage.getItem("selected_project") || "Unknown Project";
    const key = sessionStorage.getItem("project_key") || "unknown_project";
    setSelectedProject(project);
    setProjectKey(key);
    
    inputRef.current?.focus();
    
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleClickOutside);
    
    const checkBackend = async () => {
      try {
        const health = await checkAPIHealth();
        console.log('Backend health:', health);
        
        if (health.connected) {
          setBackendStatus("connected");
          console.log('✅ Backend connected for projects:', health.projectsSupported);
          
          const config = await getProjectConfig(key);
          if (config) {
            console.log(`✅ ${key} configuration:`, {
              hasOpenAI: config.hasOpenAIKey,
              hasSearch: config.hasSearchKey,
              index: config.searchIndexName
            });
          }
        } else {
          setBackendStatus("disconnected");
          console.warn('⚠️ Backend not connected:', health.message);
        }
      } catch (error) {
        setBackendStatus("error");
        console.error('❌ Cannot reach backend:', error.message);
      }
    };
    
    checkBackend();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  const handleCancel = () => {
    cancelRequest();
    setIsLoading(false);
    setMessages((prev) => prev.slice(0, -1));
  };

  const handleSend = async () => {
    if (!userInput.trim() || isLoading) return;

    const userMessage = userInput.trim();
    setUserInput("");
    setIsLoading(true);

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage },
      { role: "assistant", content: "" },
    ]);

    try {
      const result = await getQAAnswer(projectKey, userMessage, searchType);
      
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1].content = result.answer;
        return copy;
      });
    } catch (err) {
      if (err.message === 'Request cancelled') {
        console.log('Request cancelled by user');
      } else {
        console.error('Backend failed, using mock:', err);
        const mockResult = getMockAnswer(projectKey, userMessage);
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1].content = mockResult.answer;
          return copy;
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getSearchTypeInfo = (type) => {
  switch(type) {
    case "project":
      return { 
        icon: Database, 
        label: "Project Knowledge", 
        color: "text-violet-600 dark:text-violet-400", 
        bgColor: "bg-violet-50 dark:bg-violet-900/30",
        borderColor: "border border-violet-300 dark:border-violet-700",
        description: "Search within project documents & tickets"
      };
    case "web":
      return { 
        icon: Globe, 
        label: "Web Knowledge", 
        color: "text-green-600 dark:text-green-400", 
        bgColor: "bg-green-50 dark:bg-green-900/30",
        borderColor: "border border-green-300 dark:border-green-700",
        description: "General knowledge from the web"
      };
    default:
      return { 
        icon: Database, 
        label: "Project", 
        color: "text-violet-600 dark:text-violet-400", 
        bgColor: "bg-violet-50 dark:bg-violet-900/30",
        borderColor: "border border-violet-300 dark:border-violet-700",
        description: "Project-specific search"
      };
  }
};
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyToClipboard = async (text, messageId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getExampleQuestions = () => [
    "How do I write test cases for login functionality?",
    "Explain our automation framework architecture",
    "What are the steps for defect reporting?",
    "Show me the SOP for regression testing",
    "How to optimize test data management?",
  ];

  const handleExampleClick = (question) => {
    setUserInput(question);
    inputRef.current?.focus();
  };

  return (
    <div className="h-screen bg-gradient-to-br from-[#F5F3FF] via-white to-[#DBEAFE] dark:from-[#1E1B4B] dark:via-[#1E1B4B] dark:to-[#172554] text-gray-900 dark:text-gray-100 overflow-hidden flex flex-col relative">
      
      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />
      
      {/* Background Pattern */}
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
      </div>

      {/* Light follow effect */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.08), transparent 70%)`,
          zIndex: 1
        }}
      />

      {/* Header - Fixed at top */}
      <header className="flex-shrink-0 relative" style={{ zIndex: 50 }}>
        <div className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-xl border-b border-white/50 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 px-4 py-2 text-violet-700 dark:text-violet-300 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/30 dark:border-gray-700"
                >
                  <ArrowLeft size={20} />
                  <span className="hidden sm:inline">Back</span>
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
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full animate-pulse ${
                          backendStatus === "connected" ? "bg-green-500" : 
                          backendStatus === "checking" ? "bg-yellow-500" : "bg-red-500"
                        }`}></div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {backendStatus === "connected" ? "Connected" : 
                           backendStatus === "checking" ? "Checking..." : "Disconnected"}
                        </span>
                      </div>
                      <div className="text-sm px-3 py-1 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm text-violet-700 dark:text-violet-300 rounded-full border border-white/50 dark:border-gray-700">
                        {selectedProject}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <ProfileDropdown />
                
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

                <div className="hidden md:flex items-center gap-3">
                  <div className="text-xs px-3 py-1.5 bg-blue-50/80 dark:bg-blue-900/30 backdrop-blur-sm text-blue-700 dark:text-blue-300 rounded-full border border-blue-200/50 dark:border-blue-800">
                    Azure OpenAI
                  </div>
                  <div className="text-xs px-3 py-1.5 bg-emerald-50/80 dark:bg-emerald-900/30 backdrop-blur-sm text-emerald-700 dark:text-emerald-300 rounded-full border border-emerald-200/50 dark:border-emerald-800">
                    AI Search
                  </div>
                  <div className="text-xs px-3 py-1.5 bg-violet-50/80 dark:bg-violet-900/30 backdrop-blur-sm text-violet-700 dark:text-violet-300 rounded-full border border-violet-200/50 dark:border-violet-800">
                    InsightMate
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Chat Area - Takes remaining height */}
      <div className="flex-1 flex flex-col min-h-0 relative" style={{ zIndex: 10 }}>
        {/* Chat Messages Area - Scrollable */}
        <div 
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6"
        >
          <div className="max-w-5xl mx-auto">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex p-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-500 dark:to-fuchsia-500 rounded-2xl mb-8 shadow-lg">
                  <Bot size={48} className="text-white" />
                </div>
                
                <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent mb-4">
                  Welcome to InsightMate! 🤖
                </h2>
                
                <p className="text-black-600 dark:text-gray-400 max-w-lg mx-auto mb-4">
                  Your intelligent AI assistant for <strong className="text-violet-700 dark:text-violet-300">{selectedProject}</strong>
                </p>
                <p className="text-black-600 dark:text-gray-400 max-w-lg mx-auto mb-8">
                  I can help you analyze Jira tickets, extract insights from Confluence, search enterprise documents, access test data, and explore team information — all within your project context.
                </p>
                
                {backendStatus === "disconnected" || backendStatus === "error" ? (
                  <div className="max-w-lg mx-auto mb-6 p-4 bg-yellow-50/80 dark:bg-yellow-900/30 backdrop-blur-sm border border-yellow-200/50 dark:border-yellow-800 rounded-xl">
                    <p className="text-sm text-yellow-800 dark:text-yellow-300">
                      <strong>Note:</strong> Backend server is not connected. Using mock responses.
                      {backendStatus === "error" && (
                        <span className="block mt-1">Start backend with: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">node server.js</code></span>
                      )}
                    </p>
                  </div>
                ) : null}
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-4 mb-6 ${msg.role === "user" ? "justify-end" : ""}`}
                >
                  {msg.role === "assistant" && (
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-500 dark:to-fuchsia-500 flex items-center justify-center shadow-lg">
                        <Bot size={20} className="text-white" />
                      </div>
                    </div>
                  )}

                  <div
                    className={`max-w-4xl rounded-2xl shadow-lg backdrop-blur-sm ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white order-first"
                        : "bg-white/70 dark:bg-gray-800/80 border border-white/50 dark:border-gray-700/50 order-last"
                    }`}
                  >
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {msg.role === "user" ? (
                            <>
                              <User size={16} />
                              <span className="text-sm font-medium">You</span>
                            </>
                          ) : (
                            <>
                              <Bot size={16} className="text-violet-600 dark:text-violet-400" />
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">InsightMate</span>
                            </>
                          )}
                        </div>
                        
                        {msg.content && (
                          <button
                            onClick={() => copyToClipboard(msg.content, idx)}
                            className="p-1.5 hover:bg-white/10 dark:hover:bg-gray-700/50 rounded transition-colors"
                            title="Copy to clipboard"
                          >
                            {copiedMessageId === idx ? (
                              <CheckCheck size={16} className="text-green-500" />
                            ) : (
                              <Copy size={16} className={msg.role === "user" ? "text-purple-200" : "text-gray-400 dark:text-gray-500"} />
                            )}
                          </button>
                        )}
                      </div>

                      {msg.role === "assistant" ? (
                        <div className="prose prose-sm max-w-none dark:prose-invert">
                          {isLoading && idx === messages.length - 1 ? (
                            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                              <Loader2 size={20} className="animate-spin" />
                              <span>Analyzing your question...</span>
                            </div>
                          ) : (
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={{
                                h1: ({ children }) => <h1 className="text-xl font-bold text-gray-900 dark:text-white mt-4 mb-2">{children}</h1>,
                                h2: ({ children }) => <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-3 mb-2">{children}</h2>,
                                h3: ({ children }) => <h3 className="text-base font-semibold text-gray-900 dark:text-white mt-2 mb-1">{children}</h3>,
                                p: ({ node, children, ...props }) => <p className="text-gray-700 dark:text-gray-300 my-2 leading-relaxed" {...props}>{children}</p>,
                                ul: ({ node, children, ...props }) => <ul className="list-disc pl-5 my-2 space-y-1 text-gray-700 dark:text-gray-300" {...props}>{children}</ul>,
                                ol: ({ node, children, ...props }) => <ol className="list-decimal pl-5 my-2 space-y-1 text-gray-700 dark:text-gray-300" {...props}>{children}</ol>,
                                li: ({ node, children, ...props }) => <li className="py-1" {...props}>{children}</li>,
                                code: ({ node, inline, className, children, ...props }) => {
                                  const match = /language-(\w+)/.exec(className || '');
                                  return !inline && match ? (
                                    <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 rounded-lg p-4 my-3 overflow-x-auto">
                                      <pre className="text-sm">
                                        <code className={`language-${match[1]}`} {...props}>
                                          {children}
                                        </code>
                                      </pre>
                                    </div>
                                  ) : (
                                    <code className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 px-2 py-1 rounded text-sm font-mono" {...props}>
                                      {children}
                                    </code>
                                  );
                                },
                                pre: ({ node, children, ...props }) => <pre className="overflow-x-auto" {...props}>{children}</pre>,
                                a: ({ node, href, children, ...props }) => (
                                  <a 
                                    href={href} 
                                    className="text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 underline"
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    {...props}
                                  >
                                    {children}
                                  </a>
                                ),
                                strong: ({ node, children, ...props }) => <strong className="font-bold" {...props}>{children}</strong>,
                                em: ({ node, children, ...props }) => <em className="italic" {...props}>{children}</em>,
                                blockquote: ({ node, children, ...props }) => (
                                  <blockquote className="border-l-4 border-violet-300 dark:border-violet-600 pl-4 italic my-3 text-gray-700 dark:text-gray-300" {...props}>
                                    {children}
                                  </blockquote>
                                ),
                                table: ({ node, children, ...props }) => (
                                  <div className="overflow-x-auto my-4">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" {...props}>
                                      {children}
                                    </table>
                                  </div>
                                ),
                                th: ({ node, children, ...props }) => (
                                  <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-left text-sm font-semibold text-gray-700 dark:text-gray-300" {...props}>
                                    {children}
                                  </th>
                                ),
                                td: ({ node, children, ...props }) => (
                                  <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-sm" {...props}>
                                    {children}
                                  </td>
                                ),
                              }}
                            >
                              {msg.content}
                            </ReactMarkdown>
                          )}
                        </div>
                      ) : (
                        <p className="text-white">{msg.content}</p>
                      )}
                    </div>
                  </div>

                  {msg.role === "user" && (
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-center shadow-lg">
                        <User size={20} className="text-white" />
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

      {/* Fixed Input Area - DeepSeek Style with Horizontal Buttons */}
<div className="flex-shrink-0 px-4 sm:px-6 pb-4">
  <div className="max-w-5xl mx-auto">
    <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/80 rounded-xl border border-white/50 dark:border-gray-600/80 shadow-lg overflow-hidden">
      {/* Options Bar - Simplified with Jira Button */}
      <div className="px-4 py-3 border-b border-white/30 dark:border-gray-700/80 bg-white/50 dark:bg-gray-800/50">
        <div className="flex items-center justify-between">
          {/* Left side - Search Type */}
          <div className="flex items-center gap-4">
            {/* Search Type Dropdown - Main Option */}
            <div className="relative" ref={optionsRef}>
              <button
                onClick={() => setShowOptions(!showOptions)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/60 dark:bg-gray-800/90 backdrop-blur-sm text-sm text-gray-700 dark:text-gray-200 hover:bg-white/80 dark:hover:bg-gray-700/90 transition-colors border-2 border-violet-200/50 dark:border-violet-600/80 shadow-sm dark:shadow-gray-900/50"
              >
                {searchType === "project" ? (
                  <Database size={16} className="text-violet-600 dark:text-violet-400" />
                ) : (
                  <Globe size={16} className="text-green-600 dark:text-green-400" />
                )}
                <span>{getSearchTypeInfo(searchType).label}</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${showOptions ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Options Dropdown */}
              {showOptions && (
                <div className="absolute left-0 mt-1 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-lg border-2 border-white/50 dark:border-gray-600/90 shadow-xl overflow-hidden z-50 min-w-[200px]">
                  <div className="p-1">
                    <button
                      onClick={() => {
                        setSearchType("project");
                        setShowOptions(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition-all border ${
                        searchType === "project" 
                          ? 'bg-violet-100 dark:bg-violet-900/80 border-violet-300 dark:border-violet-500/80 text-violet-700 dark:text-violet-200' 
                          : 'hover:bg-violet-50 dark:hover:bg-violet-900/40 border-transparent dark:border-gray-700 text-gray-700 dark:text-gray-200'
                      }`}
                    >
                      <Database size={16} className={searchType === "project" ? "text-violet-600" : "text-gray-500 dark:text-gray-400"} />
                      <span className="flex-1 text-left">Project Knowledge</span>
                      {searchType === "project" && (
                        <span className="text-xs bg-violet-200 dark:bg-violet-800/90 border border-violet-400/50 dark:border-violet-500/50 px-2 py-0.5 rounded-full">Active</span>
                      )}
                    </button>
                    
                    <button
                      onClick={() => {
                        setSearchType("web");
                        setShowOptions(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition-all border ${
                        searchType === "web" 
                          ? 'bg-green-100 dark:bg-green-900/80 border-green-300 dark:border-green-500/80 text-green-700 dark:text-green-200' 
                          : 'hover:bg-green-50 dark:hover:bg-green-900/40 border-transparent dark:border-gray-700 text-gray-700 dark:text-gray-200'
                      }`}
                    >
                      <Globe size={16} className={searchType === "web" ? "text-green-600" : "text-gray-500 dark:text-gray-400"} />
                      <span className="flex-1 text-left">Web Knowledge</span>
                      {searchType === "web" && (
                        <span className="text-xs bg-green-200 dark:bg-green-800/90 border border-green-400/50 dark:border-green-500/50 px-2 py-0.5 rounded-full">Active</span>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Optional: Add a small helper text */}
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {getSearchTypeInfo(searchType).description}
            </span>
          </div>

          {/* Right side - Jira Button */}
     
        <button
          onClick={() => {
            const key = sessionStorage.getItem("project_key") || projectKey || "unknown";
            navigate(`/jira/${key}`);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0052CC]/10 dark:bg-[#0052CC]/20 hover:bg-[#0052CC]/20 dark:hover:bg-[#0052CC]/30 text-[#0052CC] dark:text-[#4C9AFF] transition-all border-2 border-[#0052CC]/30 dark:border-[#4C9AFF]/50 shadow-sm hover:shadow-md transform hover:scale-105"
          title={`Open Jira for ${selectedProject}`}
        >
          <span className="text-lg font-bold">📋</span>
          <span className="text-sm font-medium">Jira: {selectedProject}</span>
          <span className="text-[10px] px-1.5 py-0.5 bg-[#0052CC]/20 dark:bg-[#4C9AFF]/20 rounded-full">New</span>
        </button>
        </div>
      </div>
      
    
              {/* Text Input Area */}
              <div className="p-4 bg-white/40 dark:bg-gray-800/40">
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <textarea
                      ref={inputRef}
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask about Jira, Confluence, documents, test data, or team insights..."
                      disabled={isLoading}
                      rows={2}
                      className="w-full px-4 py-3 rounded-lg bg-white/70 dark:bg-gray-800/90 backdrop-blur-sm 
                        border-2 border-violet-200/50 dark:border-violet-600/80 
                        focus:border-violet-500 focus:ring-4 focus:ring-violet-200/50 dark:focus:ring-violet-800/80 
                        text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 
                        focus:outline-none disabled:opacity-50 resize-none transition-all duration-200 shadow-sm dark:shadow-gray-900/50"
                    />
                    
                    {/* Character count (optional) */}
                    {userInput.length > 0 && (
                      <div className="absolute right-3 bottom-3 text-xs text-gray-400 dark:text-gray-500">
                        {userInput.length} characters
                      </div>
                    )}
                  </div>
                  
                  {/* Send/Cancel Button */}
                  <div className="flex items-end">
                    {isLoading ? (
                      <button
                        onClick={handleCancel}
                        className="p-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition-all duration-500 hover:shadow-2xl transform hover:scale-105 border-2 border-red-400/50 dark:border-red-400/70 shadow-lg"
                        title="Cancel"
                      >
                        <XCircle size={22} />
                      </button>
                    ) : (
                      <button
                        onClick={handleSend}
                        disabled={!userInput.trim()}
                        className="p-3 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-blue-600 hover:from-violet-700 hover:via-fuchsia-700 hover:to-blue-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 hover:shadow-2xl transform hover:scale-105 border-2 border-white/30 dark:border-violet-400/70 shadow-lg"
                        title="Send"
                      >
                        <Send size={22} />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Status Bar */}
              <div className="px-4 py-2 bg-white/30 dark:bg-gray-800/30 border-t border-white/30 dark:border-gray-700/80 flex flex-wrap gap-2 text-xs">
                <div className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <AlertCircle size={12} />
                  {backendStatus === "connected" 
                    ? "Connected to Azure OpenAI & AI Search" 
                    : "Using mock responses (Backend not connected)"}
                </div>
              </div>
            </div>
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
        /* Custom scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background-color: rgba(139, 92, 246, 0.3);
          border-radius: 20px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background-color: rgba(139, 92, 246, 0.5);
        }
      `}</style>
    </div>
  );
}