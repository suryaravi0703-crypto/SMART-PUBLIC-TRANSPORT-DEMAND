import React, { useState, useMemo } from "react";
import {
  BarChart3,
  Calendar,
  Clock,
  TrendingUp,
  CloudRain,
  Sun,
  Flag,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Info
} from "lucide-react";
import DemandChart from "../components/DemandChart";
import {
  HOURLY_DEMAND_PATTERN,
  DAILY_TRENDS,
  MONTHLY_TRENDS,
  INITIAL_ROUTES,
  HISTORICAL_DATA
} from "../data/transportData";

export default function Analytics() {
  const [activeTab, setActiveTab] = useState("all");

  // Weekday vs Weekend Comparison
  const weekdayWeekendData = useMemo(() => {
    return [
      { category: "Morning Rush (08:00 AM)", weekday: 254, weekend: 115, variance: "-55%" },
      { category: "Midday (12:00 PM)", weekday: 140, weekend: 125, variance: "-11%" },
      { category: "Afternoon (03:00 PM)", weekday: 125, weekend: 110, variance: "-12%" },
      { category: "Evening Rush (06:00 PM)", weekday: 262, weekend: 155, variance: "-41%" },
      { category: "Night (09:00 PM)", weekday: 98, weekend: 85, variance: "-13%" }
    ];
  }, []);

  // Holiday vs Normal Day Comparison
  const holidayComparisonData = useMemo(() => {
    return [
      { route: "Route 101", normal: 215, holiday: 135 },
      { route: "Route 102", normal: 95, holiday: 115 }, // Leisure route slightly up on holiday
      { route: "Route 103", normal: 260, holiday: 120 }, // University route drops sharply on holiday
      { route: "Route 104", normal: 190, holiday: 110 },
      { route: "Route 105", normal: 145, holiday: 160 }  // Airport route increases on holiday
    ];
  }, []);

  // Route-wise demand distribution
  const routeDemandData = useMemo(() => {
    return INITIAL_ROUTES.map(r => ({
      name: r.name.split(" - ")[0],
      avgPassengers: r.avgPassengers,
      peakDemand: r.peakDemand,
      distanceKm: r.distanceKm
    }));
  }, []);

  // Weather Impact data
  const weatherImpactData = useMemo(() => {
    return [
      { weather: "Rainy Weather", avgVolume: 182, multiplier: "+24%", note: "Commuters shift from 2-wheelers & walking to buses" },
      { weather: "Cold (<10°C)", avgVolume: 168, multiplier: "+12%", note: "Preference for heated cabin transit" },
      { weather: "Normal / Clear", avgVolume: 148, multiplier: "Baseline", note: "Standard scheduled volume distribution" },
      { weather: "Hot (>32°C)", avgVolume: 165, multiplier: "+15%", note: "Air-conditioned express bus preference" },
      { weather: "Severe Storm", avgVolume: 115, multiplier: "-22%", note: "Discretionary travel cancellation" }
    ];
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
          <BarChart3 className="w-4 h-4" />
          <span>Advanced Transit Analytics</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Passenger Demand & Temporal Trends
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          In-depth multivariate breakdowns: hourly surges, weekday vs. weekend shifts, holiday impact, and weather elasticity.
        </p>
      </div>

      {/* Section 1: Daily & Weekly Passenger Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Daily Trends */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Weekly Passenger Trends (Mon – Sun)</h3>
              <p className="text-xs text-slate-500">Aggregate daily ridership volume across city network</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
              Friday Peak: 2,080
            </span>
          </div>
          <DemandChart
            type="bar"
            data={DAILY_TRENDS}
            xAxisKey="day"
            dataKeys={[
              { key: "passengers", name: "Actual Daily Riders", color: "#2563eb" },
              { key: "predicted", name: "Projected Trend", color: "#93c5fd" }
            ]}
            height={280}
            unit="passengers"
          />
          <div className="mt-3 text-xs text-slate-500 flex items-center justify-between pt-2 border-t border-slate-100">
            <span>Highest load on Fridays (office + pre-weekend travel)</span>
            <span className="font-semibold text-slate-700">Weekly Total: 12,100 riders</span>
          </div>
        </div>

        {/* Monthly Historical Trend */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Monthly Passenger Trends (Oct – Mar)</h3>
              <p className="text-xs text-slate-500">Longitudinal growth and seasonal variation</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
              +19.3% Season Growth
            </span>
          </div>
          <DemandChart
            type="area"
            data={MONTHLY_TRENDS}
            xAxisKey="month"
            dataKeys={[
              { key: "actual", name: "Monthly Riders", color: "#10b981" },
              { key: "predicted", name: "Forecast Target", color: "#6ee7b7" }
            ]}
            height={280}
            unit="riders"
          />
          <div className="mt-3 text-xs text-slate-500 flex items-center justify-between pt-2 border-t border-slate-100">
            <span>Steady expansion with winter university semesters</span>
            <span className="font-semibold text-slate-700">Mar Peak: 57,900 monthly riders</span>
          </div>
        </div>
      </div>

      {/* Section 2: Peak Hour Detailed Analysis */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-bold text-slate-900">
                Peak-Hour Transit Surge Detection
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Hourly volume analysis demonstrating distinct morning and evening commuting spikes.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-3 py-1 rounded-lg bg-amber-100 text-amber-900 font-bold border border-amber-200">
              Peak: 262 riders @ 18:00
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
              Valley: 56 riders @ 22:00
            </span>
          </div>
        </div>

        <DemandChart
          type="line"
          data={HOURLY_DEMAND_PATTERN}
          xAxisKey="hour"
          dataKeys={[
            { key: "passengers", name: "Hourly Passenger Load", color: "#f59e0b" }
          ]}
          height={260}
          unit="riders"
        />

        {/* Peak hour callout breakdown */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600" />
              Morning Commute Surge (07:00 AM – 09:30 AM)
            </span>
            <p className="text-xs text-amber-950 mt-1.5 leading-relaxed">
              Driven by corporate offices, financial district arrivals, and university lectures. Key affected lines: Route 101, Route 103, and Route 104. Headways must be squeezed to 6-8 minutes.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-orange-50/70 border border-orange-200/80">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-800 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-orange-600" />
              Evening Rush Hour (05:00 PM – 08:00 PM)
            </span>
            <p className="text-xs text-orange-950 mt-1.5 leading-relaxed">
              Highest density of the entire day, peaking at 06:00 PM with 262 passengers. Dispersal traffic requires auxiliary bus positioning near Tech Hub East and South Terminal.
            </p>
          </div>
        </div>
      </div>

      {/* Section 3: Comparative Analysis (Weekday vs. Weekend & Holiday vs. Normal Day) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekday vs Weekend Demand */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Weekday vs. Weekend Demand</h3>
              <p className="text-xs text-slate-500">Comparison across critical operational windows</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
              -42% Overall Weekend Dip
            </span>
          </div>
          <DemandChart
            type="bar"
            data={weekdayWeekendData}
            xAxisKey="category"
            dataKeys={[
              { key: "weekday", name: "Weekday Average", color: "#3b82f6" },
              { key: "weekend", name: "Weekend Average", color: "#94a3b8" }
            ]}
            height={280}
            unit="riders"
          />
          <div className="mt-3 text-xs text-slate-500 pt-2 border-t border-slate-100">
            Morning commute experiences the steepest collapse (-55%), while midday leisure holds steady.
          </div>
        </div>

        {/* Holiday vs Normal Day Demand */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Holiday vs. Normal-Day Demand</h3>
              <p className="text-xs text-slate-500">Route variance during public calendar holidays</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 border border-purple-200">
              Route Shift
            </span>
          </div>
          <DemandChart
            type="bar"
            data={holidayComparisonData}
            xAxisKey="route"
            dataKeys={[
              { key: "normal", name: "Normal Workday", color: "#6366f1" },
              { key: "holiday", name: "Public Holiday", color: "#ec4899" }
            ]}
            height={280}
            unit="riders"
          />
          <div className="mt-3 text-xs text-slate-500 pt-2 border-t border-slate-100">
            Commuter corridors drop by 50%+, while Airport Link (+10%) and Riverfront Loop (+21%) increase.
          </div>
        </div>
      </div>

      {/* Section 4: Route-Wise Demand & Weather Factor Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Route-wise demand chart */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Route-Wise Demand Density</h3>
              <p className="text-xs text-slate-500">Average passenger volume per route</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
              8 Corridors
            </span>
          </div>
          <DemandChart
            type="bar"
            data={routeDemandData}
            xAxisKey="name"
            dataKeys={[
              { key: "avgPassengers", name: "Average Riders", color: "#0284c7" }
            ]}
            height={260}
            unit="riders"
          />
        </div>

        {/* Weather Sensitivity Matrix */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Weather Sensitivity Matrix</h3>
              <p className="text-xs text-slate-500">Passenger behavior shifts under meteorological conditions</p>
            </div>
            <CloudRain className="w-5 h-5 text-blue-500" />
          </div>

          <div className="space-y-2.5 mt-4">
            {weatherImpactData.map((item, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-slate-900 block">{item.weather}</span>
                  <span className="text-slate-500 text-[11px]">{item.note}</span>
                </div>
                <div className="text-right">
                  <span
                    className={`font-mono font-bold text-xs ${
                      item.multiplier.startsWith("+")
                        ? "text-emerald-600"
                        : item.multiplier.startsWith("-")
                        ? "text-rose-600"
                        : "text-slate-700"
                    }`}
                  >
                    {item.multiplier}
                  </span>
                  <span className="block text-[10px] text-slate-400">
                    ~{item.avgVolume} avg riders
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
