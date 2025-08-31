# Icon Component

A reusable icon component that provides access to predefined SVG icons through individual icon components.

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

| Prop        | Type                           | Default          | Description                    |
| ----------- | ------------------------------ | ---------------- | ------------------------------ |
| `name`      | `string`                       | **required**     | Icon name from available icons |
| `size`      | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`           | Icon size                      |
| `className` | `string`                       | `''`             | Additional CSS classes         |
| `color`     | `string`                       | `'currentColor'` | Icon color                     |

## Size Mapping

| Size | Width/Height | CSS Classes |
| ---- | ------------ | ----------- |
| `sm` | 16px         | `w-4 h-4`   |
| `md` | 20px         | `w-5 h-5`   |
| `lg` | 24px         | `w-6 h-6`   |
| `xl` | 32px         | `w-8 h-8`   |

## Available Icons

The following icons are available for use:

- `menu` - Menu/hamburger icon
- `user` - User/profile icon
- `check` - Checkmark icon
- `close` - Close/X icon
- `logIn` - Login icon
- `logOut` - Logout icon
- `mail` - Email/mail icon
- `home` - Home icon
- `eye` - Eye/visibility icon
- `eyeOff` - Eye-off/hidden icon
- `settings` - Settings/gear icon

## Icon Components

Icons are implemented as individual React components in the `./icons/` directory. Each icon component accepts:

- `size`: number - Width and height in pixels
- `className`: string - Additional CSS classes
- `color`: string - Icon color

## Accessibility

- Icons are rendered as SVG elements and inherit the current text color by default
- Use the `color` prop to customize icon colors
- Icons are decorative by default and should be accompanied by text labels for accessibility
- The component will warn in the console if an icon name is not found
