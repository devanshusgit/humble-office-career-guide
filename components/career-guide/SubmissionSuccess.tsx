import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

export const SubmissionSuccess = ({ email, submissionId }: { email: string, submissionId: string }) => {
  return (
    <div className="max-w-md mx-auto text-center py-20 space-y-6 bg-white rounded-xl shadow-sm border border-slate-100 p-8">
      <div className="flex justify-center text-green-500 mb-4">
        <CheckCircle2 size={64} />
      </div>
      <h3 className="text-2xl font-bold text-slate-900">Your Career Guide Is On Its Way</h3>
      <p className="text-slate-600">
        We&apos;ve successfully generated your personalized guide and sent it to:
      </p>
      <p className="font-semibold text-lg">{email}</p>
      
      <div className="bg-slate-50 p-4 rounded-md text-sm text-slate-500">
        <p>Reference: {submissionId}</p>
      </div>

      <p className="text-sm text-slate-500">
        Please check your inbox (and spam/promotions folders) within the next few minutes.
      </p>

      <div className="pt-6 space-y-3">
        <Button className="w-full bg-indigo-600 hover:bg-indigo-700" onClick={() => window.location.reload()}>
          Create Another Guide
        </Button>
        <Button variant="outline" className="w-full" onClick={() => window.location.href = '/'}>
          Return to Humble Office
        </Button>
      </div>
      
      <p className="text-xs text-slate-400 mt-4">
        Your information was processed securely in accordance with our privacy policy.
      </p>
    </div>
  );
};
