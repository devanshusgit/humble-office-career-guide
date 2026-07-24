export interface CareerGuideFormData {
  // Step 1: Personal Details
  full_name: string;
  preferred_name?: string;
  age: string; // Stored as string in form, parsed later
  country: string;
  state?: string;
  city?: string;
  preferred_language: string;
  pronouns?: string;
  guardian_name?: string;
  guardian_email?: string;

  // Step 2: Education
  education_status: string;
  current_class_year?: string;
  institution_name?: string;
  board_university?: string;
  stream?: string;
  degree?: string;
  specialization?: string;
  graduation_year?: string;
  current_job_role?: string;
  work_experience_years?: string;
  academic_performance?: string;
  favourite_subjects?: string;
  difficult_subjects?: string;
  competitive_exams?: string;
  existing_certifications?: string;

  // Step 3: Interests & Strengths
  interests: string[];
  strengths: string[];
  flow_activities?: string;
  praised_for?: string;
  enjoyable_problems?: string;
  hobbies_achievements?: string;
  skills_to_improve?: string;

  // Step 4: Preferences
  work_environment?: string;
  work_styles?: string[];
  stability_vs_risk?: number; // 1 to 5
  relocation_willingness?: string;
  study_willingness?: string;
  business_interest?: string;
  sector_preference?: string;
  income_priority?: string;
  desired_lifestyle?: string;
  considered_careers?: string;
  rejected_careers?: string;
  family_expectations?: string;
  financial_constraints?: string;
  accessibility_requirements?: string;
  decision_timeline?: string;

  // Step 5: Goals & Confusion
  biggest_goal?: string;
  biggest_confusion?: string;
  current_decision?: string;
  five_year_vision?: string;
  stopping_factor?: string;
  previous_counselling?: string;
  utility_expectation?: string;

  // Step 6: Questions
  questions?: string;

  // Step 7: Contact & Consent
  email: string;
  confirm_email: string;
  phone?: string;
  photo?: File;
  consent_privacy: boolean;
  consent_ai_guidance: boolean;
  consent_marketing?: boolean;
}
