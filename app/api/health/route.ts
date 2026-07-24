import { NextResponse } from 'next/server';

export async function GET() {
  const envStatus = {
    geminiConfigured: !!process.env.GEMINI_API_KEY,
    databaseConfigured: !!process.env.SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    emailConfigured: !!process.env.SMTP_HOST && !!process.env.SMTP_USER,
  };

  return NextResponse.json({
    status: 'ok',
    services: envStatus,
  }, {
    headers: {
      'Cache-Control': 'no-store',
    }
  });
}
