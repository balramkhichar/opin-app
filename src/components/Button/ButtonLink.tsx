'use client';

import { ReactNode } from 'react';
import Link from 'next/link';

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
  const baseClasses =
    'inline-flex items-center justify-center font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200';

  const variantClasses = {
    primary:
      'text-white bg-black hover:bg-gray-800 focus:ring-gray-500 shadow-sm',
    secondary:
      'text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-gray-500',
    outline:
      'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:ring-gray-500',
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    widthClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
