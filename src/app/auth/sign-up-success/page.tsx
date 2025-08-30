'use client';

import { ButtonLink } from '@/components';

export default function SignUpSuccessPage() {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
        <svg
          className="h-6 w-6 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h3 className="mt-4 text-gray-900">Check your email</h3>
      <p className="mt-2 text-sm text-gray-600">
        We&apos;ve sent you a confirmation link to complete your registration.
      </p>
      <div className="mt-6 space-y-4">
        <ButtonLink href="/auth/sign-in" fullWidth>
          Back to sign in
        </ButtonLink>
      </div>
    </div>
  );
}
