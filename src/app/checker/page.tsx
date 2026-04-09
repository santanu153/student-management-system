'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, CheckCircle, AlertTriangle, Target, Sparkles, XCircle, Loader2 } from 'lucide-react';
import { auth } from '@/lib/firebase';
import ScoreCircle from '@/components/charts/ScoreCircle';
import { ATSScoreResult } from '@/types';

export default function CheckerPage() {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [score, setScore] = useState<ATSScoreResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  const onDrop = useCallback(async (files: File[]) => {
    const file = files[0];
    if (!file) return;
    setFileName(file.name);
    setError('');

    if (file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => setResumeText(e.target?.result as string);
      reader.readAsText(file);
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/ats/parse', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || 'Failed to parse file');
      }

      setResumeText(data.text);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred while uploading. Please ensure it is a valid resume.');
      setResumeText('');
    } finally {
      setLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/plain': ['.txt'], 'application/pdf': ['.pdf'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] },
    maxFiles: 1,
  });

  const runAnalysis = async () => {
    if (!resumeText.trim()) return;
    setLoading(true);
    try {
      const token = await auth?.currentUser?.getIdToken();
      const res = await fetch('/api/ats/score', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}), 
        },
        body: JSON.stringify({ resumeText, jobDescription: jobDescription || undefined }),
      });
      const data = await res.json();
      if (data.result) setScore(data.result);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="animate-fadeIn">
        <h1 className="text-3xl font-bold">ATS Resume Checker</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Upload your resume and get instant ATS compatibility analysis
        </p>

        {error && (
          <div className="mt-6 p-4 rounded-xl text-sm flex items-start gap-3 w-full" style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)' }}>
            <AlertTriangle className="shrink-0 mt-0.5" size={18} />
            <div>
              <p className="font-bold">Invalid Upload</p>
              <p>{error}</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6 animate-fadeIn">
          {/* Upload Area */}
          <div
            {...getRootProps()}
            className="glass rounded-2xl p-8 text-center cursor-pointer hover-card"
            style={{
              border: isDragActive ? '2px dashed #6366F1' : '2px dashed var(--border)',
              background: isDragActive ? 'rgba(99,102,241,0.05)' : undefined,
            }}
          >
            <input {...getInputProps()} />
            <Upload size={40} className="mx-auto mb-4" style={{ color: isDragActive ? '#6366F1' : 'var(--text-secondary)' }} />
            <h3 className="font-semibold mb-1">
              {fileName ? `Uploaded: ${fileName}` : 'Drag & drop your resume here'}
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              or click to browse • Supports TXT files (paste PDF/DOCX content below)
            </p>
          </div>

          {/* Resume Text */}
          <div className="glass rounded-2xl p-6 space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <FileText size={16} style={{ color: '#6366F1' }} /> Resume Text
            </h3>
            <textarea
              rows={8}
              value={resumeText}
              onChange={e => setResumeText(e.target.value)}
              placeholder="Paste your resume text here, or upload a file above..."
              style={{ resize: 'vertical' }}
            />
          </div>

          {/* Job Description */}
          <div className="glass rounded-2xl p-6 space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Target size={16} style={{ color: '#F59E0B' }} /> Job Description (Optional)
            </h3>
            <textarea
              rows={6}
              value={jobDescription}
              onChange={e => setJobDescription(e.target.value)}
              placeholder="Paste the job description to get keyword matching analysis..."
              style={{ resize: 'vertical' }}
            />
          </div>

          <button
            onClick={runAnalysis}
            disabled={loading || !resumeText.trim()}
            className="btn btn-primary w-full justify-center py-3 text-base"
            style={{ opacity: !resumeText.trim() ? 0.5 : 1 }}
          >
            {loading ? <><Loader2 size={18} className="animate-spin" /> Analyzing...</> : <><Sparkles size={18} /> Analyze Resume</>}
          </button>
        </div>

        {/* Results Section */}
        <div className="space-y-6 animate-fadeIn" style={{ animationDelay: '200ms' }}>
          {score ? (
            <>
              {/* Overall Score */}
              <div className="glass rounded-2xl p-6 text-center">
                <h3 className="text-lg font-bold mb-4">Your ATS Score</h3>
                <ScoreCircle score={score.overallScore} size={160} />
                <p className="mt-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {score.overallScore >= 80 ? '🎉 Excellent! Your resume is well-optimized for ATS.' :
                    score.overallScore >= 60 ? '👍 Good, but there\'s room for improvement.' :
                      '⚠️ Your resume needs optimization to pass ATS filters.'}
                </p>
              </div>

              {/* Score Breakdown */}
              <div className="glass rounded-2xl p-6">
                <h3 className="font-bold mb-4">Score Breakdown</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Keyword Match', score: score.keywordScore, color: '#6366F1', weight: '35%' },
                    { label: 'Section Completeness', score: score.sectionScore, color: '#10B981', weight: '25%' },
                    { label: 'Formatting', score: score.formatScore, color: '#F59E0B', weight: '20%' },
                    { label: 'Experience Relevance', score: score.experienceScore, color: '#EC4899', weight: '20%' },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span style={{ color: 'var(--text-secondary)' }}>{item.label} ({item.weight})</span>
                        <span className="font-bold" style={{ color: item.color }}>{item.score}%</span>
                      </div>
                      <div className="h-3 rounded-full overflow-hidden" style={{ background: 'var(--bg-input)' }}>
                        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${item.score}%`, background: item.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Keywords */}
              {(score.matchedKeywords.length > 0 || score.missingKeywords.length > 0) && (
                <div className="glass rounded-2xl p-6">
                  <h3 className="font-bold mb-4">Keywords Analysis</h3>
                  {score.matchedKeywords.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2 flex items-center gap-2">
                        <CheckCircle size={14} style={{ color: '#10B981' }} />
                        <span style={{ color: '#10B981' }}>Matched ({score.matchedKeywords.length})</span>
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {score.matchedKeywords.map(k => (
                          <span key={k} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981', border: '1px solid rgba(16,185,129,0.2)' }}>
                            {k}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {score.missingKeywords.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2 flex items-center gap-2">
                        <XCircle size={14} style={{ color: '#EF4444' }} />
                        <span style={{ color: '#EF4444' }}>Missing ({score.missingKeywords.length})</span>
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {score.missingKeywords.slice(0, 20).map(k => (
                          <span key={k} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)' }}>
                            {k}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Suggestions */}
              {score.suggestions.length > 0 && (
                <div className="glass rounded-2xl p-6">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <AlertTriangle size={16} style={{ color: '#F59E0B' }} /> Improvement Suggestions
                  </h3>
                  <div className="space-y-2">
                    {score.suggestions.map((s, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'var(--bg-primary)' }}>
                        <span className="text-sm font-bold min-w-[20px]" style={{ color: '#F59E0B' }}>{i + 1}.</span>
                        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="glass rounded-2xl p-12 text-center">
              <CheckCircle size={60} className="mx-auto mb-4" style={{ color: 'var(--text-secondary)', opacity: 0.3 }} />
              <h3 className="text-xl font-bold mb-2">No Analysis Yet</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Paste your resume text and optionally a job description, then click &ldquo;Analyze Resume&rdquo; to get your ATS score.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
