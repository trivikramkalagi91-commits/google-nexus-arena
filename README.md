# 🏟️ Google Nexus Arena | IPL 2026 Intelligence Hub

An AI-powered, production-grade Smart Stadium companion designed to transform the attendee experience through real-time intelligence, dynamic personalization, and immersive digital twins.

## 🚀 Vision
Built as part of the **Google Antigravity Engineering Challenge**, Nexus Arena solves the "Last Mile" problem of stadium logistics. It moves beyond static schedules to provide a living, breathing digital layer for any venue in the IPL 2026 roster.

## ✨ Key Features

### 👤 1. Full-Cycle Personalization
- **Dynamic Onboarding**: Replaces hardcoded entries with a multi-step identity flow (Fan/Staff).
- **Ticket Intelligence**: Persists name, gate, and seat data to customize every recommendation.

### 🗺️ 2. Dynamic Stadium Geometry Engine
- **Venue Agnostic**: Automatically renders circular, oval, or rectangular stadium layouts based on the match calendar.
- **Digital Twin**: Interactive SVG maps with live sector-level crowd density heatmaps.

### 🧭 3. Turn-by-Turn Smart Navigation
- **Personalized Steps**: Guidance explicitly references the user's entry gate and seat.
- **AI Concierge**: Proactive voice and text advice for bottlenecks and amenity wait times.

### 🚄 4. Service Interaction
- **Nexus Pay Simulation**: Pre-order food from the "Wait-Time Ledger" to skip at-seat queues.
- **Crowdsourced Intelligence**: Users can report local bottlenecks to improve the global heatmap.

### 📱 5. Production Ready
- **PWA Support**: Installable as a standalone app on mobile devices.
- **Containerized**: Cloud-ready Docker configuration for Google Cloud Run deployment.

## 🛠️ Tech Stack
- **Frontend**: React 18 + Vite (Ultralight & Performant)
- **Styling**: Material Design 3 (Vanilla CSS)
- **Animation**: Framer Motion (Fluid UI transitions)
- **Icons**: Lucide React
- **Deployment**: Docker + Nginx (Cloud Run optimized)

## 📦 Deployment
This project is optimized for both **Google Cloud Run** and **GitHub Pages**.

### 🌐 Live Demo
You can view the live technical demo here:  
**[google-nexus-arena Live](https://trivikramkalagi91-commits.github.io/google-nexus-arena/)**

### 🐳 Google Cloud Run (Production)
1. Ensure `gcloud` CLI is installed.
2. Run the following command in the root directory:
   ```bash
   gcloud run deploy google-nexus-arena --source .
   ```

## 🤝 Acknowledgments
Developed with **Google Antigravity**, pushing the boundaries of autonomous coding and agentic design.
