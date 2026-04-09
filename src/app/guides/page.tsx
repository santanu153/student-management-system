'use client';

import { useState } from 'react';
import { guides } from '@/data/guides';
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

export default function GuidesPage() {
  const [openGuide, setOpenGuide] = useState<string | null>('ats-optimization');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="animate-fadeIn">
        <h1 className="text-3xl font-bold">Writing Guides</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Expert tips and guides to create the perfect resume
        </p>
      </div>

      <div className="space-y-4">
        {guides.map((guide, i) => {
          const isOpen = openGuide === guide.id;
          return (
            <div
              key={guide.id}
              className="glass rounded-2xl overflow-hidden animate-fadeIn"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <button
                onClick={() => setOpenGuide(isOpen ? null : guide.id)}
                className="w-full p-6 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{guide.icon}</span>
                  <div>
                    <h3 className="font-bold text-lg">{guide.title}</h3>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{guide.description}</p>
                  </div>
                </div>
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              {isOpen && (
                <div className="px-6 pb-6 space-y-6" style={{ borderTop: '1px solid var(--border)' }}>
                  {guide.sections.map((section, j) => (
                    <div key={j} className="pt-5">
                      <h4 className="font-semibold text-base mb-2 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{ background: 'rgba(99,102,241,0.1)', color: '#818CF8' }}>
                          {j + 1}
                        </span>
                        {section.heading}
                      </h4>
                      <p className="text-sm leading-relaxed ml-8" style={{ color: 'var(--text-secondary)' }}>
                        {section.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
