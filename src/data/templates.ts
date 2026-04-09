import { ResumeTemplate } from '@/types';

const BASE_DESC = "We've tested these templates with major ATS vendors to ensure they parse correctly. Keep your content focused on the reader, though - humans still make the vast majority of hiring decisions. Many more colours, backgrounds, sections and icons available in the CV editor. ";

export const templates: ResumeTemplate[] = [
  { id: 'elegant', name: 'Elegant', category: 'simple', description: BASE_DESC + 'An elegant design featuring a visually pleasing layout and easy-to-read format that emphasizes your strengths and accomplishments.', thumbnail: '/templates/elegant.svg', color: '#1E293B' },
  { id: 'stylish', name: 'Stylish', category: 'modern', description: BASE_DESC + 'Perfect for creating a one-page CV, highlighting your skills and projects. Great for software engineers and developers.', thumbnail: '/templates/modern.svg', color: '#3B82F6' },
  { id: 'double-column', name: 'Double Column', category: 'modern', description: BASE_DESC + 'A popular choice for many roles, including customer support, programming and marketing.', thumbnail: '/templates/modern.svg', color: '#14B8A6' },
  { id: 'modern', name: 'Modern', category: 'modern', description: BASE_DESC + 'The top template for positions such as upper management, project managers, and product owners in 2024.', thumbnail: '/templates/modern.svg', color: '#0EA5E9' },
  { id: 'creative', name: 'Creative', category: 'creative', description: BASE_DESC + 'A visually striking template that highlights your header and entices recruiters to continue reading. Suitable for any industry.', thumbnail: '/templates/creative.svg', color: '#8B5CF6' },
  { id: 'compact', name: 'Compact', category: 'traditional', description: BASE_DESC + 'A one-page CV template tailored for professionals with a lot of experience in upper-management roles.', thumbnail: '/templates/traditional.svg', color: '#374151' },
];

export const templateCategories = [
  { id: 'all', name: 'All Templates', icon: '📋' },
  { id: 'modern', name: 'Modern', icon: '✨' },
  { id: 'creative', name: 'Creative', icon: '🎨' },
  { id: 'traditional', name: 'Traditional', icon: '📄' },
  { id: 'simple', name: 'Simple', icon: '📝' },
];
