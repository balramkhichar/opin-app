import { useState, useRef } from 'react';
import type { TurnstileRef } from '@/components/Turnstile';

/**
 * Custom hook to manage CAPTCHA state and handlers
 * @returns Object containing CAPTCHA state and handlers
 */
export function useCaptcha() {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileRef>(null);

  const handleCaptchaVerify = (token: string) => {
    setCaptchaToken(token);
    setCaptchaError(null);
  };

  const handleCaptchaError = () => {
    setCaptchaError(
      'Security verification failed. Please complete the check again.'
    );
    setCaptchaToken(null);
  };

  const handleCaptchaExpire = () => {
    setCaptchaToken(null);
    setCaptchaError(
      'The security check has expired. Please complete it again.'
    );
  };

  const resetCaptcha = () => {
    turnstileRef.current?.reset();
    setCaptchaToken(null);
    setCaptchaError(null);
  };

  return {
    captchaToken,
    captchaError,
    setCaptchaError,
    turnstileRef,
    handleCaptchaVerify,
    handleCaptchaError,
    handleCaptchaExpire,
    resetCaptcha,
  };
}
