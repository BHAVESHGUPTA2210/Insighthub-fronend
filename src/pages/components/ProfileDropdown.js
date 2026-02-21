"use client";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Mail, 
  LogOut, 
  ChevronDown,
  HelpCircle
} from "lucide-react";

export default function ProfileDropdown() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Get email from sessionStorage
    const email = sessionStorage.getItem("user_email") || "user@accenture.com";
    setUserEmail(email);
  }, []);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    // Clear session storage
    sessionStorage.clear();
    // Navigate to login page
    navigate("/");
  };

  const getInitials = (email) => {
    if (!email) return "U";
    const name = email.split("@")[0];
    const parts = name.split(/[._]/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 rounded-xl bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 backdrop-blur-sm border border-purple-200/50 dark:border-gray-700 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 flex items-center justify-center">
          <span className="text-white font-semibold text-sm">
            {getInitials(userEmail)}
          </span>
        </div>
        <ChevronDown 
          size={16} 
          className={`text-violet-600 dark:text-violet-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-72 rounded-xl shadow-2xl overflow-hidden"
          style={{ zIndex: 9999 }}
        >
          {/* Dropdown Content */}
          <div className="backdrop-blur-xl bg-white/95 dark:bg-gray-800/95 border border-white/50 dark:border-gray-700/50 rounded-xl">
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 dark:from-violet-900/30 dark:to-fuchsia-900/30 border-b border-white/50 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">
                    {getInitials(userEmail)}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {userEmail.split("@")[0].replace(/[._]/g, " ")}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                    <Mail size={12} />
                    {userEmail}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  // Navigate to profile settings (if needed)
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-violet-50 dark:hover:bg-violet-900/30 rounded-lg transition-colors duration-200 group"
              >
                <div className="p-2 rounded-lg bg-violet-100 dark:bg-violet-900/30 group-hover:bg-violet-200 dark:group-hover:bg-violet-800/30 transition-colors">
                  <User size={16} className="text-violet-600 dark:text-violet-400" />
                </div>
                <span className="flex-1 text-left">Profile Settings</span>
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  // Navigate to help (if needed)
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-violet-50 dark:hover:bg-violet-900/30 rounded-lg transition-colors duration-200 group"
              >
                <div className="p-2 rounded-lg bg-violet-100 dark:bg-violet-900/30 group-hover:bg-violet-200 dark:group-hover:bg-violet-800/30 transition-colors">
                  <HelpCircle size={16} className="text-violet-600 dark:text-violet-400" />
                </div>
                <span className="flex-1 text-left">Help & Support</span>
              </button>

              <div className="my-2 border-t border-white/50 dark:border-gray-700" />

              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors duration-200 group"
              >
                <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 group-hover:bg-red-200 dark:group-hover:bg-red-800/30 transition-colors">
                  <LogOut size={16} className="text-red-600 dark:text-red-400" />
                </div>
                <span className="flex-1 text-left font-medium">Sign Out</span>
              </button>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-t border-white/50 dark:border-gray-700">
              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                Signed in as <span className="font-medium text-violet-600 dark:text-violet-400">Accenture User</span>
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}