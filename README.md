# CCTV & Security Cameras Shop - Egypt 🎥

A modern, production-ready website for a CCTV and security cameras shop in Egypt. Features a public-facing storefront with full Arabic RTL support and a protected admin dashboard for product management.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-green.svg)

---

## ✨ Features

### Public Website (Customer Side)
- 🌙 **Dark tech theme** - Modern design with black, dark blue, and gray colors
- 🌍 **Full Arabic RTL support** - Native right-to-left layout
- 📱 **Fully responsive** - Optimized for mobile, tablet, and desktop
- 🏠 **Home page** - Hero section with services overview
- 📦 **Products page** - Card-based product catalog with availability status
- 📞 **Contact page** - Phone numbers, address, and embedded Google Map
- 💬 **WhatsApp button** - Floating button with pre-filled Arabic message

### Admin Dashboard
- 🔐 **Secure authentication** - JWT-based login with bcrypt password hashing
- ➕ **Product CRUD** - Add, edit, and delete products
- 🖼️ **Image uploads** - Upload and manage product images locally
- 🔄 **Status toggle** - Mark products as available or out of stock

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | SQLite (sql.js) |
| Authentication | JWT, bcryptjs |
| File Upload | Multer |

---

## 📁 Project Structure

```
Camera Shop Website/
├── client/                     # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── WhatsAppButton.jsx
│   │   ├── context/            # React Context (Auth)
│   │   │   └── AuthContext.jsx
│   │   ├── pages/              # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Login.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── services/           # API client
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── config.js
│   │   └── index.css
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── server/                     # Backend (Express)
│   ├── src/
│   │   ├── routes/
│   │   │   ├── auth.js         # Authentication routes
│   │   │   └── products.js     # Product CRUD routes
│   │   ├── middleware/
│   │   │   └── auth.js         # JWT verification
│   │   ├── config.js           # App configuration
│   │   ├── db.js               # Database setup & queries
│   │   ├── validators.js       # Input validation
│   │   └── index.js            # Express server entry
│   ├── uploads/                # Product images storage
│   ├── .env.example
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or higher
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/cctv-shop-egypt.git
   cd cctv-shop-egypt
   ```

2. **Setup Backend**
   ```bash
   cd server
   cp .env.example .env    # Configure environment variables
   npm install
   npm run dev
   ```
   Server runs at: `http://localhost:5000`

3. **Setup Frontend** (in a new terminal)
   ```bash
   cd client
   cp .env.example .env    # Configure API URL if needed
   npm install
   npm run dev
   ```
   Frontend runs at: `http://localhost:5173`

---

## ⚙️ Configuration

### Server Environment Variables (`server/.env`)

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `CLIENT_ORIGINS` | Allowed CORS origins (comma-separated) | `http://localhost:5173` |
| `JWT_SECRET` | Secret key for JWT signing | `dev-secret-change-me` |
| `ADMIN_USERNAME` | Admin login username | `admin` |
| `ADMIN_PASSWORD_HASH` | Bcrypt hash of admin password | (hash of `admin123`) |

### Client Environment Variables (`client/.env`)

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000` |

### Generate New Password Hash

```bash
node -e "console.log(require('bcryptjs').hashSync('your-new-password', 10))"
```

---

## 🔑 Default Admin Credentials

| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `admin123` |

> ⚠️ **Important:** Change the default password before deploying to production!

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/login` | Admin login | ❌ |
| `GET` | `/api/auth/me` | Verify session | ✅ |

### Products

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/products` | List all products | ❌ |
| `POST` | `/api/products` | Create product | ✅ |
| `PUT` | `/api/products/:id` | Update product | ✅ |
| `DELETE` | `/api/products/:id` | Delete product | ✅ |

---

## 🎨 Customization

### Change WhatsApp Number
Edit `client/src/components/WhatsAppButton.jsx`:
```javascript
const phone = '201012345678'; // Replace with your number
```

### Change Google Map Location
Edit `client/src/pages/Contact.jsx` and update the iframe `src` URL.

### Change Theme Colors
Edit `client/tailwind.config.js`:
```javascript
colors: {
  primary: '#0f172a',    // Background
  accent: '#1d4ed8',     // Accent color
  muted: '#94a3b8'       // Muted text
}
```

---

## 🏗️ Production Build

### Build Frontend
```bash
cd client
npm run build
```
Output in `dist/` folder - deploy to any static hosting (Netlify, Vercel, etc.)

### Run Backend in Production
```bash
cd server
NODE_ENV=production npm start
```

---

## 📝 License

This project is licensed under the MIT License.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📧 Contact

For questions or support, please open an issue on GitHub.
