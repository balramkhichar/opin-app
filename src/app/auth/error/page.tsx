import { ButtonLink } from '@/components';

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            Authentication Error
          </h1>
          <p className="mb-8 text-gray-600">
            There was an issue with your authentication. This could be due to:
          </p>
          <ul className="mb-8 space-y-2 text-left text-gray-600">
            <li>• Invalid or expired confirmation link</li>
            <li>• Email confirmation already completed</li>
            <li>• Network connectivity issues</li>
            <li>• Invalid or expired password reset link</li>
          </ul>
          <div className="space-y-4">
            <ButtonLink href="/" fullWidth>
              Return to Home
            </ButtonLink>
            <ButtonLink href="/auth/sign-up" variant="outline" fullWidth>
              Try Signing Up Again
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
