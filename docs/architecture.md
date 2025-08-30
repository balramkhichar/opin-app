# Architecture

This document describes the architecture and structure of the Opin application.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + SCSS
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
│   ├── (dashboard)/    # Protected dashboard routes
│   │   ├── layout.tsx  # Dashboard layout with navigation
│   │   ├── dashboard/  # Dashboard home page
│   │   ├── profile/    # User profile page
│   │   └── projects/   # Projects page
│   ├── auth/           # Authentication pages
│   │   ├── sign-in/    # Sign-in page
│   │   ├── sign-up/    # Registration page
│   │   ├── sign-up-success/ # Success page after registration
│   │   ├── forgot-password/ # Password reset request
│   │   ├── forgot-password-success/ # Success page after password reset request
│   │   ├── update-password/ # Password update
│   │   ├── confirm/    # Email confirmation handler
│   │   └── error/      # Error page for auth failures
│   ├── globals.scss    # Global styles (SCSS)
│   └── middleware.ts   # Authentication middleware
├── components/         # Reusable components
│   ├── Form/           # Form components (TanStack Form)
│   │   ├── Form.tsx    # Main form wrapper
│   │   ├── FormField.tsx # Base form field
│   │   ├── TextInput/  # Text input component
│   │   └── PasswordInput/ # Password input component
│   ├── ui/             # UI components
│   │   └── button.tsx  # Button component
│   ├── Icon/           # Icon component
│   ├── Navigation/     # Navigation component
│   ├── Loading/        # Loading components
│   ├── Turnstile/      # CAPTCHA component
│   └── index.ts        # Component exports
├── lib/               # Utility functions
│   ├── supabase.ts    # Supabase client configuration
│   ├── supabase-server.ts # Server-side Supabase client
│   ├── auth.ts        # Authentication utilities
│   ├── auth-context.tsx # React context for auth state
│   └── utils.ts       # Utility functions
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
- **Icon** (`src/components/Icon/Icon.tsx`): SVG icon component with automatic path resolution
- **Navigation** (`src/components/Navigation/Navigation.tsx`): Sidebar navigation for dashboard
- **Loading** (`src/components/Loading/Loading.tsx`): Loading spinner and state components
- **TurnstileCaptcha** (`src/components/Turnstile/Turnstile.tsx`): CAPTCHA widget wrapper

### CAPTCHA System

The application includes Cloudflare Turnstile CAPTCHA protection:

- **TurnstileCaptcha Component** (`src/components/Turnstile/Turnstile.tsx`): CAPTCHA widget wrapper
- **Authentication Integration**: CAPTCHA tokens are passed to Supabase auth
- **Error Handling**: Comprehensive error handling for CAPTCHA failures

### Component Architecture

Components are organized with a modular structure:

- Each component has its own directory (except UI components in `ui/`)
- Components include their own README files for documentation
- TypeScript interfaces for props
- Consistent export patterns through `index.ts` files

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
