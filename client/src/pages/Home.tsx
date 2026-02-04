import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import { questionAPI } from '../services/api';
import type { Question } from '../types';

const Home = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const response = await questionAPI.getAll();
      setQuestions(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load questions');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading questions...</div>;
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>All Questions</h1>
        <Link to="/ask" className="btn-primary">
          Ask Question
        </Link>
      </div>

      {error && <div className="error-message">{error}</div>}

      {questions.length === 0 ? (
        <div className="empty-state">
          <h2>No questions yet</h2>
          <p>Be the first to ask a question!</p>
          <Link to="/ask" className="btn-primary">
            Ask the first question
          </Link>
        </div>
      ) : (
        <div className="questions-list">
          {questions.map(question => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
