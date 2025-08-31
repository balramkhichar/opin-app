# Form Components

This directory contains form-related components built on top of TanStack Form that provide consistent styling and functionality using shadcn/ui components.

## Components

### Form

A wrapper component that provides TanStack Form functionality with consistent styling using shadcn/ui design system.

```tsx
import { Form } from '@/components';

<Form
  defaultValues={{
    email: '',
    password: '',
  }}
  onSubmit={async values => {
    // Handle form submission
    console.log(values);
  }}
  className="space-y-6"
>
  {/* Form fields go here */}
</Form>;
```

### FormField

A base form field component with built-in validation display using shadcn/ui Input and Label components. This is the foundation for all form inputs.

```tsx
import { Form, FormField } from '@/components';

<Form.Field
  name="email"
  validators={{
    onChange: ({ value }) => {
      if (!value) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Please enter a valid email address';
      }
      return undefined;
    },
  }}
>
  {field => (
    <FormField
      field={field}
      label="Email"
      type="email"
      placeholder="Enter your email"
    />
  )}
</Form.Field>;
```

### TextInput

A specialized text input component for text-based fields (text, email, number, tel, url). Automatically wraps Form.Field for convenience.

```tsx
import { Form, TextInput } from '@/components';

<TextInput
  name="email"
  label="Email"
  type="email"
  placeholder="Enter your email"
  validators={{
    onChange: ({ value }) => {
      if (!value) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Please enter a valid email address';
      }
      return undefined;
    },
  }}
/>;
```

### PasswordInput

A specialized password input field with show/hide toggle functionality using shadcn/ui Button component. Automatically wraps Form.Field for convenience.

```tsx
import { Form, PasswordInput } from '@/components';

<PasswordInput
  name="password"
  label="Password"
  placeholder="Enter your password"
  validators={{
    onChange: ({ value }) => {
      if (!value) return 'Password is required';
      if (value.length < 8) {
        return 'Password must be at least 8 characters';
      }
      return undefined;
    },
  }}
/>;
```

## Features

- **TanStack Form Integration**: Built on top of TanStack Form for powerful form management
- **shadcn/ui Components**: Uses shadcn/ui Input, Label, and Button components for consistent design
- **Type-safe**: Built with TypeScript for better developer experience
- **Consistent styling**: Uses shadcn/ui design system for consistent theming
- **Validation**: Built-in validation display with error messages
- **Debounced Validation**: Built-in debounced validation (500ms delay) to prevent showing errors while typing
- **Accessibility**: Proper labels, focus states, and keyboard navigation
- **Reusable**: Can be used across different forms in the application
- **Modular**: Separate components for different input types
- **Simplified API**: TextInput and PasswordInput automatically wrap Form.Field
- **Theme Support**: Full dark mode and theme switching support through shadcn/ui

## Debounced Validation

The form components now include debounced validation by default to improve user experience by preventing validation errors from appearing immediately as users type. This is especially useful for complex validation rules or when you want to give users time to complete their input.

### How it works

- **Default behavior**: Validation errors are delayed by 500ms after the user stops typing
- **Error clearing**: Errors are cleared immediately when validation passes or when the field is not touched
- **Built-in**: No configuration needed - debounced validation is enabled by default

### Benefits

- **Better UX**: Users don't see errors while actively typing
- **Reduced visual noise**: Prevents error messages from flashing during input
- **Automatic**: Works out of the box without any additional configuration
- **Performance**: Reduces unnecessary validation calls during rapid typing

## shadcn/ui Integration

The form components now use shadcn/ui components as their foundation:

- **Input**: Uses shadcn/ui Input component with proper focus states and theming
- **Label**: Uses shadcn/ui Label component with Radix UI primitives
- **Button**: Password toggle uses shadcn/ui Button component with ghost variant
- **Styling**: Leverages shadcn/ui's design tokens and CSS variables

This provides:

- Better focus ring management
- Consistent theming across light/dark modes
- Improved accessibility features
- Better component composition

## Advanced Usage

### Using useFormContext

For advanced use cases, you can access the form instance directly:

```tsx
import { Form, useFormContext } from '@/components';

function CustomField() {
  const form = useFormContext();

  return (
    <div>
      <input
        value={form.getFieldValue('customField')}
        onChange={e => form.setFieldValue('customField', e.target.value)}
      />
    </div>
  );
}
```

### Form State Subscription

Subscribe to form state changes:

```tsx
<Form.Subscribe selector={state => [state.canSubmit, state.isSubmitting]}>
  {([canSubmit, submitting]) => (
    <button disabled={!canSubmit}>
      {submitting ? 'Submitting...' : 'Submit'}
    </button>
  )}
</Form.Subscribe>
```

### Direct shadcn/ui Component Usage

You can also use the shadcn/ui components directly with TanStack Form:

```tsx
import { Form, Input, Label } from '@/components';

<Form.Field name="custom" validators={{...}}>
  {field => (
    <div className="space-y-2">
      <Label htmlFor={field.name}>Custom Field</Label>
      <Input
        id={field.name}
        value={field.state.value}
        onChange={e => field.handleChange(e.target.value)}
        onBlur={() => field.handleBlur()}
      />
    </div>
  )}
</Form.Field>
```
