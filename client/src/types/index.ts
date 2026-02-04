export interface User {
  id: number;
  username: string;
  email: string;
  createdAt: string;
}

export interface Question {
  id: number;
  title: string;
  body: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user?: User;
  answers?: Answer[];
  _count?: {
    answers: number;
  };
}

export interface Answer {
  id: number;
  body: string;
  questionId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user?: User;
  votes?: Vote[];
  voteCount?: number;
  userVote?: 1 | -1 | null;
}

export interface Vote {
  id: number;
  value: number;
  answerId: number;
  userId: number;
  createdAt: string;
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

export interface CreateQuestionData {
  title: string;
  body: string;
}

export interface CreateAnswerData {
  body: string;
}
