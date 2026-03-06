# 🌱 Open Source Habit Tracker

A minimal full-stack Habit Tracker built with:

* React (Frontend)
* Node.js + Express (Backend)
* MongoDB (Database)

Perfect starter project for open-source collaboration and feature expansion.

---

## 🚀 Features

* ✨ **Modern UI** - Beautiful gradient design with smooth animations
* 🌙 **Dark Mode** - Toggle between light and dark themes with system preference detection
* 📊 **Statistics Dashboard** - View total habits, completed today, and overall completions
* ✅ **Create & Complete Habits** - Add new habits and mark them complete daily
* 🔥 **Streak Tracking** - Track current streaks for each habit
* 📈 **Progress Visualization** - Visual progress bars towards 30-day goals
* 🎯 **Smart Completion** - "Done Today" badges and streak counters
* � **Completed Habits Section** - Collapsible section for completed habits to improve visibility
* �🗑️ **Habit Management** - Delete habits with confirmation dialog
* � **Data Export** - Export habits to CSV or PDF formats with detailed reports
* �📱 **Responsive Design** - Mobile-friendly interface
* ⚡ **Error Handling** - Input validation and graceful error messages
* 🔌 **REST API Backend** - Full-featured API for habit operations

---

## 🛠️ Tech Stack

Frontend:

* React (JSX)
* Modern CSS3 (Animations & Gradients)
* Axios (HTTP Client)
* Vite (Build tool)

Backend:

* Node.js
* Express.js
* MongoDB
* Mongoose

---

## 📦 Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/blazingvx/habit-tracker.git
cd habit-tracker
```

---

### 2️⃣ Setup Backend

```bash
cd server
npm install
npm run dev
```

Make sure MongoDB is running locally.

---

### 3️⃣ Setup Frontend

```bash
cd client
npm install
npm start
```

---

## 🎨 UI/UX Highlights

* **Gradient Design** - Beautiful purple-to-violet gradient background with glassmorphism effects
* **Dark Mode** - 🌙 Full dark theme support with system preference detection and manual toggle
* **Statistics Dashboard** - At-a-glance metrics for active habits, daily completions, and total progress
* **Habit Cards** - Clean, modern card layout with hover effects and shadow animations
* **Progress Bars** - Visual representation of progress towards 30-day habit goals
* **Streak Counter** - 🔥 Current streak tracking with visual indicators
* **Smart Badges** - "Done Today" status indicators for completed habits
* **Data Export** - 📥 Export all your habits data to CSV or PDF with detailed reports
* **Error Handling** - Input validation with user-friendly error messages
* **Loading States** - Button loading indicators for all API operations
* **Confirmation Dialog** - Prevent accidental deletion with confirmation prompts
* **Smooth Animations** - Fade-in effects, hover states, and transition animations

---

## 📌 API Endpoints

GET /api/habits
POST /api/habits
PUT /api/habits/:id/complete
DELETE /api/habits/:id

---

## 🗺️ Roadmap

* [x] Mobile responsive UI
* [x] Modern UI design with animations
* [x] Daily streak tracking
* [x] Progress visualization
* [x] Dark mode
* [x] Data export (CSV/PDF)
* [ ] User authentication (JWT)
* [x] Calendar heatmap view
* [ ] Docker support
* [x] Deployment guide
* [ ] CI/CD pipeline
* [x] Habit categories & tags

---

## 🤝 Contributing

1. Fork the repo
2. Create a new branch
3. Commit changes
4. Open a Pull Request

Look for issues tagged:

* good first issue
* help wanted

---

## 📄 License

[MIT License](LICENSE.md)

---

Built for learning, collaboration, and growth 🚀
