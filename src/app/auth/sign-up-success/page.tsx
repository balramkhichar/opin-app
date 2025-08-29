'use client';

import Image from 'next/image';
import { ButtonLink } from '@/components';

export default function SignUpSuccessPage() {
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
            <h1 className="mt-4 text-2xl font-bold text-gray-900">
              Check your email
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              We&apos;ve sent you a confirmation link to complete your
              registration.
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
