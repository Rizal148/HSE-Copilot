const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { verifyToken, authorizeRole } = require('../middleware/auth');

// Get all inspections
router.get('/', verifyToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inspections ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create inspection
router.post('/', verifyToken, authorizeRole('hse_officer', 'admin'), async (req, res) => {
  const { location, inspection_type, checklist, findings } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO inspections (location, inspection_type, checklist, findings, inspector_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [location, inspection_type, JSON.stringify(checklist), findings, req.userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
