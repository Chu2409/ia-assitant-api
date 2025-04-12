## Description

REST API developed by students from the Universidad Técnica de Ambato, integrated with artificial intelligence to provide enhanced support for students in the technology field.

## Technologies

- Nest.js
- TypeScript
- PostgreSQL
- Drizzle
- Docker

## Requisitos

- Node.js 22
- Docker
- Bun

## Installation

1. Install the application dependencies

```bash
$ bun install
```

**Note**: If the `bun` command is not recognized, install it using the following command:

```bash
$ npm install -g bun
```

2. Create a `.env` file in the project root with the necessary environment variables. Below is an example of the required variables:

```bash
# Docker Configuration
POSTGRES_USER="admin"
POSTGRES_PASSWORD="admin"
POSTGRES_DB="sales-force"
DB_PORT="5432"

# API Configuration
PORT="3000"
DATABASE_URL="postgresql://admin:admin@localhost:5432/sales-force?schema=public"
JWT_SECRET="Est3EsMISE3Dsecreto32s"
```

3. Use the following command to start the database in a Docker container:

```bash
$ docker compose up
```

**Note**: Ensure Docker is installed on your system.

4. Run the database migrations and seeds with the following command:

This command will create the necessary tables in the database and populate it with test data.

```bash
$ bun db:seed
```

5. Start the application in different modes:

```bash
# development
$ bun start

# watch mode
$ bun dev

# production mode
$ bun run build
$ bun start:prod
```
