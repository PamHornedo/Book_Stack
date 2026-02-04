import axios from 'axios';
import type { 
  AuthResponse, 
  LoginCredentials, 
  RegisterCredentials,
  Question,
  CreateQuestionData,
  Answer,
  CreateAnswerData,
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

// Question endpoints
export const questionAPI = {
  getAll: () => 
    api.get<Question[]>('/questions'),
  
  getById: (id: number) => 
    api.get<Question>(`/questions/${id}`),
  
  create: (data: CreateQuestionData) => 
    api.post<Question>('/questions', data),
  
  update: (id: number, data: Partial<CreateQuestionData>) => 
    api.put<Question>(`/questions/${id}`, data),
  
  delete: (id: number) => 
    api.delete(`/questions/${id}`)
};

// Answer endpoints
export const answerAPI = {
  create: (questionId: number, data: CreateAnswerData) => 
    api.post<Answer>(`/questions/${questionId}/answers`, data),
  
  update: (id: number, data: Partial<CreateAnswerData>) => 
    api.put<Answer>(`/answers/${id}`, data),
  
  delete: (id: number) => 
    api.delete(`/answers/${id}`)
};

// Vote endpoints
export const voteAPI = {
  upvote: (answerId: number) => 
    api.post(`/answers/${answerId}/vote`, { value: 1 }),
  
  downvote: (answerId: number) => 
    api.post(`/answers/${answerId}/vote`, { value: -1 }),
  
  removeVote: (answerId: number) => 
    api.delete(`/answers/${answerId}/vote`)
};

export default api;
