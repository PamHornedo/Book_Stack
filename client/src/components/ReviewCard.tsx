import { useState } from 'react';
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
    <div className="answer-card">
      <div className="answer-content">
        {editing ? (
          <form onSubmit={handleEditSubmit}>
            {editError && <div className="error-message">{editError}</div>}
            <textarea
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
              required
            />
            <div className="form-actions">
              <button type="submit" className="btn-primary">Save</button>
              <button type="button" className="btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
            </div>
          </form>
        ) : (
          <>
            <p className="answer-body">{review.body}</p>
            
            <div className="answer-meta">
              <span className="answer-author">
                reviewed by <strong>{review.user?.username || 'Unknown'}</strong>
              </span>
              <span className="answer-date">{formattedDate}</span>
            </div>

            {isOwner && (
              <div className="owner-actions">
                <button className="btn-secondary" onClick={() => { setEditBody(review.body); setEditing(true); }}>Edit</button>
                <button className="btn-danger" onClick={handleDelete}>Delete</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
