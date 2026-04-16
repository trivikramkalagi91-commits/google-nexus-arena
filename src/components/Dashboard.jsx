import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { EVENT_DATA } from '../data/event';

const Dashboard = () => {
  const { t } = useLanguage();
  const { user } = useUser();
  const isSpeaker = user.role === 'speaker';

  // Find the 'Now' session
  const nowSession = EVENT_DATA[1];

  return (
    <div className="container" style={{ paddingBottom: '8rem' }}>
      <div className="dashboard-grid">
        
        {/* area: greeting */}
        <motion.div 
          className="grid-greeting"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
        >
          <h3 className="serif" style={{ marginBottom: '1.5rem' }}>
            {isSpeaker ? t('speakerAccess') : t('attendeeAccess')}
          </h3>
          <h1 className="serif">{t('greeting', { name: user.name })}</h1>
          <p className="sans" style={{ marginTop: '2rem', maxWidth: '500px', fontSize: '1.25rem' }}>
            {isSpeaker ? t('speakerGreeting') : t('attendeeGreeting')}
          </p>
        </motion.div>

        {/* area: now */}
        <motion.div 
          className="grid-now bento-card layer-2"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h3 className="serif">{t('now')}</h3>
            <Clock size={16} opacity={0.4} />
          </div>
          <div style={{ marginTop: 'auto' }}>
            <h2 className="serif" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
              {isSpeaker ? t('techCheck') : t('ethicTitle')}
            </h2>
            <p className="sans" style={{ fontSize: '0.875rem' }}>
              {nowSession.location} • {nowSession.speaker}
            </p>
          </div>
          <motion.div 
            style={{ position: 'absolute', bottom: '2rem', right: '2rem' }}
            whileHover={{ x: 5, y: -5 }}
          >
            <ArrowUpRight size={24} />
          </motion.div>
        </motion.div>

        {/* area: ledger */}
        <motion.div 
          className="grid-ledger bento-card layer-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
        >
          <h3 className="serif" style={{ marginBottom: '3rem' }}>{t('nextOnLedger')}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {EVENT_DATA.slice(1).map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid rgba(26,26,26,0.05)', paddingBottom: '1rem' }}>
                <div>
                  <p className="sans" style={{ fontSize: '0.65rem', fontWeight: 600, opacity: 0.5 }}>{item.time}</p>
                  <h2 className="serif" style={{ fontSize: '1.25rem', marginTop: '0.25rem' }}>{t(item.titleKey)}</h2>
                </div>
                <p className="sans" style={{ fontSize: '0.75rem' }}>{item.location.split('•')[0]}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* area: concierge */}
        <motion.div 
          className="grid-concierge bento-card layer-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.6, ease: [0.19, 1, 0.22, 1] }}
          style={{ border: '1px solid rgba(26,26,26,0.05)' }}
        >
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2.5rem' }}>
            <div style={{ width: '8px', height: '8px', background: 'var(--accent)', borderRadius: '50%' }}></div>
            <h3 className="serif">{t('concierge')}</h3>
          </div>
          <p className="serif" style={{ fontSize: '1.5rem', fontStyle: 'italic', color: '#1A1A1A', lineHeight: '1.6' }}>
            {isSpeaker ? t('speakerAI', { name: user.name }) : t('attendeeAI', { name: user.name })}
          </p>
          <div style={{ marginTop: 'auto', display: 'flex', gap: '2rem', paddingTop: '3rem' }}>
            <button className="btn-primary" onClick={() => alert('Logic Triggered: Response sent to Concierge.')}>
              {isSpeaker ? t('confirm') : t('reserve')}
            </button>
            <button className="sans" style={{ background: 'none', border: 'none', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', opacity: 0.4 }}>{t('pass')}</button>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Dashboard;
