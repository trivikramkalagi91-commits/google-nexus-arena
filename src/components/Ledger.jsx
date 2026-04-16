import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Plus, Check, AlertCircle, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { MASTER_PROGRAM } from '../data/event';
import { generateGoogleCalendarLink } from '../utils/calendar';

const Ledger = () => {
  const { t } = useLanguage();
  const { user, toggleSession } = useUser();
  const [view, setView] = useState('mine'); // 'mine' or 'program'

  const savedIds = user?.savedSessionIds || ['A01'];
  const savedSessions = MASTER_PROGRAM.filter(s => savedIds.includes(s.id));
  
  // Conflict Detection
  const hasConflict = (time) => {
    return savedSessions.filter(s => s.time === time).length > 1;
  };

  return (
    <motion.div 
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ paddingBottom: '8rem' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(26,26,26,0.05)' }}>
        <div>
          <h3 className="serif" style={{ marginBottom: '1rem' }}>{t('temporalLedger')}</h3>
          <h1 className="serif" style={{ fontSize: '4rem' }}>April 16, 2026</h1>
        </div>
        
        <div className="glass" style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem', border: '1px solid rgba(26,26,26,0.05)' }}>
          <button 
            onClick={() => setView('mine')}
            className="sans"
            style={{ 
              padding: '0.75rem 1.5rem', 
              border: 'none', 
              background: view === 'mine' ? 'var(--dark)' : 'transparent',
              color: view === 'mine' ? '#FFF' : 'var(--dark)',
              cursor: 'pointer',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.1em'
            }}
          >
            YOUR LEDGER
          </button>
          <button 
            onClick={() => setView('program')}
            className="sans"
            style={{ 
              padding: '0.75rem 1.5rem', 
              border: 'none', 
              background: view === 'program' ? 'var(--dark)' : 'transparent',
              color: view === 'program' ? '#FFF' : 'var(--dark)',
              cursor: 'pointer',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.1em'
            }}
          >
            AETHER PROGRAM
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === 'mine' ? (
          <motion.div 
            key="mine"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {savedSessions.length === 0 ? (
              <div style={{ padding: '8rem 0', textAlign: 'center' }}>
                <Calendar size={48} opacity={0.1} style={{ marginBottom: '2rem' }} />
                <h2 className="serif" style={{ opacity: 0.3 }}>Your ledger is empty.</h2>
                <button 
                  onClick={() => setView('program')}
                  className="btn-primary" 
                  style={{ marginTop: '2rem' }}
                >
                  Discover Program
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {savedSessions.map((session) => (
                  <div key={session.id} style={{ position: 'relative' }}>
                    <div 
                      className="bento-card layer-1" 
                      style={{ 
                        display: 'flex', 
                        padding: '3rem', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        borderLeft: hasConflict(session.time) ? '4px solid #E53E3E' : 'none'
                      }}
                    >
                      <div style={{ display: 'flex', gap: '4rem', alignItems: 'center' }}>
                        <p className="sans" style={{ fontSize: '0.75rem', fontWeight: 800, opacity: 0.4, minWidth: '80px' }}>{session.time}</p>
                        <div>
                          <h2 className="serif" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{session.titleKey ? t(session.titleKey) : session.title}</h2>
                          <p className="sans" style={{ fontSize: '0.875rem', opacity: 0.6 }}>{session.location} • {session.speaker}</p>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        {hasConflict(session.time) && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#E53E3E' }}>
                            <AlertCircle size={14} />
                            <span className="sans" style={{ fontSize: '0.65rem', fontWeight: 700 }}>TEMPORAL CONFLICT</span>
                          </div>
                        )}
                        <a 
                          href={generateGoogleCalendarLink(session)} 
                          target="_blank" 
                          rel="noreferrer"
                          className="btn-primary"
                          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
                        >
                          <ExternalLink size={14} />
                          SYNC
                        </a>
                        <button 
                          onClick={() => toggleSession(session.id)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.3 }}
                          title="Remove from Ledger"
                        >
                          {session.id !== 'A01' && <Plus style={{ transform: 'rotate(45deg)' }} size={20} />}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            key="program"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {MASTER_PROGRAM.map((session) => {
                const isSaved = user.savedSessionIds.includes(session.id);
                return (
                  <div 
                    key={session.id} 
                    className="bento-card" 
                    style={{ 
                      padding: '2rem 3rem', 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      background: isSaved ? 'rgba(26,26,26,0.02)' : 'transparent',
                      border: '1px solid rgba(26,26,26,0.05)'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
                      <p className="sans" style={{ fontSize: '0.65rem', fontWeight: 700, opacity: 0.5 }}>{session.time}</p>
                      <div>
                        <h3 className="serif" style={{ fontSize: '1.25rem' }}>{session.titleKey ? t(session.titleKey) : session.title}</h3>
                        <p className="sans" style={{ fontSize: '0.75rem', opacity: 0.5 }}>{session.location}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => toggleSession(session.id)}
                      className="sans"
                      style={{ 
                        background: isSaved ? 'var(--dark)' : 'transparent',
                        color: isSaved ? '#FFF' : 'var(--dark)',
                        border: '1px solid var(--dark)',
                        padding: '0.5rem 1rem',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      {isSaved ? <Check size={14} /> : <Plus size={14} />}
                      {isSaved ? 'SAVED' : 'ADD TO LEDGER'}
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Ledger;
