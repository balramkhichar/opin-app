'use client';

import { AnyFieldApi } from '@tanstack/react-form';
import { FormField } from '../FormField';
import { useFormContext } from '../Form';
import type { FormValues } from '@/types/form';

interface TextInputProps {
  name: keyof FormValues;
  label: string;
  type?: 'text' | 'email' | 'number' | 'tel' | 'url';
  placeholder?: string;
  className?: string;
  autoComplete?: string;
  // Using any for validators because TanStack Form's validator types are complex
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validators?: any;
}

export function TextInput({
  name,
  label,
  type = 'text',
  placeholder,
  className = '',
  autoComplete,
  validators,
}: TextInputProps) {
  const form = useFormContext();

  return (
    <form.Field name={name} validators={validators}>
      {(field: AnyFieldApi) => (
        <FormField
          field={field}
          label={label}
          type={type}
          placeholder={placeholder}
          className={className}
          autoComplete={autoComplete}
        />
      )}
    </form.Field>
  );
}
