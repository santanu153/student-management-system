import { NextRequest, NextResponse } from 'next/server';
import { ROLE_PROMPTS } from '@/lib/ai-prompts';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const { role } = await req.json();

    if (!role) {
      return NextResponse.json({ error: 'Role is required' }, { status: 400 });
    }

    if (process.env.GEMINI_API_KEY) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `You are an expert recruiter for the "${role}" role. Provide exactly 12 highly relevant, specific hard skills or tools that a strong candidate would have in this position. Return ONLY a comma-separated list. No introduction, no formatting, no extra text.`;
        
        const aiResponse = await model.generateContent(prompt);
        const aiText = aiResponse.response.text();
        
        if (aiText) {
          const skills = aiText.split(',')
            .map(s => s.trim().replace(/^[\-\*\•\d\.]+\s*/, ''))
            .filter(s => s.length > 0);
          
          return NextResponse.json({ skills, source: 'ai' });
        }
      } catch (e) {
        console.error('AI Skill Generation failed:', e);
      }
    }

    const roleData = ROLE_PROMPTS[role];
    if (roleData) {
      return NextResponse.json({ skills: roleData.skills, source: 'template' });
    }

    // Generate generic skills for unknown roles
    const genericSkills = [
      'Communication', 'Problem Solving', 'Team Leadership', 'Project Management',
      'Data Analysis', 'Strategic Planning', 'Agile Methodologies', 'Stakeholder Management',
      'Process Improvement', 'Technical Writing', 'Critical Thinking', 'Time Management'
    ];

    return NextResponse.json({ skills: genericSkills, source: 'generic' });
  } catch (error) {
    console.error('Skills generator error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
