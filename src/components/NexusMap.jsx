import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Compass, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { MASTER_PROGRAM } from '../data/event';

const NexusMap = () => {
  const { t } = useLanguage();
  const { user } = useUser();
  
  const savedIds = user?.savedSessionIds || ['A01'];
  const savedSessions = MASTER_PROGRAM.filter(s => savedIds.includes(s.id));
  const nextEvent = savedSessions.length > 1 ? savedSessions[1] : savedSessions[0];

  // Room highlighting state based on the next event
  const activeRoom = nextEvent?.roomId || 'SABHA';

  const rooms = {
    SABHA: { x: 400, y: 300, r: 60, label: 'The Sabha' },
    NB_ALPHA: { x: 250, y: 220, r: 40, label: 'Neighborhood Alpha' },
    NB_SIGMA: { x: 550, y: 220, r: 40, label: 'Neighborhood Sigma' },
    SKY_GARDEN: { x: 400, y: 150, r: 30, label: 'Sky Garden' }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container"
      style={{ marginTop: '0', paddingBottom: '8rem' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: '3rem', borderBottom: '1px solid rgba(26,26,26,0.05)', marginBottom: '4rem' }}>
        <div>
          <h3 className="serif" style={{ marginBottom: '1rem' }}>{t('spatialNav')}</h3>
          <h1 className="serif">{t('nexus')}</h1>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p className="sans" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent)', fontWeight: 700 }}>
            ANANTA DIGITAL TWIN ACTIVE
          </p>
          <p className="sans" style={{ fontSize: '0.75rem', marginTop: '0.5rem', opacity: 0.6 }}>
            Active Wayfinding: <span style={{ fontWeight: 700 }}>{t(nextEvent?.titleKey) || nextEvent?.title || 'Unknown'}</span>
          </p>
        </div>
      </div>

      <div className="layer-2" style={{ height: '600px', width: '100%', position: 'relative', overflow: 'hidden', border: '1px solid rgba(26,26,26,0.03)', background: '#F9F8F6' }}>
        
        {/* Architectural Blueprint SVG */}
        <svg viewBox="0 0 800 600" style={{ width: '100%', height: '100%' }}>
          {/* Grid Lines */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(26,26,26,0.03)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Infinity Loop Paths */}
          <motion.path 
            d="M 250 220 Q 400 450 550 220 Q 400 50 250 220" 
            fill="none" 
            stroke="rgba(26,26,26,0.1)" 
            strokeWidth="2"
            strokeDasharray="10 5"
          />

          {/* Rooms */}
          {Object.entries(rooms).map(([id, room]) => {
            const isActive = activeRoom === id;
            return (
              <g key={id}>
                <motion.circle 
                  cx={room.x} cy={room.y} r={room.r}
                  fill={isActive ? 'rgba(var(--accent-rgb), 0.05)' : 'white'}
                  stroke={isActive ? 'var(--accent)' : 'rgba(26,26,26,0.1)'}
                  strokeWidth={isActive ? 2 : 1}
                  initial={false}
                  animate={{ 
                    scale: isActive ? [1, 1.05, 1] : 1,
                    opacity: isActive ? 1 : 0.6
                  }}
                  transition={{ repeat: Infinity, duration: 3 }}
                />
                {isActive && (
                   <motion.circle 
                      cx={room.x} cy={room.y} r={room.r + 20}
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="1"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ repeat: Infinity, duration: 2 }}
                   />
                )}
                <text 
                  x={room.x} y={room.y + room.r + 20} 
                  textAnchor="middle" 
                  className="sans" 
                  style={{ fontSize: '0.65rem', fontWeight: 600, opacity: isActive ? 1 : 0.3 }}
                >
                  {room.label.toUpperCase()}
                </text>
              </g>
            );
          })}

          {/* User Location Indicator (Mocked specifically for Ananta Campus) */}
          <motion.g initial={{ x: 380, y: 350 }}>
            <circle r="4" fill="var(--accent)" />
            <circle r="12" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.3" />
          </motion.g>
        </svg>

        {/* Legend / Info Overlay */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', zIndex: 10 }}>
          <div className="glass" style={{ padding: '1rem', border: '1px solid rgba(26,26,26,0.1)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Compass size={14} opacity={0.6} />
            <span className="sans" style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.05em' }}>ZONE: {nextEvent?.location || 'General Campus'}</span>
          </div>
        </div>

        {/* You Are Here Pin */}
        <motion.div 
          style={{ position: 'absolute', top: '56%', left: '46%', zIndex: 100 }}
        >
          <div className="pulse-container">
            <div className="pulse-ring"></div>
            <div className="glass" style={{ padding: '0.75rem 1.5rem', border: '1px solid var(--accent)', display: 'flex', gap: '0.75rem', alignItems: 'center', background: 'rgba(255,255,255,0.98)' }}>
              <MapPin size={14} color="var(--accent)" />
              <span className="serif" style={{ fontSize: '0.75rem', fontWeight: 700 }}>{t('youAreHere')}</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div style={{ marginTop: '4rem', display: 'flex', gap: '6rem' }}>
        <div style={{ flex: 1 }}>
          <h3 className="serif" style={{ marginBottom: '1.5rem' }}>{t('concierge')}</h3>
          <p className="serif" style={{ fontSize: '1.5rem', lineHeight: '1.6', fontStyle: 'italic' }}>
            {`"${user.name}, the Google Ananta Campus is fully synchronized to your agenda. I have highlighted '${t(nextEvent?.titleKey || '') || nextEvent?.title}' in ${nextEvent?.location || 'the digital twin'} for you."`}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default NexusMap;
