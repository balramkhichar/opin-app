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
        className="mb-2 block text-sm font-semibold"
        style={{ color: 'var(--color-foreground)' }}
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={field.name}
          name={field.name}
          type={type}
          value={field.state.value}
          onChange={e => field.handleChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className="w-full rounded-md border px-3 py-2.5 transition-all duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          style={
            {
              backgroundColor: 'var(--color-input)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-foreground)',
              '--tw-placeholder-opacity': '1',
              '--tw-placeholder-color': 'var(--color-muted-foreground)',
            } as React.CSSProperties
          }
          onFocus={e => {
            e.target.style.borderColor = 'var(--color-ring)';
            e.target.style.boxShadow = '0 0 0 2px var(--color-ring)';
          }}
          onBlur={e => {
            e.target.style.borderColor = 'var(--color-border)';
            e.target.style.boxShadow = 'none';
            field.handleBlur();
          }}
        />
        {children}
      </div>
      {hasError && (
        <p
          id={errorId}
          className="mt-1 text-sm"
          role="alert"
          style={{ color: 'var(--color-destructive)' }}
        >
          {field.state.meta.errors.join(', ')}
        </p>
      )}
    </div>
  );
}
