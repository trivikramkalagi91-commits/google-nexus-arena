import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { IPL_2026_SCHEDULE, getStadiumConfig } from '../data/ipl_schedule';

const MatchContext = createContext();

export const MatchProvider = ({ children }) => {
  // Today's Date Detection
  const today = new Date().toLocaleDateString('en-CA');
  const activeMatch = useMemo(() => {
    return IPL_2026_SCHEDULE.find(m => m.date === today) || IPL_2026_SCHEDULE.find(m => m.date === '2026-04-17');
  }, [today]);

  const [timeOffset, setTimeOffset] = useState(0); 

  const calculateOvers = (mins) => {
    if (mins <= 0) return "0.0";
    // Simplified: 1 over every 4.5 minutes
    const totalBalls = Math.floor(mins / 0.75); // approx 1 ball per 45s
    const overs = Math.floor(totalBalls / 6);
    const balls = totalBalls % 6;
    return `${overs}.${balls}`;
  };

  const [liveState, setLiveState] = useState({
    score: '0/0',
    wickets: 0,
    overs: '0.0',
    phase: 'PRE_MATCH',
    crowdDensity: 0.1,
    alerts: [],
    nextPhaseTime: 0
  });

  // Simulation Tick
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      // Assume match starts at 7:30 PM (19:30) local time
      const matchStart = new Date(now);
      matchStart.setHours(19, 30, 0, 0);
      
      const diffMs = (now.getTime() + (timeOffset * 60000)) - matchStart.getTime();
      const diffMins = Math.floor(diffMs / 60000);

      let phase = 'PRE_MATCH';
      let density = 0.2;
      let score = '0/0';
      let overs = '0.0';
      let wickets = 0;
      let alerts = [];
      let nextPhaseTime = 0;

      if (diffMins < 0) {
        phase = 'PRE_MATCH';
        density = 0.3;
        nextPhaseTime = Math.abs(diffMins);
      } else if (diffMins < 45) { // Extended Powerplay
        phase = 'POWERPLAY';
        density = 0.8;
        overs = calculateOvers(diffMins);
        score = `${Math.floor(diffMins * 1.8)}/${Math.floor(diffMins/15)}`;
        nextPhaseTime = 45 - diffMins;
      } else if (diffMins < 120) { // Longer First Innings
        phase = 'MID_OVERS';
        density = 0.9;
        overs = calculateOvers(diffMins);
        score = `${70 + Math.floor((diffMins-45) * 1.4)}/3`;
        nextPhaseTime = 120 - diffMins;
      } else if (diffMins < 140) { // 20 min break
        phase = 'INNINGS_BREAK';
        density = 0.95; 
        score = '182/6 (20.0)';
        overs = '20.0';
        nextPhaseTime = 140 - diffMins;
      } else if (diffMins < 260) { // Chase lasts until ~11:50 PM
        phase = 'CHASE';
        density = 0.88;
        overs = calculateOvers(diffMins - 140);
        score = `${Math.floor((diffMins-140) * 1.6)}/2`;
        nextPhaseTime = 260 - diffMins;
      } else {
        phase = 'POST_MATCH';
        density = 0.4;
        score = 'GT won by 8 runs';
        nextPhaseTime = 0;
      }

      const jitter = (Math.random() - 0.5) * 0.05;
      
      setLiveState({
        phase,
        crowdDensity: Math.max(0.1, Math.min(1, density + jitter)),
        score,
        overs,
        wickets,
        alerts,
        nextPhaseTime
      });
    };

    tick();
    const id = setInterval(tick, 5000);
    return () => clearInterval(id);
  }, [timeOffset]);

  const currentNotifications = useMemo(() => {
    const alerts = [];
    if (liveState.crowdDensity > 0.8) {
      alerts.push({ id: 'crowd', type: 'CRITICAL', message: 'Critical bottleneck detected at North Concourse. Follow personnel for diversion.' });
    } else if (liveState.crowdDensity > 0.6) {
      alerts.push({ id: 'density', type: 'WARNING', message: 'High crowd density in public plazas. Maintain spacing.' });
    }
    
    if (liveState.phase === 'INNINGS_BREAK') {
      alerts.push({ id: 'phase', type: 'INFO', message: 'Innings break active. High traffic expected at amenities.' });
    }
    
    return alerts;
  }, [liveState.crowdDensity, liveState.phase]);

  return (
    <MatchContext.Provider value={{ 
      activeMatch, 
      liveState, 
      timeOffset, 
      setTimeOffset, 
      stadium: getStadiumConfig(activeMatch.stadium_id),
      notifications: currentNotifications
    }}>
      {children}
    </MatchContext.Provider>
  );
};

export const useMatch = () => useContext(MatchContext);
