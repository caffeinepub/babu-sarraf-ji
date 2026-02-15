import { useQuery } from '@tanstack/react-query';
import { useActor } from '../useActor';
import type { UserProfile } from '../../backend';
import { Principal } from '@dfinity/principal';

export function useUserProfile(principalString: string) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<UserProfile | null>({
    queryKey: ['userProfile', principalString],
    queryFn: async () => {
      if (!actor || !principalString) return null;
      try {
        const principal = Principal.fromText(principalString);
        return actor.getUserProfile(principal);
      } catch {
        return null;
      }
    },
    enabled: !!actor && !actorFetching && !!principalString,
    retry: false,
  });
}

export function useDisplayName(principalString: string) {
  const { data: profile } = useUserProfile(principalString);
  
  if (profile?.displayName) {
    return profile.displayName;
  }
  
  if (principalString) {
    return `${principalString.slice(0, 8)}...${principalString.slice(-4)}`;
  }
  
  return 'Anonymous';
}
