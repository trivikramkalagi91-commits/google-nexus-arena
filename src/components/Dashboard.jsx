import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MessageSquare, Clock } from 'lucide-react';

const Dashboard = ({ persona }) => {
  const isSpeaker = persona === 'speaker';

  return (
    <div className="container" style={{ paddingBottom: '8rem' }}>
      <div className="dashboard-grid">
        
        {/* area: greeting */}
        <motion.div 
          className="grid-greeting"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
        >
          <h3 className="serif" style={{ marginBottom: '1.5rem' }}>
            {isSpeaker ? 'SPEAKER ACCESS • STAGE 01' : 'ATTENDEE ACCESS • LEVEL 02'}
          </h3>
          <h1 className="serif">Good morning, Julian.</h1>
          <p className="sans" style={{ marginTop: '2rem', maxWidth: '500px', fontSize: '1.25rem' }}>
            {isSpeaker 
              ? "Your presentation 'Spatial Ethics' is scheduled for 10:30 AM. Stage 01 is currently preparing for your arrival."
              : "The Aether summit is in full flow. Your primary briefing in the Atrium begins in 14 minutes."}
          </p>
        </motion.div>

        {/* area: now */}
        <motion.div 
          className="grid-now bento-card layer-2"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h3 className="serif">NOW</h3>
            <Clock size={16} opacity={0.4} />
          </div>
          <div style={{ marginTop: 'auto' }}>
            <h2 className="serif" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
              {isSpeaker ? 'Tech Check: Stage 01' : 'Spatial Ethics in the AI Age'}
            </h2>
            <p className="sans" style={{ fontSize: '0.875rem' }}>
              {isSpeaker ? 'Pre-session sequence' : 'Hall A • Stage 01 • Elena Vane'}
            </p>
          </div>
          <motion.div 
            style={{ position: 'absolute', bottom: '2rem', right: '2rem' }}
            whileHover={{ x: 5, y: -5 }}
          >
            <ArrowUpRight size={24} />
          </motion.div>
        </motion.div>

        {/* area: ledger */}
        <motion.div 
          className="grid-ledger bento-card layer-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
        >
          <h3 className="serif" style={{ marginBottom: '3rem' }}>Next on your Ledger</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {[
              { time: '11:00 AM', title: isSpeaker ? 'Speaker Lounge Q&A' : 'Silent Gallery Tour', loc: 'Atrium' },
              { time: '01:30 PM', title: 'Curating the Future', loc: 'Gallery 04' }
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid rgba(26,26,26,0.05)', paddingBottom: '1rem' }}>
                <div>
                  <p className="sans" style={{ fontSize: '0.65rem', fontWeight: 600, opacity: 0.5 }}>{item.time}</p>
                  <h2 className="serif" style={{ fontSize: '1.25rem', marginTop: '0.25rem' }}>{item.title}</h2>
                </div>
                <p className="sans" style={{ fontSize: '0.75rem' }}>{item.loc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* area: concierge */}
        <motion.div 
          className="grid-concierge bento-card layer-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.6, ease: [0.19, 1, 0.22, 1] }}
          style={{ border: '1px solid rgba(26,26,26,0.05)' }}
        >
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2.5rem' }}>
            <div style={{ width: '8px', height: '8px', background: 'var(--accent)', borderRadius: '50%' }}></div>
            <h3 className="serif">CONCIERGE</h3>
          </div>
          <p className="serif" style={{ fontSize: '1.5rem', fontStyle: 'italic', color: '#1A1A1A', lineHeight: '1.6' }}>
            {isSpeaker 
              ? "'Julian, I've confirmed your slides are loaded. Would you like a water service at the podium?'"
              : "'Julian, I've noticed you have a gap. Would you like me to reserve a private pod in the Gallery Lounge?'"}
          </p>
          <div style={{ marginTop: 'auto', display: 'flex', gap: '2rem', paddingTop: '3rem' }}>
            <button className="btn-primary">{isSpeaker ? 'Confirm' : 'Reserve'}</button>
            <button className="sans" style={{ background: 'none', border: 'none', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', opacity: 0.4 }}>Pass</button>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Dashboard;
