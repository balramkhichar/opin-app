# Loading Component

A reusable loading component that provides consistent loading states and spinners throughout the application.

## Usage

```tsx
import { Loading } from '@/components';

// Basic loading spinner
<Loading />

// Loading with custom text
<Loading>Loading your data...</Loading>

// Loading with custom size
<Loading size="lg" />

// Loading with custom styling
<Loading className="text-blue-500" />
```

## Props

| Prop        | Type                   | Default     | Description                 |
| ----------- | ---------------------- | ----------- | --------------------------- |
| `children`  | `ReactNode`            | `undefined` | Loading text to display     |
| `size`      | `'sm' \| 'md' \| 'lg'` | `'md'`      | Size of the loading spinner |
| `className` | `string`               | `''`        | Additional CSS classes      |

## Size Mapping

| Size | Spinner Size | CSS Classes |
| ---- | ------------ | ----------- |
| `sm` | 16px         | `h-4 w-4`   |
| `md` | 24px         | `h-6 w-6`   |
| `lg` | 32px         | `h-8 w-8`   |

## Examples

### Basic Loading State

```tsx
function MyComponent() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Loading />;
  }

  return <div>Content loaded!</div>;
}
```

### Loading with Custom Text

```tsx
function DataComponent() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Loading>Fetching your data...</Loading>;
  }

  return <div>Data loaded!</div>;
}
```

### Loading in Button

```tsx
function SubmitButton() {
  const [submitting, setSubmitting] = useState(false);

  return (
    <Button disabled={submitting}>
      {submitting ? (
        <>
          <Loading size="sm" />
          Submitting...
        </>
      ) : (
        'Submit'
      )}
    </Button>
  );
}
```

### Full Page Loading

```tsx
function DashboardLayout({ children }) {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loading size="lg">Loading dashboard...</Loading>
      </div>
    );
  }

  return <div>{children}</div>;
}
```

## Styling

The component uses Tailwind CSS classes and can be customized through:

- CSS custom properties for theming
- Tailwind CSS utility classes
- Custom CSS classes passed via className prop

## Accessibility

- The loading spinner is marked with `aria-hidden="true"`
- Loading text is properly announced to screen readers
- The component follows ARIA best practices for loading states

## Integration

This component is commonly used in:

- **Authentication flows**: While checking user session
- **Data fetching**: While loading API data
- **Form submissions**: While processing form data
- **Page transitions**: While loading new pages
- **Dashboard initialization**: While setting up dashboard state
