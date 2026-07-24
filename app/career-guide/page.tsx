import React from 'react';
import { CareerGuideExperience } from '@/components/career-guide/CareerGuideExperience';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personalized Career Guide | Humble Office',
  description: 'Discover the career path that fits you with AI-assisted guidance.',
};

export default function CareerGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl mb-4">
          Discover the Career Path That Fits You
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
          Tell us about yourself, receive AI-assisted career analysis, and get your personalized PDF guide delivered straight to your email.
        </p>
        <div className="flex justify-center gap-8 text-sm text-slate-500">
          <div className="flex items-center"><span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 font-bold mr-2">1</span> Tell us about yourself</div>
          <div className="flex items-center"><span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 font-bold mr-2">2</span> Receive AI analysis</div>
          <div className="flex items-center"><span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 font-bold mr-2">3</span> Get PDF by email</div>
        </div>
        <p className="mt-8 text-xs text-slate-400">Takes approximately 5–8 minutes. Your privacy is respected.</p>
      </div>

      <CareerGuideExperience />
    </main>
  );
}
