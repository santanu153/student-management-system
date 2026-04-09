'use client';

import Link from 'next/link';
import { FileEdit, CheckCircle, Palette, PenLine, Sparkles, Plus, ArrowRight, TrendingUp, FileText } from 'lucide-react';
import ScoreCircle from '@/components/charts/ScoreCircle';

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-fadeIn">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Welcome back! Here&apos;s your resume overview.
          </p>
        </div>
        <Link href="/builder" className="btn btn-primary">
          <Plus size={16} /> New Resume
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: FileEdit, label: 'Build Resume', href: '/builder', color: '#6366F1', desc: 'Create from scratch' },
          { icon: CheckCircle, label: 'Check Score', href: '/checker', color: '#10B981', desc: 'Analyze your resume' },
          { icon: Palette, label: 'Templates', href: '/templates', color: '#EC4899', desc: 'Browse designs' },
          { icon: Sparkles, label: 'AI Improve', href: '/builder', color: '#F59E0B', desc: 'Get suggestions' },
        ].map((action, i) => {
          const Icon = action.icon;
          return (
            <Link
              key={i}
              href={action.href}
              className="glass rounded-2xl p-5 hover-card block animate-fadeIn"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                style={{ background: `${action.color}15`, border: `1px solid ${action.color}30` }}
              >
                <Icon size={20} style={{ color: action.color }} />
              </div>
              <h3 className="font-semibold text-sm">{action.label}</h3>
              <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>{action.desc}</p>
            </Link>
          );
        })}
      </div>

      {/* Demo Score Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass rounded-2xl p-6 animate-fadeIn">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp size={20} style={{ color: '#6366F1' }} />
              ATS Score Overview
            </h2>
            <Link href="/checker" className="text-sm font-medium flex items-center gap-1" style={{ color: '#818CF8' }}>
              Run Analysis <ArrowRight size={14} />
            </Link>
          </div>
          <div className="flex flex-wrap gap-8 items-center justify-center">
            <ScoreCircle score={0} label="Overall" />
            <div className="grid grid-cols-2 gap-4 flex-1 min-w-[200px]">
              {[
                { label: 'Keywords', score: 0, color: '#6366F1' },
                { label: 'Formatting', score: 0, color: '#10B981' },
                { label: 'Sections', score: 0, color: '#F59E0B' },
                { label: 'Experience', score: 0, color: '#EC4899' },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-xl" style={{ background: 'var(--bg-primary)' }}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
                    <span className="text-sm font-bold" style={{ color: item.color }}>{item.score}%</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: 'var(--bg-input)' }}>
                    <div
                      className="h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${item.score}%`, background: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-center mt-6" style={{ color: 'var(--text-secondary)' }}>
            Upload or build a resume, then run the ATS checker to see your scores here.
          </p>
        </div>

        {/* Tips */}
        <div className="glass rounded-2xl p-6 animate-fadeIn" style={{ animationDelay: '200ms' }}>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <PenLine size={18} style={{ color: '#F59E0B' }} />
            Quick Tips
          </h2>
          <div className="space-y-3">
            {[
              'Use keywords from the job description',
              'Keep your resume to 1-2 pages',
              'Start bullets with action verbs',
              'Add quantifiable achievements',
              'Include a professional summary',
              'List relevant skills prominently',
            ].map((tip, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl"
                style={{ background: 'var(--bg-primary)' }}
              >
                <span className="text-sm" style={{ color: '#10B981' }}>✓</span>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent get-started */}
      <div className="glass rounded-2xl p-8 text-center animate-fadeIn" style={{ animationDelay: '300ms' }}>
        <FileText size={40} className="mx-auto mb-4" style={{ color: 'var(--text-secondary)' }} />
        <h3 className="text-xl font-bold mb-2">No Resumes Yet</h3>
        <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
          Create your first resume or check an existing one against ATS criteria.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/builder" className="btn btn-primary">
            <FileEdit size={16} /> Create Resume
          </Link>
          <Link href="/checker" className="btn btn-secondary">
            <CheckCircle size={16} /> Check Existing
          </Link>
        </div>
      </div>
    </div>
  );
}
