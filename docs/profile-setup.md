# Profile Page Setup

This document provides instructions for setting up the profile page functionality, including the avatar storage system.

## Supabase Storage Setup

### 1. Create Avatars Storage Bucket

Run the following SQL in your Supabase SQL editor to create the avatars storage bucket:

```sql
-- Create avatars storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
);
```

### 2. Set Up Row Level Security (RLS) Policies

Create the following RLS policies for the avatars bucket:

```sql
-- Create RLS policy for avatars bucket
-- File path: avatars/userId-timestamp.ext
-- We need to extract the userId from the filename
CREATE POLICY "Users can upload their own avatars" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'avatars'
  AND auth.uid()::text = split_part(name, '-', 1)
);

CREATE POLICY "Users can update their own avatars" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'avatars'
  AND auth.uid()::text = split_part(name, '-', 1)
);

CREATE POLICY "Users can delete their own avatars" ON storage.objects
FOR DELETE USING (
  bucket_id = 'avatars'
  AND auth.uid()::text = split_part(name, '-', 1)
);

CREATE POLICY "Avatar images are publicly accessible" ON storage.objects
FOR SELECT USING (bucket_id = 'avatars');
```

### 3. Alternative: Use Migration File

If you prefer to use the migration file, you can run:

```bash
# Apply the migration (if using Supabase CLI)
supabase db push
```

Or copy the contents of `supabase/migrations/001_create_avatars_storage.sql` and run it in your Supabase SQL editor.

## Features

The profile page includes the following features:

### ✅ Profile Information Management

- Update first name and last name
- Form validation with real-time feedback
- Email display (read-only)

### ✅ Avatar Management

- Upload profile photos
- Image preview before saving
- File type validation (JPEG, PNG only)
- File size validation (5MB limit)
- Automatic avatar deletion when replaced
- Fallback to user initials when no avatar is set

### ✅ User Experience

- Loading states during save operations
- Success and error message display
- Responsive design for mobile and desktop
- Accessible form controls with proper ARIA labels

### ✅ Security

- Row Level Security (RLS) policies for avatar storage
- User can only upload/update/delete their own avatars
- Public read access for avatar images
- File type validation (JPEG, PNG only) and size validation

## Usage

1. Navigate to `/profile` in your application
2. Update your first name and last name in the form fields
3. Click "Change Photo" to upload a new avatar
4. Click "Save Changes" to persist your updates

## File Structure

```
src/
├── app/(secure)/profile/
│   └── page.tsx                 # Main profile page component
├── lib/
│   └── avatar.ts               # Avatar upload utility functions
└── supabase/migrations/
    └── 001_create_avatars_storage.sql  # Database migration
```

## Dependencies

The profile page uses the following components and utilities:

- `@/components/Form` - TanStack Form integration
- `@/components/ui/avatar` - shadcn/ui Avatar component
- `@/components/ui/button` - shadcn/ui Button component
- `@/components/ui/card` - shadcn/ui Card component
- `@/lib/avatar` - Avatar upload utilities
- `@/lib/supabase` - Supabase client

All components are already available in the project or have been added as needed.
