import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { voteAPI } from '../services/api';
import type { Answer } from '../types';

interface AnswerCardProps {
  answer: Answer;
  onUpdate: () => void;
}

const AnswerCard = ({ answer, onUpdate }: AnswerCardProps) => {
  const { user } = useAuth();
  const [voting, setVoting] = useState(false);
  
  const voteCount = answer.voteCount || 0;
  const userVote = answer.userVote || null;
  const formattedDate = new Date(answer.createdAt).toLocaleDateString();

  const handleVote = async (value: 1 | -1) => {
    if (!user || voting) return;
    
    try {
      setVoting(true);
      
      // If clicking the same vote, remove it
      if (userVote === value) {
        await voteAPI.removeVote(answer.id);
      }
      // Otherwise, cast new vote (upvote or downvote)
      else if (value === 1) {
        await voteAPI.upvote(answer.id);
      } else {
        await voteAPI.downvote(answer.id);
      }
      
      onUpdate();
    } catch (error) {
      console.error('Vote error:', error);
    } finally {
      setVoting(false);
    }
  };

  return (
    <div className="answer-card">
      <div className="answer-votes">
        <button 
          className={`vote-btn ${userVote === 1 ? 'active' : ''}`}
          onClick={() => handleVote(1)}
          disabled={!user || voting}
          title={user ? 'Upvote' : 'Login to vote'}
        >
          ▲
        </button>
        
        <div className={`vote-count ${voteCount > 0 ? 'positive' : voteCount < 0 ? 'negative' : ''}`}>
          {voteCount}
        </div>
        
        <button 
          className={`vote-btn ${userVote === -1 ? 'active' : ''}`}
          onClick={() => handleVote(-1)}
          disabled={!user || voting}
          title={user ? 'Downvote' : 'Login to vote'}
        >
          ▼
        </button>
      </div>
      
      <div className="answer-content">
        <p className="answer-body">{answer.body}</p>
        
        <div className="answer-meta">
          <span className="answer-author">
            answered by <strong>{answer.user?.username || 'Unknown'}</strong>
          </span>
          <span className="answer-date">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;
