import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';

const navLinks = [
  { to: '/', label: 'الرئيسية' },
  { to: '/products', label: 'المنتجات' },
  { to: '/contact', label: 'تواصل معنا' }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 glass py-4 px-6 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3 group">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-9 w-9 text-accent group-hover:scale-110 transition"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z"
          />
          <rect x="3" y="6" width="12" height="12" rx="2" ry="2" />
        </svg>
        <span className="text-xl font-bold hidden sm:inline">عين الحماية</span>
      </Link>

      <nav className="hidden md:flex gap-6">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `hover:text-accent transition ${isActive ? 'text-accent font-semibold' : 'text-muted'}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <button className="md:hidden text-muted" onClick={() => setOpen(!open)}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 w-full glass md:hidden flex flex-col py-4 px-6 gap-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `hover:text-accent transition ${isActive ? 'text-accent' : 'text-muted'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
