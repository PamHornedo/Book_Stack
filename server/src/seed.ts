import sequelize from "./config/database";
import { User, Question, Answer, Vote } from "./models/index";

async function seed() {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(
    [
      { username: "Thomas", email: "thomas@dev.com", password: "password123" },
      { username: "Pamela", email: "pamela@dev.com", password: "password123" },
      { username: "Joseph", email: "joseph@dev.com", password: "password123" },
    ],
    { individualHooks: true },
  );

  const questions = await Question.bulkCreate([
    {
      title: "Braiding Sweetgrass",
      body: "Indigenous Wisdom, Scientific Knowledge, and the Teachings of Plants is a non-fiction book by botanist and Citizen Potawatomi Nation member Robin Wall Kimmerer.",
      userId: users[0].id,
    },
    {
      title: "How does async/await work?",
      body: "Can someone explain async/await and how it relates to promises?",
      userId: users[1].id,
    },
    {
      title: "The Overstory",
      body: "A novel by Richard Powers that weaves together multiple stories of people whose lives are transformed by trees and the natural world.",
      userId: users[0].id,
    },
    {
      title: "Understanding React Hooks",
      body: "What are the best practices for using useState and useEffect? I keep running into infinite loops.",
      userId: users[1].id,
    },
    {
      title: "Sand Talk",
      body: "How Indigenous Thinking Can Save the World by Tyson Yunkaporta explores Indigenous knowledge systems and their application to contemporary global challenges.",
      userId: users[0].id,
    },
  ]);

  // Create answers
  const reviews = await Review.bulkCreate([
    {
      body: "Good book! Highly recommend it for anyone interested in nature and indigenous perspectives.",
      bookId: book[0].id,
      userId: users[1].id,
    },
    {
      body: "I found this book very insightful and thought-provoking.",
      bookId: book[1].id,
      userId: users[2].id,
    },
    {
      body: "The Overstory is a masterpiece of storytelling.",
      bookId: book[2].id,
      userId: users[0].id,
    },
    {
      body: "React Hooks are a powerful way to manage state in functional components.",
      bookId: book[3].id,
      userId: users[1].id,
    },
    {
      body: "Sand Talk offers a fresh perspective on Indigenous knowledge systems.",
      bookId: book[4].id,
      userId: users[2].id,
    },
  ]);

  console.log("✓ Database seeded successfully");
  process.exit(0);
}

seed();
