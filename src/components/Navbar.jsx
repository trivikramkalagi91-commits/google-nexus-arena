import React from 'react';

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
        style={{ fontSize: '1.25rem', fontWeight: 600, cursor: 'pointer', letterSpacing: '0.1em' }}
        onClick={() => setActiveTab('dashboard')}
      >
        AETHER
      </div>
      
      <div className="nav-links">
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

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: '32px', height: '1px', background: 'rgba(26,26,26,0.1)' }}></div>
        <span className="sans" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.6 }}>
          Julian Drax
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
