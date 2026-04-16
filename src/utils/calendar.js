/**
 * Generates a Google Calendar Template link (action=TEMPLATE)
 * @param {Object} session - The session object from EVENT_DATA
 */
export const generateGoogleCalendarLink = (session) => {
  const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
  
  // Convert ISO dates to the format Google expects: YYYYMMDDTHHMMSSZ/YYYYMMDDTHHMMSSZ
  // We assume the date is formatted correctly in the data file (UTC simplified)
  const times = `${session.isoDate}Z/${calculateEndTime(session.isoDate, session.isoDuration)}Z`;
  
  const params = new URLSearchParams({
    text: `Aether: ${session.titleKey || 'Session'}`,
    dates: times,
    details: `${session.speaker} - ${session.description}`,
    location: session.location,
    ctz: 'Asia/Kolkata' // Default for New Delhi
  });

  return `${baseUrl}&${params.toString()}`;
};

function calculateEndTime(startTime, duration) {
  // Simple ISO time addition for the demo
  // 010000 means 1 hour
  const hours = parseInt(startTime.slice(9, 11)) + 1;
  return startTime.slice(0, 9) + String(hours).padStart(2, '0') + startTime.slice(11);
}
