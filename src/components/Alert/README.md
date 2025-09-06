# Alert Component

A custom wrapper component over the shadcn/ui Alert component with predefined variants for consistent usage across the application.

## Features

- **Predefined Variants**: `success`, `error`, and `info`
- **Automatic Icons**: Each variant comes with appropriate icons
- **Consistent Styling**: Unified appearance across the app
- **Type Safety**: Full TypeScript support

## Usage

```tsx
import { Alert } from '@/components/Alert';

// Success Alert
<Alert
  variant="success"
  title="Success"
  description="Your changes have been saved successfully!"
/>

// Error Alert
<Alert
  variant="error"
  title="Error"
  description="Something went wrong. Please try again."
/>

// Info Alert
<Alert
  variant="info"
  title="Information"
  description="Here's some helpful information."
/>
```

## Props

| Prop          | Type                             | Required | Description                  |
| ------------- | -------------------------------- | -------- | ---------------------------- |
| `variant`     | `'success' \| 'error' \| 'info'` | ✅       | The type of alert to display |
| `title`       | `string`                         | ✅       | The alert title text         |
| `description` | `string`                         | ❌       | Optional description text    |
| `className`   | `string`                         | ❌       | Additional CSS classes       |

## Variants

### Success

- **Icon**: CheckSquare (green)
- **Style**: Default alert with green accent
- **Use Case**: Confirmation messages, successful operations

### Error

- **Icon**: AlertSquare (red)
- **Style**: Destructive alert with red accent
- **Use Case**: Error messages, failed operations

### Info

- **Icon**: CheckSquare (blue)
- **Style**: Default alert with blue accent
- **Use Case**: Informational messages, tips

## Examples

### Simple Success Message

```tsx
<Alert variant="success" title="Profile Updated" />
```

### Error with Description

```tsx
<Alert
  variant="error"
  title="Upload Failed"
  description="The file size exceeds the 5MB limit."
/>
```

### Info Alert

```tsx
<Alert
  variant="info"
  title="Tip"
  description="You can upload JPEG or PNG images up to 5MB."
/>
```

## Migration from Raw Alert

### Before (Raw shadcn/ui Alert)

```tsx
<Alert variant="destructive">
  <Icon name="alertSquare" className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong</AlertDescription>
</Alert>
```

### After (Custom Alert Wrapper)

```tsx
<Alert variant="error" title="Error" description="Something went wrong" />
```

## Benefits

1. **Consistency**: All alerts look and behave the same way
2. **Simplicity**: Less boilerplate code
3. **Maintainability**: Centralized styling and icon management
4. **Type Safety**: Prevents invalid variant usage
5. **Accessibility**: Built-in ARIA attributes and semantic structure
