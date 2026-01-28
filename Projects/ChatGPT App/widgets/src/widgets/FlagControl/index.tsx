import React, { useState } from 'react';
import './styles.css';

interface FlagProps {
  name: string;
  flagKey: string;
  status: boolean;
  environment: string;
}

const FlagControl: React.FC<FlagProps> = ({ name, flagKey, status: initialStatus, environment }) => {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const toggleFlag = async () => {
    setLoading(true);
    // In a real scenario, this would call a tool back via the ChatGPT App SDK
    // For now, we simulate the toggle
    setTimeout(() => {
      setStatus(!status);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="kameleoon-widget flag-control">
      <div className="widget-header">
        <img src="https://static.kameleoon.com/images/favicon.ico" alt="Kameleoon" className="logo" />
        <span className="env-badge">{environment.toUpperCase()}</span>
      </div>
      
      <div className="widget-content">
        <h3>{name}</h3>
        <code className="flag-key">{flagKey}</code>
        
        <div className={`status-display ${status ? 'status-on' : 'status-off'}`}>
          <div className="status-dot"></div>
          <span className="status-text">{status ? 'Active' : 'Paused'}</span>
        </div>
      </div>

      <div className="widget-actions">
        <button 
          onClick={toggleFlag} 
          disabled={loading}
          className={`toggle-btn ${status ? 'btn-pause' : 'btn-activate'}`}
        >
          {loading ? 'Processing...' : status ? 'Pause Flag' : 'Activate Flag'}
        </button>
      </div>
    </div>
  );
};

export default FlagControl;
