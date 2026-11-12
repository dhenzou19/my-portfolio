// backend/src/adminAuth.ts
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const ADMIN_SECRET = process.env.JWT_SECRET!;

export const verifyAdmin = (req: any, res: any, next: any) => {
  const token = req.cookies.admin_token;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    jwt.verify(token, ADMIN_SECRET);
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
};