// In production, use relative URL (same origin)
// In development, use localhost:5000
export const API_BASE =
  import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:5000');
