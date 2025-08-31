'use client';

import { AnyFieldApi } from '@tanstack/react-form';
import { ReactNode } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  field: AnyFieldApi;
  label?: ReactNode;
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
    <div className={cn('space-y-2', className)}>
      {label &&
        (typeof label === 'string' ? (
          <Label htmlFor={field.name} className="text-sm font-medium">
            {label}
          </Label>
        ) : (
          label
        ))}
      <div className="relative">
        <Input
          id={field.name}
          name={field.name}
          type={type}
          value={field.state.value}
          onChange={e => field.handleChange(e.target.value)}
          onBlur={() => field.handleBlur()}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className={cn(children && 'pr-10')}
        />
        {children}
      </div>
      {hasError && (
        <p id={errorId} className="text-destructive text-sm" role="alert">
          {field.state.meta.errors.join(', ')}
        </p>
      )}
    </div>
  );
}
