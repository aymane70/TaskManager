# Task Manager

Application de gestion de tâches **full-stack** — API REST Spring Boot + frontend React avec authentification JWT.

---

## Structure du projet

```
TaskManager/
├── demo/                        # Backend – API REST (Spring Boot)
│   ├── src/
│   │   └── main/
│   │       ├── java/            # Controllers, Services, Repositories, Sécurité JWT
│   │       └── resources/
│   │           └── application.properties   # Config BDD, JWT, CORS
│   ├── docker-compose.yaml      # PostgreSQL via Docker
│   ├── mvnw / mvnw.cmd          # Maven Wrapper (Linux / Windows)
│   └── pom.xml                  # Dépendances Maven
│
├── taskmanager/                 # Frontend – Application React
│   ├── src/
│   │   ├── components/          # Composants (login, dashboard, tâches…)
│   │   ├── services/            # Appels API via Axios
│   │   └── App.js               # Routing principal (React Router)
│   ├── public/
│   └── package.json             # Dépendances npm
│
├── .gitignore
└── README.md
```

| Dossier          | Rôle                                                                 |
|------------------|----------------------------------------------------------------------|
| `demo/`          | Backend Spring Boot — expose l'API sur `http://localhost:8080`       |
| `taskmanager/`   | Frontend React (CRA) — interface utilisateur sur `http://localhost:3000` |

---

## Prérequis

- **Java JDK 17+**
- **Node.js 18+** (avec npm)
- **Git**

---

## Démarrage rapide

### 1. Backend

```bash
cd demo
./mvnw spring-boot:run -DskipTests   # Linux / macOS
# ou
mvnw.cmd spring-boot:run -DskipTests # Windows
```

> L'API démarre sur **http://localhost:8080**  
> Base de données **H2 en mémoire** utilisée par défaut — aucune configuration nécessaire.  
> Console H2 disponible sur http://localhost:8080/h2-console

### 2. Frontend

```bash
cd taskmanager
npm install
npm start
```

> L'application démarre sur **http://localhost:3000**

---

## Base de données PostgreSQL 

Pour remplacer H2 par PostgreSQL en local :

```bash
cd demo
docker compose -f docker-compose.yaml up -d
```

Puis activer les paramètres PostgreSQL dans `demo/src/main/resources/application.properties` (lignes commentées par défaut).

---

## Build pour production

```bash
# Frontend
cd taskmanager
npm run build          # → dossier build/

# Backend
cd demo
./mvnw clean package -DskipTests   # → demo/target/*.jar
```

---

## Tech Stack

| Couche     | Technologies                                    |
|------------|-------------------------------------------------|
| Backend    | Java 17, Spring Boot 3.2, Spring Security, JPA, PostgreSQL / H2 |
| Frontend   | React 18, Axios, React Router, CSS3             |
| Sécurité   | JWT (token valable 24h), BCrypt                 |