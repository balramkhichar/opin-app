'use client';

import { ButtonLink, Icon } from '@/components';

export default function SignUpSuccessPage() {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
        <Icon name="check" size="lg" alt="Check mark" />
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
