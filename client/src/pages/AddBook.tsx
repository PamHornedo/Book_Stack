import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { bookAPI } from '../services/api';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !author.trim() || !description.trim()) {
      setError('Title, author, and description are required');
      return;
    }

    try {
      setSubmitting(true);
      setError('');

      const response = await bookAPI.create({ title, author, description });

      navigate(`/books/${response.data.id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create book');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
        Add a Book
      </h1>

      <div className="glass space-y-5 p-6 sm:p-8">
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label htmlFor="title" className="text-sm font-medium text-slate-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the book title"
              className="glass-input"
              required
              disabled={submitting}
            />
            <p className="text-xs text-slate-400">Use the full title as listed by the publisher</p>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="author" className="text-sm font-medium text-slate-700">
              Author
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Who wrote this book?"
              className="glass-input"
              required
              disabled={submitting}
            />
            <p className="text-xs text-slate-400">Include the primary author name</p>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="description" className="text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Summarize the book in a few sentences"
              rows={12}
              className="glass-input min-h-[200px] resize-y"
              required
              disabled={submitting}
            />
            <p className="text-xs text-slate-400">Highlight the premise, themes, or audience</p>
          </div>

          <div className="flex gap-3 border-t border-white/40 pt-5">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-accent/25 transition hover:bg-accent/90 disabled:opacity-50"
            >
              <MdAdd className="text-lg" />
              {submitting ? 'Posting…' : 'Add Book'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              disabled={submitting}
              className="rounded-xl border border-slate-200 bg-white/60 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-white/80"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
