# Sterling Chair Salon Management Platform

Welcome to the Sterling Chair Salon application repository. This platform is a fully-integrated, containerized multi-portal system designed to manage all operations for a premium barbershop.

## 🚀 Quick Start (Running the Application)

The entire application runs through Docker Compose, orchestrating the PostgreSQL database, FastAPI backend, and three independent React frontend portals.

### 1. Start the Containers
```bash
./scripts/launch.sh
# OR manually:
docker compose up -d --build
```
*Note: The first launch will automatically apply the `schema.sql` and `seed.sql` to populate the database.*

### 2. Access the Portals
Once the containers are running, navigate to:
- **Manager Portal**: `http://localhost:80` (or `http://localhost`)
- **Customer Portal**: `http://localhost:81`
- **Barber Portal**: `http://localhost:82`

## 🛠 Debugging & Development

### Rebuilding Frontends
If you make changes to the React code in `apps/`, you need to rebuild the static assets for Nginx to serve them.
```bash
./scripts/build-all.sh
```

### Viewing Backend Logs
If an API request fails, or WebSockets disconnect, check the FastAPI logs:
```bash
docker compose logs -f backend
```

### Resetting the Database
If you need to wipe all data and start fresh (re-applying the seed data):
```bash
docker compose down -v
docker compose up -d
```
*Note: The `-v` flag deletes the named volumes, forcing Postgres to re-run the initialization scripts.*

### Database Interaction
To manually inspect the database tables (like checking appointment status):
```bash
docker compose exec db psql -U salon_user -d salon_db
```
Useful queries:
- `SELECT * FROM appointments;`
- `SELECT * FROM users WHERE role = 'BARBER';`

## 🧩 Known Constraints (Proof of Concept)
- **Authentication**: There is no JWT authentication. The system relies on hardcoded Mock UUIDs (e.g., Langu Maseko as the logged-in barber) to demonstrate the workflows without requiring a complex login flow.
- **WebSocket Reconnection**: The `zustand` store connects to `ws://localhost:8000/ws`. If the backend restarts, you may need to refresh the frontend portals to re-establish the connection.
