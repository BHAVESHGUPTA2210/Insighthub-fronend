// pages/Login.js
"use client";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Sparkles, 
  Mail, 
  ArrowRight,
  Moon,
  Sun,
  Bot,
  CheckCircle
} from "lucide-react";
import * as THREE from 'three';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [theme, setTheme] = useState("light");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [recentEmails, setRecentEmails] = useState([]);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  // Modern color palette
  const colors = {
    light: {
      primary: '#8B5CF6', // Vibrant purple
      secondary: '#EC4899', // Pink
      accent: '#3B82F6', // Blue
      gradientStart: '#F5F3FF', // Light purple
      gradientEnd: '#DBEAFE', // Light blue
      cardBg: 'rgba(255, 255, 255, 0.9)',
    },
    dark: {
      primary: '#A78BFA', // Light purple
      secondary: '#F472B6', // Light pink
      accent: '#60A5FA', // Light blue
      gradientStart: '#1E1B4B', // Dark purple
      gradientEnd: '#172554', // Dark blue
      cardBg: 'rgba(17, 24, 39, 0.9)',
    }
  };

  useEffect(() => {
    // Load saved theme
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }

    // Load recent emails from localStorage
    const saved = localStorage.getItem("recent_emails");
    if (saved) {
      setRecentEmails(JSON.parse(saved).slice(0, 3));
    }

    // Initialize 3D scene
    initThreeScene();

    // Cleanup
    return () => {
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        if (sceneRef.current.renderer) {
          sceneRef.current.renderer.dispose();
        }
      }
    };
  }, []);

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

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setIsValidEmail(false);
      return;
    }

    setIsValidEmail(true);
    setIsAnimating(true);

    // Store email in sessionStorage
    sessionStorage.setItem("user_email", email);

    // Save to recent emails
    const updated = [email, ...recentEmails.filter(e => e !== email)].slice(0, 3);
    setRecentEmails(updated);
    localStorage.setItem("recent_emails", JSON.stringify(updated));

    // Navigate to main page after animation
    setTimeout(() => {
      navigate("/main");
    }, 800);
  };

  const handleRecentEmailClick = (recentEmail) => {
    setEmail(recentEmail);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] via-white to-[#DBEAFE] dark:from-[#1E1B4B] dark:via-[#1E1B4B] dark:to-[#172554] text-gray-900 dark:text-gray-100 overflow-hidden transition-colors duration-200 relative">
      
      {/* 3D Canvas with Globe */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Enhanced Background with Multiple Layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 via-transparent to-blue-100/30 dark:from-purple-950/20 dark:via-transparent dark:to-blue-950/20" />
        
        {/* Animated gradient orbs - Modern blend */}
        <div className="absolute top-0 -left-40 w-[500px] h-[500px] bg-gradient-to-r from-violet-400/30 to-fuchsia-400/30 dark:from-violet-700/20 dark:to-fuchsia-700/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-blob" />
        <div className="absolute top-0 -right-40 w-[500px] h-[500px] bg-gradient-to-r from-blue-400/30 to-cyan-400/30 dark:from-blue-700/20 dark:to-cyan-700/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-20 w-[600px] h-[600px] bg-gradient-to-r from-pink-400/30 to-purple-400/30 dark:from-pink-700/20 dark:to-purple-700/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-blob animation-delay-4000" />
        
        {/* Geometric Pattern - Modern grid */}
        <div className="absolute inset-0 opacity-20 dark:opacity-30" 
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '50px 50px',
            color: theme === 'light' ? '#8B5CF6' : '#A78BFA'
          }} 
        />
        
        {/* Floating Particles - CSS version for fallback */}
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

      {/* Header */}
      <header className="relative z-10 p-6 border-b border-purple-200/50 dark:border-gray-800 backdrop-blur-xl bg-white/30 dark:bg-gray-900/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Accenture Logo */}
            <img 
                src="/accenture.png" 
                alt="Accenture" 
                className="h-8 w-auto object-contain"
              />
            <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
              accenture
            </span>
          </div>
          
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
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-180px)] px-4 py-12">
        <div className="w-full max-w-md">
          {/* Login Card - with modern glass morphism */}
          <div className="group backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700/50 overflow-hidden transform hover:scale-[1.02] transition-all duration-500 hover:shadow-[0_20px_70px_-15px_rgba(139,92,246,0.5)]">
            {/* Card Header - Modern gradient */}
            <div className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-blue-600 px-8 py-6 text-center relative overflow-hidden">
              {/* Animated background in header */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_50%)]" />
              
              <div className="inline-flex p-3 bg-white/30 rounded-2xl mb-4 ring-4 ring-white/30 backdrop-blur-sm relative">
                <Bot className="w-8 h-8 text-white" />
              </div>
              
              <h1 className="text-2xl font-bold text-white mb-2 relative">
                Welcome to InsightsHub
              </h1>
              <p className="text-white/80 text-sm relative backdrop-blur-sm">
                Your AI-Powered Knowledge Companion
              </p>
            </div>

            {/* Card Body */}
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-gray-900/50 rounded-full border border-white/50 dark:border-gray-700 backdrop-blur-sm">
                  <Mail size={16} className="text-violet-600 dark:text-violet-400" />
                  <span className="text-sm font-medium bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                    Accenture Email Login
                  </span>
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                {/* Email Input */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={18} className="text-violet-400 dark:text-violet-500 group-focus-within:text-violet-600 transition-colors" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setIsValidEmail(true);
                      }}
                      placeholder="your.name@accenture.com"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-2 ${
                        isValidEmail 
                          ? 'border-violet-200 dark:border-violet-800 focus:border-violet-600 focus:ring-4 focus:ring-violet-200/50 dark:focus:ring-violet-900/50' 
                          : 'border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-200/50'
                      } focus:outline-none transition-all duration-300 placeholder-violet-300 dark:placeholder-violet-700`}
                      autoFocus
                    />
                    {email && validateEmail(email) && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <CheckCircle size={18} className="text-violet-600 animate-bounce-small" />
                      </div>
                    )}
                  </div>
                  {!isValidEmail && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1 animate-pulse">
                      Please enter a valid email address
                    </p>
                  )}
                </div>

                {/* Info Box - Modern gradient */}
                <div className="p-4 bg-gradient-to-r from-violet-100/50 to-fuchsia-100/50 dark:from-violet-900/30 dark:to-fuchsia-900/30 rounded-xl border border-white/50 dark:border-gray-700 relative overflow-hidden backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer-slow" />
                  <p className="text-sm text-gray-800 dark:text-gray-200 relative flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                    <span className="font-semibold">Note:</span> No password required. 
                    Any email address works for this demo.
                  </p>
                </div>

                {/* Login Button - Modern gradient */}
                <button
                  type="submit"
                  disabled={!email || isAnimating}
                  className="w-full group relative px-6 py-4 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-blue-600 hover:from-violet-700 hover:via-fuchsia-700 hover:to-blue-700 text-white rounded-xl font-semibold transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-[1.02]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_50%)]" />
                  
                  <span className="flex items-center justify-center gap-3 relative">
                    {isAnimating ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Logging in...</span>
                      </>
                    ) : (
                      <>
                        <span>Login to InsightsHub</span>
                        <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" size={18} />
                      </>
                    )}
                  </span>
                </button>
              </form>

              {/* Features Preview */}
              <div className="mt-8 pt-6 border-t border-white/50 dark:border-gray-700">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-2 rounded-xl hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300">
                    <div className="text-xs text-gray-600 dark:text-gray-400">No Password</div>
                    <div className="text-sm font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                      Quick Access
                    </div>
                  </div>
                  <div className="p-2 rounded-xl hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300">
                    <div className="text-xs text-gray-600 dark:text-gray-400">AI-Powered</div>
                    <div className="text-sm font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                      Smart Insights
                    </div>
                  </div>
                  <div className="p-2 rounded-xl hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300">
                    <div className="text-xs text-gray-600 dark:text-gray-400">Enterprise</div>
                    <div className="text-sm font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                      Secure
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-sm bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent backdrop-blur-sm inline-block px-4 py-2 rounded-full border border-white/30 dark:border-gray-700/30">
              ✨ Demo Access • No authentication required
            </p>
          </div>
        </div>
      </main>

      {/* Footer with Accenture Copyright */}
      <footer className="relative z-10 bg-white/30 dark:bg-gray-900/30 backdrop-blur-xl border-t border-white/50 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="/accenture.png" 
                alt="Accenture" 
                className="h-6 w-auto object-contain"
              />
              <span className="text-lg font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                accenture
              </span>
              <span className="text-gray-400 text-sm">|</span>
              <span className="text-lg font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                InsightsHub
              </span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              © {new Date().getFullYear()} Accenture. All Rights Reserved.
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              This is a demo application for internal use only.
            </p>
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
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes bounce-small {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-float {
          animation: float 15s infinite ease-in-out;
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animate-shimmer-slow {
          animation: shimmer 3s infinite;
        }
        .animate-bounce-small {
          animation: bounce-small 1s infinite;
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