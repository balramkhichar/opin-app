'use client';

import Image from 'next/image';
import { Form, TextInput, PasswordInput, Button } from '@/components';

export default function LoginPage() {
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
            onSubmit={async value => {
              // Simulate API call
              await new Promise(resolve => setTimeout(resolve, 1000));
              console.log('Form submitted:', value);
            }}
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
                  disabled={!canSubmit}
                  loading={submitting}
                  fullWidth
                >
                  {submitting ? 'Signing in...' : 'Sign in'}
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
