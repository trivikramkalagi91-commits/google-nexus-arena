import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Utensils, DoorOpen, Bath, Zap, ChevronRight, MapPin, Check, AlertTriangle } from 'lucide-react';
import { useMatch } from '../context/MatchContext';

const Ledger = () => {
  const { stadium, liveState } = useMatch();
  const [highlightedGateId, setHighlightedGateId] = React.useState(null);

  const handleDirectFastest = () => {
    const gates = stadium.amenities.filter(a => a.type === 'GATE');
    if (gates.length > 0) {
      const fastest = gates.reduce((prev, curr) => (prev.baseWait < curr.baseWait ? prev : curr));
      setHighlightedGateId(fastest.id);
    }
  };

  const getWaitLevel = (wait) => {
    const adjustedWait = wait + (liveState.crowdDensity > 0.7 ? 10 : 0);
    if (adjustedWait > 20) return { color: 'var(--status-red)', label: 'Heavy' };
    if (adjustedWait > 10) return { color: 'var(--status-yellow)', label: 'Moderate' };
    return { color: 'var(--status-green)', label: 'Optimal' };
  };

  const getIcon = (type) => {
    switch(type) {
      case 'GATE': return <DoorOpen size={20} />;
      case 'FOOD': return <Utensils size={20} />;
      case 'RESTROOM': return <Bath size={20} />;
      default: return <Zap size={20} />;
    }
  };

  const [orderMode, setOrderMode] = React.useState(null);
  const [reportSuccess, setReportSuccess] = React.useState(false);

  const handleOrder = (amenity) => {
    setOrderMode(amenity);
    setTimeout(() => {
      setOrderMode({ ...amenity, confirmed: true });
      setTimeout(() => setOrderMode(null), 2500);
    }, 1500);
  };

  const handleReport = () => {
    setReportSuccess(true);
    setTimeout(() => setReportSuccess(false), 3000);
  };

  return (
    <div className="animate-in">
      <AnimatePresence>
        {orderMode && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="md-card-elevated"
              style={{ padding: '2.5rem', maxWidth: '400px', textAlign: 'center' }}
            >
              {!orderMode.confirmed ? (
                <>
                  <div className="spinner" style={{ margin: '0 auto 1.5rem' }}></div>
                  <h3>Nexus Pay: Processing</h3>
                  <p className="text-secondary" style={{ marginTop: '0.5rem' }}>Securing line position for {orderMode.name}...</p>
                </>
              ) : (
                <>
                  <div style={{ width: '64px', height: '64px', background: 'var(--status-green)', borderRadius: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'white' }}>
                    <Check size={32} />
                  </div>
                  <h3>Slot Confirmed!</h3>
                  <p className="text-secondary" style={{ marginTop: '0.5rem' }}>Your order is queued. Head to {orderMode.name} in 8 mins.</p>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>Live Wait-Time Ledger</h1>
        <p className="text-secondary">Across {stadium.sectors.length} identified arena sectors</p>
      </div>

      <div className="dashboard-layout">
        <div className="col-8">
          <div className="md-card-elevated" style={{ padding: '0' }}>
            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--md-sys-color-surface-variant)', display: 'flex', justifyContent: 'space-between' }}>
              <span className="label-medium">Service / Amenity</span>
              <span className="label-medium">Action / Status</span>
            </div>
            
            {stadium.amenities.map((amenity, idx) => {
              const waitStatus = getWaitLevel(amenity.baseWait);
              const adjustedWait = amenity.baseWait + (liveState.crowdDensity > 0.8 ? 15 : liveState.crowdDensity > 0.5 ? 5 : 0);
              
              return (
                <motion.div 
                  key={amenity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  style={{ 
                    padding: '1.5rem 2rem', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    borderBottom: idx === stadium.amenities.length - 1 ? 'none' : '1px solid var(--md-sys-color-surface-variant)',
                    background: highlightedGateId === amenity.id ? 'rgba(52, 168, 83, 0.1)' : 'transparent',
                    borderLeft: highlightedGateId === amenity.id ? '4px solid var(--status-green)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{ 
                      width: '44px', 
                      height: '44px', 
                      borderRadius: '12px', 
                      background: 'var(--md-sys-color-surface-variant)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--md-sys-color-primary)'
                    }}>
                      {getIcon(amenity.type)}
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: '1rem' }}>{amenity.name}</p>
                      <p className="text-secondary" style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <MapPin size={10} /> {adjustedWait}m wait
                      </p>
                    </div>
                  </div>
                  
                  {amenity.type === 'FOOD' ? (
                    <button 
                      onClick={() => handleOrder(amenity)}
                      className="md-card-filled" 
                      style={{ padding: '0.5rem 1.25rem', fontSize: '0.8rem', borderRadius: '100px' }}
                    >
                      Pre-Order
                    </button>
                  ) : (
                    <div style={{ textAlign: 'right' }}>
                      <p className="label-medium" style={{ fontSize: '0.65rem', color: waitStatus.color }}>{waitStatus.label} FLOW</p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="col-4">
          <div className="md-card-filled" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
            <Zap size={32} style={{ marginBottom: '1rem' }} />
            <h3>Nexus Recommendation</h3>
            <p style={{ marginTop: '1rem', lineHeight: '1.6', fontSize: '0.9rem' }}>
              {liveState.phase === 'INNINGS_BREAK' 
                ? "Match break active. Concourse traffic is peaking. We suggest waiting 8 more minutes before heading to Nexus Food Court North."
                : "Match flow is stable. All amenities are currently showing optimal wait times. Great time to visit the Official Store."}
            </p>
            <button 
              onClick={handleDirectFastest}
              className="md-card-elevated" 
              style={{ 
                width: '100%', 
                padding: '0.75rem', 
                marginTop: '1.5rem', 
                fontWeight: 600, 
                fontSize: '0.85rem',
                background: highlightedGateId ? 'var(--status-green)' : 'white',
                color: highlightedGateId ? 'white' : 'inherit'
              }}
            >
              {highlightedGateId ? 'Gate Identified' : 'Direct me to fastest Gate'}
            </button>
          </div>

          <div className="md-card" style={{ padding: '2rem', border: '1px dashed var(--md-sys-color-outline)' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Local Bottleneck?</h3>
            <p className="text-secondary" style={{ fontSize: '0.85rem', marginBottom: '1.5rem' }}>See a crowd building up? Help the community by reporting it.</p>
            <button 
              onClick={handleReport}
              className="nav-item" 
              style={{ width: '100%', border: '1px solid var(--md-sys-color-outline)', justifyContent: 'center', color: reportSuccess ? 'var(--status-green)' : 'inherit' }}
            >
              <AlertTriangle size={18} /> {reportSuccess ? 'Report Sent' : 'Report Overcrowding'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ledger;
