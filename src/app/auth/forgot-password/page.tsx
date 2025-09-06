'use client';

import {
  Form,
  TextInput,
  Button,
  TurnstileCaptcha,
  Loading,
  Link,
  Alert,
} from '@/components';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import type { TurnstileRef } from '@/components/Turnstile';
import { createClient } from '@/lib/supabase';
import { useState, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function ForgotPasswordForm() {
  const [error, setError] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const turnstileRef = useRef<TurnstileRef>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') ?? '/dashboard';

  const handleCaptchaVerify = (token: string) => {
    setCaptchaToken(token);
    setCaptchaError(null);
  };

  const handleCaptchaError = () => {
    setCaptchaError('CAPTCHA verification failed. Please try again.');
    setCaptchaToken(null);
  };

  const handleCaptchaExpire = () => {
    setCaptchaToken(null);
    setCaptchaError('CAPTCHA expired. Please verify again.');
  };

  const resetCaptcha = () => {
    turnstileRef.current?.reset();
    setCaptchaToken(null);
    setCaptchaError(null);
  };

  const handleFormSubmit = async (value: { email: string }) => {
    setError(null);
    setCaptchaError(null);
    setLoading(true);

    if (!captchaToken) {
      setCaptchaError('Please complete the CAPTCHA verification.');
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(value.email, {
        redirectTo: `${window.location.origin}/auth/update-password?next=${next}`,
        captchaToken,
      });

      if (error) {
        setError(error.message);
        resetCaptcha();
      } else {
        router.push('/auth/forgot-password-success');
      }
    } catch {
      setError('An unexpected error occurred');
      resetCaptcha();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reset your password</CardTitle>
        <CardDescription>
          Enter your email address and we&apos;ll send you a link to reset your
          password
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form
          defaultValues={{
            email: '',
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

          {/* Error Messages */}
          {(error || captchaError) && (
            <Alert
              variant="error"
              title={error ? 'Password reset failed' : 'Verification failed'}
              description={
                error
                  ? `Password reset didn't work. ${error}`
                  : `We couldn't verify you're human. Try again.`
              }
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
                disabled={!canSubmit || loading || !!captchaError}
                loading={submitting || loading}
                className="w-full"
              >
                {submitting || loading
                  ? 'Sending reset link...'
                  : 'Send reset link'}
              </Button>
            )}
          </Form.Subscribe>
        </Form>
      </CardContent>

      <CardFooter className="flex-col space-y-4">
        <p>
          Remember your password?{' '}
          <Link
            href={`/auth/sign-in${next !== '/dashboard' ? `?next=${next}` : ''}`}
            className="font-semibold"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<Loading>Loading...</Loading>}>
      <ForgotPasswordForm />
    </Suspense>
  );
}
