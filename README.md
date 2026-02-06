# Book Stack

A full-stack Q&A platform where developers can ask questions about books and provide reviews. Built as a capstone project demonstrating a complete client-server architecture with a modern tech stack.

---

## Features

| Status | Feature                                        |
| :----: | ---------------------------------------------- |
|   ✅   | User authentication (register/login with JWT)  |
|   ✅   | Create, read, update, delete books             |
|   ✅   | Pagination for book listings                   |
|   ✅   | Protected routes and ownership validation      |
|   🚧   | Create, read, update, delete reviews           |

---

## Tech Stack

### Backend

| Technology   | Version | Purpose                     |
| ------------ | ------- | --------------------------- |
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

| Technology       | Version | Purpose                    |
| ---------------- | ------- | -------------------------- |
| React            | 18.3.1  | UI library                 |
| Vite             | 5.4.21  | Build tool and dev server  |
| TypeScript       | 5.9.3   | Type-safe JavaScript       |
| React Router DOM | 6.30.3  | Client-side routing        |
| Axios            | 1.13.4  | HTTP client                |
| Tailwind CSS     | 3.4.19  | Utility-first CSS          |
| shadcn/ui        | —       | UI component library       |

---

## Project Structure

```
Book_Stack/
├── README.md
│
├── client/                        # Frontend — React + Vite
│   ├── src/
│   │   ├── components/            # Reusable UI components
│   │   │   ├── AnswerCard.tsx
│   │   │   ├── AnswerForm.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── QuestionCard.tsx
│   │   ├── context/               # React Context providers
│   │   │   └── AuthContext.tsx
│   │   ├── pages/                 # Page components
│   │   │   ├── AskQuestion.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── QuestionDetail.tsx
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
├── server/                        # Backend — Express + Sequelize
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── middleware/
│   │   │   └── auth.ts            # JWT authentication
│   │   ├── models/
│   │   │   ├── Index.ts           # Model exports & associations
│   │   │   ├── Book.ts
│   │   │   ├── Review.ts
│   │   │   └── User.ts
│   │   ├── routes/
│   │   │   ├── auth.ts        # /api/auth/*
│   │   │   ├── book.ts        # /api/books/*
│   │   │   ├── review.ts      # /api/books/:id/review, /api/review/*
│   │   │   └── users.ts       # /api/users/*
│   │   ├── tests/
│   │   │   ├── auth.test.ts
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

## API Endpoints

All endpoints are prefixed with `/api`.

### Authentication

| Method | Endpoint         | Description         |
| :----- | :--------------- | :------------------ |
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login`    | Log in a user       |
| `GET`  | `/auth/profile`  | Get current user    |

### Books

| Method   | Endpoint     | Description   |
| :------- | :----------- | :------------ |
| `GET`    | `/books`     | Get all books |
| `GET`    | `/books/:id` | Get a book    |

### Reviews

| Method   | Endpoint                    | Description     |
| :------- | :-------------------------- | :-------------- |
| `POST`   | `/books/:questionId/review` | Create a review |
| `PUT`    | `/review/:id`               | Update a review |
| `DELETE` | `/review/:id`               | Delete a review |

### Users

| Method | Endpoint     | Description        |
| :----- | :----------- | :----------------- |
| `GET`  | `/users`     | Get all users      |
| `GET`  | `/users/:id` | Get a user by ID   |

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Book_Stack.git
cd Book_Stack
```

### 2. Set Up the Database

```sql
-- Connect to PostgreSQL
psql -U postgres

-- Create the development and test databases
CREATE DATABASE devqa;
CREATE DATABASE seedtest;
```

### 3. Configure & Start the Backend

```bash
cd server
npm install
cp .env.example .env    # then update with your PostgreSQL credentials and JWT secret
npm run dev
```

### 4. Configure & Start the Frontend

```bash
cd ../client
npm install
npm run dev
```

The app will be available at **http://localhost:5173**.

---

## Running Tests

Tests use **Vitest + Supertest** and mock the Sequelize models — no live database required.

```bash
cd server
npm test
```

---

## Contributing

Contributions are welcome. Fork the repository, create a feature branch, and open a pull request.

## License

Capstone project for a coding bootcamp. Not licensed for distribution or commercial use.

## Acknowledgments

- Inspired by [Codex_Collective](https://github.com/PamHornedo/Codex_Collective)
- Built as part of the Client-Server Essentials Capstone
