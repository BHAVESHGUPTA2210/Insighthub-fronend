"use client";
import { 
  getQAAnswer, 
  checkAPIHealth, 
  getMockAnswer,
  getProjectConfig
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
  Sun
} from "lucide-react";

export default function Chat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState("Unknown Project");
  const [projectKey, setProjectKey] = useState("unknown_project");
  const [copiedMessageId, setCopiedMessageId] = useState(null);
  const [backendStatus, setBackendStatus] = useState("checking");
  //const [projectConfig, setProjectConfig] = useState(null);
  const [searchType, setSearchType] = useState("project");
  const [theme, setTheme] = useState("light");
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const project = sessionStorage.getItem("selected_project") || "Unknown Project";
    const key = sessionStorage.getItem("project_key") || "unknown_project";
    setSelectedProject(project);
    setProjectKey(key);
    
    // Focus input on load
    inputRef.current?.focus();
    
    // Load saved theme
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
    
    // Check backend status
    const checkBackend = async () => {
      try {
        const health = await checkAPIHealth();
        console.log('Backend health:', health);
        
        if (health.connected) {
          setBackendStatus("connected");
          console.log('✅ Backend connected for projects:', health.projectsSupported);
          
          // Check specific project configuration
          const config = await getProjectConfig(key);
          if (config) {
            //setProjectConfig(config);
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
      // Try backend first
      const result = await getQAAnswer(projectKey, userMessage, searchType);
      
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1].content = result.answer;
        return copy;
      });
    } catch (err) {
      console.error('Backend failed, using mock:', err);
      // Fallback to mock response
      const mockResult = getMockAnswer(projectKey, userMessage);
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1].content = mockResult.answer;
        return copy;
      });
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
          color: "text-purple-600 dark:text-purple-400", 
          bgColor: "bg-purple-50 dark:bg-purple-900/30",
          description: "Search within project documents & tickets"
        };
      case "web":
        return { 
          icon: Globe, 
          label: "Web Knowledge", 
          color: "text-green-600 dark:text-green-400", 
          bgColor: "bg-green-50 dark:bg-green-900/30",
          description: "General knowledge from the web"
        };
      default:
        return { 
          icon: Database, 
          label: "Project", 
          color: "text-purple-600 dark:text-purple-400", 
          bgColor: "bg-purple-50 dark:bg-purple-900/30",
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100 overflow-hidden flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-purple-100 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-4 py-2 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
                <span className="hidden sm:inline">Back to Projects</span>
              </button>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg shadow">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">InsightMate 🤖</h1>
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
                    <div className="text-sm px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
                      {selectedProject}
                    </div>
                  </div>
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

              <div className="hidden md:flex items-center gap-3">
                <div className="text-xs px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full border border-blue-100 dark:border-blue-800">
                  Azure OpenAI
                </div>
                <div className="text-xs px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full border border-emerald-100 dark:border-emerald-800">
                  AI Search
                </div>
                <div className="text-xs px-3 py-1.5 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full border border-purple-100 dark:border-purple-800">
                  InsightMate
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Chat Container */}
      <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full px-4 sm:px-6 py-6">
        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto mb-6 space-y-6 pb-4">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl mb-8">
                <Bot size={48} className="text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Welcome to InsightMate! 🤖
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto mb-4">
                Your intelligent AI assistant for <strong className="text-purple-700 dark:text-purple-300">{selectedProject}</strong>
              </p>
              <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto mb-8">
                I can help you with test cases, automation frameworks, defects, SOPs, 
                and any questions about your project.
              </p>
              
              {backendStatus === "disconnected" || backendStatus === "error" ? (
                <div className="max-w-lg mx-auto mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-xl">
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    <strong>Note:</strong> Backend server is not connected. Using mock responses.
                    {backendStatus === "error" && (
                      <span className="block mt-1">Start backend with: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">node server.js</code></span>
                    )}
                  </p>
                </div>
              ) : null}
              
              {/* Search Type Info */}
              <div className="max-w-lg mx-auto mb-8">
                <div className={`flex items-center gap-3 p-4 rounded-xl ${getSearchTypeInfo(searchType).bgColor} border border-gray-200 dark:border-gray-700`}>
                  <div className={`p-2 rounded-lg ${getSearchTypeInfo(searchType).color} bg-white dark:bg-gray-800`}>
                    {(() => {
                      const Icon = getSearchTypeInfo(searchType).icon;
                      return <Icon size={20} />;
                    })()}
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {getSearchTypeInfo(searchType).label}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {getSearchTypeInfo(searchType).description}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="max-w-2xl mx-auto">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 text-left">Try asking:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {getExampleQuestions().map((question, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleExampleClick(question)}
                      className="text-left p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-md transition-all duration-200 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                          <Sparkles size={16} className="text-purple-600 dark:text-purple-400" />
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-purple-700 dark:group-hover:text-purple-400">
                          {question}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-4 ${msg.role === "user" ? "justify-end" : ""}`}
              >
                {msg.role === "assistant" && (
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 flex items-center justify-center shadow">
                      <Bot size={20} className="text-white" />
                    </div>
                  </div>
                )}

                <div
                  className={`max-w-3xl rounded-2xl shadow-sm ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white order-first"
                      : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 order-last"
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
                            <Bot size={16} className="text-purple-600 dark:text-purple-400" />
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
                                  className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 underline"
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
                                <blockquote className="border-l-4 border-purple-300 dark:border-purple-600 pl-4 italic my-3 text-gray-700 dark:text-gray-300" {...props}>
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
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-center shadow">
                      <User size={20} className="text-white" />
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg p-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask InsightMate about test cases, automation, defects, SOPs..."
                disabled={isLoading}
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 resize-none pr-24 transition-colors"
              />
              <div className="absolute right-3 bottom-3 flex items-center gap-2">
                <kbd className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded border border-gray-300 dark:border-gray-600 hidden md:inline-block">
                  ⏎ Enter
                </kbd>
              </div>
            </div>
            
            {/* Search Type Dropdown and Send Button Container */}
            <div className="flex flex-col gap-2 h-fit self-end">
              {/* Search Type Dropdown */}
              <div className="relative">
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  disabled={isLoading}
                  className="appearance-none w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 pr-10 cursor-pointer transition-colors"
                >
                  <option value="project">🗂️ Project Knowledge</option>
                  <option value="web">🌐 Web Knowledge</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              
              {/* Current Selection Indicator */}
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${getSearchTypeInfo(searchType).bgColor} border border-gray-200 dark:border-gray-700`}>
                {(() => {
                  const Icon = getSearchTypeInfo(searchType).icon;
                  return <Icon size={14} className={getSearchTypeInfo(searchType).color} />;
                })()}
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {getSearchTypeInfo(searchType).label}
                </span>
              </div>
              
              {/* Send Button */}
              <button
                onClick={handleSend}
                disabled={isLoading || !userInput.trim()}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <Send size={20} />
                )}
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-2">
            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <AlertCircle size={12} />
              {backendStatus === "connected" 
                ? "Connected to Azure OpenAI & AI Search" 
                : "Using mock responses (Backend not connected)"}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 ml-auto flex items-center gap-1">
              {(() => {
                const Icon = getSearchTypeInfo(searchType).icon;
                return <Icon size={12} className={getSearchTypeInfo(searchType).color} />;
              })()}
              {getSearchTypeInfo(searchType).description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}