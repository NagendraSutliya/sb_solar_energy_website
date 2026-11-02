import { Router } from 'express';
import pool from '../config/db.js';

const router = Router();

// Helper to compute initials from name
function getInitials(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .map(p => p[0]?.toUpperCase() || '')
    .slice(0, 2)
    .join('');
}

// GET /api/leads - Fetch all leads
router.get('/', async (req, res) => {
  try {
    const { status, search } = req.query;
    let query = 'SELECT * FROM leads WHERE 1=1';
    const params = [];

    if (status && status !== 'All') {
      query += ' AND status = ?';
      params.push(status);
    }

    if (search) {
      query += ' AND (name LIKE ? OR city LIKE ? OR phone LIKE ? OR interest LIKE ?)';
      const s = `%${search}%`;
      params.push(s, s, s, s);
    }

    query += ' ORDER BY created_at DESC';

    const [rows] = await pool.query(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error in GET /api/leads:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/leads/:id - Fetch single lead
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM leads WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('Error in GET /api/leads/:id:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/leads - Create new lead
router.post('/', async (req, res) => {
  try {
    const { name, source = 'Website form', city = '', interest = '', status = 'New', assigned = 'Unassigned', phone = '', email = '', notes = '' } = req.body;
    
    if (!name) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }

    const initials = req.body.initials || getInitials(name);

    const [result] = await pool.query(
      `INSERT INTO leads (name, initials, source, city, interest, status, assigned, phone, email, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, initials, source, city, interest, status, assigned, phone, email, notes]
    );

    const [created] = await pool.query('SELECT * FROM leads WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, data: created[0] });
  } catch (error) {
    console.error('Error in POST /api/leads:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/leads/:id - Update lead
router.put('/:id', async (req, res) => {
  try {
    const { name, source, city, interest, status, assigned, phone, email, notes } = req.body;
    const { id } = req.params;

    const [existing] = await pool.query('SELECT * FROM leads WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    const initials = name ? getInitials(name) : existing[0].initials;

    await pool.query(
      `UPDATE leads 
       SET name = COALESCE(?, name),
           initials = COALESCE(?, initials),
           source = COALESCE(?, source),
           city = COALESCE(?, city),
           interest = COALESCE(?, interest),
           status = COALESCE(?, status),
           assigned = COALESCE(?, assigned),
           phone = COALESCE(?, phone),
           email = COALESCE(?, email),
           notes = COALESCE(?, notes)
       WHERE id = ?`,
      [name, initials, source, city, interest, status, assigned, phone, email, notes, id]
    );

    const [updated] = await pool.query('SELECT * FROM leads WHERE id = ?', [id]);
    res.json({ success: true, data: updated[0] });
  } catch (error) {
    console.error('Error in PUT /api/leads/:id:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/leads/:id - Delete lead
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM leads WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }
    res.json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/leads/:id:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

