const SKILL_WORDS = [
  'React.js', 'Node.js', 'Express.js', 'MongoDB', 'MySQL', 'SQL', 'Tailwind CSS',
  'JavaScript', 'TypeScript', 'Python', 'Java', 'HTML', 'CSS', 'REST APIs',
  'AWS', 'Azure', 'Docker', 'Kubernetes', 'Git', 'GitHub', 'Postman',
  'Salesforce', 'CRM', 'Troubleshooting', 'Customer Communication',
  'Issue Resolution', 'Reports', 'Dashboards', 'Data Handling'
];

const SECTION_PATTERNS = {
  experience: /^(experience|work experience|employment|professional experience)$/i,
  projects: /^(projects|project work|personal projects)$/i,
  education: /^(education|academic background)$/i,
  skills: /^(skills|technical skills|core skills)$/i,
  achievements: /^(achievements|certifications|awards|activities)$/i,
  summary: /^(summary|profile|professional summary|objective)$/i
};

export function parseResumeText(text) {
  const cleanText = text.replace(/\u0000/g, ' ').replace(/[ \t]+/g, ' ');
  const lines = cleanText.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const sections = splitSections(lines);
  const email = cleanText.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] || '';
  const phone = cleanText.match(/(?:\+?\d[\s-]?){10,14}/)?.[0]?.trim() || '';
  const linkedIn = cleanText.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/[^\s]+/i)?.[0] || '';
  const github = cleanText.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/[^\s]+/i)?.[0] || '';
  const portfolio = cleanText.match(/https?:\/\/(?!.*(?:linkedin|github))[^\s]+/i)?.[0] || '';
  const name = findName(lines, email);
  const skills = extractSkills(cleanText, sections.skills);

  return {
    personal: {
      fullName: name,
      title: inferTitle(lines),
      phone,
      email,
      portfolio,
      linkedIn,
      github,
      location: inferLocation(lines)
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
      description: (sections.summary?.join(' ') || lines.slice(1, 4).join(' ')).slice(0, 700)
    },
    skills: skills.length ? [{ category: 'Technical Skills', skills }] : [{ category: 'Technical Skills', skills: [] }],
    experience: parseExperience(sections.experience || []),
    projects: parseProjects(sections.projects || []),
    education: parseEducation(sections.education || []),
    achievements: parseAchievements(sections.achievements || []),
    customSections: []
  };
}

function splitSections(lines) {
  const sections = {};
  let current = 'summary';
  for (const line of lines) {
    const matched = Object.entries(SECTION_PATTERNS).find(([, pattern]) => pattern.test(line));
    if (matched) {
      current = matched[0];
      sections[current] ||= [];
    } else {
      sections[current] ||= [];
      sections[current].push(line);
    }
  }
  return sections;
}

function findName(lines, email) {
  const beforeEmail = email ? lines.findIndex((line) => line.includes(email)) : -1;
  const candidates = (beforeEmail > 0 ? lines.slice(0, beforeEmail) : lines.slice(0, 5))
    .filter((line) => !/[0-9@:/]/.test(line) && line.length >= 3 && line.length <= 45);
  return candidates[0] || lines[0] || '';
}

function inferTitle(lines) {
  return lines.slice(0, 6).find((line) => /developer|engineer|support|associate|analyst|manager|specialist|intern/i.test(line)) || '';
}

function inferLocation(lines) {
  return lines.slice(0, 8).find((line) => /india|jaipur|delhi|remote|bengaluru|mumbai|pune/i.test(line)) || '';
}

function extractSkills(text, section = []) {
  const found = SKILL_WORDS.filter((skill) => new RegExp(`\\b${escapeRegExp(skill)}\\b`, 'i').test(text));
  const sectionSkills = section.flatMap((line) => line.split(/[,|•]/).map((skill) => skill.trim()).filter((skill) => skill.length > 1 && skill.length < 35));
  return [...new Set([...found, ...sectionSkills])].slice(0, 36);
}

function parseExperience(lines) {
  return chunkEntries(lines).map((entry) => ({
    jobTitle: entry[0] || 'Experience',
    company: entry[1] || '',
    employmentType: '',
    location: findLocation(entry),
    skillsUsed: findSkillsLine(entry),
    startDate: findDateRange(entry).startDate,
    endDate: findDateRange(entry).endDate,
    current: /present|current/i.test(entry.join(' ')),
    bullets: bulletize(entry.slice(2))
  }));
}

function parseProjects(lines) {
  return chunkEntries(lines).map((entry) => ({
    name: entry[0] || 'Project',
    skillsUsed: findSkillsLine(entry),
    location: '',
    liveUrl: entry.find((line) => /https?:\/\//i.test(line)) || '',
    githubUrl: entry.find((line) => /github\.com/i.test(line)) || '',
    startDate: findDateRange(entry).startDate,
    endDate: findDateRange(entry).endDate,
    current: /present|ongoing/i.test(entry.join(' ')),
    bullets: bulletize(entry.slice(1))
  }));
}

function parseEducation(lines) {
  return chunkEntries(lines).map((entry) => ({
    school: entry.find((line) => /university|college|school|institute/i.test(line)) || entry[0] || 'Education',
    program: entry.find((line) => /b\.?tech|m\.?tech|bachelor|master|degree|computer/i.test(line)) || '',
    course: '',
    score: entry.find((line) => /cgpa|gpa|percentage|%/i.test(line)) || '',
    startDate: findDateRange(entry).startDate,
    endDate: findDateRange(entry).endDate,
    current: /present|pursuing/i.test(entry.join(' '))
  }));
}

function parseAchievements(lines) {
  return lines.length
    ? lines.map((line) => {
      const [title, ...rest] = line.split(':');
      return { title: title.trim(), description: rest.join(':').trim() || line };
    }).slice(0, 8)
    : [];
}

function chunkEntries(lines) {
  const chunks = [];
  let current = [];
  for (const line of lines) {
    const startsNew = current.length > 2 && (/intern|developer|engineer|project|university|college|b\.?tech/i.test(line) || /^[A-Z][A-Za-z ]{3,45}$/.test(line));
    if (startsNew) {
      chunks.push(current);
      current = [line];
    } else {
      current.push(line);
    }
  }
  if (current.length) chunks.push(current);
  return chunks.slice(0, 8);
}

function bulletize(lines) {
  return lines
    .filter((line) => !/^(skills|technologies)\s*:/i.test(line))
    .map((line) => line.replace(/^[-•*]\s*/, '').trim())
    .filter(Boolean)
    .slice(0, 5);
}

function findDateRange(lines) {
  const joined = lines.join(' ');
  const match = joined.match(/([A-Z][a-z]{2,8}\s+\d{4}|\d{4})\s*(?:-|--|to|–|—)\s*([A-Z][a-z]{2,8}\s+\d{4}|\d{4}|Present|Current)/i);
  return { startDate: match?.[1] || '', endDate: match?.[2] || '' };
}

function findLocation(lines) {
  return lines.find((line) => /remote|onsite|hybrid|india|jaipur|delhi|pune|mumbai|bengaluru/i.test(line)) || '';
}

function findSkillsLine(lines) {
  return lines.find((line) => /react|node|mongo|python|java|sql|aws|git|salesforce|crm/i.test(line)) || '';
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function scoreAts(data) {
  const missingKeywords = [];
  const suggestions = [];
  let score = 0;

  const checks = [
    [!!data.personal?.fullName, 8, 'Add your full name.'],
    [!!data.personal?.email, 8, 'Add a professional email address.'],
    [!!data.personal?.phone, 8, 'Add a phone number.'],
    [!!data.personal?.title, 8, 'Add a clear target job title.'],
    [(data.summary?.description || '').length >= 80, 12, 'Write a 3-4 line professional summary with target-role keywords.'],
    [(data.skills?.[0]?.skills || []).length >= 8, 14, 'Add at least 8 role-relevant skills.'],
    [(data.experience || []).length >= 1, 14, 'Add work experience or internships with impact-focused bullet points.'],
    [(data.projects || []).length >= 1, 10, 'Add projects with technologies and outcomes.'],
    [(data.education || []).length >= 1, 8, 'Add education details.'],
    [hasMeasuredImpact(data), 10, 'Add measurable impact such as numbers, scale, users, time saved, or percentage improvements.']
  ];

  checks.forEach(([passed, points, message]) => {
    if (passed) score += points;
    else suggestions.push(message);
  });

  ['SQL', 'CRM', 'Troubleshooting', 'Customer Communication', 'REST APIs'].forEach((keyword) => {
    const haystack = JSON.stringify(data).toLowerCase();
    if (!haystack.includes(keyword.toLowerCase())) missingKeywords.push(keyword);
  });

  if (missingKeywords.length) suggestions.push('Add missing target keywords naturally where accurate.');
  return { score: Math.min(score, 100), suggestions: suggestions.length ? suggestions : ['Strong ATS structure. Keep bullets measurable and role-specific.'], missingKeywords };
}

function hasMeasuredImpact(data) {
  return /\d+|%|users|reduced|improved|increased|decreased|optimized|resolved/i.test(JSON.stringify(data));
}
