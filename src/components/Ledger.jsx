import React from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Download, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { EVENT_DATA } from '../data/event';
import { generateGoogleCalendarLink } from '../utils/calendar';

const Ledger = () => {
  const { t } = useLanguage();
  const { user } = useUser();

  const handleSyncAll = () => {
    // Sync logic for all items could go here
    window.open(generateGoogleCalendarLink(EVENT_DATA[0]), '_blank');
  };

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
          <h1 className="serif">{new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</h1>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <button className="sans" style={{ background: 'none', border: 'none', display: 'flex', gap: '0.75rem', alignItems: 'center', cursor: 'pointer', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.6 }}>
            <Download size={14} />
            Export PDF
          </button>
          <button className="btn-primary" onClick={handleSyncAll}>
            {t('ledger').split(' ')[0]} Sync
          </button>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        {EVENT_DATA.map((session, idx) => (
          <motion.div 
            key={session.id}
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
            <div style={{ flex: 1, textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1.5rem' }}>
              <p className="sans" style={{ fontSize: '0.875rem', fontWeight: 500 }}>{session.location}</p>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <a 
                  href={generateGoogleCalendarLink(session)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="sans"
                  style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <ExternalLink size={12} /> Sync
                </a>
                <Bookmark size={16} opacity={0.3} style={{ cursor: 'pointer' }} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="layer-3" style={{ marginTop: '6rem', padding: '4rem', textAlign: 'center' }}>
        <p className="serif" style={{ fontSize: '1.5rem', fontStyle: 'italic', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          "{user.name}, your temporal path is clear. {user.role === 'speaker' ? 'Your stage is ready for your unique perspective.' : 'I have curated a day of focused learning for you.'}"
        </p>
      </div>
    </motion.div>
  );
};

export default Ledger;
