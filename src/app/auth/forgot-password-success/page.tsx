'use client';

import { Button, Icon, Link } from '@/components';
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
        <div className="bg-accent mx-auto flex h-12 w-12 items-center justify-center rounded-full">
          <Icon name="mail" size="lg" />
        </div>
        <CardTitle>Check your email</CardTitle>
        <CardDescription>
          We&apos;ve sent you a password reset link. Please check your email and
          follow the instructions to reset your password.
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex-col space-y-4">
        <Link href="/auth/sign-in" className="w-full">
          <Button className="w-full">Back to sign in</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
