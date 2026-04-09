import { ResumeData } from '@/types';

export interface ResumeExample {
  id: string;
  role: string;
  industry: string;
  level: string;
  data: ResumeData;
}

export const resumeExamples: ResumeExample[] = [
  {
    id: 'pm-example',
    role: 'Project Manager',
    industry: 'Technology',
    level: 'Senior',
    data: {
      personalInfo: {
        fullName: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '(555) 123-4567',
        location: 'San Francisco, CA',
        linkedin: 'linkedin.com/in/sarahjohnson',
        summary: 'Results-driven Project Manager with 8+ years of experience leading cross-functional teams to deliver complex software projects. PMP certified with expertise in Agile/Scrum methodologies, budget management, and stakeholder communication. Proven track record of delivering projects 15% under budget.',
      },
      experience: [
        { id: '1', jobTitle: 'Senior Project Manager', company: 'TechCorp Inc.', location: 'San Francisco, CA', startDate: '2020-01', endDate: '', current: true, bullets: ['Led portfolio of 8 concurrent projects worth $12M, achieving 96% on-time delivery rate', 'Implemented Agile transformation across 3 departments, improving sprint velocity by 40%', 'Managed cross-functional team of 25 engineers, designers, and QA specialists', 'Reduced project overhead costs by 20% through process optimization and resource reallocation'] },
        { id: '2', jobTitle: 'Project Manager', company: 'Digital Solutions LLC', location: 'Oakland, CA', startDate: '2016-06', endDate: '2019-12', current: false, bullets: ['Delivered 15+ client-facing web applications on time and within budget', 'Established risk management framework reducing project failures by 35%', 'Coordinated with 5 vendor teams across 3 time zones for seamless integration'] },
      ],
      education: [{ id: '1', degree: 'MBA, Project Management', school: 'UC Berkeley Haas School of Business', location: 'Berkeley, CA', graduationDate: '2016', gpa: '3.8' }],
      skills: ['Agile/Scrum', 'PMP', 'JIRA', 'Confluence', 'Budget Management', 'Risk Assessment', 'Stakeholder Communication', 'MS Project', 'Resource Planning', 'Change Management'],
      certifications: ['PMP - Project Management Professional', 'CSM - Certified ScrumMaster', 'SAFe Agilist'],
    },
  },
  {
    id: 'swe-example',
    role: 'Software Engineer',
    industry: 'Technology',
    level: 'Mid-Level',
    data: {
      personalInfo: {
        fullName: 'Alex Chen',
        email: 'alex.chen@email.com',
        phone: '(555) 987-6543',
        location: 'Seattle, WA',
        linkedin: 'linkedin.com/in/alexchen',
        website: 'alexchen.dev',
        summary: 'Full-stack Software Engineer with 5 years of experience building scalable web applications. Proficient in React, Node.js, and cloud technologies. Passionate about clean code, system design, and mentoring junior developers.',
      },
      experience: [
        { id: '1', jobTitle: 'Software Engineer II', company: 'CloudScale Inc.', location: 'Seattle, WA', startDate: '2021-03', endDate: '', current: true, bullets: ['Architected microservices platform handling 100K+ requests/second with 99.99% uptime', 'Reduced API response time by 60% through query optimization and Redis caching', 'Led migration from monolith to microservices, improving deployment frequency by 10x', 'Mentored 4 junior engineers through code reviews and pair programming sessions'] },
        { id: '2', jobTitle: 'Junior Software Engineer', company: 'StartupXYZ', location: 'Portland, OR', startDate: '2019-01', endDate: '2021-02', current: false, bullets: ['Built React-based dashboard used by 50K+ monthly active users', 'Implemented CI/CD pipeline reducing deployment time from 4 hours to 20 minutes', 'Developed RESTful APIs serving mobile and web clients with 99.5% uptime'] },
      ],
      education: [{ id: '1', degree: 'B.S. Computer Science', school: 'University of Washington', location: 'Seattle, WA', graduationDate: '2018', gpa: '3.7' }],
      skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis', 'GraphQL', 'CI/CD'],
      projects: [{ id: '1', name: 'Open Source CLI Tool', description: 'Built a developer productivity CLI with 2K+ GitHub stars', technologies: ['Go', 'Docker'], link: 'github.com/alexchen/cli-tool' }],
    },
  },
  {
    id: 'ds-example',
    role: 'Data Scientist',
    industry: 'Finance',
    level: 'Senior',
    data: {
      personalInfo: {
        fullName: 'Priya Patel',
        email: 'priya.patel@email.com',
        phone: '(555) 456-7890',
        location: 'New York, NY',
        linkedin: 'linkedin.com/in/priyapatel',
        summary: 'Data Scientist with 6+ years of experience in machine learning, statistical modeling, and data-driven decision making. Expert in Python, deep learning, and NLP with publications in top-tier conferences.',
      },
      experience: [
        { id: '1', jobTitle: 'Senior Data Scientist', company: 'FinTech Global', location: 'New York, NY', startDate: '2021-01', endDate: '', current: true, bullets: ['Built fraud detection model using ensemble methods achieving 97.5% precision, saving $8M annually', 'Developed NLP pipeline processing 500K+ financial documents daily for regulatory compliance', 'Led team of 5 data scientists in building real-time risk scoring system', 'Presented quarterly insights to C-suite, influencing $50M investment decisions'] },
        { id: '2', jobTitle: 'Data Scientist', company: 'Analytics Corp', location: 'Boston, MA', startDate: '2018-06', endDate: '2020-12', current: false, bullets: ['Created customer churn prediction model reducing attrition by 30%', 'Built A/B testing framework enabling 200+ experiments per quarter', 'Automated reporting pipeline saving 40 analyst-hours per week'] },
      ],
      education: [{ id: '1', degree: 'M.S. Data Science', school: 'Columbia University', location: 'New York, NY', graduationDate: '2018' }, { id: '2', degree: 'B.S. Statistics', school: 'MIT', location: 'Cambridge, MA', graduationDate: '2016', gpa: '3.9' }],
      skills: ['Python', 'TensorFlow', 'PyTorch', 'SQL', 'Spark', 'NLP', 'Deep Learning', 'Statistical Modeling', 'A/B Testing', 'Tableau', 'R', 'Scikit-learn'],
      certifications: ['AWS Machine Learning Specialty', 'Google Professional Data Engineer'],
    },
  },
  {
    id: 'ba-example',
    role: 'Business Analyst',
    industry: 'Consulting',
    level: 'Mid-Level',
    data: {
      personalInfo: {
        fullName: 'Michael Torres',
        email: 'michael.torres@email.com',
        phone: '(555) 321-9876',
        location: 'Chicago, IL',
        linkedin: 'linkedin.com/in/michaeltorres',
        summary: 'Business Analyst with 4+ years bridging business needs and technical solutions. Skilled in requirements gathering, process mapping, and data analysis. CBAP certified with expertise in Agile environments.',
      },
      experience: [
        { id: '1', jobTitle: 'Senior Business Analyst', company: 'Deloitte Digital', location: 'Chicago, IL', startDate: '2021-08', endDate: '', current: true, bullets: ['Elicited and documented requirements for $5M digital transformation program', 'Mapped 50+ business processes using BPMN, identifying $2M in annual savings', 'Led UAT sessions with 100+ end users achieving 99.5% defect-free release', 'Created data-driven dashboards used by 200+ stakeholders for strategic decisions'] },
        { id: '2', jobTitle: 'Business Analyst', company: 'TechConsult Group', location: 'Chicago, IL', startDate: '2019-03', endDate: '2021-07', current: false, bullets: ['Wrote 300+ user stories and acceptance criteria for Agile development teams', 'Conducted gap analysis resulting in 40% improvement in operational efficiency', 'Facilitated 50+ stakeholder workshops across 8 client engagements'] },
      ],
      education: [{ id: '1', degree: 'B.S. Business Administration', school: 'University of Illinois', location: 'Urbana-Champaign, IL', graduationDate: '2019' }],
      skills: ['Requirements Gathering', 'BPMN', 'SQL', 'Tableau', 'User Stories', 'Process Mapping', 'UAT', 'JIRA', 'Stakeholder Analysis', 'Wireframing', 'Data Analysis'],
      certifications: ['CBAP - Certified Business Analysis Professional'],
    },
  },
];
