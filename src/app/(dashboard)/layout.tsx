import { Suspense } from 'react';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import Navigation from '@/components/Navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/sign-in');
  }

  return (
    <Navigation
      navigationItems={[
        { icon: 'home', label: 'Dashboard', href: '/dashboard' },
        { icon: 'settings', label: 'Projects', href: '/projects' },
      ]}
      bottomNavigationItems={[
        { icon: 'user', label: 'Profile', href: '/profile' },
        {
          icon: 'logOut',
          label: 'Sign Out',
          onClick: async () => {
            'use server';
            const supabase = await createServerSupabaseClient();
            await supabase.auth.signOut();
            redirect('/auth/sign-in');
          },
        },
      ]}
    >
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </Navigation>
  );
}

function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div
          className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2"
          style={{ borderColor: 'var(--color-foreground)' }}
        ></div>
        <p className="mt-4" style={{ color: 'var(--color-muted-foreground)' }}>
          Loading...
        </p>
      </div>
    </div>
  );
}
