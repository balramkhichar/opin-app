'use client';
import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
  useState,
} from 'react';
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';
import { useTheme } from 'next-themes';

export interface TurnstileProps {
  onVerify: (token: string) => void;
  onError?: (error: string) => void;
  onExpire?: () => void;
  className?: string;
}

export interface TurnstileRef {
  reset: () => void;
}

export const TurnstileCaptcha = forwardRef<TurnstileRef, TurnstileProps>(
  ({ onVerify, onError, onExpire, className = '' }, ref) => {
    const turnstileRef = useRef<TurnstileInstance>(null);
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    const handleVerify = (token: string) => {
      onVerify(token);
    };

    const handleError = (error: string) => {
      onError?.(error);
    };

    const handleExpire = () => {
      onExpire?.();
    };

    const reset = () => {
      if (turnstileRef.current) {
        turnstileRef.current.reset();
      }
    };

    useImperativeHandle(ref, () => ({
      reset,
    }));

    // Use default theme until component is mounted to prevent hydration mismatch
    const theme = mounted && resolvedTheme === 'dark' ? 'dark' : 'light';

    return (
      <div className={`turnstile-container ${className}`}>
        <Turnstile
          ref={turnstileRef}
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
          onSuccess={handleVerify}
          onError={handleError}
          onExpire={handleExpire}
          options={{
            theme,
            size: 'normal',
          }}
        />
      </div>
    );
  }
);

TurnstileCaptcha.displayName = 'TurnstileCaptcha';
