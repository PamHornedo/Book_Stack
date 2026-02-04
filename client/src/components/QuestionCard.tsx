import { Link } from 'react-router-dom';
import type { Question } from '../types';

interface QuestionCardProps {
  question: Question;
}

const QuestionCard = ({ question }: QuestionCardProps) => {
  const answerCount = question._count?.answers || question.answers?.length || 0;
  const formattedDate = new Date(question.createdAt).toLocaleDateString();

  return (
    <div className="question-card">
      <div className="question-card-stats">
        <div className="stat">
          <div className="stat-value">{answerCount}</div>
          <div className="stat-label">answers</div>
        </div>
      </div>
      
      <div className="question-card-content">
        <Link to={`/questions/${question.id}`} className="question-title">
          {question.title}
        </Link>
        
        <p className="question-body-preview">
          {question.body.length > 200 
            ? question.body.substring(0, 200) + '...' 
            : question.body
          }
        </p>
        
        <div className="question-meta">
          <span className="question-author">
            asked by <strong>{question.user?.username || 'Unknown'}</strong>
          </span>
          <span className="question-date">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
