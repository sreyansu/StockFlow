import { Router } from 'express';
import pool from '../db';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

const router = Router();

// Get unapproved staff
router.get('/staff/unapproved', async (req: AuthenticatedRequest, res) => {
  try {
    const result = await pool.query(
      'SELECT id, first_name, last_name, email FROM users WHERE organization_id = $1 AND role = $2 AND approved = $3',
      [req.user!.orgId, 'staff', false]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching unapproved staff:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Approve staff
router.put('/staff/approve/:id', async (req: AuthenticatedRequest, res) => {
  try {
    await pool.query('UPDATE users SET approved = true WHERE id = $1 AND organization_id = $2',
     [req.params.id, req.user!.orgId]);
    res.json({ message: 'Staff member approved' });
  } catch (error) {
    console.error('Error approving staff:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create inventory category
router.post('/categories', async (req: AuthenticatedRequest, res) => {
  const { name } = req.body;
  try {
    await pool.query('INSERT INTO inventory_categories (organization_id, name) VALUES ($1, $2)',
     [req.user!.orgId, name]);
    res.status(201).json({ message: 'Category created' });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Assign staff to category
router.post('/staff/assign-category', async (req: AuthenticatedRequest, res) => {
  const { userId, categoryId } = req.body;
  try {
    // Ensure the user and category belong to the admin's organization
    const userResult = await pool.query('SELECT id FROM users WHERE id = $1 AND organization_id = $2', [userId, req.user!.orgId]);
    const categoryResult = await pool.query('SELECT id FROM inventory_categories WHERE id = $1 AND organization_id = $2', [categoryId, req.user!.orgId]);

    if (userResult.rows.length === 0 || categoryResult.rows.length === 0) {
      return res.status(404).json({ message: 'User or category not found in your organization.' });
    }

    await pool.query('INSERT INTO user_category_access (user_id, category_id) VALUES ($1, $2)',
     [userId, categoryId]);
    res.status(201).json({ message: 'Staff assigned to category' });
  } catch (error) {
    console.error('Error assigning category:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
