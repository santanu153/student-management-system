import { NextRequest, NextResponse } from 'next/server';
import pdfParse from 'pdf-parse';
import * as mammoth from 'mammoth';
import { isLikelyResume } from '@/lib/ats-scorer';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let extractedText = '';

    // Handle PDF Extraction
    if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      const pdfData = await pdfParse(buffer);
      extractedText = pdfData.text;
    } 
    // Handle DOCX Extraction
    else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.name.endsWith('.docx')) {
      const result = await mammoth.extractRawText({ buffer });
      extractedText = result.value;
    } 
    // Handle Plain Text Files
    else if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
      extractedText = buffer.toString('utf-8');
    } 
    // Reject unsupported
    else {
      return NextResponse.json({ error: 'Unsupported file format' }, { status: 400 });
    }

    if (!extractedText || extractedText.trim() === '') {
      return NextResponse.json({ error: 'Could not extract any readable text from this file' }, { status: 400 });
    }

    // AI Heuristic Validator: Is this actually a resume?
    if (!isLikelyResume(extractedText)) {
      return NextResponse.json({ 
        error: 'INVALID_DOCUMENT',
        message: 'The uploaded file does not appear to be a resume. Please upload a valid resume document.' 
      }, { status: 400 });
    }

    return NextResponse.json({ text: extractedText }, { status: 200 });

  } catch (error: any) {
    console.error('File parsing error:', error);
    return NextResponse.json({ 
      error: 'Failed to process document. The file may be corrupted or protected.',
      message: `Developer Error Detail: ${error?.message || String(error)}` 
    }, { status: 500 });
  }
}
