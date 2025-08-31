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

export default function ForgotPasswordSuccessPage() {
  return (
    <Card>
      <CardHeader className="text-center">
        <div
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-full"
          style={{ backgroundColor: 'var(--color-accent)' }}
        >
          <Icon name="mail" size="lg" />
        </div>
        <CardTitle>Check your email</CardTitle>
        <CardDescription>
          We&apos;ve sent you a password reset link. Please check your email and
          follow the instructions to reset your password.
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
