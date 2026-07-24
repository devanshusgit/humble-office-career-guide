export function sanitizeString(input: string | null | undefined): string {
  if (!input) return '';
  return input.trim().replace(/<[^>]*>?/gm, ''); // Remove simple HTML tags
}

export function validateFile(file: File, maxSizeMB: number): boolean {
  if (!file) return false;
  
  // Size validation
  if (file.size > maxSizeMB * 1024 * 1024) return false;
  
  // Basic MIME type validation
  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!validTypes.includes(file.type)) return false;

  return true;
}
