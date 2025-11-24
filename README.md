# 🚀 CityPulse: Smart City IoT + AI Traffic & Pollution Prediction Platform

CityPulse is a real-time smart-city monitoring system that simulates IoT device streaming, environmental sensing, and predictive analytics to estimate traffic congestion and pollution levels for urban zones.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat&logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat&logo=tailwindcss)

## 🧠 Core Concept

CityPulse collects live sensor telemetry such as:
- 🚗 Average vehicle speed
- 🌡 Temperature
- 💧 Humidity
- ☁️ Weather conditions
- ⏱ Time-of-day (Peak/Day/Night)

This data is combined with city metadata (population density, registered vehicles, zoning) stored in MongoDB. A prediction engine then classifies **Traffic Level** and **Pollution Level** into:
- 🔹 Low
- 🟡 Medium
- 🔴 High

## 🏗 System Architecture

```
IoT Device (Simulated UI)
       |
       v
REST API (POST /api/iot)
       |
MongoDB ---------------- Settings (Admin UI)
       |
       v
Prediction Engine (/api/prediction)
       |
       v
Live Dashboard (Auto-refresh UI)
```

## ✨ Features

- ✅ **Live IoT Data Ingestion** - Manual simulator UI or real hardware integration
- ✅ **Real-time Prediction Updates** - Dashboard refreshes every 5 seconds
- ✅ **Persistent Configuration** - City metadata stored in MongoDB Atlas
- ✅ **Rule-based Analytics Engine** - Easy upgrade to ML models
- ✅ **System Status Indicator** - Online/Waiting states
- ✅ **Premium Modern UI** - Sleek dark theme with glassmorphism

## 💻 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16 + React + Tailwind CSS v4 |
| **Backend** | Next.js App Router (Server Actions) |
| **Database** | MongoDB Atlas + Mongoose ODM |
| **Prediction** | Custom rule-based JS engine |
| **Charts** | Recharts |
| **Icons** | Lucide React |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (free tier works)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd city-pulse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure MongoDB**
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/citypulse?retryWrites=true&w=majority
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Pages

### 🌐 Landing Page (`/`)
- Hero section with system overview
- Feature cards
- Call-to-action buttons

### 📊 Dashboard (`/dashboard`)
- Real-time status cards (Traffic, Pollution, Temperature, Humidity)
- Live charts showing trends
- Auto-refresh every 5 seconds

### 🔧 IoT Simulator (`/iot`)
- Manual sensor data input
- Auto-simulation mode (sends data every 2 seconds)
- Real-time transmission logs

### ⚙️ Settings (`/settings`)
- Configure city metadata (population, vehicle count)
- Adjust prediction thresholds
- Save configuration to database

## 🎨 Design System

- **Theme**: Sleek & Modern Dark Mode
- **Primary Color**: Indigo (`#4F46E5`)
- **Accent Color**: Cyan (`#22D3EE`)
- **Background**: Dark Slate (`#0F172A`)
- **Typography**: Inter font family
- **Components**: Glassmorphic cards with subtle shadows

## 🔮 Future Enhancements

- 📈 Live charts using advanced visualizations
- ⚡ Switch polling → WebSockets / MQTT
- 🤖 Replace rule-engine with trained ML model
- 🚨 Alert system (SMS/Email/Web notifications)
- 🗺 GIS map visualization of zones
- 📡 Hardware integration (ESP32, LoRaWAN, Raspberry Pi)

## 📝 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/iot` | POST | Ingest sensor data and run predictions |
| `/api/prediction` | GET | Fetch latest predictions and history |
| `/api/settings` | GET/POST | Manage city configuration |
| `/api/seed` | GET | Initialize database with default config |

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

MIT License - feel free to use this project for learning, hackathons, or research.

## 🙏 Acknowledgments

Built with ❤️ using Next.js, MongoDB Atlas, and Tailwind CSS.

---

**Made for smart city research, IoT demonstrations, and AI-based policy simulation.**
