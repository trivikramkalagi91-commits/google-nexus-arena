import React from 'react';
import { User } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'nexus', label: 'The Nexus' },
    { id: 'ledger', label: 'Your Ledger' }
  ];

  return (
    <nav className="nav-bar container">
      <div 
        className="serif" 
        style={{ fontSize: '1.5rem', fontWeight: 600, cursor: 'pointer' }}
        onClick={() => setActiveTab('dashboard')}
      >
        AETHER
      </div>
      <div style={{ display: 'flex', gap: '2.5rem' }}>
        {tabs.map((tab) => (
          <a
            key={tab.id}
            href={`#${tab.id}`}
            className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab(tab.id);
            }}
          >
            {tab.label}
          </a>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', opacity: 0.8 }}>
        <User size={18} />
        <span className="sans" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 500 }}>Julian Drax</span>
      </div>
    </nav>
  );
};

export default Navbar;
