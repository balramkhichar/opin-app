# Navigation Component

A sidebar navigation component designed for dashboard layouts with support for navigation items and bottom actions.

## Usage

```tsx
import Navigation from '@/components/Navigation';

const navigationItems = [
  {
    icon: 'home',
    label: 'Home',
    href: '/dashboard',
  },
  {
    icon: 'settings',
    label: 'Projects',
    href: '/projects',
  },
];

const bottomNavigationItems = [
  {
    icon: 'user',
    label: 'Profile',
    href: '/profile',
  },
  {
    icon: 'logOut',
    label: 'Log out',
    onClick: handleLogout,
  },
];

<Navigation
  navigationItems={navigationItems}
  bottomNavigationItems={bottomNavigationItems}
>
  {/* Your page content goes here */}
  <div>Dashboard Content</div>
</Navigation>;
```

## Props

| Prop                    | Type               | Required | Description                                   |
| ----------------------- | ------------------ | -------- | --------------------------------------------- |
| `navigationItems`       | `NavigationItem[]` | Yes      | Array of navigation items for the main menu   |
| `bottomNavigationItems` | `NavigationItem[]` | No       | Array of navigation items for the bottom menu |
| `children`              | `React.ReactNode`  | Yes      | Content to be displayed in the main area      |

## NavigationItem Interface

```tsx
interface NavigationItem {
  icon: string; // Icon name (without .svg extension)
  label: string; // Display label
  href?: string; // URL for navigation (optional if onClick is provided)
  onClick?: () => void; // Click handler (optional if href is provided)
}
```

## Features

- **Responsive Design**: Adapts to different screen sizes
- **Icon Support**: Uses the Icon component for consistent iconography
- **Active State**: Automatically highlights the current route
- **Loading States**: Supports loading states for actions
- **Accessibility**: Full keyboard navigation and screen reader support

## Styling

The component uses Tailwind CSS classes and can be customized through:

- CSS custom properties for theming
- Tailwind CSS utility classes
- Custom CSS classes passed via className prop

## Integration

This component is typically used in dashboard layouts:

```tsx
// src/app/(dashboard)/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigationItems = [
    { icon: 'home', label: 'Home', href: '/dashboard' },
    { icon: 'settings', label: 'Projects', href: '/projects' },
  ];

  const bottomNavigationItems = [
    { icon: 'user', label: 'Profile', href: '/profile' },
    { icon: 'logOut', label: 'Log out', onClick: handleLogout },
  ];

  return (
    <Navigation
      navigationItems={navigationItems}
      bottomNavigationItems={bottomNavigationItems}
    >
      {children}
    </Navigation>
  );
}
```
