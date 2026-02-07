import type { Review } from '../types';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const formattedDate = new Date(review.createdAt).toLocaleDateString();

  return (
    <div className="answer-card">
      <div className="answer-content">
        <p className="answer-body">{review.body}</p>
        
        <div className="answer-meta">
          <span className="answer-author">
            reviewed by <strong>{review.user?.username || 'Unknown'}</strong>
          </span>
          <span className="answer-date">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
