import User from './User';
import Book from './Book';
import Review from './Review';

// User <-> Book associations
User.hasMany(Book, { foreignKey: 'userId' });
Book.belongsTo(User, { foreignKey: 'userId' });

// User <-> Review associations
User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

// Book <-> Review associations
Book.hasMany(Review, { foreignKey: 'bookId' });
Review.belongsTo(Book, { foreignKey: 'bookId' });

export { User, Book, Review };
