import { render, screen, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';
import { UserProvider, useUser } from '../context/UserContext';
import Dashboard from '../components/Dashboard';

const TestComponent = ({ persona, userName = 'Julian' }) => {
  return (
    <UserProvider>
      <LanguageProvider>
        <InnerTest persona={persona} userName={userName} />
      </LanguageProvider>
    </UserProvider>
  );
};

const InnerTest = ({ persona, userName }) => {
  const { setLang } = useLanguage();
  const { onboardUser } = useUser();

  React.useEffect(() => {
    onboardUser(userName, persona);
  }, []);

  return (
    <div>
      <button onClick={() => setLang('hi')}>Switch to Hindi</button>
      <Dashboard />
    </div>
  );
};

describe('Aether Logic & Internationalization', () => {
  
  it('renders English greeting with dynamic name', async () => {
    render(<TestComponent persona="attendee" userName="Trivikram" />);
    // Wait for the useEffect to fire and update the name
    expect(await screen.findByText(/Good morning, Trivikram/i)).toBeInTheDocument();
  });

  it('switches to Hindi correctly with dynamic name', async () => {
    render(<TestComponent persona="attendee" userName="Trivikram" />);
    const button = screen.getByText(/Switch to Hindi/i);
    
    await act(async () => {
      button.click();
    });

    expect(await screen.findByText(/शुभ प्रभात, Trivikram/i)).toBeInTheDocument();
  });

  it('shows Speaker Access content when persona is speaker', async () => {
    render(<TestComponent persona="speaker" userName="Julian" />);
    expect(await screen.findByText(/SPEAKER ACCESS/i)).toBeInTheDocument();
    expect(await screen.findByText(/Your presentation 'Spatial Ethics'/i)).toBeInTheDocument();
  });

  it('shows Attendee Access content when persona is attendee', async () => {
    render(<TestComponent persona="attendee" userName="Julian" />);
    expect(await screen.findByText(/ATTENDEE ACCESS/i)).toBeInTheDocument();
  });

});
