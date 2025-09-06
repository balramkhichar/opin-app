'use client';

import { useBreadcrumb } from '@/hooks/use-breadcrumb';

export default function TeamSettingsPage() {
  useBreadcrumb();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Team Settings</h1>
        <p className="text-muted-foreground">
          Manage your team members and permissions.
        </p>
      </div>

      <div className="rounded-lg border p-6">
        <p className="text-muted-foreground">
          Team settings content will be implemented here.
        </p>
      </div>
    </div>
  );
}
