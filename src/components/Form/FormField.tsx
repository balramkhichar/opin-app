'use client';

import { AnyFieldApi } from '@tanstack/react-form';
import { ReactNode, useEffect, useRef, useState } from 'react';
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
  const debounceDelay = 500; // Default debounce delay
  const [debouncedErrors, setDebouncedErrors] = useState<string[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  // Handle debounced validation
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Only debounce if the field has been touched and has errors
    if (field.state.meta.isTouched && field.state.meta.errors.length > 0) {
      timeoutRef.current = setTimeout(() => {
        setDebouncedErrors(field.state.meta.errors);
      }, debounceDelay);
    } else {
      // Clear errors immediately if no errors or not touched
      setDebouncedErrors([]);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [field.state.meta.errors, field.state.meta.isTouched, debounceDelay]);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const hasError = field.state.meta.isTouched && debouncedErrors.length > 0;
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
        <p
          id={errorId}
          className="text-destructive text-sm font-medium"
          role="alert"
        >
          {debouncedErrors.join(', ')}
        </p>
      )}
    </div>
  );
}
