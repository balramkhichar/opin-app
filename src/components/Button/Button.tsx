'use client';

import { ReactNode, ButtonHTMLAttributes } from 'react';
import { Loading } from '../Loading';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
}

// Shared button styles utility
export const getButtonClasses = (
  variant: 'primary' | 'secondary' | 'outline' = 'primary',
  size: 'sm' | 'md' | 'lg' = 'md',
  fullWidth: boolean = false,
  className: string = ''
) => {
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

  return [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    widthClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const classes =
    getButtonClasses(variant, size, fullWidth, className) +
    ' cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-live="polite"
      {...props}
    >
      {loading && <Loading size="sm" className="mr-2 -ml-1" />}
      <span aria-hidden={loading}>{children}</span>
    </button>
  );
}
