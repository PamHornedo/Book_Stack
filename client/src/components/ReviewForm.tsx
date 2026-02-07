import { useState, FormEvent } from 'react';
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
    <div className="answer-form">
      <h3>Your Review</h3>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your review here..."
          rows={8}
          disabled={submitting}
          required
        />
        
        <button type="submit" disabled={submitting} className="btn-primary">
          {submitting ? 'Submitting...' : 'Post Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
