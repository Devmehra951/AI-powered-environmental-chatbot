# Chat Bot for Prakriti

Production-ready full-stack AI-powered environmental chatbot.

## Project Structure

```
.
├── client/                 # React frontend (Vite)
├── server/                 # Express API + MongoDB
└── README.md
```

## Features

- AI environmental chatbot with OpenAI GPT integration
- Topic filter (Climate, Wildlife, Pollution, Sustainability)
- Chat history persistence in MongoDB
- Feedback capture (👍/👎)
- Dark/light theme toggle
- Optional admin auth + topic CRUD (JWT protected)
- Input validation + sanitization + robust API error handling
- Basic unit/integration tests (Jest + Supertest)

## Prerequisites

- Node.js 20+
- MongoDB (local or Atlas)
- OpenAI API key

## Environment Variables

Create `server/.env` from `server/.env.example`.

## Install & Run

### 1) Backend

```bash
cd server
npm install
npm run dev
```

Runs on `http://localhost:5000`.

### 2) Frontend

```bash
cd client
npm install
npm run dev
```

Runs on `http://localhost:5173`.

## API Endpoints

### Public
- `POST /api/chat` → send user prompt and receive AI response
- `GET /api/history` → fetch conversation history (supports `?topic=` and `?limit=`)
- `POST /api/feedback` → store feedback for a message (`up` or `down`)

### Admin (JWT)
- `POST /api/admin/login`
- `GET /api/topics`
- `POST /api/topics` (admin)
- `PUT /api/topics/:id` (admin)
- `DELETE /api/topics/:id` (admin)

## Deployment

### Frontend (Netlify / Vercel)
- Build command: `npm run build`
- Publish directory: `client/dist`
- Set env var: `VITE_API_BASE_URL=https://<your-backend-domain>`

### Backend (Render)
- Root directory: `server`
- Build command: `npm install`
- Start command: `npm start`
- Add env vars from `.env.example`
- Ensure MongoDB URI points to managed database (Atlas)

## Seeding Sample Topics

```bash
cd server
npm run seed
```

