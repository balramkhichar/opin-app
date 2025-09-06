'use client';

import {
  Form,
  TextInput,
  PasswordInput,
  TurnstileCaptcha,
  Loading,
  Link,
  Alert,
} from '@/components';
import { toast } from '@/components/Toast';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import type { TurnstileRef } from '@/components/Turnstile';
import { useAuth } from '@/lib/auth-context';
import { useState, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function SignInForm() {
  const { signIn, loading: authLoading, user } = useAuth();
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileRef>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') ?? '/dashboard';

  const handleCaptchaVerify = (token: string) => {
    setCaptchaToken(token);
    setCaptchaError(null);
  };

  const handleCaptchaError = () => {
    setCaptchaError(
      'Security verification failed. Please complete the check again.'
    );
    setCaptchaToken(null);
  };

  const handleCaptchaExpire = () => {
    setCaptchaToken(null);
    setCaptchaError(
      'The security check has expired. Please complete it again.'
    );
  };

  const resetCaptcha = () => {
    turnstileRef.current?.reset();
    setCaptchaToken(null);
    setCaptchaError(null);
  };

  const handleFormSubmit = async (value: {
    email: string;
    password: string;
  }) => {
    setCaptchaError(null);

    if (!captchaToken) {
      setCaptchaError('Please complete the security check to continue.');
      return;
    }

    const result = await signIn(value.email, value.password, captchaToken);
    if (!result.success) {
      toast.error(
        'Sign-in failed',
        result.error ||
          "Sign-in didn't work. Double-check your details and retry."
      );
      resetCaptcha();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Sign in to your account to continue</CardDescription>
      </CardHeader>

      <CardContent>
        <Form
          defaultValues={{
            email: '',
            password: '',
          }}
          onSubmit={handleFormSubmit}
          className="space-y-6"
        >
          {/* Email Field */}
          <TextInput
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            validators={{
              onChange: ({ value }: { value: string }) => {
                if (!value) return 'Email is required';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                  return 'Please enter a valid email address';
                }
                return undefined;
              },
            }}
          />

          {/* Password Field */}
          <PasswordInput
            name="password"
            placeholder="Enter your password"
            label={
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Password
                </label>
                <Link
                  href={`/auth/forgot-password${next !== '/dashboard' ? `?next=${next}` : ''}`}
                >
                  Forgot your password?
                </Link>
              </div>
            }
          />

          {/* CAPTCHA Component */}
          <div className="flex">
            <TurnstileCaptcha
              ref={turnstileRef}
              onVerify={handleCaptchaVerify}
              onError={handleCaptchaError}
              onExpire={handleCaptchaExpire}
              className="mt-0"
            />
          </div>

          {/* CAPTCHA Error Message */}
          {captchaError && (
            <Alert
              variant="error"
              title="Verification failed"
              description={captchaError}
            />
          )}

          {/* Submit Button */}
          <Form.Subscribe
            selector={(state: {
              canSubmit: boolean;
              isSubmitting: boolean;
            }) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, submitting]: [boolean, boolean]) => (
              <Button
                type="submit"
                disabled={!canSubmit || authLoading || !!captchaError}
                loading={submitting || authLoading}
                className="w-full"
              >
                {submitting || authLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            )}
          </Form.Subscribe>
        </Form>
      </CardContent>

      <CardFooter className="flex-col space-y-4">
        {/* Terms and Privacy Policy */}
        <div className="text-center text-sm">
          By signing in, you agree to the
          <Link
            href="https://www.getopin.com/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold"
          >
            Terms of use
          </Link>{' '}
          and
          <Link
            href="https://www.getopin.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold"
          >
            Privacy Policy
          </Link>
          .
        </div>
      </CardFooter>
    </Card>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<Loading>Loading...</Loading>}>
      <SignInForm />
    </Suspense>
  );
}
