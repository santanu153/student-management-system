// AI Prompt Templates for Resume Enhancement
// These work with OpenAI API or provide mock responses when no API key is set

export const PROMPTS = {
  rewriteSummary: (role: string, currentSummary: string) => `
You are a professional resume writer. Rewrite this professional summary for a ${role} position.
Make it compelling, ATS-friendly, and highlight key achievements.
Current summary: "${currentSummary}"
Provide only the rewritten summary, no explanations.`,

  generateBullets: (jobTitle: string, company: string, description: string) => `
You are a professional resume writer. Generate 4 impactful bullet points for this role:
Job Title: ${jobTitle}
Company: ${company}
Brief description: ${description}
Use the STAR method. Start each with a strong action verb. Include metrics where possible.
Return only the bullet points, one per line, starting with "•".`,

  suggestSkills: (jobTitle: string, currentSkills: string[]) => `
You are a career advisor. Suggest 10 relevant skills for a ${jobTitle} position.
Current skills: ${currentSkills.join(', ')}
Include both technical and soft skills. Focus on ATS-friendly keywords.
Return only the skills, one per line.`,

  improveResume: (resumeText: string, jobDescription: string) => `
You are an ATS optimization expert. Analyze this resume against the job description and provide 5 specific, actionable improvements.
Resume: "${resumeText.substring(0, 2000)}"
Job Description: "${jobDescription.substring(0, 1000)}"
Format each suggestion as a numbered list.`,

  grammarCheck: (text: string) => `
Fix any grammar, spelling, or clarity issues in this text. Keep the meaning the same.
Text: "${text}"
Return only the corrected text.`,
};

// Role-based resume templates
export const ROLE_PROMPTS: Record<string, { skills: string[]; summary: string; bullets: string[] }> = {
  'Project Manager': {
    skills: ['Agile/Scrum', 'Stakeholder Management', 'Risk Assessment', 'JIRA', 'Confluence', 
             'Budget Management', 'Resource Planning', 'PMP', 'Gantt Charts', 'Cross-functional Leadership'],
    summary: 'Results-driven Project Manager with proven expertise in leading cross-functional teams to deliver complex projects on time and within budget. Skilled in Agile methodologies, stakeholder communication, and risk mitigation strategies.',
    bullets: [
      '• Led cross-functional team of 12 to deliver $2M enterprise software project 2 weeks ahead of schedule',
      '• Reduced project delivery time by 30% through implementation of Agile/Scrum methodologies',
      '• Managed portfolio of 8 concurrent projects with combined budget of $5M, maintaining 95% on-time delivery',
      '• Established risk management framework that reduced project failures by 40% across the organization',
    ],
  },
  'Data Scientist': {
    skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow', 'Pandas', 'Statistical Analysis',
             'Deep Learning', 'NLP', 'Data Visualization', 'A/B Testing', 'R', 'Scikit-learn'],
    summary: 'Data Scientist with 5+ years of experience building machine learning models that drive business decisions. Expert in Python, statistical analysis, and deep learning, with a track record of deploying production-grade ML solutions.',
    bullets: [
      '• Built predictive model using XGBoost that increased customer retention by 25%, saving $1.2M annually',
      '• Developed NLP pipeline processing 100K+ documents daily with 94% accuracy for sentiment analysis',
      '• Created real-time recommendation engine serving 10M+ users, improving click-through rates by 35%',
      '• Led A/B testing framework that accelerated experimentation velocity by 3x across product teams',
    ],
  },
  'Scrum Master': {
    skills: ['Scrum Framework', 'Kanban', 'SAFe', 'Sprint Planning', 'Retrospectives',
             'Team Coaching', 'JIRA', 'Agile Metrics', 'Servant Leadership', 'Conflict Resolution'],
    summary: 'Certified Scrum Master with deep expertise in scaling Agile practices across enterprise organizations. Passionate about coaching high-performing teams and removing impediments to deliver exceptional value.',
    bullets: [
      '• Coached 4 Scrum teams totaling 35 developers, improving sprint velocity by 40% over 6 months',
      '• Facilitated SAFe implementation across 3 Agile Release Trains, aligning 150+ team members',
      '• Reduced sprint scope creep by 60% through improved backlog refinement and stakeholder alignment',
      '• Mentored 6 junior Scrum Masters, with 4 achieving CSM certification within first quarter',
    ],
  },
  'Business Analyst': {
    skills: ['Requirements Gathering', 'SQL', 'User Stories', 'Process Mapping', 'Stakeholder Analysis',
             'BPMN', 'Wireframing', 'UAT', 'Data Analysis', 'Business Process Improvement'],
    summary: 'Business Analyst with strong analytical skills and experience bridging the gap between business needs and technical solutions. Proficient in requirements engineering, process optimization, and delivering data-driven insights.',
    bullets: [
      '• Elicited and documented requirements for 15+ enterprise applications, achieving 98% stakeholder approval',
      '• Identified process inefficiencies that saved 200+ employee hours per month through automation',
      '• Created comprehensive BRDs and user stories for $3M digital transformation initiative',
      '• Led UAT sessions with 50+ end users, achieving 99% defect-free release rate',
    ],
  },
  'Software Engineer': {
    skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker',
             'Git', 'CI/CD', 'REST APIs', 'SQL', 'System Design'],
    summary: 'Full-stack Software Engineer with expertise in building scalable web applications. Proficient in modern JavaScript frameworks, cloud architecture, and agile development practices with a passion for clean, maintainable code.',
    bullets: [
      '• Architected and built microservices platform handling 50K+ requests/second with 99.9% uptime',
      '• Reduced page load times by 60% through performance optimization and implementing CDN caching',
      '• Led migration of monolithic application to React/Node.js architecture, improving developer velocity by 3x',
      '• Implemented CI/CD pipeline reducing deployment time from 2 hours to 15 minutes',
    ],
  },
};

// Mock AI responses when no API key is available
export function getMockResponse(type: string, context: Record<string, string>): string {
  switch (type) {
    case 'rewrite':
      return `Dynamic and results-oriented ${context.role || 'professional'} with a proven track record of driving impactful outcomes. Combines strategic thinking with hands-on execution to deliver measurable results. Known for exceptional communication skills, cross-functional collaboration, and a data-driven approach to problem-solving.`;
    case 'bullets':
      return `• Spearheaded key initiative that resulted in 25% improvement in team productivity and efficiency
• Developed and implemented strategic framework that reduced operational costs by $150K annually
• Collaborated with cross-functional teams of 10+ members to deliver projects ahead of schedule
• Analyzed performance metrics and presented actionable insights to senior leadership, driving data-informed decisions`;
    case 'skills':
      return (ROLE_PROMPTS[context.role || 'Software Engineer']?.skills || 
        ['Communication', 'Problem Solving', 'Team Leadership', 'Project Management', 'Data Analysis',
         'Strategic Planning', 'Agile Methodologies', 'Stakeholder Management', 'Process Improvement', 'Technical Writing']
      ).join('\n');
    case 'improve':
      return `1. Add more quantifiable achievements with specific metrics (numbers, percentages, dollar amounts)
2. Include keywords from the job description that are missing from your resume
3. Strengthen your professional summary to highlight your most relevant experience
4. Use more action verbs at the beginning of bullet points (Led, Developed, Implemented)
5. Ensure your skills section matches the technical requirements in the job posting`;
    case 'grammar':
      return context.text || '';
    default:
      return 'AI suggestion is not available. Please add your OpenAI API key to enable this feature.';
  }
}
