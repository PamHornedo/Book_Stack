import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ReviewCard from '../components/ReviewCard';
import ReviewForm from '../components/ReviewForm';
import { bookAPI } from '../services/api';
import type { Book } from '../types';

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Edit state
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editAuthor, setEditAuthor] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editError, setEditError] = useState('');

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

  const handleEditStart = () => {
    if (!book) return;
    setEditTitle(book.title);
    setEditAuthor(book.author);
    setEditDescription(book.description);
    setEditError('');
    setEditing(true);
  };

  const handleEditCancel = () => {
    setEditing(false);
    setEditError('');
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!book) return;
    try {
      setEditError('');
      await bookAPI.update(book.id, {
        title: editTitle,
        author: editAuthor,
        description: editDescription,
      });
      setEditing(false);
      await loadBook();
    } catch (err: any) {
      setEditError(err.response?.data?.message || 'Failed to update book');
    }
  };

  const handleDelete = async () => {
    if (!book) return;
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    try {
      await bookAPI.delete(book.id);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete book');
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
  const isOwner = user?.id === book.userId;

  return (
    <div className="container">
      <Link to="/" className="back-link">← All Books</Link>
      
      <div className="question-detail">
        {editing ? (
          <form onSubmit={handleEditSubmit} className="edit-form">
            <h2>Edit Book</h2>
            {editError && <div className="error-message">{editError}</div>}
            <div className="form-group">
              <label htmlFor="editTitle">Title</label>
              <input
                id="editTitle"
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="editAuthor">Author</label>
              <input
                id="editAuthor"
                type="text"
                value={editAuthor}
                onChange={(e) => setEditAuthor(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="editDescription">Description</label>
              <textarea
                id="editDescription"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">Save</button>
              <button type="button" className="btn-secondary" onClick={handleEditCancel}>Cancel</button>
            </div>
          </form>
        ) : (
          <>
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

            {isOwner && (
              <div className="owner-actions">
                <button className="btn-secondary" onClick={handleEditStart}>Edit</button>
                <button className="btn-danger" onClick={handleDelete}>Delete</button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="answers-section">
        <h2>{reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}</h2>
        
        {reviews.length > 0 ? (
          <div className="answers-list">
            {reviews.map(review => (
              <ReviewCard 
                key={review.id} 
                review={review}
                currentUserId={user?.id}
                onReviewUpdated={loadBook}
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
