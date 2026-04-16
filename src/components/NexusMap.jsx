import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Info, ArrowUpRight } from 'lucide-react';

const NexusMap = ({ persona }) => {
  const isSpeaker = persona === 'speaker';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container"
      style={{ marginTop: '4rem', paddingBottom: '8rem' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: '3rem', borderBottom: '1px solid rgba(26,26,26,0.05)', marginBottom: '4rem' }}>
        <div>
          <h3 className="serif" style={{ marginBottom: '1rem' }}>SPATIAL NAVIGATION</h3>
          <h1 className="serif">The Nexus</h1>
        </div>
        <p className="sans" style={{ fontSize: '0.75rem', maxWidth: '300px', textAlign: 'right', opacity: 0.6 }}>
          {isSpeaker 
            ? "Speaker routing active. Preferred access via Stage 01 Service Entrance." 
            : "General navigation active. High traffic detected in the North Atrium."}
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
        <div style={{ position: 'absolute', top: '2rem', left: '2rem', background: '#FFFFFF', padding: '1.5rem', border: '1px solid rgba(26,26,26,0.1)' }}>
          <p className="sans" style={{ fontSize: '0.6rem', fontWeight: 700, opacity: 0.5, letterSpacing: '0.1em' }}>FLOOR</p>
          <p className="serif" style={{ fontSize: '2rem' }}>02</p>
        </div>

        {/* POI: The Atrium */}
        <motion.div 
          style={{ position: 'absolute', top: '20%', left: '55%', width: '200px' }}
          whileHover={{ scale: 1.05 }}
        >
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
            <div style={{ width: '12px', height: '12px', background: isSpeaker ? 'var(--accent)' : '#1A1A1A' }}></div>
            <h2 className="serif" style={{ fontSize: '1.5rem' }}>The Atrium</h2>
          </div>
          <p className="sans" style={{ fontSize: '0.75rem', opacity: 0.5 }}>{isSpeaker ? 'Your Session Stage' : 'Main Event Hall'}</p>
        </motion.div>

        {/* User Location */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          style={{ position: 'absolute', top: '50%', left: '40%', zIndex: 10 }}
        >
          <div className="glass" style={{ padding: '1rem 2rem', border: '1px solid var(--accent)', display: 'flex', gap: '1rem', alignItems: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
            <MapPin size={18} color="var(--accent)" />
            <span className="serif" style={{ fontSize: '0.875rem', fontWeight: 600 }}>YOU ARE HERE</span>
          </div>
        </motion.div>

        {/* Wayfinding Line - Artistic simulation of Google Maps polyline */}
        <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}>
          <motion.path 
            d="M 40% 50% L 40% 30% L 55% 30%" 
            fill="none" 
            stroke="var(--accent)" 
            strokeWidth="2" 
            strokeDasharray="10, 10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 1 }}
          />
        </svg>
      </div>

      <div style={{ marginTop: '4rem', display: 'flex', gap: '6rem' }}>
        <div style={{ flex: 1 }}>
          <h3 className="serif" style={{ marginBottom: '1.5rem' }}>INTELLIGENT ROUTING</h3>
          <p className="sans" style={{ fontSize: '1.125rem', lineHeight: '1.8' }}>
            Nexus AI has analyzed the current floor traffic. {isSpeaker 
              ? "Since you have a presentation coming up, we have reserved a freight elevator for your equipment transfer." 
              : "The North corridor is currently at 80% capacity. We recommend taking the East Gallery route for a quieter experience."}
          </p>
        </div>
        <div style={{ width: '350px' }}>
          <div className="layer-3" style={{ padding: '2.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
              <Info size={18} />
              <h3 className="serif">REAL-TIME DATA</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="sans" style={{ fontSize: '0.875rem' }}>Occupancy</span>
                <span className="sans" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Moderate</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="sans" style={{ fontSize: '0.875rem' }}>Ambience</span>
                <span className="sans" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Curated Calm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NexusMap;
