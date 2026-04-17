import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMatch } from '../context/MatchContext';
import { AlertTriangle, AlertCircle, Info, ChevronRight } from 'lucide-react';

const AlertTray = () => {
  const { notifications } = useMatch();

  if (!notifications || notifications.length === 0) return null;

  return (
    <div style={{ 
      position: 'fixed', 
      top: '5.5rem', 
      left: '50%', 
      transform: 'translateX(-50%)', 
      zIndex: 1100,
      width: '90%',
      maxWidth: '600px'
    }}>
      <AnimatePresence>
        {notifications.map((alert, idx) => (
          <motion.div
            key={alert.id}
            initial={{ y: -20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.95 }}
            transition={{ delay: idx * 0.1 }}
            className="md-card-elevated"
            style={{ 
              marginBottom: '0.75rem', 
              padding: '1rem 1.5rem',
              background: alert.type === 'CRITICAL' ? 'var(--status-red)' : alert.type === 'WARNING' ? 'var(--status-yellow)' : 'var(--md-sys-color-primary)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              border: 'none',
              borderRadius: '16px'
            }}
          >
            {alert.type === 'CRITICAL' ? <AlertTriangle size={20} /> : alert.type === 'WARNING' ? <AlertCircle size={20} /> : <Info size={20} />}
            <div style={{ flex: 1 }}>
              <p className="label-medium" style={{ fontSize: '0.65rem', opacity: 0.8, marginBottom: '0.1rem' }}>{alert.type} ALERT</p>
              <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>{alert.message}</p>
            </div>
            <ChevronRight size={18} opacity={0.5} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default AlertTray;
