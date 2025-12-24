import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ، يرجى المحاولة مرة أخرى');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-[70vh] px-6">
      <form
        onSubmit={handleSubmit}
        className="glass p-8 w-full max-w-sm flex flex-col gap-5"
      >
        <h1 className="text-2xl font-bold text-center">تسجيل الدخول</h1>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <input
          type="text"
          placeholder="اسم المستخدم"
          className="bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          className="bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-accent hover:bg-accent/80 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
        >
          {loading ? 'جارٍ التحميل...' : 'دخول'}
        </button>
      </form>
    </section>
  );
}
