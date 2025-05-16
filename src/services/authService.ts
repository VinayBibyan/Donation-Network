
import api from './api';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  location?: string;
  image?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  location?: string;
  image?: string;
  token: string;
}

export const authService = {
  async register(userData: RegisterData): Promise<User> {
    const response = await api.post('/users/register', userData);
    if (response.data.token) {
      localStorage.setItem('userToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  async login(userData: LoginData): Promise<User> {
    const response = await api.post('/users/login', userData);
    if (response.data.token) {
      localStorage.setItem('userToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  logout(): void {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
  },

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },

  async updateProfile(userData: Partial<User>): Promise<User> {
    const response = await api.put('/users/profile', userData);
    const updatedUser = response.data;
    
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      const updatedUserWithToken = { 
        ...updatedUser, 
        token: currentUser.token 
      };
      localStorage.setItem('user', JSON.stringify(updatedUserWithToken));
    }
    
    return updatedUser;
  },

  getToken(): string | null {
    return localStorage.getItem('userToken');
  },

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
};

export default authService;
