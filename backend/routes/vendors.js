import { Router } from 'express';
import pool from '../config/db.js';

const router = Router();

// GET /api/vendors - Fetch all vendors
router.get('/', async (req, res) => {
  try {
    const { district, status, type } = req.query;
    let query = 'SELECT * FROM vendors WHERE 1=1';
    const params = [];

    if (district) {
      query += ' AND district = ?';
      params.push(district);
    }

    if (status && status !== 'all') {
      query += ' AND status = ?';
      params.push(status);
    }

    if (type && type !== 'all') {
      query += ' AND business_type = ?';
      params.push(type);
    }

    query += ' ORDER BY is_official_hub DESC, rating DESC, created_at DESC';

    const [rows] = await pool.query(query, params);

    // Map to frontend Vendor interface
    const mapped = rows.map(r => {
      let parsedTags = [];
      try {
        parsedTags = r.tags ? (typeof r.tags === 'string' ? JSON.parse(r.tags) : r.tags) : [];
      } catch {
        parsedTags = r.tags ? r.tags.split(',').map(t => t.trim()) : [];
      }

      return {
        id: r.vendor_code || `v-${r.id}`,
        dbId: r.id,
        name: r.name,
        contactPerson: r.contact_person || '',
        email: r.email || '',
        contact: r.contact || '',
        address: r.address || '',
        state: r.state || 'Rajasthan',
        district: r.district || '',
        businessType: r.business_type || 'dealer',
        rating: Number(r.rating) || 4.8,
        reviewCount: r.review_count || 0,
        status: r.status || 'Pending',
        tags: parsedTags,
        registeredAt: r.created_at,
        isOfficialHub: Boolean(r.is_official_hub),
      };
    });

    res.json({ success: true, data: mapped });
  } catch (error) {
    console.error('Error in GET /api/vendors:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/vendors - Create / Register vendor
router.post('/', async (req, res) => {
  try {
    const {
      name,
      contactPerson = '',
      email = '',
      contact = '',
      address = '',
      state = 'Rajasthan',
      district = '',
      businessType = 'dealer',
      rating = 5.0,
      status = 'Pending',
      tags = [],
      isOfficialHub = false
    } = req.body;

    if (!name || !contact) {
      return res.status(400).json({ success: false, message: 'Vendor name and contact number are required' });
    }

    const vendorCode = `v-${Date.now()}`;
    const stringifiedTags = JSON.stringify(Array.isArray(tags) ? tags : [tags]);

    const [result] = await pool.query(
      `INSERT INTO vendors (vendor_code, name, contact_person, email, contact, address, state, district, business_type, rating, status, tags, is_official_hub)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [vendorCode, name, contactPerson, email, contact, address, state, district, businessType, rating, status, stringifiedTags, isOfficialHub ? 1 : 0]
    );

    const [created] = await pool.query('SELECT * FROM vendors WHERE id = ?', [result.insertId]);
    const r = created[0];

    res.status(201).json({
      success: true,
      data: {
        id: r.vendor_code || `v-${r.id}`,
        dbId: r.id,
        name: r.name,
        contactPerson: r.contact_person,
        email: r.email,
        contact: r.contact,
        address: r.address,
        state: r.state,
        district: r.district,
        businessType: r.business_type,
        rating: Number(r.rating),
        reviewCount: r.review_count,
        status: r.status,
        tags: JSON.parse(r.tags || '[]'),
        registeredAt: r.created_at,
        isOfficialHub: Boolean(r.is_official_hub),
      }
    });
  } catch (error) {
    console.error('Error in POST /api/vendors:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/vendors/:id - Update vendor status/details
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, rating, tags, name, contactPerson, email, contact, address, district, businessType } = req.body;

    const stringifiedTags = tags ? JSON.stringify(tags) : null;

    await pool.query(
      `UPDATE vendors
       SET status = COALESCE(?, status),
           rating = COALESCE(?, rating),
           tags = COALESCE(?, tags),
           name = COALESCE(?, name),
           contact_person = COALESCE(?, contact_person),
           email = COALESCE(?, email),
           contact = COALESCE(?, contact),
           address = COALESCE(?, address),
           district = COALESCE(?, district),
           business_type = COALESCE(?, business_type)
       WHERE id = ? OR vendor_code = ?`,
      [status, rating, stringifiedTags, name, contactPerson, email, contact, address, district, businessType, id, id]
    );

    const [rows] = await pool.query('SELECT * FROM vendors WHERE id = ? OR vendor_code = ?', [id, id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Vendor not found' });
    }

    const r = rows[0];
    res.json({
      success: true,
      data: {
        id: r.vendor_code || `v-${r.id}`,
        dbId: r.id,
        name: r.name,
        contactPerson: r.contact_person,
        email: r.email,
        contact: r.contact,
        address: r.address,
        state: r.state,
        district: r.district,
        businessType: r.business_type,
        rating: Number(r.rating),
        reviewCount: r.review_count,
        status: r.status,
        tags: JSON.parse(r.tags || '[]'),
        registeredAt: r.created_at,
        isOfficialHub: Boolean(r.is_official_hub),
      }
    });
  } catch (error) {
    console.error('Error in PUT /api/vendors/:id:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/vendors/:id - Delete vendor
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM vendors WHERE id = ? OR vendor_code = ?', [id, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Vendor not found' });
    }
    res.json({ success: true, message: 'Vendor deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/vendors/:id:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

