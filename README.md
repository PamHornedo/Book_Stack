# Book Stack: Developer Q&A Platform

Book Stack is a full-stack Q&A platform where developers can ask questions about books, provide reviews, and vote on the most helpful answers. This project serves as a capstone, demonstrating a complete client-server architecture with a modern tech stack.

## Features

The platform includes a range of features designed to provide a complete Q&A experience, from user authentication to content management.

| Status | Feature                                      |
| :----: | -------------------------------------------- |
|   ✅   | User authentication (register/login with JWT)  |
|   ✅   | Create, read, update, delete books (questions) |
|   ✅   | Pagination for book listings                 |
|   ✅   | Protected routes and ownership validation      |
|   🚧   | Create, read, update, delete reviews (answers) |
|   🚧   | Upvote/downvote system                       |
|   

## Tech Stack

The project is built with a modern, robust technology stack for both the frontend and backend.

### Backend

| Technology       | Version   | Purpose                          |
| ---------------- | --------- | -------------------------------- |
| Node.js          | 18+       | Runtime environment              |
| Express.js       | 4.22.1    | Web framework                    |
| TypeScript       | 5.9.3     | Type-safe JavaScript             |
| PostgreSQL       | 14+       | Relational database              |
| Sequelize        | 6.37.7    | ORM for database operations      |
| jsonwebtoken     | 9.0.3     | JWT authentication               |
| bcrypt           | 5.1.1     | Password hashing                 |
| Vitest           | 2.1.9     | Unit testing framework           |
| Supertest        | 7.2.2     | HTTP assertion testing           |

### Frontend

| Technology       | Version   | Purpose                          |
| ---------------- | --------- | -------------------------------- |
| React            | 18.3.1    | UI library                       |
| Vite             | 5.4.21    | Build tool and dev server        |
| TypeScript       | 5.9.3     | Type-safe JavaScript             |
| React Router DOM | 6.30.3    | Client-side routing              |
| Axios            | 1.13.4    | HTTP client                      |
| Tailwind CSS     | 3.4.19    | Utility-first CSS framework      |
| shadcn/ui        | -         | UI component library             |

## Project Structure

The repository is organized into a standard monorepo structure with separate directories for the `client` and `server` applications.

```
book-stack/
├── .gitignore
├── README.md
│
├── client/                          # Frontend React Application
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── AnswerCard.tsx
│   │   │   ├── AnswerForm.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── QuestionCard.tsx
│   │   ├── context/                 # React Context providers
│   │   │   └── AuthContext.tsx
│   │   ├── pages/                   # Page components
│   │   │   ├── HomePage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── NewQuestionPage.tsx
│   │   │   ├── QuestionDetailPage.tsx
│   │   │   ├── QuestionsPage.tsx
│   │   │   └── RegisterPage.tsx
│   │   ├── services/                # API service layer
│   │   │   ├── api.ts
│   │   │   ├── answers.ts
│   │   │   ├── auth.ts
│   │   │   ├── questions.ts
│   │   │   └── votes.ts
│   │   ├── types/                   # TypeScript interfaces
│   │   │   └── index.ts
│   │   ├── App.tsx                  # Main app with routing
│   │   ├── index.css                # Global styles
│   │   └── main.tsx                 # Entry point
│   ├── .env.example
│   ├── index.html                   # HTML template
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
│
└── server/                          # Backend Express Application
    ├── src/
    │   ├── config/                  # Database configuration
    │   │   └── database.ts
    │   ├── middleware/              # Express middleware
    │   │   └── auth.ts              # JWT authentication
    │   ├── models/                  # Sequelize models
    │   │   ├── index.ts             # Model exports & associations
    │   │   ├── Answer.ts
    │   │   ├── Question.ts
    │   │   ├── User.ts
    │   │   └── Vote.ts
    │   ├── routes/                  # API routes
    │   │   ├── answers.ts
    │   │   ├── auth.ts
    │   │   ├── questions.ts
    │   │   └── votes.ts
    │   └── index.ts                 # Express server entry point
    ├── src/tests/                   # Backend tests
    │   └── auth.test.ts
    ├── .env.example
    ├── package.json
    └── tsconfig.json
```

## API Endpoints

The backend exposes a RESTful API for all application functionalities. All endpoints are prefixed with `/api`.

### Authentication

| Method | Endpoint             | Description          |
| :----- | :------------------- | :------------------- |
| `POST` | `/auth/register`     | Register a new user  |
| `POST` | `/auth/login`        | Log in a user        |
| `GET`  | `/auth/profile`      | Get current user     |

### Questions

| Method   | Endpoint             | Description          |
| :------- | :------------------- | :------------------- |
| `GET`    | `/questions`         | Get all questions    |
| `GET`    | `/questions/:id`     | Get a single question|
| `POST`   | `/questions`         | Create a question    |
| `PUT`    | `/questions/:id`     | Update a question    |
| `DELETE` | `/questions/:id`     | Delete a question    |

### Answers & Votes

| Method   | Endpoint                           | Description        |
| :------- | :--------------------------------- | :----------------- |
| `POST`   | `/questions/:questionId/answers`   | Create an answer   |
| `PUT`    | `/answers/:id`                     | Update an answer   |
| `DELETE` | `/answers/:id`                     | Delete an answer   |
| `POST`   | `/answers/:answerId/vote`          | Cast or update a vote |
| `DELETE` | `/answers/:answerId/vote`          | Remove a vote      |

## Getting Started

To get the project running locally, follow these steps.

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- `npm` or `yarn`

### Installation and Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/Book_Stack.git
    cd Book_Stack
    ```

2.  **Set up the database:**

    ```sql
    -- Connect to PostgreSQL
    psql -U postgres

    -- Create the development and test databases
    CREATE DATABASE devqa;
    CREATE DATABASE seedtest;
    ```

3.  **Configure the backend:**

    ```bash
    # Navigate to the server directory and install dependencies
    cd server
    npm install

    # Create the environment file
    cp .env.example .env
    ```

    Then, update the `server/.env` file with your PostgreSQL credentials and a secure JWT secret.

4.  **Configure the frontend:**

    ```bash
    # Navigate to the client directory and install dependencies
    cd ../client
    npm install
    ```

### Running the Application

You can run the backend and frontend servers in two separate terminals.

-   **Backend Server:**

    ```bash
    # From the /server directory
    npm run dev
    ```

-   **Frontend Server:**

    ```bash
    # From the /client directory
    npm run dev
    ```

Once running, the application will be accessible at `http://localhost:5173`.

## Running Tests

Backend tests use Vitest + Supertest and mock the Sequelize models, so they do not require a live database connection. If you want a dedicated test DB for future integration tests, create `seedtest` as shown above.

From the `server` directory:

```bash
npm test
```

## Contributing

Contributions are welcome. Please fork the repository, create a feature branch, and open a pull request with your changes.

## License

This is a capstone project for a coding bootcamp and is not licensed for distribution or commercial use.

## Acknowledgments

-   Inspired by the [Codex_Collective](https://github.com/PamHornedo/Codex_Collective) project.
-   Built as part of the Client-Server Essentials Capstone.
