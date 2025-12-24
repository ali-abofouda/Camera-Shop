import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Edit2, Trash2, LogOut, Package, Image, Check, X, 
  Upload, Save, Camera, AlertCircle 
} from 'lucide-react';
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
  const [imagePreview, setImagePreview] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

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
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
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
    setImagePreview(p.image_path ? `${API_BASE}${p.image_path}` : null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setDeleteConfirm(null);
      loadProducts();
    } catch {
      alert('فشل في حذف المنتج');
    }
  };

  return (
    <section className="pt-28 pb-20 px-6 min-h-screen">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-10"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent-cyber flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">لوحة التحكم</h1>
              <p className="text-muted text-sm">مرحباً، {user.username}</p>
            </div>
          </div>
          <button 
            onClick={logout} 
            className="flex items-center gap-2 text-muted hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-surface"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:inline">تسجيل الخروج</span>
          </button>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-premium p-6 md:p-8 mb-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${editing ? 'bg-amber-500/20' : 'bg-accent/20'}`}>
              {editing ? <Edit2 className="w-5 h-5 text-amber-400" /> : <Plus className="w-5 h-5 text-accent" />}
            </div>
            <h2 className="text-xl font-semibold">{editing ? 'تعديل المنتج' : 'إضافة منتج جديد'}</h2>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm mb-6"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="block text-sm text-muted mb-2">اسم المنتج</label>
                <input
                  type="text"
                  placeholder="أدخل اسم المنتج"
                  value={form.name_ar}
                  onChange={(e) => setForm({ ...form, name_ar: e.target.value })}
                  className="input-premium"
                />
              </div>
              <div>
                <label className="block text-sm text-muted mb-2">حالة المنتج</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="input-premium"
                >
                  <option value="available">متوفر</option>
                  <option value="out_of_stock">غير متوفر</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-muted mb-2">وصف المنتج</label>
                <textarea
                  placeholder="أدخل وصف المنتج"
                  rows={3}
                  value={form.description_ar}
                  onChange={(e) => setForm({ ...form, description_ar: e.target.value })}
                  className="input-premium resize-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-muted mb-2">صورة المنتج</label>
                <div className="flex items-start gap-4">
                  <label className="flex-1 cursor-pointer">
                    <div className="input-premium flex items-center justify-center gap-3 py-8 border-dashed hover:border-accent/50 transition-colors">
                      <Upload className="w-6 h-6 text-muted" />
                      <span className="text-muted">اختر صورة أو اسحبها هنا</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  {imagePreview && (
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-surface-border">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => { setImagePreview(null); setForm({ ...form, image: null }); }}
                        className="absolute top-1 right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-6 border-t border-surface-border">
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary flex items-center gap-2"
              >
                {submitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                <span>{submitting ? 'جارٍ الحفظ...' : editing ? 'تحديث' : 'إضافة'}</span>
              </button>
              {editing && (
                <button 
                  type="button" 
                  onClick={resetForm} 
                  className="btn-secondary flex items-center gap-2"
                >
                  <X className="w-5 h-5" />
                  <span>إلغاء</span>
                </button>
              )}
            </div>
          </form>
        </motion.div>

        {/* Products List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
              <Package className="w-5 h-5 text-accent" />
            </div>
            <h2 className="text-xl font-semibold">المنتجات ({products.length})</h2>
          </div>

          {loading ? (
            <div className="card-premium p-10 text-center">
              <div className="w-10 h-10 border-4 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted">جارٍ التحميل...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="card-premium p-10 text-center">
              <Package className="w-12 h-12 text-muted mx-auto mb-4" strokeWidth={1} />
              <p className="text-muted">لا توجد منتجات. أضف منتجك الأول!</p>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {products.map((p, index) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.05 }}
                    className="card-premium p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center"
                  >
                    {/* Image */}
                    <div className="w-full sm:w-28 h-32 sm:h-20 rounded-xl overflow-hidden bg-surface flex-shrink-0">
                      {p.image_path ? (
                        <img
                          src={`${API_BASE}${p.image_path}`}
                          alt={p.name_ar}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Image className="w-8 h-8 text-muted/50" strokeWidth={1} />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-1">{p.name_ar}</h3>
                      <p className="text-muted text-sm line-clamp-1 mb-2">{p.description_ar}</p>
                      <span className={`badge text-xs ${p.status === 'available' ? 'badge-available' : 'badge-unavailable'}`}>
                        {p.status === 'available' ? (
                          <span className="flex items-center gap-1"><Check className="w-3 h-3" /> متوفر</span>
                        ) : (
                          <span className="flex items-center gap-1"><X className="w-3 h-3" /> غير متوفر</span>
                        )}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => handleEdit(p)}
                        className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors flex items-center justify-center gap-2"
                      >
                        <Edit2 className="w-4 h-4" />
                        <span className="sm:hidden">تعديل</span>
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(p.id)}
                        className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="sm:hidden">حذف</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
              onClick={() => setDeleteConfirm(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="card-premium p-6 max-w-sm w-full text-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                  <Trash2 className="w-7 h-7 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">حذف المنتج</h3>
                <p className="text-muted mb-6">هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء.</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleDelete(deleteConfirm)}
                    className="flex-1 px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
                  >
                    نعم، احذف
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1 btn-secondary"
                  >
                    إلغاء
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
