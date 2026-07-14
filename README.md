# AI Trip Planner — Elixir

A full-stack AI-powered travel planner that generates personalized day-by-day itineraries using Groq AI (LLaMA 3.3). Built with React + Node.js + MongoDB.

---

## Features

- **AI Trip Generation** — Groq LLaMA 3.3 generates complete itineraries with hotels, places, and schedules
- **Trip Sharing** — Share trips publicly via unique link (no login required to view)
- **PDF Export** — Download your itinerary as a styled PDF
- **Weather Forecast** — 7-day weather forecast for your destination (Open-Meteo API)
- **Trip Editing** — Add notes and update trip details
- **Dark / Light Mode** — System-wide theme toggle
- **Google OAuth** — One-click sign-in with Google
- **Response Caching** — Same trip parameters return instantly from DB

---

## Tech Stack

### Frontend
- React 19 + Vite
- Zustand (global state)
- Tailwind CSS + shadcn/ui
- Framer Motion (animations)
- Mapbox GL Geocoder (location search)
- next-themes (dark mode)

### Backend
- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT Authentication
- Groq SDK (LLaMA 3.3-70b)
- Unsplash API (destination images)
- Open-Meteo API (weather, free/no key)

---

## Project Structure

```
/
├── backend/                  # Node.js + Express API
│   ├── controllers/
│   ├── models/               # Mongoose schemas
│   ├── routes/
│   ├── middleware/
│   └── server.js
└── trip_planner/             # React frontend
    ├── src/
    │   ├── api/              # Axios client
    │   ├── store/            # Zustand stores
    │   ├── components/
    │   ├── create-trip/
    │   ├── view-trip/
    │   ├── my-trip/
    │   └── shared-trip/
    └── vite.config.js
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Google Cloud Console project (OAuth)
- Groq API key (free at console.groq.com)
- Unsplash API key (free at unsplash.com/developers)
- Mapbox token (free at mapbox.com)

### Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env`:
```
PORT=5000
MONGODB_URI=your_mongodb_uri
GOOGLE_CLIENT_ID=your_google_client_id
GROQ_API_KEY=your_groq_api_key
UNSPLASH_ACCESS_KEY=your_unsplash_key
JWT_SECRET=your_jwt_secret
```

```bash
npm start
```

### Frontend Setup

```bash
cd trip_planner
npm install
```

Create `trip_planner/.env`:
```
VITE_GOOGLE_AUTH_CLIENT_ID=your_google_client_id
VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_token
```

```bash
npm run dev
```

App runs at `http://localhost:5173`, backend at `http://localhost:5000`.

---

## API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | /api/auth/google | No | Google OAuth → JWT |
| GET | /api/auth/me | Yes | Get current user |
| POST | /api/trips/generate | Yes | Generate AI trip (SSE stream) |
| GET | /api/trips | Yes | Get user's trips |
| GET | /api/trips/:id | Yes | Get single trip |
| PUT | /api/trips/:id | Yes | Update trip notes |
| DELETE | /api/trips/:id | Yes | Delete trip |
| POST | /api/trips/:id/share | Yes | Generate share link |
| GET | /api/trips/share/:shareId | No | Public trip view |
| GET | /api/weather?location=x | No | 7-day forecast |
| GET | /api/images?q=x | No | Unsplash image proxy |

---

## License

MIT

---

Designed & Developed by **Owais Khan**
