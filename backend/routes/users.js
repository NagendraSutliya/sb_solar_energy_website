import { Router } from 'express';
import pool from '../config/db.js';

const router = Router();

// GET /api/users - Fetch all users
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, name, email, role, phone, status, created_at FROM users ORDER BY created_at DESC'
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error in GET /api/users:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/users - Create/Invite a user
router.post('/', async (req, res) => {
  try {
    const { name, email, role = 'staff', phone = '', password = 'User#123' } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required' });
    }

    const cleanEmail = String(email).trim().toLowerCase();

    const [existing] = await pool.query('SELECT id FROM users WHERE LOWER(email) = ?', [cleanEmail]);
    if (existing.length > 0) {
      return res.status(409).json({ success: false, message: 'User with this email already exists' });
    }

    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, role, phone, status) VALUES (?, ?, ?, ?, ?, ?)',
      [name.trim(), cleanEmail, password, role.toLowerCase(), phone, 'active']
    );

    const [created] = await pool.query(
      'SELECT id, name, email, role, phone, status, created_at FROM users WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({ success: true, data: created[0] });
  } catch (error) {
    console.error('Error in POST /api/users:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/users/:id - Update user role / status
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, status, phone } = req.body;

    await pool.query(
      `UPDATE users
       SET name = COALESCE(?, name),
           role = COALESCE(?, role),
           status = COALESCE(?, status),
           phone = COALESCE(?, phone)
       WHERE id = ?`,
      [name, role ? role.toLowerCase() : null, status ? status.toLowerCase() : null, phone, id]
    );

    const [rows] = await pool.query(
      'SELECT id, name, email, role, phone, status, created_at FROM users WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('Error in PUT /api/users/:id:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/users/:id - Delete user
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/users/:id:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
