import React, { useState, useEffect } from 'react';
import { motion as FMotion, AnimatePresence as FAnimatePresence } from 'framer-motion';
import { Map as MapIcon, Globe, Info, LogOut } from 'lucide-react';
import { useLanguage } from './context/LanguageContext';
import { useUser } from './context/UserContext';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import NexusMap from './components/NexusMap';
import Ledger from './components/Ledger';
import Onboarding from './components/Onboarding';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user, logout } = useUser();
  const { lang, setLang, t } = useLanguage();
  const [ambientNote, setAmbientNote] = useState(null);

  const pageVariants = {
    initial: { opacity: 0, scale: 0.99 },
    animate: { opacity: 1, scale: 1, transition: { duration: 1.5, ease: [0.19, 1, 0.22, 1] } },
    exit: { opacity: 0, scale: 1.01, transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } }
  };

  useEffect(() => {
    if (user.hasOnboarded) {
      const timer = setTimeout(() => {
        setAmbientNote({
          title: t('resonanceTitle'),
          message: user.role === 'speaker' 
            ? t('speakerResonance')
            : t('attendeeResonance')
        });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [user.role, lang, user.hasOnboarded]);

  if (!user.hasOnboarded) {
    return <Onboarding />;
  }

  return (
    <div className="app-layout layer-0">
      
      {/* Dynamic Persona Tracker */}
      <div 
        className="persona-switcher" 
        style={{ cursor: 'default', background: 'rgba(26,26,26,0.02)', border: 'none' }}
      >
        <span className="sans" style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.8 }}>
          {user.role === 'speaker' ? 'Curator Privileges Active' : 'Verified Attendee'}
        </span>
        <div 
          onClick={logout}
          style={{ cursor: 'pointer', opacity: 0.3, marginLeft: '1rem' }}
          title="Logout"
        >
          <LogOut size={12} />
        </div>
      </div>

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main style={{ flex: 1, position: 'relative' }}>
        <FAnimatePresence mode="wait">
          <FMotion.div
            key={`${activeTab}-${user.role}`}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'nexus' && <NexusMap />}
            {activeTab === 'ledger' && <Ledger />}
          </FMotion.div>
        </FAnimatePresence>
      </main>

      <FAnimatePresence>
        {ambientNote && (
          <FMotion.div 
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
            className="spatial-toast"
          >
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <p className="sans" style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 700, letterSpacing: '0.1em' }}>
                  {ambientNote.title}
                </p>
                <p className="serif" style={{ fontSize: '1rem', marginTop: '0.5rem', lineHeight: '1.4' }}>
                  {ambientNote.message}
                </p>
              </div>
              <div 
                onClick={() => setAmbientNote(null)}
                style={{ cursor: 'pointer', opacity: 0.4 }}
              >
                <MapIcon size={20} />
              </div>
            </div>
          </FMotion.div>
        )}
      </FAnimatePresence>

      <footer className="container" style={{ padding: '4rem 0', borderTop: '1px solid rgba(26,26,26,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p className="sans" style={{ fontSize: '0.65rem', opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
          {user.name} • Aether Physical Experience • 2026 Summit
        </p>
        <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <button 
              onClick={() => setLang('en')}
              className="sans" 
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem', opacity: lang === 'en' ? 1 : 0.4, fontWeight: lang === 'en' ? 700 : 400 }}
            >
              EN
            </button>
            <button 
              onClick={() => setLang('hi')}
              className="sans" 
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem', opacity: lang === 'hi' ? 1 : 0.4, fontWeight: lang === 'hi' ? 700 : 400 }}
            >
              हिन्दी
            </button>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', opacity: 0.5 }}>
            <Info size={14} />
            <span className="sans" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Legal</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
