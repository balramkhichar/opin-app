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
-- Create RLS policies for avatars bucket
-- File path format: userId-timestamp-random.ext (e.g., 6a674e40-7430-4632-b055-77ef9463cd08-1757147247758-oy9y7r.jpeg)
-- Use LIKE pattern matching to handle UUIDs with hyphens properly
CREATE POLICY "Users can upload their own avatars" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'avatars'
  AND auth.uid() IS NOT NULL
  AND name LIKE auth.uid()::text || '-%'
);

CREATE POLICY "Users can update their own avatars" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'avatars'
  AND auth.uid() IS NOT NULL
  AND name LIKE auth.uid()::text || '-%'
);

CREATE POLICY "Users can delete their own avatars" ON storage.objects
FOR DELETE USING (
  bucket_id = 'avatars'
  AND auth.uid() IS NOT NULL
  AND name LIKE auth.uid()::text || '-%'
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

Or copy the contents of `supabase/migrations/20250109000000_create_avatars_system.sql` and run it in your Supabase SQL editor.

## Features

The profile page includes the following features:

### ✅ Profile Information Management

- Update first name and last name
- Form validation with real-time feedback
- Email display (read-only)

### ✅ Avatar Management

- Upload profile photos
- Image preview before saving
- File type validation (JPEG, PNG, GIF, WebP)
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
- File type validation (JPEG, PNG, GIF, WebP) and size validation

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
├── components/
│   ├── Alert/                  # Alert component for notifications
│   └── ui/
│       └── alert.tsx           # Alert UI component
└── supabase/migrations/
    └── 20250109000000_create_avatars_system.sql      # Complete avatars system setup
```

## Dependencies

The profile page uses the following components and utilities:

- `@/components/Form` - TanStack Form integration
- `@/components/Alert` - Alert component for notifications
- `@/components/ui/avatar` - shadcn/ui Avatar component
- `@/components/ui/button` - shadcn/ui Button component
- `@/components/ui/card` - shadcn/ui Card component
- `@/components/ui/alert` - shadcn/ui Alert component
- `@/lib/avatar` - Avatar upload utilities
- `@/lib/supabase` - Supabase client

All components are already available in the project or have been added as needed.
