'use client';

import {
  Form,
  TextInput,
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
    first_name: string;
    last_name: string;
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

    const result = await signUp(
      value.email,
      value.password,
      captchaToken,
      value.first_name,
      value.last_name
    );
    if (result.success) {
      router.push('/auth/sign-up-success');
    } else {
      setError(result.error || 'Sign up failed');
      resetCaptcha();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>Sign up to get started with Opin</CardDescription>
      </CardHeader>

      <CardContent>
        <Form
          defaultValues={{
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={handleFormSubmit}
          className="space-y-6"
        >
          {/* Name Fields Row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* First Name Field */}
            <TextInput
              name="first_name"
              label="First Name"
              placeholder="Enter your first name"
              autoComplete="given-name"
              validators={{
                onChange: ({ value }: { value: string }) => {
                  if (!value) return 'First name is required';
                  return undefined;
                },
              }}
            />

            {/* Last Name Field */}
            <TextInput
              name="last_name"
              label="Last Name"
              placeholder="Enter your last name"
              autoComplete="family-name"
              validators={{
                onChange: ({ value }: { value: string }) => {
                  if (!value) return 'Last name is required';
                  return undefined;
                },
              }}
            />
          </div>

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
            <div
              className="rounded-md p-4"
              style={{ backgroundColor: 'var(--color-destructive)' }}
            >
              <div className="mt-0 flex">
                <div
                  className="text-sm"
                  style={{ color: 'var(--color-primary-foreground)' }}
                >
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
                className="w-full"
              >
                {submitting || authLoading
                  ? 'Creating account...'
                  : 'Create account'}
              </Button>
            )}
          </Form.Subscribe>

          {/* Terms and Privacy Policy */}
          <div className="text-center text-sm">
            By signing up, you agree to the
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
        </Form>
      </CardContent>

      <CardFooter className="flex-col space-y-4">
        <p>
          Already have an account?{' '}
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

export default function SignUpPage() {
  return (
    <Suspense fallback={<Loading>Loading...</Loading>}>
      <SignUpForm />
    </Suspense>
  );
}
