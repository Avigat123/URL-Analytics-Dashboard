# 🔗 URL Analytics Dashboard

A full-stack web application that shortens URLs and provides detailed analytics such as total clicks, device distribution, browser usage, and timeline insights.

---

## 🚀 Live Demo

* 🌐 Frontend: https://url-analytics-dashboard-1.onrender.com
* ⚙️ Backend: https://url-analytics-dashboard.onrender.com

---

## ✨ Features

* 🔗 Shorten long URLs into compact links
* 📊 Track total clicks for each short URL
* 🖥 Device analytics (desktop, mobile, etc.)
* 🌐 Browser analytics
* 📅 Timeline-based click tracking
* 🌍 Basic location tracking using IP
* ⚡ Responsive UI with modern design
* ☁️ Fully deployed (Frontend + Backend + Database)

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios
* Framer Motion

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose

### Other Tools

* NanoID (short URL generation)
* GeoIP-lite (location tracking)
* UA-Parser (device/browser detection)
* Render (deployment)

---

## 📁 Project Structure

```
URL-Analytics-Dashboard/
│
├── client/                     # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/         # UI components (charts, forms)
│   │   ├── services/           # API calls (Axios)
│   │   ├── pages/              # Page-level logic
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   └── package.json
│
├── server/                     # Backend (Node + Express)
│   ├── models/                 # Mongoose schemas
│   ├── routes/                 # API routes
│   ├── config/                 # DB + environment config
│   ├── server.js               # Entry point
│   └── package.json
│
├── .gitignore
├── README.md
└── package.json (optional root config)
```

---

## 🚀 Deployment

* Backend deployed on **Render (Web Service)**
* Frontend deployed on **Render (Static Site)**
* Database hosted on **MongoDB Atlas**

---

## 🧠 Key Learnings

* Handling real-world deployment issues (CORS, environment variables, API URLs)
* Debugging production errors (500, 404, database connectivity)
* Integrating frontend and backend in production
* Managing cloud database access and security

---

## 📌 Future Improvements

* 🔐 User authentication (login/signup)
* 📂 Save and manage user links
* 📈 Advanced analytics dashboard
* 🌍 More accurate geolocation (using external APIs)
* 📋 Copy-to-clipboard functionality
