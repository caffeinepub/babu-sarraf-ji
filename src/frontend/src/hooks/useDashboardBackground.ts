import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { ExternalBlob } from '../backend';

export function useGetDashboardBackground() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<ExternalBlob | null>({
    queryKey: ['dashboardBackground'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getDashboardBackground();
    },
    enabled: !!actor && !actorFetching,
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
    mutationFn: async (file: File) => {
      if (!actor) throw new Error('Actor not available');
      
      // Convert File to Uint8Array
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      
      // Create ExternalBlob with upload progress
      const blob = ExternalBlob.fromBytes(bytes);
      
      // Save to backend
      return actor.saveDashboardBackground(blob);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboardBackground'] });
    },
  });
}

export function useClearDashboardBackground() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.clearDashboardBackground();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboardBackground'] });
    },
  });
}
