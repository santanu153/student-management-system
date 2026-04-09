import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getUserFromRequest(req);
    if (!user || !adminDb) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const docRef = adminDb.collection('resumes').doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    const data = docSnap.data();
    if (data?.userId !== user.userId) {
      return NextResponse.json({ error: 'Unauthorized route access' }, { status: 403 });
    }

    return NextResponse.json({ resume: { id: docSnap.id, ...data } });
  } catch (error) {
    console.error('Get single resume error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getUserFromRequest(req);
    if (!user || !adminDb) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const body = await req.json();

    const docRef = adminDb.collection('resumes').doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }
    
    if (docSnap.data()?.userId !== user.userId) {
      return NextResponse.json({ error: 'Unauthorized record manipulation' }, { status: 403 });
    }

    const updateData: any = { updatedAt: new Date().toISOString() };
    if (body.title) updateData.title = body.title;
    if (body.content) updateData.content = typeof body.content === 'string' ? body.content : JSON.stringify(body.content);
    if (body.templateId) updateData.templateId = body.templateId;
    if (body.rawText !== undefined) updateData.rawText = body.rawText;

    await docRef.update(updateData);
    
    return NextResponse.json({ resume: { id, ...docSnap.data(), ...updateData } });
  } catch (error) {
    console.error('Update resume error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getUserFromRequest(req);
    if (!user || !adminDb) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const docRef = adminDb.collection('resumes').doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    
    if (docSnap.data()?.userId !== user.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await docRef.delete();

    // Cleanup associated scores (cascade delete)
    const scores = await adminDb.collection('atsScores').where('resumeId', '==', id).get();
    const batch = adminDb.batch();
    scores.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();

    return NextResponse.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Delete resume error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
