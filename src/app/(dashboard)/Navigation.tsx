'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { signOut } from '@/lib/auth';
import { Sidebar } from '@/components/Sidebar';
import {
  HomeIcon,
  BarChartIcon,
  UserIcon,
  SettingsIcon,
} from '@/components/Icon';

interface User {
  id: string;
  email?: string;
  user_metadata?: {
    first_name?: string;
    last_name?: string;
    full_name?: string;
    avatar_url?: string;
  };
}

interface UserError {
  message: string;
}

// Navigation items
const navigationItems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: HomeIcon,
  },
  {
    title: 'Analytics',
    url: '/analytics',
    icon: BarChartIcon,
  },
];

// User menu items
const userMenuItems = [
  {
    title: 'Profile',
    url: '/profile',
    icon: UserIcon,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: SettingsIcon,
  },
];

export function Navigation() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<UserError | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        setError(null);
        const supabase = createClient();
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          throw userError;
        }

        setUser(user);
      } catch (error) {
        console.error('Error fetching user:', error);
        setError({
          message:
            error instanceof Error ? error.message : 'Failed to fetch user',
        });
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

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
