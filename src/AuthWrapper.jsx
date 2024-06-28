import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const savedAuth = sessionStorage.getItem('auth');
    return savedAuth ? JSON.parse(savedAuth) : null;
  });

  const login = (username, password) => {
    const authData = { username, password };
    setAuth(authData);
    sessionStorage.setItem('auth', JSON.stringify(authData));
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('password', password);
  };

  const logout = () => {
    setAuth(null);
    sessionStorage.removeItem('auth');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
