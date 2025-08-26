# Button Component

A reusable button component with multiple variants, sizes, and loading states.

## Usage

```tsx
import { Button } from '@/components';

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="primary">Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="outline">Outline Button</Button>

// With sizes
<Button size="sm">Small Button</Button>
<Button size="md">Medium Button</Button>
<Button size="lg">Large Button</Button>

// With loading state
<Button loading={isLoading}>Submit</Button>

// Full width
<Button fullWidth>Full Width Button</Button>
```

## Props

| Prop        | Type                                    | Default     | Description                                       |
| ----------- | --------------------------------------- | ----------- | ------------------------------------------------- |
| `variant`   | `'primary' \| 'secondary' \| 'outline'` | `'primary'` | The visual style of the button                    |
| `size`      | `'sm' \| 'md' \| 'lg'`                  | `'md'`      | The size of the button                            |
| `loading`   | `boolean`                               | `false`     | Shows a loading spinner and disables the button   |
| `fullWidth` | `boolean`                               | `false`     | Makes the button take full width of its container |
| `disabled`  | `boolean`                               | `false`     | Disables the button                               |
| `children`  | `ReactNode`                             | -           | The content inside the button                     |

## Variants

### Primary

Default button style with dark background and white text.

```tsx
<Button variant="primary">Primary Button</Button>
```

### Secondary

Light background with dark text, good for secondary actions.

```tsx
<Button variant="secondary">Secondary Button</Button>
```

### Outline

Bordered button with transparent background.

```tsx
<Button variant="outline">Outline Button</Button>
```

## Sizes

### Small (`sm`)

Compact button for tight spaces.

```tsx
<Button size="sm">Small Button</Button>
```

### Medium (`md`)

Default size, good for most use cases.

```tsx
<Button size="md">Medium Button</Button>
```

### Large (`lg`)

Larger button for prominent actions.

```tsx
<Button size="lg">Large Button</Button>
```

## Loading State

The button shows a spinner and becomes disabled when `loading` is true.

```tsx
const [isLoading, setIsLoading] = useState(false);

<Button
  loading={isLoading}
  onClick={async () => {
    setIsLoading(true);
    await someAsyncOperation();
    setIsLoading(false);
  }}
>
  {isLoading ? 'Processing...' : 'Submit'}
</Button>;
```

## Examples

### Form Submit Button

```tsx
<Form.Subscribe selector={state => [state.canSubmit, state.isSubmitting]}>
  {([canSubmit, submitting]) => (
    <Button type="submit" disabled={!canSubmit} loading={submitting} fullWidth>
      {submitting ? 'Submitting...' : 'Submit'}
    </Button>
  )}
</Form.Subscribe>
```

### Action Buttons

```tsx
<div className="flex gap-2">
  <Button variant="outline" size="sm">
    Cancel
  </Button>
  <Button variant="primary" size="sm">
    Save
  </Button>
</div>
```

### Loading Button

```tsx
<Button variant="primary" loading={isLoading} disabled={isLoading}>
  {isLoading ? 'Processing...' : 'Process Data'}
</Button>
```

## Styling

The button uses Tailwind CSS classes and includes:

- Focus states with ring indicators
- Hover effects
- Disabled states with opacity
- Smooth transitions
- Loading spinner animation

## Accessibility

- Proper focus management
- Keyboard navigation support
- ARIA attributes for loading states
- Disabled state handling
