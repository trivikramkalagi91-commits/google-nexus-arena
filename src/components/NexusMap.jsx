import React, { useState } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { GOOGLE_MAPS_API_KEY, EVENT_CONFIG } from '../config/services';
import { silverMapStyle } from '../config/mapStyles';

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
        style={{ marginTop: '0', paddingBottom: '8rem' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: '3rem', borderBottom: '1px solid rgba(26,26,26,0.05)', marginBottom: '4rem' }}>
          <div>
            <h3 className="serif" style={{ marginBottom: '1rem' }}>{t('spatialNav')}</h3>
            <h1 className="serif">{t('nexus')}</h1>
          </div>
          <p className="sans" style={{ fontSize: '0.75rem', maxWidth: '300px', textAlign: 'right', opacity: 0.6 }}>
            {EVENT_CONFIG.location} • LIVE SYSTEM
          </p>
        </div>

        <div className="layer-2" style={{ height: '600px', width: '100%', position: 'relative', overflow: 'hidden', border: '1px solid rgba(26,26,26,0.03)', background: '#F9F8F6' }}>
          {/* High-Fidelity Google Map with Aether Styling */}
          <Map
            defaultCenter={EVENT_CONFIG.coordinates}
            defaultZoom={15}
            id="nexus-map"
            mapId="AETHER_MAP_ID"
            disableDefaultUI={true}
            styles={silverMapStyle}
          >
            <Marker position={EVENT_CONFIG.coordinates} />
          </Map>

          {/* Precision Navigation Overlay */}
          <div style={{ position: 'absolute', top: '2rem', right: '2rem', zIndex: 10 }}>
            <div className="glass" style={{ padding: '1.5rem', border: '1px solid rgba(26,26,26,0.1)' }}>
              <p className="sans" style={{ fontSize: '0.6rem', fontWeight: 700, opacity: 0.5, letterSpacing: '0.1em' }}>PRECISION</p>
              <p className="serif" style={{ fontSize: '1.5rem' }}>GRID ACTIVE</p>
            </div>
          </div>

          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8, ease: [0.19, 1, 0.22, 1] }}
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
              {isSpeaker 
                ? `"${user.name}, I have verified the Stage 01 blueprints. Your priority access lane via the North Atrium is now active on your digital pass."` 
                : `"${user.name}, the venue map is now synced with your personal Ledger. I've highlighted the most efficient path to Hall A for your 10:30 briefing."`}
            </p>
          </div>
        </div>
      </motion.div>
    </APIProvider>
  );
};

export default NexusMap;
