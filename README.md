# Smart Public Transport Demand Prediction System

A modern, responsive web application for transit authorities and urban planners to forecast passenger demand, detect peak hours, balance bus dispatch allocations, and derive actionable data-science insights from transport telemetry.

---

## 📌 Problem Statement

Public bus networks frequently suffer from severe overcrowding during morning and evening rush hours while operating near-empty buses during off-peak windows. This leads to passenger dissatisfaction, extended wait times, fuel waste, and increased operational costs.

The **Smart Public Transport Demand Prediction System** solves this by providing transit dispatchers with simulated machine-learning heuristics to predict passenger volumes for specific routes, hours, and meteorological conditions, recommending optimal bus fleet numbers before congestion occurs.

---

## 🚀 Key Features

### 1. Executive Transit Dashboard
- **Real-Time Key Performance Indicators**:
  - Total Active Corridors (8 Urban Lines)
  - Total Fleet Capacity (29 Deployed Buses)
  - System Average Daily Riders (~1,729 riders/day)
  - Today's Projected Demand
  - Peak-Hour Surge Metric (262 riders @ 6:00 PM)
  - Low-Demand Route Monitoring
- **Interactive Visualizations (Recharts)**:
  - Passenger Demand Over Time (24h distribution)
  - Demand By Bus Route (Average vs. Peak capacity)
  - Demand By Hour (highlighting morning and evening commute spikes)
  - Predicted vs. Actual Passenger Variance (calibrated model curve)
- **Data Science Insights Engine**:
  - Automated statistical pattern discovery (top corridor load, bimodal peak hours, weekday vs. weekend contraction, inclement weather correlation).

### 2. Predictive Demand Engine (`/prediction`)
- **Operational Input Variables**:
  - Route selection (Route 101 through Route 108)
  - Date and Day of Week
  - Time of day with automated peak-hour detection
  - Weather condition (Clear, Sunny, Rainy, Cloudy, Foggy, Stormy)
  - Temperature (°C)
  - Working Day vs. Public Holiday
  - Historical Baseline Passenger Count
- **Dynamic Output Results**:
  - Predicted Passenger Volume
  - Demand Level Classification: **Low**, **Medium**, **High**, **Very High**
  - Recommended Bus Allocation (calculated per 50-passenger standard vehicle unit)
  - Automated Transit Fleet Advisory Alerts
  - Simulation Weights & Feature Importance breakdown
  - 1-Click Test Scenarios (e.g. *Monday Morning Rush + Rain*, *Friday University Surge*)

### 3. Transit Routes Directory (`/routes`)
- Comprehensive table of corridors:
  - Route ID, Route Name, Starting Point, Destination, Distance (km), Average Passengers, Peak Demand, and Demand Status badge.
  - Multi-parameter search and status filters.
  - 1-click **"Forecast"** link to simulate predictions for any specific corridor.

### 4. Deep-Dive Transit Analytics (`/analytics`)
- **Daily & Weekly Trends**: Analysis across Monday–Sunday showing Friday commute peaks.
- **Longitudinal Monthly Trends**: Seasonal growth spanning October through March.
- **Peak Hour Detection**:
  - Morning Peak: `07:00 AM – 09:30 AM`
  - Evening Rush: `05:00 PM – 08:00 PM`
- **Comparative Elasticity**:
  - Weekday vs. Weekend ridership (-42% overall weekend drop)
  - Public Holiday vs. Regular Workday shifts
  - Weather Sensitivity Matrix (e.g. +24% volume increase during rain)

### 5. Historical Data Repository (`/historical-data`)
- Full dataset containing historical records across:
  - `date`, `route`, `day`, `time`, `passengers`, `weather`, `temperature`, `holiday`, `distance`
- Real-time client-side search across all fields
- Multi-dimensional filtering (by route, weather, holiday status)
- Multi-column sorting (date, route, passengers, temperature)
- Configurable pagination (10, 15, 25 records per page)
- **Export to CSV** function for downstream analytical workflows
- **Log New Record** modal for real-time telemetry insertion

---

## 🧮 How the Prediction Algorithm Works

The simulated prediction algorithm is located in `src/utils/predictionModel.js`. It approximates a multi-factor regression model calibrated from historical transit patterns.

### Heuristic Equation:

$$\text{PredictedDemand} = \text{round}\Big( \text{BasePassengers} \times W_{\text{time}} \times W_{\text{day}} \times W_{\text{weather}} \times W_{\text{temp}} \times W_{\text{holiday}} \times (W_{\text{route}} \times 0.90) \Big)$$

### Feature Weights Breakdown:

1. **Temporal Factor ($W_{\text{time}}$)**:
   - Early Morning (06:00 – 07:00): `0.85`
   - **Morning Rush Peak (07:00 – 09:30)**: `1.65`
   - Midday Regular (10:00 – 16:30): `0.85 – 1.05`
   - **Evening Rush Peak (16:30 – 20:00)**: `1.70`
   - Night Off-Peak (22:00 – 06:00): `0.45`

2. **Day Factor ($W_{\text{day}}$)**:
   - Weekdays (Mon–Thu): `1.08 – 1.12`
   - Friday: `1.22` (pre-weekend commuting surges)
   - Saturday: `0.72`
   - Sunday: `0.62`

3. **Weather Elasticity ($W_{\text{weather}}$)**:
   - Clear / Sunny: `1.00`
   - **Rainy**: `1.24` (commuters abandon two-wheelers/walking in favor of buses)
   - Cloudy / Foggy: `1.05`
   - Severe Storm: `0.82` (cancellation of non-essential trips)

4. **Temperature Factor ($W_{\text{temp}}$)**:
   - Cold (< 10°C): `1.12` (shelter preference)
   - Hot (> 32°C): `1.15` (air-conditioned fleet usage)
   - Mild (18°C – 26°C): `0.96` (more walking/cycling)

5. **Holiday Discount ($W_{\text{holiday}}$)**:
   - Working Day: `1.00`
   - Public Holiday: `0.68` (-32% reduction in regular office traffic)

6. **Demand Category Classification**:
   - `0 – 74 passengers`: **Low Demand**
   - `75 – 130 passengers`: **Medium Demand**
   - `131 – 190 passengers`: **High Demand**
   - `191+ passengers`: **Very High Demand**

7. **Fleet Bus Recommendation Scale**:
   - `0 – 50 passengers` $\rightarrow$ **1 Bus**
   - `51 – 100 passengers` $\rightarrow$ **2 Buses**
   - `101 – 150 passengers` $\rightarrow$ **3 Buses**
   - `151 – 200 passengers` $\rightarrow$ **4 Buses**
   - `200+ passengers` $\rightarrow$ **5+ Buses**

---

## 🛠️ Technology Stack

- **Frontend**: React 19, JavaScript (ES6+ / JSX)
- **Styling**: Tailwind CSS, PostCSS
- **Routing**: React Router (`react-router-dom`)
- **Data Visualization**: Recharts (Responsive AreaChart, BarChart, LineChart)
- **Icons**: Lucide React
- **Build Tool**: Vite

---

## 💻 Project Structure

```text
public-transport-demand/
│
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Top bar with real-time clock and quick links
│   │   ├── Sidebar.jsx         # Sidebar navigation & peak hours reminder
│   │   ├── StatCard.jsx        # Executive KPI metric cards
│   │   ├── DemandChart.jsx     # Reusable Recharts wrapper (Area/Bar/Line)
│   │   ├── RouteTable.jsx      # Route table with search, filters & sort
│   │   └── PredictionCard.jsx  # Detailed prediction results & factor breakdown
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx       # Main overview dashboard with automated insights
│   │   ├── Prediction.jsx      # Demand forecasting simulator form & presets
│   │   ├── Routes.jsx          # Network route catalog & corridor metrics
│   │   ├── Analytics.jsx       # Deep temporal & comparative trend charts
│   │   └── HistoricalData.jsx  # Telemetry log table with search, pagination & CSV export
│   │
│   ├── data/
│   │   └── transportData.js    # Initial sample datasets, hourly & daily trends
│   │
│   ├── utils/
│   │   └── predictionModel.js  # Multi-factor prediction logic & fleet rules
│   │
│   ├── App.jsx                 # Router root layout
│   ├── main.jsx                # React DOM client entry
│   └── index.css               # Tailwind CSS declarations & scrollbar styles
│
├── package.json
└── README.md
```

---

## 🚀 Installation & Setup Instructions

### Prerequisites
- Node.js (version 18 or higher)
- npm (Node Package Manager)

### 1. Clone or Open Project Directory
```bash
cd public-transport-demand
```

### 2. Install Dependencies
```bash
npm install
```

Required packages installed:
```json
{
  "dependencies": {
    "react": "^19.0.1",
    "react-dom": "^19.0.1",
    "react-router-dom": "^7.1.5",
    "recharts": "^2.15.1",
    "lucide-react": "^0.546.0"
  }
}
```

### 3. Run Development Server
```bash
npm run dev
```

The application will start on:
```
http://localhost:3000
```

### 4. Build for Production
```bash
npm run build
```

---

## 🔮 Future Improvements & Roadmap

1. **Integration with Real Machine Learning Models**:
   - Replace the simulated JS regression engine with a REST or gRPC API serving a trained XGBoost, Random Forest, or LSTM Time-Series model (e.g. FastAPI / PyTorch backend).
2. **GPS Live Telemetry & OpenStreetMap (OSM) / Google Maps Integration**:
   - Plot live bus positions on a interactive map with real-time GPS coordinates and route polyline overlays.
3. **Automated Dynamic Dispatching**:
   - Real-time alerting via SMS/Email/Webhook to dispatch managers when passenger queues at specific stops cross safety thresholds.
4. **Transit Pass & QR Ticketing Feed**:
   - Ingest turnstile tap-in and tap-out smartcard data to feed continuous model retraining.
