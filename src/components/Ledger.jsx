import React from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Download } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Ledger = ({ persona }) => {
  const { t } = useLanguage();

  const sessions = [
    { time: '09:00 AM', titleKey: 'temporalLedger', speaker: 'Nexus Staff', location: 'The Atrium' },
    { time: '10:30 AM', titleKey: 'ethicTitle', speaker: 'Dr. Elena Vane', location: 'Hall A' },
    { time: '11:00 AM', titleKey: 'temporalLedger', speaker: 'Marcus Stone', location: 'Atrium' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container"
      style={{ marginTop: '4rem', paddingBottom: '8rem' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: '3rem', borderBottom: '1px solid rgba(26,26,26,0.05)', marginBottom: '4rem' }}>
        <div>
          <h3 className="serif" style={{ marginBottom: '1rem' }}>{t('temporalLedger')}</h3>
          <h1 className="serif">April 16, 2026</h1>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <button className="sans" style={{ background: 'none', border: 'none', display: 'flex', gap: '0.75rem', alignItems: 'center', cursor: 'pointer', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.6 }}>
            <Download size={14} />
            Export
          </button>
          <button className="btn-primary">Sync Calendar</button>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        {sessions.map((session, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: idx * 0.1, ease: [0.19, 1, 0.22, 1] }}
            style={{ 
              display: 'flex', 
              padding: '3rem 0', 
              borderBottom: '1px solid rgba(26, 26, 26, 0.03)',
              alignItems: 'center'
            }}
          >
            <div style={{ width: '150px' }}>
              <p className="sans" style={{ fontSize: '1rem', fontWeight: 600 }}>{session.time}</p>
            </div>
            <div style={{ flex: 2 }}>
              <h2 className="serif" style={{ fontSize: '1.75rem' }}>{t(session.titleKey)}</h2>
              <p className="sans" style={{ fontSize: '0.875rem', marginTop: '0.5rem', opacity: 0.6 }}>{session.speaker}</p>
            </div>
            <div style={{ flex: 1, textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>
              <p className="sans" style={{ fontSize: '0.875rem', fontWeight: 500 }}>{session.location}</p>
              <Bookmark size={16} opacity={0.3} />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Ledger;
