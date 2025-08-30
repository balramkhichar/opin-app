'use client';

import Navigation from '@/components/Navigation';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, signOut, loading } = useAuth();
  const router = useRouter();
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    setLogoutLoading(true);
    const result = await signOut();
    setLogoutLoading(false);

    if (result.success) {
      router.push('/');
    } else {
      console.error('Logout failed:', result.error);
    }
  };

  const navigationItems = [
    {
      icon: 'home',
      label: 'Home',
      href: '/dashboard',
    },
    {
      icon: 'settings',
      label: 'Projects',
      href: '/projects',
    },
  ];

  const bottomNavigationItems = [
    {
      icon: 'user',
      label: 'Profile',
      href: '/profile',
    },
    {
      icon: 'log-out',
      label: logoutLoading ? 'Logging out...' : 'Log out',
      onClick: handleLogout,
    },
  ];

  return (
    <Navigation
      navigationItems={navigationItems}
      bottomNavigationItems={bottomNavigationItems}
    >
      {children}
    </Navigation>
  );
}
