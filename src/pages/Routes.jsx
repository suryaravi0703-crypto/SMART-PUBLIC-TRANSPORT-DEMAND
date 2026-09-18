import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Bus,
  Search,
  Plus,
  Route as RouteIcon,
  Compass,
  ArrowRight,
  TrendingUp,
  Sparkles
} from "lucide-react";
import RouteTable from "../components/RouteTable";
import { INITIAL_ROUTES } from "../data/transportData";

export default function Routes() {
  const [routesList, setRoutesList] = useState(INITIAL_ROUTES);
  const [selectedRoute, setSelectedRoute] = useState(INITIAL_ROUTES[0]);

  // Aggregate stats
  const totalKm = routesList.reduce((acc, r) => acc + (r.distanceKm || 0), 0);
  const avgLoad = Math.round(
    routesList.reduce((acc, r) => acc + (r.avgPassengers || 0), 0) / routesList.length
  );
  const maxPeakRoute = [...routesList].sort((a, b) => b.peakDemand - a.peakDemand)[0];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
            <RouteIcon className="w-4 h-4" />
            <span>Transit Corridor Directory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Bus Routes & Service Corridors
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Comprehensive catalog of transit lines, distances, historical load ratings, and allocated bus capacity.
          </p>
        </div>

        <Link
          to="/prediction"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition shadow-xs self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>Forecast Corridor Demand</span>
        </Link>
      </div>

      {/* Corridor Quick Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase">Total Network Span</span>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1 font-mono">
              {totalKm.toFixed(1)} km
            </h3>
            <span className="text-xs text-slate-400">Across 8 urban arterials</span>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Compass className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase">System Average Load</span>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1 font-mono">
              {avgLoad} riders
            </h3>
            <span className="text-xs text-slate-400">Average ridership per trip</span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase">Heaviest Corridor</span>
            <h3 className="text-lg font-bold text-slate-900 mt-1 truncate max-w-[180px]">
              {maxPeakRoute?.name.split(" - ")[0]}
            </h3>
            <span className="text-xs text-rose-600 font-bold">
              Peak: {maxPeakRoute?.peakDemand} passengers
            </span>
          </div>
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
            <Bus className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Routes Table */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-slate-900">All Registered Network Routes</h3>
          <span className="text-xs text-slate-500">Click &apos;Forecast&apos; to load route into the prediction simulator</span>
        </div>
        <RouteTable routes={routesList} />
      </div>

      {/* Route Strategy & Fleet Balancing Card */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Fleet Scheduling Strategy
            </span>
            <h3 className="text-lg font-bold">Dynamic Headway & Bus Reallocation</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              When Route 103 (University Cross) experiences morning surges, buses can be re-routed from Route 108 (Hillside Connector) where passenger load drops below 55 riders.
            </p>
          </div>
          <Link
            to="/analytics"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition shrink-0"
          >
            <span>Analyze Hourly Route Bottlenecks</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
