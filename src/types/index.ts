export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    website?: string;
    summary: string;
  };
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  certifications?: string[];
  projects?: ProjectItem[];
  languages?: string[];
}

export interface ExperienceItem {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  location: string;
  graduationDate: string;
  gpa?: string;
  honors?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface ATSScoreResult {
  overallScore: number;
  keywordScore: number;
  formatScore: number;
  sectionScore: number;
  experienceScore: number;
  suggestions: string[];
  matchedKeywords: string[];
  missingKeywords: string[];
}

export interface ResumeTemplate {
  id: string;
  name: string;
  category: 'creative' | 'traditional' | 'modern' | 'simple';
  description: string;
  thumbnail: string;
  color: string;
}

export interface AIResponse {
  result: string;
  suggestions?: string[];
}

export const emptyResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    summary: '',
  },
  experience: [],
  education: [],
  skills: [],
  certifications: [],
  projects: [],
  languages: [],
};
