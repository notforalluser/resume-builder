export function calculateAtsScore(data) {
  const suggestions = [];
  const missingKeywords = [];
  let score = 0;

  const checks = [
    [!!data.personal?.fullName, 8, 'Add your full name.'],
    [!!data.personal?.email, 8, 'Add a professional email address.'],
    [!!data.personal?.phone, 8, 'Add a phone number.'],
    [!!data.personal?.title, 8, 'Add a focused target job title.'],
    [(data.summary?.description || '').length >= 80, 12, 'Write a 3-4 line summary with target-role keywords.'],
    [(data.skills?.flatMap((group) => group.skills || []) || []).length >= 8, 14, 'Add at least 8 role-relevant skills.'],
    [(data.experience || []).length >= 1, 14, 'Add experience or internship entries.'],
    [(data.projects || []).length >= 1, 10, 'Add projects with technologies and outcomes.'],
    [(data.education || []).length >= 1, 8, 'Add education details.'],
    [hasMeasuredImpact(data), 10, 'Add measurable impact: numbers, users, percentages, time saved, or resolved issue counts.']
  ];

  checks.forEach(([passed, points, message]) => {
    if (passed) score += points;
    else suggestions.push(message);
  });

  ['SQL', 'CRM', 'Troubleshooting', 'Customer Communication', 'REST APIs'].forEach((keyword) => {
    if (!JSON.stringify(data).toLowerCase().includes(keyword.toLowerCase())) missingKeywords.push(keyword);
  });

  if (missingKeywords.length) suggestions.push('Add missing keywords naturally where accurate.');
  return { score: Math.min(score, 100), suggestions: suggestions.length ? suggestions : ['Strong ATS structure. Keep every bullet specific and measurable.'], missingKeywords };
}

function hasMeasuredImpact(data) {
  return /\d+|%|users|reduced|improved|increased|decreased|optimized|resolved/i.test(JSON.stringify(data));
}
