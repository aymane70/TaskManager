# Task Manager

Full-stack task manager with a React frontend and a Spring Boot API.

## Project layout

- `taskmanager/`: React app (Create React App, proxy to `http://localhost:8080`).
- `demo/`: Spring Boot API (Java 17, JWT auth, H2 by default).
- `demo/docker-compose.yaml`: optional PostgreSQL for production-like runs.

## Prerequisites

- Node.js 18+
- Java 17

## Quick start (dev)

1) Start the API:

```bash
cd demo
./mvnw spring-boot:run
```

2) Start the frontend:

```bash
cd taskmanager
npm install
npm start
```

Frontend: `http://localhost:3000`  
API: `http://localhost:8080`

## Database

By default the API uses an in-memory H2 database. The H2 console is available at:

`http://localhost:8080/h2-console`

To use PostgreSQL:

1) Start Postgres:

```bash
cd demo
docker compose -f docker-compose.yaml up -d
```

2) Update `demo/src/main/resources/application.properties` to enable the
PostgreSQL settings (currently commented out) and set the connection details.

## Build

Frontend:

```bash
cd taskmanager
npm run build
```

Backend:

```bash
cd demo
./mvnw -DskipTests package
```

## Docker (optional)

Build images:

```bash
docker build -t taskmanager-frontend ./taskmanager
docker build -t taskmanager-api ./demo
```
