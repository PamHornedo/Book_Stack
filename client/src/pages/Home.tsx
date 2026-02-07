import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdSearch, MdLibraryBooks, MdAdd } from 'react-icons/md';
import BookCard from '../components/BookCard';
import { bookAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import type { Book } from '../types';

const Home = () => {
  const { user } = useAuth();
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

  /* ── Loading state ─────────────────────── */
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-accent/30 border-t-accent" />
        <p className="text-sm text-slate-500">Loading books…</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* ── Page header ───────────────────── */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Recent Books
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Browse the latest additions from the community
          </p>
        </div>
        {user && (
          <Link
            to="/add-book"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-accent/25 transition hover:bg-accent/90 flex-shrink-0"
          >
            <MdAdd className="text-lg" />
            Add Review
          </Link>
        )}
      </div>

      {/* ── Search bar ───────────────────── */}
      <div className="glass-search rounded-xl px-4 py-3">
        <div className="relative">
          <MdSearch className="absolute left-0 top-1/2 -translate-y-1/2 text-lg text-slate-400" />
          <input
            type="text"
            placeholder="Search books…"
            className="w-full pl-8 pr-4 bg-transparent border-0 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-0"
            readOnly
          />
        </div>
      </div>

      {/* ── Error banner ───────────────────── */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-700 backdrop-blur">
          {error}
        </div>
      )}

      {/* ── Book list / empty state ────────── */}
      {books.length === 0 ? (
        <div className="glass flex flex-col items-center gap-4 py-16 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
            <MdLibraryBooks className="text-3xl" />
          </span>
          <h2 className="text-lg font-semibold text-slate-800">
            No books yet
          </h2>
          <p className="text-sm text-slate-500">
            Be the first to share a book with the community.
          </p>
          <Link
            to="/add-book"
            className="mt-2 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-accent/25 transition hover:bg-accent/90"
          >
            <MdAdd className="text-lg" />
            Add the first book
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {books.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
