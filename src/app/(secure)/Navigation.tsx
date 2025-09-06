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

const collapsibleItems = [
  {
    title: 'Settings',
    icon: 'settings',
    items: [
      {
        title: 'Team',
        url: '/settings/team',
        icon: 'users',
      },
      {
        title: 'Organization',
        url: '/settings/organization',
        icon: 'building',
      },
    ],
  },
];

// User menu items
const userMenuItems = [
  {
    title: 'Profile',
    url: '/user/profile',
    icon: 'user',
  },
  {
    title: 'Security',
    url: '/user/security',
    icon: 'shield',
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
      collapsibleItems={collapsibleItems}
      userMenuItems={userMenuItems}
      user={user}
      loading={loading}
      onSignOut={handleSignOut}
    />
  );
}
