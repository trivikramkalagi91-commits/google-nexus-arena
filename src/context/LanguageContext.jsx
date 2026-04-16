import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    dashboard: 'Arena Hub',
    nexus: 'The Nexus Arena',
    ledger: 'Match Agenda',
    greeting: 'Welcome to the Arena, {name}.',
    speakerAccess: 'STAFF ACCESS • GATE 01',
    attendeeAccess: 'FAN ACCESS • SECTION 102',
    speakerGreeting: "The Match begins in 45 minutes. Stadium security and crowd sensors are online.",
    attendeeGreeting: "Nexus Arena is buzzing. Your seat in Section 102 has the best view for the opening ceremony.",
    now: 'LIVE',
    ethicTitle: 'Grand Opening & Kick-off',
    techCheck: 'Security Briefing: Gate A',
    preSession: 'Fan-zone activities',
    venue: 'Nexus Arena • Google Stadium • Powered by Gemini',
    nextOnLedger: 'Next Match Event',
    concierge: 'ARENA ASSISTANT',
    speakerAI: "'{name}, crowd flow at Gate 4 is increasing. Recommend opening the express lanes now.'",
    attendeeAI: "'{name}, I've noticed you're near Gate B. The wait for the restroom there is only 2 minutes compared to 15 minutes at Gate A.'",
    confirm: 'Navigate',
    reserve: 'Order Food',
    pass: 'Wait',
    resonanceTitle: 'HALFTIME SPECTACLE',
    speakerResonance: 'Pitch maintenance crew is ready for the interval.',
    attendeeResonance: 'Your group is currently at the Fan Zone. Tap to send a beacon.',
    temporalLedger: 'Match Schedule',
    spatialNav: 'Arena Wayfinding',
    youAreHere: 'YOU ARE HERE'
  },
  hi: {
    dashboard: 'अखाड़ा हब',
    nexus: 'नेक्सस अखाड़ा',
    ledger: 'मैच एजेंडा',
    greeting: 'अखाड़े में आपका स्वागत है, {name}।',
    speakerAccess: 'कर्मचारी पहुंच • गेट 01',
    attendeeAccess: 'प्रशंसक पहुंच • अनुभाग 102',
    speakerGreeting: "मैच 45 मिनट में शुरू होगा। स्टेडियम सुरक्षा और भीड़ सेंसर ऑनलाइन हैं।",
    attendeeGreeting: "नेक्सस अखाड़ा गूंज रहा है। अनुभाग 102 में आपकी सीट उद्घाटन समारोह के लिए सबसे अच्छा दृश्य है।",
    now: 'लाइव',
    ethicTitle: 'भव्य उद्घाटन और किक-ऑफ',
    techCheck: 'सुरक्षा ब्रीफिंग: गेट ए',
    preSession: 'फैन-ज़ोन गतिविधियाँ',
    venue: 'नेक्सस अखाड़ा • गूगल स्टेडियम • जेमिनी द्वारा संचालित',
    nextOnLedger: 'अगला मैच इवेंट',
    concierge: 'अखाड़ा सहायक',
    speakerAI: "'{name}, गेट 4 पर भीड़ का प्रवाह बढ़ रहा है। एक्सप्रेस लेन अभी खोलने की सिफारिश की जाती है।'",
    attendeeAI: "'{name}, मैंने देखा है कि आप गेट बी के पास हैं। वहां शौचालय के लिए प्रतीक्षा केवल 2 मिनट है, जबकि गेट ए पर 15 मिनट है।'",
    confirm: 'नेविगेट करें',
    reserve: 'भोजन ऑर्डर करें',
    pass: 'प्रतीक्षा करें',
    resonanceTitle: 'हाफ-टाइम तमाशा',
    speakerResonance: 'पिच रखरखाव दल अंतराल के लिए तैयार है।',
    attendeeResonance: 'आपका समूह वर्तमान में फैन ज़ोन में है। बीकन भेजने के लिए टैप करें।',
    temporalLedger: 'मैच कार्यक्रम',
    spatialNav: 'अखाड़ा वेफाइंडिंग',
    youAreHere: 'आप यहाँ हैं'
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');

  const t = (key, params = {}) => {
    let text = String(translations[lang][key] || key || '');
    if (text) {
      Object.keys(params).forEach(param => {
        text = text.replace(`{${param}}`, params[param]);
      });
    }
    return text;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
