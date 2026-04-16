import React, { createContext, useState, useContext, useEffect } from 'react';
import { IPL_2026_SCHEDULE } from '../data/ipl_schedule';

const LiveFeedContext = createContext();

export const LiveFeedProvider = ({ children }) => {
  const [matchDay, setMatchDay] = useState(null);
  const [liveState, setLiveState] = useState({
    score: 'Fetching...',
    wickets: 0,
    overs: '0.0',
    phase: 'PRE_MATCH', // PRE_MATCH, IN-PLAY, BREAK, POST_MATCH
    crowdDensity: 0.3,
    bottleNeckAlert: null
  });

  useEffect(() => {
    // Detect Today's Match
    const today = new Date().toISOString().split('T')[0];
    const match = IPL_2026_SCHEDULE.find(m => m.date === today) || IPL_2026_SCHEDULE[0]; // Fallback to a demo match
    setMatchDay(match);

    // Simulation Engine: Updates every 10s to simulate "Live" data flow
    const interval = setInterval(() => {
      setLiveState(prev => {
        const nextOvers = (parseFloat(prev.overs) + 0.1).toFixed(1);
        const isWicket = Math.random() > 0.9;
        const currentDensity = nextOvers > 5.0 ? 0.8 : 0.4;

        return {
          ...prev,
          score: `${140 + Math.floor(Math.random() * 20)}`,
          wickets: isWicket ? prev.wickets + 1 : prev.wickets,
          overs: nextOvers,
          phase: parseFloat(nextOvers) > 20 ? 'BREAK' : 'IN-PLAY',
          crowdDensity: currentDensity,
          bottleNeckAlert: currentDensity > 0.7 ? 'CONCOURSE_NORTH' : null
        };
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <LiveFeedContext.Provider value={{ matchDay, liveState }}>
      {children}
    </LiveFeedContext.Provider>
  );
};

export const useLiveFeed = () => useContext(LiveFeedContext);
