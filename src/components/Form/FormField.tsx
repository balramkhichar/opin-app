'use client';

import { AnyFieldApi } from '@tanstack/react-form';
import { ReactNode } from 'react';

interface FormFieldProps {
  field: AnyFieldApi;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  children?: ReactNode;
  className?: string;
  autoComplete?: string;
}

export function FormField({
  field,
  label,
  type = 'text',
  placeholder,
  children,
  className = '',
  autoComplete,
}: FormFieldProps) {
  const hasError =
    field.state.meta.isTouched && field.state.meta.errors.length > 0;
  const errorId = `${field.name}-error`;

  return (
    <div className={className}>
      <label
        htmlFor={field.name}
        className="mb-2 block text-sm font-semibold text-gray-900"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={field.name}
          name={field.name}
          type={type}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={e => field.handleChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 placeholder-gray-400 transition-all duration-200 focus:border-gray-300 focus:bg-white focus:ring-2 focus:ring-gray-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
        {children}
      </div>
      {hasError && (
        <p id={errorId} className="mt-1 text-sm text-red-600" role="alert">
          {field.state.meta.errors.join(', ')}
        </p>
      )}
    </div>
  );
}
