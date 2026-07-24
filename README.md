# Humble Office - Personalized AI Career Guide

A production-ready web application that provides AI-assisted, personalized career guidance via a multi-step form, generating a professional PDF report sent straight to the user's email.

## Features
- Multi-step React form with `localStorage` persistence.
- Zod & React Hook Form validation.
- Supabase integration for submissions & photo storage.
- Google Gemini AI for structured career recommendations.
- `@react-pdf/renderer` for server-side PDF generation.
- Nodemailer for SMTP email delivery.

## Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS & shadcn/ui
- Supabase (PostgreSQL & Storage)
- Gemini API
- Nodemailer

## Local Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env.local` and fill in the required keys.
```bash
cp .env.example .env.local
```

### 3. Supabase Setup
1. Create a new Supabase project.
2. Run the SQL provided in `supabase/schema.sql` in the SQL Editor.
3. Create a private Storage bucket named `career-guide-photos` (or match your `SUPABASE_STORAGE_BUCKET` env variable).
4. Get your `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` from the project settings.

### 4. Gemini API Key
Obtain an API key from Google AI Studio and set it as `GEMINI_API_KEY`.

### 5. SMTP Setup
Use a service like SendGrid, Amazon SES, or Gmail App Passwords to fill out the `SMTP_*` variables in `.env.local`.

### 6. Run the App
```bash
npm run dev
```

## Deployment
This app can be deployed on Vercel, Netlify, or any Node.js hosting platform. Ensure all environment variables are added to the hosting provider's settings.

## Integration Note
The core logic is modularly contained in the `components/career-guide` directory. To integrate this into an existing Next.js app, copy the `components/career-guide`, `app/api/career-guide`, and `lib` utilities.
