import axios from 'axios';
import { API_BASE } from '../config';

const api = axios.create({
  baseURL: `${API_BASE}/api`,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchProducts = () => api.get('/products').then((r) => r.data);

export const createProduct = (formData) =>
  api.post('/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then((r) => r.data);

export const updateProduct = (id, formData) =>
  api.put(`/products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then((r) => r.data);

export const deleteProduct = (id) => api.delete(`/products/${id}`).then((r) => r.data);

export const login = (username, password) =>
  api.post('/auth/login', { username, password }).then((r) => r.data);

export const fetchMe = () => api.get('/auth/me').then((r) => r.data);

export default api;
