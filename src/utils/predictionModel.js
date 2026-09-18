/**
 * Smart Public Transport Demand Prediction Model (Simulation Engine)
 * 
 * Simulates a trained Regression / Multi-Factor Transit ML Model.
 * Formula:
 * predictedDemand = Math.round(
 *   basePassengers * timeFactor * dayFactor * weatherFactor * tempFactor * holidayFactor * routeFactor
 * )
 */

// Route popularity weights based on historical ridership density
export const ROUTE_POPULARITY_FACTORS = {
  "Route 101": 1.15, // Downtown Express
  "Route 102": 0.90, // Riverfront Loop
  "Route 103": 1.30, // University Cross (High volume)
  "Route 104": 1.10, // Suburban Flyer
  "Route 105": 1.12, // Airport Link
  "Route 106": 0.85, // Industrial Belt
  "Route 107": 1.00, // Medical Shuttle
  "Route 108": 0.78  // Hillside Connector
};

/**
 * Checks if a given time string falls within recognized peak transit hours
 * Morning Peak: 07:00 to 09:30 AM
 * Evening Peak: 05:00 to 08:00 PM (17:00 to 20:00)
 */
export function isPeakHour(timeString) {
  if (!timeString) return false;

  // Convert time to 24-hour decimal for precise threshold checking
  let hours = 0;
  let minutes = 0;

  if (timeString.includes("AM") || timeString.includes("PM")) {
    const [timePart, modifier] = timeString.split(" ");
    const parts = timePart.split(":");
    hours = parseInt(parts[0], 10);
    minutes = parts[1] ? parseInt(parts[1], 10) : 0;

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
  } else {
    // 24-hour format "HH:MM"
    const parts = timeString.split(":");
    hours = parseInt(parts[0], 10);
    minutes = parts[1] ? parseInt(parts[1], 10) : 0;
  }

  const decimalTime = hours + minutes / 60;

  // Morning Rush: 7:00 - 9:30 (7.0 to 9.5)
  // Evening Rush: 17:00 - 20:00 (17.0 to 20.0)
  const isMorningPeak = decimalTime >= 7.0 && decimalTime <= 9.5;
  const isEveningPeak = decimalTime >= 17.0 && decimalTime <= 20.0;

  return isMorningPeak || isEveningPeak;
}

/**
 * Calculates temporal load multiplier based on time of day
 */
export function getTimeFactor(timeString) {
  if (!timeString) return 1.0;

  let hours = 0;
  let minutes = 0;
  if (timeString.includes("AM") || timeString.includes("PM")) {
    const [timePart, modifier] = timeString.split(" ");
    const parts = timePart.split(":");
    hours = parseInt(parts[0], 10);
    minutes = parts[1] ? parseInt(parts[1], 10) : 0;
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
  } else {
    const parts = timeString.split(":");
    hours = parseInt(parts[0], 10);
    minutes = parts[1] ? parseInt(parts[1], 10) : 0;
  }

  const decimal = hours + minutes / 60;

  // Off-peak night (22:00 - 06:00)
  if (decimal < 6 || decimal >= 22) return 0.45;
  // Early morning (06:00 - 07:00)
  if (decimal >= 6 && decimal < 7) return 0.85;
  // Morning Rush Peak (07:00 - 09:30)
  if (decimal >= 7 && decimal <= 9.5) return 1.65;
  // Midday valley (09:30 - 12:00)
  if (decimal > 9.5 && decimal < 12) return 0.90;
  // Lunch movement (12:00 - 14:00)
  if (decimal >= 12 && decimal <= 14) return 1.05;
  // Afternoon lull (14:00 - 16:30)
  if (decimal > 14 && decimal < 16.5) return 0.85;
  // Evening Rush Peak (16:30 - 20:00)
  if (decimal >= 16.5 && decimal <= 20) return 1.70;
  // Evening decline (20:00 - 22:00)
  return 0.75;
}

/**
 * Day of week multiplier
 */
export function getDayFactor(day) {
  const dayFactors = {
    "Monday": 1.08,
    "Tuesday": 1.10,
    "Wednesday": 1.08,
    "Thursday": 1.12,
    "Friday": 1.22, // Friday afternoon exodus
    "Saturday": 0.72,
    "Sunday": 0.62
  };
  return dayFactors[day] || 1.0;
}

/**
 * Weather multiplier
 * In transit data, moderate rain boosts public transit usage because commuters avoid motorbikes/walking.
 * Severe storm or heavy snow slightly suppresses non-essential trips.
 */
export function getWeatherFactor(weather) {
  const normalized = (weather || "").toLowerCase();
  switch (normalized) {
    case "rainy":
    case "rain":
      return 1.24; // Rain increases bus reliance
    case "snowy":
    case "snow":
      return 1.15;
    case "stormy":
    case "thunderstorm":
      return 0.82; // Extreme weather reduces trips
    case "cloudy":
    case "foggy":
      return 1.05;
    case "clear":
    case "sunny":
    default:
      return 1.0;
  }
}

/**
 * Temperature factor
 * Extreme temperatures drive people to air-conditioned public transit.
 */
export function getTemperatureFactor(tempC) {
  const temp = parseFloat(tempC) || 24;
  if (temp < 10) return 1.12; // Cold outside, prefer heated bus
  if (temp > 32) return 1.15; // Hot outside, air-conditioned bus
  if (temp >= 18 && temp <= 26) return 0.96; // Pleasant weather; some people walk or cycle
  return 1.0;
}

/**
 * Holiday factor
 * General commuter trips decline on public holidays
 */
export function getHolidayFactor(isHoliday) {
  const holiday = String(isHoliday).toLowerCase();
  if (holiday === "yes" || holiday === "true" || holiday === "1") {
    return 0.68; // Drops ~32%
  }
  return 1.0;
}

/**
 * Determine Demand Category based on predicted passenger count
 */
export function getDemandCategory(passengers) {
  if (passengers < 75) {
    return {
      level: "Low",
      color: "text-emerald-700 bg-emerald-50 border-emerald-200",
      badgeColor: "bg-emerald-100 text-emerald-800",
      indicator: "bg-emerald-500",
      description: "Ample seat availability. Standard or reduced dispatch is sufficient."
    };
  }
  if (passengers <= 130) {
    return {
      level: "Medium",
      color: "text-blue-700 bg-blue-50 border-blue-200",
      badgeColor: "bg-blue-100 text-blue-800",
      indicator: "bg-blue-500",
      description: "Balanced passenger loading. Normal operational timetable recommended."
    };
  }
  if (passengers <= 190) {
    return {
      level: "High",
      color: "text-amber-700 bg-amber-50 border-amber-200",
      badgeColor: "bg-amber-100 text-amber-800",
      indicator: "bg-amber-500",
      description: "Near capacity load. Ensure prompt boarding and headway maintenance."
    };
  }
  return {
    level: "Very High",
    color: "text-rose-700 bg-rose-50 border-rose-200",
    badgeColor: "bg-rose-100 text-rose-800",
    indicator: "bg-rose-500",
    description: "Severe overcrowding expected. Emergency auxiliary fleet dispatch advised."
  };
}

/**
 * Recommended bus count based on passenger volume
 * 0–50 passengers     → 1 bus
 * 51–100 passengers   → 2 buses
 * 101–150 passengers  → 3 buses
 * 151–200 passengers  → 4 buses
 * 200+ passengers     → 5 buses
 */
export function getRecommendedBuses(passengers) {
  if (passengers <= 50) return 1;
  if (passengers <= 100) return 2;
  if (passengers <= 150) return 3;
  if (passengers <= 200) return 4;
  return Math.min(8, Math.max(5, Math.ceil(passengers / 50)));
}

/**
 * Main Demand Prediction Function
 * 
 * @param {Object} input
 * @param {string} input.route - Route identifier (e.g., "Route 101")
 * @param {string} input.date - Date (YYYY-MM-DD)
 * @param {string} input.day - Day of week (Monday, Tuesday, etc.)
 * @param {string} input.time - Time of day (e.g., "08:00 AM" or "08:00")
 * @param {string} input.weather - Weather condition ("Clear", "Rainy", "Cloudy", etc.)
 * @param {number|string} input.temperature - Temperature in Celsius
 * @param {string} input.holiday - "Yes" or "No"
 * @param {number|string} input.previousPassengers - Historical baseline passenger count
 * 
 * @returns {Object} Full prediction result with factors, buses, alert message, and metadata
 */
export function predictPassengerDemand(input) {
  const {
    route = "Route 101",
    day = "Monday",
    time = "08:00 AM",
    weather = "Clear",
    temperature = 24,
    holiday = "No",
    previousPassengers = 120
  } = input;

  const basePassengers = Math.max(10, parseFloat(previousPassengers) || 100);

  // Compute individual factors
  const timeFactor = getTimeFactor(time);
  const dayFactor = getDayFactor(day);
  const weatherFactor = getWeatherFactor(weather);
  const tempFactor = getTemperatureFactor(temperature);
  const holidayFactor = getHolidayFactor(holiday);
  const routeFactor = ROUTE_POPULARITY_FACTORS[route] || 1.0;

  // Simulated composite regression formula
  const rawPredicted = basePassengers * timeFactor * dayFactor * weatherFactor * tempFactor * holidayFactor * (routeFactor * 0.9);
  
  // Apply a slight calibrated bounds (prevent unrealistic negative or zero numbers)
  const predictedDemand = Math.max(12, Math.round(rawPredicted));

  // Determine metadata
  const categoryInfo = getDemandCategory(predictedDemand);
  const suggestedBuses = getRecommendedBuses(predictedDemand);
  const peak = isPeakHour(time);

  // Advisory message formatting
  let advisoryMessage = "";
  if (predictedDemand > 180) {
    advisoryMessage = `High passenger demand (${predictedDemand} riders) is expected on ${route} at ${time}. Consider deploying ${suggestedBuses} buses and standby auxiliary units.`;
  } else if (predictedDemand >= 120) {
    advisoryMessage = `Moderate to high passenger demand (${predictedDemand} riders) is expected on ${route} at ${time}. Schedule ${suggestedBuses} buses to maintain standard headways.`;
  } else if (predictedDemand < 60) {
    advisoryMessage = `Low demand anticipated (${predictedDemand} riders) for ${route} at ${time}. 1 bus is optimal to conserve fuel and operational overhead.`;
  } else {
    advisoryMessage = `Steady passenger flow of ~${predictedDemand} riders forecasted for ${route} at ${time}. Recommended allocation: ${suggestedBuses} standard buses.`;
  }

  // Model confidence index calculation (simulating machine learning R² & variance)
  const confidenceScore = Math.min(96, Math.max(82, Math.round(91 - (Math.abs(1.0 - weatherFactor) * 10) + (timeFactor > 1.4 ? 3 : 0))));

  return {
    predictedDemand,
    demandCategory: categoryInfo.level,
    categoryDetails: categoryInfo,
    suggestedBuses,
    isPeakHour: peak,
    advisoryMessage,
    confidenceScore,
    inputSnapshot: {
      route,
      day,
      time,
      weather,
      temperature,
      holiday,
      previousPassengers: basePassengers
    },
    factors: {
      timeFactor: Number(timeFactor.toFixed(2)),
      dayFactor: Number(dayFactor.toFixed(2)),
      weatherFactor: Number(weatherFactor.toFixed(2)),
      tempFactor: Number(tempFactor.toFixed(2)),
      holidayFactor: Number(holidayFactor.toFixed(2)),
      routeFactor: Number(routeFactor.toFixed(2))
    }
  };
}
