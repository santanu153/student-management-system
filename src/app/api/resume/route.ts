import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req);
    if (!user || !adminDb) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resumesSnapshot = await adminDb
      .collection('resumes')
      .where('userId', '==', user.userId)
      .orderBy('updatedAt', 'desc')
      .get();

    const resumesList: any[] = resumesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Attach highest recent ATS scores sequentially or adapt UI to lazy-fetch
    for (let i = 0; i < resumesList.length; i++) {
      const scoreSnap = await adminDb
        .collection('atsScores')
        .where('resumeId', '==', resumesList[i].id)
        .orderBy('createdAt', 'desc')
        .limit(1)
        .get();
        
      resumesList[i].atsScores = scoreSnap.empty ? [] : scoreSnap.docs.map(s => ({
        id: s.id,
        ...s.data()
      }));
    }

    return NextResponse.json({ resumes: resumesList });
  } catch (error) {
    console.error('Get resumes error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req);
    if (!user || !adminDb) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, content, templateId, rawText } = await req.json();

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const resumeRef = adminDb.collection('resumes').doc();
    const resumeData = {
      userId: user.userId,
      title,
      content: JSON.stringify(content || {}),
      templateId: templateId || null,
      rawText: rawText || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await resumeRef.set(resumeData);

    return NextResponse.json({ resume: { id: resumeRef.id, ...resumeData } }, { status: 201 });
  } catch (error) {
    console.error('Create resume error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
