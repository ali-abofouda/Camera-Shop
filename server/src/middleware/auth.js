import jwt from 'jsonwebtoken';
import { APP_CONFIG } from '../config.js';

export const requireAuth = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'غير مصرح' });
  try {
    const payload = jwt.verify(token, APP_CONFIG.jwtSecret);
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'انتهت صلاحية الجلسة، يرجى تسجيل الدخول' });
  }
};
