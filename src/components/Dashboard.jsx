import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { useLiveFeed } from '../context/LiveFeedContext';
import { Clock, TrendingUp, Users, Activity } from 'lucide-react';

const Dashboard = () => {
  const { t } = useLanguage();
  const { user } = useUser();
  const { matchDay, liveState } = useLiveFeed();
  const isSpeaker = user.role === 'speaker';

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.19, 1, 0.22, 1] } }
  };

  return (
    <motion.div 
      className="container"
      variants={container}
      initial="hidden"
      animate="show"
      style={{ paddingBottom: '8rem' }}
    >
      <motion.div variants={item} style={{ marginBottom: '6rem', position: 'relative' }}>
        <h3 className="serif" style={{ marginBottom: '1.5rem', opacity: 0.6 }}>{t('dashboard')}</h3>
        <h1 className="serif" style={{ fontSize: '5rem', lineHeight: '1', marginBottom: '2rem' }}>
          {t('greeting', { name: user.name })}
        </h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="badge" style={{ background: 'var(--accent)', color: '#FFF' }}>
             {matchDay?.city.toUpperCase()} HOST 
          </div>
          <p className="serif" style={{ fontSize: '1.5rem', opacity: 0.8 }}>
             {matchDay?.match}
          </p>
        </div>
      </motion.div>

      <div className="bento-grid">
        {/* Live Scorecard (Evergreen Logic) */}
        <motion.div 
          variants={item} 
          className="bento-card layer-1" 
          style={{ gridColumn: 'span 8', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="badge" style={{ background: '#E53E3E', color: '#FFF' }}>LIVE FEED</div>
              <h2 className="serif" style={{ fontSize: '3.5rem', marginTop: '1.5rem', fontWeight: 800 }}>
                {liveState.score}/{liveState.wickets}
              </h2>
              <p className="sans" style={{ fontSize: '0.8rem', opacity: 0.6 }}>OVERS: {liveState.overs}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <TrendingUp size={24} color="#38A169" />
              <p className="sans" style={{ fontSize: '0.75rem', marginTop: '0.5rem', fontWeight: 700 }}>WIN PROBABILITY: 68%</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '4rem', marginTop: '4rem' }}>
            <div>
              <p className="sans subtitle">PHASE</p>
              <p className="serif" style={{ fontSize: '1.25rem' }}>{liveState.phase.replace('_', ' ')}</p>
            </div>
            <div>
              <p className="sans subtitle">CURRENT VENUE</p>
              <p className="serif" style={{ fontSize: '1.25rem' }}>{matchDay?.stadium_id.replace('_', ' ')}</p>
            </div>
          </div>
        </motion.div>

        {/* Real-time Assistant (Sport Insight Edition) */}
        <motion.div 
          variants={item} 
          className="bento-card layer-2 accent" 
          style={{ gridColumn: 'span 4', padding: '3rem', color: '#FFF' }}
        >
          <Activity size={24} style={{ marginBottom: '2rem' }} />
          <p className="sans" style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.2em', marginBottom: '1.5rem' }}>STADIUM AI</p>
          <p className="serif" style={{ fontSize: '1.25rem', lineHeight: '1.6', marginBottom: '3rem' }}>
            {`"${user.name}, the crowd density in the South Concourse is currently ${Math.floor(liveState.crowdDensity * 100)}%. ${liveState.wickets > 5 ? 'A breakthrough is likely, gates will be busy soon.' : 'Now is the best time for concession orders.'}"`}
          </p>
          <button className="btn-secondary" style={{ width: '100%', marginBottom: '0.5rem' }}>{t('confirm')}</button>
          <button className="btn-secondary" style={{ width: '100%', opacity: 0.6 }}>Check Queues</button>
        </motion.div>

        {/* Coordination & Metrics */}
        <motion.div 
          variants={item} 
          className="bento-card layer-1" 
          style={{ gridColumn: 'span 12', padding: '3rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4rem' }}
        >
          <div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
              <Users size={16} color="var(--accent)" />
              <p className="sans subtitle" style={{ marginBottom: 0 }}>CROWD SATURATION</p>
            </div>
            <p className="serif" style={{ fontSize: '1.25rem' }}>{(liveState.crowdDensity * 10).toFixed(1)} / 10</p>
          </div>
          <div>
            <p className="sans subtitle">NEAREST AMENITY</p>
            <p className="serif" style={{ fontSize: '1.25rem' }}>Food Box B (2m walk)</p>
          </div>
          <div>
            <p className="sans subtitle">WAIT TIME</p>
            <p className="serif" style={{ fontSize: '1.25rem' }}>{Math.floor(liveState.crowdDensity * 20)} Minutes</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
             <button className="btn-primary">Group Beacon</button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
