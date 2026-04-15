import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Download } from 'lucide-react';

const Ledger = () => {
  const sessions = [
    { time: '09:00', title: 'Arrival & Morning Reflection', speaker: 'Nexus Staff', location: 'The Atrium' },
    { time: '10:30', title: 'Spatial Ethics in the AI Age', speaker: 'Dr. Elena Vane', location: 'Hall A' },
    { time: '11:00', title: 'The Silent Gallery Architecture', speaker: 'Marcus Stone', location: 'Atrium' },
    { time: '12:30', title: 'Communal Lunch', speaker: '-', location: 'The Square' },
    { time: '13:30', title: 'Curating the Future', speaker: 'Sarah Lylat', location: 'Gallery 04' },
    { time: '15:00', title: 'Closing Plenary', speaker: 'Julian Drax', location: 'The Atrium' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container"
      style={{ marginTop: '4rem' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: '3rem', borderBottom: '1px solid rgba(26,26,26,0.05)' }}>
        <div>
          <h1 className="serif">Your Ledger</h1>
          <p className="sans" style={{ opacity: 0.6, letterSpacing: '0.1em', marginTop: '1rem', textTransform: 'uppercase', fontSize: '0.75rem' }}>
            Event Schedule • April 16, 2026
          </p>
        </div>
        <button className="sans" style={{ background: 'none', border: '1px solid rgba(26,26,26,0.1)', padding: '0.75rem 1.5rem', display: 'flex', gap: '0.75rem', alignItems: 'center', cursor: 'pointer', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          <Download size={14} />
          Sync to Google Calendar
        </button>
      </div>

      <div style={{ marginTop: '4rem' }}>
        {sessions.map((session, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            style={{ 
              display: 'flex', 
              padding: '2rem 0', 
              borderBottom: '1px solid rgba(26,26,26,0.03)',
              alignItems: 'center'
            }}
          >
            <div style={{ width: '100px' }}>
              <p className="sans" style={{ fontSize: '0.875rem', fontWeight: 600 }}>{session.time}</p>
            </div>
            <div style={{ flex: 2 }}>
              <h2 className="serif" style={{ fontSize: '1.5rem' }}>{session.title}</h2>
              <p className="sans" style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>{session.speaker}</p>
            </div>
            <div style={{ flex: 1, textAlign: 'right' }}>
              <p className="sans" style={{ fontSize: '0.875rem', opacity: 0.6 }}>{session.location}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="layer-2" style={{ marginTop: '4rem', padding: '3rem', textAlign: 'center' }}>
        <Calendar size={32} style={{ marginBottom: '1.5rem', opacity: 0.2 }} />
        <p className="serif" style={{ fontSize: '1.25rem', fontStyle: 'italic' }}>
          "Your ledger is perfectly balanced. You have 3 open windows for networking or self-guided exploration."
        </p>
      </div>
    </motion.div>
  );
};

export default Ledger;
