# Link Component

A reusable Link component that wraps Next.js Link with button link variant styling for consistent design across the application.

## Features

- **Consistent styling**: Uses button link variant for uniform appearance
- **Type safety**: Full TypeScript support with proper prop types
- **Accessibility**: Inherits button accessibility features
- **Flexible**: Supports different variants and sizes
- **Customizable**: Accepts additional className for custom styling

## Usage

```tsx
import { Link } from '@/components';

// Default usage
<Link href="/dashboard">Go to Dashboard</Link>

// With custom styling
<Link href="/auth/forgot-password" className="text-sm">
  Forgot your password?
</Link>

// External link
<Link href="https://example.com" target="_blank" rel="noopener noreferrer">
  External Link
</Link>

// With custom className
<Link href="/profile" className="text-sm">
  Profile
</Link>
```

## Props

| Prop        | Type                | Default | Description            |
| ----------- | ------------------- | ------- | ---------------------- |
| `size`      | `'sm' \| 'default'` | `'sm'`  | Link size              |
| `className` | `string`            | -       | Additional CSS classes |
| `children`  | `React.ReactNode`   | -       | Link content           |
| `...props`  | `NextLinkProps`     | -       | All Next.js Link props |

## Sizes

- **sm**: Small size (default)
- **default**: Standard button size
