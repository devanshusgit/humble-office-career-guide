'use client';

import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { careerGuideFormSchema } from '@/lib/validation/career-guide-form';
import { CareerGuideFormData } from '@/types/career-guide';

import { PersonalDetailsStep, EducationStep, InterestsStep, CareerPreferencesStep, GoalsStep, QuestionsStep, ContactAndPhotoStep, ReviewStep } from './steps/FormSteps';
import { SubmissionLoader } from './SubmissionLoader';
import { SubmissionSuccess } from './SubmissionSuccess';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const STEPS = [
  'Personal Details',
  'Education',
  'Interests & Strengths',
  'Preferences',
  'Goals & Confusion',
  'Questions',
  'Contact & Consent',
  'Review',
];

export function CareerGuideExperience() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{ email: string; submissionId: string } | null>(null);

  const methods = useForm<CareerGuideFormData>({
    resolver: zodResolver(careerGuideFormSchema),
    defaultValues: {
      country: 'India',
      preferred_language: 'English',
      interests: [],
      strengths: [],
      work_styles: [],
      stability_vs_risk: 3,
      consent_marketing: false,
    },
    mode: 'onTouched',
  });

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('careerGuideDraft');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Exclude file object as it can't be stringified properly
        if (parsed.photo) delete parsed.photo;
        methods.reset(parsed);
      } catch (e) {
        console.error('Failed to parse draft', e);
      }
    }
  }, [methods]);

  // Save to local storage on change
  const currentValues = methods.watch();
  useEffect(() => {
    const copy = { ...currentValues };
    delete (copy as Record<string, unknown>).photo; // Don't save photo to localstorage
    localStorage.setItem('careerGuideDraft', JSON.stringify(copy));
  }, [currentValues]);

  const validateStep = async () => {
    // This is a simplified validation per step.
    // For a real app, you'd trigger validation for specific fields mapped to the step.
    // Here we'll just trigger full validation on the last step, or partial trigger.
    let fieldsToValidate: (keyof CareerGuideFormData)[] = [];
    switch(currentStep) {
      case 0: fieldsToValidate = ['full_name', 'age', 'country', 'preferred_language']; break;
      case 1: fieldsToValidate = ['education_status']; break;
      case 2: fieldsToValidate = ['interests', 'strengths']; break;
      case 3: fieldsToValidate = []; break;
      case 4: fieldsToValidate = []; break;
      case 5: fieldsToValidate = []; break;
      case 6: fieldsToValidate = ['email', 'confirm_email', 'consent_privacy', 'consent_ai_guidance']; break;
    }

    if (fieldsToValidate.length > 0) {
      const isValid = await methods.trigger(fieldsToValidate);
      return isValid;
    }
    return true;
  };

  const handleNext = async () => {
    if (isSubmitting) return;

    const isValid = await validateStep();
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo(0, 0);
  };

  const onSubmit = async (data: CareerGuideFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const formData = new FormData();
      
      const photo = data.photo as File;
      if (photo) {
        formData.append('photo', photo);
      }
      
      const payload = { ...data };
      delete payload.photo;
      formData.append('data', JSON.stringify(payload));

      const res = await fetch('/api/career-guide', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to generate guide');
      }

      setSuccessData({ email: result.email, submissionId: result.submissionId });
      localStorage.removeItem('careerGuideDraft');
      
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successData) {
    return <SubmissionSuccess email={successData.email} submissionId={successData.submissionId} />;
  }

  if (isSubmitting) {
    return <SubmissionLoader />;
  }

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-slate-100">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-indigo-900 mb-2">Humble Office Career Guide</h2>
        <div className="flex justify-between text-sm text-slate-500 mb-2">
          <span>Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep]}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {submitError && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{submitError}</AlertDescription>
        </Alert>
      )}

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
          
          {currentStep === 0 && <PersonalDetailsStep />}
          {currentStep === 1 && <EducationStep />}
          {currentStep === 2 && <InterestsStep />}
          {currentStep === 3 && <CareerPreferencesStep />}
          {currentStep === 4 && <GoalsStep />}
          {currentStep === 5 && <QuestionsStep />}
          {currentStep === 6 && <ContactAndPhotoStep />}
          {currentStep === 7 && <ReviewStep />}

          <div className="flex justify-between pt-6 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              Back
            </Button>

            {currentStep < STEPS.length - 1 ? (
              <Button type="button" onClick={handleNext} className="bg-indigo-600 hover:bg-indigo-700">
                Continue
              </Button>
            ) : (
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                Generate and Email My Career Guide
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
