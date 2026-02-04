import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { questionAPI } from '../services/api';

const AskQuestion = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !body.trim()) {
      setError('Title and body are required');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      
      const response = await questionAPI.create({ title, body });
      
      navigate(`/questions/${response.data.id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create question');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="ask-question-page">
        <h1>Ask a Question</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="question-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's your programming question?"
              required
              disabled={submitting}
            />
            <small>Be specific and clear in your question title</small>
          </div>
          
          <div className="form-group">
            <label htmlFor="body">Details</label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Provide all the details about your question..."
              rows={12}
              required
              disabled={submitting}
            />
            <small>Include code samples, error messages, and what you've tried</small>
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              onClick={() => navigate('/')} 
              className="btn-secondary"
              disabled={submitting}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? 'Posting...' : 'Post Question'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;
