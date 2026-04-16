import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Compass, Users, Clock, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { MASTER_PROGRAM } from '../data/event';

const NexusMap = () => {
  const { t } = useLanguage();
  const { user } = useUser();
  
  const savedIds = user?.savedSessionIds || ['S01'];
  const savedSessions = MASTER_PROGRAM.filter(s => savedIds.includes(s.id));
  const nextTarget = savedSessions.length > 0 ? savedSessions[0] : MASTER_PROGRAM[0];

  const activeZone = nextTarget?.roomId || 'STADIUM_BOWL';

  const zones = {
    STADIUM_BOWL: { x: 400, y: 300, r: 120, label: 'Main Pitch / Seating', heat: 0.8, wait: '5m' },
    CONCOURSE_NORTH: { x: 400, y: 120, w: 300, h: 40, label: 'North Concourse', heat: 0.9, wait: '12m' },
    CONCOURSE_SOUTH: { x: 400, y: 480, w: 300, h: 40, label: 'South Concourse', heat: 0.2, wait: '2m' },
    SKY_GARDEN: { x: 650, y: 300, r: 50, label: 'Sky Bar / VVIP', heat: 0.4, wait: '4m' },
    SABHA: { x: 150, y: 300, r: 50, label: 'Fan Zone', heat: 0.6, wait: '8m' }
  };

  const getHeatColor = (heat) => {
    if (heat > 0.8) return '#E53E3E'; // Hot / Crowded
    if (heat > 0.5) return '#D69E2E'; // Medium
    return '#38A169'; // Cool / Empty
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
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '1rem', justifyContent: 'flex-end' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#38A169' }}></div>
                <span className="sans" style={{ fontSize: '0.6rem', opacity: 0.6 }}>EMPTY</span>
             </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#E53E3E' }}></div>
                <span className="sans" style={{ fontSize: '0.6rem', opacity: 0.6 }}>CROWDED</span>
             </div>
          </div>
          <p className="sans" style={{ fontSize: '0.75rem', opacity: 0.6 }}>
            Wayfinding to: <span style={{ fontWeight: 700 }}>{nextTarget?.location}</span>
          </p>
        </div>
      </div>

      <div className="layer-2" style={{ height: '650px', width: '100%', position: 'relative', overflow: 'hidden', border: '1px solid rgba(26,26,26,0.03)', background: '#1A1A1A' }}>
        
        <svg viewBox="0 0 800 600" style={{ width: '100%', height: '100%' }}>
          {/* Pitch Background */}
          <rect x="300" y="220" width="200" height="160" fill="rgba(56, 161, 105, 0.1)" stroke="rgba(255,255,255,0.05)" />
          
          {/* Crowd Heatmap Layers */}
          {Object.entries(zones).map(([id, zone]) => {
            const isActive = activeZone === id;
            return (
              <g key={id}>
                {zone.r ? (
                  <motion.circle 
                    cx={zone.x} cy={zone.y} r={zone.r}
                    fill="none"
                    stroke={getHeatColor(zone.heat)}
                    strokeWidth="20"
                    opacity="0.15"
                    animate={{ opacity: [0.1, 0.25, 0.1] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                  />
                ) : (
                  <motion.rect 
                    x={zone.x - zone.w/2} y={zone.y - zone.h/2} width={zone.w} height={zone.h}
                    fill="none"
                    stroke={getHeatColor(zone.heat)}
                    strokeWidth="10"
                    opacity="0.15"
                    animate={{ opacity: [0.1, 0.25, 0.1] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                  />
                )}
                
                {isActive && (
                   <motion.circle 
                      cx={zone.x} cy={zone.y} r={zone.r || 50}
                      fill="none"
                      stroke="#FFF"
                      strokeWidth="2"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1.3, opacity: 0 }}
                      transition={{ repeat: Infinity, duration: 2 }}
                   />
                )}
                
                <text 
                  x={zone.x} y={zone.y + (zone.r || 30) + 20} 
                  textAnchor="middle" 
                  className="sans" 
                  style={{ fontSize: '0.65rem', fontWeight: 600, fill: '#FFF', opacity: 0.4 }}
                >
                  {zone.label.toUpperCase()} ({zone.wait})
                </text>
              </g>
            );
          })}
        </svg>

        {/* Live Crowd Alert */}
        <div style={{ position: 'absolute', top: '2rem', right: '2rem', zIndex: 10 }}>
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="glass" 
            style={{ padding: '1rem 1.5rem', border: '1px solid #E53E3E', background: 'rgba(229, 62, 62, 0.1)', color: '#FFF' }}
          >
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <AlertTriangle size={18} color="#E53E3E" />
              <div>
                <span className="sans" style={{ fontSize: '0.7rem', fontWeight: 700 }}>BOTTLE-NECK ALERT: GATE A</span>
                <p className="sans" style={{ fontSize: '0.6rem', opacity: 0.7, marginTop: '0.25rem' }}>Use South Concourse for 10m faster entry.</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Controls */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', zIndex: 10, display: 'flex', gap: '1rem' }}>
          <div className="glass" style={{ padding: '0.75rem 1.25rem', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.4)', color: '#FFF', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Users size={14} opacity={0.6} />
            <span className="sans" style={{ fontSize: '0.6rem', fontWeight: 700 }}>GROUP (4 ON-SITE)</span>
          </div>
          <div className="glass" style={{ padding: '0.75rem 1.25rem', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.4)', color: '#FFF', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Clock size={14} opacity={0.6} />
            <span className="sans" style={{ fontSize: '0.6rem', fontWeight: 700 }}>NEXT EVENT: {nextTarget?.time}</span>
          </div>
        </div>

        <motion.div 
          style={{ position: 'absolute', top: '48%', left: '46%', zIndex: 100 }}
        >
          <div className="pulse-container">
            <div className="pulse-ring" style={{ borderColor: '#FFF' }}></div>
            <div className="glass" style={{ padding: '0.75rem 1.5rem', border: '1px solid #FFF', display: 'flex', gap: '0.75rem', alignItems: 'center', background: 'rgba(0,0,0,0.8)', color: '#FFF' }}>
              <MapPin size={14} color="#FFF" />
              <span className="serif" style={{ fontSize: '0.75rem', fontWeight: 700 }}>YOU</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div style={{ marginTop: '4rem', display: 'flex', gap: '6rem' }}>
        <div style={{ flex: 1 }}>
          <h3 className="serif" style={{ marginBottom: '1.5rem' }}>{t('concierge')}</h3>
          <p className="serif" style={{ fontSize: '1.5rem', lineHeight: '1.6', fontStyle: 'italic' }}>
            {`"${user.name}, Nexus sensors indicate heavy flow in the North Concourse. If you're heading to ${nextTarget?.location}, I suggest taking the South stairs to avoid the 12-minute queue."`}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default NexusMap;
