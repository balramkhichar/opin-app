'use client';

import Link from 'next/link';
import { Button, Icon } from '@/components';

export default function SignUpSuccessPage() {
  return (
    <div className="text-center">
      <div
        className="mx-auto flex h-12 w-12 items-center justify-center rounded-full"
        style={{ backgroundColor: 'var(--color-accent)' }}
      >
        <Icon name="check" size="lg" />
      </div>
      <h3 className="mt-4" style={{ color: 'var(--color-foreground)' }}>
        Check your email
      </h3>
      <p
        className="mt-2 text-sm"
        style={{ color: 'var(--color-muted-foreground)' }}
      >
        We&apos;ve sent you a confirmation link to complete your registration.
      </p>
      <div className="mt-6 space-y-4">
        <Button asChild className="w-full">
          <Link href="/auth/sign-in">Back to sign in</Link>
        </Button>
      </div>
    </div>
  );
}
