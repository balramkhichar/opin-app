'use client';

import { AnyFieldApi } from '@tanstack/react-form';
import { useState } from 'react';
import { FormField } from '../FormField';
import { useFormContext } from '../Form';
import { Icon } from '../../Icon';
import type { FormValues } from '@/types/form';

interface PasswordInputProps {
  name: keyof FormValues;
  label: string;
  placeholder?: string;
  className?: string;
  // Using any for validators because TanStack Form's validator types are complex
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validators?: any;
}

// Default password validator
const defaultPasswordValidator = {
  onChange: ({ value }: { value: string }) => {
    if (!value) return 'Password is required';
    if (value.length < 8) {
      return 'Password must be at least 8 characters';
    }
    // Check for at least 1 special character
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (!specialCharRegex.test(value)) {
      return 'Password must contain at least 1 special character';
    }
    return undefined;
  },
};

export function PasswordInput({
  name,
  label,
  placeholder,
  className = '',
  validators,
}: PasswordInputProps) {
  const form = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  // Use provided validators or default password validator
  const fieldValidators = validators || defaultPasswordValidator;

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
          >
            <button
              type="button"
              onClick={handleTogglePassword}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              aria-pressed={showPassword}
              aria-describedby={descriptionId}
              id={toggleId}
              className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 transition-colors duration-200"
              style={{
                color: 'var(--color-muted-foreground)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--color-foreground)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--color-muted-foreground)';
              }}
            >
              <Icon
                name={showPassword ? 'eye' : 'eyeOff'}
                size="md"
                className="h-5 w-5"
              />
              <span id={descriptionId} className="sr-only">
                {showPassword
                  ? 'Click to hide password'
                  : 'Click to show password'}
              </span>
            </button>
          </FormField>
        );
      }}
    </form.Field>
  );
}
