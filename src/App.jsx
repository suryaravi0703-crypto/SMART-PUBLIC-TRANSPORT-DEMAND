import React, { useState } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Prediction from "./pages/Prediction";
import RoutesPage from "./pages/Routes";
import Analytics from "./pages/Analytics";
import HistoricalData from "./pages/HistoricalData";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-600 selection:text-white">
        {/* Top Sticky Navbar */}
        <Navbar
          onToggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />

        {/* Main Body with Sidebar + Content */}
        <div className="flex-1 flex w-full max-w-[1600px] mx-auto">
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={closeSidebar}
          />

          {/* Main View Area */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-x-hidden">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Navigate to="/" replace />} />
              <Route path="/prediction" element={<Prediction />} />
              <Route path="/routes" element={<RoutesPage />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/historical-data" element={<HistoricalData />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
