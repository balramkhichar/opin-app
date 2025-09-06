'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import { Form } from '@/components/Form';
import { FormField } from '@/components/Form/FormField';
import { PasswordInput } from '@/components/Form/PasswordInput';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from '@/components/Toast';
import { Icon } from '@/components/Icon';
import { Loading } from '@/components/Loading';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TurnstileCaptcha } from '@/components/Turnstile';
import { useCaptcha } from '@/hooks/use-captcha';
import type { AnyFieldApi } from '@tanstack/react-form';

interface PasswordUpdateData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const [saving, setSaving] = useState(false);
  const [formKey, setFormKey] = useState(0); // Key to force form reset
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

  const handlePasswordUpdate = async (values: PasswordUpdateData) => {
    if (!user) return;

    setCaptchaError(null);

    if (!captchaToken) {
      setCaptchaError('Please complete the security check to continue.');
      return;
    }

    setSaving(true);

    try {
      const supabase = createClient();

      // First, verify the current password by attempting to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email!,
        password: values.currentPassword,
        options: { captchaToken },
      });

      if (signInError) {
        throw new Error('Current password is incorrect');
      }

      // Update the password
      const { error: updateError } = await supabase.auth.updateUser({
        password: values.newPassword,
      });

      if (updateError) {
        throw updateError;
      }

      toast.success('Password updated successfully!');
      resetCaptcha();
      // Reset form after successful update
      setFormKey(prev => prev + 1);
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error(
        'Failed to update password',
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
      resetCaptcha();
      // Reset form after error for security
      setFormKey(prev => prev + 1);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="mx-auto max-w-2xl">
          <Loading size="lg" className="min-h-[400px]" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto py-8">
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-center">
                Unable to load settings. Please try refreshing the page.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Change your password</CardTitle>
            <CardDescription>
              Update your password to keep your account secure.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form
              key={formKey} // Force form reset when key changes
              defaultValues={{
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
              }}
              onSubmit={handlePasswordUpdate}
            >
              <div className="space-y-6">
                {/* Current Password */}
                <PasswordInput
                  name="currentPassword"
                  label="Current Password"
                  placeholder="Enter your current password"
                  validators={{
                    onChange: ({ value }: { value: string }) => {
                      if (!value || value.trim().length === 0) {
                        return 'Current password is required';
                      }
                      return undefined;
                    },
                  }}
                />

                {/* New Password */}
                <PasswordInput
                  name="newPassword"
                  label="New Password"
                  placeholder="Enter your new password"
                  helpTip={true}
                  validators={{
                    onChange: ({ value }: { value: string }) => {
                      if (!value || value.trim().length === 0) {
                        return 'New password is required';
                      }
                      if (value.length < 8) {
                        return 'Password must be at least 8 characters long';
                      }
                      if (!/(?=.*[a-z])/.test(value)) {
                        return 'Password must contain at least one lowercase letter';
                      }
                      if (!/(?=.*[A-Z])/.test(value)) {
                        return 'Password must contain at least one uppercase letter';
                      }
                      if (!/(?=.*\d)/.test(value)) {
                        return 'Password must contain at least one number';
                      }
                      if (
                        !/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(
                          value
                        )
                      ) {
                        return 'Password must contain at least one special character';
                      }
                      return undefined;
                    },
                  }}
                />

                {/* Confirm Password */}
                <PasswordInput
                  name="confirmPassword"
                  label="Confirm New Password"
                  placeholder="Confirm your new password"
                  validators={{
                    onChange: ({
                      value,
                      fieldApi,
                    }: {
                      value: string;
                      fieldApi: AnyFieldApi;
                    }) => {
                      if (!value || value.trim().length === 0) {
                        return 'Please confirm your new password';
                      }
                      const newPassword =
                        fieldApi.form.getFieldValue('newPassword');
                      if (value !== newPassword) {
                        return 'Passwords do not match';
                      }
                      return undefined;
                    },
                  }}
                />

                {/* Captcha */}
                <div className="space-y-2">
                  <TurnstileCaptcha
                    ref={turnstileRef}
                    onVerify={handleCaptchaVerify}
                    onError={handleCaptchaError}
                    onExpire={handleCaptchaExpire}
                  />
                  {captchaError && (
                    <p className="text-destructive text-sm">{captchaError}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    loading={saving}
                    className="min-w-[120px]"
                  >
                    Update Password
                  </Button>
                </div>
              </div>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
