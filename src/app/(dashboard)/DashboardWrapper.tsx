'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';

interface DashboardWrapperProps {
  children: React.ReactNode;
  navigationItems: Array<{ icon: string; label: string; href: string }>;
  bottomNavigationItems: Array<{ icon: string; label: string; href: string }>;
}

export function DashboardWrapper({
  children,
  navigationItems,
  bottomNavigationItems,
}: DashboardWrapperProps) {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    const result = await signOut();
    if (result.success) {
      router.push('/auth/sign-in');
    }
  };

  return (
    <Navigation
      navigationItems={navigationItems}
      bottomNavigationItems={bottomNavigationItems}
      signOut={handleSignOut}
    >
      {children}
    </Navigation>
  );
}
