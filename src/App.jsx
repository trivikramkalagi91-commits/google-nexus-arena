import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Map as MapIcon, ClipboardList, LogOut, Search, Bell } from 'lucide-react';
import { useUser } from './context/UserContext';
import { useMatch } from './context/MatchContext';
import Dashboard from './components/Dashboard';
import NexusMap from './components/NexusMap';
import Ledger from './components/Ledger';
import Onboarding from './components/Onboarding';
import AlertTray from './components/AlertTray';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user, logout } = useUser();
  const { activeMatch, liveState } = useMatch();

  if (!user.hasOnboarded) {
    return <Onboarding />;
  }

  const formatOvers = (balls) => {
    const overs = Math.floor(balls / 6);
    const remainingBalls = balls % 6;
    return `${overs}.${remainingBalls}`;
  };

  return (
    <div className="app-container">
      <AlertTray />
      {/* Top App Bar */}
      <header className="navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            background: 'var(--md-sys-color-primary)', 
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <LayoutDashboard size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Nexus Arena</h2>
            <p className="label-medium text-primary" style={{ fontSize: '0.65rem' }}>Live Intelligence</p>
          </div>
        </div>

        <div className="nav-links">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          >
            Intelligence
          </button>
          <button 
            onClick={() => setActiveTab('nexus')}
            className={`nav-item ${activeTab === 'nexus' ? 'active' : ''}`}
          >
            Digital Twin
          </button>
          <button 
            onClick={() => setActiveTab('ledger')}
            className={`nav-item ${activeTab === 'ledger' ? 'active' : ''}`}
          >
            Wait Times
          </button>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="md-card" style={{ padding: '0.5rem', borderRadius: '100px', display: 'flex', gap: '0.5rem' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '100px', background: 'var(--md-sys-color-primary-container)' }}></div>
            <span style={{ fontSize: '0.875rem', fontWeight: 500, marginRight: '0.5rem' }}>{user.name}</span>
          </div>
          <button onClick={logout} style={{ background: 'none', opacity: 0.5 }}><LogOut size={20} /></button>
        </div>
      </header>

      {/* Main Experience */}
      <main className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'nexus' && <NexusMap />}
            {activeTab === 'ledger' && <Ledger />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Status (Match Score) */}
      <div style={{ 
        position: 'fixed', 
        bottom: '2rem', 
        left: '50%', 
        transform: 'translateX(-50%)',
        zIndex: 1000
      }}>
        <div className="md-card-elevated animate-in" style={{ 
          padding: '0.75rem 2rem', 
          display: 'flex', 
          gap: '2rem', 
          alignItems: 'center',
          background: 'var(--md-sys-color-on-primary-container)',
          color: 'white',
          borderRadius: '100px'
        }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span className="label-medium" style={{ opacity: 0.7 }}>Live Score</span>
            <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{liveState.score}</span>
          </div>
          <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.2)' }}></div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span className="label-medium" style={{ opacity: 0.7 }}>Overs</span>
            <span style={{ fontWeight: 600 }}>{liveState.overs}</span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <div className={`heat-${liveState.crowdDensity > 0.7 ? 'high' : 'low'}`} style={{ width: '8px', height: '8px', borderRadius: '100px' }}></div>
            <span className="label-medium">{liveState.phase}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
