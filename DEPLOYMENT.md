# Deployment Guide - جاد للمراقبة

## 🚀 الطريقة الأسهل: Railway (مجاني - موصى به)

### الخطوات:

1. **اعمل حساب على Railway:**
   - روح على [railway.app](https://railway.app)
   - سجل بحساب GitHub

2. **اعمل Deploy:**
   - اضغط "New Project"
   - اختار "Deploy from GitHub repo"
   - اختار repo: `Camera-Shop`
   - Railway هيكتشف الـ settings تلقائياً

3. **ضيف الـ Environment Variables:**
   - روح Settings > Variables
   - ضيف:
     ```
     NODE_ENV=production
     JWT_SECRET=your-super-secret-key-here
     ADMIN_PASSWORD_HASH=$2a$10$6i/huJScjSnwYYe0HX9X2OhOBIrqQ3S4Xon/ClY47FXs2zNnIDDFu
     ```

4. **خلاص!** هتاخد domain زي: `gad-cctv.up.railway.app`

---

## 🌐 بديل: Render (مجاني)

1. روح [render.com](https://render.com)
2. سجل بـ GitHub
3. اختار "New Web Service"
4. اختار الـ repo
5. Render هيستخدم `render.yaml` تلقائياً

---

## 💻 بديل: VPS (DigitalOcean/Hostinger)

### لو عندك VPS:

```bash
# 1. Clone the repo
git clone https://github.com/ali-abofouda/Camera-Shop.git
cd Camera-Shop

# 2. Install dependencies
cd client && npm install && npm run build
cd ../server && npm install

# 3. Setup environment
cp .env.example .env
nano .env  # Edit your settings

# 4. Install PM2
npm install -g pm2

# 5. Start the server
pm2 start server/src/index.js --name "gad-cctv"
pm2 save
pm2 startup

# 6. Setup Nginx (optional - for domain)
sudo apt install nginx
```

### Nginx Config:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🔐 ملاحظات مهمة

1. **غير الـ JWT_SECRET** في الـ production لحاجة قوية
2. **غير password الـ Admin** بعد أول login
3. **الـ Database** (SQLite) محفوظة في `/server/data/database.sqlite`
   - لو عايز backup، انسخ الملف ده

---

## 📱 بعد الـ Deployment

- الموقع: `https://your-domain.com`
- لوحة التحكم: `https://your-domain.com/admin`
- Username: `admin`
- Password: `admin123` (غيره فوراً!)
