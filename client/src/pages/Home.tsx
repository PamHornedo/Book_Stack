import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { bookAPI } from '../services/api';
import type { Book } from '../types';

const Home = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const response = await bookAPI.getAll();
      setBooks(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load books');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading books...</div>;
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>All Books</h1>
        <Link to="/add-book" className="btn-primary">
          Add Book
        </Link>
      </div>

      {error && <div className="error-message">{error}</div>}

      {books.length === 0 ? (
        <div className="empty-state">
          <h2>No books yet</h2>
          <p>Be the first to add a book!</p>
          <Link to="/add-book" className="btn-primary">
            Add the first book
          </Link>
        </div>
      ) : (
        <div className="questions-list">
          {books.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
