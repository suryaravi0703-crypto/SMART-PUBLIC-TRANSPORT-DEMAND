import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Bus,
  Menu,
  X,
  Clock,
  Activity,
  AlertCircle,
  Sparkles
} from "lucide-react";

export default function Navbar({ onToggleSidebar, isSidebarOpen }) {
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Determine current active page name for breadcrumb
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
      case "/dashboard":
        return "Executive Overview & Fleet Demand";
      case "/prediction":
        return "Predictive Demand Engine";
      case "/routes":
        return "Transit Network Routes";
      case "/analytics":
        return "Deep Dive Transit Analytics";
      case "/historical-data":
        return "Historical Passenger Records";
      default:
        return "Transport Analytics System";
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            id="mobile-sidebar-toggle-btn"
            onClick={onToggleSidebar}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle navigation menu"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Bus className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-base sm:text-lg tracking-tight">
                  SmartTransit <span className="text-blue-600 font-extrabold">AI</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200/60">
                  <Sparkles className="w-3 h-3 text-blue-600" />
                  DS-v2.4
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">
                {getPageTitle()}
              </p>
            </div>
          </div>
        </div>

        {/* Right Info Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Real-time model status */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Regression Engine Active</span>
          </div>

          {/* Clock */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-mono font-medium border border-slate-200">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>{currentTime || "08:30:00 AM"}</span>
          </div>

          <Link
            to="/prediction"
            id="nav-quick-predict-btn"
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 sm:px-4 py-2 rounded-lg transition shadow-sm hover:shadow"
          >
            <Activity className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Forecast Demand</span>
            <span className="sm:hidden">Predict</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
