'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Form,
  TextInput,
  PasswordInput,
  Button,
  TurnstileCaptcha,
} from '@/components';
import type { TurnstileRef } from '@/components/Turnstile';
import { useAuth } from '@/lib/auth-context';
import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function SignUpForm() {
  const { signUp, loading: authLoading, user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileRef>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') ?? '/dashboard';

  useEffect(() => {
    if (user) {
      router.push(next);
    }
  }, [user, router, next]);

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
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    setError(null);
    setCaptchaError(null);

    if (value.password !== value.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!captchaToken) {
      setCaptchaError('Please complete the CAPTCHA verification.');
      return;
    }

    const result = await signUp(value.email, value.password, captchaToken);
    if (result.success) {
      router.push('/auth/sign-up-success');
    } else {
      setError(result.error || 'Sign up failed');
      resetCaptcha();
    }
  };

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
          <Form
            defaultValues={{
              email: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={handleFormSubmit}
            className="space-y-6"
            title="Create your account"
            subtitle="Sign up to get started with Opin"
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
              label="Password"
              placeholder="Create a password"
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
              label="Confirm Password"
              placeholder="Confirm your password"
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

            {/* Error Messages */}
            {(error || captchaError) && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="mt-0 flex">
                  <div className="text-sm text-red-700">
                    <p>
                      {error
                        ? `Sign-up didn't work. ${error}`
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
                  disabled={!canSubmit || authLoading || !!captchaError}
                  loading={submitting || authLoading}
                  fullWidth
                >
                  {submitting || authLoading
                    ? 'Creating account...'
                    : 'Create account'}
                </Button>
              )}
            </Form.Subscribe>
          </Form>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            href={`/auth/login${next !== '/dashboard' ? `?next=${next}` : ''}`}
            className="font-semibold text-gray-900 hover:text-gray-700"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpForm />
    </Suspense>
  );
}
