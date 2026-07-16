// ============================================================
// KLE-CTIE Internship Platform -- SeedData.gs
// Run seedAll() once to populate sheets for dry run
// Covers all statuses so every screen has data to show
// ============================================================

function seedAll() {
  try {
    seedStartups();
    Utilities.sleep(500);
    seedInternships();
    Utilities.sleep(500);
    seedApplications();
    Logger.log('=== Seed complete: 5 startups, 8 internships, 12 applications. Refresh the portal to see data. ===');
  } catch(e) {
    Logger.log('seedAll error: ' + e.message);
  }
}

// ?? 5 SAMPLE STARTUPS ?????????????????????????????????????????
function seedStartups() {
  var sheet = sh_('STARTUPS');
  if (!sheet) { Logger.log('STARTUPS sheet not found'); return; }

  // Clear existing data below header
  if (sheet.getLastRow() > 1)
    sheet.getRange(2, 1, sheet.getLastRow()-1, sheet.getLastColumn()).clearContent();

  var heads = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];
  var col   = cols_(heads);

  var startups = [
    {
      Startup_ID:    'CTIE-2024-001',
      Startup_Name:  'AgroSense Technologies',
      Contact_Email: 'founder@agrosense.in',
      PIN_Hash:      '',  // Set on first login
      PIN_Salt:      '',
      Sector:        'AgriTech',
      Stage:         'MVP -- Early Traction',
      Founded_Year:  '2023',
      About:         'IoT-based soil health monitoring for smallholder farmers in North Karnataka. Our sensors give real-time data on moisture, pH and nutrients helping farmers increase yield by 25-30%.',
      Website_URL:   'https://agrosense.in',
      LinkedIn_URL:  'https://linkedin.com/company/agrosense',
      OPC_Name:      'Rajesh Kumar',
      OPC_Email:     'rajesh@agrosense.in',
      OPC_Phone:     '9876543210',
      Active:        'TRUE',
      Reschedule_Strikes: '0',
      Total_Posted:  '2',
      Total_Selected:'1',
    },
    {
      Startup_ID:    'CTIE-2024-002',
      Startup_Name:  'MedKit Solutions',
      Contact_Email: 'priya@medkit.health',
      PIN_Hash:      '',
      PIN_Salt:      '',
      Sector:        'HealthTech',
      Stage:         'Prototype',
      Founded_Year:  '2024',
      About:         'Affordable diagnostic kits for rural healthcare centres. Our point-of-care devices bring lab-quality testing to PHCs and rural hospitals without costly infrastructure.',
      Website_URL:   'https://medkit.health',
      LinkedIn_URL:  '',
      OPC_Name:      'Dr. Priya Sharma',
      OPC_Email:     'priya@medkit.health',
      OPC_Phone:     '9845678901',
      Active:        'TRUE',
      Reschedule_Strikes: '0',
      Total_Posted:  '1',
      Total_Selected:'0',
    },
    {
      Startup_ID:    'CTIE-2024-003',
      Startup_Name:  'EduPilot',
      Contact_Email: 'arjun@edupilot.in',
      PIN_Hash:      '',
      PIN_Salt:      '',
      Sector:        'EdTech',
      Stage:         'Growth',
      Founded_Year:  '2022',
      About:         'Adaptive learning platform for engineering students preparing for competitive exams. AI-driven question banks and performance analytics used by 12,000+ students across Karnataka.',
      Website_URL:   'https://edupilot.in',
      LinkedIn_URL:  'https://linkedin.com/company/edupilot',
      OPC_Name:      'Arjun Nair',
      OPC_Email:     'arjun@edupilot.in',
      OPC_Phone:     '9900112233',
      Active:        'TRUE',
      Reschedule_Strikes: '1',
      Total_Posted:  '3',
      Total_Selected:'2',
    },
    {
      Startup_ID:    'CTIE-2023-004',
      Startup_Name:  'FinEdge Technologies',
      Contact_Email: 'meera@finedge.co',
      PIN_Hash:      '',
      PIN_Salt:      '',
      Sector:        'FinTech',
      Stage:         'Early Traction',
      Founded_Year:  '2023',
      About:         'Credit scoring for first-generation entrepreneurs using alternative data -- utility payments, GST compliance and social footprint. Enabling MSME lending in Tier 2 and 3 cities.',
      Website_URL:   'https://finedge.co',
      LinkedIn_URL:  'https://linkedin.com/company/finedge',
      OPC_Name:      'Meera Patil',
      OPC_Email:     'meera@finedge.co',
      OPC_Phone:     '8877665544',
      Active:        'TRUE',
      Reschedule_Strikes: '0',
      Total_Posted:  '1',
      Total_Selected:'1',
    },
    {
      Startup_ID:    'CTIE-2024-005',
      Startup_Name:  'CleanSpark Energy',
      Contact_Email: 'suresh@cleanspark.in',
      PIN_Hash:      '',
      PIN_Salt:      '',
      Sector:        'CleanTech',
      Stage:         'Idea -- Research',
      Founded_Year:  '2024',
      About:         'Low-cost solar micro-grids for rural schools and anganwadis. Working with Karnataka government to electrify 200 unserved facilities in Bidar and Yadgir districts.',
      Website_URL:   '',
      LinkedIn_URL:  '',
      OPC_Name:      'Suresh Reddy',
      OPC_Email:     'suresh@cleanspark.in',
      OPC_Phone:     '7766554433',
      Active:        'TRUE',
      Reschedule_Strikes: '0',
      Total_Posted:  '1',
      Total_Selected:'0',
    },
  ];

  startups.forEach(function(s) {
    var row = new Array(heads.length).fill('');
    Object.keys(s).forEach(function(k){ if(col[k]!==undefined) row[col[k]]=s[k]; });
    sheet.appendRow(row);
  });
  SpreadsheetApp.flush();
  Logger.log('Seeded ' + startups.length + ' startups');
}

// ?? 8 SAMPLE INTERNSHIP ROLES ?????????????????????????????????
function seedInternships() {
  var sheet = sh_('INTERNSHIPS');
  if (!sheet) { Logger.log('INTERNSHIPS sheet not found'); return; }
  if (sheet.getLastRow() > 1)
    sheet.getRange(2,1,sheet.getLastRow()-1,sheet.getLastColumn()).clearContent();

  var heads = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];
  var col   = cols_(heads);

  var roles = [
    {
      Internship_ID:        'INT-2025-001',
      Startup_ID:           'CTIE-2024-001',
      Startup_Name:         'AgroSense Technologies',
      Role_Title:           'IoT Firmware Engineer Intern',
      Department:           'AgriTech',
      Discipline:           'ECE, CSE',
      Qualification:        'BE / BTech',
      Skills_Required:      'Embedded C, Arduino, MQTT, I2C/SPI',
      Skills_Preferred:     'LoRaWAN, FreeRTOS, PCB design',
      Min_CGPA:             '6.5',
      Description:          'Work directly with our hardware team to develop firmware for soil sensor nodes. You will write and optimise embedded code, integrate sensor calibration algorithms and conduct field testing at our pilot farms in Dharwad.',
      Duration_Weeks:       '12',
      Stipend_INR:          '8000',
      Is_Paid:              'Stipend-Based',
      Positions_Available:  '2',
      Positions_Filled:     '1',
      Application_Open_Date: '2025-05-01',
      Application_Deadline: '2025-06-30',
      Internship_Start_Date: '2025-07-01',
      Internship_End_Date:   '',
      Work_Mode: 'On-site',
      Location_City:        'Dharwad',
      Institute_Preference: 'Any',
      Min_Year:             '3rd Year',
      Status:               'Open',
      Posted_At:            '01-Apr-2025 09:00:00',
      Total_Applications:   '7',
      Views:                '43',
    },
    {
      Internship_ID:        'INT-2025-002',
      Startup_ID:           'CTIE-2024-001',
      Startup_Name:         'AgroSense Technologies',
      Role_Title:           'Data Analytics Intern',
      Department:           'AgriTech',
      Discipline:           'CSE, Data Science, Mathematics',
      Qualification:        'BE / BTech, BSc',
      Skills_Required:      'Python, Pandas, Data Visualisation',
      Skills_Preferred:     'Machine Learning, Power BI, SQL',
      Min_CGPA:             '6.0',
      Description:          'Analyse soil health data from 500+ sensors across 12 villages. Build dashboards for our farmer advisory app. Work on yield prediction models using seasonal weather and soil data.',
      Duration_Weeks:       '8',
      Stipend_INR:          '6000',
      Is_Paid:              'Stipend-Based',
      Positions_Available:  '1',
      Positions_Filled:     '0',
      Application_Open_Date: '2025-05-01',
      Application_Deadline: '2025-07-15',
      Internship_Start_Date: '2025-07-01',
      Internship_End_Date:   '',
      Work_Mode: 'Hybrid',
      Location_City:        'Hubballi',
      Institute_Preference: 'Any',
      Min_Year:             '2nd Year',
      Status:               'Open',
      Posted_At:            '05-Apr-2025 10:00:00',
      Total_Applications:   '4',
      Views:                '28',
    },
    {
      Internship_ID:        'INT-2025-003',
      Startup_ID:           'CTIE-2024-002',
      Startup_Name:         'MedKit Solutions',
      Role_Title:           'Biomedical Research Intern',
      Department:           'HealthTech',
      Discipline:           'Biomedical Engineering, Electronics, CSE',
      Qualification:        'BE / BTech',
      Skills_Required:      'Signal processing, Python, Lab documentation',
      Skills_Preferred:     'MATLAB, Medical device standards awareness',
      Min_CGPA:             '7.0',
      Description:          'Support our R&D team in developing algorithms for our cardiac screening device. Document test protocols, analyse signal quality data and assist in regulatory compliance documentation for CE / IEC certification.',
      Duration_Weeks:       '16',
      Stipend_INR:          '0',
      Is_Paid:              'Academic Internship',
      Positions_Available:  '1',
      Positions_Filled:     '0',
      Application_Open_Date: '2025-05-01',
      Application_Deadline: '2025-07-01',
      Internship_Start_Date: '2025-07-01',
      Internship_End_Date:   '',
      Work_Mode: 'On-site',
      Location_City:        'Hubballi',
      Institute_Preference: 'Any',
      Min_Year:             '3rd Year',
      Status:               'Open',
      Posted_At:            '10-Apr-2025 11:00:00',
      Total_Applications:   '3',
      Views:                '19',
    },
    {
      Internship_ID:        'INT-2025-004',
      Startup_ID:           'CTIE-2024-003',
      Startup_Name:         'EduPilot',
      Role_Title:           'Full-Stack Web Developer Intern',
      Department:           'EdTech',
      Discipline:           'CSE, Information Science',
      Qualification:        'BE / BTech, BCA',
      Skills_Required:      'React, Node.js, MongoDB, REST APIs',
      Skills_Preferred:     'TypeScript, Redis, AWS basics',
      Min_CGPA:             '6.5',
      Description:          'Build features for our adaptive learning platform used by 12,000 students. Take ownership of the student dashboard redesign and implement a new peer-discussion module. Code reviewed by senior engineers.',
      Duration_Weeks:       '12',
      Stipend_INR:          '10000',
      Is_Paid:              'Stipend-Based',
      Positions_Available:  '2',
      Positions_Filled:     '2',
      Application_Open_Date: '2025-05-01',
      Application_Deadline: '2025-05-15',
      Internship_Start_Date: '2025-07-01',
      Internship_End_Date:   '',
      Work_Mode: 'Remote',
      Location_City:        'Bengaluru',
      Institute_Preference: 'Any',
      Min_Year:             '2nd Year',
      Status:               'Full',
      Posted_At:            '01-Mar-2025 09:00:00',
      Total_Applications:   '18',
      Views:                '112',
    },
    {
      Internship_ID:        'INT-2025-005',
      Startup_ID:           'CTIE-2024-003',
      Startup_Name:         'EduPilot',
      Role_Title:           'Content & Curriculum Intern',
      Department:           'EdTech',
      Discipline:           'Any Engineering',
      Qualification:        'BE / BTech',
      Skills_Required:      'Subject expertise in Mathematics or Physics, clear writing',
      Skills_Preferred:     'Video scripting, Canva, LaTeX',
      Min_CGPA:             '7.5',
      Description:          'Create high-quality practice questions, solved examples and concept explainers for GATE and university exams. Content reviewed by our academic board before publishing.',
      Duration_Weeks:       '6',
      Stipend_INR:          '4000',
      Is_Paid:              'Stipend-Based',
      Positions_Available:  '3',
      Positions_Filled:     '0',
      Application_Open_Date: '2025-05-01',
      Application_Deadline: '2025-07-30',
      Internship_Start_Date: '2025-07-01',
      Internship_End_Date:   '',
      Work_Mode: 'Remote',
      Location_City:        'Any',
      Institute_Preference: 'Any',
      Min_Year:             '3rd Year',
      Status:               'Open',
      Posted_At:            '12-Apr-2025 14:00:00',
      Total_Applications:   '9',
      Views:                '67',
    },
    {
      Internship_ID:        'INT-2025-006',
      Startup_ID:           'CTIE-2023-004',
      Startup_Name:         'FinEdge Technologies',
      Role_Title:           'Machine Learning Intern',
      Department:           'FinTech',
      Discipline:           'CSE, Data Science, Mathematics',
      Qualification:        'BE / BTech, MSc',
      Skills_Required:      'Python, scikit-learn, Feature engineering, SQL',
      Skills_Preferred:     'XGBoost, MLflow, Credit scoring domain knowledge',
      Min_CGPA:             '7.0',
      Description:          'Work on our alternative credit scoring model. Collect and preprocess alternative data sources, train classification models and evaluate fairness metrics. Real production data. Real impact on lending decisions.',
      Duration_Weeks:       '12',
      Stipend_INR:          '12000',
      Is_Paid:              'Stipend-Based',
      Positions_Available:  '1',
      Positions_Filled:     '1',
      Application_Open_Date: '2025-05-01',
      Application_Deadline: '2025-04-30',
      Internship_Start_Date: '2025-07-01',
      Internship_End_Date:   '',
      Work_Mode: 'Hybrid',
      Location_City:        'Hubballi',
      Institute_Preference: 'Any',
      Min_Year:             'Postgraduate',
      Status:               'Full',
      Posted_At:            '15-Mar-2025 09:00:00',
      Total_Applications:   '11',
      Views:                '88',
    },
    {
      Internship_ID:        'INT-2025-007',
      Startup_ID:           'CTIE-2024-005',
      Startup_Name:         'CleanSpark Energy',
      Role_Title:           'Electrical Systems Intern',
      Department:           'CleanTech',
      Discipline:           'Electrical Engineering, ECE',
      Qualification:        'BE / BTech, Diploma',
      Skills_Required:      'DC circuits, Solar PV basics, AutoCAD Electrical',
      Skills_Preferred:     'ETAP, Battery management systems, Site survey',
      Min_CGPA:             '6.0',
      Description:          'Design single-line diagrams for solar micro-grid installations at rural schools. Assist in site surveys in Bidar district. Prepare load calculations and equipment specifications.',
      Duration_Weeks:       '8',
      Stipend_INR:          '5000',
      Is_Paid:              'Stipend-Based',
      Positions_Available:  '2',
      Positions_Filled:     '0',
      Application_Open_Date: '2025-05-01',
      Application_Deadline: '2025-08-01',
      Internship_Start_Date: '2025-07-01',
      Internship_End_Date:   '',
      Work_Mode: 'Hybrid',
      Location_City:        'Bidar',
      Institute_Preference: 'Any',
      Min_Year:             '2nd Year',
      Status:               'Open',
      Posted_At:            '18-Apr-2025 10:00:00',
      Total_Applications:   '2',
      Views:                '14',
    },
    {
      Internship_ID:        'INT-2025-008',
      Startup_ID:           'CTIE-2024-003',
      Startup_Name:         'EduPilot',
      Role_Title:           'UI/UX Design Intern',
      Department:           'EdTech',
      Discipline:           'CSE, Any',
      Qualification:        'Any',
      Skills_Required:      'Figma, User research, Wireframing',
      Skills_Preferred:     'Prototyping, Usability testing, Motion design',
      Min_CGPA:             '0',
      Description:          'Redesign the student progress dashboard based on user research findings. Conduct 10 usability interviews with students. Deliver high-fidelity Figma prototypes ready for engineering handoff.',
      Duration_Weeks:       '6',
      Stipend_INR:          '6000',
      Is_Paid:              'Stipend-Based',
      Positions_Available:  '1',
      Positions_Filled:     '0',
      Application_Open_Date: '2025-05-01',
      Application_Deadline: '2025-07-20',
      Internship_Start_Date: '2025-07-01',
      Internship_End_Date:   '',
      Work_Mode: 'Remote',
      Location_City:        'Any',
      Institute_Preference: 'Any',
      Min_Year:             'Any',
      Status:               'Open',
      Posted_At:            '20-Apr-2025 15:00:00',
      Total_Applications:   '5',
      Views:                '41',
    },
  ];

  roles.forEach(function(r) {
    var row = new Array(heads.length).fill('');
    Object.keys(r).forEach(function(k){ if(col[k]!==undefined) row[col[k]]=r[k]; });
    sheet.appendRow(row);
  });
  SpreadsheetApp.flush();
  Logger.log('Seeded ' + roles.length + ' internship roles');
}

// ?? 12 SAMPLE APPLICATIONS (all statuses covered) ?????????????
function seedApplications() {
  var sheet = sh_('APPLICATIONS');
  if (!sheet) { Logger.log('APPLICATIONS sheet not found'); return; }
  if (sheet.getLastRow() > 1)
    sheet.getRange(2,1,sheet.getLastRow()-1,sheet.getLastColumn()).clearContent();

  var heads = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];
  var col   = cols_(heads);

  var apps = [
    // 1. Applied -- awaiting startup review
    {
      App_ID: 'APP-2025-0001', Internship_ID: 'INT-2025-001',
      Startup_ID: 'CTIE-2024-001', Startup_Name: 'AgroSense Technologies',
      Student_Name: 'Kavya Desai', Institute_Email: 'kavya.desai@kletech.ac.in',
      Personal_Email: 'kavya.desai@gmail.com', Mobile: '9812345678',
      Institute_Name: 'KLE Technological University', Course: 'B.E. Electronics & Communication',
      Year: '3rd Year', CGPA: '7.8',
      Skills: 'Embedded C, Arduino, MQTT, Python',
      Why_Interested: 'I am deeply interested in precision agriculture and have built two IoT projects -- a greenhouse automation system and a moisture monitor. AgroSense directly aligns with my final year project theme and I want real-world exposure to LoRaWAN deployments at scale.',
      Resume_URL: 'https://drive.google.com/file/d/sample1/view',
      Status: 'Applied', Applied_At: '20-Apr-2025 10:30:00',
      Shortlisted_At: '', Reschedule_Count: '0',
      Active_Interview_Slot: '1',
    },
    // 2. Applied
    {
      App_ID: 'APP-2025-0002', Internship_ID: 'INT-2025-002',
      Startup_ID: 'CTIE-2024-001', Startup_Name: 'AgroSense Technologies',
      Student_Name: 'Rohit Menon', Institute_Email: 'rohit.menon@nitk.edu.in',
      Personal_Email: 'rohitmenon94@gmail.com', Mobile: '9988776655',
      Institute_Name: 'NIT Karnataka, Surathkal', Course: 'B.Tech Computer Science',
      Year: '2nd Year', CGPA: '8.2',
      Skills: 'Python, Pandas, Matplotlib, SQL, Tableau',
      Why_Interested: 'Agricultural data analytics is an underexplored space. I have completed two Kaggle competitions in time-series forecasting and am keen to apply these skills on real sensor data that has genuine farmer impact rather than academic datasets.',
      Resume_URL: 'https://drive.google.com/file/d/sample2/view',
      Status: 'Applied', Applied_At: '21-Apr-2025 14:00:00',
      Shortlisted_At: '', Reschedule_Count: '0',
      Active_Interview_Slot: '1',
    },
    // 3. Shortlisted -- startup has reviewed, interview not yet scheduled
    {
      App_ID: 'APP-2025-0003', Internship_ID: 'INT-2025-001',
      Startup_ID: 'CTIE-2024-001', Startup_Name: 'AgroSense Technologies',
      Student_Name: 'Ananya Rao', Institute_Email: 'ananya.rao@bvb.edu.in',
      Personal_Email: 'ananya.rao@yahoo.com', Mobile: '9765432109',
      Institute_Name: 'BVB College of Engineering, Hubballi', Course: 'B.E. Electronics',
      Year: '4th Year', CGPA: '7.2',
      Skills: 'Embedded C, RTOS, SPI, I2C, Sensor interfacing',
      Why_Interested: 'My final year project involves designing a water quality sensor for rural wells. AgroSense role directly extends this work and the chance to test on actual farmland is something no lab environment can replicate.',
      Resume_URL: 'https://drive.google.com/file/d/sample3/view',
      Status: 'Shortlisted', Applied_At: '19-Apr-2025 09:00:00',
      Shortlisted_At: '22-Apr-2025 11:00:00', Reschedule_Count: '0',
      Active_Interview_Slot: '1',
    },
    // 4. Interview Scheduled
    {
      App_ID: 'APP-2025-0004', Internship_ID: 'INT-2025-004',
      Startup_ID: 'CTIE-2024-003', Startup_Name: 'EduPilot',
      Student_Name: 'Siddharth Joshi', Institute_Email: 'siddharth.j@vtu.ac.in',
      Personal_Email: 'sid.joshi@gmail.com', Mobile: '8812345678',
      Institute_Name: 'VTU -- SDM College, Dharwad', Course: 'B.E. Computer Science',
      Year: '3rd Year', CGPA: '8.5',
      Skills: 'React, Node.js, Express, MongoDB, Git',
      Why_Interested: 'I have built three full-stack projects including a LMS clone. EduPilot scale -- 12000 students -- is exactly the kind of production environment where I can learn systems thinking and real engineering tradeoffs.',
      Resume_URL: 'https://drive.google.com/file/d/sample4/view',
      Status: 'Interview Scheduled', Applied_At: '10-Mar-2025 08:00:00',
      Shortlisted_At: '14-Mar-2025 10:00:00', Reschedule_Count: '0',
      Interview_1_Date: '2025-04-28', Interview_1_Time: '11:00',
      Interview_1_Mode: 'Online', Interview_1_Link: 'https://meet.google.com/abc-defg-hij',
      Active_Interview_Slot: '1',
    },
    // 5. Interview Scheduled -- after 1 reschedule
    {
      App_ID: 'APP-2025-0005', Internship_ID: 'INT-2025-006',
      Startup_ID: 'CTIE-2023-004', Startup_Name: 'FinEdge Technologies',
      Student_Name: 'Pooja Kulkarni', Institute_Email: 'pooja.k@kletech.ac.in',
      Personal_Email: 'pooja.kulkarni@gmail.com', Mobile: '9900887766',
      Institute_Name: 'KLE Technological University', Course: 'M.Tech Data Science',
      Year: 'Postgraduate', CGPA: '8.9',
      Skills: 'Python, scikit-learn, XGBoost, Feature engineering, SQL',
      Why_Interested: 'My thesis is on fairness in credit scoring models. FinEdge is literally doing this in production for MSME borrowers. Working here will let me ground my academic research in a real product.',
      Resume_URL: 'https://drive.google.com/file/d/sample5/view',
      Status: 'Interview Scheduled', Applied_At: '18-Mar-2025 09:00:00',
      Shortlisted_At: '20-Mar-2025 11:00:00', Reschedule_Count: '1',
      Interview_1_Date: '2025-04-01', Interview_1_Time: '15:00',
      Interview_1_Mode: 'Online', Interview_1_Link: 'https://meet.google.com/xyz-abcd-efg',
      Interview_2_Date: '2025-04-29', Interview_2_Time: '10:00',
      Interview_2_Mode: 'Online', Interview_2_Link: 'https://meet.google.com/rst-uvwx-yz1',
      Active_Interview_Slot: '2',
    },
    // 6. Outcome Pending -- interview held, startup hasn't entered outcome
    {
      App_ID: 'APP-2025-0006', Internship_ID: 'INT-2025-005',
      Startup_ID: 'CTIE-2024-003', Startup_Name: 'EduPilot',
      Student_Name: 'Neha Patkar', Institute_Email: 'neha.patkar@git.edu.in',
      Personal_Email: 'neha.patkar@gmail.com', Mobile: '9871234560',
      Institute_Name: 'Gogte Institute of Technology, Belagavi', Course: 'B.E. Computer Science',
      Year: '4th Year', CGPA: '7.9',
      Skills: 'LaTeX, Python, Strong Mathematics, Physics, Content writing',
      Why_Interested: 'I have been tutoring mathematics for three years and have developed genuine teaching instincts. Creating content at EduPilot for 12000 students is a chance to scale that impact massively.',
      Resume_URL: 'https://drive.google.com/file/d/sample6/view',
      Status: 'Interview Held -- Outcome Pending', Applied_At: '05-Apr-2025 10:00:00',
      Shortlisted_At: '08-Apr-2025 09:00:00', Reschedule_Count: '0',
      Interview_1_Date: '2025-04-24', Interview_1_Time: '14:00',
      Interview_1_Mode: 'Online', Interview_1_Link: 'https://meet.google.com/mno-pqrs-tuv',
      Interview_Held_At: '24-Apr-2025 14:00:00',
      Active_Interview_Slot: '1',
    },
    // 7. Offer Pending OTP -- selected, waiting for student confirmation
    {
      App_ID: 'APP-2025-0007', Internship_ID: 'INT-2025-004',
      Startup_ID: 'CTIE-2024-003', Startup_Name: 'EduPilot',
      Student_Name: 'Vikram Hegde', Institute_Email: 'vikram.h@bvb.edu.in',
      Personal_Email: 'vikramhegde@gmail.com', Mobile: '9845112233',
      Institute_Name: 'BVB College of Engineering, Hubballi', Course: 'B.E. Computer Science',
      Year: '3rd Year', CGPA: '8.1',
      Skills: 'React, TypeScript, Node.js, PostgreSQL, Docker',
      Why_Interested: 'I have been following EduPilot since launch. Built a similar adaptive quiz app for my college fest. The peer-discussion module they want to build is exactly the problem I spent two months on.',
      Resume_URL: 'https://drive.google.com/file/d/sample7/view',
      Status: 'Offer Pending OTP', Applied_At: '12-Mar-2025 09:00:00',
      Shortlisted_At: '15-Mar-2025 10:00:00', Reschedule_Count: '0',
      Interview_1_Date: '2025-04-20', Interview_1_Time: '10:00',
      Interview_1_Mode: 'Online', Interview_1_Link: 'https://meet.google.com/efg-hijk-lmn',
      Interview_Held_At: '20-Apr-2025 10:00:00',
      Outcome_Entered_At: '21-Apr-2025 09:00:00',
      OTP_Hash: 'dummy_hash_for_seed', OTP_Salt: 'dummy_salt',
      OTP_Expiry: String(Date.now() + 600000), OTP_Verified: 'No',
      Offer_Sent_At: '21-Apr-2025 09:00:00',
      Active_Interview_Slot: '1',
    },
    // 8. Selected -- OTP confirmed, internship active
    {
      App_ID: 'APP-2025-0008', Internship_ID: 'INT-2025-006',
      Startup_ID: 'CTIE-2023-004', Startup_Name: 'FinEdge Technologies',
      Student_Name: 'Aditya Kumar', Institute_Email: 'aditya.kumar@kletech.ac.in',
      Personal_Email: 'aditya.kumar@gmail.com', Mobile: '9988001122',
      Institute_Name: 'KLE Technological University', Course: 'M.Tech Computer Science',
      Year: 'Postgraduate', CGPA: '8.7',
      Skills: 'Python, ML, SQL, Feature Engineering, XGBoost, Data visualisation',
      Why_Interested: 'MSME credit gap is a structural problem in India. FinEdge approach of using alternative data is novel and the work will directly inform my dissertation on AI in financial inclusion.',
      Resume_URL: 'https://drive.google.com/file/d/sample8/view',
      Status: 'Selected', Applied_At: '16-Mar-2025 08:00:00',
      Shortlisted_At: '18-Mar-2025 09:00:00', Reschedule_Count: '0',
      Interview_1_Date: '2025-04-10', Interview_1_Time: '11:00',
      Interview_1_Mode: 'In-person', Interview_1_Link: '',
      Interview_Held_At: '10-Apr-2025 11:00:00',
      Outcome_Entered_At: '11-Apr-2025 08:00:00',
      OTP_Verified: 'Yes', Selected_At: '11-Apr-2025 10:00:00',
      Confirmed_At: '11-Apr-2025 10:15:00',
      Intern_Start: '2025-04-14', Offer_Sent_At: '11-Apr-2025 08:00:00',
      Active_Interview_Slot: '1',
    },
    // 9. Not Selected
    {
      App_ID: 'APP-2025-0009', Internship_ID: 'INT-2025-001',
      Startup_ID: 'CTIE-2024-001', Startup_Name: 'AgroSense Technologies',
      Student_Name: 'Shruti Naik', Institute_Email: 'shruti.naik@sdmcet.ac.in',
      Personal_Email: 'shruti.naik@gmail.com', Mobile: '9771234500',
      Institute_Name: 'SDM College of Engineering, Dharwad', Course: 'B.E. Electronics',
      Year: '3rd Year', CGPA: '6.8',
      Skills: 'Arduino, Basic C, Circuit design',
      Why_Interested: 'I want to learn IoT in an agricultural context and AgroSense is the only startup in my area working on this.',
      Resume_URL: 'https://drive.google.com/file/d/sample9/view',
      Status: 'Not Selected', Applied_At: '18-Apr-2025 11:00:00',
      Shortlisted_At: '20-Apr-2025 09:00:00', Reschedule_Count: '0',
      Interview_1_Date: '2025-04-22', Interview_1_Time: '10:00',
      Interview_1_Mode: 'Online', Interview_1_Link: 'https://meet.google.com/aaa-bbbb-ccc',
      Interview_Held_At: '22-Apr-2025 10:00:00',
      Outcome_Entered_At: '22-Apr-2025 15:00:00',
      Notes: 'Strong interest but limited hands-on experience with MQTT and real sensor integration. Encouraged to apply after building more projects.',
      Active_Interview_Slot: '1',
    },
    // 10. Closed -- reschedule limit reached
    {
      App_ID: 'APP-2025-0010', Internship_ID: 'INT-2025-003',
      Startup_ID: 'CTIE-2024-002', Startup_Name: 'MedKit Solutions',
      Student_Name: 'Tanmay Bhat', Institute_Email: 'tanmay.bhat@bvb.edu.in',
      Personal_Email: 'tanmay.bhat@gmail.com', Mobile: '9900112200',
      Institute_Name: 'BVB College of Engineering, Hubballi', Course: 'B.E. Biomedical',
      Year: '4th Year', CGPA: '7.5',
      Skills: 'MATLAB, Signal processing, Python, IEC 60601 basics',
      Why_Interested: 'My capstone project is a low-cost ECG device. MedKit is the only startup I know working on cardiac diagnostics for rural use.',
      Resume_URL: 'https://drive.google.com/file/d/sample10/view',
      Status: 'Closed -- Reschedule Limit', Applied_At: '01-Apr-2025 09:00:00',
      Shortlisted_At: '03-Apr-2025 10:00:00', Reschedule_Count: '2',
      Interview_1_Date: '2025-04-10', Interview_1_Time: '11:00',
      Interview_1_Mode: 'Online', Interview_1_Link: 'https://meet.google.com/xxx-yyyy-zzz',
      Interview_2_Date: '2025-04-17', Interview_2_Time: '11:00',
      Interview_2_Mode: 'Online', Interview_2_Link: 'https://meet.google.com/ppp-qqqq-rrr',
      Interview_3_Date: '', Interview_3_Time: '',
      Notes: 'Auto-closed: reschedule limit (2) reached on 24-Apr-2025.',
      Active_Interview_Slot: '2',
    },
    // 11. Completed with certificate
    {
      App_ID: 'APP-2025-0011', Internship_ID: 'INT-2025-004',
      Startup_ID: 'CTIE-2024-003', Startup_Name: 'EduPilot',
      Student_Name: 'Bhavana Kulkarni', Institute_Email: 'bhavana.k@kletech.ac.in',
      Personal_Email: 'bhavana.kulkarni@gmail.com', Mobile: '9823456781',
      Institute_Name: 'KLE Technological University', Course: 'B.E. Computer Science',
      Year: '4th Year', CGPA: '8.4',
      Skills: 'React, JavaScript, Node.js, REST APIs, Figma basics',
      Why_Interested: 'I want to work on a product used by real students during my final year. EduPilot dashboard redesign is a meaningful UX problem and I want my code to matter.',
      Resume_URL: 'https://drive.google.com/file/d/sample11/view',
      Status: 'Completed', Applied_At: '15-Jan-2025 09:00:00',
      Shortlisted_At: '17-Jan-2025 10:00:00', Reschedule_Count: '0',
      Interview_1_Date: '2025-01-22', Interview_1_Time: '10:00',
      Interview_1_Mode: 'Online', Interview_1_Link: 'https://meet.google.com/cmp-lted-001',
      Interview_Held_At: '22-Jan-2025 10:00:00',
      Outcome_Entered_At: '23-Jan-2025 09:00:00',
      OTP_Verified: 'Yes', Selected_At: '23-Jan-2025 10:00:00',
      Confirmed_At: '23-Jan-2025 10:30:00',
      Intern_Start: '2025-01-27', Intern_End: '2025-04-18',
      Completion_Status: 'Completed',
      Startup_Rating: '5',
      Startup_Feedback: 'Bhavana delivered the dashboard redesign ahead of schedule. Her attention to accessibility and mobile responsiveness exceeded expectations. Would hire full-time.',
      Offer_Sent_At: '23-Jan-2025 09:00:00',
      Active_Interview_Slot: '1',
    },
    // 12. Auto-closed -- startup did not review in time
    {
      App_ID: 'APP-2025-0012', Internship_ID: 'INT-2025-007',
      Startup_ID: 'CTIE-2024-005', Startup_Name: 'CleanSpark Energy',
      Student_Name: 'Prasad Gowda', Institute_Email: 'prasad.g@biet.ac.in',
      Personal_Email: 'prasad.gowda@gmail.com', Mobile: '9900123456',
      Institute_Name: 'Bapuji Institute of Engineering, Davangere', Course: 'B.E. Electrical Engineering',
      Year: '3rd Year', CGPA: '7.1',
      Skills: 'AutoCAD Electrical, Basic solar PV, DC circuit analysis',
      Why_Interested: 'Rural electrification is my area of interest and CleanSpark work in Bidar schools is exactly the kind of ground-level implementation I want to be part of.',
      Resume_URL: 'https://drive.google.com/file/d/sample12/view',
      Status: 'Closed -- No Response', Applied_At: '01-Apr-2025 10:00:00',
      Shortlisted_At: '', Reschedule_Count: '0',
      Notes: 'Auto-closed on 15-Apr-2025: startup did not review within 14 days.',
      Active_Interview_Slot: '1',
    },
  ];

  apps.forEach(function(a) {
    var row = new Array(heads.length).fill('');
    Object.keys(a).forEach(function(k){ if(col[k]!==undefined) row[col[k]]=a[k]; });
    sheet.appendRow(row);
  });
  SpreadsheetApp.flush();
  Logger.log('Seeded ' + apps.length + ' applications');
}

// ?? PROGRESS LOGS for the active intern ???????????????????????
function seedProgressLogs() {
  var sheet = sh_('PROGRESS');
  if (!sheet) return;
  if (sheet.getLastRow() > 1)
    sheet.getRange(2,1,sheet.getLastRow()-1,sheet.getLastColumn()).clearContent();

  var heads = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];
  var col   = cols_(heads);

  var logs = [
    {
      Log_ID: 'LOG-001', App_ID: 'APP-2025-0008',
      Internship_ID: 'INT-2025-006', Startup_ID: 'CTIE-2023-004',
      Week: '1', Log_Date: '20-Apr-2025 18:00:00',
      Days_Present: '5', Days_Total: '5',
      Tasks_Assigned: 'Onboarding, codebase walkthrough, read 3 research papers on alternative credit data',
      Tasks_Completed: 'Onboarding done, gave presentation on 2 papers, set up local dev environment',
      Rating: '4', Comments: 'Quick learner, asked good questions in team standup.',
      Logged_At: '20-Apr-2025 18:00:00',
    },
    {
      Log_ID: 'LOG-002', App_ID: 'APP-2025-0008',
      Internship_ID: 'INT-2025-006', Startup_ID: 'CTIE-2023-004',
      Week: '2', Log_Date: '27-Apr-2025 18:00:00',
      Days_Present: '4', Days_Total: '5',
      Tasks_Assigned: 'Preprocess GST compliance dataset, build baseline logistic regression model',
      Tasks_Completed: 'Preprocessing complete (handled 18% missing values), baseline model at 71% AUC',
      Rating: '5', Comments: 'Exceptional EDA skills. Found a data quality issue we had missed. Highly motivated.',
      Logged_At: '27-Apr-2025 18:00:00',
    },
  ];

  logs.forEach(function(l) {
    var row = new Array(heads.length).fill('');
    Object.keys(l).forEach(function(k){ if(col[k]!==undefined) row[col[k]]=l[k]; });
    sheet.appendRow(row);
  });
  SpreadsheetApp.flush();
  Logger.log('Seeded ' + logs.length + ' progress logs');
}

// ?? CLEAR ALL SEED DATA ???????????????????????????????????????
function clearSeedData() {
  ['STARTUPS','INTERNSHIPS','APPLICATIONS','PROGRESS'].forEach(function(name){
    var s = sh_(name);
    if (s && s.getLastRow() > 1)
      s.getRange(2,1,s.getLastRow()-1,s.getLastColumn()).clearContent();
  });
  Logger.log('All seed data cleared. Sheet headers preserved.');
}
