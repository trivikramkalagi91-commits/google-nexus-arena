import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const NexusMap = ({ persona }) => {
  const isSpeaker = persona === 'speaker';
  const { t } = useLanguage();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container"
      style={{ marginTop: '4rem', paddingBottom: '8rem' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: '3rem', borderBottom: '1px solid rgba(26,26,26,0.05)', marginBottom: '4rem' }}>
        <div>
          <h3 className="serif" style={{ marginBottom: '1rem' }}>{t('spatialNav')}</h3>
          <h1 className="serif">{t('nexus')}</h1>
        </div>
      </div>

      <div className="layer-2" style={{ height: '600px', width: '100%', position: 'relative', overflow: 'hidden', border: '1px solid rgba(26,26,26,0.03)' }}>
        <div style={{ position: 'absolute', top: 0, left: '25%', width: '1px', height: '100%', background: 'rgba(26,26,26,0.05)' }}></div>
        <div style={{ position: 'absolute', top: 0, left: '50%', width: '1px', height: '100%', background: 'rgba(26,26,26,0.05)' }}></div>
        <div style={{ position: 'absolute', top: 0, left: '75%', width: '1px', height: '100%', background: 'rgba(26,26,26,0.05)' }}></div>
        
        <div style={{ position: 'absolute', top: '2rem', left: '2rem', background: '#FFFFFF', padding: '1.5rem', border: '1px solid rgba(26,26,26,0.1)' }}>
          <p className="sans" style={{ fontSize: '0.6rem', fontWeight: 700, opacity: 0.5, letterSpacing: '0.1em' }}>FLOOR</p>
          <p className="serif" style={{ fontSize: '2rem' }}>02</p>
        </div>

        <motion.div 
          style={{ position: 'absolute', top: '20%', left: '55%', width: '200px' }}
          whileHover={{ scale: 1.05 }}
        >
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
            <div style={{ width: '12px', height: '12px', background: isSpeaker ? 'var(--accent)' : '#1A1A1A' }}></div>
            <h2 className="serif" style={{ fontSize: '1.5rem' }}>The Atrium</h2>
          </div>
        </motion.div>

        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          style={{ position: 'absolute', top: '50%', left: '40%', zIndex: 10 }}
        >
          <div className="glass" style={{ padding: '1rem 2rem', border: '1px solid var(--accent)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <MapPin size={18} color="var(--accent)" />
            <span className="serif" style={{ fontSize: '0.875rem', fontWeight: 600 }}>{t('youAreHere')}</span>
          </div>
        </motion.div>
      </div>

      <div style={{ marginTop: '4rem', display: 'flex', gap: '6rem' }}>
        <div style={{ flex: 1 }}>
          <h3 className="serif" style={{ marginBottom: '1.5rem' }}>{t('concierge')}</h3>
          <p className="sans" style={{ fontSize: '1.125rem', lineHeight: '1.8' }}>
            {t('speakerGreeting')}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default NexusMap;
