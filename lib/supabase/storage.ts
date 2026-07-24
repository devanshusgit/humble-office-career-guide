import { supabaseAdmin } from './admin';
import { env } from '@/lib/env';

export async function uploadPhoto(
  fileBuffer: Buffer,
  fileName: string,
  contentType: string
): Promise<string> {
  const { data, error } = await supabaseAdmin.storage
    .from(env.SUPABASE_STORAGE_BUCKET)
    .upload(fileName, fileBuffer, {
      contentType,
      upsert: false,
    });

  if (error) {
    console.error('Error uploading photo:', error);
    throw new Error('Failed to upload photo');
  }

  return data.path;
}

export async function getPhotoUrl(path: string): Promise<string> {
  const { data } = await supabaseAdmin.storage
    .from(env.SUPABASE_STORAGE_BUCKET)
    .createSignedUrl(path, 60 * 60); // 1 hour expiry

  if (!data?.signedUrl) {
    throw new Error('Failed to create signed URL');
  }

  return data.signedUrl;
}
