import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map as MapIcon, Globe } from 'lucide-react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import NexusMap from './components/NexusMap';
import Ledger from './components/Ledger';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [ambientNote, setAmbientNote] = useState(null);

  // Simulation of "Spatial Resonance" - Proximity-based logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setAmbientNote({
        type: 'proximity',
        title: 'Networking Opportunity',
        message: 'Marcus Stone from YOUR LEDGER is nearby in the Coffee Lab.'
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="layer-0" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main style={{ flex: 1, paddingBottom: '6rem' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -5 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'nexus' && <NexusMap />}
            {activeTab === 'ledger' && <Ledger />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Branding / Utility */}
      <footer className="container" style={{ padding: '2rem 0', borderTop: '1px solid rgba(26,26,26,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p className="sans" style={{ fontSize: '0.65rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Aether Physical Experience • 2026 Summit
        </p>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', opacity: 0.6 }}>
            <Globe size={14} />
            <span className="sans" style={{ fontSize: '0.75rem' }}>English</span>
          </div>
          <p className="sans" style={{ fontSize: '0.75rem', opacity: 0.4 }}>Legal / Privacy</p>
        </div>
      </footer>

      {/* Floating Spatial Action - "The Pulse" */}
      <AnimatePresence>
        {ambientNote && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{ 
              position: 'fixed', 
              bottom: '3rem', 
              right: '3rem', 
              zIndex: 100 
            }}
          >
            <div className="glass" style={{ 
              padding: '1.25rem 2.5rem', 
              border: '1px solid var(--accent)',
              boxShadow: '0 20px 50px rgba(47, 51, 49, 0.05)'
            }}>
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <div style={{ textAlign: 'right' }}>
                  <p className="sans" style={{ fontSize: '0.6rem', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 700 }}>{ambientNote.title}</p>
                  <p className="serif" style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>{ambientNote.message}</p>
                </div>
                <div 
                  onClick={() => setAmbientNote(null)}
                  style={{ cursor: 'pointer', opacity: 0.4 }}
                >
                  <MapIcon size={20} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
