# UI Components

This directory contains foundational UI components built with TypeScript and Tailwind CSS.

## Components

### Button

A versatile button component with multiple variants, sizes, and loading states.

```tsx
import { Button } from '@/components/ui/button';

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="outline">Outline Button</Button>
<Button variant="destructive">Delete</Button>
<Button variant="ghost">Ghost Button</Button>

// With sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon Only</Button>

// With loading state
<Button loading>Loading...</Button>

// With icons
<Button>
  <Icon name="check" />
  Submit
</Button>
```

#### Props

- `variant`: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
- `size`: 'default' | 'sm' | 'lg' | 'icon'
- `loading`: boolean - Shows loading spinner
- `asChild`: boolean - Renders as child component
- `disabled`: boolean - Disables the button

### Card

A card component with header, content, and footer sections.

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>;
```

#### Components

- `Card`: Main card container
- `CardHeader`: Header section with title and description
- `CardTitle`: Card title
- `CardDescription`: Card description
- `CardContent`: Main content area
- `CardFooter`: Footer section for actions
- `CardAction`: Action area in header (optional)

## Features

- **Type-safe**: Built with TypeScript for better developer experience
- **Accessible**: Proper ARIA attributes and keyboard navigation
- **Responsive**: Works across all screen sizes
- **Themeable**: Supports light and dark themes
- **Consistent**: Uses design system tokens for spacing and colors
- **Flexible**: Multiple variants and sizes for different use cases

## Usage Guidelines

1. **Button Variants**:
   - Use `default` for primary actions
   - Use `outline` for secondary actions
   - Use `destructive` for dangerous actions
   - Use `ghost` for subtle actions
   - Use `link` for navigation-like actions

2. **Card Layout**:
   - Use `CardHeader` for titles and descriptions
   - Use `CardContent` for main content
   - Use `CardFooter` for actions and buttons
   - Use `CardAction` for header-level actions

3. **Loading States**:
   - Always show loading state for async operations
   - Disable buttons during loading to prevent double-clicks
   - Use descriptive loading text when possible
