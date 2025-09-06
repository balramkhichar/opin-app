'use client';

import {
  Form,
  PasswordInput,
  Button,
  TurnstileCaptcha,
  Loading,
  Link,
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
import { useCaptcha } from '@/hooks/use-captcha';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function UpdatePasswordForm() {
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
        toast.error('Password update failed', error.message);
        resetCaptcha();
      } else {
        toast.success('Password updated successfully! Redirecting...');
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
            helpTip={true}
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
            <div className="text-destructive text-sm">{captchaError}</div>
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
