import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const APP_CONFIG = {
  port: process.env.PORT || 5000,
  clientOrigins: (process.env.CLIENT_ORIGINS || 'http://localhost:5173').split(',').map((o) => o.trim()),
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-change-me',
  adminUsername: process.env.ADMIN_USERNAME || 'admin',
  adminPasswordHash:
    process.env.ADMIN_PASSWORD_HASH ||
    '$2a$10$6i/huJScjSnwYYe0HX9X2OhOBIrqQ3S4Xon/ClY47FXs2zNnIDDFu',
  sqlitePath: process.env.SQLITE_PATH || path.join(__dirname, '..', 'data.sqlite'),
  uploadDir: process.env.UPLOAD_DIR || path.join(__dirname, '..', 'uploads')
};
