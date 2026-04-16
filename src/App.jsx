import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map as MapIcon, Globe, Info } from 'lucide-react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import NexusMap from './components/NexusMap';
import Ledger from './components/Ledger';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [persona, setPersona] = useState('attendee'); // 'attendee' | 'speaker'
  const [ambientNote, setAmbientNote] = useState(null);

  // Luxurious Animation Variants
  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.19, 1, 0.22, 1] } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } }
  };

  // Spatial Resonance Simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setAmbientNote({
        title: 'SPATIAL RESONANCE',
        message: persona === 'speaker' 
          ? 'Event Organizer Sarah is entering Stage 01. Tech check recommended.'
          : 'Marcus Stone from your Ledger is nearby in the Coffee Lab.'
      });
    }, 4000);

    return () => clearTimeout(timer);
  }, [persona]);

  return (
    <div className="app-layout layer-0">
      
      {/* Persona Switcher - Demonstration of intelligence */}
      <div className="persona-switcher">
        <button 
          className={`persona-btn ${persona === 'attendee' ? 'active' : ''}`}
          onClick={() => setPersona('attendee')}
        >
          Attendee View
        </button>
        <button 
          className={`persona-btn ${persona === 'speaker' ? 'active' : ''}`}
          onClick={() => setPersona('speaker')}
        >
          Speaker Access
        </button>
      </div>

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main style={{ flex: 1, position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${persona}`}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {activeTab === 'dashboard' && <Dashboard persona={persona} />}
            {activeTab === 'nexus' && <NexusMap persona={persona} />}
            {activeTab === 'ledger' && <Ledger persona={persona} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Spatial Notification */}
      <AnimatePresence>
        {ambientNote && (
          <motion.div 
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
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="container" style={{ padding: '4rem 0', borderTop: '1px solid rgba(26,26,26,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p className="sans" style={{ fontSize: '0.65rem', opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
          Aether Physical Experience • 2026 Summit
        </p>
        <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', opacity: 0.5 }}>
            <Globe size={14} />
            <span className="sans" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>English</span>
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
