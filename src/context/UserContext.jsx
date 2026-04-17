import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

const initialState = {
  name: '',
  role: '',
  ticket: {
    gate: '',
    section: '',
    seat: ''
  },
  hasOnboarded: false,
  savedSessionIds: []
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialState);

  useEffect(() => {
    const saved = localStorage.getItem('nexus_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser({
          ...initialState,
          ...parsed,
          hasOnboarded: !!parsed.name // If name exists, they are onboarded
        });
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    }
  }, []);

  const onboard = (data) => {
    const newUser = { 
      ...user, 
      ...data, 
      hasOnboarded: true 
    };
    setUser(newUser);
    localStorage.setItem('nexus_user', JSON.stringify(newUser));
  };

  const logout = () => {
    localStorage.removeItem('nexus_user');
    setUser(initialState);
  };

  return (
    <UserContext.Provider value={{ user, onboard, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
