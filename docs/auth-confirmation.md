# Auth Confirmation Setup

This document explains how to set up email confirmation for user registration in the Opin application.

## Overview

The auth confirmation flow allows users to verify their email address after signing up. When a user signs up, they receive an email with a confirmation link. Clicking this link verifies their account and logs them in.

## Auth Pages Structure

The application now includes a complete auth flow with the following pages:

- `/` - Main page (redirects to auth or dashboard)
- `/auth/sign-in` - User sign-in page
- `/auth/sign-up` - User registration page
- `/auth/sign-up-success` - Success page after registration
- `/auth/forgot-password` - Password reset request page
- `/auth/forgot-password-success` - Success page after password reset request
- `/auth/update-password` - Password update page (after reset link)
- `/auth/setup` - Account setup page (for invited users)
- `/auth/confirm` - Email confirmation handler
- `/auth/error` - Error page for auth failures

## Implementation

### 1. Auth Confirmation Route Handler

The application includes a route handler at `/auth/confirm` that processes email confirmation links:

```typescript
// src/app/auth/confirm/route.ts
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = searchParams.get('next') ?? '/dashboard';

  if (token_hash && type) {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      redirect(next);
    }
  }
  redirect('/error');
}
```

### 2. Sign-up Success Page

After successful registration, users are redirected to a dedicated success page:

```typescript
// src/app/auth/sign-up-success/page.tsx
export default function SignUpSuccessPage() {
  return (
    <div className="text-center">
      <h1>Check your email</h1>
      <p>We've sent you a confirmation link to complete your registration.</p>
      <Link href="/auth/sign-in">Back to sign in</Link>
    </div>
  );
}
```

### 3. Error Page

If confirmation fails, users are redirected to an error page (`/error`) that provides clear instructions:

- Invalid or expired confirmation link
- Email confirmation already completed
- Network connectivity issues

### 4. Complete Auth Flow

The signup page (`/auth/sign-up`) includes:

- Email and password fields with validation
- Password confirmation
- CAPTCHA protection
- Redirects to success page on completion

The sign-up success page (`/auth/sign-up-success`) includes:

- Confirmation message about email verification
- Link back to sign-in page

The reset password success page (`/auth/reset-password-success`) includes:

- Confirmation message about password reset email
- Link back to sign-in page

The sign-in page (`/auth/sign-in`) includes:

- Email and password fields
- CAPTCHA protection
- "Forgot password" link
- Link to sign-up page

## Supabase Configuration

### 1. Enable Email Confirmation

1. Go to your Supabase dashboard
2. Navigate to **Authentication** → **Settings**
3. Under **User Registration**, ensure "Enable email confirmations" is checked

### 2. Configure Email Templates

#### Confirm Signup Template

1. Go to **Authentication** → **Email Templates**
2. Select the **Confirm signup** template
3. Update the confirmation URL to use the server-side flow:

**Replace this:**

```
{{ .ConfirmationURL }}
```

**With this:**

```
{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email
```

#### Invite User Template

1. Go to **Authentication** → **Email Templates**
2. Select the **Invite user** template
3. Update the invitation URL to use the server-side flow:

**Replace this:**

```
{{ .ConfirmationURL }}
```

**With this:**

```
{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=invite
```

**Customize the email content:**

```html
<h2>You have been invited to join Opin</h2>
<p>Hi there,</p>
<p>
  You have been invited to join <strong>Opin</strong> — AI-powered survey
  platform for fast, actionable feedback.
</p>
<p>Click below to accept your invitation and get started:</p>
<p>
  <a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=invite"
    >Accept Invite</a
  >
</p>
<p>If the button doesn't work, copy and paste this link into your browser:</p>
<p>{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=invite</p>
```

### 3. Configure Password Reset Template

1. Go to **Authentication** → **Email Templates**
2. Select the **Reset password** template
3. Update the reset URL:

**Replace this:**

```
{{ .ConfirmationURL }}
```

**With this:**

```
{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery
```

### 4. Set Site URL

1. Go to **Authentication** → **Settings**
2. Set your **Site URL** to your application's domain:
   - Development: `http://localhost:3000`
   - Production: `https://yourdomain.com`

### 5. Configure Redirect URLs

1. Go to **Authentication** → **Settings** → **URL Configuration**
2. Add your redirect URLs:
   - `http://localhost:3000/auth/confirm` (development)
   - `http://localhost:3000/auth/forgot-password` (development)
   - `http://localhost:3000/auth/update-password` (development)
   - `http://localhost:3000/auth/setup` (development)
   - `https://yourdomain.com/auth/confirm` (production)
   - `https://yourdomain.com/auth/forgot-password` (production)
   - `https://yourdomain.com/auth/update-password` (production)
   - `https://yourdomain.com/auth/setup` (production)

## Environment Variables

Ensure these environment variables are set in your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Testing the Flow

### Email Confirmation Flow

1. **Sign up a new user** at `/auth/sign-up`
2. **Redirect to success page** - you'll see the sign-up success page
3. **Check your email** for the confirmation link
4. **Click the confirmation link** - it should redirect to `/dashboard`
5. **Verify the user is logged in** and can access protected routes

### Password Reset Flow

1. **Go to forgot password page** at `/auth/forgot-password`
2. **Enter your email** and submit
3. **Redirect to success page** - you'll see the forgot password success page
4. **Check your email** for the reset link
5. **Click the reset link** - it should redirect to `/auth/update-password`
6. **Enter new password** and confirm
7. **Verify you're redirected** to the dashboard

### Email Invitation Flow

1. **Admin invites user** via Supabase dashboard (Authentication → Users → Invite User)
2. **User receives invitation email** with custom template
3. **User clicks invitation link** - redirects to `/auth/confirm?token_hash=...&type=invite`
4. **Confirm route processes invite** - redirects to `/auth/setup`
5. **User completes account setup** (name + password) with CAPTCHA verification
6. **User is redirected to dashboard** - account setup complete

## Troubleshooting

### Common Issues

1. **Confirmation link doesn't work**
   - Check that the email template is configured correctly
   - Verify the Site URL is set properly
   - Ensure redirect URLs are configured

2. **User redirected to error page**
   - Check Supabase logs for authentication errors
   - Verify the token hasn't expired
   - Ensure the user hasn't already confirmed their email

3. **Email not received**
   - Check spam folder
   - Verify email address is correct
   - Check Supabase email settings and quotas

4. **Password reset not working**
   - Verify the reset email template is configured
   - Check that the update-password redirect URL is added
   - Ensure the user exists in the database

### Debugging

1. **Check Supabase logs** in the dashboard under **Logs** → **Auth**
2. **Verify environment variables** are correctly set
3. **Test with a different email** to rule out email provider issues
4. **Check browser console** for any JavaScript errors

## Security Considerations

- Confirmation links expire after a set time (configurable in Supabase)
- Tokens are single-use and cannot be reused
- The confirmation process validates the token server-side
- Users are automatically logged in after successful confirmation
- Password reset links are time-limited and single-use
- All auth pages include CAPTCHA protection

## Customization

### Redirect After Confirmation

To change where users are redirected after confirmation, modify the `next` parameter in the route handler:

```typescript
const next = searchParams.get('next') ?? '/dashboard'; // Change this default
```

### Custom Error Messages

To customize error messages, modify the error page at `src/app/error/page.tsx`.

### Email Template Customization

You can customize the email templates in Supabase dashboard under **Authentication** → **Email Templates**:

- **Confirm signup** - Email confirmation template
- **Reset password** - Password reset template
- **Magic Link** - Magic link authentication (if enabled)

### Styling and Branding

All auth pages use the same styling components and can be customized by modifying:

- `src/components/Form/` - Form components
- `src/components/ui/button.tsx` - Button component
- `src/app/globals.scss` - Global styles

## Project Structure

The authentication confirmation system is integrated into the main application structure:

```
src/
├── app/
│   ├── auth/
│   │   ├── confirm/
│   │   │   └── route.ts          # Email confirmation API route
│   │   └── error/
│   │       ├── layout.tsx        # Error page layout
│   │       └── page.tsx          # Error page component
├── components/
│   ├── Form/                     # Form components
│   ├── ui/                       # UI components (Button, etc.)
│   └── Icon/                     # Icon components
├── lib/
│   ├── supabase.ts              # Supabase client
│   ├── supabase-server.ts       # Server-side Supabase client
│   └── auth.ts                  # Authentication utilities
└── types/
    └── form.ts                  # Form type definitions
```
