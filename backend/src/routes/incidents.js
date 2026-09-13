const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { verifyToken, authorizeRole } = require('../middleware/auth');

// Get all incidents
router.get('/', verifyToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM incidents ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create incident
router.post('/', verifyToken, async (req, res) => {
  const { title, description, severity, location, reported_by } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO incidents (title, description, severity, location, reported_by, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, description, severity, location, reported_by, 'open']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update incident
router.put('/:id', verifyToken, authorizeRole('hse_officer', 'admin'), async (req, res) => {
  const { id } = req.params;
  const { status, resolution } = req.body;

  try {
    const result = await pool.query(
      'UPDATE incidents SET status = $1, resolution = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
      [status, resolution, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
