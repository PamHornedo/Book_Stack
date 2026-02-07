import sequelize from "./config/database";
import { User, Book, Review } from "./models/Index";

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

  const books = await Book.bulkCreate([
    {
      title: "Braiding Sweetgrass",
      author: "Robin Wall Kimmerer",
      description:
        "A blend of Indigenous wisdom and scientific knowledge about plants and ecology.",
      userId: users[0].id,
    },
    {
      title: "The Overstory",
      author: "Richard Powers",
      description:
        "Interwoven lives transformed by trees and the natural world.",
      userId: users[0].id,
    },
    {
      title: "Sand Talk",
      author: "Tyson Yunkaporta",
      description:
        "Indigenous thinking applied to contemporary global challenges.",
      userId: users[1].id,
    },
  ]);

  await Review.bulkCreate([
    {
      body: "Good book! Highly recommend it for anyone interested in nature.",
      bookId: books[0].id,
      userId: users[1].id,
    },
    {
      body: "A thoughtful, beautifully written novel.",
      bookId: books[1].id,
      userId: users[2].id,
    },
    {
      body: "Fresh perspective on systems and knowledge.",
      bookId: books[2].id,
      userId: users[0].id,
    },
  ]);

  console.log("✓ Database seeded successfully");
  process.exit(0);
}

seed();