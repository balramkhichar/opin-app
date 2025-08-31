'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
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
  signOut?: () => Promise<void>;
}

// Custom hook for hover effects
const useHoverStyles = () => {
  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.backgroundColor = 'var(--color-accent)';
    if (e.currentTarget.style.color === 'var(--color-muted-foreground)') {
      e.currentTarget.style.color = 'var(--color-accent-foreground)';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.backgroundColor = 'transparent';
    if (e.currentTarget.style.color === 'var(--color-accent-foreground)') {
      e.currentTarget.style.color = 'var(--color-muted-foreground)';
    }
  };

  return { handleMouseEnter, handleMouseLeave };
};

// Custom hook for logo logic
const useLogo = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc =
    mounted && resolvedTheme === 'dark' ? '/logo-light.svg' : '/logo.svg';

  return { logoSrc, mounted };
};

// Common styles object
const styles = {
  common: {
    color: 'var(--color-foreground)',
  },
  card: {
    backgroundColor: 'var(--color-card)',
    borderColor: 'var(--color-border)',
  },
  background: {
    backgroundColor: 'var(--color-background)',
  },
  muted: {
    color: 'var(--color-muted-foreground)',
  },
} as const;

// Reusable Navigation Button Component
const NavigationButton = ({
  icon,
  label,
  onClick,
  onItemClick,
  className = 'flex w-full items-center space-x-3 rounded-lg p-3 text-left transition-colors cursor-pointer',
}: {
  icon: string;
  label: string;
  onClick: () => void | Promise<void>;
  onItemClick?: () => void;
  className?: string;
}) => {
  const { handleMouseEnter, handleMouseLeave } = useHoverStyles();

  return (
    <button
      onClick={async () => {
        await onClick();
        onItemClick?.();
      }}
      className={className}
      aria-label={label}
      style={styles.common}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Icon name={icon} size="md" />
      <span>{label}</span>
    </button>
  );
};

// Navigation Item Component
function NavigationItemComponent({
  item,
  onItemClick,
}: {
  item: NavigationItem;
  onItemClick?: () => void;
}) {
  const { handleMouseEnter, handleMouseLeave } = useHoverStyles();
  const commonClasses =
    'flex items-center space-x-3 p-3 rounded-lg transition-colors cursor-pointer';

  if (item.onClick) {
    return (
      <NavigationButton
        icon={item.icon}
        label={item.label}
        onClick={item.onClick}
        onItemClick={onItemClick}
        className={`${commonClasses} w-full text-left`}
      />
    );
  }

  return (
    <Link
      href={item.href || '#'}
      className={commonClasses}
      aria-label={item.label}
      onClick={onItemClick}
      style={styles.common}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center space-x-3">
        <Icon name={item.icon} size="md" />
        <span>{item.label}</span>
      </div>
    </Link>
  );
}

// Navigation Section Component
const NavigationSection = ({
  items,
  onItemClick,
  ariaLabel,
  className = 'space-y-1 px-4 py-4',
}: {
  items: NavigationItem[];
  onItemClick?: () => void;
  ariaLabel: string;
  className?: string;
}) => (
  <nav className={className} aria-label={ariaLabel}>
    {items.map((item, index) => (
      <NavigationItemComponent
        key={`nav-${index}`}
        item={item}
        onItemClick={onItemClick}
      />
    ))}
  </nav>
);

// Divider Component
const Divider = ({ className = 'mx-4 border-t' }: { className?: string }) => (
  <div className={`${className} border-border`} />
);

// Logo Component
const Logo = ({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
}) => (
  <Image
    src={src}
    alt={alt}
    width={width}
    height={height}
    className={className}
  />
);

// Mobile Header Component
const MobileHeader = ({
  logoSrc,
  isMobileMenuOpen,
  onToggleMenu,
}: {
  logoSrc: string;
  isMobileMenuOpen: boolean;
  onToggleMenu: () => void;
}) => {
  const { handleMouseEnter, handleMouseLeave } = useHoverStyles();

  return (
    <div
      className="fixed top-0 right-0 left-0 z-60 border-b px-4 py-3 md:hidden"
      style={styles.card}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Logo
            src={logoSrc}
            alt="Logo"
            width={48}
            height={24}
            className="h-6 w-12"
          />
        </div>
        <button
          onClick={onToggleMenu}
          className="rounded-lg p-2 transition-colors"
          aria-label="Toggle navigation menu"
          style={styles.muted}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Icon name={isMobileMenuOpen ? 'close' : 'menu'} size="md" />
        </button>
      </div>
    </div>
  );
};

// Mobile Menu Component
const MobileMenu = ({
  isOpen,
  navigationItems,
  bottomNavigationItems,
  signOut,
  onClose,
  onSignOut,
}: {
  isOpen: boolean;
  navigationItems: NavigationItem[];
  bottomNavigationItems: NavigationItem[];
  signOut?: () => Promise<void>;
  onClose: () => void;
  onSignOut: () => Promise<void>;
}) => (
  <>
    {/* Mobile Menu Overlay */}
    {isOpen && (
      <div
        className="fixed inset-0 z-40 md:hidden"
        onClick={onClose}
        style={{
          ...styles.background,
          opacity: 0.1,
        }}
      />
    )}

    {/* Mobile Menu Dropdown */}
    <div
      className={`fixed top-16 right-0 left-0 z-50 transform border-b transition-all duration-300 ease-in-out md:hidden ${
        isOpen
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none -translate-y-full opacity-0'
      }`}
      style={styles.card}
    >
      <div className="max-h-96 overflow-y-auto">
        <NavigationSection
          items={navigationItems}
          onItemClick={onClose}
          ariaLabel="Main navigation"
        />

        {(bottomNavigationItems.length > 0 || signOut) && (
          <>
            <Divider />
            <nav
              className="space-y-1 px-4 py-4"
              aria-label="Secondary navigation"
            >
              {bottomNavigationItems.map((item, index) => (
                <NavigationItemComponent
                  key={`mobile-bottom-nav-${index}`}
                  item={item}
                  onItemClick={onClose}
                />
              ))}
              {signOut && (
                <NavigationButton
                  icon="logOut"
                  label="Sign Out"
                  onClick={onSignOut}
                  onItemClick={onClose}
                />
              )}
            </nav>
          </>
        )}
      </div>
    </div>
  </>
);

// Desktop Sidebar Component
const DesktopSidebar = ({
  logoSrc,
  navigationItems,
  bottomNavigationItems,
  signOut,
  onSignOut,
}: {
  logoSrc: string;
  navigationItems: NavigationItem[];
  bottomNavigationItems: NavigationItem[];
  signOut?: () => Promise<void>;
  onSignOut: () => Promise<void>;
}) => (
  <div
    className="hidden h-full w-52 flex-col border-r md:flex"
    style={styles.card}
  >
    {/* Branding */}
    <div className="px-8 py-6">
      <div className="flex items-center space-x-3">
        <Logo
          src={logoSrc}
          alt="Logo"
          width={64}
          height={32}
          className="h-8 w-16"
        />
      </div>
    </div>

    {/* Main Navigation */}
    <NavigationSection
      items={navigationItems}
      ariaLabel="Main navigation"
      className="flex-1 space-y-1 px-4"
    />

    {/* Bottom Navigation and Sign Out */}
    {(bottomNavigationItems.length > 0 || signOut) && (
      <nav className="space-y-1 px-4 pb-6" aria-label="Secondary navigation">
        {bottomNavigationItems.map((item, index) => (
          <NavigationItemComponent
            key={`desktop-bottom-nav-${index}`}
            item={item}
          />
        ))}
        {signOut && (
          <NavigationButton
            icon="logOut"
            label="Sign Out"
            onClick={onSignOut}
          />
        )}
      </nav>
    )}
  </div>
);

export default function Navigation({
  children,
  navigationItems = [],
  bottomNavigationItems = [],
  signOut,
}: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logoSrc } = useLogo();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    if (signOut) {
      await signOut();
    }
  };

  return (
    <div className="flex h-screen" style={styles.background}>
      <MobileHeader
        logoSrc={logoSrc}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMenu={toggleMobileMenu}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        navigationItems={navigationItems}
        bottomNavigationItems={bottomNavigationItems}
        signOut={signOut}
        onClose={closeMobileMenu}
        onSignOut={handleSignOut}
      />

      <DesktopSidebar
        logoSrc={logoSrc}
        navigationItems={navigationItems}
        bottomNavigationItems={bottomNavigationItems}
        signOut={signOut}
        onSignOut={handleSignOut}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-auto pt-16 md:ml-0 md:pt-0">
        {children}
      </main>
    </div>
  );
}
