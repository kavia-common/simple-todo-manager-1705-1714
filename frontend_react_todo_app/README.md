# Ocean Todos – React App

A modern, lightweight todo application using the Ocean Professional theme.

## Features

- 📝 Add, complete, delete, and filter todos  
- 🎨 Stylish, minimal, and responsive UI  
- 💾 Data persists to `localStorage` by default  
- ☁️ Supports backend API mode if configured (optional)  
- 🔒 Accessible & keyboard friendly  
- 🏝 Based on React, no extra UI frameworks

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the app (development mode):

```bash
npm start
```

Visit [http://localhost:3000](http://localhost:3000)  
(Default dev port matches preview environment)

### Optional: Backend API Mode

By default, todos are stored locally in your browser (`localStorage`).  
To use an external backend API, set **one** of the following environment variables before starting the app:

- `REACT_APP_API_BASE`
- `REACT_APP_BACKEND_URL`

The backend must implement:

- `GET /todos` (returns todo array)
- `POST /todos` (`{text}`)
- `PATCH /todos/:id` (`{completed}`)
- `DELETE /todos/:id`

Example of `.env`:

```
REACT_APP_API_BASE=https://my-backend.example.com
```

If these env vars are unset or empty, the app auto-falls back to local mode.

## Seed Data

On first run (local mode), 2–3 sample todos are auto-populated for demonstration.

## Theme

Uses Ocean Professional palette:  
Primary: #2563EB, Secondary: #F59E0B, Error: #EF4444, Background: #f9fafb, Surface: #fff, Text: #111827, Subtle blue-gray gradient.

Find primary styles in:  
- `src/styles/theme.css`  
- `src/components/*` (UI)

## Accessibility

All controls are keyboard and screen reader accessible. Aria labels and proper tab orders included.

## Scripts

- `npm start` – Run dev server (http://localhost:3000)
- `npm test` – Run tests (if present)
- `npm run build` – Production build

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).
