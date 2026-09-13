import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import IncidentForm from './pages/IncidentForm';
import InspectionForm from './pages/InspectionForm';
import Reports from './pages/Reports';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));

  useEffect(() => {
    // Verify token on app load
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  const handleLogin = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', role);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    delete axios.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <Router>
      {isAuthenticated && <Navigation onLogout={handleLogout} userRole={userRole} />}
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/incident" element={<IncidentForm />} />
            <Route path="/inspection" element={<InspectionForm />} />
            <Route path="/reports" element={<Reports />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
