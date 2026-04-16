import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { Clock, Navigation, Zap, Users } from 'lucide-react';

const Dashboard = () => {
  const { t } = useLanguage();
  const { user } = useUser();
  const isSpeaker = user.role === 'speaker';

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.19, 1, 0.22, 1] } }
  };

  return (
    <motion.div 
      className="container"
      variants={container}
      initial="hidden"
      animate="show"
      style={{ paddingBottom: '8rem' }}
    >
      <motion.div variants={item} style={{ marginBottom: '6rem' }}>
        <h3 className="serif" style={{ marginBottom: '1.5rem', opacity: 0.6 }}>{t('dashboard')}</h3>
        <h1 className="serif" style={{ fontSize: '5rem', lineHeight: '1', marginBottom: '2rem' }}>
          {t('greeting', { name: user.name })}
        </h1>
        <p className="serif" style={{ fontSize: '1.75rem', maxWidth: '800px', lineHeight: '1.5', opacity: 0.8 }}>
          {isSpeaker ? t('speakerGreeting') : t('attendeeGreeting')}
        </p>
      </motion.div>

      <div className="bento-grid">
        {/* Live Arena Status */}
        <motion.div 
          variants={item} 
          className="bento-card layer-1" 
          style={{ gridColumn: 'span 8', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="badge" style={{ background: 'var(--accent)', color: '#FFF' }}>{t('now')}</div>
              <h2 className="serif" style={{ fontSize: '2.5rem', marginTop: '1.5rem' }}>{t('ethicTitle')}</h2>
              <p className="sans" style={{ fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.6 }}>{t('venue')}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <Clock size={20} opacity={0.3} />
              <p className="sans" style={{ fontSize: '0.75rem', marginTop: '0.5rem', fontWeight: 700 }}>MATCH STARTED: 12'</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '4rem', marginTop: '4rem' }}>
            <div>
              <p className="sans subtitle">CROWD STATUS</p>
              <p className="serif" style={{ fontSize: '1.5rem' }}>Dynamic Flow Active</p>
            </div>
            <div>
              <p className="sans subtitle">WAIT TIME (GATE B)</p>
              <p className="serif" style={{ fontSize: '1.5rem' }}>2 Minutes</p>
            </div>
          </div>
        </motion.div>

        {/* Real-time Assistant */}
        <motion.div 
          variants={item} 
          className="bento-card layer-2 accent" 
          style={{ gridColumn: 'span 4', padding: '3rem', color: '#FFF' }}
        >
          <p className="sans" style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.2em', marginBottom: '2rem' }}>{t('concierge')}</p>
          <p className="serif" style={{ fontSize: '1.25rem', lineHeight: '1.6', marginBottom: '3rem' }}>
            {isSpeaker ? t('speakerAI', { name: user.name }) : t('attendeeAI', { name: user.name })}
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn-secondary">{t('confirm')}</button>
            <button className="btn-secondary" style={{ opacity: 0.6 }}>{t('pass')}</button>
          </div>
        </motion.div>

        {/* Group Beacon */}
        <motion.div 
          variants={item} 
          className="bento-card layer-1" 
          style={{ gridColumn: 'span 12', padding: '3rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4rem' }}
        >
          <div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
              <Users size={16} color="var(--accent)" />
              <p className="sans subtitle" style={{ marginBottom: 0 }}>SECTION 102 SYNC</p>
            </div>
            <p className="serif" style={{ fontSize: '1.25rem' }}>4 Friends Tracking</p>
          </div>
          <div>
            <p className="sans subtitle">NEAREST EXIT</p>
            <p className="serif" style={{ fontSize: '1.25rem' }}>South Ramp (320m)</p>
          </div>
          <div>
            <p className="sans subtitle">HALFTIME ORDER</p>
            <p className="serif" style={{ fontSize: '1.25rem' }}>Ready at Concession 2</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <button className="btn-primary">{t('reserve')}</button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
