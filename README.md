# 🔗 LinkMetrics — URL Analytics Dashboard

A full-stack URL shortener with a real-time analytics dashboard. Paste a long URL, generate a short link, and instantly track clicks, devices, browsers, and geographic data.

---

## 🚀 Live Demo

- 🌐 Frontend: [url-analytics-dashboard-1.onrender.com](https://url-analytics-dashboard-1.onrender.com)
- ⚙️ Backend: [url-analytics-dashboard.onrender.com](https://url-analytics-dashboard.onrender.com)

---

## ✨ Features

- 🔗 Shorten any URL into a compact 8-character link
- 📊 Track total clicks per short URL
- 🖥️ Device distribution analytics (desktop, mobile, tablet)
- 🌐 Browser distribution analytics (Chrome, Firefox, Safari, Edge, etc.)
- 📅 Timeline chart — clicks grouped by date
- 🌍 IP-based geolocation (country-level) via GeoIP-Lite
- ⚡ Single-page dashboard — no login required
- ☁️ Fully deployed on Render + MongoDB Atlas

---

## 🛠️ Tech Stack

### Frontend

| Package | Purpose |
|---|---|
| React 19 + Vite 8 | UI framework and build tool |
| Tailwind CSS 3 | Utility-first styling |
| Recharts | Donut and area charts |
| Lucide React | Icons |
| Framer Motion | Animations |
| Axios | HTTP client |

### Backend

| Package | Purpose |
|---|---|
| Node.js + Express 5 | HTTP server |
| MongoDB Atlas + Mongoose | Database and ODM |
| NanoID | Short URL code generation (8 chars) |
| UA-Parser-JS | Device and browser detection from User-Agent |
| GeoIP-Lite | IP-based country lookup |
| dotenv | Environment variable management |

---

## 📁 Project Structure

```
URL-Analytics-Dashboard/
├── Url-Shortner/               # ⚙️ Backend (Node + Express)
│   ├── models/
│   │   ├── Url.js              # URL schema (originalUrl, shortCode, clicks)
│   │   └── Analytics.js        # Analytics schema (device, browser, location, timestamp)
│   ├── routes/
│   │   └── urlRoutes.js        # All API routes
│   ├── server.js               # Entry point
│   └── package.json
│
└── frontend/frontend/          # 🎨 Frontend (React + Vite)
    ├── src/
    │   ├── components/
    │   │   ├── UrlForm.jsx      # Main dashboard component
    │   │   ├── DeviceChart.jsx  # Donut chart — device breakdown
    │   │   ├── BrowserChart.jsx # Donut chart — browser breakdown
    │   │   └── TimelineChart.jsx# Area chart — clicks over time
    │   ├── services/
    │   │   └── api.js           # Axios API calls
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── tailwind.config.js
    └── package.json
```

---

## 📡 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/shorten` | Create a new short URL |
| `GET` | `/:code` | Redirect to original URL and log analytics |
| `GET` | `/analytics/:code` | Get click count and original URL |
| `GET` | `/analytics/:code/details` | Get device, browser, and country breakdown |
| `GET` | `/analytics/:code/timeline` | Get clicks grouped by date |

### POST `/shorten`
```json
// Request
{ "originalUrl": "https://example.com/very/long/path" }

// Response
{ "shortUrl": "https://url-analytics-dashboard.onrender.com/abc12345" }
```

### GET `/analytics/:code/details`
```json
{
  "totalClicks": 42,
  "devices": { "desktop": 30, "mobile": 12 },
  "browsers": { "Chrome": 25, "Safari": 10, "Firefox": 7 },
  "locations": { "IN": 20, "US": 15, "Unknown": 7 }
}
```

### GET `/analytics/:code/timeline`
```json
{
  "2026-05-29": 8,
  "2026-05-30": 19,
  "2026-05-31": 15
}
```

---

## 💻 Local Development

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### ⚙️ Backend

```bash
cd Url-Shortner
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
BASE_URL=http://localhost:5000
PORT=5000
```

```bash
node --watch server.js
```

### 🎨 Frontend

```bash
cd frontend/frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

> 💡 The frontend calls the production backend at `https://url-analytics-dashboard.onrender.com` by default. To use a local backend, update `BASE_URL` in `src/services/api.js`.

---

## 🚢 Deployment

| Service | Platform |
|---|---|
| Backend | Render — Web Service |
| Frontend | Render — Static Site |
| Database | MongoDB Atlas |

Required environment variables for the backend on Render:

```
MONGO_URI=<your atlas connection string>
BASE_URL=https://url-analytics-dashboard.onrender.com
PORT=5000
```

---

## ⚙️ How It Works

1. 🔗 User submits a URL — backend generates an 8-character NanoID code and stores it in MongoDB.
2. 📊 When someone visits the short link, the backend:
   - Parses the `User-Agent` header for device and browser info
   - Looks up the visitor IP using GeoIP-Lite for the country
   - Saves an analytics record with timestamp
   - Increments the click counter on the URL document
   - Redirects to the original URL
3. 📈 The dashboard fetches analytics via three API calls and renders metric cards and charts.

---

## 🧠 Key Learnings

- Handling real-world deployment issues (CORS, environment variables, API URLs)
- Debugging production errors (500, 404, database connectivity)
- Integrating frontend and backend in a deployed environment
- Managing cloud database access and security
- Building a full analytics pipeline from data capture to visualization
