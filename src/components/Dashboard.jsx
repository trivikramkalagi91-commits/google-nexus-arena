import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MessageSquare } from 'lucide-react';

const Dashboard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container"
      style={{ marginTop: '4rem' }}
    >
      <div className="bento-grid">
        {/* Editorial Greeting */}
        <div style={{ gridColumn: 'span 8', padding: '4rem 0' }}>
          <p className="sans" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1rem', opacity: 0.6 }}>
            Curator's Greeting
          </p>
          <h1 className="serif">Good morning, Julian.</h1>
          <p className="sans" style={{ marginTop: '1.5rem', maxWidth: '500px', fontSize: '1.25rem', lineHeight: '1.8' }}>
            The Aether summit is in full flow. Your primary briefing in the Atrium begins in 14 minutes. The air is calm, and the gallery is yours.
          </p>
        </div>

        {/* Hero: Happening Now */}
        <div className="layer-2" style={{ gridColumn: 'span 4', height: '400px', position: 'relative', overflow: 'hidden' }}>
          {/* Subtle background image or pattern could go here */}
          <div style={{ padding: '2.5rem' }}>
            <p className="sans" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Ambient Notification</p>
            <h3 className="serif" style={{ fontSize: '0.75rem', opacity: 0.6 }}>NOW</h3>
            <h2 className="serif" style={{ marginTop: '1rem', fontSize: '2rem' }}>Spatial Ethics in the AI Age</h2>
            <p className="sans" style={{ marginTop: '0.75rem', fontSize: '0.875rem' }}>Hall A • Stage 01 • Speaker: Dr. Elena Vane</p>
          </div>
          <div style={{ position: 'absolute', bottom: '2rem', right: '2rem' }}>
            <motion.div whileHover={{ x: 5, y: -5 }}>
              <ArrowUpRight size={28} />
            </motion.div>
          </div>
        </div>

        {/* The Ledger: Summary */}
        <div className="layer-3" style={{ gridColumn: 'span 6', padding: '3.5rem' }}>
          <h3 className="serif" style={{ fontSize: '0.75rem', marginBottom: '2.5rem', opacity: 0.8 }}>NEXT ON YOUR LEDGER</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {[
              { time: '11:00 AM', title: 'The Silent Gallery Architecture', loc: 'Atrium', duration: '45m' },
              { time: '01:30 PM', title: 'Curating the Future', loc: 'Gallery 04', duration: '60m' }
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p className="sans" style={{ fontSize: '0.7rem', marginBottom: '0.5rem', fontWeight: 600 }}>{item.time}</p>
                  <h2 className="serif" style={{ fontSize: '1.4rem' }}>{item.title}</h2>
                  <p className="sans" style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>{item.duration}</p>
                </div>
                <p className="sans" style={{ fontSize: '0.75rem', fontWeight: 500 }}>{item.loc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* The Concierge: AI Layer */}
        <div className="layer-1" style={{ gridColumn: 'span 6', padding: '3.5rem', border: '1px solid rgba(26,26,26,0.05)' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
            <div style={{ width: '8px', height: '8px', background: 'var(--accent)', borderRadius: '50%' }}></div>
            <h3 className="serif" style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}>CONCIERGE AI</h3>
          </div>
          <p className="serif" style={{ fontSize: '1.75rem', fontStyle: 'italic', fontWeight: 400, color: '#1A1A1A', lineHeight: '1.5' }}>
            "Julian, I've noticed you have a gap between your next two sessions. Would you like me to reserve a private pod in the Gallery Lounge for some focused work?"
          </p>
          <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1.5rem' }}>
            <button className="btn-primary">Reserve Pod</button>
            <button className="sans" style={{ background: 'none', border: 'none', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', opacity: 0.6 }}>Dismiss</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
