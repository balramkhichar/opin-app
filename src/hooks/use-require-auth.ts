import { createClient } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Custom hook to redirect unauthenticated users to sign-in page
 * @returns isLoading - true while checking auth status
 */
export function useRequireAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          // User is not logged in, redirect to sign-in
          router.push('/auth/sign-in');
        } else {
          // User is logged in, allow access
          setIsLoading(false);
        }
      } catch (error) {
        // On error, redirect to sign-in
        console.error('Auth check failed:', error);
        router.push('/auth/sign-in');
      }
    };

    checkAuth();
  }, [router]);

  return { isLoading };
}
