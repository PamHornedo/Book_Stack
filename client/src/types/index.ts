export interface User {
  id: number;
  username: string;
  email: string;
  createdAt: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user?: User;
  reviews?: Review[];
  _count?: {
    reviews: number;
  };
}

export interface Review {
  id: number;
  body: string;
  bookId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user?: User;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface CreateBookData {
  title: string;
  author: string;
  description: string;
}

export interface CreateReviewData {
  body: string;
}
