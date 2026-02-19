import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (e) {
      console.error('Failed to load user', e);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    // Simulated login - in real app this would be an API call
    const mockUsers = [
      { email: 'demo@example.com', password: '123456', name: 'Demo Kullanıcı' },
    ];
    const found = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      const userData = { email: found.email, name: found.name };
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return { success: true };
    }
    return { success: false, error: 'E-posta veya şifre hatalı.' };
  };

  const register = async (name, email, password) => {
    // Simulated register
    if (!name || !email || !password) {
      return { success: false, error: 'Lütfen tüm alanları doldurun.' };
    }
    if (password.length < 6) {
      return { success: false, error: 'Şifre en az 6 karakter olmalıdır.' };
    }
    const userData = { email, name };
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return { success: true };
  };

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
