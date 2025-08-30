'use client';

import React, { useState } from 'react';
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
  onItemClick,
}: {
  item: NavigationItem;
  index: number;
  onItemClick?: () => void;
}) {
  const commonClasses =
    'flex items-center space-x-3 p-3 text-black hover:bg-gray-50 rounded-lg transition-colors cursor-pointer';

  if (item.onClick) {
    return (
      <button
        onClick={() => {
          item.onClick?.();
          onItemClick?.();
        }}
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
      onClick={onItemClick}
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="fixed top-0 right-0 left-0 z-60 border-b border-gray-200 bg-white px-4 py-3 md:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/logo.svg" alt="Logo" className="h-6 w-12" />
          </div>
          <button
            onClick={toggleMobileMenu}
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
            aria-label="Toggle navigation menu"
          >
            <Icon name={isMobileMenuOpen ? 'close' : 'menu'} size="md" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/10 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu Dropdown */}
      <div
        className={`fixed top-16 right-0 left-0 z-50 transform border-b border-gray-200 bg-white transition-all duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-full opacity-0'
        }`}
      >
        <div className="max-h-96 overflow-y-auto">
          {/* Mobile Navigation Items */}
          <nav className="space-y-1 px-4 py-4" aria-label="Main navigation">
            {navigationItems.map((item, index) => (
              <NavigationItemComponent
                key={`mobile-nav-${index}`}
                item={item}
                index={index}
                onItemClick={closeMobileMenu}
              />
            ))}
          </nav>

          {/* Mobile Bottom Navigation */}
          {bottomNavigationItems.length > 0 && (
            <>
              <div className="mx-4 border-t border-gray-200"></div>
              <nav
                className="space-y-1 px-4 py-4"
                aria-label="Secondary navigation"
              >
                {bottomNavigationItems.map((item, index) => (
                  <NavigationItemComponent
                    key={`mobile-bottom-nav-${index}`}
                    item={item}
                    index={index}
                    onItemClick={closeMobileMenu}
                  />
                ))}
              </nav>
            </>
          )}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden h-full w-52 flex-col border-r border-gray-200 bg-white md:flex">
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
              key={`desktop-nav-${index}`}
              item={item}
              index={index}
            />
          ))}
        </nav>

        {/* Bottom Navigation */}
        <nav className="space-y-1 px-4 pb-6" aria-label="Secondary navigation">
          {bottomNavigationItems.map((item, index) => (
            <NavigationItemComponent
              key={`desktop-bottom-nav-${index}`}
              item={item}
              index={index}
            />
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto pt-16 md:ml-0 md:pt-0">
        {children}
      </main>
    </div>
  );
}
