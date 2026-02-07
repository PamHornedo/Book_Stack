import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ReviewCard from '../components/ReviewCard';
import ReviewForm from '../components/ReviewForm';
import { bookAPI } from '../services/api';
import type { Book } from '../types';

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      loadBook();
    }
  }, [id]);

  const loadBook = async () => {
    try {
      setLoading(true);
      const response = await bookAPI.getById(Number(id));
      setBook(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load book');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading book...</div>;
  }

  if (error || !book) {
    return (
      <div className="container">
        <div className="error-message">{error || 'Book not found'}</div>
        <Link to="/" className="btn-secondary">← Back to books</Link>
      </div>
    );
  }

  const reviews = book.reviews || [];

  return (
    <div className="container">
      <Link to="/" className="back-link">← All Books</Link>
      
      <div className="question-detail">
        <h1>{book.title}</h1>
        
        <div className="question-meta">
          <span>
            Added by <strong>{book.user?.username || 'Unknown'}</strong>
          </span>
          <span>{new Date(book.createdAt).toLocaleDateString()}</span>
        </div>
        
        <div className="question-body">
          <p>{book.description}</p>
        </div>

        <div className="question-body">
          <strong>Author:</strong> {book.author}
        </div>
      </div>

      <div className="answers-section">
        <h2>{reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}</h2>
        
        {reviews.length > 0 ? (
          <div className="answers-list">
            {reviews.map(review => (
              <ReviewCard 
                key={review.id} 
                review={review}
              />
            ))}
          </div>
        ) : (
          <p className="no-answers">No reviews yet. Be the first to review!</p>
        )}
      </div>

      {user ? (
        <ReviewForm bookId={book.id} onReviewCreated={loadBook} />
      ) : (
        <div className="login-prompt">
          <Link to="/login">Login</Link> or <Link to="/register">register</Link> to review this book
        </div>
      )}
    </div>
  );
};

export default BookDetail;
