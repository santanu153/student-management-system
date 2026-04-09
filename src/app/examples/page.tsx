'use client';

import { useState } from 'react';
import { resumeExamples } from '@/data/examples';
import { useResumeStore } from '@/store';
import { useRouter } from 'next/navigation';
import { BookOpen, ArrowRight, Briefcase, GraduationCap, Wrench, Award } from 'lucide-react';

export default function ExamplesPage() {
  const [selectedExample, setSelectedExample] = useState<string | null>(null);
  const { loadResume } = useResumeStore();
  const router = useRouter();

  const useExample = (id: string) => {
    const example = resumeExamples.find(e => e.id === id);
    if (example) {
      loadResume(example.data);
      router.push('/builder');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="animate-fadeIn">
        <h1 className="text-3xl font-bold">Resume Examples</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Browse real-world resume examples by role. Click to use one as your starting point.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {resumeExamples.map((example, i) => {
          const isOpen = selectedExample === example.id;
          return (
            <div
              key={example.id}
              className="glass rounded-2xl overflow-hidden hover-card animate-fadeIn"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Header */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold">{example.role}</h3>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {example.industry} • {example.level}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedExample(isOpen ? null : example.id)}
                      className="btn btn-secondary text-xs"
                    >
                      {isOpen ? 'Hide' : 'Preview'}
                    </button>
                    <button onClick={() => useExample(example.id)} className="btn btn-primary text-xs">
                      Use This <ArrowRight size={12} />
                    </button>
                  </div>
                </div>

                {/* Quick stats */}
                <div className="flex gap-4">
                  <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                    <Briefcase size={12} /> {example.data.experience.length} roles
                  </span>
                  <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                    <Wrench size={12} /> {example.data.skills.length} skills
                  </span>
                  <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                    <GraduationCap size={12} /> {example.data.education.length} degree{example.data.education.length !== 1 ? 's' : ''}
                  </span>
                  {example.data.certifications && (
                    <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                      <Award size={12} /> {example.data.certifications.length} certs
                    </span>
                  )}
                </div>
              </div>

              {/* Preview */}
              {isOpen && (
                <div className="border-t p-6 space-y-4" style={{ borderColor: 'var(--border)', background: 'var(--bg-primary)' }}>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#6366F1' }}>Summary</h4>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{example.data.personalInfo.summary}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#10B981' }}>Experience</h4>
                    {example.data.experience.map(exp => (
                      <div key={exp.id} className="mb-3">
                        <p className="text-sm font-semibold">{exp.jobTitle} — {exp.company}</p>
                        <ul className="text-xs ml-4 mt-1 space-y-1" style={{ color: 'var(--text-secondary)' }}>
                          {exp.bullets.slice(0, 2).map((b, j) => <li key={j}>• {b}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#EC4899' }}>Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {example.data.skills.map(s => (
                        <span key={s} className="tag text-xs">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
