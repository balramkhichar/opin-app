# Loading Component

A reusable loading component that provides consistent loading states and spinners throughout the application.

## Usage

```tsx
import Loading from '@/components/Loading';

// Basic loading spinner
<Loading />

// Loading with custom text
<Loading text="Loading your data..." />

// Loading with custom size
<Loading size="lg" />

// Loading with custom styling
<Loading className="text-blue-500" />
```

## Props

| Prop        | Type                           | Default        | Description                 |
| ----------- | ------------------------------ | -------------- | --------------------------- |
| `text`      | `string`                       | `'Loading...'` | Loading text to display     |
| `size`      | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`         | Size of the loading spinner |
| `className` | `string`                       | `''`           | Additional CSS classes      |

## Size Mapping

| Size | Spinner Size | Text Size   |
| ---- | ------------ | ----------- |
| `sm` | 16px         | `text-sm`   |
| `md` | 24px         | `text-base` |
| `lg` | 32px         | `text-lg`   |
| `xl` | 48px         | `text-xl`   |

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
    return <Loading text="Fetching your data..." />;
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
          <Loading size="sm" text="" />
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
        <Loading size="lg" text="Loading dashboard..." />
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
