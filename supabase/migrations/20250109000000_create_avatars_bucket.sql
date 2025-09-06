-- Create avatars storage bucket (if it doesn't exist)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Create RLS policies for avatars bucket (if they don't exist)
-- Users can upload their own avatars (filename format: userId-timestamp-random.ext)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Users can upload their own avatars'
  ) THEN
    CREATE POLICY "Users can upload their own avatars" ON storage.objects
    FOR INSERT WITH CHECK (
      bucket_id = 'avatars' 
      AND auth.uid() IS NOT NULL
      AND auth.uid()::text = split_part(name, '-', 1)
    );
  END IF;
END $$;

-- Users can update their own avatars
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Users can update their own avatars'
  ) THEN
    CREATE POLICY "Users can update their own avatars" ON storage.objects
    FOR UPDATE USING (
      bucket_id = 'avatars' 
      AND auth.uid() IS NOT NULL
      AND auth.uid()::text = split_part(name, '-', 1)
    );
  END IF;
END $$;

-- Users can delete their own avatars
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Users can delete their own avatars'
  ) THEN
    CREATE POLICY "Users can delete their own avatars" ON storage.objects
    FOR DELETE USING (
      bucket_id = 'avatars' 
      AND auth.uid() IS NOT NULL
      AND auth.uid()::text = split_part(name, '-', 1)
    );
  END IF;
END $$;

-- Avatar images are publicly accessible for viewing
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Avatar images are publicly accessible'
  ) THEN
    CREATE POLICY "Avatar images are publicly accessible" ON storage.objects
    FOR SELECT USING (bucket_id = 'avatars');
  END IF;
END $$;
