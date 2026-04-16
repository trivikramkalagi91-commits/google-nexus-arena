import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    dashboard: 'Nexus Hub',
    nexus: 'The Ananta Campus',
    ledger: 'Your Agenda',
    greeting: 'Good morning, {name}.',
    speakerAccess: 'GOOGLER ACCESS • THE SABHA',
    attendeeAccess: 'VISITOR ACCESS • NEIGHBORHOOD 01',
    speakerGreeting: "Your workshop 'Agentic Future with Gemini' is scheduled for 10:30 AM in The Sabha.",
    attendeeGreeting: "Google Nexus Ananta is in full flow. The morning keynote at The Sabha begins in 14 minutes.",
    now: 'LIVE',
    ethicTitle: 'Agentic Future with Gemini',
    techCheck: 'Technical Briefing: The Sabha',
    preSession: 'Neighborhood prep',
    venue: 'The Sabha • Google Bangalore • Sundar P.',
    nextOnLedger: 'Next Google Session',
    concierge: 'NEXUS ASSISTANT',
    speakerAI: "'{name}, your demo environment is synchronized. Would you like a fresh brew from the Coffee Lab?'",
    attendeeAI: "'{name}, you have a 30-minute window. I've reserved a seat in the Innovation Gallery for you.'",
    confirm: 'Sync',
    reserve: 'ReservePod',
    pass: 'Skip',
    resonanceTitle: 'MATERIAL 3 EVOLUTION',
    speakerResonance: 'Developer Relations is ready for the M3 deep dive.',
    attendeeResonance: 'A nearby Googler is sharing early-access Nexus invites in the Sky Garden.',
    temporalLedger: 'Nexus Agenda',
    spatialNav: 'Campus Wayfinding',
    youAreHere: 'YOU AT ANANTA'
  },
  hi: {
    dashboard: 'नेक्सस हब',
    nexus: 'अनंत कैंपस',
    ledger: 'आपका एजेंडा',
    greeting: 'शुभ प्रभात, {name}।',
    speakerAccess: 'गूगलर पहुंच • द सभा',
    attendeeAccess: 'आगंतुक पहुंच • नेबरहुड 01',
    speakerGreeting: "आपकी कार्यशाला 'जेमिनी के साथ एजेंटिक भविष्य' द सभा में सुबह 10:30 बजे निर्धारित है।",
    attendeeGreeting: "गूगल नेक्सस अनंत पूरे प्रवाह में है। द सभा में मुख्य भाषण 14 मिनट में शुरू होगा।",
    now: 'लाइव',
    ethicTitle: 'जेमिनी के साथ एजेंटिक भविष्य',
    techCheck: 'तकनीकी ब्रीफिंग: द सभा',
    preSession: 'नेबरहुड तैयारी',
    venue: 'द सभा • गूगल बेंगलुरु • सुंदर पी.',
    nextOnLedger: 'अगला गूगल सत्र',
    concierge: 'नेक्सस सहायक',
    speakerAI: "'{name}, आपका डेमो वातावरण सिंक्रनाइज़ है। क्या आप कॉफी लैब से एक ताज़ा ब्रू चाहेंगे?'",
    attendeeAI: "'{name}, आपके पास 30 मिनट का समय है। मैंने आपके लिए इनोवेशन गैलरी में एक सीट आरक्षित की है।'",
    confirm: 'सिंक करें',
    reserve: 'पॉड बुक करें',
    pass: 'छोड़ें',
    resonanceTitle: 'मटेरियल 3 विकास',
    speakerResonance: 'डेवलपर रिलेशंस एम3 डीप डाइव के लिए तैयार है।',
    attendeeResonance: 'एक पास का गूगलर स्काई गार्डन में शुरुआती-पहुंच नेक्सस आमंत्रण साझा कर रहा है।',
    temporalLedger: 'नेक्सस एजेंडा',
    spatialNav: 'कैंपस वेफाइंडिंग',
    youAreHere: 'आप यहाँ अनंत में हैं'
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
