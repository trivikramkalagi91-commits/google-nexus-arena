import React, { useState } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { GOOGLE_MAPS_API_KEY, EVENT_CONFIG } from '../config/services';

const NexusMap = () => {
  const { t } = useLanguage();
  const { user } = useUser();
  const isSpeaker = user.role === 'speaker';

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
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
          <p className="sans" style={{ fontSize: '0.75rem', maxWidth: '300px', textAlign: 'right', opacity: 0.6 }}>
            {EVENT_CONFIG.location}
          </p>
        </div>

        <div className="layer-2" style={{ height: '600px', width: '100%', position: 'relative', overflow: 'hidden', border: '1px solid rgba(26,26,26,0.03)' }}>
          {/* Real Google Map Integration */}
          {GOOGLE_MAPS_API_KEY ? (
            <Map
              defaultCenter={EVENT_CONFIG.coordinates}
              defaultZoom={15}
              id="nexus-map"
              mapId="AETHER_MAP_ID"
              disableDefaultUI={true}
            >
              <Marker position={EVENT_CONFIG.coordinates} />
            </Map>
          ) : (
            <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F1F1F1' }}>
              <div style={{ textAlign: 'center' }}>
                <MapPin size={32} opacity={0.2} style={{ marginBottom: '1rem' }} />
                <p className="sans" style={{ fontSize: '0.875rem', opacity: 0.5 }}>Google Maps active. No API Key provided.</p>
                <p className="sans" style={{ fontSize: '0.75rem', opacity: 0.3, marginTop: '0.5rem' }}>Location: {EVENT_CONFIG.location}</p>
              </div>
            </div>
          )}

          {/* User Location Indicator Over the Map */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            style={{ position: 'absolute', top: '50%', left: '40%', zIndex: 100 }}
          >
            <div className="glass" style={{ padding: '0.75rem 1.5rem', border: '1px solid var(--accent)', display: 'flex', gap: '1rem', alignItems: 'center', background: 'rgba(255,255,255,0.95)' }}>
              <MapPin size={16} color="var(--accent)" />
              <span className="serif" style={{ fontSize: '0.75rem', fontWeight: 600 }}>{t('youAreHere')}</span>
            </div>
          </motion.div>
        </div>

        <div style={{ marginTop: '4rem', display: 'flex', gap: '6rem' }}>
          <div style={{ flex: 1 }}>
            <h3 className="serif" style={{ marginBottom: '1.5rem' }}>{t('concierge')}</h3>
            <p className="sans" style={{ fontSize: '1.125rem', lineHeight: '1.8' }}>
              {isSpeaker 
                ? `${user.name}, your session stage is located in the North Wing. I have mapped the priority speaker entrance for you.` 
                : `${user.name}, the summit venue is expansive. I have highlighted the primary Atrium for your morning briefing.`}
            </p>
          </div>
        </div>
      </motion.div>
    </APIProvider>
  );
};

export default NexusMap;
