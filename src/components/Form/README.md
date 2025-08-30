# Form Components

This directory contains form-related components built on top of TanStack Form that provide consistent styling and functionality.

## Components

### Form

A wrapper component that provides TanStack Form functionality with consistent styling.

```tsx
import { Form } from "@/components";

<Form
  defaultValues={{
    email: "",
    password: "",
  }}
  onSubmit={async (values) => {
    // Handle form submission
    console.log(values);
  }}
  className="space-y-6"
>
  {/* Form fields go here */}
</Form>;
```

### FormField

A base form field component with built-in validation display. This is the foundation for all form inputs.

```tsx
import { Form, FormField } from "@/components";

<Form.Field
  name="email"
  validators={{
    onChange: ({ value }) => {
      if (!value) return "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return "Please enter a valid email address";
      }
      return undefined;
    },
  }}
>
  {(field) => (
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
import { Form, TextInput } from "@/components";

<TextInput
  name="email"
  label="Email"
  type="email"
  placeholder="Enter your email"
  validators={{
    onChange: ({ value }) => {
      if (!value) return "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return "Please enter a valid email address";
      }
      return undefined;
    },
  }}
/>;
```

### PasswordInput

A specialized password input field with show/hide toggle functionality. Automatically wraps Form.Field for convenience.

```tsx
import { Form, PasswordInput } from "@/components";

const [showPassword, setShowPassword] = useState(false);

<PasswordInput
  name="password"
  label="Password"
  placeholder="Enter your password"
  showPassword={showPassword}
  onTogglePassword={() => setShowPassword(!showPassword)}
  validators={{
    onChange: ({ value }) => {
      if (!value) return "Password is required";
      if (value.length < 6) {
        return "Password must be at least 6 characters";
      }
      return undefined;
    },
  }}
/>;
```

## Features

- **Type-safe**: Built with TypeScript for better developer experience
- **Consistent styling**: Uses Tailwind CSS for consistent design
- **Validation**: Built-in validation display with error messages
- **Accessibility**: Proper labels, focus states, and keyboard navigation
- **Reusable**: Can be used across different forms in the application
- **Modular**: Separate components for different input types
- **Simplified API**: TextInput and PasswordInput automatically wrap Form.Field

## Advanced Usage

### Using useFormContext

For advanced use cases, you can access the form instance directly:

```tsx
import { Form, useFormContext } from "@/components";

function CustomField() {
  const form = useFormContext();

  return (
    <div>
      <input
        value={form.getFieldValue("customField")}
        onChange={(e) => form.setFieldValue("customField", e.target.value)}
      />
    </div>
  );
}
```

### Form State Subscription

Subscribe to form state changes:

```tsx
<Form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
  {([canSubmit, submitting]) => (
    <button disabled={!canSubmit}>
      {submitting ? "Submitting..." : "Submit"}
    </button>
  )}
</Form.Subscribe>
```
