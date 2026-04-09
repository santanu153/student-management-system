import React from 'react';
import { ResumeData } from '@/types';

interface ClassicTemplateProps {
  data: ResumeData;
  color?: string;
  templateId?: string;
}

export default function ClassicTemplate({ data, color = '#2b6cb0', templateId = 'elegant' }: ClassicTemplateProps) {
  const { personalInfo, experience, education, skills } = data;

  // Decide styles based on template ID
  let fontFam = '"Arial", sans-serif';
  let headerAlign = 'center';
  let borderWidth = '2px';
  let uppercaseHeader = true;
  let sectionBorder = false;

  if (templateId === 'stylish') {
    fontFam = '"Open Sans", "Helvetica Neue", sans-serif';
    headerAlign = 'left';
    borderWidth = '4px';
    color = '#3B82F6';
  } else if (templateId === 'modern') {
    fontFam = '"Roboto", sans-serif';
    headerAlign = 'left';
    uppercaseHeader = false;
    sectionBorder = true;
    color = '#0EA5E9';
  } else if (templateId === 'creative') {
    fontFam = '"Montserrat", sans-serif';
    headerAlign = 'right';
    borderWidth = '8px';
    color = '#8B5CF6';
  } else if (templateId === 'compact') {
    fontFam = '"Times New Roman", serif';
    headerAlign = 'center';
    borderWidth = '1px';
    uppercaseHeader = true;
    color = '#374151';
  } else if (templateId === 'double-column') {
    fontFam = '"Segoe UI", sans-serif';
    headerAlign = 'left';
    color = '#14B8A6';
  }

  return (
    <div className="bg-white text-gray-900 w-full h-full min-h-[1056px] shadow-sm" style={{ padding: '40px', fontFamily: fontFam, width: '210mm', margin: '0 auto', boxSizing: 'border-box' }}>
      
      {templateId === 'double-column' || templateId === 'modern' || templateId === 'creative' || templateId === 'compact' ? (
        // COLUMN LAYOUTS
        <div className={`flex h-full ${templateId === 'creative' ? 'flex-col' : 'gap-6'}`}>
          {/* Creative Header */}
          {templateId === 'creative' && (
             <div className="w-full text-white text-center p-8 mb-6 rounded-t-sm" style={{ background: color }}>
                <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">{personalInfo.fullName || 'YOUR NAME'}</h1>
                <div className="text-blue-100 mb-2">{experience[0]?.jobTitle || 'Professional Title'}</div>
                <div className="flex flex-wrap justify-center gap-x-4 text-xs text-white opacity-90 mt-2">
                  {personalInfo.email && <span>{personalInfo.email}</span>}
                  {personalInfo.phone && <span>{personalInfo.phone}</span>}
                  {personalInfo.location && <span>{personalInfo.location}</span>}
                  {personalInfo.linkedin && <span>{personalInfo.linkedin.replace('https://','')}</span>}
                </div>
             </div>
          )}

          {/* Modern & Compact Header Layer */}
          {templateId !== 'creative' && (
              <header className="mb-6 w-full col-span-2 block border-b pb-4 shrink-0" style={{ borderBottom: `2px solid ${color}` }}>
                <h1 className="text-4xl font-bold uppercase tracking-wider mb-1" style={{ color }}>{personalInfo.fullName || 'YOUR NAME'}</h1>
                <div className="flex flex-wrap gap-x-4 text-xs text-gray-600 mt-2">
                  {personalInfo.email && <span>{personalInfo.email}</span>}
                  {personalInfo.phone && <span>{personalInfo.phone}</span>}
                  {personalInfo.location && <span>{personalInfo.location}</span>}
                  {personalInfo.linkedin && <span>{personalInfo.linkedin.replace('https://','')}</span>}
                </div>
              </header>
          )}

          <div className="flex gap-6 w-full flex-1">
             {/* LEFT SIDEBAR (Skills, Education) for Double-Column/Modern */}
             <div className={`${templateId === 'compact' ? 'w-1/4' : 'w-1/3'}`} style={{ borderRight: templateId === 'creative' ? 'none' : `1px solid ${color}30`, paddingRight: '20px' }}>
                
                {skills && skills.length > 0 && (
                  <section className="mb-6">
                    <h2 className="text-md font-bold uppercase mb-3" style={{ color, borderBottom: `2px solid ${color}50`, paddingBottom: '3px' }}>Skills</h2>
                    <div className="flex flex-col gap-1.5">
                      {skills.map((skill, index) => (
                        <div key={index} className="flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full shrink-0" style={{background: color}}></div>
                           <span className="text-sm text-gray-700 font-medium">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {education && education.length > 0 && (
                  <section className="mb-6">
                    <h2 className="text-md font-bold uppercase mb-3" style={{ color, borderBottom: `2px solid ${color}50`, paddingBottom: '3px' }}>Education</h2>
                    <div className="space-y-4">
                      {education.map((edu, index) => (
                        <div key={index}>
                          <h3 className="font-bold text-gray-800 text-sm leading-tight mb-1">{edu.degree || 'Degree Name'}</h3>
                          <div className="text-xs text-gray-700 font-medium">{edu.school || 'School/University Name'}</div>
                          <span className="text-xs text-gray-500 mt-1 block">{edu.graduationDate || 'Expected'}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
             </div>
             
             {/* RIGHT MAIN BAR (Profile, Experience) */}
             <div className={`${templateId === 'compact' ? 'w-3/4' : 'w-2/3'} pl-2`}>
               {personalInfo.summary && (
                <section className="mb-8">
                  <h2 className="text-lg font-bold uppercase mb-2 flex items-center gap-2" style={{ color }}>
                    <div className="w-5 h-5 rounded-full" style={{background: `${color}20`, border: `2px solid ${color}`}}></div>
                    Profile
                  </h2>
                  <p className="text-sm leading-relaxed text-gray-700">{personalInfo.summary}</p>
                </section>
               )}

              {experience && experience.length > 0 && (
                <section className="mb-6">
                  <h2 className="text-lg font-bold uppercase mb-4 flex items-center gap-2" style={{ color }}>
                     <div className="w-5 h-5 rounded-full" style={{background: `${color}20`, border: `2px solid ${color}`}}></div>
                     Experience
                  </h2>
                  <div className="space-y-6">
                    {experience.map((exp, index) => (
                      <div key={index} className="relative pl-4 border-l-2" style={{borderColor: `${color}30`}}>
                        <div className="absolute w-3 h-3 rounded-full -left-[7px] top-1" style={{background: color}}></div>
                        
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="font-bold text-gray-900">{exp.jobTitle || 'Job Title'}</h3>
                          <span className="text-xs font-semibold px-2 py-1 rounded" style={{background: `${color}15`, color: color}}>{exp.startDate} - {exp.endDate || 'Present'}</span>
                        </div>
                        <div className="text-sm italic text-gray-700 mb-3 font-medium">{exp.company || 'Company Name'}</div>
                        <ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-1.5">
                          {(exp.bullets && exp.bullets.length > 0 ? exp.bullets : ['Accomplishment or responsibility 1', 'Accomplishment or responsibility 2']).map((bullet, i) => (
                            <li key={i} className="leading-snug">{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              )}
             </div>
          </div>
        </div>
      ) : (
        // STANDARD LAYOUTS (Elegant, Stylish, Modern, Creative, Compact)
        <>
          {/* Header */}
          <header className={`mb-6 text-${headerAlign}`} style={{ borderBottom: `${borderWidth} solid ${color}`, paddingBottom: '16px' }}>
            <h1 className={`text-4xl font-bold tracking-wider mb-1 ${uppercaseHeader ? 'uppercase' : ''}`} style={{ color }}>{personalInfo.fullName || 'YOUR NAME'}</h1>
            <div className={`flex flex-wrap gap-x-4 text-sm text-gray-600 mt-2 ${headerAlign === 'center' ? 'justify-center' : headerAlign === 'right' ? 'justify-end' : 'justify-start'}`}>
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>• {personalInfo.phone}</span>}
              {personalInfo.location && <span>• {personalInfo.location}</span>}
              {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
              {personalInfo.website && <span>• {personalInfo.website}</span>}
            </div>
          </header>

          {/* Summary */}
          {personalInfo.summary && (
            <section className="mb-6">
              <h2 className={`text-lg font-bold uppercase mb-2 ${sectionBorder ? 'border-b pb-1 mb-3' : ''}`} style={{ color, borderColor: color }}>Professional Summary</h2>
              <p className="text-sm leading-relaxed text-gray-700">{personalInfo.summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <section className="mb-6">
              <h2 className={`text-lg font-bold uppercase mb-3 ${sectionBorder ? 'border-b pb-1 mb-4' : ''}`} style={{ color, borderColor: color }}>Experience</h2>
              <div className="space-y-4">
                {experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-gray-800">{exp.jobTitle || 'Job Title'}</h3>
                      <span className="text-sm font-medium text-gray-600">{exp.startDate} - {exp.endDate || 'Present'}</span>
                    </div>
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="italic text-gray-700">{exp.company || 'Company Name'}</span>
                      {exp.location && <span className="text-sm text-gray-500">{exp.location}</span>}
                    </div>
                    <ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-1">
                      {(exp.bullets && exp.bullets.length > 0 ? exp.bullets : ['Accomplishment or responsibility 1', 'Accomplishment or responsibility 2']).map((bullet, i) => (
                        <li key={i} className="leading-snug">{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <section className="mb-6">
              <h2 className={`text-lg font-bold uppercase mb-3 ${sectionBorder ? 'border-b pb-1 mb-4' : ''}`} style={{ color, borderColor: color }}>Education</h2>
              <div className="space-y-3">
                {education.map((edu, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-gray-800">{edu.degree || 'Degree Name'}</h3>
                      <span className="text-sm font-medium text-gray-600">{edu.graduationDate || 'Expected'}</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-gray-700">{edu.school || 'School/University Name'}</span>
                      {(edu.gpa || edu.location) && (
                        <span className="text-sm text-gray-500">
                          {edu.location}{edu.location && edu.gpa ? ' • ' : ''}{edu.gpa ? `GPA: ${edu.gpa}` : ''}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills && skills.length > 0 && (
            <section className="mb-6">
              <h2 className={`text-lg font-bold uppercase mb-3 ${sectionBorder ? 'border-b pb-1 mb-4' : ''}`} style={{ color, borderColor: color }}>Skills</h2>
              <div className="flex flex-wrap gap-x-2 gap-y-1">
                {skills.map((skill, index) => (
                  <React.Fragment key={index}>
                    <span className="text-sm text-gray-700 font-medium">{skill}</span>
                    {index < skills.length - 1 && <span className="text-gray-400">•</span>}
                  </React.Fragment>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}