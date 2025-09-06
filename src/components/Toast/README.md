# Toast Component

A toast notification component built on top of Sonner, providing success, error, and info variants.

## Usage

### Using the Toast component

```tsx
import { Toast } from '@/components/Toast';

const showToast = Toast({
  variant: 'success',
  title: 'Success!',
  description: 'Your action was completed successfully.',
});

// Call the function to show the toast
showToast();
```

### Using convenience functions

```tsx
import { toast } from '@/components/Toast';

// Success toast
toast.success('Success!', 'Your action was completed successfully.');

// Error toast
toast.error('Error!', 'Something went wrong.');

// Info toast
toast.info('Info', 'Here is some information.');

// With action button
toast.success('Success!', 'Your action was completed.', {
  action: {
    label: 'Undo',
    onClick: () => console.log('Undo clicked'),
  },
});
```

## Props

### Toast Component Props

- `variant`: 'success' | 'error' | 'info' - The type of toast
- `title`: string - The main message
- `description?`: string - Optional description
- `duration?`: number - How long to show the toast (default: 4000ms)
- `action?`: object - Optional action button with label and onClick

### Convenience Function Options

- `duration?`: number - How long to show the toast
- `action?`: object - Optional action button with label and onClick
