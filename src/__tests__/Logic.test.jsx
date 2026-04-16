import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';
import Dashboard from '../components/Dashboard';

// Mocking useLanguage for direct component testing if needed
// But we want to test with the actual Provider for integration

const TestComponent = ({ persona }) => {
  return (
    <LanguageProvider>
      <InnerTest persona={persona} />
    </LanguageProvider>
  );
};

const InnerTest = ({ persona }) => {
  const { setLang, t } = useLanguage();
  return (
    <div>
      <button onClick={() => setLang('hi')}>Switch to Hindi</button>
      <Dashboard persona={persona} />
    </div>
  );
};

describe('Aether Logic & Internationalization', () => {
  
  it('renders English greeting by default', () => {
    render(<TestComponent persona="attendee" />);
    expect(screen.getByText(/Good morning, Julian/i)).toBeInTheDocument();
  });

  it('switches to Hindi correctly', async () => {
    render(<TestComponent persona="attendee" />);
    const button = screen.getByText(/Switch to Hindi/i);
    
    await act(async () => {
      button.click();
    });

    expect(screen.getByText(/शुभ प्रभात, जूलियन/i)).toBeInTheDocument();
  });

  it('shows Speaker Access content when persona is speaker', () => {
    render(<TestComponent persona="speaker" />);
    expect(screen.getByText(/SPEAKER ACCESS/i)).toBeInTheDocument();
    expect(screen.getByText(/Your presentation 'Spatial Ethics'/i)).toBeInTheDocument();
  });

  it('shows Attendee Access content when persona is attendee', () => {
    render(<TestComponent persona="attendee" />);
    expect(screen.getByText(/ATTENDEE ACCESS/i)).toBeInTheDocument();
  });

});
