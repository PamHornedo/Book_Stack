import { Link } from 'react-router-dom';
import type { Book } from '../types';

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  const reviewCount = book._count?.reviews || book.reviews?.length || 0;
  const formattedDate = new Date(book.createdAt).toLocaleDateString();

  return (
    <div className="question-card">
      <div className="question-card-stats">
        <div className="stat">
          <div className="stat-value">{reviewCount}</div>
          <div className="stat-label">reviews</div>
        </div>
      </div>
      
      <div className="question-card-content">
        <Link to={`/books/${book.id}`} className="question-title">
          {book.title}
        </Link>

        <p className="question-body-preview">
          {book.description.length > 200 
            ? book.description.substring(0, 200) + '...' 
            : book.description
          }
        </p>

        <p className="question-body-preview">by {book.author}</p>
        
        <div className="question-meta">
          <span className="question-author">
            added by <strong>{book.user?.username || 'Unknown'}</strong>
          </span>
          <span className="question-date">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
