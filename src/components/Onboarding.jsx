import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { ShieldCheck, User, Zap, ChevronRight, ArrowLeft, Ticket } from 'lucide-react';

const Onboarding = () => {
  const { onboard } = useUser();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: '',
    name: '',
    ticket: { gate: '', section: '', seat: '' }
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleComplete = () => {
    onboard(formData);
  };

  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'var(--md-sys-color-surface)',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '440px', width: '100%' }}>
        
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ textAlign: 'center' }}>
              <div className="md-card-filled" style={{ width: '64px', height: '64px', borderRadius: '16px', margin: '0 auto 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--md-sys-color-primary)' }}>
                <ShieldCheck size={32} />
              </div>
              <h1 style={{ marginBottom: '0.5rem' }}>Welcome to Nexus</h1>
              <p className="text-secondary" style={{ marginBottom: '3rem' }}>Select your arena identity to begin</p>
              
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div onClick={() => { setFormData({...formData, role: 'fan'}); nextStep(); }} className="md-card-elevated" style={{ padding: '1.5rem', cursor: 'pointer', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--md-sys-color-primary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={20} />
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ fontWeight: 600 }}>I am a Spectator</p>
                    <p className="text-secondary" style={{ fontSize: '0.75rem' }}>Personalized navigation & live stats</p>
                  </div>
                </div>
                <div onClick={() => { setFormData({...formData, role: 'staff'}); nextStep(); }} className="md-card" style={{ padding: '1.5rem', cursor: 'pointer', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--md-sys-color-secondary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Zap size={20} />
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ fontWeight: 600 }}>I am Arena Staff</p>
                    <p className="text-secondary" style={{ fontSize: '0.75rem' }}>Stewardship & backend operations</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" variants={containerVariants} initial="hidden" animate="show" exit="exit">
              <button onClick={prevStep} style={{ background: 'none', border: 'none', color: 'var(--md-sys-color-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', cursor: 'pointer' }}>
                <ArrowLeft size={18} /> Back
              </button>
              <h2>What's your name?</h2>
              <p className="text-secondary" style={{ marginTop: '0.5rem', marginBottom: '2rem' }}>This is how we'll address you in AI guidance</p>
              
              <input 
                autoFocus
                type="text" 
                placeholder="Full Name"
                className="md-card-elevated"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                style={{ width: '100%', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--md-sys-color-outline-variant)', fontSize: '1rem', outline: 'none' }}
              />
              
              <button 
                disabled={!formData.name}
                onClick={nextStep}
                className="md-card-filled"
                style={{ width: '100%', padding: '1.25rem', marginTop: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}
              >
                Next Step <ChevronRight size={20} />
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" variants={containerVariants} initial="hidden" animate="show" exit="exit">
              <button onClick={prevStep} style={{ background: 'none', border: 'none', color: 'var(--md-sys-color-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', cursor: 'pointer' }}>
                <ArrowLeft size={18} /> Back
              </button>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                <Ticket size={24} color="var(--md-sys-color-primary)" />
                <h2 style={{ margin: 0 }}>Ticket Details</h2>
              </div>
              <p className="text-secondary" style={{ marginBottom: '2rem' }}>We'll use these to route you to your seat</p>
              
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div>
                  <p className="label-medium" style={{ marginBottom: '0.5rem', marginLeft: '0.5rem' }}>Entry Gate</p>
                  <input 
                    type="text" 
                    placeholder="e.g. Gate 1"
                    className="md-card-elevated"
                    value={formData.ticket.gate}
                    onChange={(e) => setFormData({...formData, ticket: {...formData.ticket, gate: e.target.value}})}
                    style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--md-sys-color-outline-variant)', fontSize: '0.9rem' }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <p className="label-medium" style={{ marginBottom: '0.5rem', marginLeft: '0.5rem' }}>Block / Section</p>
                    <input 
                      type="text" 
                      placeholder="e.g. North Stand"
                      className="md-card-elevated"
                      value={formData.ticket.section}
                      onChange={(e) => setFormData({...formData, ticket: {...formData.ticket, section: e.target.value}})}
                      style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--md-sys-color-outline-variant)', fontSize: '0.9rem' }}
                    />
                  </div>
                  <div>
                    <p className="label-medium" style={{ marginBottom: '0.5rem', marginLeft: '0.5rem' }}>Seat Number</p>
                    <input 
                      type="text" 
                      placeholder="e.g. A24"
                      className="md-card-elevated"
                      value={formData.ticket.seat}
                      onChange={(e) => setFormData({...formData, ticket: {...formData.ticket, seat: e.target.value}})}
                      style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--md-sys-color-outline-variant)', fontSize: '0.9rem' }}
                    />
                  </div>
                </div>
              </div>
              
              <button 
                onClick={handleComplete}
                className="md-card-filled"
                style={{ width: '100%', padding: '1.25rem', marginTop: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}
              >
                Complete Setup <ShieldCheck size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div style={{ textAlign: 'center', marginTop: '3rem', opacity: 0.5 }}>
           <p className="label-medium">Step {step} of 3</p>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
