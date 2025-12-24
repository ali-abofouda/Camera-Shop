import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phone = '201012345678'; // Replace with your actual WhatsApp number
  const text = encodeURIComponent('مرحبًا، أود الاستفسار عن خدمات كاميرات المراقبة.');
  
  return (
    <motion.a
      href={`https://wa.me/${phone}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="تواصل واتساب"
    >
      {/* Pulse rings */}
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25" />
      <span className="absolute inset-0 rounded-full bg-green-500 animate-pulse opacity-40" style={{ animationDelay: '0.5s' }} />
      
      {/* Button */}
      <div className="relative bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full p-4 shadow-lg shadow-green-500/30">
        <MessageCircle className="w-7 h-7" fill="currentColor" />
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-primary-light text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-surface-border">
        تواصل معنا عبر واتساب
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-primary-light" />
      </div>
    </motion.a>
  );
}
