import { type EmailOtpType } from '@supabase/supabase-js';
import { type NextRequest } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const _next = searchParams.get('next');
  const next = _next?.startsWith('/') ? _next : '/dashboard';

  if (token_hash && type) {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      // Handle different OTP types appropriately
      if (type === 'recovery') {
        // For password recovery, redirect to update password page
        // The user is now logged in and can update their password
        redirect(`/auth/update-password?next=${next}`);
      } else if (type === 'invite') {
        // For invite flow, redirect to password setup page
        // The user needs to set their password
        redirect(`/auth/setup-password?next=${next}`);
      } else {
        // For other types (signup, email change, etc.), redirect to specified URL
        redirect(next);
      }
    } else {
      // redirect the user to an error page with some instructions
      redirect(
        `/auth/error?error=${encodeURIComponent(error?.message || 'Invalid or expired link')}`
      );
    }
  }

  // redirect the user to an error page with some instructions
  redirect(`/auth/error?error=${encodeURIComponent('No token hash or type')}`);
}
