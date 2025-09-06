'use client';

import { useAuth } from '@/lib/auth-context';
import { signOut } from '@/lib/auth';
import { Sidebar } from '@/components/Sidebar';

// Navigation items
const navigationItems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: 'home',
  },
];

// User menu items
const userMenuItems = [
  {
    title: 'Profile',
    url: '/profile',
    icon: 'user',
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: 'settings',
  },
];

export function Navigation() {
  const { user, loading } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.href = '/auth/sign-in';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Sidebar
      navigationItems={navigationItems}
      userMenuItems={userMenuItems}
      user={user}
      loading={loading}
      onSignOut={handleSignOut}
    />
  );
}
