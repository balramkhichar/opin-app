'use client';

import { AnyFieldApi } from '@tanstack/react-form';
import { useState } from 'react';
import { FormField } from '../FormField';
import { useFormContext } from '../Form';
import { Icon } from '../../Icon';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { FormValues } from '@/types/form';

interface PasswordInputProps {
  name: keyof FormValues;
  label?: React.ReactNode;
  placeholder?: string;
  className?: string;
  helpTip?: boolean;
  // Using any for validators because TanStack Form's validator types are complex
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validators?: any;
}

// Default password validator - matches Supabase requirements
const defaultPasswordValidator = {
  onChange: ({ value }: { value: string }) => {
    if (!value) return 'Password is required';
    if (value.length < 8) {
      return 'Password must be at least 8 characters';
    }

    // Check for lowercase letter
    if (!/[a-z]/.test(value)) {
      return 'Password must contain at least one lowercase letter';
    }

    // Check for uppercase letter
    if (!/[A-Z]/.test(value)) {
      return 'Password must contain at least one uppercase letter';
    }

    // Check for digit
    if (!/\d/.test(value)) {
      return 'Password must contain at least one digit';
    }

    // Check for special character
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (!specialCharRegex.test(value)) {
      return 'Password must contain at least one special character';
    }

    return undefined;
  },
};

export function PasswordInput({
  name,
  label,
  placeholder,
  className = '',
  helpTip = false,
  validators,
}: PasswordInputProps) {
  const form = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  // Use provided validators or default password validator
  const fieldValidators = validators || defaultPasswordValidator;

  // Default password requirements tooltip
  const defaultTooltip = {
    content: (
      <div>
        <div className="font-semibold">Password Requirements</div>
        <ul className="mt-2 space-y-1 text-xs">
          <li>• At least 8 characters long</li>
          <li>• Contains uppercase and lowercase letters</li>
          <li>• Contains at least one number</li>
          <li>• Contains at least one special character</li>
        </ul>
      </div>
    ),
    side: 'right' as const,
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form.Field name={name} validators={fieldValidators}>
      {(field: AnyFieldApi) => {
        const toggleId = `${field.name}-toggle`;
        const descriptionId = `${field.name}-toggle-description`;

        return (
          <FormField
            field={field}
            label={label}
            type={showPassword ? 'text' : 'password'}
            placeholder={placeholder}
            className={className}
            autoComplete="current-password"
            tooltip={helpTip ? defaultTooltip : undefined}
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleTogglePassword}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              aria-pressed={showPassword}
              aria-describedby={descriptionId}
              id={toggleId}
              className={cn(
                'absolute inset-y-0 right-0 h-9 w-9 rounded-r-md border-0',
                'hover:bg-accent/50 hover:text-accent-foreground',
                'focus:bg-accent/50 focus:text-accent-foreground',
                'text-muted-foreground'
              )}
            >
              <Icon
                name={showPassword ? 'eye' : 'eyeOff'}
                size="md"
                className="h-4 w-4"
              />
              <span id={descriptionId} className="sr-only">
                {showPassword
                  ? 'Click to hide password'
                  : 'Click to show password'}
              </span>
            </Button>
          </FormField>
        );
      }}
    </form.Field>
  );
}
