'use client';

import {
  Form,
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
import type { TurnstileRef } from '@/components/Turnstile';
import { createClient } from '@/lib/supabase';
import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function SetupPasswordForm() {
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
      });

      if (error) {
        toast.error('Password setup failed', error.message);
        resetCaptcha();
      } else {
        toast.success('Password set successfully! Welcome to Opin.');
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
    </Card>
  );
}

export default function SetupPasswordPage() {
  return (
    <Suspense fallback={<Loading>Loading...</Loading>}>
      <SetupPasswordForm />
    </Suspense>
  );
}
