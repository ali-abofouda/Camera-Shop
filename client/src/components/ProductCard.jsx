import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { API_BASE } from '../config';

export default function ProductCard({ product, index = 0 }) {
  const isAvailable = product.status === 'available';
  const imageSrc = product.image_path
    ? `${API_BASE}${product.image_path}`
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card-premium group"
    >
      {/* Image Container with Zoom Effect */}
      <div className="img-zoom relative mb-4">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={product.name_ar}
            className="h-48 w-full object-cover"
          />
        ) : (
          <div className="h-48 w-full bg-gradient-to-br from-primary-light to-primary flex items-center justify-center">
            <Eye className="w-16 h-16 text-muted/30" strokeWidth={1} />
          </div>
        )}
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-lg font-bold mb-2 text-white group-hover:text-accent transition-colors duration-300">
          {product.name_ar}
        </h3>
        <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-2">
          {product.description_ar}
        </p>
        
        {/* Status Badge */}
        <span className={`badge ${isAvailable ? 'badge-available' : 'badge-unavailable'}`}>
          {isAvailable ? '✓ متوفر' : '✕ غير متوفر'}
        </span>
      </div>

      {/* Decorative Corner */}
      <div className="absolute top-0 left-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-accent to-transparent" />
        <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-accent to-transparent" />
      </div>
    </motion.div>
  );
}
