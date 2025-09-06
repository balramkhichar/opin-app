-- Fix avatars bucket RLS policies
-- Remove all existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can upload their own avatars" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own avatars" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own avatars" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload their own avatars" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update their own avatars" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete their own avatars" ON storage.objects;
DROP POLICY IF EXISTS "Avatar images are publicly accessible" ON storage.objects;

-- Create clean, working RLS policies for avatars bucket

-- 1. Allow authenticated users to upload their own avatars
-- Filename format: userId-timestamp-random.ext
CREATE POLICY "Authenticated users can upload avatars" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'avatars' 
  AND auth.uid() IS NOT NULL
  AND auth.uid()::text = split_part(name, '-', 1)
);

-- 2. Allow authenticated users to update their own avatars
CREATE POLICY "Authenticated users can update avatars" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'avatars' 
  AND auth.uid() IS NOT NULL
  AND auth.uid()::text = split_part(name, '-', 1)
);

-- 3. Allow authenticated users to delete their own avatars
CREATE POLICY "Authenticated users can delete avatars" ON storage.objects
FOR DELETE USING (
  bucket_id = 'avatars' 
  AND auth.uid() IS NOT NULL
  AND auth.uid()::text = split_part(name, '-', 1)
);

-- 4. Allow public access to view avatar images
CREATE POLICY "Public access to view avatars" ON storage.objects
FOR SELECT USING (bucket_id = 'avatars');
