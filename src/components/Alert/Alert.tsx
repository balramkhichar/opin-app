'use client';

import React from 'react';
import {
  Alert as AlertPrimitive,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import { Icon } from '@/components/Icon';
import { cn } from '@/lib/utils';

interface AlertProps {
  variant: 'success' | 'error' | 'info';
  title: string;
  description?: string;
  className?: string;
}

export function Alert({ variant, title, description, className }: AlertProps) {
  const getVariantConfig = () => {
    switch (variant) {
      case 'success':
        return {
          alertVariant: 'default' as const,
          icon: 'checkSquare' as const,
          iconClassName: 'text-green-600',
        };
      case 'error':
        return {
          alertVariant: 'destructive' as const,
          icon: 'alertSquare' as const,
          iconClassName: 'text-destructive',
        };
      case 'info':
        return {
          alertVariant: 'default' as const,
          icon: 'checkSquare' as const, // You can change this to an info icon later
          iconClassName: 'text-blue-600',
        };
      default:
        return {
          alertVariant: 'default' as const,
          icon: 'checkSquare' as const,
          iconClassName: 'text-gray-600',
        };
    }
  };

  const { alertVariant, icon, iconClassName } = getVariantConfig();

  return (
    <AlertPrimitive variant={alertVariant} className={className}>
      <Icon name={icon} className={cn('h-4 w-4', iconClassName)} />
      <AlertTitle>{title}</AlertTitle>
      {description && <AlertDescription>{description}</AlertDescription>}
    </AlertPrimitive>
  );
}
