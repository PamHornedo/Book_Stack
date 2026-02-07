import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdRateReview, MdArrowForward } from 'react-icons/md';
import { reviewAPI } from '../services/api';
import type { Review } from '../types';

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const response = await reviewAPI.getAll();
      setReviews(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  /* ── Loading state ─────────────────────── */
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-accent/30 border-t-accent" />
        <p className="text-sm text-slate-500">Loading reviews…</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* ── Page header ───────────────────── */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          All Reviews
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Browse reviews from the community
        </p>
      </div>

      {/* ── Error banner ───────────────────── */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-700 backdrop-blur">
          {error}
        </div>
      )}

      {/* ── Reviews list / empty state ────────── */}
      {reviews.length === 0 ? (
        <div className="glass flex flex-col items-center gap-4 py-16 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
            <MdRateReview className="text-3xl" />
          </span>
          <h2 className="text-lg font-semibold text-slate-800">
            No reviews yet
          </h2>
          <p className="text-sm text-slate-500">
            Be the first to review a book!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => {
            const initials = (review.user?.username ?? 'U').slice(0, 2).toUpperCase();
            const formattedDate = new Date(review.createdAt).toLocaleDateString();

            return (
              <div key={review.id} className="glass-card space-y-3 p-5">
                {/* Review header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-xs font-bold text-white flex-shrink-0">
                      {initials}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800">
                        {review.user?.username || 'Unknown'}
                      </p>
                      <p className="text-xs text-slate-500">{formattedDate}</p>
                    </div>
                  </div>
                </div>

                {/* Review body */}
                <p className="text-sm leading-relaxed text-slate-700">{review.body}</p>

                {/* Book info */}
                {review.book && (
                  <div className="flex items-center justify-between border-t border-white/40 pt-3">
                    <div className="min-w-0">
                      <p className="text-xs text-slate-500">Review for:</p>
                      <p className="text-sm font-semibold text-slate-800 truncate">
                        {review.book.title}
                      </p>
                      <p className="text-xs text-slate-500">by {review.book.author}</p>
                    </div>
                    <Link
                      to={`/books/${review.book.id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-accent no-underline transition hover:gap-2 flex-shrink-0"
                    >
                      View book <MdArrowForward className="text-sm" />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Reviews;
