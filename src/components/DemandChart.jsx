import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

// Custom polished tooltip
const CustomTooltip = ({ active, payload, label, unit = "passengers" }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs min-w-[160px]">
        <p className="font-bold text-slate-300 mb-1.5 border-b border-slate-800 pb-1">
          {label}
        </p>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5 text-slate-400">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                {entry.name}:
              </span>
              <span className="font-mono font-bold text-white">
                {entry.value?.toLocaleString()} {unit}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function DemandChart({
  type = "area",
  data = [],
  dataKeys = [{ key: "passengers", name: "Passenger Volume", color: "#2563eb" }],
  xAxisKey = "hour",
  height = 300,
  unit = "riders",
  grid = true
}) {
  if (!data || data.length === 0) {
    return (
      <div
        className="w-full flex items-center justify-center bg-slate-50 rounded-xl border border-dashed border-slate-300 text-slate-400 text-sm"
        style={{ height }}
      >
        No chart data available for visualization
      </div>
    );
  }

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        {type === "area" ? (
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <defs>
              {dataKeys.map((item, idx) => (
                <linearGradient key={`grad-${idx}`} id={`gradient-${item.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={item.color || "#2563eb"} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={item.color || "#2563eb"} stopOpacity={0.02} />
                </linearGradient>
              ))}
            </defs>
            {grid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />}
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              axisLine={{ stroke: "#cbd5e1" }}
              tick={{ fill: "#64748b", fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#64748b", fontSize: 11 }}
            />
            <Tooltip content={<CustomTooltip unit={unit} />} />
            <Legend
              wrapperStyle={{ paddingTop: 10, fontSize: "12px", color: "#475569" }}
            />
            {dataKeys.map((item) => (
              <Area
                key={item.key}
                type="monotone"
                dataKey={item.key}
                name={item.name}
                stroke={item.color || "#2563eb"}
                strokeWidth={2.5}
                fillOpacity={1}
                fill={`url(#gradient-${item.key})`}
              />
            ))}
          </AreaChart>
        ) : type === "bar" ? (
          <BarChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            {grid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />}
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              axisLine={{ stroke: "#cbd5e1" }}
              tick={{ fill: "#64748b", fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#64748b", fontSize: 11 }}
            />
            <Tooltip content={<CustomTooltip unit={unit} />} />
            <Legend
              wrapperStyle={{ paddingTop: 10, fontSize: "12px", color: "#475569" }}
            />
            {dataKeys.map((item) => (
              <Bar
                key={item.key}
                dataKey={item.key}
                name={item.name}
                fill={item.color || "#3b82f6"}
                radius={[6, 6, 0, 0]}
              />
            ))}
          </BarChart>
        ) : (
          <LineChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            {grid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />}
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              axisLine={{ stroke: "#cbd5e1" }}
              tick={{ fill: "#64748b", fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#64748b", fontSize: 11 }}
            />
            <Tooltip content={<CustomTooltip unit={unit} />} />
            <Legend
              wrapperStyle={{ paddingTop: 10, fontSize: "12px", color: "#475569" }}
            />
            {dataKeys.map((item) => (
              <Line
                key={item.key}
                type="monotone"
                dataKey={item.key}
                name={item.name}
                stroke={item.color || "#2563eb"}
                strokeWidth={2.5}
                dot={{ r: 3, fill: item.color || "#2563eb" }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
