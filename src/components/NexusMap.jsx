import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Compass, Users, Clock, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { useLiveFeed } from '../context/LiveFeedContext';

const NexusMap = () => {
  const { t } = useLanguage();
  const { user } = useUser();
  const { matchDay, liveState } = useLiveFeed();
  
  const savedIds = user?.savedSessionIds || ['S01'];
  
  // Custom heatmap logic linked to live simulation
  const mainHeat = liveState.crowdDensity;
  const concourseHeat = liveState.phase === 'BREAK' ? 0.9 : 0.3;

  const zones = {
    STADIUM_BOWL: { x: 400, y: 300, r: 120, label: 'Main Bowl', heat: mainHeat, wait: '5m' },
    CONCOURSE_NORTH: { x: 400, y: 120, w: 300, h: 40, label: 'North Gate', heat: concourseHeat, wait: liveState.phase === 'BREAK' ? '15m' : '4m' },
    CONCOURSE_SOUTH: { x: 400, y: 480, w: 300, h: 40, label: 'South Gate', heat: 0.2, wait: '2m' },
    SABHA: { x: 150, y: 300, r: 50, label: 'Fan Zone', heat: liveState.wickets > 5 ? 0.8 : 0.4, wait: '8m' }
  };

  const getHeatColor = (heat) => {
    if (heat > 0.8) return '#FF3B30'; // Hot
    if (heat > 0.5) return '#FFCC00'; // Med
    return '#34C759'; // Cool
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
          <h1 className="serif">{matchDay?.stadium_id.replace('_', ' ')}</h1>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p className="sans" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent)', fontWeight: 700 }}>
             LIVE TRAFFIC SENSORS ACTIVE
          </p>
          <p className="sans" style={{ fontSize: '0.75rem', marginTop: '0.5rem', opacity: 0.6 }}>
            {matchDay?.city} • {matchDay?.venue}
          </p>
        </div>
      </div>

      <div className="layer-2" style={{ height: '650px', width: '100%', position: 'relative', overflow: 'hidden', border: '1px solid rgba(26,26,26,0.03)', background: '#1A1A1B' }}>
        
        <svg viewBox="0 0 800 600" style={{ width: '100%', height: '100%' }}>
          {/* Pitch */}
          <rect x="300" y="220" width="200" height="160" fill="rgba(52, 199, 89, 0.05)" stroke="white" strokeOpacity="0.1" />
          
          {/* Dynamic Heatmap (Linked to LiveFeed) */}
          {Object.entries(zones).map(([id, zone]) => (
            <g key={id}>
              {zone.r ? (
                <motion.circle 
                  cx={zone.x} cy={zone.y} r={zone.r}
                  fill="none"
                  stroke={getHeatColor(zone.heat)}
                  strokeWidth="20"
                  animate={{ opacity: [0.1, 0.3, 0.1], strokeWidth: [20, 30, 20] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                />
              ) : (
                <motion.rect 
                  x={zone.x - zone.w/2} y={zone.y - zone.h/2} width={zone.w} height={zone.h}
                  fill="none"
                  stroke={getHeatColor(zone.heat)}
                  strokeWidth="10"
                  animate={{ opacity: [0.1, 0.3, 0.1] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                />
              )}
              <text 
                x={zone.x} y={zone.y + (zone.r || 30) + 20} 
                textAnchor="middle" 
                className="sans" 
                style={{ fontSize: '0.6rem', fontWeight: 800, fill: '#666' }}
              >
                {zone.label.toUpperCase()} ({zone.wait})
              </text>
            </g>
          ))}
        </svg>

        {/* Live Crowd Alert */}
        <AnimatePresence>
          {liveState.bottleNeckAlert && (
            <motion.div 
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              style={{ position: 'absolute', top: '2rem', right: '2rem', zIndex: 10 }}
            >
              <div className="glass" style={{ padding: '1.5rem', border: '1px solid #FF3B30', background: 'rgba(255, 59, 48, 0.1)', color: '#FFF', maxWidth: '300px' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <AlertTriangle size={24} color="#FF3B30" />
                  <div>
                    <span className="sans" style={{ fontSize: '0.75rem', fontWeight: 800 }}>BOTTLE-NECK WARNING</span>
                    <p className="sans" style={{ fontSize: '0.65rem', opacity: 0.8, marginTop: '0.25rem' }}>
                      {`${liveState.bottleNeckAlert.replace('_', ' ')} is heavily congested. Staff redirecting to South Concourse.`}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* You Are Here Pin */}
        <motion.div 
          style={{ position: 'absolute', top: '50%', left: '46%', zIndex: 100 }}
        >
          <div className="pulse-container">
            <div className="pulse-ring" style={{ border: '2px solid white' }}></div>
            <div className="glass" style={{ padding: '0.75rem 1.5rem', border: '1px solid #FFF', display: 'flex', gap: '0.75rem', alignItems: 'center', background: '#000', color: '#FFF' }}>
              <MapPin size={14} color="#FFF" />
              <span className="serif" style={{ fontSize: '0.75rem', fontWeight: 700 }}>{t('youAreHere')}</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div style={{ marginTop: '4rem', display: 'flex', gap: '6rem' }}>
        <div style={{ flex: 1 }}>
          <h3 className="serif" style={{ marginBottom: '1.5rem' }}>{t('concierge')}</h3>
          <p className="serif" style={{ fontSize: '1.5rem', lineHeight: '1.6', fontStyle: 'italic' }}>
            {`"${user.name}, the Google Nexus Arena sensors are tracking ${liveState.phase === 'BREAK' ? 'high movement' : 'stable flow'}. ${liveState.bottleNeckAlert ? `I recommend avoiding ${liveState.bottleNeckAlert.replace('_', ' ')} for the next 10 minutes.` : `All concourses are currently green. Perfect time for food.`}"`}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default NexusMap;
