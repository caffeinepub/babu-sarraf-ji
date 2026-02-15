import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../useActor';
import type { TestResult } from '../../backend';

export function useGetTestHistory() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<TestResult[]>({
    queryKey: ['testHistory'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getTestHistory();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

export function useSaveTestResult() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (result: TestResult) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveTestResult(result);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testHistory'] });
    },
  });
}
