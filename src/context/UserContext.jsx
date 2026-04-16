import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

const initialState = {
  name: '',
  role: '',
  hasOnboarded: false,
  savedSessionIds: ['A01']
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialState);

  useEffect(() => {
    const saved = localStorage.getItem('aether_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // CRITICAL BUG FIX: Merge parsed state with initial state to avoid missing fields like savedSessionIds
        setUser({
          ...initialState,
          ...parsed,
          savedSessionIds: parsed.savedSessionIds || ['A01']
        });
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    }
  }, []);

  const onboardingUser = (name, role) => {
    const newUser = { ...user, name, role, hasOnboarded: true };
    setUser(newUser);
    localStorage.setItem('aether_user', JSON.stringify(newUser));
  };

  const toggleSession = (id) => {
    setUser(prev => {
      const currentIds = prev.savedSessionIds || ['A01'];
      const isSaved = currentIds.includes(id);
      const newIds = isSaved 
        ? currentIds.filter(sid => sid !== id)
        : [...currentIds, id];
      
      if (!newIds.includes('A01')) newIds.push('A01');

      const updated = { ...prev, savedSessionIds: newIds };
      localStorage.setItem('aether_user', JSON.stringify(updated));
      return updated;
    });
  };

  const logout = () => {
    localStorage.removeItem('aether_user');
    setUser(initialState);
  };

  return (
    <UserContext.Provider value={{ user, onboardingUser, toggleSession, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
