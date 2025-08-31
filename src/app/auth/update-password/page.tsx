'use client';

import {
  Form,
  PasswordInput,
  Button,
  TurnstileCaptcha,
  Loading,
  Link,
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
import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function UpdatePasswordForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const turnstileRef = useRef<TurnstileRef>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') ?? '/dashboard';

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push(`/auth/sign-in?next=${next}`);
      }
    };
    checkAuth();
  }, [router, next]);

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

  const handleFormSubmit = async (value: {
    password: string;
    confirmPassword: string;
  }) => {
    setError(null);
    setSuccess(null);
    setCaptchaError(null);
    setLoading(true);

    if (value.password !== value.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!captchaToken) {
      setCaptchaError('Please complete the CAPTCHA verification.');
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        password: value.password,
      });

      if (error) {
        setError(error.message);
        resetCaptcha();
      } else {
        setSuccess('Password updated successfully! Redirecting...');
        resetCaptcha();
        setTimeout(() => {
          router.push(next);
        }, 2000);
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
        <CardTitle>Update your password</CardTitle>
        <CardDescription>Enter your new password below</CardDescription>
      </CardHeader>

      <CardContent>
        <Form
          defaultValues={{
            password: '',
            confirmPassword: '',
          }}
          onSubmit={handleFormSubmit}
          className="space-y-6"
        >
          {/* Password Field */}
          <PasswordInput
            name="password"
            label="New Password"
            placeholder="Enter your new password"
            validators={{
              onChange: ({ value }: { value: string }) => {
                if (!value) return 'Password is required';
                if (value.length < 8) {
                  return 'Password must be at least 8 characters long';
                }
                return undefined;
              },
            }}
          />

          {/* Confirm Password Field */}
          <PasswordInput
            name="confirmPassword"
            label="Confirm New Password"
            placeholder="Confirm your new password"
            validators={{
              onChange: ({ value }: { value: string }) => {
                if (!value) return 'Please confirm your password';
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

          {/* Success Message */}
          {success && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="mt-0 flex">
                <div className="text-sm text-green-700">
                  <p>{success}</p>
                </div>
              </div>
            </div>
          )}

          {/* Error Messages */}
          {(error || captchaError) && (
            <div className="bg-destructive rounded-md p-4">
              <div className="mt-0 flex">
                <div className="text-primary-foreground text-sm">
                  <p>
                    {error
                      ? `Password update didn't work. ${error}`
                      : `We couldn't verify you're human. Try again.`}
                  </p>
                </div>
              </div>
            </div>
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
                  ? 'Updating password...'
                  : 'Update password'}
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

export default function UpdatePasswordPage() {
  return (
    <Suspense fallback={<Loading>Loading...</Loading>}>
      <UpdatePasswordForm />
    </Suspense>
  );
}
