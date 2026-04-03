import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { ExternalBlob } from '../backend';
import { useInternetIdentity } from './useInternetIdentity';

const BACKGROUND_QUERY_KEY = ['dashboardBackground'];

export function useGetDashboardBackground() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const query = useQuery<ExternalBlob | null>({
    queryKey: BACKGROUND_QUERY_KEY,
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      try {
        const result = await actor.getBackground();
        return result;
      } catch (err: any) {
        // Backend traps with "No background set" when no background exists
        // Treat this as null (no background) rather than an error
        const msg = err?.message || String(err);
        if (msg.includes('No background set')) {
          return null;
        }
        // Also handle unauthenticated gracefully
        if (msg.includes('sign in') || msg.includes('Unauthorized')) {
          return null;
        }
        throw err;
      }
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
    backgroundUrl: query.data ? query.data.getDirectURL() : null,
  };
}

export function useSaveDashboardBackground() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ file, onProgress }: { file: File; onProgress?: (pct: number) => void }) => {
      if (!actor) throw new Error('Actor not available');

      // Read file as ArrayBuffer then convert to Uint8Array
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);

      // Create ExternalBlob with optional upload progress tracking
      let blob = ExternalBlob.fromBytes(bytes);
      if (onProgress) {
        blob = blob.withUploadProgress(onProgress);
      }

      await actor.saveBackground(blob);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BACKGROUND_QUERY_KEY });
    },
  });
}

export function useClearDashboardBackground() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      await actor.removeBackground();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BACKGROUND_QUERY_KEY });
    },
  });
}
