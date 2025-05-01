# IA-ASSISTANT API 🏦🎯

RESTful API for management and control

## Key Features ✨

- 🔐 JWT Authentication with Passport
- 📈 Complete CRUD for:
  - Users
- 📧 Notification system:
  - Scheduled reminders (Cron Jobs)
  - Progress alerts
- 🛠️ Development tools:
  - Pre-commits with Husky
  - Auto-formatting (Prettier)
  - Linting (ESLint)

## Technologies 🛠️

| Category       | Technologies               |
| -------------- | -------------------------- |
| Backend        | NestJS, Node.js 22.15, Bun |
| Database       | PostgreSQL 17, Drizzle ORM |
| Authentication | Passport-JWT               |
| DevOps         | Docker, Git                |
| Code Quality   | Husky, Prettier, ESLint    |
| Testing        | Postman                    |

## Project Structure 📂

```bash
src/
├── auth/    # JWT Authentication
├── mail/    # Notification system
├── cron/    # Scheduled tasks
├── common/  # Shared utilities
└── prisma/  # DB schema & migrations
```

## Requirements 📋

- Node.js 22.15+
- Bun (optional for development)
- PostgreSQL 17
- Docker (for containerized development)

## Setup ⚙️

1. Clone repository:

```bash
git clone [repo-url]
cd ia-assistant-api
```

2. Install dependencies:

```bash
bun install
```

3. Configure environment variables (create .env file based on the example):

```bash
PORT=3010

DB_PORT=5450
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=ia-assistant-db

DB_URL=postgresql://postgres:postgres@localhost:5450/ia-assistant-db

JWT_SECRET=top_secret

IA_API_KEY=
IA_API_URL=https://openrouter.ai/api/v1/chat/completions
```

4. Start database with Docker:

```bash
docker compose up -d
```

5. Run migrations and initial seed:

```bash
bun db:seed
```

6. Start development server:

```bash
bun dev
```

## Architecture Diagram 🏗️

![Architecture Diagram](./static/architecture.jpeg)
