// AuthContext.js
<<<<<<< HEAD
import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
=======
import React, { createContext, useContext, useState } from 'react';
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
<<<<<<< HEAD
  const [role, setRole] = useState('');

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setRole(decodedToken.role);
    }
  }, [token]);

  const login = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
    const decodedToken = jwtDecode(token);
    setRole(decodedToken.role);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setRole('');
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
=======

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
