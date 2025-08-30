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

// With custom color
<Icon name="check" color="green" />
```

## Props

| Prop        | Type                           | Default          | Description                        |
| ----------- | ------------------------------ | ---------------- | ---------------------------------- |
| `name`      | `string`                       | **required**     | Icon name (without .svg extension) |
| `size`      | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`           | Icon size                          |
| `className` | `string`                       | `''`             | Additional CSS classes             |
| `color`     | `string`                       | `'currentColor'` | Icon color                         |

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
    eyeOff.svg
    close.svg
    ...
```

## Accessibility

- Icons are rendered as SVG elements and inherit the current text color by default
- Use the `color` prop to customize icon colors
- Icons are decorative by default and should be accompanied by text labels for accessibility
