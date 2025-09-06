import { createClient } from './supabase';

// Constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
];
const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

export interface AvatarUploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * Validates file type and size for avatar uploads
 */
function validateAvatarFile(file: File): string | null {
  // Validate file type by MIME type
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return 'Please select a valid image file (JPEG, PNG, GIF, or WebP)';
  }

  // Validate file extension
  const fileExt = file.name.split('.').pop()?.toLowerCase();
  if (!fileExt || !ALLOWED_EXTENSIONS.includes(fileExt)) {
    return 'File must have a valid image extension (.jpg, .jpeg, .png, .gif, or .webp)';
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    return 'Image size must be less than 5MB';
  }

  // Additional security: check file name for suspicious patterns
  if (
    file.name.includes('..') ||
    file.name.includes('/') ||
    file.name.includes('\\')
  ) {
    return 'Invalid file name';
  }

  return null;
}

/**
 * Generates a secure filename for avatar uploads
 */
function generateAvatarFileName(userId: string, originalFile: File): string {
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  const fileExt = originalFile.name.split('.').pop()?.toLowerCase() || 'jpg';

  // Format: userId-timestamp-random.ext
  // Ensure userId is clean (no special characters)
  const cleanUserId = userId.replace(/[^a-zA-Z0-9-]/g, '');
  return `${cleanUserId}-${timestamp}-${randomSuffix}.${fileExt}`;
}

export async function uploadAvatar(
  file: File,
  userId: string
): Promise<AvatarUploadResult> {
  try {
    const supabase = createClient();

    // Validate authentication first
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return {
        success: false,
        error: 'Authentication required to upload avatar',
      };
    }

    // Ensure the userId matches the authenticated user
    if (user.id !== userId) {
      return {
        success: false,
        error: 'Unauthorized: Cannot upload avatar for another user',
      };
    }

    // Validate file
    const validationError = validateAvatarFile(file);
    if (validationError) {
      return {
        success: false,
        error: validationError,
      };
    }

    // Generate secure filename
    const fileName = generateAvatarFileName(userId, file);
    const filePath = fileName;

    // Upload file to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return {
        success: false,
        error: `Failed to upload image: ${uploadError.message}`,
      };
    }

    // Get public URL
    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);

    return {
      success: true,
      url: data.publicUrl,
    };
  } catch (error) {
    console.error('Avatar upload error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}

export async function deleteAvatar(
  avatarUrl: string,
  userId?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient();

    // Validate authentication first
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return {
        success: false,
        error: 'Authentication required to delete avatar',
      };
    }

    // If userId is provided, ensure it matches the authenticated user
    if (userId && user.id !== userId) {
      return {
        success: false,
        error: 'Unauthorized: Cannot delete avatar for another user',
      };
    }

    // Extract file path from URL
    let filePath: string;
    try {
      const url = new URL(avatarUrl);
      const pathParts = url.pathname.split('/');
      const fileName = pathParts[pathParts.length - 1];

      if (!fileName || fileName === '') {
        return {
          success: false,
          error: 'Invalid avatar URL: unable to extract filename',
        };
      }

      filePath = fileName;
    } catch (urlError) {
      return {
        success: false,
        error: 'Invalid avatar URL format',
      };
    }

    // Additional security: verify the file belongs to the authenticated user
    // Use the same logic as the RLS policy - check if filename starts with user ID
    if (!filePath.startsWith(user.id + '-')) {
      return {
        success: false,
        error: 'Unauthorized: Cannot delete avatar that does not belong to you',
      };
    }

    const { error } = await supabase.storage.from('avatars').remove([filePath]);

    if (error) {
      console.error('Delete error:', error);
      return {
        success: false,
        error: `Failed to delete avatar: ${error.message}`,
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Avatar delete error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred while deleting avatar',
    };
  }
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
}
