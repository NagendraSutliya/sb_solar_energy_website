import { Router } from 'express';
import pool from '../config/db.js';

const router = Router();

// GET /api/quotes - Fetch all quotes
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM quotes ORDER BY created_at DESC');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error in GET /api/quotes:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/quotes - Save a new solar quote inquiry
router.post('/', async (req, res) => {
  try {
    const {
      fullName,
      phone,
      city = '',
      monthlyBill = 0,
      category = 'Residential',
      roofType = 'Concrete / RCC Flat',
      capacityKW = 1.0,
      subsidy = 0,
    } = req.body;

    if (!fullName || !phone) {
      return res.status(400).json({ success: false, message: 'Full name and phone are required' });
    }

    const [result] = await pool.query(
      `INSERT INTO quotes (full_name, phone, city, monthly_bill, category, roof_type, capacity_kw, subsidy_amount)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [fullName, phone, city, monthlyBill, category, roofType, capacityKW, subsidy]
    );

    // Also optionally save as a lead in the leads table
    const initials = fullName.split(' ').map(p => p[0]?.toUpperCase() || '').slice(0, 2).join('');
    await pool.query(
      `INSERT INTO leads (name, initials, source, city, interest, status, phone)
       VALUES (?, ?, 'Solar Quote Form', ?, ?, 'New', ?)`,
      [fullName, initials, city, `${capacityKW} kW ${category} Solar`, phone]
    ).catch(err => console.warn('Auto-lead creation note:', err.message));

    const [created] = await pool.query('SELECT * FROM quotes WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, data: created[0] });
  } catch (error) {
    console.error('Error in POST /api/quotes:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

