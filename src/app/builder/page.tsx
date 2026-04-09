'use client';

import { useState } from 'react';
import { useResumeStore } from '@/store';
import {
  User, Briefcase, GraduationCap, Wrench, Plus, Trash2,
  Save, ChevronLeft, ChevronRight, Sparkles, Eye, Download, Wand2
} from 'lucide-react';
import { auth } from '@/lib/firebase';
import ClassicTemplate from '@/components/resume/ClassicTemplate';
import { ResumeData } from '@/types';

const steps = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Wrench },
];

export default function BuilderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const store = useResumeStore();
  const { resumeData } = store;

  const handleAISuggestion = async (type: string) => {
    setAiLoading(true);
    try {
      const res = await fetch('/api/ai/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, role: resumeData.experience[0]?.jobTitle || 'Professional' }),
      });
      const data = await res.json();
      if (type === 'rewrite' && data.result) {
        store.setPersonalInfo({ summary: data.result });
      } else if (type === 'skills' && data.result) {
        const skills = data.result.split('\n').filter((s: string) => s.trim());
        store.setSkills([...new Set([...resumeData.skills, ...skills])]);
      }
    } catch (e) { console.error(e); }
    setAiLoading(false);
  };

  const addSkill = () => {
    if (newSkill.trim() && !resumeData.skills.includes(newSkill.trim())) {
      store.setSkills([...resumeData.skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    store.setSkills(resumeData.skills.filter(s => s !== skill));
  };

  const saveResume = async () => {
    try {
      const token = await auth?.currentUser?.getIdToken();
      const res = await fetch('/api/resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          title: resumeData.personalInfo.fullName || 'My Resume',
          content: resumeData,
        }),
      });
      if (res.ok) alert('Resume saved successfully!');
      else alert('Please sign in to save your resume.');
    } catch { alert('Error saving resume'); }
  };

  const loadExampleData = () => {
    const example: ResumeData = {
      personalInfo: {
        fullName: 'Alex Johnson',
        email: 'alex.j@example.com',
        phone: '(555) 123-4567',
        location: 'San Francisco, CA',
        linkedin: 'linkedin.com/in/alexj',
        website: 'alexj.dev',
        summary: 'Results-driven Software Engineer with 5+ years of experience building highly scalable web applications. Proficient in React, Node.js, and cloud architectures. Proven track record of improving application performance by 40% and leading successful cross-functional teams to deliver enterprise products on time.'
      },
      experience: [
        {
          id: 'exp1',
          jobTitle: 'Senior Software Engineer',
          company: 'TechFlow Solutions',
          location: 'San Francisco, CA',
          startDate: 'Jan 2021',
          endDate: 'Present',
          current: true,
          bullets: [
            'Architected and implemented a microservices backend using Node.js and Docker, reducing API latency by 35%.',
            'Led a frontend team of 4 to refactor a legacy monolithic React app into Next.js, boosting lighthouse SEO scores from 65 to 98.',
            'Mentored 3 junior developers and established CI/CD pipelines via GitHub Actions.'
          ]
        },
        {
          id: 'exp2',
          jobTitle: 'Frontend Developer',
          company: 'Creative Media',
          location: 'Austin, TX',
          startDate: 'Jun 2018',
          endDate: 'Dec 2020',
          current: false,
          bullets: [
            'Developed accessible and responsive UI components for 10+ client websites using React and Tailwind CSS.',
            'Integrated Redux for complex state management, successfully managing thousands of concurrent socket connections without memory leaks.',
            'Collaborated directly with UI/UX designers to translate Figma wireframes into pixel-perfect frontend code.'
          ]
        }
      ],
      education: [
        {
          id: 'edu1',
          degree: 'B.S. Computer Science',
          school: 'University of Texas at Austin',
          location: 'Austin, TX',
          graduationDate: 'May 2018',
          gpa: '3.8'
        }
      ],
      skills: ['JavaScript (ES6+)', 'TypeScript', 'React.js', 'Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'Tailwind CSS', 'Git/GitHub']
    };
    store.setResumeData(example);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 animate-fadeIn">
        <div>
          <h1 className="text-3xl font-bold">Resume Builder</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Build your ATS-optimized resume step by step</p>
        </div>
        <div className="flex flex-wrap gap-3 mt-4 lg:mt-0">
          <button onClick={loadExampleData} className="btn btn-secondary">
            <Wand2 size={16} style={{color: '#8b5cf6'}} /> Pre-fill Example
          </button>
          
          <button 
            type="button" 
            onClick={() => {
              const jobTitle = prompt("What job role are you applying for? (e.g. Data Scientist, HR Manager)");
              if (jobTitle) {
                setAiLoading(true);
                fetch('/api/skills/generate', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ role: jobTitle }),
                })
                .then(r => r.json())
                .then(data => {
                  setAiLoading(false);
                  if (data.skills) {
                    store.setSkills([...new Set([...resumeData.skills, ...data.skills])]);
                  }
                  alert(`Successfully added skills related to: ${jobTitle}!\n\nCheck the Skills tab to view them.`);
                })
                .catch(() => {
                  setAiLoading(false);
                  alert('Sorry, there was an error generating skills. Please check your Gemini API key in the .env file.');
                });
              }
            }} 
            className="btn font-medium px-4 py-2 rounded-xl text-sm flex items-center gap-2"
            style={{background: 'linear-gradient(135deg, #10B981, #059669)', color: 'white'}}
            disabled={aiLoading}
          >
            <Sparkles size={16} /> Customize for Job Role
          </button>

          <button onClick={() => setShowPreview(!showPreview)} className="btn btn-secondary">
            <Eye size={16} /> {showPreview ? 'Hide' : 'Show'} Preview
          </button>
          <button onClick={saveResume} className="btn btn-primary">
            <Save size={16} /> Save
          </button>
        </div>
      </div>

      {/* Steps indicator */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <button
              key={step.id}
              onClick={() => setCurrentStep(i)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all"
              style={{
                background: i === currentStep ? 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))' : 'var(--bg-secondary)',
                color: i === currentStep ? '#818CF8' : 'var(--text-secondary)',
                border: i === currentStep ? '1px solid rgba(99,102,241,0.3)' : '1px solid var(--border)',
              }}
            >
              <Icon size={16} /> {step.label}
            </button>
          );
        })}
      </div>

      <div className={`grid gap-6 ${showPreview ? 'lg:grid-cols-[1fr_minmax(600px,1.2fr)]' : 'grid-cols-1 max-w-3xl'}`}>
        {/* Form */}
        <div className="glass rounded-2xl p-6 space-y-6 animate-fadeIn">
          {/* Personal Info */}
          {currentStep === 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <User size={20} style={{ color: '#6366F1' }} /> Personal Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Full Name</label>
                  <input value={resumeData.personalInfo.fullName} onChange={e => store.setPersonalInfo({ fullName: e.target.value })} placeholder="John Doe" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Email</label>
                  <input type="email" value={resumeData.personalInfo.email} onChange={e => store.setPersonalInfo({ email: e.target.value })} placeholder="john@example.com" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Phone</label>
                  <input value={resumeData.personalInfo.phone} onChange={e => store.setPersonalInfo({ phone: e.target.value })} placeholder="(555) 123-4567" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Location</label>
                  <input value={resumeData.personalInfo.location} onChange={e => store.setPersonalInfo({ location: e.target.value })} placeholder="San Francisco, CA" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>LinkedIn</label>
                  <input value={resumeData.personalInfo.linkedin || ''} onChange={e => store.setPersonalInfo({ linkedin: e.target.value })} placeholder="linkedin.com/in/yourprofile" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Website</label>
                  <input value={resumeData.personalInfo.website || ''} onChange={e => store.setPersonalInfo({ website: e.target.value })} placeholder="yourwebsite.com" />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Professional Summary</label>
                  <button onClick={() => handleAISuggestion('rewrite')} className="btn btn-secondary text-xs px-3 py-1" disabled={aiLoading}>
                    <Sparkles size={12} /> {aiLoading ? 'Generating...' : 'AI Generate'}
                  </button>
                </div>
                <textarea
                  rows={4}
                  value={resumeData.personalInfo.summary}
                  onChange={e => store.setPersonalInfo({ summary: e.target.value })}
                  placeholder="Dynamic professional with 5+ years of experience..."
                  style={{ resize: 'vertical' }}
                />
              </div>
            </div>
          )}

          {/* Experience */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Briefcase size={20} style={{ color: '#10B981' }} /> Work Experience
                </h2>
                <button onClick={store.addExperience} className="btn btn-secondary text-sm">
                  <Plus size={14} /> Add Position
                </button>
              </div>
              {resumeData.experience.length === 0 && (
                <div className="text-center py-12 rounded-xl" style={{ background: 'var(--bg-primary)' }}>
                  <Briefcase size={40} className="mx-auto mb-3" style={{ color: 'var(--text-secondary)' }} />
                  <p style={{ color: 'var(--text-secondary)' }}>No experience added yet. Click &ldquo;Add Position&rdquo; to start.</p>
                </div>
              )}
              {resumeData.experience.map((exp, idx) => (
                <div key={exp.id} className="p-5 rounded-xl space-y-4" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)' }}>
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Position {idx + 1}</h3>
                    <button onClick={() => store.removeExperience(exp.id)} className="btn btn-danger text-xs px-2 py-1">
                      <Trash2 size={12} />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <input value={exp.jobTitle} onChange={e => store.updateExperience(exp.id, { jobTitle: e.target.value })} placeholder="Job Title" />
                    <input value={exp.company} onChange={e => store.updateExperience(exp.id, { company: e.target.value })} placeholder="Company" />
                    <input value={exp.location} onChange={e => store.updateExperience(exp.id, { location: e.target.value })} placeholder="Location" />
                    <div className="flex gap-2 items-center">
                      <input type="month" value={exp.startDate} onChange={e => store.updateExperience(exp.id, { startDate: e.target.value })} />
                      <span style={{ color: 'var(--text-secondary)' }}>to</span>
                      <input type="month" value={exp.endDate} onChange={e => store.updateExperience(exp.id, { endDate: e.target.value })} disabled={exp.current} />
                    </div>
                  </div>
                  <label className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <input type="checkbox" checked={exp.current} onChange={e => store.updateExperience(exp.id, { current: e.target.checked, endDate: '' })} />
                    Currently working here
                  </label>
                  <div>
                    <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>Bullet Points</label>
                    {exp.bullets.map((bullet, bi) => (
                      <div key={bi} className="flex gap-2 mb-2">
                        <input
                          value={bullet}
                          onChange={e => {
                            const newBullets = [...exp.bullets];
                            newBullets[bi] = e.target.value;
                            store.updateExperience(exp.id, { bullets: newBullets });
                          }}
                          placeholder="Describe your achievement..."
                        />
                        <button
                          onClick={() => store.updateExperience(exp.id, { bullets: exp.bullets.filter((_, i) => i !== bi) })}
                          className="btn btn-danger text-xs px-2"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => store.updateExperience(exp.id, { bullets: [...exp.bullets, ''] })}
                      className="btn btn-secondary text-xs mt-1"
                    >
                      <Plus size={12} /> Add Bullet
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <GraduationCap size={20} style={{ color: '#F59E0B' }} /> Education
                </h2>
                <button onClick={store.addEducation} className="btn btn-secondary text-sm">
                  <Plus size={14} /> Add Education
                </button>
              </div>
              {resumeData.education.length === 0 && (
                <div className="text-center py-12 rounded-xl" style={{ background: 'var(--bg-primary)' }}>
                  <GraduationCap size={40} className="mx-auto mb-3" style={{ color: 'var(--text-secondary)' }} />
                  <p style={{ color: 'var(--text-secondary)' }}>No education added yet.</p>
                </div>
              )}
              {resumeData.education.map((edu, idx) => (
                <div key={edu.id} className="p-5 rounded-xl space-y-4" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)' }}>
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Education {idx + 1}</h3>
                    <button onClick={() => store.removeEducation(edu.id)} className="btn btn-danger text-xs px-2 py-1">
                      <Trash2 size={12} />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <input value={edu.degree} onChange={e => store.updateEducation(edu.id, { degree: e.target.value })} placeholder="Degree (e.g., B.S. Computer Science)" />
                    <input value={edu.school} onChange={e => store.updateEducation(edu.id, { school: e.target.value })} placeholder="School Name" />
                    <input value={edu.location} onChange={e => store.updateEducation(edu.id, { location: e.target.value })} placeholder="Location" />
                    <input value={edu.graduationDate} onChange={e => store.updateEducation(edu.id, { graduationDate: e.target.value })} placeholder="Graduation Year" />
                    <input value={edu.gpa || ''} onChange={e => store.updateEducation(edu.id, { gpa: e.target.value })} placeholder="GPA (optional)" />
                    <input value={edu.honors || ''} onChange={e => store.updateEducation(edu.id, { honors: e.target.value })} placeholder="Honors (optional)" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Wrench size={20} style={{ color: '#EC4899' }} /> Skills
                </h2>
                <button onClick={() => handleAISuggestion('skills')} className="btn btn-secondary text-sm" disabled={aiLoading}>
                  <Sparkles size={14} /> {aiLoading ? 'Loading...' : 'AI Suggest'}
                </button>
              </div>
              <div className="flex gap-2">
                <input
                  value={newSkill}
                  onChange={e => setNewSkill(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addSkill()}
                  placeholder="Type a skill and press Enter..."
                />
                <button onClick={addSkill} className="btn btn-primary px-4">
                  <Plus size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill) => (
                  <span key={skill} className="tag flex items-center gap-2">
                    {skill}
                    <button onClick={() => removeSkill(skill)} className="hover:text-red-400">×</button>
                  </span>
                ))}
                {resumeData.skills.length === 0 && (
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    No skills added. Type above or click AI Suggest for recommendations.
                  </p>
                )}
              </div>
              {/* Role-based suggestions */}
              <div className="p-4 rounded-xl" style={{ background: 'var(--bg-primary)' }}>
                <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>Quick Add by Role:</p>
                <div className="flex flex-wrap gap-2">
                  {['Project Manager', 'Software Engineer', 'Data Scientist', 'Business Analyst', 'Scrum Master'].map(role => (
                    <button
                      key={role}
                      onClick={async () => {
                        const res = await fetch('/api/skills/generate', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ role }),
                        });
                        const data = await res.json();
                        if (data.skills) {
                          store.setSkills([...new Set([...resumeData.skills, ...data.skills])]);
                        }
                      }}
                      className="btn btn-secondary text-xs px-3 py-1.5"
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-4" style={{ borderTop: '1px solid var(--border)' }}>
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="btn btn-secondary"
              style={{ opacity: currentStep === 0 ? 0.5 : 1 }}
            >
              <ChevronLeft size={16} /> Previous
            </button>
            {currentStep < steps.length - 1 ? (
              <button onClick={() => setCurrentStep(currentStep + 1)} className="btn btn-primary">
                Next <ChevronRight size={16} />
              </button>
            ) : (
              <button onClick={saveResume} className="btn btn-success">
                <Download size={16} /> Save Resume
              </button>
            )}
          </div>
        </div>

        {/* Live Preview */}
        {showPreview && (
          <div className="glass rounded-2xl p-6 animate-slideIn sticky top-8 self-start w-full overflow-hidden flex flex-col justify-center bg-gray-100">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-black">
              <Eye size={18} /> Live Preview ({store.templateId || 'Classic'})
            </h2>
            <div className="w-full overflow-y-auto max-h-[80vh] flex justify-center py-4 zoom-container" style={{ transform: 'scale(0.85)', transformOrigin: 'top center' }}>
                 <ClassicTemplate data={resumeData} templateId={store.templateId} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
