import { Router } from 'express';
import pool from '../db';
import type { AuthenticatedRequest } from '../middleware/authMiddleware';

const router = Router();

// Get inventory accessible by the user
router.get('/', async (req: AuthenticatedRequest, res) => {
  const { id: userId, role, organization_id: orgId } = req.user!;

  try {
    let query;
    const params = [orgId];

    if (role === 'admin') {
      // Admins can see all inventory for their organization
      query = 'SELECT * FROM inventory_items WHERE organization_id = $1';
    } else {
      // Staff can only see inventory from their assigned categories
      query = `
        SELECT i.* FROM inventory_items i
        JOIN user_category_access uca ON i.category_id = uca.category_id
        WHERE i.organization_id = $1 AND uca.user_id = $2
      `;
      params.push(userId);
    }

    const result = await pool.query(query, params);
    res.json(result.rows);

  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
