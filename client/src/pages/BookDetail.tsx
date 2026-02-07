import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MdArrowBack, MdEdit, MdDelete, MdRateReview } from 'react-icons/md';
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

  /* ── Loading ────────────────────────────── */
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-accent/30 border-t-accent" />
        <p className="text-sm text-slate-500">Loading book…</p>
      </div>
    );
  }

  /* ── Error / not found ──────────────────── */
  if (error || !book) {
    return (
      <div className="space-y-4">
        <div className="rounded-xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-700 backdrop-blur">
          {error || 'Book not found'}
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent no-underline transition hover:gap-2.5"
        >
          <MdArrowBack className="text-base" /> Back to books
        </Link>
      </div>
    );
  }

  const reviews = book.reviews || [];
  const isOwner = user?.id === book.userId;

  return (
    <div className="space-y-6">
      {/* ── Back link ────────────────────────── */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-accent no-underline transition hover:gap-2.5"
      >
        <MdArrowBack className="text-base" /> All Books
      </Link>

      {/* ── Book info card ────────────────────── */}
      <div className="glass space-y-5 p-6 sm:p-8">
        {editing ? (
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Edit Book</h2>

            {editError && (
              <div className="rounded-xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-700">
                {editError}
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="editTitle" className="text-sm font-medium text-slate-700">Title</label>
              <input
                id="editTitle"
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="glass-input"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="editAuthor" className="text-sm font-medium text-slate-700">Author</label>
              <input
                id="editAuthor"
                type="text"
                value={editAuthor}
                onChange={(e) => setEditAuthor(e.target.value)}
                className="glass-input"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="editDescription" className="text-sm font-medium text-slate-700">Description</label>
              <textarea
                id="editDescription"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="glass-input min-h-[120px] resize-y"
                required
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-accent/25 transition hover:bg-accent/90"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleEditCancel}
                className="rounded-xl border border-slate-200 bg-white/60 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-white/80"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {book.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <span>
                Added by{' '}
                <strong className="text-slate-700">{book.user?.username || 'Unknown'}</strong>
              </span>
              <span className="text-slate-300">·</span>
              <span>{new Date(book.createdAt).toLocaleDateString()}</span>
            </div>

            <p className="leading-relaxed text-slate-700">{book.description}</p>

            <p className="text-sm text-slate-600">
              <strong>Author:</strong> {book.author}
            </p>

            {isOwner && (
              <div className="flex gap-3 border-t border-white/40 pt-4">
                <button
                  onClick={handleEditStart}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white/60 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-white/80"
                >
                  <MdEdit className="text-base" /> Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50/60 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100/80"
                >
                  <MdDelete className="text-base" /> Delete
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Reviews section ───────────────────── */}
      <div className="space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <MdRateReview className="text-accent" />
          {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
        </h2>

        {reviews.length > 0 ? (
          <div className="space-y-4">
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
          <div className="glass flex flex-col items-center gap-2 py-12 text-center">
            <p className="text-sm text-slate-500">
              No reviews yet. Be the first to review!
            </p>
          </div>
        )}
      </div>

      {/* ── Review form / login prompt ────────── */}
      {user ? (
        <ReviewForm bookId={book.id} onReviewCreated={loadBook} />
      ) : (
        <div className="glass px-6 py-5 text-center text-sm text-slate-600">
          <Link to="/login" className="font-semibold text-accent no-underline hover:underline">
            Login
          </Link>{' '}
          or{' '}
          <Link to="/register" className="font-semibold text-accent no-underline hover:underline">
            register
          </Link>{' '}
          to review this book
        </div>
      )}
    </div>
  );
};

export default BookDetail;
