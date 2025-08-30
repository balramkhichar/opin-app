import React from 'react';
import Link from 'next/link';
import { Icon } from '../Icon';

interface NavigationItem {
  icon: string; // Icon name without .svg extension
  label: string;
  href?: string;
  onClick?: () => void;
}

interface NavigationProps {
  children: React.ReactNode;
  navigationItems?: NavigationItem[];
  bottomNavigationItems?: NavigationItem[];
}

function NavigationItemComponent({
  item,
  index,
}: {
  item: NavigationItem;
  index: number;
}) {
  const commonClasses =
    'flex items-center space-x-3 p-3 text-black hover:bg-gray-50 rounded-lg transition-colors cursor-pointer';

  if (item.onClick) {
    return (
      <button
        onClick={item.onClick}
        className={`${commonClasses} w-full text-left`}
        aria-label={item.label}
      >
        <Icon name={item.icon} size="md" />
        <span>{item.label}</span>
      </button>
    );
  }

  return (
    <Link
      href={item.href || '#'}
      className={commonClasses}
      aria-label={item.label}
    >
      <Icon name={item.icon} size="md" />
      <span>{item.label}</span>
    </Link>
  );
}

export default function Navigation({
  children,
  navigationItems = [],
  bottomNavigationItems = [],
}: NavigationProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="flex h-full w-52 flex-col border-r border-gray-200 bg-white">
        {/* Branding */}
        <div className="px-8 py-6">
          <div className="flex items-center space-x-3">
            <img src="/logo.svg" alt="Logo" className="h-8 w-16" />
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 space-y-1 px-4" aria-label="Main navigation">
          {navigationItems.map((item, index) => (
            <NavigationItemComponent
              key={`nav-${index}`}
              item={item}
              index={index}
            />
          ))}
        </nav>

        {/* Bottom Navigation */}
        <nav className="space-y-1 px-4 pb-6" aria-label="Secondary navigation">
          {bottomNavigationItems.map((item, index) => (
            <NavigationItemComponent
              key={`bottom-nav-${index}`}
              item={item}
              index={index}
            />
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
