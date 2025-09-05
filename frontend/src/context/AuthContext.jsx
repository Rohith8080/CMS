import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Configure axios
  axios.defaults.baseURL = 'http://localhost:4000/api';
  axios.defaults.withCredentials = true;

  const login = async (email, password) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('/auth/login', { email, password });
      setUser(response.data.user);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, email, password) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('/auth/register', { username, email, password });
      setUser(response.data.user);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to register');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post('/auth/logout');
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const checkAuth = async () => {
    try {
      const response = await axios.post('/auth/refresh-token');
      setUser(response.data.user);
    } catch (err) {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        error, 
        login, 
        register, 
        logout,
        checkAuth,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'ADMIN'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
