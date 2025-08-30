'use client';

import { ButtonLink } from '@/components';

export default function ResetPasswordSuccessPage() {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
        <svg
          className="h-6 w-6 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
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
