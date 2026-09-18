import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatCard({
  id,
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendDirection = "up",
  color = "blue"
}) {
  const colorStyles = {
    blue: {
      iconBg: "bg-blue-100 text-blue-700",
      accent: "border-l-blue-600"
    },
    emerald: {
      iconBg: "bg-emerald-100 text-emerald-700",
      accent: "border-l-emerald-600"
    },
    amber: {
      iconBg: "bg-amber-100 text-amber-700",
      accent: "border-l-amber-600"
    },
    purple: {
      iconBg: "bg-purple-100 text-purple-700",
      accent: "border-l-purple-600"
    },
    rose: {
      iconBg: "bg-rose-100 text-rose-700",
      accent: "border-l-rose-600"
    },
    indigo: {
      iconBg: "bg-indigo-100 text-indigo-700",
      accent: "border-l-indigo-600"
    }
  };

  const style = colorStyles[color] || colorStyles.blue;

  return (
    <div
      id={id || `stat-card-${title.toLowerCase().replace(/\s+/g, "-")}`}
      className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {title}
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {value}
            </h3>
          </div>
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl ${style.iconBg} shadow-xs`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        {subtitle && <span className="text-slate-500">{subtitle}</span>}
        {trend && (
          <span
            className={`inline-flex items-center gap-1 font-bold ${
              trendDirection === "up" ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {trendDirection === "up" ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" />
            )}
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
