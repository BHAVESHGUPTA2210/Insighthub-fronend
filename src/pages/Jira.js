"use client";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  ArrowLeft, 
  Plus,
  Layout,
  ListTodo,
  Bug,
  Clock,
  AlertCircle,
  Check,
  GitBranch,
  Activity,
  Target,
  Calendar,
  TrendingUp,
  Users,
  BarChart3,
  PieChart,
  Zap,
  AlertTriangle
} from "lucide-react";

export default function Jira() {
  const navigate = useNavigate();
  const { projectKey } = useParams();
  const [activeTab, setActiveTab] = useState("dashboard"); // Default to dashboard
  
  // Project details based on ANY project key
  const getProjectDetails = (key) => {
    if (!key || key === "undefined" || key === "null") {
      return {
        name: "Invalid Project",
        lead: "Not Assigned",
        type: "Unknown",
        displayKey: "N/A"
      };
    }

    let projectName = key
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    const specialCases = {
      "p1": "Project Alpha",
      "p2": "Project Beta", 
      "p3": "Project Gamma",
      "recon_lite": "Recon Lite",
      "qa_automation": "QA Automation",
      "test_management": "Test Management"
    };

    return {
      name: specialCases[key] || projectName,
      lead: "John Doe",
      type: "Software",
      displayKey: key.toUpperCase()
    };
  };

  const [projectDetails, setProjectDetails] = useState({
    key: projectKey,
    ...getProjectDetails(projectKey),
    url: `https://${projectKey || "unknown"}.atlassian.net`
  });

  // Mock sprint data with visual representation
  const [sprintData, setSprintData] = useState({
    currentSprint: {
      name: "Sprint 24",
      startDate: "2024-03-01",
      endDate: "2024-03-15",
      daysLeft: 5,
      progress: 65,
      totalIssues: 24,
      metrics: {
        completed: 12,
        inProgress: 8,
        todo: 4,
        blocked: 2,
        bugs: 5,
        tasks: 15,
        stories: 4
      },
      burndown: [20, 18, 15, 12, 10, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8], // Ideal vs actual
      dueDates: [
        { issue: "PROJ-124", title: "Implement login", dueDate: "2024-03-14", status: "at-risk" },
        { issue: "PROJ-125", title: "Write tests", dueDate: "2024-03-13", status: "overdue" },
        { issue: "PROJ-126", title: "Code review", dueDate: "2024-03-15", status: "on-track" },
        { issue: "PROJ-127", title: "Deployment", dueDate: "2024-03-12", status: "overdue" }
      ]
    },
    backlog: {
      total: 32,
      byPriority: {
        high: 8,
        medium: 15,
        low: 9
      },
      byType: {
        bugs: 6,
        features: 10,
        tasks: 12,
        stories: 4
      }
    },
    previousSprints: [
      {
        name: "Sprint 23",
        completed: 18,
        total: 22,
        velocity: 18,
        bugsFound: 4,
        completionDate: "2024-02-29"
      },
      {
        name: "Sprint 22",
        completed: 21,
        total: 21,
        velocity: 21,
        bugsFound: 2,
        completionDate: "2024-02-15"
      },
      {
        name: "Sprint 21",
        completed: 16,
        total: 20,
        velocity: 16,
        bugsFound: 6,
        completionDate: "2024-02-01"
      }
    ]
  });

  // Debug
  useEffect(() => {
    console.log("Project Key from URL:", projectKey);
  }, [projectKey]);

  // Progress bar component
  const ProgressBar = ({ value, max = 100, color = "blue", showLabel = true }) => (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-600 dark:text-gray-400">Progress</span>
          <span className="font-medium text-gray-900 dark:text-white">{value}%</span>
        </div>
      )}
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full bg-${color}-500`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );

  // Donut chart component
  const DonutChart = ({ data, total, size = 120 }) => {
    const colors = ['blue', 'green', 'yellow', 'red', 'purple'];
    let cumulative = 0;
    
    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" className="transform -rotate-90">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const startAngle = cumulative * 3.6;
            const endAngle = (cumulative + percentage) * 3.6;
            cumulative += percentage;
            
            const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
            const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
            const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
            const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
            
            const largeArc = percentage > 50 ? 1 : 0;
            
            return (
              <path
                key={index}
                d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
                fill={`url(#gradient-${colors[index % colors.length]})`}
                className="transition-all duration-300 hover:opacity-80"
              />
            );
          })}
          <circle cx="50" cy="50" r="25" fill="white" className="dark:fill-gray-800" />
        </svg>
        <defs>
          <linearGradient id="gradient-blue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
          <linearGradient id="gradient-green" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="gradient-yellow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="gradient-red" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#DC2626" />
          </linearGradient>
          <linearGradient id="gradient-purple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-gray-900 dark:text-white">{total}</span>
        </div>
      </div>
    );
  };

  if (!projectKey || projectKey === "unknown" || projectKey === "undefined") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] via-white to-[#DBEAFE] dark:from-[#1E1B4B] dark:via-[#1E1B4B] dark:to-[#172554] flex items-center justify-center">
        <div className="text-center p-8 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-xl">
          <AlertCircle size={48} className="mx-auto mb-4 text-red-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Invalid Project</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">No project selected or invalid project key</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] via-white to-[#DBEAFE] dark:from-[#1E1B4B] dark:via-[#1E1B4B] dark:to-[#172554]">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/30 dark:bg-gray-900/30 backdrop-blur-xl border-b border-white/50 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-4 py-2 text-violet-700 dark:text-violet-300 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/30 dark:border-gray-700"
              >
                <ArrowLeft size={20} />
                <span className="hidden sm:inline">Back to Chat</span>
              </button>
              
              <div className="flex items-center gap-3">
                <img 
                  src="/accenture.png" 
                  alt="Accenture" 
                  className="h-8 w-auto object-contain"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-[#0052CC] to-[#4C9AFF] bg-clip-text text-transparent">
                      {projectDetails.name} Dashboard
                    </h1>
                    <span className="px-2 py-0.5 text-xs bg-[#0052CC]/10 dark:bg-[#4C9AFF]/10 text-[#0052CC] dark:text-[#4C9AFF] rounded-full border border-[#0052CC]/20">
                      {projectDetails.displayKey}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Sprint Analytics & Metrics
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab("create")}
                className="flex items-center gap-2 px-4 py-2 bg-[#0052CC] text-white rounded-lg hover:bg-[#0042a3] transition-all"
              >
                <Plus size={18} />
                <span>Create Issue</span>
              </button>

              <a 
                href={projectDetails.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                title="Open in Jira"
              >
                <GitBranch size={20} className="text-gray-600 dark:text-gray-400" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Dashboard Focus */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        {activeTab === "dashboard" ? (
          <div className="space-y-6">
            
            {/* Current Sprint Header */}
            <div className="bg-gradient-to-r from-[#0052CC] to-[#4C9AFF] rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Zap size={24} />
                  <div>
                    <h2 className="text-2xl font-bold">{sprintData.currentSprint.name}</h2>
                    <p className="text-blue-100">
                      {sprintData.currentSprint.startDate} → {sprintData.currentSprint.endDate}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{sprintData.currentSprint.daysLeft} days</div>
                  <p className="text-blue-100">left in sprint</p>
                </div>
              </div>
              <ProgressBar value={sprintData.currentSprint.progress} color="white" />
            </div>

            {/* Sprint Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <ListTodo size={20} className="text-blue-500" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">Total</span>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {sprintData.currentSprint.totalIssues}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Issues in Sprint</p>
              </div>

              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <Check size={20} className="text-green-500" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">Completed</span>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {sprintData.currentSprint.metrics.completed}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {Math.round((sprintData.currentSprint.metrics.completed / sprintData.currentSprint.totalIssues) * 100)}% done
                </p>
              </div>

              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <Bug size={20} className="text-red-500" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">Bugs</span>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {sprintData.currentSprint.metrics.bugs}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Open bugs</p>
              </div>

              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <Activity size={20} className="text-purple-500" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">Velocity</span>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">18</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg per sprint</p>
              </div>
            </div>

            {/* Issue Distribution & Backlog */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Issue Type Distribution */}
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <PieChart size={20} className="text-[#0052CC]" />
                  Issue Distribution
                </h3>
                <div className="flex items-center justify-center mb-6">
                  <DonutChart 
                    data={[
                      { value: sprintData.currentSprint.metrics.tasks, label: 'Tasks' },
                      { value: sprintData.currentSprint.metrics.stories, label: 'Stories' },
                      { value: sprintData.currentSprint.metrics.bugs, label: 'Bugs' }
                    ]}
                    total={sprintData.currentSprint.totalIssues}
                    size={160}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Tasks</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {sprintData.currentSprint.metrics.tasks} (
                      {Math.round((sprintData.currentSprint.metrics.tasks / sprintData.currentSprint.totalIssues) * 100)}%)
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Stories</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {sprintData.currentSprint.metrics.stories} (
                      {Math.round((sprintData.currentSprint.metrics.stories / sprintData.currentSprint.totalIssues) * 100)}%)
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Bugs</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {sprintData.currentSprint.metrics.bugs} (
                      {Math.round((sprintData.currentSprint.metrics.bugs / sprintData.currentSprint.totalIssues) * 100)}%)
                    </span>
                  </div>
                </div>
              </div>

              {/* Backlog Overview */}
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Target size={20} className="text-[#0052CC]" />
                  Backlog Overview
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Total Backlog</span>
                      <span className="font-bold text-gray-900 dark:text-white">{sprintData.backlog.total}</span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>High Priority</span>
                          <span>{sprintData.backlog.byPriority.high}</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <div className="h-full bg-red-500 rounded-full" style={{ width: `${(sprintData.backlog.byPriority.high / sprintData.backlog.total) * 100}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Medium Priority</span>
                          <span>{sprintData.backlog.byPriority.medium}</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${(sprintData.backlog.byPriority.medium / sprintData.backlog.total) * 100}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Low Priority</span>
                          <span>{sprintData.backlog.byPriority.low}</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: `${(sprintData.backlog.byPriority.low / sprintData.backlog.total) * 100}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Backlog Composition</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Bugs</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{sprintData.backlog.byType.bugs}</p>
                      </div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Features</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{sprintData.backlog.byType.features}</p>
                      </div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Tasks</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{sprintData.backlog.byType.tasks}</p>
                      </div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Stories</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{sprintData.backlog.byType.stories}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Due Dates & At Risk Issues */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Calendar size={20} className="text-[#0052CC]" />
                Upcoming Due Dates
              </h3>
              <div className="space-y-3">
                {sprintData.currentSprint.dueDates.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      {item.status === 'overdue' ? (
                        <AlertTriangle size={16} className="text-red-500" />
                      ) : item.status === 'at-risk' ? (
                        <AlertCircle size={16} className="text-yellow-500" />
                      ) : (
                        <Check size={16} className="text-green-500" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{item.issue}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.title}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${
                        item.status === 'overdue' ? 'text-red-500' :
                        item.status === 'at-risk' ? 'text-yellow-500' : 'text-green-500'
                      }`}>
                        {item.dueDate}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{item.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Previous Sprints Velocity */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <TrendingUp size={20} className="text-[#0052CC]" />
                Sprint Velocity Trend
              </h3>
              <div className="space-y-3">
                {sprintData.previousSprints.map((sprint, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-24">{sprint.name}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${(sprint.completed / sprint.total) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {sprint.completed}/{sprint.total}
                        </span>
                      </div>
                      <div className="flex gap-4 mt-1 text-xs text-gray-500 dark:text-gray-400">
                        <span>Velocity: {sprint.velocity}</span>
                        <span>Bugs: {sprint.bugsFound}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Create Issue Tab
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-8 border border-gray-200 dark:border-gray-700 text-center">
            <Plus size={48} className="mx-auto mb-4 text-[#0052CC]" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Create Issue</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Issue creation form will be available in the next phase
            </p>
            <button
              onClick={() => setActiveTab("dashboard")}
              className="px-6 py-2 bg-[#0052CC] text-white rounded-lg hover:bg-[#0042a3]"
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}