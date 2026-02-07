# Book Stack

A full-stack book management and review platform built as a capstone project demonstrating a complete client-server architecture with a modern tech stack.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Option A: Setup from the Root](#option-a-setup-from-the-root)
  - [Option B: Setup from Each Directory](#option-b-setup-from-each-directory)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Running Tests](#running-tests)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## Features

| Status | Feature                                       |
|:------:|-----------------------------------------------|
| Done   | User authentication (register/login with JWT) |
| Done   | Create, read, update, delete books            |
| Done   | Pagination for book listings                  |
| Done   | Protected routes and ownership validation     |
| Done   | Create, read, update, delete reviews          |
| Done   | Star ratings on reviews                       |
| Done   | Glassmorphism UI with Tailwind CSS            |

---

## Tech Stack

### Backend

| Technology   | Version | Purpose                     |
|--------------|---------|-----------------------------|
| Node.js      | 18+     | Runtime environment         |
| Express.js   | 4.22.1  | Web framework               |
| TypeScript   | 5.9.3   | Type-safe JavaScript        |
| PostgreSQL   | 14+     | Relational database         |
| Sequelize    | 6.37.7  | ORM for database operations |
| jsonwebtoken | 9.0.3   | JWT authentication          |
| bcrypt       | 5.1.1   | Password hashing            |
| Vitest       | 2.1.9   | Unit testing framework      |
| Supertest    | 7.2.2   | HTTP assertion testing      |

### Frontend

| Technology       | Version | Purpose                   |
|------------------|---------|---------------------------|
| React            | 18.3.1  | UI library                |
| Vite             | 5.4.21  | Build tool and dev server |
| TypeScript       | 5.9.3   | Type-safe JavaScript      |
| React Router DOM | 6.30.3  | Client-side routing       |
| Axios            | 1.13.4  | HTTP client               |
| Tailwind CSS     | 3.4.19  | Utility-first CSS         |

---

## Project Structure

```
Book_Stack/
├── README.md
│
├── client/                        # Frontend - React + Vite
│   ├── src/
│   │   ├── components/            # Reusable UI components
│   │   │   ├── BookCard.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   ├── ReviewCard.tsx
│   │   │   └── ReviewForm.tsx
│   │   ├── context/               # React Context providers
│   │   │   └── AuthContext.tsx
│   │   ├── pages/                 # Page components
│   │   │   ├── AddBook.tsx
│   │   │   ├── BookDetail.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   │   ├── services/              # API service layer
│   │   │   └── api.ts
│   │   ├── types/                 # TypeScript interfaces
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
│
├── server/                        # Backend - Express + Sequelize
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── middleware/
│   │   │   └── auth.ts            # JWT authentication
│   │   ├── models/
│   │   │   ├── Index.ts           # Model exports and associations
│   │   │   ├── Book.ts
│   │   │   ├── Review.ts
│   │   │   └── User.ts
│   │   ├── routes/
│   │   │   ├── auth.ts            # /api/auth/*
│   │   │   ├── book.ts            # /api/books/*
│   │   │   ├── review.ts         # /api/books/:id/reviews, /api/reviews/*
│   │   │   └── users.ts          # /api/users/*
│   │   ├── tests/
│   │   │   ├── auth.test.ts
│   │   │   ├── book.test.ts
│   │   │   ├── review.test.ts
│   │   │   ├── user.test.ts
│   │   │   └── setup.ts
│   │   ├── app.ts
│   │   ├── index.ts
│   │   └── seed.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── vitest.config.ts
│
└── db_setup/
    └── schemas.sql
```

---

## Prerequisites

- Node.js 18 or higher
- npm 9 or higher
- PostgreSQL 14 or higher

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/PamHornedo/Book_Stack.git
cd Book_Stack
```

### 2. Create the Database

```bash
psql -U postgres -c "CREATE DATABASE bookstack_db;"
```

Choose one of the two setup options below.

---

### Option A: Setup from the Root

All commands are run from the project root (`Book_Stack/`).

**Step 1 -- Install dependencies:**

```bash
npm install --prefix server
```

```bash
npm install --prefix client
```

**Step 2 -- Configure environment variables:**

```bash
Copy-Item server/.env.EXAMPLE server/.env
```

Open `server/.env` and fill in your values. See [Environment Variables](#environment-variables).

**Step 3 -- Seed the database:**

```bash
npm run seed --prefix server
```

**Step 4 -- Start the server:**

```bash
npm run dev --prefix server
```

**Step 5 -- Start the client (in a second terminal):**

```bash
npm run dev --prefix client
```

**Or start both at once:**

```bash
npm run start:dev
```

---

### Option B: Setup from Each Directory

**Step 1 -- Install and start the server:**

```bash
cd server
npm install
cp .env.EXAMPLE .env
```

Open `server/.env` and fill in your values. See [Environment Variables](#environment-variables).

```bash
npm run seed
npm run dev
```

**Step 2 -- Install and start the client (in a second terminal):**

```bash
cd client
npm install
npm run dev
```

---

### Verify

Once both processes are running:

| Service | URL                    |
|---------|------------------------|
| Server  | http://localhost:3001   |
| Client  | http://localhost:3000   |

---

## Environment Variables

Create a `server/.env` file with the following values:

```
DB_NAME=bookstack_db
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=your_secret_key
```

| Variable      | Description                              |
|---------------|------------------------------------------|
| `DB_NAME`     | PostgreSQL database name                 |
| `DB_USER`     | PostgreSQL username                      |
| `DB_PASSWORD` | PostgreSQL password                      |
| `DB_HOST`     | Database host (default: localhost)        |
| `DB_PORT`     | Database port (default: 5432)            |
| `JWT_SECRET`  | Secret key for signing JWT tokens        |

---

## API Endpoints

All endpoints are prefixed with `/api`.

### Authentication

| Method | Endpoint         | Description         | Auth Required |
|--------|------------------|---------------------|:-------------:|
| POST   | `/auth/register` | Register a new user | No            |
| POST   | `/auth/login`    | Log in a user       | No            |
| GET    | `/auth/profile`  | Get current user    | Yes           |

### Books

| Method | Endpoint      | Description                    | Auth Required |
|--------|---------------|--------------------------------|:-------------:|
| GET    | `/books`      | List all books                 | No            |
| GET    | `/books/:id`  | Get a single book with reviews | No            |
| POST   | `/books`      | Create a book                  | Yes           |
| PUT    | `/books/:id`  | Update a book (owner only)     | Yes           |
| DELETE | `/books/:id`  | Delete a book (owner only)     | Yes           |

### Reviews

| Method | Endpoint                 | Description                  | Auth Required |
|--------|--------------------------|------------------------------|:-------------:|
| POST   | `/books/:id/reviews`     | Add a review                 | Yes           |
| PUT    | `/reviews/:id`           | Update a review (owner only) | Yes           |
| DELETE | `/reviews/:id`           | Delete a review (owner only) | Yes           |

### Users

| Method | Endpoint      | Description      | Auth Required |
|--------|---------------|------------------|:-------------:|
| GET    | `/users`      | Get all users    | No            |
| GET    | `/users/:id`  | Get a user by ID | No            |

---

## Running Tests

Tests use Vitest and Supertest with mocked Sequelize models. No live database is required.

**From the root:**

```bash
npm test --prefix server
```

```bash
npm test --prefix client
```

**From each directory:**

```bash
cd server
npm test
```

```bash
cd client
npm test
```

---

## Contributing

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "feat: describe your change"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request against `main`.

---

## License

Capstone project for a coding bootcamp. Not licensed for distribution or commercial use.

---

## Acknowledgments

- Inspired by [Codex_Collective](https://github.com/PamHornedo/Codex_Collective)
- Built as part of the Client-Server Essentials Capstone