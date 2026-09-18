import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Sparkles,
  Calculator,
  Calendar,
  Clock,
  CloudSun,
  Thermometer,
  Flag,
  Users,
  RotateCcw,
  Zap,
  Info,
  CheckCircle2,
  Bus
} from "lucide-react";
import { INITIAL_ROUTES } from "../data/transportData";
import { predictPassengerDemand, isPeakHour } from "../utils/predictionModel";
import PredictionCard from "../components/PredictionCard";

export default function Prediction() {
  const [searchParams] = useSearchParams();

  // Initial form values
  const [formData, setFormData] = useState({
    route: searchParams.get("route") || "Route 101",
    date: new Date().toISOString().split("T")[0],
    day: "Monday",
    time: searchParams.get("time") || "08:00 AM",
    weather: "Clear",
    temperature: 24,
    holiday: "No",
    previousPassengers: 135
  });

  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  // Sync day of week whenever date changes
  const handleDateChange = (newDate) => {
    const d = new Date(newDate);
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = dayNames[d.getUTCDay()] || "Monday";
    setFormData((prev) => ({
      ...prev,
      date: newDate,
      day: dayName
    }));
  };

  // Run initial prediction on mount
  useEffect(() => {
    runPrediction(formData);
  }, []);

  const runPrediction = (inputs) => {
    setIsLoading(true);
    // Slight simulated computational latency for real-time model evaluation feel
    setTimeout(() => {
      const result = predictPassengerDemand(inputs);
      setPredictionResult(result);
      setHasCalculated(true);
      setIsLoading(false);
    }, 250);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    runPrediction(formData);
  };

  // Pre-configured test scenarios for evaluators & students
  const applyScenario = (scenario) => {
    const updated = { ...formData, ...scenario };
    setFormData(updated);
    runPrediction(updated);
  };

  const isCurrentTimePeak = isPeakHour(formData.time);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Machine Learning Simulation Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Passenger Demand Forecasting
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Input operational variables to compute expected passenger volume, demand category, and optimal bus dispatch counts.
        </p>
      </div>

      {/* Quick Scenario Presets */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            Quick Test Scenarios (Evaluate Models):
          </span>
          <span className="text-[11px] text-slate-400">One-click parameters</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() =>
              applyScenario({
                route: "Route 101",
                time: "08:00 AM",
                day: "Monday",
                weather: "Rainy",
                temperature: 18,
                holiday: "No",
                previousPassengers: 150
              })
            }
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition"
          >
            🌧️ Mon Morning Rush + Rain
          </button>
          <button
            type="button"
            onClick={() =>
              applyScenario({
                route: "Route 103",
                time: "05:30 PM",
                day: "Friday",
                weather: "Clear",
                temperature: 26,
                holiday: "No",
                previousPassengers: 180
              })
            }
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 transition"
          >
            🎒 Fri University Evening Surge
          </button>
          <button
            type="button"
            onClick={() =>
              applyScenario({
                route: "Route 102",
                time: "02:00 PM",
                day: "Sunday",
                weather: "Sunny",
                temperature: 30,
                holiday: "Yes",
                previousPassengers: 70
              })
            }
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition"
          >
            ☀️ Sunday Leisure Off-Peak
          </button>
          <button
            type="button"
            onClick={() =>
              applyScenario({
                route: "Route 105",
                time: "09:00 AM",
                day: "Wednesday",
                weather: "Foggy",
                temperature: 16,
                holiday: "No",
                previousPassengers: 130
              })
            }
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300 transition"
          >
            ✈️ Midweek Airport Run
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Container */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-blue-600" />
              <span>Input Simulation Parameters</span>
            </h3>
            <button
              type="button"
              onClick={() => {
                const reset = {
                  route: "Route 101",
                  date: new Date().toISOString().split("T")[0],
                  day: "Monday",
                  time: "08:00 AM",
                  weather: "Clear",
                  temperature: 24,
                  holiday: "No",
                  previousPassengers: 120
                };
                setFormData(reset);
                runPrediction(reset);
              }}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 1. Route Selection */}
            <div>
              <label
                htmlFor="pred-route-select"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
              >
                Bus Route Selection
              </label>
              <select
                id="pred-route-select"
                value={formData.route}
                onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {INITIAL_ROUTES.map((r) => (
                  <option key={r.id} value={r.name.split(" - ")[0]}>
                    {r.name} ({r.distance})
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Date and Day of Week */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="pred-date-input"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1"
                >
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Date
                </label>
                <input
                  id="pred-date-input"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleDateChange(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
                />
              </div>

              <div>
                <label
                  htmlFor="pred-day-select"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
                >
                  Day of Week
                </label>
                <select
                  id="pred-day-select"
                  value={formData.day}
                  onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
                >
                  <option value="Monday">Monday (Workday)</option>
                  <option value="Tuesday">Tuesday (Workday)</option>
                  <option value="Wednesday">Wednesday (Workday)</option>
                  <option value="Thursday">Thursday (Workday)</option>
                  <option value="Friday">Friday (Pre-Weekend)</option>
                  <option value="Saturday">Saturday (Weekend)</option>
                  <option value="Sunday">Sunday (Weekend)</option>
                </select>
              </div>
            </div>

            {/* 3. Time of Day with Peak Indicator */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="pred-time-select"
                  className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1"
                >
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Time of Day
                </label>
                {isCurrentTimePeak && (
                  <span className="text-[10px] font-extrabold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                    Rush Hour (Peak)
                  </span>
                )}
              </div>
              <select
                id="pred-time-select"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
              >
                <option value="06:00 AM">06:00 AM (Early Morning)</option>
                <option value="07:00 AM">07:00 AM (Morning Peak Begins)</option>
                <option value="08:00 AM">08:00 AM (Peak Rush Surge)</option>
                <option value="08:30 AM">08:30 AM (Peak Rush Peak)</option>
                <option value="09:00 AM">09:00 AM (Morning Peak End)</option>
                <option value="10:00 AM">10:00 AM (Midday Regular)</option>
                <option value="11:30 AM">11:30 AM (Midday Regular)</option>
                <option value="12:30 PM">12:30 PM (Lunchtime Movement)</option>
                <option value="02:00 PM">02:00 PM (Afternoon Valley)</option>
                <option value="03:30 PM">03:30 PM (School Dispersal)</option>
                <option value="05:00 PM">05:00 PM (Evening Peak Begins)</option>
                <option value="06:00 PM">06:00 PM (Peak Evening Rush)</option>
                <option value="07:00 PM">07:00 PM (Evening Commute)</option>
                <option value="08:30 PM">08:30 PM (Night Regular)</option>
                <option value="10:00 PM">10:00 PM (Night Off-Peak)</option>
              </select>
            </div>

            {/* 4. Weather and Temperature */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="pred-weather-select"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1"
                >
                  <CloudSun className="w-3.5 h-3.5 text-slate-400" />
                  Weather Condition
                </label>
                <select
                  id="pred-weather-select"
                  value={formData.weather}
                  onChange={(e) => setFormData({ ...formData, weather: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
                >
                  <option value="Clear">Clear / Normal</option>
                  <option value="Sunny">Sunny / Warm</option>
                  <option value="Rainy">Rainy (Higher Transit Use)</option>
                  <option value="Cloudy">Cloudy</option>
                  <option value="Foggy">Foggy / Low Visibility</option>
                  <option value="Stormy">Severe Storm</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="pred-temp-input"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center justify-between"
                >
                  <span className="flex items-center gap-1">
                    <Thermometer className="w-3.5 h-3.5 text-slate-400" />
                    Temp (°C)
                  </span>
                  <span className="text-slate-500 font-mono">{formData.temperature}°C</span>
                </label>
                <input
                  id="pred-temp-input"
                  type="number"
                  min="5"
                  max="45"
                  value={formData.temperature}
                  onChange={(e) => setFormData({ ...formData, temperature: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
                />
              </div>
            </div>

            {/* 5. Holiday Status & Previous Passenger Count */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="pred-holiday-select"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1"
                >
                  <Flag className="w-3.5 h-3.5 text-slate-400" />
                  Holiday / Working Day
                </label>
                <select
                  id="pred-holiday-select"
                  value={formData.holiday}
                  onChange={(e) => setFormData({ ...formData, holiday: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
                >
                  <option value="No">Working Day (Regular)</option>
                  <option value="Yes">Public Holiday (Reduced)</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="pred-prev-passengers"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1"
                >
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  Prior Baseline Count
                </label>
                <input
                  id="pred-prev-passengers"
                  type="number"
                  min="10"
                  max="500"
                  value={formData.previousPassengers}
                  onChange={(e) => setFormData({ ...formData, previousPassengers: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono font-medium"
                  placeholder="e.g. 120"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              id="predict-demand-submit-btn"
              type="submit"
              disabled={isLoading}
              className="w-full mt-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-3 px-4 rounded-xl shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2 text-sm disabled:opacity-75"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                  <span>Evaluating Statistical Heuristics...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Predict Demand</span>
                </>
              )}
            </button>
          </form>

          {/* Bus recommendation scale hint */}
          <div className="mt-5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 space-y-1">
            <span className="font-bold text-slate-700 block">
              Fleet Allocation Rule:
            </span>
            <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[10px] font-mono text-slate-500">
              <span>0–50 riders → 1 bus</span>
              <span>51–100 riders → 2 buses</span>
              <span>101–150 riders → 3 buses</span>
              <span>151–200 riders → 4 buses</span>
              <span className="col-span-2">200+ riders → 5+ buses (Auxiliary fleet)</span>
            </div>
          </div>
        </div>

        {/* Prediction Results Container */}
        <div className="lg:col-span-7">
          <PredictionCard result={predictionResult} />
        </div>
      </div>
    </div>
  );
}
