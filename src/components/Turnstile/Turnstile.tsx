"use client";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";

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
  ({ onVerify, onError, onExpire, className = "" }, ref) => {
    const turnstileRef = useRef<TurnstileInstance>(null);

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

    return (
      <div className={`turnstile-container ${className}`}>
        <Turnstile
          ref={turnstileRef}
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
          onSuccess={handleVerify}
          onError={handleError}
          onExpire={handleExpire}
          options={{
            theme: "light",
            size: "normal",
          }}
        />
      </div>
    );
  },
);

TurnstileCaptcha.displayName = "TurnstileCaptcha";
