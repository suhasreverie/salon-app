# Salon Operations Platform

A production-grade, real-time salon management application designed to handle customer bookings, barber schedules, and live floor operations without latency.

## Architecture Overview
The platform has been meticulously structured as a unified monorepo powered by `pnpm`. It consists of:

### The Real-Time Engine (Backend)
- **FastAPI (Python):** High-performance async API engine.
- **WebSockets:** A custom `ConnectionManager` broadcasts live state changes (like a barber starting a service) instantly to all connected clients.
- **PostgreSQL:** The source of truth. Structured to model the physical constraints of the salon (chairs, staggered break times, many-to-many service assignments).
- **SQLAlchemy & Pydantic:** Robust ORM and data validation.

### The Portals (Frontend)
Built with React, Vite, and TailwindCSS. Connected to the backend via `@tanstack/react-query` and `zustand`.
- **Manager Portal (`apps/manager-portal`):** The administrative command center. Features the "Live Salon View".
- **Customer Portal (`apps/customer-portal`):** The premium booking interface. (To be wired).
- **Barber Portal (`apps/barber-portal`):** The staff-facing tablet interface for managing their daily queue. (To be wired).

### The Infrastructure
- **Docker Compose:** Orchestrates the entire ecosystem.
- **Nginx Reverse Proxy:** Serves the built frontend static files on separate ports and explicitly proxies `/api` and `/ws` traffic (with Upgrade headers) to the FastAPI container.

---

## System Requirements
- Docker and Docker Compose (v2)
- Node.js (v18+)
- `pnpm` (v8+)
- Python 3.11+ (for local, non-Docker development)

---

## 🚀 Quickstart (Production/Docker Mode)
The easiest way to run the entire platform is via Docker. This ensures Nginx, Postgres, and FastAPI all connect seamlessly.

1. **Build the Frontends:**
   Because Nginx serves the static files, we must compile the Vite apps first.
   ```bash
   ./scripts/build-all.sh
   ```

2. **Spin up the Cluster:**
   ```bash
   docker compose up -d --build
   ```
   *Note: Postgres is mapped to host port `5433` to avoid conflicts.*

3. **Access the Portals:**
   - Manager Portal: `http://localhost:80`
   - Customer Portal: `http://localhost:81`
   - Barber Portal: `http://localhost:82`
   - API Docs (Swagger): `http://localhost:80/api/docs` *(Requires routing setup in Nginx if needed, otherwise access via `http://localhost:8000/docs`)*

---

## 💻 Local Development Mode

If you are actively editing React or Python code, you don't want to rebuild Docker containers on every change. 

### Backend Dev
1. cd into `backend/`
2. Activate your virtual environment: `source venv/bin/activate`
3. Run FastAPI with hot-reload: `uvicorn main:app --reload`
*(Note: You will need to spin up just the Postgres DB via docker if running backend locally, or point `DATABASE_URL` to a local DB).*

### Frontend Dev
1. Install dependencies at the root: `pnpm install`
2. Start the Vite dev servers:
   ```bash
   pnpm run dev
   ```
This will boot all three portals in development mode with HMR (Hot Module Replacement) enabled.

---

## 🐛 Troubleshooting

### "502 Bad Gateway" on API calls
This means Nginx is running but the FastAPI container crashed. 
- **Fix:** Run `docker compose logs api` to see the Python traceback. (Common issue: missing a dependency in `backend/requirements.txt`).

### "WebSocket connection failed" (Manager Portal)
If the UI says "WS Status: 🔴 Offline":
- Ensure your ad-blocker isn't blocking `ws://localhost:80/ws`.
- Check Nginx logs: `docker compose logs proxy`. Ensure the `Upgrade` headers are being passed correctly.

### PNPM Install Error: `[ERR_PNPM_IGNORED_BUILDS]`
- This is a security feature in newer versions of pnpm. You can safely ignore it, or run `pnpm approve-builds` to allow post-install scripts (like esbuild) to run.
