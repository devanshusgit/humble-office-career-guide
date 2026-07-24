import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://zlsxyuvsmipwzpoicnzw.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpsc3h5dXZzbWlwd3pwb2ljbnp3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDkyMDUzOSwiZXhwIjoyMTAwNDk2NTM5fQ.iYDnqk3xOm901qWp-qXss77Hwy2OTm6mfH1awTuLF8I";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function setup() {
  console.log('Creating bucket...');
  const { data, error } = await supabase.storage.createBucket('career-guide-photos', {
    public: false,
    fileSizeLimit: 5242880,
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp']
  });

  if (error) {
    console.error('Error creating bucket:', error);
  } else {
    console.log('Bucket created:', data);
  }
}

setup();
