# Icon Component

A reusable icon component that automatically builds the path to SVG icons in the `/public/icons/` directory.

## Usage

```tsx
import { Icon } from '@/components';

// Basic usage
<Icon name="home" />

// With custom size
<Icon name="settings" size="lg" />

// With custom styling
<Icon name="mail" className="text-blue-500" />

// With alt text for accessibility
<Icon name="check" alt="Success indicator" />
```

## Props

| Prop        | Type                           | Default      | Description                        |
| ----------- | ------------------------------ | ------------ | ---------------------------------- |
| `name`      | `string`                       | **required** | Icon name (without .svg extension) |
| `size`      | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`       | Icon size                          |
| `className` | `string`                       | `''`         | Additional CSS classes             |
| `alt`       | `string`                       | `''`         | Alt text for accessibility         |

## Size Mapping

| Size | Width/Height | CSS Classes |
| ---- | ------------ | ----------- |
| `sm` | 16px         | `w-4 h-4`   |
| `md` | 20px         | `w-5 h-5`   |
| `lg` | 24px         | `w-6 h-6`   |
| `xl` | 32px         | `w-8 h-8`   |

## Icon Files

Icons should be placed in `/public/icons/` directory as SVG files. The component automatically appends `.svg` to the name prop.

**Example file structure:**

```
public/
  icons/
    home.svg
    settings.svg
    mail.svg
    check.svg
    eye.svg
    eye-off.svg
    close.svg
    ...
```

## Accessibility

- Icons are automatically marked as `aria-hidden="true"` when no alt text is provided
- When alt text is provided, the icon becomes accessible to screen readers
- Always provide meaningful alt text for icons that convey information
