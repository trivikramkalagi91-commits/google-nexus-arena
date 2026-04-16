import React, { useState, useEffect } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Compass, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { GOOGLE_MAPS_API_KEY, EVENT_CONFIG } from '../config/services';
import { silverMapStyle } from '../config/mapStyles';
import { MASTER_PROGRAM } from '../data/event';

const NexusMap = () => {
  const { t } = useLanguage();
  const { user } = useUser();
  const [coords, setCoords] = useState(EVENT_CONFIG.coordinates);
  const [isLive, setIsLive] = useState(false);
  const [mapError, setMapError] = useState(false);
  const isSpeaker = user.role === 'speaker';

  const savedIds = user?.savedSessionIds || ['A01'];
  const savedSessions = MASTER_PROGRAM.filter(s => savedIds.includes(s.id));
  const nextEvent = savedSessions.length > 1 ? savedSessions[1] : savedSessions[0];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setIsLive(true);
        },
        () => console.warn("Geolocation denied.")
      );
    }
  }, []);

  return (
    <APIProvider 
      apiKey={GOOGLE_MAPS_API_KEY} 
      onLoadError={() => setMapError(true)}
    >
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
              {isLive ? 'PRECISION GEOLOCATION ACTIVE' : 'EVENT VENUE DEFAULT'}
            </p>
            <p className="sans" style={{ fontSize: '0.75rem', marginTop: '0.5rem', opacity: 0.6 }}>
              Target: <span style={{ fontWeight: 700 }}>{t(nextEvent?.titleKey) || nextEvent?.title}</span>
            </p>
          </div>
        </div>

        <div className="layer-2" style={{ height: '600px', width: '100%', position: 'relative', overflow: 'hidden', border: '1px solid rgba(26,26,26,0.03)', background: '#F9F8F6' }}>
          
          <AnimatePresence mode="wait">
            {!mapError ? (
              <motion.div 
                key="live-map"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ height: '100%', width: '100%' }}
              >
                <Map
                  center={nextEvent?.coordinates || EVENT_CONFIG.coordinates}
                  zoom={17}
                  disableDefaultUI={true}
                  styles={silverMapStyle}
                >
                  <Marker position={nextEvent?.coordinates || EVENT_CONFIG.coordinates} />
                </Map>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F9F8F6', flexDirection: 'column' }}
              >
                <AlertTriangle size={32} opacity={0.2} color="var(--accent)" />
                <h3 className="serif" style={{ marginTop: '2rem', opacity: 0.4 }}>ARCHITECTURAL OVERRIDE ACTIVE</h3>
                <p className="sans" style={{ fontSize: '0.6rem', opacity: 0.3, marginTop: '1rem' }}>Live Map Sync Paused: Verify API activation in Cloud Console</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div style={{ position: 'absolute', top: '2rem', right: '2rem', zIndex: 10 }}>
            <div className="glass" style={{ padding: '1rem', border: '1px solid rgba(26,26,26,0.1)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Navigation size={14} opacity={0.6} />
              <span className="sans" style={{ fontSize: '0.6rem', fontWeight: 700 }}>SYNC: {nextEvent?.location}</span>
            </div>
          </div>

          <motion.div 
            style={{ position: 'absolute', top: '45%', left: '42%', zIndex: 100 }}
          >
            <div className="pulse-container">
              <div className="pulse-ring"></div>
              <div className="glass" style={{ padding: '1rem 2rem', border: '1px solid var(--accent)', display: 'flex', gap: '1rem', alignItems: 'center', background: 'rgba(255,255,255,0.98)' }}>
                <MapPin size={18} color="var(--accent)" />
                <span className="serif" style={{ fontSize: '0.85rem', fontWeight: 700 }}>{t('youAreHere')}</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div style={{ marginTop: '4rem', display: 'flex', gap: '6rem' }}>
          <div style={{ flex: 1 }}>
            <h3 className="serif" style={{ marginBottom: '1.5rem' }}>{t('concierge')}</h3>
            <p className="serif" style={{ fontSize: '1.5rem', lineHeight: '1.6', fontStyle: 'italic' }}>
              {`"${user.name}, I have updated the Nexus. I'm focusing your wayfinding on '${t(nextEvent?.titleKey) || nextEvent?.title}' in ${nextEvent?.location}."`}
            </p>
          </div>
        </div>
      </motion.div>
    </APIProvider>
  );
};

export default NexusMap;
