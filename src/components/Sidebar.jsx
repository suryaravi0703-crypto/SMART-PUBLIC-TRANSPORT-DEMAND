import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  TrendingUp,
  MapPin,
  BarChart3,
  Database,
  Clock,
  Zap,
  Info,
  ChevronRight
} from "lucide-react";

export default function Sidebar({ isOpen, onClose }) {
  const navItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
      badge: null
    },
    {
      name: "Demand Prediction",
      path: "/prediction",
      icon: TrendingUp,
      badge: "Sim Engine"
    },
    {
      name: "Bus Routes",
      path: "/routes",
      icon: MapPin,
      badge: "8 Routes"
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: BarChart3,
      badge: null
    },
    {
      name: "Historical Data",
      path: "/historical-data",
      icon: Database,
      badge: "53 logs"
    }
  ];

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          id="sidebar-mobile-backdrop"
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 z-30 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Sidebar container */}
      <aside
        id="main-app-sidebar"
        className={`fixed lg:sticky top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-200 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-4 space-y-6 overflow-y-auto">
          {/* Main Navigation links */}
          <div>
            <p className="px-3 text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-2">
              Menu Navigation
            </p>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/"}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                        isActive
                          ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-3">
                          <IconComponent
                            className={`w-4 h-4 ${
                              isActive ? "text-white" : "text-slate-500"
                            }`}
                          />
                          <span>{item.name}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider ${
                              isActive
                                ? "bg-white/20 text-white"
                                : "bg-slate-100 text-slate-600 border border-slate-200"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Peak Hours Detection Card */}
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/80 text-amber-950">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1 rounded-md bg-amber-200/80 text-amber-800">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wide text-amber-900">
                Peak Demand Hours
              </span>
            </div>
            <p className="text-[11px] text-amber-800 mb-2 leading-relaxed">
              Automated timetable triggers alert dispatchers during critical load windows:
            </p>
            <div className="space-y-1.5 text-xs font-mono font-medium">
              <div className="flex items-center justify-between bg-white/70 px-2.5 py-1 rounded-md border border-amber-200/60">
                <span className="text-amber-900">Morning Rush</span>
                <span className="font-bold text-amber-950">07:00 – 09:30 AM</span>
              </div>
              <div className="flex items-center justify-between bg-white/70 px-2.5 py-1 rounded-md border border-amber-200/60">
                <span className="text-amber-900">Evening Rush</span>
                <span className="font-bold text-amber-950">05:00 – 08:00 PM</span>
              </div>
            </div>
          </div>

          {/* Data Science Project Summary Card */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
            <div className="flex items-center gap-2 mb-1.5">
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs font-bold text-slate-900">
                Capacity Engine
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed mb-2.5">
              Multi-factor heuristic modeling based on weather, schedule, date, and historical passenger load.
            </p>
            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="bg-white p-2 rounded-lg border border-slate-200">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Fleet</span>
                <span className="font-extrabold text-slate-800">29 Buses</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-200">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Accuracy</span>
                <span className="font-extrabold text-emerald-600">92.8%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/70">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Data Science Dept.</span>
            <span className="font-mono text-[11px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-700 font-semibold">
              v1.0.4
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
