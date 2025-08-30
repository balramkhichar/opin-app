import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="relative h-16 w-full">
            <Image src="/logo.svg" alt="Opin" fill={true} priority />
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div
          className="rounded-lg border px-6 py-8 text-center"
          style={{
            backgroundColor: 'var(--color-card)',
            borderColor: 'var(--color-border)',
          }}
        >
          {/* Not Found Image */}
          <div className="mb-6 flex justify-center">
            <div className="relative h-48 w-48">
              <Image
                src="/images/not-found.png"
                alt="Page not found illustration"
                fill={true}
                className="object-contain"
              />
            </div>
          </div>
          <div className="mb-6">
            <h3 className="mt-4" style={{ color: 'var(--color-foreground)' }}>
              Oops! You hit a dead end.
            </h3>
            <p
              className="mt-2"
              style={{ color: 'var(--color-muted-foreground)' }}
            >
              Let&apos;s help you get back on the right path.
            </p>
          </div>
          <div className="space-y-4">
            <Button asChild variant="default" size="default" className="w-full">
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
