import { Suspense } from 'react';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Navigation } from './Navigation';
import { Loading, BreadcrumbNav, Button, Icon } from '@/components';

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
    <SidebarProvider>
      <Navigation />
      <SidebarInset className="flex h-screen flex-col">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex-1">
            <BreadcrumbNav />
          </div>
          <Button size="sm">
            <Icon name="plus" size="sm" />
            Create Project
          </Button>
        </header>
        <div className="flex-1 overflow-auto p-4">
          <Suspense fallback={<Loading size="lg" className="min-h-full" />}>
            {children}
          </Suspense>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
