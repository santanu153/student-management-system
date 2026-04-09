'use client';

import Link from 'next/link';
import { FileEdit, CheckCircle, Palette, Sparkles, ArrowRight, Zap, Shield, Target } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto space-y-16 py-8">
      {/* Hero */}
      <section className="text-center space-y-6 animate-fadeIn">
        <div className="tag mx-auto">✨ AI-Powered Resume Scanner</div>
        <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight">
          Land Your Dream Job with{' '}
          <span className="gradient-text">ATS-Optimized</span> Resumes
        </h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
          Build, analyze, and optimize your resume to beat Applicant Tracking Systems.
          Get AI-powered suggestions and increase your interview callback rate by 3x.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/builder" className="btn btn-primary text-base px-8 py-3">
            <FileEdit size={18} /> Build Resume <ArrowRight size={16} />
          </Link>
          <Link href="/checker" className="btn btn-secondary text-base px-8 py-3">
            <CheckCircle size={18} /> Check ATS Score
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { value: '99%', label: 'ATS Compatibility', color: '#10B981' },
          { value: '3x', label: 'More Interviews', color: '#6366F1' },
          { value: '50K+', label: 'Resumes Scanned', color: '#F59E0B' },
          { value: '8', label: 'Templates', color: '#EC4899' },
        ].map((stat, i) => (
          <div
            key={i}
            className="glass rounded-2xl p-6 text-center hover-card"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="text-3xl font-extrabold mb-1" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Features Grid */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-3">Everything You Need</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Complete toolkit to create the perfect resume</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: FileEdit, title: 'Resume Builder', desc: 'Step-by-step builder with live preview and drag-and-drop sections', href: '/builder', color: '#6366F1' },
            { icon: CheckCircle, title: 'ATS Checker', desc: 'Upload your resume and get instant ATS compatibility score', href: '/checker', color: '#10B981' },
            { icon: Sparkles, title: 'AI Suggestions', desc: 'Get AI-powered improvements for bullet points, summaries, and skills', href: '/builder', color: '#8B5CF6' },
            { icon: Palette, title: 'Templates', desc: 'Choose from 8 professional templates across 4 categories', href: '/templates', color: '#EC4899' },
            { icon: Target, title: 'Keyword Matching', desc: 'Match your resume keywords against any job description', href: '/checker', color: '#F59E0B' },
            { icon: Shield, title: 'Privacy First', desc: 'Your data stays local. No resumes stored on external servers', href: '#', color: '#14B8A6' },
          ].map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Link
                key={i}
                href={feature.href}
                className="glass rounded-2xl p-6 hover-card block"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${feature.color}15`, border: `1px solid ${feature.color}30` }}
                >
                  <Icon size={22} style={{ color: feature.color }} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-3">How It Works</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Three simple steps to a perfect resume</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: '01', title: 'Build or Upload', desc: 'Use our builder or upload your existing resume in PDF/DOCX format', icon: '📄' },
            { step: '02', title: 'Get ATS Score', desc: 'Our AI analyzes your resume against ATS criteria and job descriptions', icon: '🎯' },
            { step: '03', title: 'Optimize & Apply', desc: 'Apply AI suggestions, download your optimized resume, and land interviews', icon: '🚀' },
          ].map((item, i) => (
            <div key={i} className="text-center space-y-4">
              <div className="text-5xl">{item.icon}</div>
              <div className="tag mx-auto">Step {item.step}</div>
              <h3 className="font-bold text-xl">{item.title}</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="glass rounded-3xl p-12 text-center space-y-6 animate-pulse-glow">
        <h2 className="text-3xl font-bold">Ready to Beat the ATS?</h2>
        <p className="max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
          Join thousands of job seekers who have improved their resume scores and landed more interviews.
        </p>
        <Link href="/builder" className="btn btn-primary text-base px-10 py-4">
          <Zap size={18} /> Start Building for Free <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
