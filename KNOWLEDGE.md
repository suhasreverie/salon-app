# Sterling Chair Knowledge Base

This document serves as the architectural brain of the Sterling Chair Salon application. It explains how the components communicate, the lifecycle of a booking, and the design decisions made to keep the system robust and maintainable.

## 🏗 System Architecture

The application uses a **monorepo-style workspace** using `pnpm`, orchestrating a microservices architecture through Docker.

### 1. The Workspace (`apps/` & `packages/`)
Instead of duplicating configurations, the frontends share a root `node_modules` structure managed by `pnpm-workspace.yaml`.
- `apps/customer-portal`: React + Vite SPA on Port 81.
- `apps/barber-portal`: React + Vite SPA on Port 82.
- `apps/manager-portal`: React + Vite SPA on Port 80.
- `packages/`: Intended for shared UI components or types (currently conceptual/lightly used).

### 2. The Backend (`backend/`)
Built with **FastAPI** (Python 3.9) and **SQLAlchemy**.
- **Routers**: API logic is split by entity (`appointments.py`, `barbers.py`, `services.py`).
- **Real-time Engine**: `websocket_manager.py` holds a global connection pool. When an appointment status changes (e.g., from `WAITING` to `IN_CHAIR`), it broadcasts a JSON payload to all connected clients.
- **Database**: PostgreSQL handles all persistence.

### 3. The Reverse Proxy (`nginx/`)
Nginx acts as the gatekeeper.
- It serves the static built files (`dist/`) for all three portals on specific ports.
- It routes any traffic going to `/api/*` or `/ws` directly to the FastAPI container running on port 8000, eliminating CORS issues and hiding the backend from direct access.

## 🔄 The Booking Lifecycle

Understanding this flow is critical for debugging edge cases.

1. **Selection (Customer Portal)**: The customer selects a service, a barber (Langu Maseko), and a time (`02:30 PM`).
2. **Time Parsing Bug (Fixed)**: Previously, the portal sent `"02:30 PM:00"`. Now, `date-fns` parses it into 24-hour ISO format (`14:30:00`) before sending the POST request to `/api/appointments/`.
3. **Database Entry**: FastAPI inserts the appointment with status `CONFIRMED`.
4. **WebSocket Broadcast**: FastAPI fires `{"type": "NEW_APPOINTMENT", "payload": {"id": "..."}}`.
5. **Manager Reaction**: The Manager Portal's `zustand` store receives the WS message and triggers a React Query invalidation. The UI flashes with the new appointment immediately.
6. **Barber Execution**: The Barber Portal, observing the same queue endpoint, sees the appointment in their Calendar and Queue. They click "Start Service", which fires a PUT to `/api/appointments/{id}/status` with `IN_CHAIR`.
7. **Resolution**: The Barber completes it (`COMPLETED`), or the Manager cancels it (`CANCELLED`). The WS broadcast updates all portals live.

## 🧠 State Management Philosophy

- **Server State (`@tanstack/react-query`)**: All external data (Appointments, Services, Barbers) is fetched and cached by React Query. We do not use Redux/Zustand for this.
- **Client State (`zustand`)**: Used exclusively for ephemeral UI state (e.g., the Booking Flow sequence in the Customer Portal) and managing the active WebSocket connection.

## 🛠 Modifying the Platform

- **Adding a new Barber**: You must insert them into both `users` and `barber_profiles` tables in `backend/seed.sql`. The frontend arrays are dynamically populated from the API, so no frontend code changes are required!
- **Adding a new Status**: Update the Postgres `Enum` in `schema.sql`, the Python `Enum` in `models.py`, and the status color maps in `App.tsx` of the portals.
