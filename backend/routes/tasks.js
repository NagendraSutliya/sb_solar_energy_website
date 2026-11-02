import { Router } from 'express';
import pool from '../config/db.js';

const router = Router();

// GET /api/tasks - Fetch tasks
router.get('/', async (req, res) => {
  try {
    const { section } = req.query;
    let query = 'SELECT * FROM tasks WHERE 1=1';
    const params = [];

    if (section) {
      query += ' AND section = ?';
      params.push(section);
    }

    query += ' ORDER BY completed ASC, created_at DESC';

    const [rows] = await pool.query(query, params);
    
    // Map to frontend Task interface
    const mapped = rows.map(r => ({
      id: `task-${r.id}`,
      dbId: r.id,
      title: r.title,
      time: r.time || r.subtitle,
      type: r.type || 'Deal',
      completed: Boolean(r.completed),
      section: r.section,
    }));

    res.json({ success: true, data: mapped });
  } catch (error) {
    console.error('Error in GET /api/tasks:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/tasks - Create task
router.post('/', async (req, res) => {
  try {
    const { title, time = 'Today', type = 'Task', section = 'today', completed = false } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    const [result] = await pool.query(
      `INSERT INTO tasks (title, subtitle, time, type, section, completed)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [title, time, time, type, section, completed ? 1 : 0]
    );

    const [created] = await pool.query('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
    const r = created[0];
    
    res.status(201).json({
      success: true,
      data: {
        id: `task-${r.id}`,
        dbId: r.id,
        title: r.title,
        time: r.time || r.subtitle,
        type: r.type,
        completed: Boolean(r.completed),
        section: r.section,
      }
    });
  } catch (error) {
    console.error('Error in POST /api/tasks:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/tasks/:id - Update task (e.g. toggle completed)
router.put('/:id', async (req, res) => {
  try {
    const rawId = req.params.id.replace('task-', '');
    const { title, time, type, section, completed } = req.body;

    await pool.query(
      `UPDATE tasks
       SET title = COALESCE(?, title),
           time = COALESCE(?, time),
           subtitle = COALESCE(?, subtitle),
           type = COALESCE(?, type),
           section = COALESCE(?, section),
           completed = COALESCE(?, completed)
       WHERE id = ?`,
      [title, time, time, type, section, completed !== undefined ? (completed ? 1 : 0) : null, rawId]
    );

    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [rawId]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    const r = rows[0];
    res.json({
      success: true,
      data: {
        id: `task-${r.id}`,
        dbId: r.id,
        title: r.title,
        time: r.time || r.subtitle,
        type: r.type,
        completed: Boolean(r.completed),
        section: r.section,
      }
    });
  } catch (error) {
    console.error('Error in PUT /api/tasks/:id:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/tasks/:id - Delete task
router.delete('/:id', async (req, res) => {
  try {
    const rawId = req.params.id.replace('task-', '');
    const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [rawId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    res.json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/tasks/:id:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

