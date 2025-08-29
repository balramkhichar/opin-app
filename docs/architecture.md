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
│   ├── page.tsx        # Login page
│   ├── dashboard/      # Protected dashboard page
│   ├── globals.scss    # Global styles (SCSS)
│   └── middleware.ts   # Authentication middleware
├── components/         # Reusable components
│   ├── Button/         # Button component
│   ├── Form/           # Form components
│   ├── Turnstile/      # CAPTCHA component
│   └── index.ts        # Component exports
├── lib/               # Utility functions
│   ├── supabase.ts    # Supabase client configuration
│   ├── auth.ts        # Authentication utilities
│   └── auth-context.tsx # React context for auth state
└── types/             # TypeScript type definitions
    └── form.ts        # Form-related types
```

## Key Components

### Authentication Layer

The authentication system is built around Supabase and consists of:

- **Supabase Client** (`src/lib/supabase.ts`): Browser and server-side client configuration
- **Auth Utilities** (`src/lib/auth.ts`): Core authentication functions
- **Auth Context** (`src/lib/auth-context.tsx`): React context for global auth state
- **Middleware** (`src/middleware.ts`): Route protection and session management

### Form System

The application uses TanStack React Form for form handling:

- **Form Component** (`src/components/Form/Form.tsx`): Main form wrapper
- **Text Input** (`src/components/Form/TextInput/TextInput.tsx`): Text input field
- **Password Input** (`src/components/Form/PasswordInput/PasswordInput.tsx`): Password input field
- **Form Types** (`src/types/form.ts`): TypeScript definitions for forms

### CAPTCHA System

The application includes Cloudflare Turnstile CAPTCHA protection:

- **Turnstile Component** (`src/components/Turnstile/Turnstile.tsx`): CAPTCHA widget wrapper
- **Authentication Integration**: CAPTCHA tokens are passed to Supabase auth
- **Error Handling**: Comprehensive error handling for CAPTCHA failures

### Component Architecture

Components are organized with a modular structure:

- Each component has its own directory
- Components include their own README files
- TypeScript interfaces for props
- Consistent export patterns

## Data Flow

### Authentication Flow

1. User enters credentials on login page
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
