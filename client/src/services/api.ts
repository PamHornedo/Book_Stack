import axios from 'axios';
import type { 
  AuthResponse, 
  LoginCredentials, 
  RegisterCredentials,
  Book,
  CreateBookData,
  Review,
  CreateReviewData,
  User
} from '../types';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authAPI = {
  register: (credentials: RegisterCredentials) => 
    api.post<AuthResponse>('/auth/register', credentials),
  
  login: (credentials: LoginCredentials) => 
    api.post<AuthResponse>('/auth/login', credentials),
  
  getProfile: () => 
    api.get<User>('/auth/profile')
};

// Book endpoints
export const bookAPI = {
  getAll: () => 
    api.get<Book[]>('/books'),
  
  getById: (id: number) => 
    api.get<Book>(`/books/${id}`),
  
  create: (data: CreateBookData) => 
    api.post<Book>('/books', data),
  
  update: (id: number, data: Partial<CreateBookData>) => 
    api.put<Book>(`/books/${id}`, data),
  
  delete: (id: number) => 
    api.delete(`/books/${id}`)
};

// Review endpoints
export const reviewAPI = {
  create: (bookId: number, data: CreateReviewData) => 
    api.post<Review>(`/books/${bookId}/reviews`, data),
  
  update: (id: number, data: Partial<CreateReviewData>) => 
    api.put<Review>(`/reviews/${id}`, data),
  
  delete: (id: number) => 
    api.delete(`/reviews/${id}`)
};

export default api;
