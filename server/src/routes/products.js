import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { APP_CONFIG } from '../config.js';
import { requireAuth } from '../middleware/auth.js';
import { validateProductPayload } from '../validators.js';
import {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from '../db.js';

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, APP_CONFIG.uploadDir),
  filename: (_, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e4)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${unique}${ext}`);
  }
});

const upload = multer({ storage });

const router = Router();

router.get('/', async (req, res) => {
  const products = await listProducts();
  return res.json(products);
});

router.post('/', requireAuth, upload.single('image'), async (req, res) => {
  const { name_ar, description_ar, status } = req.body || {};
  const error = validateProductPayload({ name_ar, description_ar, status });
  if (error) return res.status(400).json({ message: error });
  const image_path = req.file ? `/uploads/${req.file.filename}` : null;
  const product = await createProduct({ name_ar, description_ar, status, image_path });
  return res.status(201).json(product);
});

router.put('/:id', requireAuth, upload.single('image'), async (req, res) => {
  const id = Number(req.params.id);
  const existing = await getProduct(id);
  if (!existing) return res.status(404).json({ message: 'المنتج غير موجود' });
  const { name_ar, description_ar, status } = req.body || {};
  if (status && !['available', 'out_of_stock'].includes(status))
    return res.status(400).json({ message: 'حالة المنتج غير صالحة' });
  let image_path;
  if (req.file) {
    image_path = `/uploads/${req.file.filename}`;
    if (existing.image_path) {
      const oldPath = path.join(APP_CONFIG.uploadDir, path.basename(existing.image_path));
      fs.unlink(oldPath, () => {});
    }
  }
  const updated = await updateProduct(id, { name_ar, description_ar, status, image_path });
  return res.json(updated);
});

router.delete('/:id', requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  const existing = await getProduct(id);
  if (!existing) return res.status(404).json({ message: 'المنتج غير موجود' });
  if (existing.image_path) {
    const oldPath = path.join(APP_CONFIG.uploadDir, path.basename(existing.image_path));
    fs.unlink(oldPath, () => {});
  }
  await deleteProduct(id);
  return res.json({ success: true });
});

export default router;
