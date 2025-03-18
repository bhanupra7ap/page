import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Subs.css'; // Import the CSS file

function Subs() {
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = (event) => {
      event.preventDefault();
      navigate('/', { replace: true });
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  const handleHomeButtonClick = () => {
    navigate('/', { replace: true });
  };

  const handleFeedButtonClick = () => {
    navigate('/feed', { replace: true });
  };

  return (
    <div className="home">
      <nav className="navbar">
        <div className="navbar-left">
          <button className="nav-button" onClick={handleHomeButtonClick}>Home</button>
          <button className="nav-button" onClick={handleFeedButtonClick}>Feed</button>
        </div>
        <div className="navbar-right">
          <button className="settings-button">
            <i className="bi bi-person-circle" style={{ color: 'black', fontSize: '30px' }}></i>
          </button>
        </div>
      </nav>
      <div className="content">
        {/* Page content goes here */}
        <div className="big-card">
          {/* Big card content */}
        </div>
        <div className="small-cards">
          <div className="small-card">
            {/* Small card content */}
          </div>
          <div className="small-card">
            {/* Small card content */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subs;
