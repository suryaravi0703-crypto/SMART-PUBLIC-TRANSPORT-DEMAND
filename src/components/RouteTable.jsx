import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, ArrowUpDown, ChevronRight, Bus, MapPin, Sparkles } from "lucide-react";

export default function RouteTable({ routes = [], onSelectRoute }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("avgPassengers");
  const [sortOrder, setSortOrder] = useState("desc");

  // Filtering
  const filteredRoutes = routes.filter((r) => {
    const matchesSearch =
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.startPoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.destination.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" ||
      r.demandStatus.toUpperCase() === statusFilter.toUpperCase();

    return matchesSearch && matchesStatus;
  });

  // Sorting
  const sortedRoutes = [...filteredRoutes].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];

    if (sortBy === "distance") {
      aVal = a.distanceKm || parseFloat(a.distance);
      bVal = b.distanceKm || parseFloat(b.distance);
    }

    if (sortOrder === "asc") {
      return aVal > bVal ? 1 : -1;
    }
    return aVal < bVal ? 1 : -1;
  });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "very high":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
            Very High
          </span>
        );
      case "high":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
            High
          </span>
        );
      case "medium":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
            Medium
          </span>
        );
      case "low":
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            Low
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Table Header Controls */}
      <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="route-search-input"
            type="text"
            placeholder="Search by route ID, corridor, or stop..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <select
            id="route-status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All Demand Levels</option>
            <option value="VERY HIGH">Very High</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>
      </div>

      {/* Table Element */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold text-[11px] border-b border-slate-200">
            <tr>
              <th
                onClick={() => handleSort("id")}
                className="py-3 px-4 cursor-pointer hover:bg-slate-100"
              >
                <div className="flex items-center gap-1">
                  <span>Route ID</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3 px-4">Route Name</th>
              <th className="py-3 px-4">Starting Point</th>
              <th className="py-3 px-4">Destination</th>
              <th
                onClick={() => handleSort("distance")}
                className="py-3 px-4 cursor-pointer hover:bg-slate-100"
              >
                <div className="flex items-center gap-1">
                  <span>Distance</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort("avgPassengers")}
                className="py-3 px-4 cursor-pointer hover:bg-slate-100"
              >
                <div className="flex items-center gap-1">
                  <span>Avg Passengers</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort("peakDemand")}
                className="py-3 px-4 cursor-pointer hover:bg-slate-100"
              >
                <div className="flex items-center gap-1">
                  <span>Peak Demand</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3 px-4">Demand Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {sortedRoutes.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-8 text-center text-slate-400">
                  No transit routes match your criteria.
                </td>
              </tr>
            ) : (
              sortedRoutes.map((route) => (
                <tr
                  key={route.id}
                  className="hover:bg-blue-50/40 transition-colors duration-150"
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-600">
                    {route.id}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    {route.name}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      {route.startPoint}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      {route.destination}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono">{route.distance}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    {route.avgPassengers} <span className="text-xs text-slate-400 font-normal">riders</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-rose-600">
                    {route.peakDemand}
                  </td>
                  <td className="py-3.5 px-4">{getStatusBadge(route.demandStatus)}</td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      to={`/prediction?route=${encodeURIComponent(
                        route.name.split(" - ")[0] || "Route 101"
                      )}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 text-xs font-semibold transition shadow-2xs"
                    >
                      <span>Forecast</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
        <span>Showing {sortedRoutes.length} of {routes.length} transit routes</span>
        <span className="text-[11px] text-slate-400">Total fleet deployed: 29 buses</span>
      </div>
    </div>
  );
}
