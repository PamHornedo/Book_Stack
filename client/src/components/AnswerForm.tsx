import { useState, FormEvent } from 'react';
import { answerAPI } from '../services/api';

interface AnswerFormProps {
  questionId: number;
  onAnswerCreated: () => void;
}

const AnswerForm = ({ questionId, onAnswerCreated }: AnswerFormProps) => {
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!body.trim()) {
      setError('Answer cannot be empty');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      
      await answerAPI.create(questionId, { body });
      
      setBody('');
      onAnswerCreated();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit answer');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="answer-form">
      <h3>Your Answer</h3>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your answer here..."
          rows={8}
          disabled={submitting}
          required
        />
        
        <button type="submit" disabled={submitting} className="btn-primary">
          {submitting ? 'Submitting...' : 'Post Answer'}
        </button>
      </form>
    </div>
  );
};

export default AnswerForm;
