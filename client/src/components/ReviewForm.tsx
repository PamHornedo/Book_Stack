import { useState, FormEvent } from 'react';
import { MdSend } from 'react-icons/md';
import { reviewAPI } from '../services/api';

interface ReviewFormProps {
  bookId: number;
  onReviewCreated: () => void;
}

const ReviewForm = ({ bookId, onReviewCreated }: ReviewFormProps) => {
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!body.trim()) {
      setError('Review cannot be empty');
      return;
    }

    try {
      setSubmitting(true);
      setError('');

      await reviewAPI.create(bookId, { body });

      setBody('');
      onReviewCreated();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="glass space-y-4 p-6">
      <h3 className="text-base font-bold text-slate-900">Your Review</h3>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50/80 px-4 py-2.5 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your review here…"
          rows={6}
          disabled={submitting}
          required
          className="glass-input min-h-[140px] resize-y"
        />

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-accent/25 transition hover:bg-accent/90 disabled:opacity-50"
        >
          <MdSend className="text-base" />
          {submitting ? 'Submitting…' : 'Post Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
