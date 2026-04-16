import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';

const Onboarding = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('attendee');
  const { onboardUser } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onboardUser(name, role);
    }
  };

  return (
    <div className="app-layout" style={{ justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
        style={{ maxWidth: '500px', width: '100%', textAlign: 'center' }}
      >
        <h3 className="serif" style={{ marginBottom: '2rem' }}>CURATOR'S REGISTRATION</h3>
        <h1 className="serif" style={{ marginBottom: '4rem' }}>Welcome to Aether.</h1>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          <div style={{ textAlign: 'left' }}>
            <p className="sans" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem', opacity: 0.5 }}>Identity</p>
            <input 
              type="text" 
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="serif"
              style={{ 
                width: '100%', 
                background: 'none', 
                border: 'none', 
                borderBottom: '1px solid rgba(26,26,26,0.2)', 
                fontSize: '2rem', 
                padding: '1rem 0',
                outline: 'none'
              }}
              autoFocus
            />
          </div>

          <div style={{ textAlign: 'left' }}>
            <p className="sans" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1.5rem', opacity: 0.5 }}>Access Level</p>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <button 
                type="button"
                onClick={() => setRole('attendee')}
                className={`sans ${role === 'attendee' ? 'active' : ''}`}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  fontSize: '0.75rem', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.1em',
                  opacity: role === 'attendee' ? 1 : 0.3,
                  borderBottom: role === 'attendee' ? '2px solid var(--accent)' : 'none',
                  paddingBottom: '0.5rem'
                }}
              >
                Attendee
              </button>
              <button 
                type="button"
                onClick={() => setRole('speaker')}
                className={`sans ${role === 'speaker' ? 'active' : ''}`}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  fontSize: '0.75rem', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.1em',
                  opacity: role === 'speaker' ? 1 : 0.3,
                  borderBottom: role === 'speaker' ? '2px solid var(--accent)' : 'none',
                  paddingBottom: '0.5rem'
                }}
              >
                Speaker
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-primary"
            disabled={!name.trim()}
            style={{ marginTop: '2rem', width: '100%', transition: 'all 0.5s ease', opacity: name.trim() ? 1 : 0.3 }}
          >
            Enter The Experience
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Onboarding;
