import { Camera, Phone, MapPin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative mt-auto border-t border-surface-border">
      {/* Glow effect at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid gap-8 sm:gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-accent to-accent-cyber p-2 rounded-lg">
                <Camera className="h-5 w-5 text-white" strokeWidth={1.5} />
              </div>
              <span className="text-lg font-bold">جاد للمراقبة</span>
            </Link>
            <p className="text-muted text-sm leading-relaxed">
              نوفر لك أحدث أنظمة المراقبة والكاميرات الأمنية بأعلى جودة.
              خدمة احترافية وضمان شامل في الغربية ومصر.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">روابط سريعة</h4>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'الرئيسية' },
                { to: '/products', label: 'المنتجات' },
                { to: '/contact', label: 'تواصل معنا' }
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-muted hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-white">تواصل معنا</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-muted text-sm">
                <Phone className="w-4 h-4 text-accent" />
                <span dir="ltr">+20 10 1234 5678</span>
              </li>
              <li className="flex items-center gap-3 text-muted text-sm">
                <MapPin className="w-4 h-4 text-accent" />
                <span>الراهبين، سمنود، الغربية</span>
              </li>
              <li className="flex items-center gap-3 text-muted text-sm">
                <Mail className="w-4 h-4 text-accent" />
                <span>info@eye-security.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 sm:mt-10 pt-6 border-t border-surface-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted text-xs sm:text-sm text-center">
            &copy; {new Date().getFullYear()} جاد للمراقبة. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-6">
            <span className="text-muted/50 text-xs">صنع بـ ❤️ في مصر</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
