import React, { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';

const stages = [
  'Securing your information...',
  'Analysing your responses...',
  'Creating career recommendations...',
  'Building your PDF guide...',
  'Sending the guide to your email...'
];

export const SubmissionLoader = () => {
  const [progress, setProgress] = useState(0);
  const [stageIdx, setStageIdx] = useState(0);

  useEffect(() => {
    // Fake progress animation since backend processing is synchronous blocking for this endpoint
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 95) return p;
        return p + 2;
      });
    }, 500);

    const stageInterval = setInterval(() => {
      setStageIdx(s => Math.min(s + 1, stages.length - 1));
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(stageInterval);
    };
  }, []);

  return (
    <div className="max-w-md mx-auto text-center py-20 space-y-6">
      <div className="animate-pulse space-y-4">
        <h3 className="text-xl font-semibold text-indigo-900">Preparing Your Career Guide</h3>
        <p className="text-slate-500 text-sm">{stages[stageIdx]}</p>
        <Progress value={progress} className="h-2 w-full bg-indigo-100" />
      </div>
      <p className="text-xs text-slate-400 mt-8">Please keep this page open while your personalized guide is being prepared.</p>
    </div>
  );
};
