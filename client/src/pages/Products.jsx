import { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      <h1 className="section-title text-center mb-10">منتجاتنا</h1>
      {loading ? (
        <p className="text-center text-muted">جارٍ التحميل...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-muted">لا توجد منتجات حالياً.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
