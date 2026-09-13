import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Reports.css';

function Reports() {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      const response = await axios.get('/api/reports/incidents');
      setReportData(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching reports:', err);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>Reports</h1>
      <div className="report-section">
        <h2>Incident Summary by Severity</h2>
        {reportData && (
          <table>
            <thead>
              <tr>
                <th>Severity</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.severity}</td>
                  <td>{row.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Reports;
