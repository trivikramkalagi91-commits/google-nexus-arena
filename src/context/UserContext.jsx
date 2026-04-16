import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('aether_user');
    return saved ? JSON.parse(saved) : { name: '', role: '', hasOnboarded: false };
  });

  useEffect(() => {
    localStorage.setItem('aether_user', JSON.stringify(user));
  }, [user]);

  const onboardUser = (name, role) => {
    setUser({ name, role, hasOnboarded: true });
  };

  const logout = () => {
    setUser({ name: '', role: '', hasOnboarded: false });
    localStorage.removeItem('aether_user');
  };

  return (
    <UserContext.Provider value={{ user, onboardUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
