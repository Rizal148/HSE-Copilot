const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { verifyToken, authorizeRole } = require('../middleware/auth');

// Get dashboard stats
router.get('/dashboard/stats', verifyToken, async (req, res) => {
  try {
    const incidents = await pool.query('SELECT COUNT(*) FROM incidents WHERE status = $1', ['open']);
    const inspections = await pool.query('SELECT COUNT(*) FROM inspections');
    const users = await pool.query('SELECT COUNT(*) FROM users');

    res.json({
      open_incidents: parseInt(incidents.rows[0].count),
      total_inspections: parseInt(inspections.rows[0].count),
      total_users: parseInt(users.rows[0].count),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get incident report
router.get('/incidents', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT severity, COUNT(*) as count FROM incidents GROUP BY severity
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
