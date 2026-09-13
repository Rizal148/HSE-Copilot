import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Form.css';

function IncidentForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'medium',
    location: '',
    reported_by: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/incidents', formData);
      setLoading(false);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Error creating incident');
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Report Incident</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
          ></textarea>
        </div>
        <div className="form-group">
          <label>Severity *</label>
          <select name="severity" value={formData.severity} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Reported By</label>
          <input
            type="text"
            name="reported_by"
            value={formData.reported_by}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Incident'}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default IncidentForm;
