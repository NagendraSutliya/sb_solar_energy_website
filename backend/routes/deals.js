import { Router } from 'express';
import pool from '../config/db.js';

const router = Router();

// GET /api/deals - Fetch all deals
router.get('/', async (req, res) => {
  try {
    const { stage, owner } = req.query;
    let query = 'SELECT * FROM deals WHERE 1=1';
    const params = [];

    if (stage && stage !== 'all') {
      query += ' AND stage = ?';
      params.push(stage);
    }

    if (owner && owner !== 'All owners') {
      query += ' AND owner = ?';
      params.push(owner);
    }

    query += ' ORDER BY created_at DESC';

    const [rows] = await pool.query(query, params);
    
    // Map to camelCase expected by frontend Deal interface
    const mapped = rows.map(r => ({
      id: r.deal_code || `deal-${r.id}`,
      dbId: r.id,
      name: r.name || r.customer,
      customer: r.customer,
      projectType: r.project_type,
      value: r.value,
      stage: r.stage,
      tag: r.tag,
      tagColor: r.tag_color || 'blue',
      owner: r.owner,
      createdAt: r.created_at,
    }));

    res.json({ success: true, data: mapped });
  } catch (error) {
    console.error('Error in GET /api/deals:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/deals - Create a deal
router.post('/', async (req, res) => {
  try {
    const { name, customer, projectType, value = 0, stage = 'qualified', tag = '', tagColor = 'blue', owner = 'Rahul' } = req.body;
    
    const custName = customer || name;
    if (!custName || !projectType) {
      return res.status(400).json({ success: false, message: 'Customer and project type are required' });
    }

    const dealCode = `deal-${Date.now()}`;

    const [result] = await pool.query(
      `INSERT INTO deals (deal_code, name, customer, project_type, value, stage, tag, tag_color, owner)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [dealCode, name || custName, custName, projectType, value, stage, tag, tagColor, owner]
    );

    const [created] = await pool.query('SELECT * FROM deals WHERE id = ?', [result.insertId]);
    const r = created[0];
    
    res.status(201).json({
      success: true,
      data: {
        id: r.deal_code || `deal-${r.id}`,
        dbId: r.id,
        name: r.name,
        customer: r.customer,
        projectType: r.project_type,
        value: r.value,
        stage: r.stage,
        tag: r.tag,
        tagColor: r.tag_color,
        owner: r.owner,
        createdAt: r.created_at,
      }
    });
  } catch (error) {
    console.error('Error in POST /api/deals:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/deals/:id - Update deal stage/value/owner
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { stage, value, owner, tag, tagColor, customer, projectType } = req.body;

    // Search by deal_code or primary key id
    await pool.query(
      `UPDATE deals
       SET stage = COALESCE(?, stage),
           value = COALESCE(?, value),
           owner = COALESCE(?, owner),
           tag = COALESCE(?, tag),
           tag_color = COALESCE(?, tag_color),
           customer = COALESCE(?, customer),
           project_type = COALESCE(?, project_type)
       WHERE id = ? OR deal_code = ?`,
      [stage, value, owner, tag, tagColor, customer, projectType, id, id]
    );

    const [rows] = await pool.query('SELECT * FROM deals WHERE id = ? OR deal_code = ?', [id, id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Deal not found' });
    }

    const r = rows[0];
    res.json({
      success: true,
      data: {
        id: r.deal_code || `deal-${r.id}`,
        dbId: r.id,
        name: r.name,
        customer: r.customer,
        projectType: r.project_type,
        value: r.value,
        stage: r.stage,
        tag: r.tag,
        tagColor: r.tag_color,
        owner: r.owner,
        createdAt: r.created_at,
      }
    });
  } catch (error) {
    console.error('Error in PUT /api/deals/:id:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/deals/:id - Delete deal
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM deals WHERE id = ? OR deal_code = ?', [id, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Deal not found' });
    }
    res.json({ success: true, message: 'Deal deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/deals/:id:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

