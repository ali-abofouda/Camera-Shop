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
    '$2b$10$dXJ3se.kBwKsFcwTmyaKOeY.bakdUSHh3D1ynjUTduVdJN9WewtG6',
  sqlitePath: process.env.SQLITE_PATH || path.join(__dirname, '..', 'data.sqlite'),
  uploadDir: process.env.UPLOAD_DIR || path.join(__dirname, '..', 'uploads')
};
