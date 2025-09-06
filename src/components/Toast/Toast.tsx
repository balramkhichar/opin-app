'use client';

import { toast as sonnerToast } from 'sonner';
import { Icon } from '@/components/Icon';

interface ToastProps {
  variant: 'success' | 'error' | 'info';
  title: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function Toast({
  variant,
  title,
  description,
  duration,
  action,
}: ToastProps) {
  const getVariantConfig = () => {
    switch (variant) {
      case 'success':
        return {
          icon: 'checkSquare' as const,
          iconClassName: 'text-green-600',
        };
      case 'error':
        return {
          icon: 'alertSquare' as const,
          iconClassName: 'text-destructive',
        };
      case 'info':
        return {
          icon: 'checkSquare' as const, // You can change this to an info icon later
          iconClassName: 'text-blue-600',
        };
      default:
        return {
          icon: 'checkSquare' as const,
          iconClassName: 'text-gray-600',
        };
    }
  };

  const { icon, iconClassName } = getVariantConfig();

  const showToast = () => {
    sonnerToast(title, {
      description,
      duration,
      action,
      icon: <Icon name={icon} className={`h-4 w-4 ${iconClassName}`} />,
    });
  };

  // Return a function that can be called to show the toast
  return showToast;
}

// Convenience functions for each variant
export const toast = {
  success: (
    title: string,
    description?: string,
    options?: {
      duration?: number;
      action?: { label: string; onClick: () => void };
    }
  ) => {
    sonnerToast(title, {
      description,
      duration: options?.duration,
      action: options?.action,
      icon: <Icon name="checkSquare" className="h-4 w-4 text-green-600" />,
    });
  },
  error: (
    title: string,
    description?: string,
    options?: {
      duration?: number;
      action?: { label: string; onClick: () => void };
    }
  ) => {
    sonnerToast(title, {
      description,
      duration: options?.duration,
      action: options?.action,
      icon: <Icon name="alertSquare" className="text-destructive h-4 w-4" />,
    });
  },
  info: (
    title: string,
    description?: string,
    options?: {
      duration?: number;
      action?: { label: string; onClick: () => void };
    }
  ) => {
    sonnerToast(title, {
      description,
      duration: options?.duration,
      action: options?.action,
      icon: <Icon name="checkSquare" className="h-4 w-4 text-blue-600" />,
    });
  },
};
