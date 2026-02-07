import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookAPI } from '../services/api';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !author.trim() || !description.trim()) {
      setError('Title, author, and description are required');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      
      const response = await bookAPI.create({ title, author, description });

      navigate(`/books/${response.data.id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create book');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="ask-question-page">
        <h1>Add a Book</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="question-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the book title"
              required
              disabled={submitting}
            />
            <small>Use the full title as listed by the publisher</small>
          </div>

          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Who wrote this book?"
              required
              disabled={submitting}
            />
            <small>Include the primary author name</small>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Summarize the book in a few sentences"
              rows={12}
              required
              disabled={submitting}
            />
            <small>Highlight the premise, themes, or audience</small>
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
              {submitting ? 'Posting...' : 'Add Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
