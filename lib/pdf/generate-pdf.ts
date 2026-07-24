import React from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import { CareerGuidePDF } from './CareerGuidePDF';
import { CareerGuideResult } from '../gemini/schema';

export async function generatePDFBuffer(
  guide: CareerGuideResult,
  photoUrl: string | undefined,
  submissionId: string
): Promise<Buffer> {
  // We cannot use standard JSX directly because @react-pdf/renderer might have a mismatch with Node environments in Next.js edge runtime.
  // However, since we are in Node runtime for this route, renderToBuffer should work correctly.
  
  const element = React.createElement(CareerGuidePDF, {
    guide,
    photoUrl,
    submissionId,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return await renderToBuffer(element as any);
}
