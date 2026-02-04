import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AnswerCard from '../components/AnswerCard';
import AnswerForm from '../components/AnswerForm';
import { questionAPI } from '../services/api';
import type { Question } from '../types';

const QuestionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      loadQuestion();
    }
  }, [id]);

  const loadQuestion = async () => {
    try {
      setLoading(true);
      const response = await questionAPI.getById(Number(id));
      setQuestion(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load question');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading question...</div>;
  }

  if (error || !question) {
    return (
      <div className="container">
        <div className="error-message">{error || 'Question not found'}</div>
        <Link to="/" className="btn-secondary">← Back to questions</Link>
      </div>
    );
  }

  const answers = question.answers || [];
  const sortedAnswers = [...answers].sort((a, b) => {
    const aVotes = a.voteCount || 0;
    const bVotes = b.voteCount || 0;
    return bVotes - aVotes;
  });

  return (
    <div className="container">
      <Link to="/" className="back-link">← All Questions</Link>
      
      <div className="question-detail">
        <h1>{question.title}</h1>
        
        <div className="question-meta">
          <span>
            Asked by <strong>{question.user?.username || 'Unknown'}</strong>
          </span>
          <span>{new Date(question.createdAt).toLocaleDateString()}</span>
        </div>
        
        <div className="question-body">
          <p>{question.body}</p>
        </div>
      </div>

      <div className="answers-section">
        <h2>{answers.length} {answers.length === 1 ? 'Answer' : 'Answers'}</h2>
        
        {sortedAnswers.length > 0 ? (
          <div className="answers-list">
            {sortedAnswers.map(answer => (
              <AnswerCard 
                key={answer.id} 
                answer={answer}
                onUpdate={loadQuestion}
              />
            ))}
          </div>
        ) : (
          <p className="no-answers">No answers yet. Be the first to answer!</p>
        )}
      </div>

      {user ? (
        <AnswerForm questionId={question.id} onAnswerCreated={loadQuestion} />
      ) : (
        <div className="login-prompt">
          <Link to="/login">Login</Link> or <Link to="/register">register</Link> to answer this question
        </div>
      )}
    </div>
  );
};

export default QuestionDetail;
