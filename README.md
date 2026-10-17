# 8MOTO BHARAT — Extreme Off-Road Expeditions & Riding Academy

> Official web platform and backend management system for **8Moto Bharat** — organizers of the legendary **Pune Offroad Expedition (POE)**, founded by off-road veteran **Sangram Devekar Patil**.

---

## ⚡ Features

- **Kinetic Hero with Dynamic Video Background**: Switch seamlessly between loopable MP4/WebM trail video and high-resolution action photos directly from the admin panel.
- **Flagship POE Spotlight**: Multi-stage breakdown of the annual Pune Offroad Expedition (Red Mud Gully, Boulder Bed, Fogline Incline).
- **Interactive Trail Matrix**: Filterable expedition matrix graded by technical difficulty (🟢 Level 1 Novice, 🟡 Level 2 Moderate, 🔴 Level 3 Extreme Hard Enduro & 4x4).
- **8Moto Off-Road Academy**: Specialized training modules for adventure motorcycles (Himalayan, KTM 390, BMW GS) and 4x4 overland recovery/winching.
- **Zero-Compromise Safety Fleet**: Dedicated trauma paramedic support, heavy-duty 4x4 recovery sweep vehicles with 12,000lb Warn winches, and VHF radio grid.
- **Backend Admin Control Center**: Password-protected administrative panel (`8moto2026`) for managing:
  - Header & Footer logos and brand text
  - Hero background media (Video URL vs Image)
  - Social media links (Instagram, YouTube, Facebook, WhatsApp)
  - Expeditions CRUD (Add new trail pages, edit stages, elevation, price, or delete)
  - Telemetry stats counters
  - Incoming user inquiries inbox
- **Web Audio API Engine Throttle**: Built-in 4-stroke engine rev synthesizer for interactive tactile engagement.
- **GoDaddy Node.js Hosting Ready**: Express backend (`server.js`) configured for cPanel CloudLinux Phusion Passenger and PM2.

---

## 🛠️ Technology Stack

- **Backend**: Node.js & Express.js (ES Module architecture)
- **Frontend**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 + Vanilla CSS Design Tokens
- **Icons**: Lucide React
- **Audio**: Web Audio API (tactile engine rev synthesis)
- **Database**: Zero-dependency atomic JSON database in `data/database.json`

---

## 🚀 Getting Started Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development
Start the backend server:
```bash
npm run server
```

In another terminal, start the Vite client:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Production Build & Run

```bash
# Build the production React bundle
npm run build

# Start the full-stack server
npm start
```
The server will start on port `5000` (or `process.env.PORT` on GoDaddy).

---

## 🌐 Deploying to GoDaddy Node.js Hosting

Detailed step-by-step instructions for deploying to **GoDaddy cPanel (Setup Node.js App)** or **GoDaddy Linux VPS (PM2 + Nginx)** are available in:
👉 **[`GODADDY_HOSTING_GUIDE.md`](./GODADDY_HOSTING_GUIDE.md)**

---

## 🔐 Admin Panel Access

1. Open the website and click the **ADMIN** lock icon in the top navbar or footer.
2. Enter the default administrator passkey:
   ```
   8moto2026
   ```
3. Update brand logos, video URLs, social links, or add new expeditions with instant live synchronization.

---

## 📄 License & Heritage
© 2012–2026 8MOTO BHARAT / PUNE OFFROAD EXPEDITION. Crafted for off-road riders & 4x4 trail warriors across India.
