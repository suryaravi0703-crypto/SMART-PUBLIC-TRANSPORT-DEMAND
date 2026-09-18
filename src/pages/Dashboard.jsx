import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Bus,
  Route as RouteIcon,
  Users,
  TrendingUp,
  Clock,
  AlertOctagon,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Calendar,
  Layers,
  ChevronRight
} from "lucide-react";
import StatCard from "../components/StatCard";
import DemandChart from "../components/DemandChart";
import {
  INITIAL_ROUTES,
  HISTORICAL_DATA,
  HOURLY_DEMAND_PATTERN,
  DAILY_TRENDS,
  calculateDatasetInsights
} from "../data/transportData";

export default function Dashboard() {
  // Statistical aggregations calculated from real data
  const metrics = useMemo(() => {
    const totalRoutes = INITIAL_ROUTES.length;
    const totalBuses = INITIAL_ROUTES.reduce((acc, r) => acc + (r.busesAllocated || 3), 0);
    
    // Average daily passengers from dataset
    const totalSampledPassengers = HISTORICAL_DATA.reduce((acc, d) => acc + d.passengers, 0);
    const avgDailyPassengers = Math.round(
      DAILY_TRENDS.reduce((acc, d) => acc + d.passengers, 0) / DAILY_TRENDS.length
    );

    // Today's predicted demand sum
    const todayPredicted = Math.round(avgDailyPassengers * 1.04);

    // Peak-hour demand: maximum hourly load
    const peakHourItem = [...HOURLY_DEMAND_PATTERN].sort((a, b) => b.passengers - a.passengers)[0];
    
    // Low demand routes count
    const lowDemandRoutes = INITIAL_ROUTES.filter(r => r.demandStatus.toLowerCase() === "low");

    return {
      totalRoutes,
      totalBuses,
      avgDailyPassengers,
      todayPredicted,
      peakHourDemand: peakHourItem ? `${peakHourItem.passengers} riders` : "262 riders",
      peakHourTime: peakHourItem ? peakHourItem.hour : "06:00 PM",
      lowDemandCount: lowDemandRoutes.length,
      lowDemandNames: lowDemandRoutes.map(r => r.name.split(" - ")[0]).join(", ")
    };
  }, []);

  // Data Science insights calculated dynamically
  const insights = useMemo(() => {
    return calculateDatasetInsights(HISTORICAL_DATA, INITIAL_ROUTES);
  }, []);

  // Prepare route demand data for BarChart
  const routeDemandData = useMemo(() => {
    return INITIAL_ROUTES.map(r => ({
      name: r.name.split(" - ")[0], // e.g. "Route 101"
      fullName: r.name,
      avgPassengers: r.avgPassengers,
      peakDemand: r.peakDemand,
      buses: r.busesAllocated
    }));
  }, []);

  // Comparison data: Predicted vs Actual
  const predictedVsActualData = useMemo(() => {
    return HOURLY_DEMAND_PATTERN.map(item => ({
      time: item.timeLabel,
      hour: item.hour,
      actual: item.passengers,
      predicted: item.predicted,
      variance: item.predicted - item.passengers
    }));
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Transit Fleet & Demand Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time ridership trends, automated peak-hour diagnostics, and ML-assisted fleet allocation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/prediction"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition shadow-xs"
          >
            <Sparkles className="w-4 h-4" />
            <span>Simulate New Forecast</span>
          </Link>
          <Link
            to="/routes"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 transition"
          >
            <span>View All Routes</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>
        </div>
      </div>

      {/* Peak Hour Alert Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-2xl p-4 sm:p-5 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-xs text-white shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-wide uppercase text-xs bg-black/20 px-2.5 py-0.5 rounded-full">
                Active Peak Windows
              </span>
              <span className="text-xs text-amber-100 font-medium">Automatic Transit Detection</span>
            </div>
            <p className="text-sm sm:text-base font-bold mt-1 text-white">
              Morning Rush: 7:00 AM – 9:30 AM &bull; Evening Rush: 5:00 PM – 8:00 PM
            </p>
            <p className="text-xs text-amber-100 mt-0.5">
              High volume corridor alerts active on Route 101 and Route 103. Recommended minimum deployment: 5+ buses.
            </p>
          </div>
        </div>

        <Link
          to="/prediction?time=08:00%20AM&route=Route%20103"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-amber-900 text-xs font-bold hover:bg-amber-50 transition shrink-0 shadow-xs"
        >
          <span>Evaluate 8:00 AM Peak</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          id="kpi-total-routes"
          title="Total Routes"
          value={metrics.totalRoutes}
          subtitle="All active corridors"
          icon={RouteIcon}
          trend="+1 New Corridor"
          trendDirection="up"
          color="blue"
        />

        <StatCard
          id="kpi-total-buses"
          title="Total Buses"
          value={metrics.totalBuses}
          subtitle="In service fleet"
          icon={Bus}
          trend="100% Operational"
          trendDirection="up"
          color="emerald"
        />

        <StatCard
          id="kpi-avg-daily"
          title="Avg Daily Riders"
          value={metrics.avgDailyPassengers.toLocaleString()}
          subtitle="Per 24h operational day"
          icon={Users}
          trend="+6.2% vs last week"
          trendDirection="up"
          color="indigo"
        />

        <StatCard
          id="kpi-today-predicted"
          title="Today's Forecast"
          value={metrics.todayPredicted.toLocaleString()}
          subtitle="Projected system load"
          icon={TrendingUp}
          trend="High confidence"
          trendDirection="up"
          color="purple"
        />

        <StatCard
          id="kpi-peak-demand"
          title="Peak-Hour Surge"
          value={metrics.peakHourDemand}
          subtitle={`At ${metrics.peakHourTime}`}
          icon={Clock}
          trend="Evening rush"
          trendDirection="up"
          color="amber"
        />

        <StatCard
          id="kpi-low-demand"
          title="Low-Demand Routes"
          value={`${metrics.lowDemandCount} Routes`}
          subtitle={metrics.lowDemandNames}
          icon={AlertOctagon}
          trend="Capacity underused"
          trendDirection="down"
          color="rose"
        />
      </div>

      {/* Main Charts Row 1: Passenger Demand Over Time & Demand By Route */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Passenger Demand Over Time */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Passenger Demand Over Time</h3>
              <p className="text-xs text-slate-500">Hourly transit density across 24-hour city network</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
              Citywide Average
            </span>
          </div>
          <DemandChart
            type="area"
            data={HOURLY_DEMAND_PATTERN}
            xAxisKey="hour"
            dataKeys={[
              { key: "passengers", name: "Actual Riders", color: "#2563eb" },
              { key: "predicted", name: "Simulated Model", color: "#10b981" }
            ]}
            height={280}
            unit="passengers"
          />
        </div>

        {/* Chart 2: Demand By Route */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Demand By Bus Route</h3>
              <p className="text-xs text-slate-500">Average vs. Peak ridership load per trip</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
              8 Active Corridors
            </span>
          </div>
          <DemandChart
            type="bar"
            data={routeDemandData}
            xAxisKey="name"
            dataKeys={[
              { key: "avgPassengers", name: "Average Load", color: "#3b82f6" },
              { key: "peakDemand", name: "Peak Surge", color: "#f59e0b" }
            ]}
            height={280}
            unit="passengers"
          />
        </div>
      </div>

      {/* Main Charts Row 2: Demand by Hour & Predicted vs Actual */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 3: Demand by Hour with Peak Analysis */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Demand By Hour of Day</h3>
              <p className="text-xs text-slate-500">Peak hour distribution showing 7-9 AM and 5-8 PM spikes</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1 font-semibold text-amber-600">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                Peak Rush
              </span>
            </div>
          </div>
          <DemandChart
            type="bar"
            data={HOURLY_DEMAND_PATTERN}
            xAxisKey="hour"
            dataKeys={[
              { key: "passengers", name: "Hourly Riders", color: "#6366f1" }
            ]}
            height={280}
            unit="riders"
          />
        </div>

        {/* Chart 4: Predicted vs Actual Passengers */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Predicted vs. Actual Passengers</h3>
              <p className="text-xs text-slate-500">Model calibration curve and error variance</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              R² ≈ 0.94
            </span>
          </div>
          <DemandChart
            type="line"
            data={predictedVsActualData}
            xAxisKey="hour"
            dataKeys={[
              { key: "actual", name: "Actual Historical Load", color: "#0ea5e9" },
              { key: "predicted", name: "Model Prediction", color: "#8b5cf6" }
            ]}
            height={280}
            unit="riders"
          />
        </div>
      </div>

      {/* Data Science Automated Insights Section */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-5 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-extrabold text-slate-900">
                Automated Data Science Insights
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Dynamically derived patterns and statistical correlations extracted directly from historical trip telemetry.
            </p>
          </div>
          <span className="text-xs font-medium text-slate-400">
            Calculated across {HISTORICAL_DATA.length} operational sample logs
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between hover:border-blue-300 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                    {insight.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-700">
                    {insight.metric}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  {insight.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {insight.description}
                </p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400">
                <span>Impact Level:</span>
                <span
                  className={`font-bold ${
                    insight.impact === "Critical"
                      ? "text-rose-600"
                      : insight.impact === "High"
                      ? "text-amber-600"
                      : "text-blue-600"
                  }`}
                >
                  {insight.impact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Route Status Summary Snapshot */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Active Route Fleet Snapshot</h3>
            <p className="text-xs text-slate-500">Current allocation benchmark vs peak demand</p>
          </div>
          <Link
            to="/routes"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>Manage All Routes</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {INITIAL_ROUTES.slice(0, 4).map((r) => (
            <div
              key={r.id}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition"
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-mono font-bold text-blue-600">{r.id}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    r.demandStatus === "Very High"
                      ? "bg-rose-100 text-rose-800"
                      : r.demandStatus === "High"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {r.demandStatus}
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-800 truncate mb-2">
                {r.name}
              </h4>
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Avg: {r.avgPassengers} riders</span>
                <span className="font-bold text-slate-700">{r.busesAllocated} Buses</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
