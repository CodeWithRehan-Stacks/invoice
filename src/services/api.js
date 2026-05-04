import axios from 'axios';
import toast from 'react-hot-toast';

// Base API configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor: Attach Auth Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        // Unauthorized - logout
        localStorage.removeItem('token');
        window.location.href = '/';
        toast.error('Session expired. Please login again.');
      } else if (status === 403) {
        toast.error('You do not have permission to perform this action.');
      } else if (status === 422) {
        // Validation errors
        const message = data.message || 'Validation failed';
        toast.error(message);
      } else {
        toast.error(data.message || 'An unexpected error occurred.');
      }
    } else if (error.request) {
      toast.error('Network error. Please check your connection.');
    }
    return Promise.reject(error);
  }
);

export const StudentService = {
  getStudents: async (params = { page: 1, search: '', filter: '' }) => {
    const { data } = await api.get('/students', { params });
    return data;
  },
  getStudent: async (id) => {
    const { data } = await api.get(`/students/${id}`);
    return data;
  },
  createStudent: async (studentData) => {
    const { data } = await api.post('/students', studentData);
    return data;
  },
  updateStudent: async (id, studentData) => {
    const { data } = await api.put(`/students/${id}`, studentData);
    return data;
  },
  deleteStudent: async (id) => {
    const { data } = await api.delete(`/students/${id}`);
    return data;
  },
};

export const InvoiceService = {
  getInvoices: async (params = { page: 1, search: '', status: '' }) => {
    const { data } = await api.get('/invoices', { params });
    return data;
  },
  getInvoice: async (id) => {
    const { data } = await api.get(`/invoices/${id}`);
    return data;
  },
  createInvoice: async (invoiceData) => {
    const { data } = await api.post('/invoices', invoiceData);
    return data;
  },
  updateInvoice: async (id, invoiceData) => {
    const { data } = await api.put(`/invoices/${id}`, invoiceData);
    return data;
  },
  deleteInvoice: async (id) => {
    const { data } = await api.delete(`/invoices/${id}`);
    return data;
  },
  markAsPaid: async (id) => {
    const { data } = await api.post(`/invoices/${id}/pay`);
    return data;
  },
};

export default api;
