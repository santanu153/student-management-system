import { create } from 'zustand';
import { ResumeData, emptyResumeData, ATSScoreResult } from '@/types';

interface ResumeStore {
  resumeData: ResumeData;
  currentResumeId: string | null;
  templateId: string;
  atsScore: ATSScoreResult | null;
  isLoading: boolean;
  setResumeData: (data: Partial<ResumeData>) => void;
  setPersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<ResumeData['experience'][0]>) => void;
  removeExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<ResumeData['education'][0]>) => void;
  removeEducation: (id: string) => void;
  setSkills: (skills: string[]) => void;
  setTemplateId: (id: string) => void;
  setATSScore: (score: ATSScoreResult | null) => void;
  setCurrentResumeId: (id: string | null) => void;
  setLoading: (loading: boolean) => void;
  resetResume: () => void;
  loadResume: (data: ResumeData, id?: string) => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  resumeData: emptyResumeData,
  currentResumeId: null,
  templateId: 'modern-blue',
  atsScore: null,
  isLoading: false,

  setResumeData: (data) => set((state) => ({
    resumeData: { ...state.resumeData, ...data },
  })),

  setPersonalInfo: (info) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      personalInfo: { ...state.resumeData.personalInfo, ...info },
    },
  })),

  addExperience: () => set((state) => ({
    resumeData: {
      ...state.resumeData,
      experience: [
        ...state.resumeData.experience,
        { id: Date.now().toString(), jobTitle: '', company: '', location: '', startDate: '', endDate: '', current: false, bullets: [''] },
      ],
    },
  })),

  updateExperience: (id, data) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      experience: state.resumeData.experience.map(exp =>
        exp.id === id ? { ...exp, ...data } : exp
      ),
    },
  })),

  removeExperience: (id) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      experience: state.resumeData.experience.filter(exp => exp.id !== id),
    },
  })),

  addEducation: () => set((state) => ({
    resumeData: {
      ...state.resumeData,
      education: [
        ...state.resumeData.education,
        { id: Date.now().toString(), degree: '', school: '', location: '', graduationDate: '' },
      ],
    },
  })),

  updateEducation: (id, data) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      education: state.resumeData.education.map(edu =>
        edu.id === id ? { ...edu, ...data } : edu
      ),
    },
  })),

  removeEducation: (id) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      education: state.resumeData.education.filter(edu => edu.id !== id),
    },
  })),

  setSkills: (skills) => set((state) => ({
    resumeData: { ...state.resumeData, skills },
  })),

  setTemplateId: (id) => set({ templateId: id }),
  setATSScore: (score) => set({ atsScore: score }),
  setCurrentResumeId: (id) => set({ currentResumeId: id }),
  setLoading: (loading) => set({ isLoading: loading }),

  resetResume: () => set({
    resumeData: emptyResumeData,
    currentResumeId: null,
    atsScore: null,
  }),

  loadResume: (data, id) => set({
    resumeData: data,
    currentResumeId: id || null,
  }),
}));


