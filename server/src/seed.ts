import sequelize from './config/database';
import { User, Question, Answer, Vote } from './models';

async function seed() {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(
    [
      { username: 'Thomas', email: 'thomas@dev.com', password: 'password123' },
      { username: 'Pamela', email: 'pamela@dev.com', password: 'password123' },
      { username: 'Joseph', email: 'joseph@dev.com', password: 'password123' },
    ],
    { individualHooks: true }
  );

  const questions = await Question.bulkCreate([
    {
      title: 'What is a closure in JavaScript?',
      body: 'Can someone explain closures with a simple example?',
      userId: users[0].id,
    },
    {
      title: 'How does async/await work?',
      body: 'Can someone explain async/await and how it relates to promises?',
      userId: users[1].id,
    },
  ]);

  const answers = await Answer.bulkCreate([
    {
      body: 'A closure is when a function retains access to variables from its outer scope.',
      questionId: questions[0].id,
      userId: users[1].id,
    },
    {
      body: 'Async/await is syntactic sugar for working with promises.',
      questionId: questions[1].id,
      userId: users[0].id,
    },
  ]);

  await Vote.bulkCreate([
    { answerId: answers[0].id, userId: users[0].id, type: 'up' },
    { answerId: answers[0].id, userId: users[2].id, type: 'up' },
    { answerId: answers[1].id, userId: users[1].id, type: 'up' },
  ]);

  console.log('✓ Database seeded successfully');
  process.exit(0);
}

seed();