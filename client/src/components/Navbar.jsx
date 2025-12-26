import { NavLink, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Menu, X, ShoppingCart, Sun, Moon, Bell, User } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const navLinks = [
  { to: '/', label: 'الرئيسية' },
  { to: '/products', label: 'المنتجات', dropdown: [
    { to: '/products?cat=cameras', label: 'كاميرات' },
    { to: '/products?cat=accessories', label: 'اكسسوارات' },
  ] },
  { to: '/contact', label: 'تواصل معنا' }
];


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const { user } = useContext(AuthContext) || {};

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  // Notification bar (promo or info)
  const notification = 'عرض خاص: خصم 10% على جميع الكاميرات حتى نهاية الشهر!';

  return (
    <>
      {/* Notification Bar */}
      <div className={`w-full text-center py-2 px-4 text-xs font-semibold bg-gradient-to-r from-accent to-accent-cyber text-white ${scrolled ? 'hidden' : ''}`}>
        <Bell className="inline w-4 h-4 mr-1 align-text-bottom animate-bounce" />
        {notification}
      </div>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-primary-dark/80 backdrop-blur-xl border-b border-surface-border shadow-lg'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-accent rounded-xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
              <div className="relative bg-gradient-to-br from-accent to-accent-cyber p-2.5 rounded-xl">
                <Camera className="h-6 w-6 text-white" strokeWidth={1.5} />
              </div>
            </div>
            <span className="text-xl font-bold hidden sm:inline gradient-text-accent">
              جاد للمراقبة
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <div key={link.to} className="relative group">
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `relative py-2 text-sm font-medium transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-muted hover:text-white'
                    }`
                  }
                  onMouseEnter={() => link.dropdown && setDropdown(link.to)}
                  onMouseLeave={() => link.dropdown && setDropdown(null)}
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-accent-cyber rounded-full"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
                {/* Dropdown */}
                {link.dropdown && dropdown === link.to && (
                  <div className="absolute right-0 mt-2 w-40 bg-primary-dark border border-surface-border rounded-lg shadow-lg z-50 animate-fadeIn">
                    {link.dropdown.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        className="block px-4 py-2 text-sm text-muted hover:text-white hover:bg-accent/20 transition-colors"
                        onClick={() => setDropdown(null)}
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {/* Icons */}
            <Link to="/cart" className="relative ml-4 text-muted hover:text-white">
              <ShoppingCart className="w-5 h-5" />
              {/* Placeholder for cart count */}
              <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full px-1.5 py-0.5">2</span>
            </Link>
            {/* Theme toggle */}
            <button
              className="ml-4 text-muted hover:text-white"
              onClick={() => setDark((d) => !d)}
              aria-label="تبديل الوضع الليلي"
            >
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            {/* User */}
            {user ? (
              <Link to="/dashboard" className="ml-4 flex items-center gap-1 text-muted hover:text-white">
                <User className="w-5 h-5" />
                <span className="hidden sm:inline text-sm">{user.name || 'حسابي'}</span>
              </Link>
            ) : (
              <Link to="/login" className="ml-4 flex items-center gap-1 text-muted hover:text-white">
                <User className="w-5 h-5" />
                <span className="hidden sm:inline text-sm">تسجيل الدخول</span>
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden relative p-2 text-muted hover:text-white transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="فتح القائمة"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-primary-dark/95 backdrop-blur-xl border-t border-surface-border"
            >
              <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
                {navLinks.map((link, index) => (
                  <div key={link.to} className="relative">
                    <NavLink
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `block py-2 text-lg font-medium transition-colors ${
                          isActive ? 'text-accent' : 'text-muted hover:text-white'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                    {/* Dropdown for mobile */}
                    {link.dropdown && (
                      <div className="ml-4 mt-1 flex flex-col gap-1">
                        {link.dropdown.map((item) => (
                          <NavLink
                            key={item.to}
                            to={item.to}
                            onClick={() => setOpen(false)}
                            className="block px-4 py-1 text-sm text-muted hover:text-white hover:bg-accent/20 transition-colors"
                          >
                            {item.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {/* Icons in mobile nav */}
                <div className="flex gap-4 mt-4 items-center">
                  <Link to="/cart" className="relative text-muted hover:text-white">
                    <ShoppingCart className="w-5 h-5" />
                    <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full px-1.5 py-0.5">2</span>
                  </Link>
                  <button
                    className="text-muted hover:text-white"
                    onClick={() => setDark((d) => !d)}
                    aria-label="تبديل الوضع الليلي"
                  >
                    {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </button>
                  {user ? (
                    <Link to="/dashboard" className="flex items-center gap-1 text-muted hover:text-white">
                      <User className="w-5 h-5" />
                      <span className="text-sm">{user.name || 'حسابي'}</span>
                    </Link>
                  ) : (
                    <Link to="/login" className="flex items-center gap-1 text-muted hover:text-white">
                      <User className="w-5 h-5" />
                      <span className="text-sm">تسجيل الدخول</span>
                    </Link>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
