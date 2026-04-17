import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { useMatch } from '../context/MatchContext';
import { Sparkles, Users, TrendingUp, Clock, AlertCircle, Info, Mic } from 'lucide-react';

const Dashboard = () => {
  const { user } = useUser();
  const { activeMatch, liveState, timeOffset, setTimeOffset } = useMatch();
  const [speaking, setSpeaking] = useState(false);

  // Proactive AI Logic
  const getAIAdvice = () => {
    if (liveState.phase === 'INNINGS_BREAK') {
      return `The innings break is causing a surge in West Wing traffic. I recommend Gate 4 (East) for a faster exit or the South Food Court.`;
    }
    if (liveState.crowdDensity > 0.8) {
      return `Crowd density is reaching critical levels in your sector. Stay seated and follow staff directions for flow control.`;
    }
    return `Enjoying the match, ${user.name}? All stadium amenities currently have minimal wait times. Now is the perfect time for food.`;
  };

  const handleSpeech = () => {
    if ('speechSynthesis' in window) {
      setSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(getAIAdvice());
      utterance.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="animate-in">
      <div style={{ marginBottom: '3rem' }}>
        <h3 className="label-medium text-primary" style={{ marginBottom: '0.5rem' }}>Match Identity</h3>
        <h1>{activeMatch.match}</h1>
        <p className="text-secondary">{activeMatch.venue} • {activeMatch.city}</p>
      </div>

      <div className="dashboard-layout">
        {/* Main Status */}
        <div className="col-8">
          <div className="md-card-filled" style={{ height: '400px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                <TrendingUp size={20} />
                <span className="label-medium">Live Arena Analytics</span>
              </div>
              <h2 style={{ fontSize: '4.5rem', fontWeight: 700, lineHeight: 1 }}>{liveState.score}</h2>
              <p style={{ fontSize: '1.25rem', opacity: 0.8 }}>Overs: {liveState.overs} • {liveState.phase}</p>
            </div>
            
            {/* Visual Waves for Density */}
            <motion.div 
               animate={{ opacity: [0.1, 0.3, 0.1] }}
               transition={{ repeat: Infinity, duration: 4 }}
               style={{ 
                 position: 'absolute', 
                 bottom: '-20%', 
                 right: '-10%', 
                 width: '500px', 
                 height: '500px', 
                 background: 'var(--md-sys-color-on-primary)', 
                 borderRadius: '500px',
                 filter: 'blur(100px)' 
               }} 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div className={`md-card ${liveState.crowdDensity > 0.7 ? 'heat-high' : 'heat-low'}`} style={{ color: 'white' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <Users size={20} />
                <span className="label-medium">Crowd Load</span>
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>{(liveState.crowdDensity * 100).toFixed(0)}%</h2>
              <p style={{ opacity: 0.8 }}>{liveState.crowdDensity > 0.7 ? 'Capacity Alert' : 'Normal Flow'}</p>
            </div>
            <div className="md-card" style={{ background: 'white', border: '1px solid var(--md-sys-color-primary-container)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                 <Clock size={20} color="var(--md-sys-color-primary)" />
                 <span className="label-medium text-primary">Session Time</span>
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>210m</h2>
              <p className="text-secondary">Elapsed Intelligence</p>
            </div>
          </div>
        </div>

        {/* AI Concierge */}
        <div className="col-4">
          <div className="md-card-elevated" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              <Sparkles color="var(--md-sys-color-primary)" />
              <h3 style={{ fontWeight: 600 }}>Nexus AI Concierge</h3>
            </div>
            
            <div style={{ 
              flex: 1, 
              background: 'var(--md-sys-color-surface-variant)', 
              borderRadius: '20px', 
              padding: '1.5rem',
              position: 'relative',
              marginBottom: '2rem'
            }}>
              <p style={{ fontSize: '1rem', lineHeight: 1.6, fontWeight: 500 }}>
                "{getAIAdvice()}"
              </p>
              <AnimatePresence>
                {speaking && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ position: 'absolute', bottom: '1rem', right: '1rem', display: 'flex', gap: '4px' }}
                  >
                    {[1,2,3].map(i => (
                      <motion.div 
                        key={i}
                        animate={{ height: [4, 12, 4] }}
                        transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                        style={{ width: '4px', background: 'var(--md-sys-color-primary)', borderRadius: '10px' }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              onClick={handleSpeech}
              className="md-card-filled" 
              style={{ width: '100%', padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', fontWeight: 600 }}
            >
              <Mic size={20} /> {speaking ? 'Speaking...' : 'Listen to Advice'}
            </button>
            <p className="text-secondary" style={{ fontSize: '0.7rem', textAlign: 'center', marginTop: '1rem' }}>AI context updated 2s ago</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
