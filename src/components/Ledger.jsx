import React from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Download } from 'lucide-react';

const Ledger = ({ persona }) => {
  const isSpeaker = persona === 'speaker';

  const sessions = [
    { time: '09:00 AM', title: 'Arrival & Morning Reflection', speaker: 'Nexus Staff', location: 'The Atrium' },
    { time: '10:30 AM', title: isSpeaker ? 'Spatial Ethics (Your Stage)' : 'Spatial Ethics in the AI Age', speaker: 'Dr. Elena Vane', location: 'Hall A' },
    { time: '11:00 AM', title: isSpeaker ? 'Speaker Lounge Q&A' : 'The Silent Gallery Tour', speaker: 'Marcus Stone', location: 'Atrium' },
    { time: '12:30 PM', title: 'Communal Lunch', speaker: '-', location: 'The Square' },
    { time: '01:30 PM', title: 'Curating the Future', speaker: 'Sarah Lylat', location: 'Gallery 04' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container"
      style={{ marginTop: '4rem', paddingBottom: '8rem' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: '3rem', borderBottom: '1px solid rgba(26,26,26,0.05)', marginBottom: '4rem' }}>
        <div>
          <h3 className="serif" style={{ marginBottom: '1rem' }}>TEMPORAL LEDGER</h3>
          <h1 className="serif">April 16, 2026</h1>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <button className="sans" style={{ background: 'none', border: 'none', display: 'flex', gap: '0.75rem', alignItems: 'center', cursor: 'pointer', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.6 }}>
            <Download size={14} />
            Export
          </button>
          <button className="btn-primary">Sync Calendar</button>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        {sessions.map((session, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: idx * 0.1, ease: [0.19, 1, 0.22, 1] }}
            style={{ 
              display: 'flex', 
              padding: '3rem 0', 
              borderBottom: '1px solid rgba(26, 26, 26, 0.03)',
              alignItems: 'center'
            }}
          >
            <div style={{ width: '150px' }}>
              <p className="sans" style={{ fontSize: '1rem', fontWeight: 600 }}>{session.time}</p>
            </div>
            <div style={{ flex: 2 }}>
              <h2 className="serif" style={{ fontSize: '1.75rem' }}>{session.title}</h2>
              <p className="sans" style={{ fontSize: '0.875rem', marginTop: '0.5rem', opacity: 0.6 }}>{session.speaker}</p>
            </div>
            <div style={{ flex: 1, textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>
              <p className="sans" style={{ fontSize: '0.875rem', fontWeight: 500 }}>{session.location}</p>
              <Bookmark size={16} opacity={0.3} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="layer-3" style={{ marginTop: '6rem', padding: '4rem', textAlign: 'center' }}>
        <p className="serif" style={{ fontSize: '1.5rem', fontStyle: 'italic', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          "Julian, your temporal path is clear. You have curated a day of focused learning and meaningful interaction."
        </p>
      </div>
    </motion.div>
  );
};

export default Ledger;
