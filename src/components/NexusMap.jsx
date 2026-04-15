import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Info } from 'lucide-react';

const NexusMap = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container"
      style={{ marginTop: '4rem' }}
    >
      <div style={{ padding: '4rem 0', borderBottom: '1px solid rgba(26,26,26,0.05)', marginBottom: '4rem' }}>
        <h1 className="serif">The Nexus</h1>
        <p className="sans" style={{ opacity: 0.6, letterSpacing: '0.1em', marginTop: '1rem', textTransform: 'uppercase', fontSize: '0.75rem' }}>
          Spatial Navigation & Wayfinding
        </p>
      </div>

      <div className="layer-2" style={{ height: '600px', width: '100%', position: 'relative', overflow: 'hidden', border: '1px solid rgba(26,26,26,0.03)' }}>
        {/* Abstract Architectural Grid Lines */}
        <div style={{ position: 'absolute', top: 0, left: '25%', width: '1px', height: '100%', background: 'rgba(26,26,26,0.05)' }}></div>
        <div style={{ position: 'absolute', top: 0, left: '50%', width: '1px', height: '100%', background: 'rgba(26,26,26,0.05)' }}></div>
        <div style={{ position: 'absolute', top: 0, left: '75%', width: '1px', height: '100%', background: 'rgba(26,26,26,0.05)' }}></div>
        <div style={{ position: 'absolute', top: '33%', left: 0, width: '100%', height: '1px', background: 'rgba(26,26,26,0.05)' }}></div>
        <div style={{ position: 'absolute', top: '66%', left: 0, width: '100%', height: '1px', background: 'rgba(26,26,26,0.05)' }}></div>

        {/* Level Indicator */}
        <div style={{ position: 'absolute', top: '2rem', left: '2rem', background: '#FFFFFF', padding: '1rem', border: '1px solid rgba(26,26,26,0.1)' }}>
          <p className="sans" style={{ fontSize: '0.65rem', fontWeight: 600 }}>LEVEL</p>
          <p className="serif" style={{ fontSize: '1.5rem' }}>02</p>
        </div>

        {/* POI: The Atrium (Main Stage) */}
        <motion.div 
          style={{ position: 'absolute', top: '25%', left: '60%', width: '150px' }}
          whileHover={{ scale: 1.05 }}
        >
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
            <div style={{ width: '10px', height: '10px', background: '#1A1A1A' }}></div>
            <h2 className="serif" style={{ fontSize: '1.25rem' }}>The Atrium</h2>
          </div>
          <p className="sans" style={{ fontSize: '0.65rem', opacity: 0.6 }}>Primary Keynote Hall</p>
        </motion.div>

        {/* POI: Gallery 04 */}
        <motion.div 
          style={{ position: 'absolute', top: '70%', left: '15%', width: '150px' }}
          whileHover={{ scale: 1.05 }}
        >
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
            <div style={{ width: '10px', height: '10px', border: '1px solid #1A1A1A' }}></div>
            <h2 className="serif" style={{ fontSize: '1.25rem' }}>Gallery 04</h2>
          </div>
          <p className="sans" style={{ fontSize: '0.65rem', opacity: 0.6 }}>Interactive Exhibits</p>
        </motion.div>

        {/* Current User Location */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.5 }}
          style={{ position: 'absolute', top: '50%', left: '40%', zIndex: 10 }}
        >
          <div className="glass" style={{ padding: '0.75rem', border: '1px solid var(--accent)', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <MapPin size={16} color="var(--accent)" />
            <span className="serif" style={{ fontSize: '0.875rem' }}>You</span>
          </div>
        </motion.div>

        {/* Ambient Map Controls */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', display: 'flex', gap: '1rem' }}>
          <button className="glass sans" style={{ padding: '0.5rem 1rem', border: '1px solid rgba(26,26,26,0.1)', fontSize: '0.75rem', textTransform: 'uppercase', cursor: 'pointer' }}>
            Zoom In
          </button>
          <button className="glass sans" style={{ padding: '0.5rem 1rem', border: '1px solid rgba(26,26,26,0.1)', fontSize: '0.75rem', textTransform: 'uppercase', cursor: 'pointer' }}>
            Zoom Out
          </button>
        </div>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', gap: '4rem' }}>
        <div style={{ flex: 1 }}>
          <h3 className="serif" style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>SPATIAL RESONANCE</h3>
          <p className="sans" style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
            The Nexus uses proximity logic to highight the most relevant facilities near you. Currently, the <strong>East Atrium</strong> is your fastest route to the upcoming keynote.
          </p>
        </div>
        <div style={{ width: '300px' }}>
          <div className="layer-3" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
              <Info size={16} />
              <h3 className="serif" style={{ fontSize: '0.75rem' }}>VENUE STATS</h3>
            </div>
            <p className="sans" style={{ fontSize: '0.75rem' }}>Traffic: Calm</p>
            <p className="sans" style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>Temperature: 21°C</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NexusMap;
