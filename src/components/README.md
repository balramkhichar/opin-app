# Components

This directory contains reusable UI components built with TypeScript and Tailwind CSS.

## Component Library

| Component            | Description                                                                  | Documentation                       |
| -------------------- | ---------------------------------------------------------------------------- | ----------------------------------- |
| **Form**             | Wrapper component for TanStack Form with consistent styling                  | [View Docs](./Form/README.md)       |
| **FormField**        | Base form field component with validation display                            | [View Docs](./Form/README.md)       |
| **TextInput**        | Text-based input field with automatic Form.Field wrapping                    | [View Docs](./Form/README.md)       |
| **PasswordInput**    | Password input field with show/hide toggle and automatic Form.Field wrapping | [View Docs](./Form/README.md)       |
| **Button**           | Reusable button with multiple variants, sizes, and loading states            | [View Docs](./ui/button.tsx)        |
| **Icon**             | SVG icon component with automatic path resolution                            | [View Docs](./Icon/README.md)       |
| **Navigation**       | Sidebar navigation component for dashboard layouts                           | [View Docs](./Navigation/README.md) |
| **Loading**          | Loading spinner and loading state components                                 | [View Docs](./Loading/README.md)    |
| **TurnstileCaptcha** | Cloudflare Turnstile CAPTCHA integration component                           | [View Docs](./Turnstile/README.md)  |

## Component Organization

- **Form Components**: Located in `./Form/` directory
- **UI Components**: Located in `./ui/` directory (Button, etc.)
- **Feature Components**: Located in their respective directories (Icon, Navigation, Loading, Turnstile)

## Usage

Import components from the main index file:

```tsx
import {
  Form,
  TextInput,
  PasswordInput,
  Button,
  Icon,
  TurnstileCaptcha,
} from '@/components';
```

Or import individual components:

```tsx
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/Icon';
```
