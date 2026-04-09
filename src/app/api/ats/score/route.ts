import { NextRequest, NextResponse } from 'next/server';
import { calculateATSScore } from '@/lib/ats-scorer';
import { adminDb } from '@/lib/firebase-admin';
import { getUserFromRequest } from '@/lib/auth';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req);
    const { resumeData, resumeText, jobDescription, resumeId } = await req.json();

    let textToScore = resumeText || '';
    if (!textToScore && resumeData) {
      textToScore = JSON.stringify(resumeData);
    }

    if (!textToScore) {
      return NextResponse.json({ error: 'Resume content required' }, { status: 400 });
    }

    const {
      overallScore,
      keywordScore,
      formatScore,
      sectionScore,
      experienceScore,
      suggestions,
      matchedKeywords,
      missingKeywords,
    } = calculateATSScore(
      resumeData || { personalInfo: {}, experience: [], education: [], skills: [] }, 
      textToScore, 
      jobDescription || ''
    );

    let aiSuggestions: string[] = [];
    if (process.env.GEMINI_API_KEY) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `You are an expert ATS recruiter. Briefly analyze this resume text and provide exactly 3 concise, highly actionable bullet points on how the candidate can explicitly improve this resume to get more interviews. Focus on content, tone, ATS optimization, and formatting suggestions. Only output the 3 bullet points, separated by newlines, with no intro or outro text.\n\nResume:\n${textToScore.substring(0, 3000)}`;
        
        const aiResponse = await model.generateContent(prompt);
        const aiText = aiResponse.response.text();
        
        if (aiText) {
          aiSuggestions = aiText.split('\n')
            .filter(line => line.trim().length > 0)
            .map(line => line.replace(/^[\-\*\•\d\.]+\s*/, '').trim());
          
          // Optionally, we can merge AI suggestions with the heuristic suggestions or keep them separate.
          suggestions.push(...aiSuggestions.map(s => `🤖 AI Suggestion: ${s}`));
        }
      } catch (aiError) {
        console.error('AI Suggestion generation failed:', aiError);
      }
    } else {
      suggestions.push('💡 Add a GEMINI_API_KEY to your .env to unlock personalized AI resume suggestions!');
    }

    const result = {
      overallScore,
      keywordScore,
      formatScore,
      sectionScore,
      experienceScore,
      suggestions,
      matchedKeywords,
      missingKeywords,
    };

    // Save score if user is logged in
    if (user && adminDb && resumeId) {
      const ts = new Date().toISOString();
      const scoreRef = adminDb.collection('atsScores').doc();
      await scoreRef.set({
        resumeId,
        jobDescription: jobDescription || null,
        overallScore,
        keywordScore: keywordScore,
        formatScore: formatScore,
        sectionScore: sectionScore,
        experienceScore: experienceScore,
        suggestions: JSON.stringify(suggestions),
        matchedKeywords: JSON.stringify(matchedKeywords),
        missingKeywords: JSON.stringify(missingKeywords),
        createdAt: ts
      });
    }

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error('ATS scoring error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
