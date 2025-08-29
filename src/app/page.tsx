'use client';

import Image from 'next/image';
import {
  Form,
  TextInput,
  PasswordInput,
  Button,
  TurnstileCaptcha,
} from '@/components';
import type { TurnstileRef } from '@/components/Turnstile';
import { useAuth } from '@/lib/auth-context';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { signIn, loading: authLoading, user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileRef>(null);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

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
  }) => {
    setError(null);
    setCaptchaError(null);

    if (!captchaToken) {
      setCaptchaError('Please complete the CAPTCHA verification.');
      return;
    }

    const result = await signIn(value.email, value.password, captchaToken);
    if (!result.success) {
      setError(result.error || 'Sign in failed');
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
            }}
            onSubmit={handleFormSubmit}
            className="space-y-6"
            title="Welcome back"
            subtitle="Sign in to your account to continue"
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
              placeholder="Enter your password"
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
                        ? `Sign-in didn't work. Double-check your details and retry.`
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
                  {submitting || authLoading ? 'Signing in...' : 'Sign in'}
                </Button>
              )}
            </Form.Subscribe>
          </Form>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <a
            href="https://www.getopin.com/"
            className="font-semibold text-gray-900 hover:text-gray-700"
          >
            Contact sales
          </a>
        </p>
      </div>
    </div>
  );
}
