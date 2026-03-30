import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
});

export const getWedding = () => api.get('/wedding');
export const getRSVPs = (password?: string) => 
  api.get('/rsvp', {
    headers: { 'X-Admin-Password': password }
  });
export const submitRSVP = (data: any) => api.post('/rsvp', data);

export default api;
