import { ButtonLink } from '@/components';

export default function AuthErrorPage() {
  return (
    <div>
      <h3 className="mb-4 text-gray-900">Something went wrong</h3>
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
      </div>
    </div>
  );
}
