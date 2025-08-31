'use client';

import Link from 'next/link';
import { Button, Icon } from '@/components';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';

export default function SignUpSuccessPage() {
  return (
    <Card>
      <CardHeader className="text-center">
        <div
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-full"
          style={{ backgroundColor: 'var(--color-accent)' }}
        >
          <Icon name="check" size="lg" />
        </div>
        <CardTitle>Check your email</CardTitle>
        <CardDescription>
          We&apos;ve sent you a confirmation link to complete your registration.
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex-col space-y-4">
        <Button asChild className="w-full">
          <Link href="/auth/sign-in">Back to sign in</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
