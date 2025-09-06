/**
 * User-friendly error message mappings
 * Converts technical error messages into user-friendly ones
 */

export const getUserFriendlyErrorMessage = (error: string | Error): string => {
  const errorMessage = typeof error === 'string' ? error : error.message;
  const lowerError = errorMessage.toLowerCase();

  // Authentication errors
  if (
    lowerError.includes('invalid login credentials') ||
    lowerError.includes('invalid email or password')
  ) {
    return 'Invalid email or password. Please check your credentials and try again.';
  }

  if (
    lowerError.includes('user already registered') ||
    lowerError.includes('email address already registered')
  ) {
    return 'This email address is already registered. Please sign in instead.';
  }

  if (
    lowerError.includes('password should be at least') ||
    lowerError.includes('password is too weak')
  ) {
    return 'Password must be at least 8 characters long for security.';
  }

  if (lowerError.includes('invalid email')) {
    return 'Please enter a valid email address.';
  }

  if (lowerError.includes('email not confirmed')) {
    return 'Please check your email and click the confirmation link before signing in.';
  }

  if (
    lowerError.includes('too many requests') ||
    lowerError.includes('rate limit')
  ) {
    return 'Too many attempts. Please wait a moment before trying again.';
  }

  if (lowerError.includes('network') || lowerError.includes('connection')) {
    return 'Network error. Please check your connection and try again.';
  }

  // CAPTCHA errors
  if (
    lowerError.includes('captcha') ||
    lowerError.includes('verification failed')
  ) {
    return 'Security verification failed. Please complete the check again.';
  }

  if (lowerError.includes('captcha expired')) {
    return 'The security check has expired. Please complete it again.';
  }

  // File upload errors
  if (
    lowerError.includes('file too large') ||
    lowerError.includes('size limit')
  ) {
    return 'File is too large. Please choose a smaller image (max 5MB).';
  }

  if (
    lowerError.includes('invalid file type') ||
    lowerError.includes('unsupported format')
  ) {
    return 'Please upload a JPEG or PNG image file.';
  }

  // Generic fallbacks
  if (
    lowerError.includes('unexpected error') ||
    lowerError.includes('internal server error')
  ) {
    return 'Something went wrong. Please try again or contact support if the problem persists.';
  }

  if (
    lowerError.includes('permission denied') ||
    lowerError.includes('unauthorized')
  ) {
    return "You don't have permission to perform this action.";
  }

  if (
    lowerError.includes('not found') ||
    lowerError.includes('does not exist')
  ) {
    return 'The requested item could not be found.';
  }

  // If no specific mapping found, return a generic user-friendly message
  return 'Something went wrong. Please try again.';
};

export const getGenericErrorMessage = (): string => {
  return 'Something went wrong. Please try again or contact support if the problem persists.';
};

export const getNetworkErrorMessage = (): string => {
  return 'Network error. Please check your connection and try again.';
};

export const getValidationErrorMessage = (field: string): string => {
  const fieldMap: Record<string, string> = {
    email: 'Please enter a valid email address.',
    password: 'Please enter your password.',
    firstName: 'Please enter your first name.',
    lastName: 'Please enter your last name.',
    confirmPassword: 'Please confirm your password.',
  };

  return fieldMap[field] || `Please check the ${field} field.`;
};
