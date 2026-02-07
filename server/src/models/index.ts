import User from './User';
import Book from './Book';
import Review from './Review';

// User <-> Book associations
User.hasMany(Book, { foreignKey: 'userId', as: 'books' });
Book.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// User <-> Review associations
User.hasMany(Review, { foreignKey: 'userId', as: 'reviews' });
Review.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Book <-> Review associations
Book.hasMany(Review, { foreignKey: 'bookId', as: 'reviews' });
Review.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });

export { User, Book, Review };
