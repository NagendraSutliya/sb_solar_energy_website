import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

/**
 * POST /api/auth/login
 * Body: { email, password, role }
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const targetRole = role || 'customer';

    // Query MySQL users table
    const [rows] = await pool.query(
      `SELECT id, name, email, role, phone, status 
       FROM users 
       WHERE LOWER(email) = ? AND password = ? AND status = 'active'
       LIMIT 1`,
      [cleanEmail, password]
    );

    if (!rows || rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: `Invalid email or password for ${targetRole} portal.`,
      });
    }

    const user = rows[0];

    // Check if role matches requested role (or admin can access)
    if (role && user.role !== role && user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: `Access denied. Your account is registered as '${user.role}' not '${role}'.`,
      });
    }

    // Success response with token
    res.json({
      success: true,
      message: 'Login successful',
      token: `sb_session_${user.id}_${Date.now()}`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error('[AUTH LOGIN ERROR]', error);
    res.status(500).json({
      success: false,
      message: 'Database error occurred during login. Please try again later.',
      error: error.message,
    });
  }
});

/**
 * POST /api/auth/register
 * Body: { name, email, password, phone, role }
 */
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required.',
      });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const userRole = role === 'admin' ? 'admin' : 'customer';

    // Check if user already exists
    const [existing] = await pool.query(
      'SELECT id FROM users WHERE LOWER(email) = ? LIMIT 1',
      [cleanEmail]
    );

    if (existing && existing.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists.',
      });
    }

    // Insert user into MySQL
    const [result] = await pool.query(
      `INSERT INTO users (name, email, password, role, phone, status)
       VALUES (?, ?, ?, ?, ?, 'active')`,
      [name.trim(), cleanEmail, password, userRole, phone || '']
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        id: result.insertId,
        name,
        email: cleanEmail,
        role: userRole,
      },
    });
  } catch (error) {
    console.error('[AUTH REGISTER ERROR]', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create user account.',
      error: error.message,
    });
  }
});

export default router;
