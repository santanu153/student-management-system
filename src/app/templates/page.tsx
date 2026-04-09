'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { templates, templateCategories } from '@/data/templates';
import { Palette, ArrowRight, FileEdit } from 'lucide-react';
import { useResumeStore } from '@/store';

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const router = useRouter();
  const store = useResumeStore();

  const handleUseTemplate = (templateId: string) => {
    store.setTemplateId(templateId);
    router.push('/builder');
  };

  const filtered = activeCategory === 'all'
    ? templates
    : templates.filter(t => t.category === activeCategory);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="animate-fadeIn">
        <h1 className="text-3xl font-bold">Resume Templates</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Choose from professionally designed templates across 4 categories
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 animate-fadeIn">
        {templateCategories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all"
            style={{
              background: activeCategory === cat.id ? 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))' : 'var(--bg-secondary)',
              color: activeCategory === cat.id ? '#818CF8' : 'var(--text-secondary)',
              border: activeCategory === cat.id ? '1px solid rgba(99,102,241,0.3)' : '1px solid var(--border)',
            }}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Template Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((template, i) => (
          <div
            key={template.id}
            className="glass rounded-2xl overflow-hidden hover-card animate-fadeIn"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            {/* Template Preview */}
            <div
              className="h-48 flex items-center justify-center relative"
              style={{ background: `linear-gradient(135deg, ${template.color}20, ${template.color}05)` }}
            >
              <div className="bg-white rounded-lg shadow-lg w-24 h-32 p-2 flex flex-col gap-1">
                <div className="h-2 rounded" style={{ background: template.color, width: '60%' }} />
                <div className="h-1 rounded bg-gray-200 w-full" />
                <div className="h-1 rounded bg-gray-200 w-4/5" />
                <div className="h-1 rounded bg-gray-100 w-full mt-1" />
                <div className="h-1 rounded bg-gray-100 w-3/4" />
                <div className="h-1 rounded bg-gray-100 w-5/6" />
                <div className="h-1 rounded bg-gray-200 w-full mt-1" />
                <div className="h-1 rounded bg-gray-200 w-2/3" />
              </div>
              <div className="absolute top-3 right-3">
                <span className="px-3 py-1 rounded-full text-xs font-medium capitalize"
                  style={{ background: `${template.color}20`, color: template.color, border: `1px solid ${template.color}30` }}>
                  {template.category}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="p-5 flex flex-col justify-between" style={{ height: '320px' }}>
              <div>
                <h3 className="font-semibold text-lg">{template.name}</h3>
                <p className="text-xs mt-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{template.description}</p>
              </div>
              <div className="flex gap-2 w-full mt-4">
                <button
                  onClick={() => handleUseTemplate(template.id)}
                  className="btn btn-primary justify-center text-sm py-2.5 flex-1"
                >
                  <FileEdit size={14} /> Use Template
                </button>
                <a
                  href="/sample-resume.pdf"
                  download={`example-${template.id}.pdf`}
                  className="btn btn-secondary justify-center text-sm py-2.5 flex-1 block text-center"
                >
                  Download PDF
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
