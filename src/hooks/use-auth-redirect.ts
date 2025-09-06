import { createClient } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

/**
 * Custom hook to redirect authenticated users away from auth pages
 * @returns isLoading - true while checking auth status
 */
export function useAuthRedirect() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') ?? '/dashboard';

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          // User is logged in, redirect to dashboard
          router.push(next);
        } else {
          // User is not logged in, allow access to auth page
          setIsLoading(false);
        }
      } catch (error) {
        // On error, allow access to auth page
        console.error('Auth check failed:', error);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, next]);

  return { isLoading };
}
