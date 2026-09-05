# Project2 — APIDev Catalog API

CRUD API for cataloging developer APIs (CSE 341 Project 2).

## Collection: `apidev`

Each document has these fields:
- `apiName`
- `developer`
- `category`
- `baseUrl`
- `authType`
- `status`
- `rateLimit`
- `description`

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in your real MongoDB connection string:
   ```
   MONGODB_URI=your_real_connection_string
   PORT=3002
   ```
   **Never commit `.env`** — it's already in `.gitignore`.

3. Generate Swagger docs (run this any time routes change):
   ```
   node swagger.js
   ```

4. Start the server:
   ```
   npm start
   ```
   or for auto-restart on changes:
   ```
   npm run dev
   ```

5. Visit:
   - `http://localhost:3002/` — health check
   - `http://localhost:3002/api-docs` — Swagger documentation
   - `http://localhost:3002/apidev` — GET all entries

## Routes

| Method | Route             | Description                  |
|--------|--------------------|-------------------------------|
| GET    | /apidev            | Get all API entries          |
| GET    | /apidev/:id        | Get a single API entry       |
| POST   | /apidev            | Create a new API entry       |
| PUT    | /apidev/:id        | Update an existing API entry |
| DELETE | /apidev/:id        | Delete an API entry          |

All routes include validation (all 8 fields required, must be non-empty strings) and error handling (400 for bad input, 404 for not found, 500 for server errors).

## Deployment (Render)

1. Push this repo to GitHub (`.env` will NOT be included — verify it's not staged).
2. Create a new Web Service on Render, connect your GitHub repo.
3. Under Render → Environment, add:
   - `MONGODB_URI` = your real connection string
   - `PORT` = 3002 (or leave blank, Render sets its own)
4. Before generating final Swagger docs, update `swagger.js`'s production host to match your actual Render URL, then re-run `node swagger.js` and redeploy.
