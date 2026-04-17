export const IPL_2026_SCHEDULE = [
  // April Matches
  { date: '2026-04-10', match: 'CSK vs RCB', venue: 'Chepauk Stadium', stadium_id: 'CHEPAUK', city: 'Chennai' },
  { date: '2026-04-11', match: 'MI vs DC', venue: 'Wankhede Stadium', stadium_id: 'WANKHEDE', city: 'Mumbai' },
  { date: '2026-04-12', match: 'PBKS vs SRH', venue: 'PCA Stadium', stadium_id: 'PCA', city: 'Mohali' },
  { date: '2026-04-13', match: 'KKR vs RR', venue: 'Eden Gardens', stadium_id: 'EDEN', city: 'Kolkata' },
  { date: '2026-04-14', match: 'GT vs LSG', venue: 'Narendra Modi Stadium', stadium_id: 'MODI_STADIUM', city: 'Ahmedabad' },
  { date: '2026-04-15', match: 'RCB vs MI', venue: 'Chinnaswamy Stadium', stadium_id: 'CHINNASWAMY', city: 'Bangalore' },
  { date: '2026-04-16', match: 'DC vs CSK', venue: 'Arun Jaitley Stadium', stadium_id: 'JAITLEY', city: 'Delhi' },
  { date: '2026-04-17', match: 'Gujarat Titans vs Kolkata Knight Riders', venue: 'Narendra Modi Stadium', stadium_id: 'MODI_STADIUM', city: 'Ahmedabad' },
  { date: '2026-04-18', match: 'PBKS vs RR', venue: 'HPCA Stadium', stadium_id: 'DHARAMSHALA', city: 'Dharamshala' },
  { date: '2026-04-19', match: 'LSG vs SRH', venue: 'Ekana Stadium', stadium_id: 'EKANA', city: 'Lucknow' },
  { date: '2026-04-20', match: 'MI vs KKR', venue: 'Wankhede Stadium', stadium_id: 'WANKHEDE', city: 'Mumbai' },
  { date: '2026-04-21', match: 'CSK vs GT', venue: 'Chepauk Stadium', stadium_id: 'CHEPAUK', city: 'Chennai' },
  { date: '2026-04-22', match: 'RR vs DC', venue: 'Sawai Mansingh Stadium', stadium_id: 'JAIPUR', city: 'Jaipur' },
  { date: '2026-04-23', match: 'RCB vs PBKS', venue: 'Chinnaswamy Stadium', stadium_id: 'CHINNASWAMY', city: 'Bangalore' },
  { date: '2026-04-24', match: 'SRH vs LSG', venue: 'Rajiv Gandhi Stadium', stadium_id: 'UPPAL', city: 'Hyderabad' },
  { date: '2026-04-25', match: 'KKR vs CSK', venue: 'Eden Gardens', stadium_id: 'EDEN', city: 'Kolkata' },
  { date: '2026-04-26', match: 'GT vs MI', venue: 'Narendra Modi Stadium', stadium_id: 'MODI_STADIUM', city: 'Ahmedabad' },
  { date: '2026-04-27', match: 'DC vs RCB', venue: 'Arun Jaitley Stadium', stadium_id: 'JAITLEY', city: 'Delhi' },
  { date: '2026-04-28', match: 'LSG vs PBKS', venue: 'Ekana Stadium', stadium_id: 'EKANA', city: 'Lucknow' },
  { date: '2026-04-29', match: 'RR vs SRH', venue: 'Sawai Mansingh Stadium', stadium_id: 'JAIPUR', city: 'Jaipur' },
  { date: '2026-04-30', match: 'CSK vs MI', venue: 'Chepauk Stadium', stadium_id: 'CHEPAUK', city: 'Chennai' },
  { date: '2026-05-17', match: 'IPL Final 2026', venue: 'Narendra Modi Stadium', stadium_id: 'MODI_STADIUM', city: 'Ahmedabad' }
];

export const getStadiumConfig = (stadiumId) => {
  const commonAmenities = [
    { id: 'gate_main', name: 'Main Entry Gate', type: 'GATE', baseWait: 12 },
    { id: 'food_court', name: 'Nexus Food Court', type: 'FOOD', baseWait: 8 },
    { id: 'rest_premium', name: 'Executive Restrooms', type: 'RESTROOM', baseWait: 4 },
    { id: 'store_official', name: 'Official Merchandise', type: 'STORE', baseWait: 15 }
  ];

  const configs = {
    MODI_STADIUM: {
      layout: 'OVAL',
      sectors: ['NORTH_STAND', 'SOUTH_STAND', 'EAST_WING', 'WEST_WING', 'PAVILION'],
      amenities: commonAmenities
    },
    WANKHEDE: {
      layout: 'RECT',
      sectors: ['GARWARE_STAND', 'VITHAL_DIVECHA', 'SUNIL_GAVASKAR', 'VIJAY_MERCHANT', 'MCA_STAND'],
      amenities: commonAmenities
    },
    CHEPAUK: {
      layout: 'CIRCLE',
      sectors: ['ANNA_PAVILION', 'MAC_STAND', 'PATTABHIRAMAN', 'KASTURI_RANGA', 'MEMORIAL'],
      amenities: commonAmenities
    }
  };

  return configs[stadiumId] || {
    layout: 'OVAL',
    sectors: ['STAND_A', 'STAND_B', 'STAND_C', 'STAND_D', 'PLATINUM_CLUB'],
    amenities: commonAmenities
  };
};

export const STADIUM_DATA = {}; // Compatibility export
