import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { LanguageProvider } from './context/LanguageContext';
import { UserProvider } from './context/UserContext';
import { MatchProvider } from './context/MatchContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <UserProvider>
        <MatchProvider>
          <App />
        </MatchProvider>
      </UserProvider>
    </LanguageProvider>
  </React.StrictMode>
);
