import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

/**
 * GET /api/complaints
 * Query: status, email
 */
router.get('/', async (req, res) => {
  try {
    const { status, email } = req.query;
    let query = 'SELECT * FROM complaints WHERE 1=1';
    const params = [];

    if (email) {
      query += ' AND customer_email = ?';
      params.push(email);
    }

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC';

    const [rows] = await pool.query(query, params);
    res.json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    console.error('[COMPLAINTS GET ERROR]', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch complaints.',
      error: error.message,
    });
  }
});

/**
 * POST /api/complaints
 * Body: { category, sub_category, nature, description, customer_name, customer_email, customer_phone }
 */
router.post('/', async (req, res) => {
  try {
    const { category, sub_category, nature, description, customer_name, customer_email, customer_phone } = req.body;

    if (!category || !nature) {
      return res.status(400).json({
        success: false,
        message: 'Category and nature of complaint are required.',
      });
    }

    const complaintNo = `CMP-${Math.floor(10000 + Math.random() * 90000)}`;

    const [result] = await pool.query(
      `INSERT INTO complaints 
       (complaint_no, customer_name, customer_email, customer_phone, category, sub_category, nature, description, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Not Process Yet')`,
      [
        complaintNo,
        customer_name || 'Customer',
        customer_email || '',
        customer_phone || '',
        category,
        sub_category || '',
        nature,
        description || '',
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Complaint submitted successfully.',
      data: {
        id: result.insertId,
        complaint_no: complaintNo,
        category,
        nature,
        status: 'Not Process Yet',
      },
    });
  } catch (error) {
    console.error('[COMPLAINTS POST ERROR]', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit complaint.',
      error: error.message,
    });
  }
});

/**
 * PUT /api/complaints/:id/status
 * Body: { status }
 */
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await pool.query(
      'UPDATE complaints SET status = ? WHERE id = ?',
      [status, id]
    );

    res.json({
      success: true,
      message: 'Complaint status updated.',
    });
  } catch (error) {
    console.error('[COMPLAINTS PUT ERROR]', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update complaint.',
      error: error.message,
    });
  }
});

export default router;
