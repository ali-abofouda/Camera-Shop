import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:5000/api'
});

export const getProducts = async () => {
  const res = await api.get('/products');
  return res.data;
};

export const login = async (username, password) => {
  const res = await api.post('/auth/login', { username, password });
  return res.data;
};

export const createProduct = async (token, payload) => {
  const form = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) form.append(key, value);
  });
  const res = await api.post('/products', form, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
};

export const updateProductApi = async (token, id, payload) => {
  const form = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) form.append(key, value);
  });
  const res = await api.put(`/products/${id}`, form, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
};

export const deleteProductApi = async (token, id) => {
  const res = await api.delete(`/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
