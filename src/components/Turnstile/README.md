# Turnstile Component

A wrapper component for Cloudflare Turnstile CAPTCHA that integrates seamlessly with the authentication system.

## Usage

```tsx
import { Turnstile } from '@/components';

// Basic usage
<TurnstileCaptcha
  onVerify={(token) => {
    console.log('Turnstile verified:', token);
  }}
  onError={(error) => {
    console.error('Turnstile error:', error);
  }}
/>

// With custom styling
<TurnstileCaptcha
  onVerify={handleVerify}
  onError={handleError}
  className="my-4"
/>
```

## Props

| Prop        | Type                      | Required | Description                                    |
| ----------- | ------------------------- | -------- | ---------------------------------------------- |
| `siteKey`   | `string`                  | No       | Your Turnstile site key (auto-loaded from env) |
| `onVerify`  | `(token: string) => void` | Yes      | Callback when verification succeeds            |
| `onError`   | `(error: string) => void` | Yes      | Callback when verification fails               |
| `className` | `string`                  | No       | Additional CSS classes                         |

## Environment Variables

Add these to your `.env.local` file:

```env
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
TURNSTILE_SECRET_KEY=your_turnstile_secret_key
```

## Integration with Authentication

The Turnstile component is designed to work with Supabase authentication:

```tsx
import { Turnstile } from '@/components';
import { useAuth } from '@/lib/auth-context';

function SignInForm() {
  const { signIn } = useAuth();
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const handleSignIn = async (credentials: SignInCredentials) => {
    if (!turnstileToken) {
      // Show error: CAPTCHA required
      return;
    }

    const result = await signIn({
      ...credentials,
      captchaToken: turnstileToken,
    });

    if (result.success) {
      // Redirect to dashboard
    } else {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSignIn)}>
      {/* Form fields */}

      <TurnstileCaptcha
        onVerify={setTurnstileToken}
        onError={error => {
          console.error('CAPTCHA error:', error);
          setTurnstileToken(null);
        }}
      />

      <Button type="submit" disabled={!turnstileToken}>
        Sign In
      </Button>
    </form>
  );
}
```

## Error Handling

The component provides comprehensive error handling:

```tsx
<TurnstileCaptcha
  onVerify={token => {
    console.log('Verification successful:', token);
    // Store token for form submission
  }}
  onError={error => {
    console.error('Verification failed:', error);
    // Handle different error types
    switch (error) {
      case 'network-error':
        // Handle network issues
        break;
      case 'invalid-site-key':
        // Handle configuration issues
        break;
      default:
        // Handle other errors
        break;
    }
  }}
/>
```

## Styling

The component can be styled using Tailwind CSS classes:

```tsx
<TurnstileCaptcha
  onVerify={handleVerify}
  onError={handleError}
  className="my-6 flex justify-center"
/>
```

## Security Considerations

- **Site Key**: The site key is safe to expose in client-side code
- **Secret Key**: The secret key should only be used server-side
- **Token Validation**: Always validate tokens server-side before processing
- **Rate Limiting**: Consider implementing rate limiting for CAPTCHA verification

## Troubleshooting

### Common Issues

1. **"Invalid site key" error**
   - Verify your site key is correct
   - Ensure the domain is configured in Turnstile dashboard

2. **CAPTCHA not loading**
   - Check network connectivity
   - Verify site key is properly set in environment variables

3. **Verification failing**
   - Check browser console for errors
   - Verify domain configuration in Turnstile dashboard

### Debug Mode

For development, you can enable debug mode in your Turnstile dashboard to see detailed logs.

## Best Practices

- **User Experience**: Place CAPTCHA after form fields are filled
- **Accessibility**: Ensure CAPTCHA doesn't block screen readers
- **Performance**: Load CAPTCHA only when needed
- **Fallback**: Provide alternative verification methods if needed
