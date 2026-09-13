const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { verifyToken, authorizeRole } = require('../middleware/auth');

// Get all users (admin only)
router.get('/', verifyToken, authorizeRole('admin'), async (req, res) => {
  try {
    const result = await pool.query('SELECT id, email, name, role, created_at FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, email, name, role, created_at FROM users WHERE id = $1', [req.userId]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
