import React, { useState, useEffect } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { GOOGLE_MAPS_API_KEY, EVENT_CONFIG } from '../config/services';
import { silverMapStyle } from '../config/mapStyles';

const NexusMap = () => {
  const { t } = useLanguage();
  const { user } = useUser();
  const [coords, setCoords] = useState(EVENT_CONFIG.coordinates);
  const [isLive, setIsLive] = useState(false);
  const [mapError, setMapError] = useState(false);
  const isSpeaker = user.role === 'speaker';

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
        (error) => {
          console.warn("Geolocation denied or failed. Defaulting to venue.");
        }
      );
    }
  }, []);

  // Handle Google Maps specific errors (like the one in the user screenshot)
  const handleMapError = () => {
    setMapError(true);
  };

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY} onLoadError={handleMapError}>
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
              {isLive ? `Bangalore Sector Detected` : EVENT_CONFIG.location}
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
                  center={coords}
                  zoom={isLive ? 12 : 15}
                  id="nexus-map"
                  mapId="AETHER_MAP_ID"
                  disableDefaultUI={true}
                  styles={silverMapStyle}
                  onTilesLoaded={() => console.log("Map tiles ready")}
                >
                  <Marker position={coords} />
                </Map>
              </motion.div>
            ) : (
              <motion.div 
                key="blueprint-map"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="blueprint-overlay"
                style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
              >
                <div style={{ position: 'absolute', inset: 0, opacity: 0.03, background: 'radial-gradient(circle, #1A1A1A 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                <div style={{ padding: '4rem', border: '1px solid rgba(26,26,26,0.05)', textAlign: 'center' }}>
                  <Navigation size={40} opacity={0.1} />
                  <h2 className="serif" style={{ marginTop: '2rem', opacity: 0.3 }}>ARCHITECTURAL BLUEPRINT</h2>
                  <p className="sans" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '1rem', opacity: 0.4 }}>Manual Override Active</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Location Focus UI */}
          <div style={{ position: 'absolute', top: '2rem', right: '2rem', zIndex: 10 }}>
            <button 
              onClick={() => setCoords(EVENT_CONFIG.coordinates)}
              className="glass"
              style={{ padding: '1rem', border: '1px solid rgba(26,26,26,0.1)', cursor: 'pointer', display: 'flex', gap: '1rem', alignItems: 'center' }}
            >
              <Navigation size={14} opacity={0.6} />
              <span className="sans" style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em' }}>RECENTER VENUE</span>
            </button>
          </div>

          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8, ease: [0.19, 1, 0.22, 1] }}
            style={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)', 
              zIndex: 100 
            }}
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
              {isLive 
                ? `"${user.name}, I see you are currently in Bangalore. Your flight to New Delhi is tracked; I will notify you when you enter the Pragati Maidan resonance zone."` 
                : `"${user.name}, I have locked the venue coordinates. Precise wayfinding will activate once you arrive at the summit premises."`}
            </p>
          </div>
        </div>
      </motion.div>
    </APIProvider>
  );
};

export default NexusMap;
