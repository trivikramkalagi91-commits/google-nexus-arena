import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Users, Info, ShieldAlert, Navigation, Compass, ArrowUp, Check, Shield, Map as MapIcon } from 'lucide-react';
import { useMatch } from '../context/MatchContext';
import { useUser } from '../context/UserContext';

const NexusMap = () => {
  const { activeMatch, liveState, stadium } = useMatch();
  const { user } = useUser();
  const [selectedSector, setSelectedSector] = useState(null);
  const [virtualSector, setVirtualSector] = useState(null);
  const [showRoute, setShowRoute] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Dynamic Geometry Generator for Stadium Layouts
  const generateSectors = (sectorList) => {
    return sectorList.map((id, index) => {
      const angle = (index / sectorList.length) * (2 * Math.PI);
      const nextAngle = ((index + 1) / sectorList.length) * (2 * Math.PI);
      
      const rInner = 160;
      const rOuter = 260;
      
      const x1 = 400 + rInner * Math.cos(angle);
      const y1 = 300 + rInner * Math.sin(angle);
      const x2 = 400 + rOuter * Math.cos(angle);
      const y2 = 300 + rOuter * Math.sin(angle);
      const x3 = 400 + rOuter * Math.cos(nextAngle);
      const y3 = 300 + rOuter * Math.sin(nextAngle);
      const x4 = 400 + rInner * Math.cos(nextAngle);
      const y4 = 300 + rInner * Math.sin(nextAngle);
      
      const d = `M ${x1},${y1} L ${x2},${y2} A ${rOuter},${rOuter} 0 0 1 ${x3},${y3} L ${x4},${y4} A ${rInner},${rInner} 0 0 0 ${x1},${y1}`;
      
      return { 
        id, 
        name: id.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase()), 
        d 
      };
    });
  };

  const sectors = generateSectors(stadium.sectors);

  const getNavigationSteps = () => {
    const section = user.ticket.section || 'Your Sector';
    const gate = user.ticket.gate || 'Nearest Gate';
    const seat = user.ticket.seat || 'Assigned Seat';
    
    return [
      { instruction: `Proceed to ${gate} for faster entry`, icon: <Compass size={20} /> },
      { instruction: `Walk through Concourse B towards ${section}`, icon: <Shield size={20} /> },
      { instruction: `Locate Seat ${seat} in Row 12`, icon: <Check size={20} /> }
    ];
  };

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 1.1;
      window.speechSynthesis.speak(u);
    }
  };

  const handleSectorClick = (sector) => {
    setSelectedSector(sector);
    setVirtualSector(sector);
    setShowRoute(false);
    setCurrentStep(0);
  };

  const startNavigation = () => {
    setShowRoute(true);
    setCurrentStep(0);
    const steps = getNavigationSteps();
    speak(`Route active. ${steps[0].instruction}`);
  };

  const nextStep = () => {
    const steps = getNavigationSteps();
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      speak(steps[currentStep + 1].instruction);
    } else {
      setShowRoute(false);
      speak(`You have arrived, ${user.name}. Enjoy the match!`);
    }
  };

  const getHeatColor = (density, sectorId) => {
    if (sectorId === 'PITCH') return '#E8F5E9';
    const heat = density;
    if (heat > 0.8) return 'var(--status-red)';
    if (heat > 0.5) return 'var(--status-yellow)';
    return 'var(--status-green)';
  };

  return (
    <div className="animate-in">
      <div className="md-card-elevated" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Navigation size={28} color="var(--md-sys-color-primary)" />
              {activeMatch.venue}
            </h2>
            <p className="text-secondary" style={{ marginTop: '0.25rem' }}>Digital Twin • Real-time Crowd Topology</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
             {!virtualSector && (
               <div style={{ fontSize: '0.75rem', color: 'var(--status-yellow)', fontWeight: 600, border: '1px solid var(--status-yellow)', padding: '0.25rem 0.75rem', borderRadius: '100px' }}>
                 REMOTE ACCESS (1,240km away)
               </div>
             )}
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--md-sys-color-surface-variant)', padding: '0.5rem 1rem', borderRadius: '100px' }}>
                <Users size={16} />
                <span className="label-medium">{Math.floor(liveState.crowdDensity * 100)}% Capacity</span>
             </div>
          </div>
        </div>

        <div style={{ 
          background: '#F1F3F4', 
          borderRadius: '24px', 
          padding: '2rem', 
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '600px',
          border: '1px solid var(--md-sys-color-outline)',
          overflow: 'hidden'
        }}>
          <svg viewBox="0 0 800 600" style={{ width: '100%', height: '100%', maxWidth: '800px' }}>
            <circle cx="400" cy="300" r="280" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
            
            {/* Dynamic Generated Sectors */}
            {sectors.map(sector => (
              <motion.path
                key={sector.id}
                d={sector.d}
                fill={getHeatColor(liveState.crowdDensity, sector.id)}
                stroke="white"
                strokeWidth="2"
                style={{ cursor: 'pointer', opacity: 0.8 }}
                whileHover={{ scale: 1.02, opacity: 1, strokeWidth: 4 }}
                onClick={() => handleSectorClick(sector)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
              />
            ))}

            {/* Pitch (Dynamic Position) */}
            <circle cx="400" cy="300" r="140" fill="#A5D6A7" />
            <rect x="370" y="240" width="60" height="120" fill="#81C784" rx="5" transform="rotate(15 400 300)" />

            {/* AI Callout for Bottlenecks */}
            {liveState.crowdDensity > 0.7 && (
              <g>
                <circle cx="250" cy="150" r="8" fill="var(--status-red)">
                  <animate attributeName="r" values="8;12;8" dur="1s" repeatCount="indefinite" />
                </circle>
              </g>
            )}

            <AnimatePresence>
              {showRoute && (
                <motion.path 
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{ pathLength: 0, opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  d="M 400,580 C 400,500 200,450 250,300" 
                  fill="none" 
                  stroke="var(--md-sys-color-primary)" 
                  strokeWidth="4" 
                  strokeDasharray="8 8" 
                />
              )}
            </AnimatePresence>
          </svg>

          <AnimatePresence>
            {virtualSector && (
              <motion.div 
                key="marker"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}
              >
                <div style={{ background: 'var(--md-sys-color-on-primary-container)', color: 'white', padding: '0.6rem 1.25rem', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '0.75rem', boxShadow: 'var(--shadow-3)', whiteSpace: 'nowrap' }}>
                  <div className="status-pulse" style={{ width: '8px', height: '8px', borderRadius: '100px', background: 'var(--status-green)' }}></div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Virtual Presence: {virtualSector.name}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {selectedSector && (
              <motion.div
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', bottom: '1.5rem', width: '280px', zIndex: 20 }}
              >
                <div className="md-card-elevated" style={{ height: '100%', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <h3 style={{ fontWeight: 600 }}>{selectedSector.name}</h3>
                    <button onClick={() => setSelectedSector(null)} style={{ background: 'none' }}>×</button>
                  </div>
                  
                  <div className="md-card" style={{ marginBottom: '1rem', background: getHeatColor(liveState.crowdDensity, selectedSector.id) + '20' }}>
                    <p className="label-medium" style={{ color: getHeatColor(liveState.crowdDensity, selectedSector.id) }}>Sector Load</p>
                    <p style={{ fontSize: '1.25rem', fontWeight: 700 }}>Optimal</p>
                  </div>

                  <div style={{ flex: 1 }}>
                    <p className="label-medium text-secondary" style={{ marginBottom: '1rem' }}>Local Services</p>
                    {stadium?.amenities && stadium.amenities.slice(0, 3).map(amenity => (
                      <div key={amenity.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                        <span style={{ fontSize: '0.8rem' }}>{amenity.name}</span>
                        <span style={{ fontWeight: 600, fontSize: '0.8rem' }}>{amenity.baseWait}m</span>
                      </div>
                    ))}
                  </div>

                  <button onClick={startNavigation} className="md-card-filled" style={{ width: '100%', padding: '1rem', marginTop: 'auto', background: showRoute ? 'var(--status-green)' : 'var(--md-sys-color-primary)' }}>
                    {showRoute ? 'Guidance Active' : 'Get Route'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showRoute && (
              <motion.div 
                className="nav-card"
                initial={{ y: 50, x: '-50%', opacity: 0 }}
                animate={{ y: 0, x: '-50%', opacity: 1 }}
                exit={{ y: 50, x: '-50%', opacity: 0 }}
              >
                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                  <div className="nav-step-icon">
                    <Navigation size={22} className="status-pulse" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p className="label-medium text-primary">Guidance • Step {currentStep + 1}</p>
                    <p style={{ fontSize: '1rem', fontWeight: 600 }}>
                      {getNavigationSteps()[currentStep].instruction}
                    </p>
                  </div>
                  <button onClick={nextStep} className="md-card-filled" style={{ padding: '0.75rem', borderRadius: '12px' }}>
                    <MapPin size={20} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        <div className="md-card">
          <ShieldAlert color="var(--status-red)" size={24} style={{ marginBottom: '1rem' }} />
          <h3>Safety Protocol</h3>
          <p className="text-secondary" style={{ fontSize: '0.8rem' }}>Stay within marked concourse lanes. Security personnel are stationed every 50m.</p>
        </div>
        <div className="md-card">
          <Info color="var(--md-sys-color-primary)" size={24} style={{ marginBottom: '1rem' }} />
          <h3>Match Info</h3>
          <p className="text-secondary" style={{ fontSize: '0.8rem' }}>Current Match: {activeMatch.match}. Follow live updates in the Intelligence tab.</p>
        </div>
        <div className="md-card">
          <Users color="var(--md-sys-color-secondary)" size={24} style={{ marginBottom: '1rem' }} />
          <h3>Gate Access</h3>
          <p className="text-secondary" style={{ fontSize: '0.8rem' }}>Your Entry: {user.ticket.gate || 'Not Set'}. Scan QR at turnstile B.</p>
        </div>
      </div>
    </div>
  );
};

export default NexusMap;
