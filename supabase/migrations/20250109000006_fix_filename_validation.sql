-- Fix filename validation in RLS policies
-- Remove debug policies
DROP POLICY IF EXISTS "Debug: Allow all authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Debug: Allow all authenticated updates" ON storage.objects;
DROP POLICY IF EXISTS "Debug: Allow all authenticated deletes" ON storage.objects;
DROP POLICY IF EXISTS "Avatar images are publicly accessible" ON storage.objects;

-- Create secure policies with improved filename validation
-- Handle UUID format properly by checking if the filename starts with the user ID
CREATE POLICY "Users can upload their own avatars" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'avatars' 
  AND auth.uid() IS NOT NULL
  AND name LIKE auth.uid()::text || '-%'
);

-- Users can update their own avatars
CREATE POLICY "Users can update their own avatars" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'avatars' 
  AND auth.uid() IS NOT NULL
  AND name LIKE auth.uid()::text || '-%'
);

-- Users can delete their own avatars
CREATE POLICY "Users can delete their own avatars" ON storage.objects
FOR DELETE USING (
  bucket_id = 'avatars' 
  AND auth.uid() IS NOT NULL
  AND name LIKE auth.uid()::text || '-%'
);

-- Avatar images are publicly accessible for viewing
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects
FOR SELECT USING (bucket_id = 'avatars');
