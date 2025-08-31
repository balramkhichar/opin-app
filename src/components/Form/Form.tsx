'use client';

import { useForm } from '@tanstack/react-form';
import { ReactNode, createContext, useContext } from 'react';
import type { FormValues } from '@/types/form';

interface FormProps {
  children: ReactNode;
  className?: string;
  defaultValues?: Partial<FormValues>;
  onSubmit?: (values: FormValues) => void | Promise<void>;
}

// Create a context to hold the form instance
// Using any for the form context to avoid complex TanStack Form type issues
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormContext = createContext<any>(null);

export function Form({
  children,
  className = '',
  defaultValues,
  onSubmit,
}: FormProps) {
  const form = useForm({
    defaultValues: defaultValues as FormValues,
    onSubmit: async ({ value }) => {
      if (onSubmit) {
        await onSubmit(value);
      }
    },
  });

  return (
    <FormContext.Provider value={form}>
      <form
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className={className}
        noValidate
      >
        {children}
      </form>
    </FormContext.Provider>
  );
}

// Hook to access form instance
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useFormContext(): any {
  const form = useContext(FormContext);
  if (!form) {
    throw new Error('useFormContext must be used within a Form component');
  }
  return form;
}

// Form.Field component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
Form.Field = function Field(props: any) {
  const form = useFormContext();
  return <form.Field {...props} />;
};

// Form.Subscribe component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
Form.Subscribe = function Subscribe(props: any) {
  const form = useFormContext();
  return <form.Subscribe {...props} />;
};

// Export the form instance for advanced usage
export { useForm };
