import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { APP_CONFIG } from '../config.js';

const router = Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ message: 'اسم المستخدم وكلمة المرور مطلوبان' });
  if (username !== APP_CONFIG.adminUsername)
    return res.status(401).json({ message: 'بيانات الاعتماد غير صحيحة' });
  const ok = await bcrypt.compare(password, APP_CONFIG.adminPasswordHash);
  if (!ok) return res.status(401).json({ message: 'بيانات الاعتماد غير صحيحة' });
  const token = jwt.sign({ username }, APP_CONFIG.jwtSecret, { expiresIn: '1d' });
  return res.json({ token, user: { username } });
});

router.get('/me', (req, res) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'غير مصرح' });
  try {
    const payload = jwt.verify(token, APP_CONFIG.jwtSecret);
    return res.json({ user: { username: payload.username } });
  } catch (err) {
    return res.status(401).json({ message: 'الجلسة غير صالحة' });
  }
});

export default router;
