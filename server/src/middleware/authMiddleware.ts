import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import pool from '../db';

interface AuthRequest extends Request {
  user?: { id: string; role: string; organization_id: string };
}

export type AuthenticatedRequest = AuthRequest;

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      
      // Verify the token using the secret key from environment variables
      const decoded = jwt.verify(token, process.env.STACK_SECRET_SERVER_KEY!) as { sub: string };

      // The 'sub' claim in a standard JWT typically holds the user ID
      const userId = decoded.sub;

      const result = await pool.query('SELECT id, role, organization_id FROM users WHERE id = $1', [userId]);

      if (result.rows.length > 0) {
        req.user = result.rows[0];
        next();
      } else {
        res.status(401).json({ message: 'Not authorized, user not found' });
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export const admin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};
