import { ATSScoreResult, ResumeData } from '@/types';

// Common ATS keywords by category
const ATS_SECTION_WEIGHTS = {
  personalInfo: 15,
  summary: 10,
  experience: 25,
  education: 15,
  skills: 20,
  certifications: 5,
  projects: 5,
  languages: 5,
};

// Heuristic to detect if a chunk of text is likely a resume
export function isLikelyResume(text: string): boolean {
  if (!text || text.length < 100) return false;
  
  const textLower = text.toLowerCase();
  const resumeIndicators = [
    'experience', 'education', 'skills', 'summary', 
    'university', 'college', 'degree', 'work history', 
    'projects', 'certifications', 'bachelor', 'master', 
    'gpa', 'employment', 'profile'
  ];
  
  let matchCount = 0;
  for (const indicator of resumeIndicators) {
    if (textLower.includes(indicator)) {
      matchCount++;
    }
  }
  
  // If it finds at least 3 distinct resume-related sections/keywords, we accept it as a resume
  return matchCount >= 3;
}

// Extract keywords from text (basic NLP)
export function extractKeywords(text: string): string[] {
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been',
    'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
    'could', 'should', 'may', 'might', 'shall', 'can', 'need', 'dare',
    'ought', 'used', 'it', 'its', 'this', 'that', 'these', 'those',
    'i', 'me', 'my', 'we', 'our', 'you', 'your', 'he', 'she', 'they',
    'them', 'their', 'what', 'which', 'who', 'when', 'where', 'why', 'how',
    'all', 'each', 'every', 'both', 'few', 'more', 'most', 'other', 'some',
    'such', 'no', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very',
    'just', 'because', 'if', 'then', 'about', 'up', 'out', 'over', 'after',
    'also', 'new', 'any', 'many', 'well', 'work', 'years', 'year', 'make',
  ]);

  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s\+\#\.]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !stopWords.has(w));

  // Also extract multi-word phrases (bigrams)
  const bigrams: string[] = [];
  const wordList = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length > 1);
  for (let i = 0; i < wordList.length - 1; i++) {
    if (!stopWords.has(wordList[i]) && !stopWords.has(wordList[i + 1])) {
      bigrams.push(`${wordList[i]} ${wordList[i + 1]}`);
    }
  }

  // Count frequency and return unique
  const freq: Record<string, number> = {};
  [...words, ...bigrams].forEach(w => { freq[w] = (freq[w] || 0) + 1; });

  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 50)
    .map(([word]) => word);
}

// Calculate keyword match score
function calculateKeywordScore(resumeText: string, jobKeywords: string[]): { score: number; matched: string[]; missing: string[] } {
  const resumeLower = resumeText.toLowerCase();
  const matched: string[] = [];
  const missing: string[] = [];

  jobKeywords.forEach(keyword => {
    if (resumeLower.includes(keyword.toLowerCase())) {
      matched.push(keyword);
    } else {
      missing.push(keyword);
    }
  });

  const score = jobKeywords.length > 0
    ? Math.round((matched.length / jobKeywords.length) * 100)
    : 50;

  return { score: Math.min(score, 100), matched, missing };
}

// Calculate section completeness score
function calculateSectionScore(data: ResumeData): { score: number; suggestions: string[] } {
  let score = 0;
  const suggestions: string[] = [];
  const info = data.personalInfo;

  // Personal info (15 pts)
  if (info.fullName) score += 3; else suggestions.push('Add your full name');
  if (info.email) score += 3; else suggestions.push('Add your email address');
  if (info.phone) score += 3; else suggestions.push('Add your phone number');
  if (info.location) score += 3; else suggestions.push('Add your location');
  if (info.linkedin) score += 3; else suggestions.push('Consider adding your LinkedIn profile');

  // Summary (10 pts)
  if (info.summary && info.summary.length > 50) {
    score += 10;
  } else if (info.summary) {
    score += 5;
    suggestions.push('Expand your professional summary to at least 50 characters');
  } else {
    suggestions.push('Add a professional summary — most ATS systems look for this');
  }

  // Experience (25 pts)
  if (data.experience.length >= 2) {
    score += 15;
    const hasBullets = data.experience.every(exp => exp.bullets.length >= 2);
    if (hasBullets) score += 10; else suggestions.push('Add at least 2 bullet points per experience entry');
  } else if (data.experience.length === 1) {
    score += 10;
    suggestions.push('Add more work experience entries if available');
  } else {
    suggestions.push('Add your work experience — this is the most important section');
  }

  // Education (15 pts)
  if (data.education.length > 0) {
    score += 15;
  } else {
    suggestions.push('Add your education background');
  }

  // Skills (20 pts)
  if (data.skills.length >= 8) {
    score += 20;
  } else if (data.skills.length >= 4) {
    score += 12;
    suggestions.push('Add more relevant skills (aim for 8-12)');
  } else if (data.skills.length > 0) {
    score += 6;
    suggestions.push('Add more skills — ATS systems heavily weight this section');
  } else {
    suggestions.push('Add a skills section — this is critical for ATS matching');
  }

  // Bonus sections
  if (data.certifications && data.certifications.length > 0) score += 5;
  if (data.projects && data.projects.length > 0) score += 5;

  return { score: Math.min(score, 100), suggestions };
}

// Calculate format score
function calculateFormatScore(resumeText: string): { score: number; suggestions: string[] } {
  let score = 100;
  const suggestions: string[] = [];

  // Check for common formatting issues
  if (resumeText.includes('|')) {
    score -= 10;
    suggestions.push('Avoid using pipe (|) separators — some ATS may misread them');
  }

  if (/[^\x00-\x7F]/.test(resumeText)) {
    score -= 5;
    suggestions.push('Remove special characters or unicode — use standard ASCII text');
  }

  // Check for reasonable length
  const wordCount = resumeText.split(/\s+/).length;
  if (wordCount < 150) {
    score -= 20;
    suggestions.push('Resume is too short. Aim for at least 300-600 words');
  } else if (wordCount > 1200) {
    score -= 10;
    suggestions.push('Resume may be too long. Keep it to 1-2 pages (300-800 words)');
  }

  // Check for action verbs
  const actionVerbs = ['managed', 'led', 'developed', 'created', 'implemented', 'designed',
    'built', 'launched', 'increased', 'reduced', 'improved', 'delivered', 'achieved',
    'generated', 'established', 'optimized', 'streamlined', 'coordinated', 'executed',
    'analyzed', 'spearheaded', 'orchestrated', 'transformed', 'mentored'];
  const hasActionVerbs = actionVerbs.some(v => resumeText.toLowerCase().includes(v));
  if (!hasActionVerbs) {
    score -= 15;
    suggestions.push('Use strong action verbs (managed, developed, implemented, etc.)');
  }

  // Check for quantifiable achievements
  const hasNumbers = /\d+%|\$\d+|\d+ (team|people|projects|clients|users|customers)/.test(resumeText);
  if (!hasNumbers) {
    score -= 10;
    suggestions.push('Add quantifiable achievements (e.g., "increased revenue by 30%")');
  }

  return { score: Math.max(score, 0), suggestions };
}

// Calculate experience relevance
function calculateExperienceScore(data: ResumeData, jobDescription?: string): { score: number; suggestions: string[] } {
  let score = 0;
  const suggestions: string[] = [];

  if (data.experience.length === 0) {
    return { score: 0, suggestions: ['Add work experience to improve your score'] };
  }

  // Check for chronological order
  score += 20;

  // Check bullet quality
  let totalBullets = 0;
  let goodBullets = 0;
  data.experience.forEach(exp => {
    exp.bullets.forEach(bullet => {
      totalBullets++;
      if (bullet.length > 30 && /\d/.test(bullet)) goodBullets++;
    });
  });

  if (totalBullets > 0) {
    score += Math.round((goodBullets / totalBullets) * 40);
    if (goodBullets < totalBullets) {
      suggestions.push('Add metrics and numbers to your bullet points for stronger impact');
    }
  } else {
    suggestions.push('Add detailed bullet points describing your achievements');
  }

  // Check for recent experience
  const currentExp = data.experience.find(e => e.current);
  if (currentExp) score += 20; else {
    suggestions.push('Mark your current position if you are currently employed');
  }

  // Job match if description provided
  if (jobDescription) {
    const jobLower = jobDescription.toLowerCase();
    const expText = data.experience.map(e =>
      `${e.jobTitle} ${e.company} ${e.bullets.join(' ')}`
    ).join(' ').toLowerCase();

    const relevantTerms = extractKeywords(jobDescription).slice(0, 15);
    const matches = relevantTerms.filter(t => expText.includes(t));
    score += Math.round((matches.length / Math.max(relevantTerms.length, 1)) * 20);
  } else {
    score += 10; // Partial score without JD
  }

  return { score: Math.min(score, 100), suggestions };
}

// Convert resume data to plain text
export function resumeDataToText(data: ResumeData): string {
  const parts: string[] = [];
  const info = data.personalInfo;

  if (info.fullName) parts.push(info.fullName);
  if (info.email) parts.push(info.email);
  if (info.phone) parts.push(info.phone);
  if (info.location) parts.push(info.location);
  if (info.summary) parts.push(`Summary: ${info.summary}`);

  if (data.experience.length > 0) {
    parts.push('Experience:');
    data.experience.forEach(exp => {
      parts.push(`${exp.jobTitle} at ${exp.company}, ${exp.location}`);
      parts.push(`${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`);
      exp.bullets.forEach(b => parts.push(`- ${b}`));
    });
  }

  if (data.education.length > 0) {
    parts.push('Education:');
    data.education.forEach(edu => {
      parts.push(`${edu.degree} from ${edu.school}`);
      if (edu.gpa) parts.push(`GPA: ${edu.gpa}`);
    });
  }

  if (data.skills.length > 0) {
    parts.push(`Skills: ${data.skills.join(', ')}`);
  }

  if (data.certifications && data.certifications.length > 0) {
    parts.push(`Certifications: ${data.certifications.join(', ')}`);
  }

  return parts.join('\n');
}

// Main ATS scoring function
export function calculateATSScore(
  resumeData: ResumeData,
  resumeText: string,
  jobDescription?: string
): ATSScoreResult {
  const jobKeywords = jobDescription ? extractKeywords(jobDescription) : [];

  const keyword = calculateKeywordScore(resumeText, jobKeywords);
  const section = calculateSectionScore(resumeData);
  const format = calculateFormatScore(resumeText);
  const experience = calculateExperienceScore(resumeData, jobDescription);

  // Weighted overall score
  const overallScore = Math.round(
    keyword.score * 0.35 +
    section.score * 0.25 +
    format.score * 0.20 +
    experience.score * 0.20
  );

  const allSuggestions = [
    ...section.suggestions,
    ...format.suggestions,
    ...experience.suggestions,
  ];

  if (keyword.missing.length > 0 && keyword.missing.length <= 10) {
    allSuggestions.unshift(
      `Add these missing keywords: ${keyword.missing.slice(0, 5).join(', ')}`
    );
  }

  return {
    overallScore: Math.min(overallScore, 100),
    keywordScore: keyword.score,
    formatScore: format.score,
    sectionScore: section.score,
    experienceScore: experience.score,
    suggestions: allSuggestions.slice(0, 10),
    matchedKeywords: keyword.matched,
    missingKeywords: keyword.missing,
  };
}
