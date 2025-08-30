# Authentication

The Opin application uses Supabase for authentication, providing a secure and scalable authentication system.

## Features

- **User Sign-in**: Secure email/password authentication
- **Session Management**: Automatic session handling with middleware
- **Protected Routes**: Dashboard access requires authentication
- **Logout**: Secure session termination

## Authentication Flow

1. **Sign In**: Users authenticate at the main page `/`
2. **Dashboard Access**: Authenticated users are redirected to `/dashboard`
3. **Session Persistence**: Sessions are maintained across browser sessions

## Implementation

### Auth Context

The application uses a React context (`src/lib/auth-context.tsx`) to manage authentication state globally:

```typescript
const { user, loading, signIn, signOut } = useAuth();
```

### Protected Routes

The dashboard page (`/dashboard`) is protected and only accessible to authenticated users. Unauthenticated users are automatically redirected to the sign-in page.

### Middleware

Authentication middleware (`src/middleware.ts`) handles:

- Session refresh
- Route protection
- Cookie management

## Environment Variables

Required environment variables for authentication:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Turnstile CAPTCHA (optional but recommended)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
TURNSTILE_SECRET_KEY=your_turnstile_secret_key
```

## Supabase Setup

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/sign in
2. Create a new project
3. Wait for the project to be set up (this may take a few minutes)

### 2. Get Your Project Credentials

1. Go to your project dashboard
2. Navigate to **Settings** → **API**
3. Copy your **Project URL** and **anon/public key**
4. Add these to your `.env.local` file

### 3. Configure Authentication

1. Go to **Authentication** → **Settings**
2. Configure your site URL (e.g., `http://localhost:3000` for development)
3. Add redirect URLs for your domain
4. Customize email templates if needed

### 4. Database Schema

The authentication system works out of the box with Supabase's default auth schema. No additional database setup is required for basic authentication functionality.

### 5. CAPTCHA Protection (Optional)

To enable CAPTCHA protection for additional security:

1. **Sign up for Cloudflare Turnstile**:
   - Go to [Cloudflare Turnstile](https://dash.cloudflare.com/?to=/:account/turnstile)
   - Create a new site and get your site key and secret key

2. **Configure Supabase**:
   - Go to your Supabase dashboard
   - Navigate to **Auth** → **Settings** → **Bot and Abuse Protection**
   - Enable CAPTCHA protection
   - Select "Turnstile" as the provider
   - Enter your Turnstile secret key

3. **Add Environment Variables**:
   ```env
   NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key
   TURNSTILE_SECRET_KEY=your_secret_key
   ```

The application will automatically include CAPTCHA verification on the sign-in form when these environment variables are configured.

## Usage Examples

### Sign In

```typescript
import { useAuth } from "@/lib/auth-context";

const { signIn } = useAuth();

const handleSignIn = async (email: string, password: string) => {
  const result = await signIn(email, password);
  if (result.success) {
    // Redirect to dashboard
  } else {
    // Handle error
    console.error(result.error);
  }
};
```

### Check Authentication Status

```typescript
import { useAuth } from '@/lib/auth-context';

const { user, loading } = useAuth();

if (loading) {
  return <div>Loading...</div>;
}

if (user) {
  return <div>Welcome, {user.email}!</div>;
} else {
  return <div>Please sign in</div>;
}
```

### Sign Out

```typescript
import { useAuth } from "@/lib/auth-context";

const { signOut } = useAuth();

const handleSignOut = async () => {
  await signOut();
  // User will be redirected to sign-in page
};
```
