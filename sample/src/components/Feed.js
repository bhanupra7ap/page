import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import DataTable from './DataTable';

const Feed = () => {
  const navigate = useNavigate();

  const handlePlanButtonClick = () => {
    navigate('/subs', { replace: true });
  };

  const handleHomeButtonClick = () => {
    navigate('/', { replace: true });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Trigger a re-render to refresh the DataTable
      window.location.reload();
    }, 60000); // 60000 ms = 1 minute

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="home" style={{ backgroundColor: '#f0f0f0', height: '100vh', overflowY: 'auto' }}>
      <nav className="navbar">
        <div className="navbar-left">
            <button className="nav-button" onClick={handleHomeButtonClick}>Home</button>
            <button className="nav-button" onClick={handlePlanButtonClick}>Plan</button>
        </div>
        <div className="navbar-right">
          <button className="settings-button">
            <i className="bi bi-person-circle" style={{ color: 'black', fontSize: '30px' }}></i>
          </button>
        </div>
      </nav>
      <div style={{ flex: 3, overflow: 'hidden' }}>
        <DataTable />
      </div>
    </div>
  );
};

export default Feed;
