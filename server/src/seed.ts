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
    // Reviews for "Braiding Sweetgrass"
    {
      body: "Good book! Highly recommend it for anyone interested in nature.",
      bookId: books[0].id,
      userId: users[1].id,
    },
    {
      body: "This book changed how I see the relationship between humans and the natural world. Kimmerer's writing is both poetic and scientific.",
      bookId: books[0].id,
      userId: users[2].id,
    },
    {
      body: "A beautiful blend of indigenous wisdom and ecology. Every chapter offers something to reflect on.",
      bookId: books[0].id,
      userId: users[0].id,
    },
    {
      body: "Deeply moving and educational. I found myself slowing down to savor each story and lesson.",
      bookId: books[0].id,
      userId: users[1].id,
    },
    {
      body: "Required reading for anyone who cares about environmental sustainability and indigenous perspectives.",
      bookId: books[0].id,
      userId: users[2].id,
    },

    // Reviews for "The Overstory"
    {
      body: "A thoughtful, beautifully written novel.",
      bookId: books[1].id,
      userId: users[2].id,
    },
    {
      body: "Powers weaves together multiple storylines masterfully. The way trees become characters is brilliant.",
      bookId: books[1].id,
      userId: users[0].id,
    },
    {
      body: "Long but worth it. This book makes you think about trees in a completely different way.",
      bookId: books[1].id,
      userId: users[1].id,
    },
    {
      body: "Ambitious and gorgeously written, though it requires patience. The interconnected stories mirror the forest itself.",
      bookId: books[1].id,
      userId: users[2].id,
    },
    {
      body: "One of those rare books that fundamentally shifts your perspective. I'll never walk through a forest the same way again.",
      bookId: books[1].id,
      userId: users[0].id,
    },

    // Reviews for "Sand Talk"
    {
      body: "Fresh perspective on systems and knowledge.",
      bookId: books[2].id,
      userId: users[0].id,
    },
    {
      body: "Yunkaporta challenges Western thinking in the most respectful yet profound way. Mind-opening read!",
      bookId: books[2].id,
      userId: users[1].id,
    },
    {
      body: "Complex ideas presented through accessible storytelling. The sand metaphor for indigenous knowledge systems is powerful.",
      bookId: books[2].id,
      userId: users[2].id,
    },
    {
      body: "This book should be required reading for anyone working in technology, education, or policy. Revolutionary thinking.",
      bookId: books[2].id,
      userId: users[0].id,
    },
    {
      body: "Brilliant! Yunkaporta takes you on a journey through indigenous knowledge that's incredibly relevant to modern problems.",
      bookId: books[2].id,
      userId: users[1].id,
    },
  ]);

  console.log("✓ Database seeded successfully");
  process.exit(0);
}

seed();