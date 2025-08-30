'use client';

import { ButtonLink } from '@/components';

export default function ResetPasswordSuccessPage() {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
        <img src="/icons/mail.svg" alt="Email icon" className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-gray-900">Check your email</h3>
      <p className="mt-2 text-sm text-gray-600">
        We&apos;ve sent you a password reset link to your email address.
      </p>
      <div className="mt-6 space-y-4">
        <ButtonLink href="/auth/sign-in" fullWidth>
          Back to sign in
        </ButtonLink>
      </div>
    </div>
  );
}
