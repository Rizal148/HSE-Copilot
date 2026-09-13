import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Form.css';

function InspectionForm() {
  const [formData, setFormData] = useState({
    location: '',
    inspection_type: 'safety',
    findings: ''
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
      await axios.post('/api/inspections', formData);
      setLoading(false);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Error creating inspection');
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Create Inspection</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Location *</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Inspection Type *</label>
          <select name="inspection_type" value={formData.inspection_type} onChange={handleChange}>
            <option value="safety">Safety</option>
            <option value="fire">Fire Safety</option>
            <option value="electrical">Electrical</option>
            <option value="sanitation">Sanitation</option>
          </select>
        </div>
        <div className="form-group">
          <label>Findings</label>
          <textarea
            name="findings"
            value={formData.findings}
            onChange={handleChange}
            rows="5"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Inspection'}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default InspectionForm;
