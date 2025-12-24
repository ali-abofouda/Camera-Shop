import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { APP_CONFIG } from './config.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

if (!fs.existsSync(APP_CONFIG.uploadDir)) {
  fs.mkdirSync(APP_CONFIG.uploadDir, { recursive: true });
}

// CORS - allow all origins in production since we serve frontend from same server
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static(APP_CONFIG.uploadDir));

// API Routes
app.get('/api/health', (_, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Serve Frontend in Production
const clientDistPath = path.join(__dirname, '../../client/dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(clientDistPath, 'index.html'));
    }
  });
}

app.use((err, req, res, _next) => {
  if (err?.message === 'Not allowed by CORS') {
    return res.status(403).json({ message: 'المصدر غير مسموح' });
  }
  console.error(err);
  return res.status(500).json({ message: 'حدث خطأ غير متوقع' });
});

const PORT = process.env.PORT || APP_CONFIG.port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
