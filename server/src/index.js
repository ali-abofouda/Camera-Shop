import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { APP_CONFIG } from './config.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';

const app = express();

if (!fs.existsSync(APP_CONFIG.uploadDir)) {
  fs.mkdirSync(APP_CONFIG.uploadDir, { recursive: true });
}

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || APP_CONFIG.clientOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static(APP_CONFIG.uploadDir));

app.get('/api/health', (_, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.use((err, req, res, _next) => {
  if (err?.message === 'Not allowed by CORS') {
    return res.status(403).json({ message: 'المصدر غير مسموح' });
  }
  console.error(err);
  return res.status(500).json({ message: 'حدث خطأ غير متوقع' });
});

app.listen(APP_CONFIG.port, () => {
  console.log(`API running on port ${APP_CONFIG.port}`);
});
