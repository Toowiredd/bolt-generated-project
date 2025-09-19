import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const VAL_TOWN_API_KEY = import.meta.env.VITE_VAL_TOWN_API_KEY;

export interface User {
  id: string;
  email: string;
  role: string;
}

export interface UserProfile {
  id: string;
  email: string;
  role: string;
  displayName?: string;
}

export const login = async (email: string, password: string): Promise<string> => {
  try {
    const response = await axios.post(
      'https://api.val.town/v1/run/@toowired.login',
      { email, password },
      { headers: { Authorization: `Bearer ${VAL_TOWN_API_KEY}` } }
    );
    const { token } = response.data;
    localStorage.setItem('token', token);
    return token;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const signIn = async (email: string, password: string): Promise<UserProfile> => {
  try {
    const token = await login(email, password);
    const user = jwtDecode(token) as UserProfile;
    return user;
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
};

export const signUp = async (email: string, password: string, displayName: string): Promise<UserProfile> => {
  try {
    const response = await axios.post(
      'https://api.val.town/v1/run/@toowired.signup',
      { email, password, displayName },
      { headers: { Authorization: `Bearer ${VAL_TOWN_API_KEY}` } }
    );
    const { token } = response.data;
    localStorage.setItem('token', token);
    const user = jwtDecode(token) as UserProfile;
    return user;
  } catch (error) {
    console.error('Sign up error:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getCurrentUser = (): UserProfile | null => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    return jwtDecode(token) as UserProfile;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const isAuthorized = (requiredRole: string): boolean => {
  const user = getCurrentUser();
  return user ? user.role === requiredRole : false;
};
