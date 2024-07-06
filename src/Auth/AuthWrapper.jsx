import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [IsAuthenticated, setIsAuthenticated] = useState(() => {
    return !!sessionStorage.getItem('IsAuthenticated');
  });

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8000/api/login/', { username, password }, { withCredentials: true });
      if (response.data.message) {
        setIsAuthenticated(true);
        sessionStorage.setItem('IsAuthenticated', 'true');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/logout/', {}, { withCredentials: true });
      if (response.data.message) {
        setIsAuthenticated(false);
        sessionStorage.removeItem('IsAuthenticated');
      }
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <AuthContext.Provider value={{ IsAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
