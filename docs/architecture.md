# Architecture

This document describes the architecture and structure of the Opin application.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + CSS
- **Authentication & Database**: Supabase
- **Form Handling**: TanStack React Form
- **CAPTCHA Protection**: Cloudflare Turnstile
- **Code Quality**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged
- **Deployment**: Vercel

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx      # Root layout with AuthProvider
│   ├── page.tsx        # Main page (redirects to auth or dashboard)
│   ├── (secure)/       # Protected routes
│   │   ├── layout.tsx  # Secure layout with navigation
│   │   ├── Navigation.tsx # Navigation component
│   │   ├── dashboard/  # Dashboard home page
│   │   └── profile/    # User profile page
│   ├── auth/           # Authentication pages
│   │   ├── sign-in/    # Sign-in page
│   │   ├── sign-up/    # Registration page
│   │   ├── sign-up-success/ # Success page after registration
│   │   ├── forgot-password/ # Password reset request
│   │   ├── forgot-password-success/ # Success page after password reset request
│   │   ├── update-password/ # Password update
│   │   ├── confirm/    # Email confirmation handler
│   │   └── error/      # Error page for auth failures
│   ├── globals.css     # Global styles (CSS)
│   └── middleware.ts   # Authentication middleware
├── components/         # Reusable components
│   ├── Alert/          # Alert component for notifications
│   ├── Breadcrumb/     # Breadcrumb navigation
│   ├── Form/           # Form components (TanStack Form)
│   │   ├── Form.tsx    # Main form wrapper
│   │   ├── FormField.tsx # Base form field
│   │   ├── TextInput/  # Text input component
│   │   └── PasswordInput/ # Password input component
│   ├── Icon/           # Icon component with SVG icons
│   ├── Link/           # Link component
│   ├── Loading/        # Loading components
│   ├── Sidebar/        # Sidebar component
│   ├── Turnstile/      # CAPTCHA component
│   ├── ui/             # shadcn/ui components
│   │   ├── alert.tsx   # Alert component
│   │   ├── avatar.tsx  # Avatar component
│   │   ├── button.tsx  # Button component
│   │   ├── card.tsx    # Card component
│   │   └── ...         # Other UI components
│   └── index.ts        # Component exports
├── lib/               # Utility functions
│   ├── supabase.ts    # Supabase client configuration
│   ├── supabase-server.ts # Server-side Supabase client
│   ├── auth.ts        # Authentication utilities
│   ├── auth-context.tsx # React context for auth state
│   ├── avatar.ts      # Avatar upload utilities
│   └── utils.ts       # Utility functions
├── hooks/             # Custom React hooks
│   ├── use-auth-redirect.ts # Auth redirect logic
│   ├── use-breadcrumb.ts # Breadcrumb hook
│   ├── use-captcha.ts # CAPTCHA state management
│   └── use-mobile.ts  # Mobile detection hook
└── types/             # TypeScript type definitions
    └── form.ts        # Form-related types
```

## Key Components

### Authentication Layer

The authentication system is built around Supabase and consists of:

- **Supabase Client** (`src/lib/supabase.ts`): Browser and server-side client configuration
- **Supabase Server** (`src/lib/supabase-server.ts`): Server-side client for SSR
- **Auth Utilities** (`src/lib/auth.ts`): Core authentication functions
- **Auth Context** (`src/lib/auth-context.tsx`): React context for global auth state
- **Middleware** (`src/middleware.ts`): Route protection and session management

### Custom Hooks

The application includes several custom hooks for common functionality:

- **useAuthRedirect** (`src/hooks/use-auth-redirect.ts`): Centralized auth redirect logic for auth pages
- **useCaptcha** (`src/hooks/use-captcha.ts`): CAPTCHA state management and handlers
- **useBreadcrumb** (`src/hooks/use-breadcrumb.ts`): Breadcrumb navigation state
- **useMobile** (`src/hooks/use-mobile.ts`): Mobile device detection

### Form System

The application uses TanStack React Form for form handling:

- **Form Component** (`src/components/Form/Form.tsx`): Main form wrapper
- **FormField Component** (`src/components/Form/FormField.tsx`): Base form field with validation
- **Text Input** (`src/components/Form/TextInput/TextInput.tsx`): Text input field
- **Password Input** (`src/components/Form/PasswordInput/PasswordInput.tsx`): Password input field
- **Form Types** (`src/types/form.ts`): TypeScript definitions for forms

### UI Components

The application includes a comprehensive UI component library:

- **Button** (`src/components/ui/button.tsx`): Reusable button with variants and loading states
- **Card** (`src/components/ui/card.tsx`): Card component with header, content, and footer sections
- **Icon** (`src/components/Icon/Icon.tsx`): SVG icon component with automatic path resolution
- **Navigation** (`src/components/Navigation/Navigation.tsx`): Sidebar navigation for dashboard
- **Loading** (`src/components/Loading/Loading.tsx`): Loading spinner and state components
- **TurnstileCaptcha** (`src/components/Turnstile/Turnstile.tsx`): CAPTCHA widget wrapper
- **ThemeProvider** (`src/components/theme-provider.tsx`): Theme provider for dark/light mode support

### CAPTCHA System

The application includes Cloudflare Turnstile CAPTCHA protection:

- **TurnstileCaptcha Component** (`src/components/Turnstile/Turnstile.tsx`): CAPTCHA widget wrapper
- **Authentication Integration**: CAPTCHA tokens are passed to Supabase auth
- **Error Handling**: Comprehensive error handling for CAPTCHA failures

### Avatar System

The application includes a comprehensive avatar upload and management system:

- **Avatar Utilities** (`src/lib/avatar.ts`): Core avatar upload, delete, and validation functions
- **Profile Page** (`src/app/(secure)/profile/page.tsx`): User profile management with avatar support
- **Storage Integration**: Supabase Storage with Row Level Security (RLS) policies
- **File Validation**: Comprehensive validation for file type, size, and security
- **Automatic Cleanup**: Old avatars are automatically deleted when new ones are uploaded
- **Security**: UUID-based filename generation with user isolation via RLS policies

### Component Architecture

Components are organized with a modular structure:

- Each component has its own directory (except UI components in `ui/`)
- Components include their own README files for documentation
- TypeScript interfaces for props
- Consistent export patterns through `index.ts` files
- Theme support through ThemeProvider for dark/light mode switching

## Data Flow

### Authentication Flow

1. User enters credentials on sign-in page
2. Form validation occurs client-side
3. Credentials sent to Supabase via auth context
4. Supabase validates and returns session
5. Session stored in auth context
6. User redirected to protected dashboard

### State Management

- **Global State**: Authentication state managed via React Context
- **Local State**: Form state managed by TanStack React Form
- **Server State**: Supabase handles session persistence

## Security

### Authentication Security

- JWT tokens managed by Supabase
- Secure cookie storage
- Automatic session refresh
- Route protection via middleware

### Data Protection

- Row Level Security (RLS) in Supabase
- Environment variable protection
- No sensitive data in client-side code

## Performance

### Optimization Strategies

- **Turbopack**: Faster builds and development
- **Code Splitting**: Automatic by Next.js App Router
- **Image Optimization**: Next.js Image component
- **Bundle Optimization**: Tree shaking and minification

### Caching

- Supabase client-side caching
- Next.js built-in caching
- Static asset optimization

## Scalability

### Architecture Benefits

- **Modular Components**: Easy to extend and maintain
- **Type Safety**: TypeScript throughout the codebase
- **Separation of Concerns**: Clear boundaries between layers
- **API-First**: Supabase provides scalable backend

### Future Considerations

- Database schema can be extended
- Additional authentication methods can be added
- Component library can be expanded
- API routes can be added for custom logic
