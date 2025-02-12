import axios from 'axios';
import { decode as jwtDecode } from 'jwt-decode';

const VAL_TOWN_API_KEY = process.env.VITE_VAL_TOWN_API_KEY;

interface User {
  id: string;
  email: string;
  role: string;
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

export const logout = () => {
  localStorage.removeItem('token');
};

export const getCurrentUser = (): User | null => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    return jwtDecode(token) as User;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const isAuthorized = (requiredRole: string): boolean => {
  const user = getCurrentUser();
  return user ? user.role === requiredRole : false;
};
