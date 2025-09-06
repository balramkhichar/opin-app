-- Create avatars storage system with secure RLS policies
-- This migration creates the complete avatar upload system

-- Create avatars storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Create secure RLS policies for avatars bucket
-- File path format: userId-timestamp-random.ext (e.g., 6a674e40-7430-4632-b055-77ef9463cd08-1757147247758-oy9y7r.jpeg)
-- Use LIKE pattern matching to handle UUIDs with hyphens properly

-- Users can upload their own avatars
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
