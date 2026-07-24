import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { CareerGuideFormData } from '@/types/career-guide';

const ErrorMsg = ({ name }: { name: string }) => {
  const { formState: { errors } } = useFormContext();
  const error = errors[name]?.message;
  if (!error) return null;
  return <p className="text-red-500 text-xs mt-1">{String(error)}</p>;
};

export const PersonalDetailsStep = () => {
  const { register } = useFormContext<CareerGuideFormData>();
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Full Name *</Label>
          <Input {...register('full_name')} placeholder="Your legal name" />
          <ErrorMsg name="full_name" />
        </div>
        <div>
          <Label>Preferred Name</Label>
          <Input {...register('preferred_name')} placeholder="What should we call you?" />
        </div>
        <div>
          <Label>Age *</Label>
          <Input type="number" {...register('age')} placeholder="e.g. 17" />
          <ErrorMsg name="age" />
        </div>
        <div>
          <Label>Pronouns</Label>
          <Input {...register('pronouns')} placeholder="e.g. they/them" />
        </div>
        <div>
          <Label>Country *</Label>
          <Input {...register('country')} />
          <ErrorMsg name="country" />
        </div>
        <div>
          <Label>State/Province</Label>
          <Input {...register('state')} />
        </div>
        <div>
          <Label>City</Label>
          <Input {...register('city')} />
        </div>
        <div>
          <Label>Preferred Guide Language *</Label>
          <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" {...register('preferred_language')}>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Hinglish">Hinglish</option>
          </select>
          <ErrorMsg name="preferred_language" />
        </div>
        <div>
          <Label>Parent/Guardian Name</Label>
          <Input {...register('guardian_name')} />
        </div>
        <div>
          <Label>Parent/Guardian Email</Label>
          <Input type="email" {...register('guardian_email')} />
          <ErrorMsg name="guardian_email" />
        </div>
      </div>
    </div>
  );
};

export const EducationStep = () => {
  const { register, watch } = useFormContext<CareerGuideFormData>();
  const status = watch('education_status');

  return (
    <div className="space-y-4">
      <div>
        <Label>Current Education Status *</Label>
        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" {...register('education_status')}>
          <option value="">Select status...</option>
          <option value="School student">School student</option>
          <option value="Class 10 completed">Class 10 completed</option>
          <option value="Class 12 student">Class 12 student</option>
          <option value="Class 12 completed">Class 12 completed</option>
          <option value="Diploma student">Diploma student</option>
          <option value="Undergraduate student">Undergraduate student</option>
          <option value="Graduate">Graduate</option>
          <option value="Postgraduate student">Postgraduate student</option>
          <option value="Working professional">Working professional</option>
          <option value="Taking a gap year">Taking a gap year</option>
          <option value="Other">Other</option>
        </select>
        <ErrorMsg name="education_status" />
      </div>

      {(status?.includes('Class 12') || status?.includes('student') || status === 'Taking a gap year') && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Stream</Label><Input {...register('stream')} placeholder="Science, Commerce, Arts..." /></div>
          <div><Label>Favourite Subjects</Label><Input {...register('favourite_subjects')} /></div>
          <div><Label>Subjects you find difficult</Label><Input {...register('difficult_subjects')} /></div>
          <div><Label>Competitive exams considered</Label><Input {...register('competitive_exams')} /></div>
        </div>
      )}

      {(status?.includes('Graduate') || status === 'Working professional') && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Degree</Label><Input {...register('degree')} /></div>
          <div><Label>Specialization</Label><Input {...register('specialization')} /></div>
          <div><Label>Graduation Year</Label><Input {...register('graduation_year')} /></div>
          <div><Label>Current Job Role</Label><Input {...register('current_job_role')} /></div>
          <div><Label>Years of Experience</Label><Input type="number" {...register('work_experience_years')} /></div>
        </div>
      )}
    </div>
  );
};

export const InterestsStep = () => {
  const { register, watch, setValue } = useFormContext<CareerGuideFormData>();
  const interests = watch('interests') || [];
  const strengths = watch('strengths') || [];

  const interestOptions = ['Technology', 'Artificial intelligence', 'Engineering', 'Medicine and healthcare', 'Business', 'Entrepreneurship', 'Finance', 'Design', 'Art', 'Writing', 'Law'];
  const strengthOptions = ['Communication', 'Creativity', 'Logical reasoning', 'Mathematics', 'Leadership', 'Teamwork', 'Problem solving', 'Attention to detail', 'Technical skills'];

  const toggleInterest = (val: string) => {
    if (interests.includes(val)) setValue('interests', interests.filter(i => i !== val), { shouldValidate: true });
    else setValue('interests', [...interests, val], { shouldValidate: true });
  };

  const toggleStrength = (val: string) => {
    if (strengths.includes(val)) setValue('strengths', strengths.filter(i => i !== val), { shouldValidate: true });
    else setValue('strengths', [...strengths, val], { shouldValidate: true });
  };

  return (
    <div className="space-y-8">
      <div>
        <Label>Select Interests (min 3) *</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
          {interestOptions.map(opt => (
            <div key={opt} className={`p-2 border rounded-md cursor-pointer text-sm ${interests.includes(opt) ? 'bg-indigo-100 border-indigo-400' : 'bg-white'}`} onClick={() => toggleInterest(opt)}>
              {opt}
            </div>
          ))}
        </div>
        <ErrorMsg name="interests" />
      </div>

      <div>
        <Label>Select Strengths (min 3) *</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
          {strengthOptions.map(opt => (
            <div key={opt} className={`p-2 border rounded-md cursor-pointer text-sm ${strengths.includes(opt) ? 'bg-indigo-100 border-indigo-400' : 'bg-white'}`} onClick={() => toggleStrength(opt)}>
              {opt}
            </div>
          ))}
        </div>
        <ErrorMsg name="strengths" />
      </div>

      <div>
        <Label>What activities make you lose track of time?</Label>
        <Textarea {...register('flow_activities')} />
      </div>
      <div>
        <Label>What do friends/teachers praise you for?</Label>
        <Textarea {...register('praised_for')} />
      </div>
    </div>
  );
};

export const CareerPreferencesStep = () => {
  const { register, control } = useFormContext<CareerGuideFormData>();
  return (
    <div className="space-y-4">
      <div>
        <Label>Preferred Work Environment</Label>
        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" {...register('work_environment')}>
          <option value="">No preference</option>
          <option value="Office">Office</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Outdoors">Outdoors</option>
        </select>
      </div>
      
      <div>
        <Label>Stability vs Risk</Label>
        <p className="text-xs text-slate-500 mb-2">1 = High Stability, 5 = High Risk/Reward</p>
        <Controller
          name="stability_vs_risk"
          control={control}
          render={({ field }) => (
            <Slider min={1} max={5} step={1} value={[field.value || 3]} onValueChange={(val: number | readonly number[]) => field.onChange(Array.isArray(val) ? val[0] : val)} />
          )}
        />
      </div>

      <div><Label>Careers you are considering</Label><Textarea {...register('considered_careers')} /></div>
      <div><Label>Careers you definitely DO NOT want</Label><Textarea {...register('rejected_careers')} /></div>
      <div><Label>Any constraints (Financial, Educational, etc.)</Label><Textarea {...register('financial_constraints')} /></div>
    </div>
  );
};

export const GoalsStep = () => {
  const { register } = useFormContext<CareerGuideFormData>();
  return (
    <div className="space-y-4">
      <div><Label>What is your biggest career goal?</Label><Textarea {...register('biggest_goal')} /></div>
      <div><Label>What is your biggest career confusion?</Label><Textarea {...register('biggest_confusion')} /></div>
      <div><Label>Where would you like to be in 3-5 years?</Label><Textarea {...register('five_year_vision')} /></div>
    </div>
  );
};

export const QuestionsStep = () => {
  const { register } = useFormContext<CareerGuideFormData>();
  return (
    <div className="space-y-4">
      <div>
        <Label>Write any specific career questions you want answered in your guide.</Label>
        <p className="text-xs text-slate-500 mb-2">e.g. Which stream should I choose? How can I move into tech?</p>
        <Textarea {...register('questions')} className="h-32" />
        <ErrorMsg name="questions" />
      </div>
    </div>
  );
};

export const ContactAndPhotoStep = () => {
  const { register, setValue, watch } = useFormContext<CareerGuideFormData>();
  const photo = watch('photo');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setValue('photo', e.target.files[0], { shouldValidate: true });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Email Address *</Label>
          <Input type="email" {...register('email')} />
          <ErrorMsg name="email" />
        </div>
        <div>
          <Label>Confirm Email Address *</Label>
          <Input type="email" {...register('confirm_email')} />
          <ErrorMsg name="confirm_email" />
        </div>
      </div>
      
      <div>
        <Label>Profile Photograph (Optional)</Label>
        <p className="text-xs text-slate-500 mb-2">Used for your guide&apos;s cover page. Max 5MB (JPEG/PNG/WebP).</p>
        <Input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} />
        {photo && <p className="text-sm mt-1 text-green-600">Selected: {photo.name}</p>}
      </div>

      <div className="space-y-2 mt-4">
        <div className="flex items-start space-x-2">
          <Checkbox id="privacy" {...register('consent_privacy')} onCheckedChange={(val) => setValue('consent_privacy', val as boolean, {shouldValidate: true})} />
          <Label htmlFor="privacy" className="text-sm leading-none">I accept the privacy policy and consent to my data being processed to generate this guide. *</Label>
        </div>
        <ErrorMsg name="consent_privacy" />

        <div className="flex items-start space-x-2">
          <Checkbox id="ai" {...register('consent_ai_guidance')} onCheckedChange={(val) => setValue('consent_ai_guidance', val as boolean, {shouldValidate: true})} />
          <Label htmlFor="ai" className="text-sm leading-none">I acknowledge this is AI-generated guidance, not a guarantee. *</Label>
        </div>
        <ErrorMsg name="consent_ai_guidance" />
      </div>
    </div>
  );
};

export const ReviewStep = () => {
  const { watch } = useFormContext<CareerGuideFormData>();
  const data = watch();
  
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg text-indigo-900">Review Your Details</h3>
      <div className="bg-slate-50 p-4 rounded-md space-y-2 text-sm">
        <p><strong>Name:</strong> {data.full_name}</p>
        <p><strong>Email:</strong> {data.email}</p>
        <p><strong>Education:</strong> {data.education_status}</p>
        <p><strong>Interests:</strong> {data.interests?.join(', ')}</p>
        <p><strong>Strengths:</strong> {data.strengths?.join(', ')}</p>
        <p className="text-xs text-slate-500 mt-4">* Please ensure your email is correct as the guide will be sent there.</p>
      </div>
    </div>
  );
};
