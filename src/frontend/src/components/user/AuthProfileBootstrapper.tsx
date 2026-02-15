import { useEffect } from 'react';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '@/hooks/useQueries';

/**
 * Non-visual component that prefetches the caller's profile after authentication
 * to ensure the UI updates without requiring a page refresh.
 */
export default function AuthProfileBootstrapper() {
  const { identity, loginStatus } = useInternetIdentity();
  const { refetch } = useGetCallerUserProfile();

  useEffect(() => {
    // Trigger profile fetch after successful login
    if (identity && loginStatus === 'success') {
      refetch();
    }
  }, [identity, loginStatus, refetch]);

  return null;
}
