import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    dashboard: 'Dashboard',
    nexus: 'The Nexus',
    ledger: 'Your Ledger',
    greeting: 'Good morning, Julian.',
    speakerAccess: 'SPEAKER ACCESS • STAGE 01',
    attendeeAccess: 'ATTENDEE ACCESS • LEVEL 02',
    speakerGreeting: "Your presentation 'Spatial Ethics' is scheduled for 10:30 AM. Stage 01 is currently preparing for your arrival.",
    attendeeGreeting: "The Aether summit is in full flow. Your primary briefing in the Atrium begins in 14 minutes.",
    now: 'NOW',
    ethicTitle: 'Spatial Ethics in the AI Age',
    techCheck: 'Tech Check: Stage 01',
    preSession: 'Pre-session sequence',
    venue: 'Hall A • Stage 01 • Elena Vane',
    nextOnLedger: 'Next on your Ledger',
    concierge: 'CONCIERGE',
    speakerAI: "'Julian, I've confirmed your slides are loaded. Would you like a water service at the podium?'",
    attendeeAI: "'Julian, I've noticed you have a gap. Would you like me to reserve a private pod in the Gallery Lounge?'",
    confirm: 'Confirm',
    reserve: 'Reserve',
    pass: 'Pass',
    resonanceTitle: 'SPATIAL RESONANCE',
    speakerResonance: 'Event Organizer Sarah is entering Stage 01. Tech check recommended.',
    attendeeResonance: 'Marcus Stone from your Ledger is nearby in the Coffee Lab.',
    temporalLedger: 'Temporal Ledger',
    spatialNav: 'Spatial Navigation',
    youAreHere: 'YOU ARE HERE'
  },
  hi: {
    dashboard: 'डैशबोर्ड',
    nexus: 'द नेक्सस',
    ledger: 'आपका लेजर',
    greeting: 'शुभ प्रभात, जूलियन।',
    speakerAccess: 'वक्ता पहुंच • स्टेज 01',
    attendeeAccess: 'भागीदार पहुंच • स्तर 02',
    speakerGreeting: "आपका प्रस्तुतीकरण 'स्थानिक नैतिकता' सुबह 10:30 बजे निर्धारित है। स्टेज 01 आपके आगमन की तैयारी कर रहा है।",
    attendeeGreeting: "एथर शिखर सम्मेलन पूरे प्रवाह में है। एट्रियम में आपकी प्राथमिक ब्रीफिंग 14 मिनट में शुरू होगी।",
    now: 'अभी',
    ethicTitle: 'एआई युग में स्थानिक नैतिकता',
    techCheck: 'टेक चेक: स्टेज 01',
    preSession: 'सत्र-पूर्व अनुक्रम',
    venue: 'हॉल ए • स्टेज 01 • एलेना वेन',
    nextOnLedger: 'आपके लेजर पर अगला',
    concierge: 'सहायक',
    speakerAI: "'जूलियन, मैंने पुष्टि की है कि आपकी स्लाइड्स लोड हो गई हैं। क्या आप पोडियम पर पानी की सेवा चाहेंगे?'",
    attendeeAI: "'जूलियन, मैंने देखा है कि आपके पास समय है। क्या आप चाहते हैं कि मैं गैलरी लाउंज में एक निजी पॉड सुरक्षित करूँ?'",
    confirm: 'पुष्टि करें',
    reserve: 'आरक्षित करें',
    pass: 'छोड़ें',
    resonanceTitle: 'स्थानिक प्रतिध्वनि',
    speakerResonance: 'इवेंट ऑर्गनाइज़र सारा स्टेज 01 में प्रवेश कर रही हैं। टेक चेक की सिफारिश की जाती है।',
    attendeeResonance: 'आपके लेजर से मार्कस स्टोन पास के कॉफी लैब में हैं।',
    temporalLedger: 'सामयिक लेजर',
    spatialNav: 'स्थानिक नेविगेशन',
    youAreHere: 'आप यहाँ हैं'
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');

  const t = (key) => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
