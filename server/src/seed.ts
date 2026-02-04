import { sequelize, User, Book, Review} from './models'

async function seed() {
  await sequelize.sync({ force: true })
  
  // Create users
  const users = await User.bulkCreate([
    { username: 'Thomas', email: 'Thomas@dev.com', password: 'password123' },
    { username: 'Pamela', email: 'Pamela@dev.com', password: 'password123' },
    { username: 'Joseph', email: 'Joseph@dev.com', password: 'password123' }
  ])
  
  // Create books
  const book = await Book.bulkCreate([
    {
      title: 'Braiding Sweetgrass',
      body: 'Indigenous Wisdom, Scientific Knowledge, and the Teachings of Plants is a non-fiction book by botanist and Citizen Potawatomi Nation member Robin Wall Kimmerer that blends scientific and Indigenous perspectives on the natural world.',
      userId: users[0].id
    },
    {
      title: 'How does async/await work?',
      body: 'Can someone explain async/await and how it relates to promises?',
      userId: users[1].id
    }
  ])
  
  // Create answers
  const answers = await Answer.bulkCreate([
    {
      body: 'A closure is when a function retains access to variables from its outer scope...',
      questionId: questions[0].id,
      userId: users[1].id
    },
    {
      body: 'Async/await is syntactic sugar for working with promises...',
      questionId: questions[1].id,
      userId: users[0].id
    }
  ])
  
  // Create votes
  await Vote.bulkCreate([
    { answerId: answers[0].id, userId: users[0].id, type: 'up' },
    { answerId: answers[0].id, userId: users[2].id, type: 'up' },
    { answerId: answers[1].id, userId: users[1].id, type: 'up' }
  ])
  
  console.log('✓ Database seeded successfully')
  process.exit(0)
}

seed()