'use client';

import { AnyFieldApi } from '@tanstack/react-form';
import Image from 'next/image';
import { useState } from 'react';
import { FormField } from '../FormField';
import { useFormContext } from '../Form';
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
      {(field: AnyFieldApi) => (
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
            aria-describedby={`${field.name}-toggle-description`}
            className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400 transition-colors duration-200 hover:text-gray-600"
          >
            <Image
              src={showPassword ? '/icons/eye.svg' : '/icons/eye-off.svg'}
              alt=""
              width={20}
              height={20}
              className="h-5 w-5"
              aria-hidden="true"
            />
            <span id={`${field.name}-toggle-description`} className="sr-only">
              {showPassword
                ? 'Click to hide password'
                : 'Click to show password'}
            </span>
          </button>
        </FormField>
      )}
    </form.Field>
  );
}
