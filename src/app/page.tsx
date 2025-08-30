import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase-server';

export default async function HomePage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect('/dashboard');
  }

  redirect('/auth/sign-in');
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
