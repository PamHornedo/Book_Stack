import { useState } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import { reviewAPI } from '../services/api';
import type { Review } from '../types';

interface ReviewCardProps {
  review: Review;
  currentUserId?: number;
  onReviewUpdated?: () => void;
}

const ReviewCard = ({ review, currentUserId, onReviewUpdated }: ReviewCardProps) => {
  const formattedDate = new Date(review.createdAt).toLocaleDateString();
  const isOwner = currentUserId != null && currentUserId === review.userId;
  const initials = (review.user?.username ?? 'U').slice(0, 2).toUpperCase();

  const [editing, setEditing] = useState(false);
  const [editBody, setEditBody] = useState(review.body);
  const [editError, setEditError] = useState('');

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setEditError('');
      await reviewAPI.update(review.id, { body: editBody });
      setEditing(false);
      onReviewUpdated?.();
    } catch (err: any) {
      setEditError(err.response?.data?.message || 'Failed to update review');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      await reviewAPI.delete(review.id);
      onReviewUpdated?.();
    } catch (err: any) {
      setEditError(err.response?.data?.message || 'Failed to delete review');
    }
  };

  return (
    <div className="glass space-y-3 p-5">
      {editing ? (
        <form onSubmit={handleEditSubmit} className="space-y-3">
          {editError && (
            <div className="rounded-xl border border-red-200 bg-red-50/80 px-4 py-2.5 text-sm text-red-700">
              {editError}
            </div>
          )}
          <textarea
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
            className="glass-input min-h-[100px] resize-y"
            required
          />
          <div className="flex gap-3">
            <button
              type="submit"
              className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white shadow-md shadow-accent/25 transition hover:bg-accent/90"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="rounded-xl border border-slate-200 bg-white/60 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-white/80"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          {/* Body */}
          <p className="leading-relaxed text-slate-700">{review.body}</p>

          {/* Metadata footer */}
          <div className="flex items-center justify-between border-t border-white/40 pt-3">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                {initials}
              </span>
              <span className="text-xs text-slate-500">
                reviewed by{' '}
                <strong className="text-slate-700">{review.user?.username || 'Unknown'}</strong>
                <span className="mx-1.5 text-slate-300">·</span>
                {formattedDate}
              </span>
            </div>

            {isOwner && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setEditBody(review.body); setEditing(true); }}
                  className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white/50 hover:text-slate-700"
                  aria-label="Edit review"
                >
                  <MdEdit className="text-base" />
                </button>
                <button
                  onClick={handleDelete}
                  className="rounded-lg p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                  aria-label="Delete review"
                >
                  <MdDelete className="text-base" />
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewCard;
