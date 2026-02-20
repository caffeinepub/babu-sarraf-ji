import { useEffect } from 'react';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useGetCallerUserProfile, useSaveCallerUserProfile } from '@/hooks/useQueries';

/**
 * Non-visual component that automatically syncs the authenticated user's profile after login,
 * creating a default profile with displayName derived from identity if none exists.
 */
export default function AuthProfileBootstrapper() {
  const { identity, loginStatus } = useInternetIdentity();
  const { data: profile, refetch, isFetched } = useGetCallerUserProfile();
  const saveProfile = useSaveCallerUserProfile();

  useEffect(() => {
    // Trigger profile fetch after successful login
    if (identity && loginStatus === 'success') {
      refetch();
    }
  }, [identity, loginStatus, refetch]);

  useEffect(() => {
    // Auto-create profile if user is authenticated but has no profile
    if (identity && isFetched && profile === null && !saveProfile.isPending) {
      const principalString = identity.getPrincipal().toString();
      const defaultDisplayName = `User ${principalString.slice(0, 8)}`;
      
      saveProfile.mutate({
        displayName: defaultDisplayName,
        email: undefined,
        photoUrl: undefined,
      });
    }
  }, [identity, isFetched, profile, saveProfile]);

  return null;
}
