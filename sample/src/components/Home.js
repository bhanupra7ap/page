import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
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

  const handlePlanButtonClick = () => {
    navigate('/subs');
  };

  const handleFeedButtonClick = () => {
    navigate('/feed');
  };

  return (
    <div className="home" style={{ backgroundColor: '#f0f0f0' }}>
      <nav className="navbar">
        <div className="navbar-left">
          <button className="nav-button" onClick={handlePlanButtonClick}>Plan</button>
          <button className="nav-button" onClick={handleFeedButtonClick}>Feed</button>
        </div>
        <div className="navbar-right">
        <button className="nav-button">Log In</button>
          <button className="settings-button">
            <i className="bi bi-person-circle" style={{ color: 'black', fontSize: '30px' }}></i>
          </button>
        </div>
      </nav>
      <div className="content">
        {/* Page content goes here */}
      </div>
    </div>
  );
};

export default Home;
