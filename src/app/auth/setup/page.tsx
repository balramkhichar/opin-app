'use client';

import {
  Form,
  TextInput,
  PasswordInput,
  Button,
  TurnstileCaptcha,
  Loading,
  Link,
  Alert,
} from '@/components';
import { toast } from '@/components/Toast';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { createClient } from '@/lib/supabase';
import { useCaptcha } from '@/hooks/use-captcha';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function SetupForm() {
  const {
    captchaToken,
    captchaError,
    setCaptchaError,
    turnstileRef,
    handleCaptchaVerify,
    handleCaptchaError,
    handleCaptchaExpire,
    resetCaptcha,
  } = useCaptcha();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') ?? '/dashboard';

  const handleFormSubmit = async (value: {
    first_name: string;
    last_name: string;
    password: string;
    confirmPassword: string;
  }) => {
    setCaptchaError(null);
    setLoading(true);

    if (value.password !== value.confirmPassword) {
      toast.error(
        "Your passwords don't match. Please make sure they're identical."
      );
      setLoading(false);
      return;
    }

    if (!captchaToken) {
      setCaptchaError('Please complete the security check to continue.');
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        password: value.password,
        data: {
          first_name: value.first_name,
          last_name: value.last_name,
        },
      });

      if (error) {
        toast.error('Account setup failed', error.message);
        resetCaptcha();
      } else {
        toast.success('Account setup complete! Welcome to Opin.');
        resetCaptcha();
        setTimeout(() => {
          router.push(next);
        }, 2000);
      }
    } catch {
      toast.error('An unexpected error occurred');
      resetCaptcha();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to Opin!</CardTitle>
        <CardDescription>Just one more step to get started! 🚀</CardDescription>
      </CardHeader>

      <CardContent>
        <Form
          defaultValues={{
            first_name: '',
            last_name: '',
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

          {/* Password Field */}
          <PasswordInput
            name="password"
            label="Password"
            placeholder="Create a password"
            helpTip={true}
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
                disabled={!canSubmit || loading || !!captchaError}
                loading={submitting || loading}
                className="w-full"
              >
                {submitting || loading
                  ? 'Setting up your account...'
                  : 'Complete Setup'}
              </Button>
            )}
          </Form.Subscribe>
        </Form>
      </CardContent>

      <CardFooter className="flex-col space-y-4">
        {/* Terms and Privacy Policy */}
        <div className="text-center text-sm">
          By completing setup, you agree to the
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

export default function SetupPage() {
  return (
    <Suspense fallback={<Loading>Loading...</Loading>}>
      <SetupForm />
    </Suspense>
  );
}
