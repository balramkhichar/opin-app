'use client';

import Image from 'next/image';
import { ButtonLink } from '@/components';

export default function ResetPasswordSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="relative h-16 w-full">
            <Image src="/logo.svg" alt="Opin" fill={true} priority />
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-lg border border-gray-200 bg-white px-6 py-8">
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
            <h1 className="mt-4 text-2xl font-bold text-gray-900">
              Check your email
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              We&apos;ve sent you a password reset link to your email address.
            </p>
            <div className="mt-6 space-y-4">
              <ButtonLink href="/auth/login" fullWidth>
                Back to sign in
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
