import { z } from 'zod';

export const careerGuideFormSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  preferred_name: z.string().max(50).optional(),
  age: z.string().regex(/^\d+$/, 'Age must be a number'),
  country: z.string().min(2, 'Country is required'),
  state: z.string().optional(),
  city: z.string().optional(),
  preferred_language: z.string().min(2, 'Preferred language is required'),
  pronouns: z.string().optional(),
  guardian_name: z.string().optional(),
  guardian_email: z.string().email('Invalid email').optional().or(z.literal('')),

  education_status: z.string().min(2, 'Education status is required'),
  current_class_year: z.string().optional(),
  institution_name: z.string().optional(),
  board_university: z.string().optional(),
  stream: z.string().optional(),
  degree: z.string().optional(),
  specialization: z.string().optional(),
  graduation_year: z.string().optional(),
  current_job_role: z.string().optional(),
  work_experience_years: z.string().optional(),
  academic_performance: z.string().optional(),
  favourite_subjects: z.string().optional(),
  difficult_subjects: z.string().optional(),
  competitive_exams: z.string().optional(),
  existing_certifications: z.string().optional(),

  interests: z.array(z.string()).min(3, 'Select at least 3 interests'),
  strengths: z.array(z.string()).min(3, 'Select at least 3 strengths'),
  flow_activities: z.string().optional(),
  praised_for: z.string().optional(),
  enjoyable_problems: z.string().optional(),
  hobbies_achievements: z.string().optional(),
  skills_to_improve: z.string().optional(),

  work_environment: z.string().optional(),
  work_styles: z.array(z.string()).optional(),
  stability_vs_risk: z.number().min(1).max(5).default(3),
  relocation_willingness: z.string().optional(),
  study_willingness: z.string().optional(),
  business_interest: z.string().optional(),
  sector_preference: z.string().optional(),
  income_priority: z.string().optional(),
  desired_lifestyle: z.string().optional(),
  considered_careers: z.string().optional(),
  rejected_careers: z.string().optional(),
  family_expectations: z.string().optional(),
  financial_constraints: z.string().optional(),
  accessibility_requirements: z.string().optional(),
  decision_timeline: z.string().optional(),

  biggest_goal: z.string().optional(),
  biggest_confusion: z.string().optional(),
  current_decision: z.string().optional(),
  five_year_vision: z.string().optional(),
  stopping_factor: z.string().optional(),
  previous_counselling: z.string().optional(),
  utility_expectation: z.string().optional(),

  questions: z.string().max(2000).optional(),

  email: z.string().email('Invalid email address'),
  confirm_email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  photo: z.any().optional(), // File validated separately or via custom refine

  consent_privacy: z.boolean().refine(val => val === true, {
    message: 'You must accept the privacy policy',
  }),
  consent_ai_guidance: z.boolean().refine(val => val === true, {
    message: 'You must acknowledge AI-generated guidance',
  }),
  consent_marketing: z.boolean().optional(),
}).refine((data) => data.email === data.confirm_email, {
  message: "Emails don't match",
  path: ['confirm_email'], // path of error
}).refine((data) => {
  return data.questions || data.biggest_goal || data.biggest_confusion;
}, {
  message: 'Please provide at least one goal, confusion, or specific question.',
  path: ['questions'],
});
