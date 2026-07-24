import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/security/rate-limit';
import { validateFile } from '@/lib/security/sanitize';
import { createSubmission, updateSubmissionStatus } from '@/lib/supabase/submissions';
import { uploadPhoto } from '@/lib/supabase/storage';
import { generateCareerGuide } from '@/lib/gemini/client';
import { generatePDFBuffer } from '@/lib/pdf/generate-pdf';
import { sendCareerGuideEmail, sendAdminNotification } from '@/lib/email/send-career-guide';
import { env } from '@/lib/env';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many attempts. Please try again later.' },
        { status: 429 }
      );
    }

    // 2. Validate Request Content Type
    if (!req.headers.get('content-type')?.includes('multipart/form-data')) {
      return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
    }

    const formData = await req.formData();
    const photoFile = formData.get('photo') as File | null;
    const rawData = formData.get('data') as string | null;

    if (!photoFile || !rawData) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 3. Validate Photo
    if (!validateFile(photoFile, env.PHOTO_MAX_SIZE_MB)) {
      return NextResponse.json(
        { error: 'Invalid photograph. Please upload a JPEG, PNG or WebP under the size limit.' },
        { status: 400 }
      );
    }

    // 4. Parse Form Data (Frontend sends stringified JSON)
    let parsedData: Record<string, unknown>;
    try {
      parsedData = JSON.parse(rawData);
    } catch {
      return NextResponse.json({ error: 'Malformed JSON data' }, { status: 400 });
    }

    // 5. Upload Photo
    const fileExt = photoFile.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const arrayBuffer = await photoFile.arrayBuffer();
    const photoPath = await uploadPhoto(Buffer.from(arrayBuffer), fileName, photoFile.type);
    parsedData.photo_path = photoPath;

    // 6. Create Pending Submission in Supabase
    let submissionId: string;
    try {
      submissionId = await createSubmission(parsedData);
      await updateSubmissionStatus(submissionId, { submission_status: 'processing' });
    } catch (dbError) { 
      console.error('Database error:', dbError);
      return NextResponse.json({ error: 'Failed to create submission' }, { status: 500 });
    }

    // 7. Call Gemini
    let aiResult;
    try {
      aiResult = await generateCareerGuide(parsedData);
      await updateSubmissionStatus(submissionId, { 
        submission_status: 'generated',
        ai_result: aiResult
      });
    } catch (aiError) {
      console.error('Gemini error:', aiError);
      await updateSubmissionStatus(submissionId, { 
        submission_status: 'failed',
        error_message: 'Failed to generate guide with AI'
      });
      return NextResponse.json({ error: 'Failed to generate guide' }, { status: 500 });
    }

    // 8. Generate PDF
    let pdfBuffer;
    try {
      const base64 = Buffer.from(arrayBuffer).toString('base64');
      const dataUri = `data:${photoFile.type};base64,${base64}`;
      pdfBuffer = await generatePDFBuffer(aiResult, dataUri, submissionId);
    } catch (pdfError) {
      console.error('PDF generation error:', pdfError);
      await updateSubmissionStatus(submissionId, { 
        submission_status: 'failed',
        error_message: 'Failed to generate PDF'
      });
      return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
    }

    // 9. Send Email
    try {
      await sendCareerGuideEmail(
        parsedData.email as string,
        parsedData.full_name as string,
        (parsedData.preferred_name as string) || '',
        pdfBuffer,
        submissionId
      );
      await updateSubmissionStatus(submissionId, { 
        submission_status: 'emailed',
        email_status: 'delivered'
      });

      // Optional: Admin notification
      await sendAdminNotification(parsedData.full_name as string, submissionId).catch(console.error);

    } catch (emailError) {
      console.error('Email error:', emailError);
      await updateSubmissionStatus(submissionId, { 
        submission_status: 'failed',
        error_message: 'Failed to send email'
      });
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    // 10. Success Response
    return NextResponse.json({
      success: true,
      submissionId,
      email: (parsedData.email as string).replace(/(.{2})(.*)(?=@)/, (gp1: string, gp2: string, gp3: string) => { 
        return gp2 + '*'.repeat(gp3.length);
      }), // Mask email
    });

  } catch (err) {
    console.error('Unhandled server error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
