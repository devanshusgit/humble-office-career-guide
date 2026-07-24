import { supabaseAdmin } from './admin';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createSubmission(data: any) {
  const { data: submission, error } = await supabaseAdmin
    .from('career_guide_submissions')
    .insert([
      {
        full_name: data.full_name,
        preferred_name: data.preferred_name,
        email: data.email,
        phone: data.phone,
        age: data.age,
        country: data.country,
        state: data.state,
        city: data.city,
        preferred_language: data.preferred_language,
        education_status: data.education_status,
        form_data: data,
        consent_privacy: data.consent_privacy,
        consent_ai_guidance: data.consent_ai_guidance,
        consent_marketing: data.consent_marketing || false,
      },
    ])
    .select('id')
    .single();

  if (error) {
    console.error('Error creating submission:', error);
    throw new Error('Failed to create submission');
  }

  return submission.id;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateSubmissionStatus(id: string, updates: any) {
  const { error } = await supabaseAdmin
    .from('career_guide_submissions')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    console.error('Error updating submission:', error);
    throw new Error('Failed to update submission status');
  }
}
