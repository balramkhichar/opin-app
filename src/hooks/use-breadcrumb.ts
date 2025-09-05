'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isLast?: boolean;
}

export function useBreadcrumb(): BreadcrumbItem[] {
  const pathname = usePathname();

  return useMemo(() => {
    // Remove leading slash and split path into segments
    const segments = pathname.split('/').filter(Boolean);

    // If we're at the root dashboard, return just "Dashboard"
    if (
      segments.length === 0 ||
      (segments.length === 1 && segments[0] === 'dashboard')
    ) {
      return [{ label: 'Dashboard', href: '/dashboard', isLast: true }];
    }

    const breadcrumbs: BreadcrumbItem[] = [];

    // Always start with Dashboard
    breadcrumbs.push({
      label: 'Dashboard',
      href: '/dashboard',
    });

    // Build breadcrumbs from path segments
    let currentPath = '';
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;

      // Skip the first segment if it's 'dashboard' since we already added it
      if (segment === 'dashboard' && index === 0) {
        return;
      }

      const isLast = index === segments.length - 1;

      // Convert segment to readable label
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      breadcrumbs.push({
        label,
        href: isLast ? undefined : currentPath,
        isLast,
      });
    });

    return breadcrumbs;
  }, [pathname]);
}
