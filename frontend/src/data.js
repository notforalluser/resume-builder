export const defaultResume = {
  personal: {
    fullName: 'Prince Tiwari',
    title: 'Technical Support Associate',
    phone: '+91-7891922459',
    email: 'princetiwari.profes@gmail.com',
    portfolio: '',
    linkedIn: 'linkedin.com/in/princetiwari26',
    github: '',
    location: 'Jaipur, India',
    photo: ''
  },
  sectionTitles: {
    summary: 'Summary',
    skills: 'Skills',
    experience: 'Experience',
    projects: 'Projects',
    achievements: 'Achievements',
    education: 'Education'
  },
  summary: {
    title: 'Summary',
    description: 'Detail-oriented and customer-focused Technical Support Associate with experience in **web technologies**, troubleshooting, CRM concepts, and user support. Skilled in problem-solving, requirement analysis, system configuration, and delivering efficient technical solutions with strong communication and analytical abilities.'
  },
  skills: [
    { category: 'Salesforce & CRM', skills: ['Salesforce Basics', 'CRM Concepts', 'User Management', 'Reports & Dashboards', 'Data Handling'] },
    { category: 'Technical Support', skills: ['Troubleshooting', 'Issue Resolution', 'Customer Communication', 'System Support'] },
    { category: 'Programming', skills: ['JavaScript', 'Python', 'Java', 'SQL', 'HTML', 'CSS'] },
    { category: 'Web Technologies', skills: ['React.js', 'Node.js', 'Express.js', 'REST APIs'] },
    { category: 'Databases', skills: ['MongoDB', 'MySQL'] },
    { category: 'Tools', skills: ['Git', 'GitHub', 'VS Code', 'Postman', 'AWS Basics'] }
  ],
  experience: [
    {
      jobTitle: 'Full Stack Web Development Intern',
      company: 'Unified Mentor Pvt. Ltd.',
      employmentType: 'Internship',
      location: 'Remote',
      skillsUsed: 'React.js, Node.js, MongoDB',
      startDate: 'April 2025',
      endDate: 'July 2025',
      current: false,
      bullets: ['Handled **API integration**, authentication, and database-related tasks while working with the development team.', 'Assisted in debugging, testing, and resolving technical issues to maintain smooth application performance.', 'Collaborated with team members to understand requirements and provide simple technical solutions.']
    },
    {
      jobTitle: 'Industrial Training Intern',
      company: 'Cloud Counselage Pvt. Ltd.',
      employmentType: 'Internship',
      location: 'Remote',
      skillsUsed: 'Git/GitHub, AWS Basics',
      startDate: 'May 2024',
      endDate: 'June 2024',
      current: false,
      bullets: ['Learned cloud computing basics, deployment process, and version control using Git and GitHub.', 'Participated in project simulations and gained practical exposure to technical support and system handling.']
    }
  ],
  projects: [
    { name: 'Rent Orbit', liveUrl: 'https://rent-orbit.onrender.com/', githubUrl: '', location: 'Remote', skillsUsed: 'React.js, Tailwind CSS, MongoDB', startDate: 'Feb 2025', endDate: 'Mar 2025', current: false, bullets: ['Developed a room booking and property management platform with separate dashboards for tenants and landlords.', 'Implemented booking requests, authentication, and role-based features for better user management.'] },
    { name: 'Resume Generator', liveUrl: 'https://resume-generator-1-ag1w.onrender.com/', githubUrl: '', location: 'Remote', skillsUsed: 'React.js, MongoDB, html2pdf.js', startDate: 'Jan 2025', endDate: 'Feb 2025', current: false, bullets: ['Built an **ATS-friendly resume builder** with customizable sections and real-time preview functionality.', 'Implemented form validation, data management, and PDF download features for better usability.'] },
    { name: 'Blood Donation Finder', liveUrl: '', githubUrl: '', location: 'Remote', skillsUsed: 'React.js, Tailwind CSS, Axios', startDate: 'Nov 2024', endDate: 'Dec 2024', current: false, bullets: ['Created a platform to connect blood donors and recipients based on blood group and location.', 'Added search and request features to help users quickly find suitable donors during emergencies.'] }
  ],
  achievements: [
    { title: 'Certificates', description: 'JavaScript (Intermediate) - HackerRank, Postman API Fundamentals - Postman.com' },
    { title: 'Finalist of Rajasthan Police Hackathon 1.0', description: 'Participated in solving real-world challenges focused on security and digital solutions.' },
    { title: 'Student Council Member - Poornima University', description: 'Coordinated events, handled communication responsibilities, and collaborated with teams.' }
  ],
  education: [{ school: 'Poornima University, Jaipur', program: 'B.Tech. Computer Science and Engineering', course: '', score: 'CGPA: 8.31 / 10', startDate: 'Jul 2022', endDate: 'Apr 2026', current: false }],
  customSections: []
};

export const blankResume = {
  personal: {
    fullName: '',
    title: '',
    phone: '',
    email: '',
    portfolio: '',
    linkedIn: '',
    github: '',
    location: '',
    photo: ''
  },
  sectionTitles: {
    summary: 'Summary',
    skills: 'Skills',
    experience: 'Experience',
    projects: 'Projects',
    achievements: 'Achievements',
    education: 'Education'
  },
  summary: {
    title: 'Summary',
    description: ''
  },
  skills: [{ category: 'Technical Skills', skills: [] }],
  experience: [],
  projects: [],
  achievements: [],
  education: [],
  customSections: []
};

export const defaultStyling = {
  fontFamily: 'Arial, Helvetica, sans-serif',
  fontSize: 11,
  lineHeight: 1.28,
  letterSpacing: 0,
  sectionGap: 10,
  pageMargin: 34,
  themeColor: '#111827',
  fieldStyles: {}
};

export const templates = [
  { id: 'latex', name: 'Template 1 - LaTeX ATS' },
  { id: 'ats', name: 'Template 2 - ATS Friendly' },
  { id: 'executive', name: 'Template 3 - Corporate Executive' }
];
