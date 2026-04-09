import { NextRequest, NextResponse } from 'next/server';
import { getMockResponse, ROLE_PROMPTS } from '@/lib/ai-prompts';

export async function POST(req: NextRequest) {
  try {
    const { type, role, text, jobTitle, currentSkills, company, description, jobDescription } = await req.json();

    // Use mock responses (real OpenAI integration can be added later)
    let result = '';
    switch (type) {
      case 'rewrite':
        result = getMockResponse('rewrite', { role: role || jobTitle || 'professional' });
        break;
      case 'bullets':
        result = getMockResponse('bullets', { role: role || jobTitle || '' });
        break;
      case 'skills':
        result = getMockResponse('skills', { role: role || jobTitle || 'Software Engineer' });
        break;
      case 'improve':
        result = getMockResponse('improve', { text: text || '', jobDescription: jobDescription || '' });
        break;
      case 'grammar':
        result = getMockResponse('grammar', { text: text || '' });
        break;
      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    return NextResponse.json({ result, source: 'mock' });
  } catch (error) {
    console.error('AI error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
