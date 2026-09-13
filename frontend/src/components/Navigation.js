import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navigation.css';

function Navigation({ onLogout, userRole }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          HSE Copilot
        </Link>
        <ul className="navbar-menu">
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/incident">Report Incident</Link></li>
          {userRole === 'hse_officer' || userRole === 'admin' ? (
            <li><Link to="/inspection">Create Inspection</Link></li>
          ) : null}
          <li><Link to="/reports">Reports</Link></li>
          <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
