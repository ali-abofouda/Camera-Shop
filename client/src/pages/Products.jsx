import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Search } from 'lucide-react';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter((p) => {
    if (filter === 'all') return true;
    return p.status === filter;
  });

  return (
    <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 min-h-screen">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="section-title text-2xl sm:text-3xl md:text-4xl">منتجاتنا</h1>
          <p className="section-subtitle">
            اكتشف مجموعتنا المتنوعة من كاميرات المراقبة وأنظمة الحماية
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10"
        >
          {[
            { value: 'all', label: 'الكل' },
            { value: 'available', label: 'متوفر' },
            { value: 'out_of_stock', label: 'غير متوفر' }
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                filter === tab.value
                  ? 'bg-accent text-white shadow-glow'
                  : 'glass-subtle text-muted hover:text-white hover:border-accent/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin mb-4" />
            <p className="text-muted">جارٍ تحميل المنتجات...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-surface flex items-center justify-center">
              <Package className="w-10 h-10 text-muted" strokeWidth={1} />
            </div>
            <p className="text-muted text-lg">لا توجد منتجات حالياً</p>
          </motion.div>
        ) : (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((p, index) => (
              <ProductCard key={p.id} product={p} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
