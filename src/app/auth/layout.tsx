'use client';

import Image from 'next/image';
import { ReactNode, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use default logo until component is mounted to prevent hydration mismatch
  const logoSrc =
    mounted && resolvedTheme === 'dark' ? '/logo-light.svg' : '/logo.svg';

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="relative h-16 w-full">
              <Image src={logoSrc} alt="Opin" fill={true} priority />
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">{children}</div>
      </div>
    </div>
  );
}
