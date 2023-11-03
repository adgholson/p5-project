import React, { useState, useEffect, createContext, useContext } from 'react';
import { useHistory } from 'react-router-dom';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(userData));
    history.push('/dashboard');
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
  
    if (savedUser !== null) {
      try {
        const userData = JSON.parse(savedUser);
  
        if (userData && userData.id) {
          setUser(userData);
          setIsLoggedIn(true);
        } else {
          console.error('Invalid user data structure in localStorage:', userData);
          localStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Error parsing JSON from localStorage:', error);
        localStorage.removeItem('user');
      }
    } else {
      history.push('/');
    }
  }, [history]);

  const updateUser = (newUser) => {
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    history.push('/login');
  };

  const contextValue = {
    user,
    updateUser,
    logout,
    onLogin,
    isLoggedIn,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
