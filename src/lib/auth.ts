import { NextRequest } from 'next/server';
import { adminAuth } from './firebase-admin';

export async function getUserFromRequest(req: NextRequest): Promise<{ userId: string; email: string; name?: string } | null> {
  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }
  
  const token = authHeader.split('Bearer ')[1];
  
  try {
    if (!adminAuth) return null;
    const decodedToken = await adminAuth.verifyIdToken(token);
    return {
      userId: decodedToken.uid,
      email: decodedToken.email || '',
      name: decodedToken.name || '',
    };
  } catch (error) {
    console.error('Error verifying Firebase token', error);
    return null;
  }
}
