export interface Guide {
  id: string;
  title: string;
  icon: string;
  description: string;
  sections: { heading: string; content: string }[];
}

export const guides: Guide[] = [
  {
    id: 'ats-optimization',
    title: 'ATS Optimization Guide',
    icon: '🎯',
    description: 'Learn how to beat Applicant Tracking Systems and get your resume seen by recruiters.',
    sections: [
      { heading: 'What is an ATS?', content: 'An Applicant Tracking System (ATS) is software used by 99% of Fortune 500 companies to filter resumes before a human recruiter sees them. Over 75% of resumes are rejected by ATS before reaching a person. Understanding how these systems work is critical to landing interviews.' },
      { heading: 'Use Standard Section Headers', content: 'ATS software looks for standard headers like "Work Experience", "Education", "Skills", and "Summary". Avoid creative alternatives like "My Journey" or "What I Bring" — the ATS may not recognize them.' },
      { heading: 'Include Keywords from the Job Posting', content: 'Mirror the exact keywords and phrases from the job description. If the posting says "project management", use that exact phrase rather than "managing projects". ATS systems match on exact keywords.' },
      { heading: 'Avoid Complex Formatting', content: 'Skip tables, text boxes, headers/footers, images, and columns. Use a clean, single-column layout. ATS parsers struggle with complex formatting and may misread or skip content.' },
      { heading: 'Use Standard Fonts and File Formats', content: 'Stick to common fonts (Arial, Calibri, Times New Roman). Submit as PDF or DOCX unless specified otherwise. Some older ATS systems prefer DOCX.' },
    ],
  },
  {
    id: 'bullet-points',
    title: 'Writing Powerful Bullet Points',
    icon: '✍️',
    description: 'Transform your experience into impactful bullet points that grab attention.',
    sections: [
      { heading: 'Use the STAR Method', content: 'Structure your bullets as: Situation → Task → Action → Result. Example: "Identified 30% efficiency gap in deployment process (Situation), redesigned CI/CD pipeline (Action), reducing deployment time from 4 hours to 20 minutes (Result)."' },
      { heading: 'Start with Action Verbs', content: 'Begin every bullet with a strong action verb: Led, Developed, Implemented, Increased, Reduced, Designed, Architected, Streamlined, Launched, Optimized. Avoid weak starters like "Responsible for" or "Helped with".' },
      { heading: 'Quantify Everything', content: 'Numbers make your achievements concrete and memorable. Include metrics like: revenue generated, costs saved, team size, efficiency improvements, user counts, time saved. "Managed a team" becomes "Managed a team of 12 engineers across 3 time zones."' },
      { heading: 'Show Impact, Not Just Duties', content: 'Don\'t list what you did — show what happened because of what you did. "Wrote unit tests" becomes "Implemented comprehensive test suite achieving 95% code coverage, reducing production bugs by 40%."' },
    ],
  },
  {
    id: 'resume-structure',
    title: 'Perfect Resume Structure',
    icon: '📐',
    description: 'Build a resume structure that works for both ATS systems and human readers.',
    sections: [
      { heading: 'Contact Information', content: 'Include: Full Name, Phone, Professional Email, Location (City, State), LinkedIn URL. Optional: Portfolio/Website. Skip: Full address, photo, date of birth, marital status.' },
      { heading: 'Professional Summary', content: 'Write 2-3 sentences highlighting your experience level, key expertise areas, and most impressive achievement. Tailor this for each application. This is the first thing recruiters read — make it count.' },
      { heading: 'Work Experience', content: 'List in reverse chronological order. Include: Job Title, Company, Location, Dates, and 3-5 bullet points per role. Focus on your most recent 10-15 years of experience. Use consistent date formatting.' },
      { heading: 'Skills Section', content: 'List 8-12 relevant skills. Mix technical and soft skills. Match keywords from the job description. Consider grouping by category (Technical Skills, Tools, Methodologies).' },
      { heading: 'Education', content: 'Include: Degree, Institution, Graduation Year. Optional: GPA (if 3.5+), relevant coursework, honors. For experienced professionals, keep this section brief.' },
    ],
  },
  {
    id: 'common-mistakes',
    title: 'Common Resume Mistakes',
    icon: '⚠️',
    description: 'Avoid these critical mistakes that could cost you the interview.',
    sections: [
      { heading: 'Using One Resume for Everything', content: 'Tailor your resume for each application. Customize your summary, reorder skills, and adjust bullet points to match the specific job description. Generic resumes have a much lower success rate.' },
      { heading: 'Including Irrelevant Information', content: 'Remove outdated skills, irrelevant hobbies, and positions from 15+ years ago unless directly relevant. Every line should earn its place by demonstrating value for the target role.' },
      { heading: 'Typos and Grammar Errors', content: '58% of recruiters will reject a resume with typos. Proofread multiple times, use grammar tools, and have someone else review it. Pay special attention to company names and technical terms.' },
      { heading: 'Too Long or Too Short', content: 'Aim for 1 page (0-10 years experience) or 2 pages (10+ years). Never exceed 2 pages. Conciseness shows you can communicate effectively.' },
      { heading: 'Missing Contact Information', content: 'Always include phone number, professional email, and LinkedIn. A surprising number of otherwise strong resumes lack basic contact details.' },
    ],
  },
];
