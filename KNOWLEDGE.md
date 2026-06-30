# Architecture Knowledge Base

This document serves as the technical blueprint for the Salon Operations Platform. It explains *why* the repository is structured the way it is, and *how* the different environments and pieces of code interact. Use this guide to understand the system well enough to extend it independently.

---

## 1. The Monorepo Map (pnpm workspace)

The frontend codebase is managed as a `pnpm` workspace. This allows us to have multiple independent React applications (portals) that share the same underlying node modules and internal packages (like a shared UI library or Typescript interfaces).

**Directory Structure:**
```text
/salon-app
├── apps/
│   ├── manager-portal/  (Port 80)
│   ├── customer-portal/ (Port 81)
│   └── barber-portal/   (Port 82)
├── packages/
│   ├── ui-core/         (Shared Radix/Tailwind components)
│   └── shared-types/    (Shared Typescript Interfaces)
├── backend/             (Python FastAPI server)
├── scripts/             (Bash utility scripts)
├── pnpm-workspace.yaml  (Defines the monorepo boundary)
├── docker-compose.yml   (Global orchestration)
└── nginx.conf           (Global reverse proxy routing)
```
**Why do it this way?**
If you kept the 3 portals completely separate, you would have to copy-paste the `Button` component, the `Appointment` type interface, and the Tailwind config three times. The workspace links them together seamlessly.

---

## 2. The Data Layer (PostgreSQL & SQLAlchemy)

The database schema is strictly relational. It is defined in `backend/schema.sql`.

- **Users:** Base table for all people (Managers, Barbers, Customers).
- **Services:** E.g., Haircut, Beard Trim. Includes duration and price.
- **Barber_Services (Junction Table):** Not every barber can do every service. This maps who can do what.
- **Appointments:** The core entity. 
  - Uses a custom Postgres `ENUM ('Scheduled', 'Arrived', 'In_Chair', 'Completed', 'Cancelled', 'Delayed')`.
  - This granular state allows the Manager dashboard to know exactly what is happening on the floor in real-time.

The Python backend uses **SQLAlchemy** (`backend/models.py`) to interact with these tables.

---

## 3. The Real-Time Engine (FastAPI & Zustand)

The magic of this application is that when a barber taps "Start Service" on their iPad, the Manager's dashboard updates instantly without refreshing.

**How it works (Backend):**
1. FastAPI (`backend/main.py`) runs a WebSocket endpoint at `/ws`.
2. The `ConnectionManager` (`backend/websocket_manager.py`) keeps a list of all active client connections.
3. When an appointment status changes via a normal REST POST request, the API triggers `manager.broadcast(json_payload)`.

**How it works (Frontend):**
1. The React app uses a global state manager called **Zustand** (`apps/manager-portal/src/store/liveStore.ts`).
2. When the React app boots, `useLiveStore` connects to `ws://localhost:80/ws`.
3. When it receives a message from the server, it instantly updates its internal state or triggers **React Query** to refetch the latest data from the REST API.

---

## 4. The Infrastructure (Docker & Nginx)

In a production environment, you cannot run 3 different `npm run dev` servers and a Python terminal. We use Docker to containerize everything.

**The Nginx Proxy (`nginx.conf`):**
Nginx is the "Traffic Cop". 
- It listens on Ports 80, 81, and 82. 
- If a user requests `http://localhost:80/`, Nginx serves the static HTML/JS files from the Manager Portal's `dist/` folder.
- If a user requests `http://localhost:80/api/appointments`, Nginx intercepts it and **proxies** (forwards) the request to the hidden FastAPI container running on internal port 8000.
- If a user attempts to open a WebSocket at `http://localhost:80/ws`, Nginx explicitly allows the HTTP request to "Upgrade" to a persistent WebSocket connection.

---

## 5. Adding a New Feature (Workflow Guide)

If you want to add a new feature (e.g., "Add a tip to an appointment"):

1. **Database:** Does this require a new column? If so, modify `backend/schema.sql` and `backend/models.py` (add `tip_amount = Column(Integer)`).
2. **Backend API:** Create a new REST endpoint in `backend/routers/appointments.py`. (e.g., `@router.post("/{appt_id}/tip")`).
3. **Backend WebSocket (Optional):** If the manager needs to see the tip instantly, add a `await manager.broadcast({"type": "TIP_ADDED"})` inside your new endpoint.
4. **Frontend API Client:** Add a new function in `apps/manager-portal/src/api/client.ts` to call your endpoint.
5. **Frontend React:** Use `useMutation` from React Query in your component to trigger the API call, and update the UI!
