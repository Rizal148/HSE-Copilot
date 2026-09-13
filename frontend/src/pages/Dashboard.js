import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, incidentsRes] = await Promise.all([
        axios.get('/api/reports/dashboard/stats'),
        axios.get('/api/incidents')
      ]);
      setStats(statsRes.data);
      setIncidents(incidentsRes.data.slice(0, 10));
      setLoading(false);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>Dashboard</h1>
      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Open Incidents</h3>
            <p className="stat-value">{stats.open_incidents}</p>
          </div>
          <div className="stat-card">
            <h3>Total Inspections</h3>
            <p className="stat-value">{stats.total_inspections}</p>
          </div>
          <div className="stat-card">
            <h3>Total Users</h3>
            <p className="stat-value">{stats.total_users}</p>
          </div>
        </div>
      )}
      <div className="recent-incidents">
        <h2>Recent Incidents</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Severity</th>
              <th>Status</th>
              <th>Location</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map(incident => (
              <tr key={incident.id}>
                <td>{incident.title}</td>
                <td><span className={`severity-${incident.severity}`}>{incident.severity}</span></td>
                <td>{incident.status}</td>
                <td>{incident.location}</td>
                <td>{new Date(incident.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
