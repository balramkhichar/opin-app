import { Suspense } from 'react';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import { DashboardWrapper } from './DashboardWrapper';

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

  const navigationItems = [
    { icon: 'home', label: 'Dashboard', href: '/dashboard' },
    { icon: 'settings', label: 'Projects', href: '/projects' },
  ];

  const bottomNavigationItems = [
    { icon: 'user', label: 'Profile', href: '/profile' },
  ];

  return (
    <DashboardWrapper
      navigationItems={navigationItems}
      bottomNavigationItems={bottomNavigationItems}
    >
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </DashboardWrapper>
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
        <p className="text-muted-foreground mt-4">Loading...</p>
      </div>
    </div>
  );
}
