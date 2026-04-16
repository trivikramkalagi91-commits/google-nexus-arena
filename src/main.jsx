import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { LanguageProvider } from './context/LanguageContext';
import { UserProvider } from './context/UserContext';
import { LiveFeedProvider } from './context/LiveFeedContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <UserProvider>
        <LiveFeedProvider>
          <App />
        </LiveFeedProvider>
      </UserProvider>
    </LanguageProvider>
  </React.StrictMode>
);
