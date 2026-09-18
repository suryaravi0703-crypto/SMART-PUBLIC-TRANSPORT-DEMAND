/**
 * Sample Transport Dataset & Route Specifications
 * Represents historical transit telemetry, route maps, and weather conditions.
 */

export const INITIAL_ROUTES = [
  {
    id: "R-101",
    name: "Route 101 - Downtown Express",
    startPoint: "Metro Central",
    destination: "Tech Hub East",
    distance: "18.5 km",
    distanceKm: 18.5,
    avgPassengers: 154,
    peakDemand: 245,
    demandStatus: "High",
    popularityMultiplier: 1.25,
    busesAllocated: 5
  },
  {
    id: "R-102",
    name: "Route 102 - Riverfront Loop",
    startPoint: "Old Town Pier",
    destination: "West End Marina",
    distance: "12.0 km",
    distanceKm: 12.0,
    avgPassengers: 88,
    peakDemand: 135,
    demandStatus: "Medium",
    popularityMultiplier: 0.95,
    busesAllocated: 3
  },
  {
    id: "R-103",
    name: "Route 103 - University Cross",
    startPoint: "South Terminal",
    destination: "University Campus North",
    distance: "15.2 km",
    distanceKm: 15.2,
    avgPassengers: 178,
    peakDemand: 275,
    demandStatus: "Very High",
    popularityMultiplier: 1.35,
    busesAllocated: 6
  },
  {
    id: "R-104",
    name: "Route 104 - Suburban Flyer",
    startPoint: "Greenwood Valley",
    destination: "Financial District",
    distance: "24.8 km",
    distanceKm: 24.8,
    avgPassengers: 122,
    peakDemand: 205,
    demandStatus: "High",
    popularityMultiplier: 1.15,
    busesAllocated: 4
  },
  {
    id: "R-105",
    name: "Route 105 - Airport Link",
    startPoint: "Central Railway Stn",
    destination: "International Terminal 3",
    distance: "28.0 km",
    distanceKm: 28.0,
    avgPassengers: 135,
    peakDemand: 190,
    demandStatus: "High",
    popularityMultiplier: 1.18,
    busesAllocated: 4
  },
  {
    id: "R-106",
    name: "Route 106 - Industrial Belt",
    startPoint: "North Gate Plaza",
    destination: "Logistics Park Sector 4",
    distance: "21.4 km",
    distanceKm: 21.4,
    avgPassengers: 68,
    peakDemand: 110,
    demandStatus: "Low",
    popularityMultiplier: 0.82,
    busesAllocated: 2
  },
  {
    id: "R-107",
    name: "Route 107 - Medical Shuttle",
    startPoint: "Civic Center",
    destination: "Memorial General Hospital",
    distance: "9.6 km",
    distanceKm: 9.6,
    avgPassengers: 96,
    peakDemand: 148,
    demandStatus: "Medium",
    popularityMultiplier: 1.02,
    busesAllocated: 3
  },
  {
    id: "R-108",
    name: "Route 108 - Hillside Connector",
    startPoint: "Pine Ridge Heights",
    destination: "Market Square",
    distance: "14.1 km",
    distanceKm: 14.1,
    avgPassengers: 54,
    peakDemand: 86,
    demandStatus: "Low",
    popularityMultiplier: 0.75,
    busesAllocated: 2
  }
];

export const HISTORICAL_DATA = [
  { id: 1, date: "2026-03-01", route: "Route 101", day: "Monday", time: "08:00 AM", passengers: 210, weather: "Clear", temperature: 22, holiday: "No", distance: "18.5 km" },
  { id: 2, date: "2026-03-01", route: "Route 101", day: "Monday", time: "11:00 AM", passengers: 95, weather: "Clear", temperature: 26, holiday: "No", distance: "18.5 km" },
  { id: 3, date: "2026-03-01", route: "Route 101", day: "Monday", time: "05:30 PM", passengers: 228, weather: "Clear", temperature: 24, holiday: "No", distance: "18.5 km" },
  { id: 4, date: "2026-03-01", route: "Route 102", day: "Monday", time: "08:30 AM", passengers: 125, weather: "Clear", temperature: 22, holiday: "No", distance: "12.0 km" },
  { id: 5, date: "2026-03-01", route: "Route 102", day: "Monday", time: "02:00 PM", passengers: 68, weather: "Sunny", temperature: 28, holiday: "No", distance: "12.0 km" },
  { id: 6, date: "2026-03-01", route: "Route 103", day: "Monday", time: "08:00 AM", passengers: 255, weather: "Clear", temperature: 22, holiday: "No", distance: "15.2 km" },
  { id: 7, date: "2026-03-01", route: "Route 103", day: "Monday", time: "01:30 PM", passengers: 130, weather: "Clear", temperature: 27, holiday: "No", distance: "15.2 km" },
  { id: 8, date: "2026-03-01", route: "Route 103", day: "Monday", time: "06:00 PM", passengers: 265, weather: "Clear", temperature: 23, holiday: "No", distance: "15.2 km" },
  { id: 9, date: "2026-03-01", route: "Route 104", day: "Monday", time: "07:30 AM", passengers: 185, weather: "Clear", temperature: 21, holiday: "No", distance: "24.8 km" },
  { id: 10, date: "2026-03-01", route: "Route 105", day: "Monday", time: "09:00 AM", passengers: 145, weather: "Clear", temperature: 23, holiday: "No", distance: "28.0 km" },
  
  { id: 11, date: "2026-03-02", route: "Route 101", day: "Tuesday", time: "08:00 AM", passengers: 218, weather: "Rainy", temperature: 19, holiday: "No", distance: "18.5 km" },
  { id: 12, date: "2026-03-02", route: "Route 101", day: "Tuesday", time: "12:00 PM", passengers: 104, weather: "Rainy", temperature: 20, holiday: "No", distance: "18.5 km" },
  { id: 13, date: "2026-03-02", route: "Route 101", day: "Tuesday", time: "06:00 PM", passengers: 234, weather: "Rainy", temperature: 18, holiday: "No", distance: "18.5 km" },
  { id: 14, date: "2026-03-02", route: "Route 102", day: "Tuesday", time: "08:00 AM", passengers: 132, weather: "Rainy", temperature: 19, holiday: "No", distance: "12.0 km" },
  { id: 15, date: "2026-03-02", route: "Route 103", day: "Tuesday", time: "08:30 AM", passengers: 270, weather: "Rainy", temperature: 19, holiday: "No", distance: "15.2 km" },
  { id: 16, date: "2026-03-02", route: "Route 104", day: "Tuesday", time: "05:45 PM", passengers: 198, weather: "Rainy", temperature: 18, holiday: "No", distance: "24.8 km" },
  { id: 17, date: "2026-03-02", route: "Route 106", day: "Tuesday", time: "07:00 AM", passengers: 98, weather: "Rainy", temperature: 18, holiday: "No", distance: "21.4 km" },
  { id: 18, date: "2026-03-02", route: "Route 107", day: "Tuesday", time: "09:30 AM", passengers: 140, weather: "Rainy", temperature: 20, holiday: "No", distance: "9.6 km" },
  
  { id: 19, date: "2026-03-03", route: "Route 101", day: "Wednesday", time: "08:00 AM", passengers: 215, weather: "Cloudy", temperature: 21, holiday: "No", distance: "18.5 km" },
  { id: 20, date: "2026-03-03", route: "Route 101", day: "Wednesday", time: "02:30 PM", passengers: 88, weather: "Cloudy", temperature: 25, holiday: "No", distance: "18.5 km" },
  { id: 21, date: "2026-03-03", route: "Route 103", day: "Wednesday", time: "08:00 AM", passengers: 260, weather: "Cloudy", temperature: 21, holiday: "No", distance: "15.2 km" },
  { id: 22, date: "2026-03-03", route: "Route 103", day: "Wednesday", time: "05:15 PM", passengers: 250, weather: "Cloudy", temperature: 23, holiday: "No", distance: "15.2 km" },
  { id: 23, date: "2026-03-03", route: "Route 105", day: "Wednesday", time: "10:00 AM", passengers: 135, weather: "Cloudy", temperature: 24, holiday: "No", distance: "28.0 km" },
  { id: 24, date: "2026-03-03", route: "Route 108", day: "Wednesday", time: "08:15 AM", passengers: 76, weather: "Cloudy", temperature: 20, holiday: "No", distance: "14.1 km" },

  { id: 25, date: "2026-03-04", route: "Route 101", day: "Thursday", time: "08:30 AM", passengers: 222, weather: "Clear", temperature: 23, holiday: "No", distance: "18.5 km" },
  { id: 26, date: "2026-03-04", route: "Route 102", day: "Thursday", time: "06:15 PM", passengers: 120, weather: "Clear", temperature: 24, holiday: "No", distance: "12.0 km" },
  { id: 27, date: "2026-03-04", route: "Route 103", day: "Thursday", time: "09:00 AM", passengers: 240, weather: "Clear", temperature: 24, holiday: "No", distance: "15.2 km" },
  { id: 28, date: "2026-03-04", route: "Route 104", day: "Thursday", time: "08:00 AM", passengers: 190, weather: "Clear", temperature: 22, holiday: "No", distance: "24.8 km" },
  { id: 29, date: "2026-03-04", route: "Route 105", day: "Thursday", time: "06:30 PM", passengers: 172, weather: "Clear", temperature: 23, holiday: "No", distance: "28.0 km" },
  { id: 30, date: "2026-03-04", route: "Route 107", day: "Thursday", time: "08:45 AM", passengers: 138, weather: "Clear", temperature: 23, holiday: "No", distance: "9.6 km" },

  { id: 31, date: "2026-03-05", route: "Route 101", day: "Friday", time: "08:00 AM", passengers: 230, weather: "Sunny", temperature: 27, holiday: "No", distance: "18.5 km" },
  { id: 32, date: "2026-03-05", route: "Route 101", day: "Friday", time: "04:30 PM", passengers: 215, weather: "Sunny", temperature: 29, holiday: "No", distance: "18.5 km" },
  { id: 33, date: "2026-03-05", route: "Route 101", day: "Friday", time: "07:00 PM", passengers: 240, weather: "Clear", temperature: 25, holiday: "No", distance: "18.5 km" },
  { id: 34, date: "2026-03-05", route: "Route 103", day: "Friday", time: "08:00 AM", passengers: 268, weather: "Sunny", temperature: 27, holiday: "No", distance: "15.2 km" },
  { id: 35, date: "2026-03-05", route: "Route 103", day: "Friday", time: "03:00 PM", passengers: 175, weather: "Sunny", temperature: 30, holiday: "No", distance: "15.2 km" },
  { id: 36, date: "2026-03-05", route: "Route 104", day: "Friday", time: "05:30 PM", passengers: 210, weather: "Sunny", temperature: 28, holiday: "No", distance: "24.8 km" },
  { id: 37, date: "2026-03-05", route: "Route 105", day: "Friday", time: "08:00 PM", passengers: 185, weather: "Clear", temperature: 24, holiday: "No", distance: "28.0 km" },

  { id: 38, date: "2026-03-06", route: "Route 101", day: "Saturday", time: "09:00 AM", passengers: 110, weather: "Clear", temperature: 25, holiday: "Yes", distance: "18.5 km" },
  { id: 39, date: "2026-03-06", route: "Route 101", day: "Saturday", time: "01:00 PM", passengers: 135, weather: "Clear", temperature: 28, holiday: "Yes", distance: "18.5 km" },
  { id: 40, date: "2026-03-06", route: "Route 101", day: "Saturday", time: "07:30 PM", passengers: 160, weather: "Clear", temperature: 24, holiday: "Yes", distance: "18.5 km" },
  { id: 41, date: "2026-03-06", route: "Route 102", day: "Saturday", time: "11:30 AM", passengers: 115, weather: "Clear", temperature: 27, holiday: "Yes", distance: "12.0 km" },
  { id: 42, date: "2026-03-06", route: "Route 103", day: "Saturday", time: "10:00 AM", passengers: 120, weather: "Clear", temperature: 26, holiday: "Yes", distance: "15.2 km" },
  { id: 43, date: "2026-03-06", route: "Route 105", day: "Saturday", time: "02:00 PM", passengers: 155, weather: "Clear", temperature: 29, holiday: "Yes", distance: "28.0 km" },

  { id: 44, date: "2026-03-07", route: "Route 101", day: "Sunday", time: "10:00 AM", passengers: 92, weather: "Sunny", temperature: 26, holiday: "Yes", distance: "18.5 km" },
  { id: 45, date: "2026-03-07", route: "Route 101", day: "Sunday", time: "04:00 PM", passengers: 124, weather: "Sunny", temperature: 30, holiday: "Yes", distance: "18.5 km" },
  { id: 46, date: "2026-03-07", route: "Route 102", day: "Sunday", time: "03:30 PM", passengers: 108, weather: "Sunny", temperature: 29, holiday: "Yes", distance: "12.0 km" },
  { id: 47, date: "2026-03-07", route: "Route 103", day: "Sunday", time: "11:00 AM", passengers: 98, weather: "Sunny", temperature: 28, holiday: "Yes", distance: "15.2 km" },
  { id: 48, date: "2026-03-07", route: "Route 105", day: "Sunday", time: "05:00 PM", passengers: 160, weather: "Sunny", temperature: 28, holiday: "Yes", distance: "28.0 km" },
  { id: 49, date: "2026-03-07", route: "Route 108", day: "Sunday", time: "12:00 PM", passengers: 45, weather: "Sunny", temperature: 28, holiday: "Yes", distance: "14.1 km" },

  { id: 50, date: "2026-03-08", route: "Route 101", day: "Monday", time: "08:00 AM", passengers: 216, weather: "Foggy", temperature: 17, holiday: "No", distance: "18.5 km" },
  { id: 51, date: "2026-03-08", route: "Route 103", day: "Monday", time: "08:30 AM", passengers: 262, weather: "Foggy", temperature: 17, holiday: "No", distance: "15.2 km" },
  { id: 52, date: "2026-03-08", route: "Route 104", day: "Monday", time: "08:00 AM", passengers: 188, weather: "Foggy", temperature: 17, holiday: "No", distance: "24.8 km" },
  { id: 53, date: "2026-03-08", route: "Route 106", day: "Monday", time: "07:30 AM", passengers: 102, weather: "Foggy", temperature: 16, holiday: "No", distance: "21.4 km" }
];

export const HOURLY_DEMAND_PATTERN = [
  { hour: "06:00 AM", timeLabel: "06:00", passengers: 74, predicted: 78, isPeak: false },
  { hour: "07:00 AM", timeLabel: "07:00", passengers: 168, predicted: 175, isPeak: true },
  { hour: "08:00 AM", timeLabel: "08:00", passengers: 254, predicted: 260, isPeak: true },
  { hour: "09:00 AM", timeLabel: "09:00", passengers: 220, predicted: 215, isPeak: true },
  { hour: "10:00 AM", timeLabel: "10:00", passengers: 130, predicted: 125, isPeak: false },
  { hour: "11:00 AM", timeLabel: "11:00", passengers: 105, predicted: 100, isPeak: false },
  { hour: "12:00 PM", timeLabel: "12:00", passengers: 140, predicted: 138, isPeak: false },
  { hour: "01:00 PM", timeLabel: "13:00", passengers: 120, predicted: 122, isPeak: false },
  { hour: "02:00 PM", timeLabel: "14:00", passengers: 95, predicted: 90, isPeak: false },
  { hour: "03:00 PM", timeLabel: "15:00", passengers: 125, predicted: 130, isPeak: false },
  { hour: "04:00 PM", timeLabel: "16:00", passengers: 175, predicted: 170, isPeak: false },
  { hour: "05:00 PM", timeLabel: "17:00", passengers: 245, predicted: 250, isPeak: true },
  { hour: "06:00 PM", timeLabel: "18:00", passengers: 262, predicted: 258, isPeak: true },
  { hour: "07:00 PM", timeLabel: "19:00", passengers: 215, predicted: 220, isPeak: true },
  { hour: "08:00 PM", timeLabel: "20:00", passengers: 155, predicted: 150, isPeak: false },
  { hour: "09:00 PM", timeLabel: "21:00", passengers: 98, predicted: 95, isPeak: false },
  { hour: "10:00 PM", timeLabel: "22:00", passengers: 56, predicted: 50, isPeak: false }
];

export const DAILY_TRENDS = [
  { day: "Mon", passengers: 1840, predicted: 1810, busesUsed: 28 },
  { day: "Tue", passengers: 1910, predicted: 1890, busesUsed: 29 },
  { day: "Wed", passengers: 1860, predicted: 1870, busesUsed: 28 },
  { day: "Thu", passengers: 1940, predicted: 1920, busesUsed: 29 },
  { day: "Fri", passengers: 2080, predicted: 2050, busesUsed: 31 },
  { day: "Sat", passengers: 1320, predicted: 1350, busesUsed: 21 },
  { day: "Sun", passengers: 1150, predicted: 1180, busesUsed: 19 }
];

export const MONTHLY_TRENDS = [
  { month: "Oct", actual: 48500, predicted: 47800 },
  { month: "Nov", actual: 51200, predicted: 50900 },
  { month: "Dec", actual: 46800, predicted: 47200 },
  { month: "Jan", actual: 52400, predicted: 52000 },
  { month: "Feb", actual: 54100, predicted: 53800 },
  { month: "Mar", actual: 57900, predicted: 57500 }
];

/**
 * Calculates statistical insights dynamically from the dataset
 */
export function calculateDatasetInsights(data = HISTORICAL_DATA, routes = INITIAL_ROUTES) {
  if (!data || data.length === 0) {
    return [];
  }

  // 1. Highest demand route
  const routeTotals = {};
  data.forEach(item => {
    routeTotals[item.route] = routeTotals[item.route] || { sum: 0, count: 0 };
    routeTotals[item.route].sum += item.passengers;
    routeTotals[item.route].count += 1;
  });

  let highestAvgRoute = "";
  let highestAvg = 0;
  Object.keys(routeTotals).forEach(r => {
    const avg = routeTotals[r].sum / routeTotals[r].count;
    if (avg > highestAvg) {
      highestAvg = avg;
      highestAvgRoute = r;
    }
  });

  // 2. Peak hour analysis from hourly pattern
  const peakHours = HOURLY_DEMAND_PATTERN.filter(h => h.isPeak);
  const peakMorning = "7:00 AM – 9:00 AM";
  const peakEvening = "5:00 PM – 8:00 PM";

  // 3. Weekday vs Weekend
  const weekdayItems = data.filter(d => ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].includes(d.day));
  const weekendItems = data.filter(d => ["Saturday", "Sunday"].includes(d.day));
  const weekdayAvg = weekdayItems.length ? Math.round(weekdayItems.reduce((acc, i) => acc + i.passengers, 0) / weekdayItems.length) : 0;
  const weekendAvg = weekendItems.length ? Math.round(weekendItems.reduce((acc, i) => acc + i.passengers, 0) / weekendItems.length) : 0;
  const weekendDiffPercent = weekdayAvg ? Math.round(((weekdayAvg - weekendAvg) / weekdayAvg) * 100) : 0;

  // 4. Weather Impact
  const rainyItems = data.filter(d => d.weather.toLowerCase() === "rainy");
  const clearItems = data.filter(d => ["clear", "sunny"].includes(d.weather.toLowerCase()));
  const rainyAvg = rainyItems.length ? Math.round(rainyItems.reduce((acc, i) => acc + i.passengers, 0) / rainyItems.length) : 0;
  const clearAvg = clearItems.length ? Math.round(clearItems.reduce((acc, i) => acc + i.passengers, 0) / clearItems.length) : 0;
  const rainyDiffPercent = clearAvg ? Math.round(((rainyAvg - clearAvg) / clearAvg) * 100) : 0;

  // 5. Total fleet and system summary
  const totalRoutes = routes.length;
  const totalBuses = routes.reduce((acc, r) => acc + (r.busesAllocated || 3), 0);
  const totalPassengersSampled = data.reduce((acc, i) => acc + i.passengers, 0);

  return [
    {
      id: "insight-1",
      title: "Top Demand Corridor",
      description: `${highestAvgRoute} records the highest average passenger load (~${Math.round(highestAvg)} riders/trip), driven by university transit traffic.`,
      category: "Route Analysis",
      impact: "High",
      metric: `${Math.round(highestAvg)} avg/trip`
    },
    {
      id: "insight-2",
      title: "Bimodal Peak Hours Identified",
      description: `Surges occur at morning commute (${peakMorning}) and evening rush (${peakEvening}), accounting for 54% of daily volume.`,
      category: "Temporal Pattern",
      impact: "Critical",
      metric: "7-9 AM & 5-8 PM"
    },
    {
      id: "insight-3",
      title: "Weekday vs. Weekend Contraction",
      description: `Weekend passenger volume drops by ~${weekendDiffPercent}% compared to typical workdays (${weekendAvg} vs ${weekdayAvg} passengers).`,
      category: "Fleet Optimization",
      impact: "Medium",
      metric: `-${weekendDiffPercent}% on weekends`
    },
    {
      id: "insight-4",
      title: "Inclement Weather Surge",
      description: `Rainy weather correlates with an average ${Math.abs(rainyDiffPercent)}% shift in passenger loads as commuters substitute two-wheelers with transit buses.`,
      category: "Weather Factor",
      impact: "High",
      metric: `${rainyDiffPercent >= 0 ? "+" : ""}${rainyDiffPercent}% in rain`
    }
  ];
}
