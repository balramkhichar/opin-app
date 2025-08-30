'use client';

import Link from 'next/link';
import {
  Form,
  TextInput,
  PasswordInput,
  Button,
  TurnstileCaptcha,
  Loading,
} from '@/components';
import type { TurnstileRef } from '@/components/Turnstile';
import { useAuth } from '@/lib/auth-context';
import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function SignInForm() {
  const { signIn, loading: authLoading, user } = useAuth();
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
        selector={(state: { canSubmit: boolean; isSubmitting: boolean }) => [
          state.canSubmit,
          state.isSubmitting,
        ]}
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

      {/* Forgot Password Link */}
      <div className="text-center">
        <Link
          href={`/auth/forgot-password${next !== '/dashboard' ? `?next=${next}` : ''}`}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          Forgot your password?
        </Link>
      </div>
    </Form>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<Loading>Loading...</Loading>}>
      <SignInForm />
    </Suspense>
  );
}
