import { Router } from 'express';
import pool from '../config/db.js';

const router = Router();

function getInitials(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .map(p => p[0]?.toUpperCase() || '')
    .slice(0, 2)
    .join('');
}

// GET /api/contacts - Fetch all contacts
router.get('/', async (req, res) => {
  try {
    const { tag, search } = req.query;
    let query = 'SELECT * FROM contacts WHERE 1=1';
    const params = [];

    if (tag && tag !== 'All') {
      query += ' AND tag = ?';
      params.push(tag);
    }

    if (search) {
      query += ' AND (name LIKE ? OR city LIKE ? OR phone LIKE ? OR email LIKE ?)';
      const s = `%${search}%`;
      params.push(s, s, s, s);
    }

    query += ' ORDER BY created_at DESC';

    const [rows] = await pool.query(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error in GET /api/contacts:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/contacts - Create contact
router.post('/', async (req, res) => {
  try {
    const { name, city = '', phone = '', email = '', tag = 'Lead' } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }

    const initials = req.body.initials || getInitials(name);

    const [result] = await pool.query(
      `INSERT INTO contacts (name, initials, city, phone, email, tag)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, initials, city, phone, email, tag]
    );

    const [created] = await pool.query('SELECT * FROM contacts WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, data: created[0] });
  } catch (error) {
    console.error('Error in POST /api/contacts:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/contacts/:id - Update contact
router.put('/:id', async (req, res) => {
  try {
    const { name, city, phone, email, tag } = req.body;
    const { id } = req.params;

    const [existing] = await pool.query('SELECT * FROM contacts WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    const initials = name ? getInitials(name) : existing[0].initials;

    await pool.query(
      `UPDATE contacts
       SET name = COALESCE(?, name),
           initials = COALESCE(?, initials),
           city = COALESCE(?, city),
           phone = COALESCE(?, phone),
           email = COALESCE(?, email),
           tag = COALESCE(?, tag)
       WHERE id = ?`,
      [name, initials, city, phone, email, tag, id]
    );

    const [updated] = await pool.query('SELECT * FROM contacts WHERE id = ?', [id]);
    res.json({ success: true, data: updated[0] });
  } catch (error) {
    console.error('Error in PUT /api/contacts/:id:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/contacts/:id - Delete contact
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM contacts WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    res.json({ success: true, message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/contacts/:id:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

