'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { getButtonClasses } from './Button';

interface ButtonLinkProps {
  children: ReactNode;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

export function ButtonLink({
  children,
  href,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
}: ButtonLinkProps) {
  const classes = getButtonClasses(variant, size, fullWidth, className);

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
