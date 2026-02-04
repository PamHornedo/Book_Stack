# DevQ&A Server

Backend API for the DevQ&A platform. This is where YOU will build the server!

## Your Mission

Build a complete backend API with:
- ✅ User authentication with JWT
- ✅ Password hashing with bcrypt
- ✅ Questions and answers CRUD
- ✅ Voting system with business logic
- ✅ PostgreSQL database with Sequelize

## Getting Started

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your database credentials

# Create database
createdb devqa

# Run development server
npm run dev
```

Server will run on http://localhost:4000

## Your Tasks

Follow the main README.md for the 3-day implementation plan:

### Day 1: Authentication & Users
- [ ] Set up Express server
- [ ] Configure database connection
- [ ] Create User model with hooks
- [ ] Build auth routes (register/login)
- [ ] Create JWT middleware

### Day 2: Questions & Answers  
- [ ] Create Question model
- [ ] Create Answer model
- [ ] Set up model associations
- [ ] Build question routes
- [ ] Build answer routes

### Day 3: Voting & Polish
- [ ] Create Vote model with constraints
- [ ] Build voting routes with logic
- [ ] Test all functionality
- [ ] Polish and deploy

## Project Structure

```
server/
├── src/
│   ├── config/
│   │   └── database.ts         ✅ COMPLETE (no edits needed)
│   ├── models/
│   │   ├── User.ts            📝 TODO - Day 1
│   │   ├── Question.ts        📝 TODO - Day 2
│   │   ├── Answer.ts          📝 TODO - Day 2
│   │   └── Vote.ts            📝 TODO - Day 3
│   ├── middleware/
│   │   └── auth.ts            📝 TODO - Day 1
│   ├── routes/
│   │   ├── auth.ts            📝 TODO - Day 1
│   │   ├── questions.ts       📝 TODO - Day 2
│   │   ├── answers.ts         📝 TODO - Day 2
│   │   └── votes.ts           📝 TODO - Day 3
│   └── index.ts               📝 TODO - Day 1
├── package.json
├── tsconfig.json
└── .env.example
```

## API Endpoints (You'll Build These!)

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user (protected)

### Questions
- `GET /api/questions` - Get all questions
- `GET /api/questions/:id` - Get single question
- `POST /api/questions` - Create question (protected)
- `PUT /api/questions/:id` - Update question (protected, owner only)
- `DELETE /api/questions/:id` - Delete question (protected, owner only)

### Answers
- `POST /api/questions/:questionId/answers` - Create answer (protected)
- `PUT /api/answers/:id` - Update answer (protected, owner only)
- `DELETE /api/answers/:id` - Delete answer (protected, owner only)

### Votes
- `POST /api/answers/:answerId/vote` - Cast/update vote (protected)
- `DELETE /api/answers/:answerId/vote` - Remove vote (protected)

## Tips

- Follow the patterns from previous labs (encryption, hooks, JWT)
- The frontend is complete - match its API calls exactly
- Test with Postman as you build
- Don't skip the model associations!
- Remember: votes have a unique constraint per user/answer

Good luck! 🚀
