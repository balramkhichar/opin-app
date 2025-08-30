import Link from 'next/link';
import { Button } from '@/components';

export const dynamic = 'force-dynamic';

export default function AuthErrorPage() {
  return (
    <div>
      <h3 className="mb-4" style={{ color: 'var(--color-foreground)' }}>
        Something went wrong
      </h3>
      <p className="mb-8" style={{ color: 'var(--color-muted-foreground)' }}>
        There was an issue with your authentication. This could be due to:
      </p>
      <ul
        className="mb-8 space-y-2 text-left"
        style={{ color: 'var(--color-muted-foreground)' }}
      >
        <li>• Invalid or expired confirmation link</li>
        <li>• Email confirmation already completed</li>
        <li>• Network connectivity issues</li>
        <li>• Invalid or expired password reset link</li>
      </ul>
      <div className="space-y-4">
        <Button asChild className="w-full">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
}
