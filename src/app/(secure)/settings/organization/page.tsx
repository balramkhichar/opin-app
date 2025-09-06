'use client';

import { useBreadcrumb } from '@/hooks/use-breadcrumb';

export default function OrganizationSettingsPage() {
  useBreadcrumb();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Organization Settings</h1>
        <p className="text-muted-foreground">
          Manage your organization details and preferences.
        </p>
      </div>

      <div className="rounded-lg border p-6">
        <p className="text-muted-foreground">
          Organization settings content will be implemented here.
        </p>
      </div>
    </div>
  );
}
