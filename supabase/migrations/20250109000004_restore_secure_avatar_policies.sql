-- Restore secure avatar policies with filename validation
-- Remove simplified policies
DROP POLICY IF EXISTS "Allow authenticated uploads to avatars" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated updates to avatars" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated deletes to avatars" ON storage.objects;
DROP POLICY IF EXISTS "Public access to view avatars" ON storage.objects;

-- Create secure policies with filename validation
-- Users can only upload files with their user ID as the first part of the filename
CREATE POLICY "Users can upload their own avatars" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'avatars' 
  AND auth.uid() IS NOT NULL
  AND auth.uid()::text = split_part(name, '-', 1)
);

-- Users can only update files with their user ID as the first part of the filename
CREATE POLICY "Users can update their own avatars" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'avatars' 
  AND auth.uid() IS NOT NULL
  AND auth.uid()::text = split_part(name, '-', 1)
);

-- Users can only delete files with their user ID as the first part of the filename
CREATE POLICY "Users can delete their own avatars" ON storage.objects
FOR DELETE USING (
  bucket_id = 'avatars' 
  AND auth.uid() IS NOT NULL
  AND auth.uid()::text = split_part(name, '-', 1)
);

-- Avatar images are publicly accessible for viewing
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects
FOR SELECT USING (bucket_id = 'avatars');
