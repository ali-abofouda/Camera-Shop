import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';
import { APP_CONFIG } from './config.js';

// Ensure data directory exists
const dbDir = path.dirname(APP_CONFIG.sqlitePath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

let db;

// Initialize database
const initDb = async () => {
  const SQL = await initSqlJs();
  
  // Load existing database or create new one
  if (fs.existsSync(APP_CONFIG.sqlitePath)) {
    const buffer = fs.readFileSync(APP_CONFIG.sqlitePath);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  // Create products table
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name_ar TEXT NOT NULL,
      description_ar TEXT NOT NULL,
      status TEXT NOT NULL CHECK(status IN ('available','out_of_stock')),
      image_path TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Seed with sample data if empty
  const result = db.exec('SELECT COUNT(1) as count FROM products');
  const count = result.length > 0 ? result[0].values[0][0] : 0;
  
  if (count === 0) {
    const sample = [
      {
        name_ar: 'كاميرا مراقبة منزلية بدقة 4K',
        description_ar: 'رؤية ليلية متطورة وتنبيهات فورية عبر الهاتف المحمول.',
        status: 'available',
        image_path: null
      },
      {
        name_ar: 'كاميرا خارجية مضادة للعوامل الجوية',
        description_ar: 'عدسة واسعة بزاوية 110 درجة مع تسجيل مستمر.',
        status: 'available',
        image_path: null
      },
      {
        name_ar: 'مسجل DVR ثماني القنوات',
        description_ar: 'تخزين محلي مشفر ودعم للوصول عن بُعد.',
        status: 'out_of_stock',
        image_path: null
      }
    ];
    
    for (const item of sample) {
      db.run(
        'INSERT INTO products (name_ar, description_ar, status, image_path) VALUES (?, ?, ?, ?)',
        [item.name_ar, item.description_ar, item.status, item.image_path]
      );
    }
  }

  saveDb();
  return db;
};

// Save database to file
const saveDb = () => {
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(APP_CONFIG.sqlitePath, buffer);
};

// Wait for initialization
const dbReady = initDb();

export const getDb = async () => {
  await dbReady;
  return db;
};

export const listProducts = async () => {
  await dbReady;
  const result = db.exec('SELECT * FROM products ORDER BY created_at DESC');
  if (result.length === 0) return [];
  const columns = result[0].columns;
  return result[0].values.map(row => {
    const obj = {};
    columns.forEach((col, i) => obj[col] = row[i]);
    return obj;
  });
};

export const getProduct = async (id) => {
  await dbReady;
  const stmt = db.prepare('SELECT * FROM products WHERE id = ?');
  stmt.bind([id]);
  if (stmt.step()) {
    const row = stmt.getAsObject();
    stmt.free();
    return row;
  }
  stmt.free();
  return null;
};

export const createProduct = async ({ name_ar, description_ar, status, image_path }) => {
  await dbReady;
  db.run(
    'INSERT INTO products (name_ar, description_ar, status, image_path) VALUES (?, ?, ?, ?)',
    [name_ar, description_ar, status, image_path || null]
  );
  const id = db.exec('SELECT last_insert_rowid()')[0].values[0][0];
  saveDb();
  return getProduct(id);
};

export const updateProduct = async (id, { name_ar, description_ar, status, image_path }) => {
  await dbReady;
  const product = await getProduct(id);
  if (!product) return null;
  
  const newImagePath = image_path !== undefined ? image_path : product.image_path;
  db.run(
    'UPDATE products SET name_ar=?, description_ar=?, status=?, image_path=? WHERE id=?',
    [
      name_ar || product.name_ar,
      description_ar || product.description_ar,
      status || product.status,
      newImagePath,
      id
    ]
  );
  saveDb();
  return getProduct(id);
};

export const deleteProduct = async (id) => {
  await dbReady;
  db.run('DELETE FROM products WHERE id=?', [id]);
  saveDb();
  return { changes: 1 };
};
