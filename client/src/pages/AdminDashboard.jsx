import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '../services/api';
import { API_BASE } from '../config';

export default function AdminDashboard() {
  const { user, logout, loading: authLoading } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name_ar: '', description_ar: '', status: 'available', image: null });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setLoading(true);
    fetchProducts()
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  };

  if (authLoading) return null;
  if (!user) return <Navigate to="/admin/login" replace />;

  const resetForm = () => {
    setForm({ name_ar: '', description_ar: '', status: 'available', image: null });
    setEditing(null);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name_ar.trim() || !form.description_ar.trim()) {
      setError('الاسم والوصف مطلوبان');
      return;
    }
    setError('');
    setSubmitting(true);
    const formData = new FormData();
    formData.append('name_ar', form.name_ar);
    formData.append('description_ar', form.description_ar);
    formData.append('status', form.status);
    if (form.image) formData.append('image', form.image);

    try {
      if (editing) {
        await updateProduct(editing, formData);
      } else {
        await createProduct(formData);
      }
      resetForm();
      loadProducts();
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (p) => {
    setEditing(p.id);
    setForm({ name_ar: p.name_ar, description_ar: p.description_ar, status: p.status, image: null });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('هل أنت متأكد من حذف هذا المنتج؟')) return;
    try {
      await deleteProduct(id);
      loadProducts();
    } catch {
      alert('فشل في حذف المنتج');
    }
  };

  return (
    <section className="py-10 px-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">لوحة التحكم</h1>
        <button onClick={logout} className="text-muted hover:text-white transition text-sm">
          تسجيل الخروج
        </button>
      </div>

      <form onSubmit={handleSubmit} className="glass p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">{editing ? 'تعديل المنتج' : 'إضافة منتج جديد'}</h2>
        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="اسم المنتج"
            value={form.name_ar}
            onChange={(e) => setForm({ ...form, name_ar: e.target.value })}
            className="bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="available">متوفر</option>
            <option value="out_of_stock">غير متوفر</option>
          </select>
          <textarea
            placeholder="وصف المنتج"
            rows={3}
            value={form.description_ar}
            onChange={(e) => setForm({ ...form, description_ar: e.target.value })}
            className="md:col-span-2 bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] || null })}
            className="md:col-span-2 text-muted"
          />
        </div>
        <div className="flex gap-3 mt-4">
          <button
            type="submit"
            disabled={submitting}
            className="bg-accent hover:bg-accent/80 text-white px-6 py-2 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {submitting ? 'جارٍ الحفظ...' : editing ? 'تحديث' : 'إضافة'}
          </button>
          {editing && (
            <button type="button" onClick={resetForm} className="text-muted hover:text-white transition">
              إلغاء
            </button>
          )}
        </div>
      </form>

      <h2 className="text-xl font-semibold mb-4">المنتجات</h2>
      {loading ? (
        <p className="text-muted">جارٍ التحميل...</p>
      ) : products.length === 0 ? (
        <p className="text-muted">لا توجد منتجات.</p>
      ) : (
        <div className="grid gap-4">
          {products.map((p) => (
            <div key={p.id} className="glass p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              {p.image_path ? (
                <img
                  src={`${API_BASE}${p.image_path}`}
                  alt={p.name_ar}
                  className="h-20 w-28 object-cover rounded-lg flex-shrink-0"
                />
              ) : (
                <div className="h-20 w-28 bg-white/10 rounded-lg flex items-center justify-center text-muted flex-shrink-0">
                  <span className="text-xs">لا توجد صورة</span>
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-semibold">{p.name_ar}</h3>
                <p className="text-muted text-sm line-clamp-1">{p.description_ar}</p>
                <span
                  className={`badge mt-1 ${
                    p.status === 'available' ? 'bg-green-600/80' : 'bg-red-600/80'
                  } text-white`}
                >
                  {p.status === 'available' ? 'متوفر' : 'غير متوفر'}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="text-accent hover:underline text-sm"
                >
                  تعديل
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-red-400 hover:underline text-sm"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
