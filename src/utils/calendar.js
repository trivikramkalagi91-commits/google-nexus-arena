/**
 * Generates a Google Calendar Template link (action=TEMPLATE)
 * @param {Object} session - The session object from MASTER_PROGRAM
 */
export const generateGoogleCalendarLink = (session) => {
  if (!session || !session.isoDate) return '#';

  const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
  
  // Convert ISO dates to the format Google expects: YYYYMMDDTHHMMSSZ/YYYYMMDDTHHMMSSZ
  const startTime = session.isoDate;
  const duration = session.isoDuration || '010000';
  
  try {
    const times = `${startTime}Z/${calculateEndTime(startTime, duration)}Z`;
    const params = new URLSearchParams({
      text: `Aether: ${session.title || 'Event Session'}`,
      dates: times,
      details: `${session.speaker || 'Curator'} - ${session.type || 'Activity'}`,
      location: session.location || 'Pragati Maidan Hall A',
      ctz: 'Asia/Kolkata' 
    });

    return `${baseUrl}&${params.toString()}`;
  } catch (e) {
    console.error("Calendar link generation failed", e);
    return '#';
  }
};

function calculateEndTime(startTime, duration) {
  if (!startTime || startTime.length < 11) return startTime;
  
  try {
    // Simple ISO time addition for the demo
    // startTime factor: 20260416T090000 -> 090000 starts at index 9
    const hoursPart = startTime.slice(9, 11);
    const hours = parseInt(hoursPart) + (parseInt(duration?.slice(0, 2)) || 1);
    return startTime.slice(0, 9) + String(hours).padStart(2, '0') + startTime.slice(11);
  } catch (e) {
    return startTime;
  }
}
