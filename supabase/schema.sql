-- Enable the pgcrypto extension for UUID generation if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create the career_guide_submissions table
CREATE TABLE IF NOT EXISTS public.career_guide_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    preferred_name TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    age INTEGER,
    country TEXT,
    state TEXT,
    city TEXT,
    preferred_language TEXT,
    education_status TEXT,
    form_data JSONB NOT NULL,
    photo_path TEXT,
    ai_result JSONB,
    submission_status TEXT NOT NULL DEFAULT 'pending',
    email_status TEXT NOT NULL DEFAULT 'pending',
    error_message TEXT,
    consent_privacy BOOLEAN NOT NULL,
    consent_ai_guidance BOOLEAN NOT NULL,
    consent_marketing BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_career_guide_email ON public.career_guide_submissions(email);
CREATE INDEX IF NOT EXISTS idx_career_guide_status ON public.career_guide_submissions(submission_status);
CREATE INDEX IF NOT EXISTS idx_career_guide_created_at ON public.career_guide_submissions(created_at);

-- Set up Row Level Security (RLS)
ALTER TABLE public.career_guide_submissions ENABLE ROW LEVEL SECURITY;

-- Allow insert from anon/authenticated or restrict entirely to service role.
-- Since the application backend uses the service role key to insert records, 
-- we can just allow read/write to the service role and deny public access.
CREATE POLICY "Allow service role full access" ON public.career_guide_submissions
    USING (auth.jwt() ->> 'role' = 'service_role')
    WITH CHECK (auth.jwt() ->> 'role' = 'service_role');
