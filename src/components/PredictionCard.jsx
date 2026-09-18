import React from "react";
import {
  Users,
  Bus,
  AlertTriangle,
  Clock,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  CloudSun,
  Calendar,
  Layers
} from "lucide-react";

export default function PredictionCard({ result, onSimulateMore }) {
  if (!result) {
    return (
      <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center flex flex-col items-center justify-center min-h-[380px]">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
          <Sparkles className="w-7 h-7" />
        </div>
        <h4 className="text-base font-bold text-slate-800">Awaiting Prediction Parameters</h4>
        <p className="text-xs text-slate-500 max-w-sm mt-1.5 leading-relaxed">
          Configure the route, time, weather, and previous passenger load to run the demand prediction algorithm.
        </p>
      </div>
    );
  }

  const {
    predictedDemand,
    demandCategory,
    categoryDetails,
    suggestedBuses,
    isPeakHour,
    advisoryMessage,
    confidenceScore,
    inputSnapshot,
    factors
  } = result;

  return (
    <div
      id="prediction-result-card"
      className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden transition-all duration-300"
    >
      {/* Top Banner Alert */}
      <div
        className={`px-5 py-3 border-b flex items-center justify-between text-xs font-semibold ${
          isPeakHour
            ? "bg-amber-500 text-amber-950 border-amber-400/60"
            : "bg-slate-100 text-slate-700 border-slate-200"
        }`}
      >
        <div className="flex items-center gap-2">
          {isPeakHour ? (
            <AlertTriangle className="w-4 h-4 text-amber-950" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          )}
          <span>
            {isPeakHour
              ? "PEAK TRANSIT WINDOW DETECTED (Rush Hour)"
              : "Standard Off-Peak Schedule"}
          </span>
        </div>
        <span className="font-mono text-[11px] bg-white/70 px-2 py-0.5 rounded text-slate-900">
          Confidence: {confidenceScore}%
        </span>
      </div>

      <div className="p-6 space-y-6">
        {/* Core Metric Presentation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Passenger Demand Box */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 relative overflow-hidden">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-blue-600" />
              Predicted Passenger Volume
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-mono">
                {predictedDemand}
              </span>
              <span className="text-sm font-semibold text-slate-500">passengers</span>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs text-slate-500">Demand Level:</span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-extrabold ${categoryDetails.badgeColor}`}
              >
                {demandCategory}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              {categoryDetails.description}
            </p>
          </div>

          {/* Recommended Fleet Capacity */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/80">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
              <Bus className="w-4 h-4 text-blue-600" />
              Recommended Fleet Dispatch
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-extrabold text-blue-900 tracking-tight font-mono">
                {suggestedBuses}
              </span>
              <span className="text-sm font-semibold text-blue-700">buses recommended</span>
            </div>

            {/* Visual Bus Icons indicator */}
            <div className="mt-3 flex items-center gap-1.5 flex-wrap">
              {Array.from({ length: Math.min(8, suggestedBuses) }).map((_, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs"
                  title={`Bus #${i + 1}`}
                >
                  <Bus className="w-3.5 h-3.5" />
                </div>
              ))}
              <span className="text-[11px] font-semibold text-blue-800 ml-1">
                ({suggestedBuses * 50} max capacity seats)
              </span>
            </div>

            <p className="text-[11px] text-blue-700 mt-2 font-medium">
              Based on standard benchmark: ~50 passenger capacity per standard urban bus.
            </p>
          </div>
        </div>

        {/* Advisory Callout */}
        <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 flex items-start gap-3 text-xs leading-relaxed">
          <Clock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-amber-950 mb-0.5">
              Operational Fleet Advisory:
            </span>
            <p>{advisoryMessage}</p>
          </div>
        </div>

        {/* Factor Breakdown (Data Science Explainability) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              Model Feature Weights & Simulation Factors
            </span>
            <span className="text-[11px] text-slate-400">
              Input Baseline: {inputSnapshot.previousPassengers} riders
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-center">
              <span className="block text-[10px] text-slate-400 font-bold uppercase">Time Factor</span>
              <span className="font-mono font-bold text-slate-800 text-sm">
                ×{factors.timeFactor}
              </span>
              <span className="block text-[10px] text-slate-500 mt-0.5">{inputSnapshot.time}</span>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-center">
              <span className="block text-[10px] text-slate-400 font-bold uppercase">Day Factor</span>
              <span className="font-mono font-bold text-slate-800 text-sm">
                ×{factors.dayFactor}
              </span>
              <span className="block text-[10px] text-slate-500 mt-0.5">{inputSnapshot.day}</span>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-center">
              <span className="block text-[10px] text-slate-400 font-bold uppercase">Weather</span>
              <span className="font-mono font-bold text-slate-800 text-sm">
                ×{factors.weatherFactor}
              </span>
              <span className="block text-[10px] text-slate-500 mt-0.5">{inputSnapshot.weather}</span>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-center">
              <span className="block text-[10px] text-slate-400 font-bold uppercase">Temperature</span>
              <span className="font-mono font-bold text-slate-800 text-sm">
                ×{factors.tempFactor}
              </span>
              <span className="block text-[10px] text-slate-500 mt-0.5">{inputSnapshot.temperature}°C</span>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-center">
              <span className="block text-[10px] text-slate-400 font-bold uppercase">Holiday</span>
              <span className="font-mono font-bold text-slate-800 text-sm">
                ×{factors.holidayFactor}
              </span>
              <span className="block text-[10px] text-slate-500 mt-0.5">{inputSnapshot.holiday}</span>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-center">
              <span className="block text-[10px] text-slate-400 font-bold uppercase">Route Scale</span>
              <span className="font-mono font-bold text-slate-800 text-sm">
                ×{factors.routeFactor}
              </span>
              <span className="block text-[10px] text-slate-500 mt-0.5">{inputSnapshot.route}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
