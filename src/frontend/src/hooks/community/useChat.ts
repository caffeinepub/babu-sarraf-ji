import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../useActor';
import type { ChatMessageView } from '../../backend';

export function useGetChatMessages() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<ChatMessageView[]>({
    queryKey: ['chatMessages'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getChatMessages();
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 3000,
  });
}

export function useSendMessage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.sendMessage(content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatMessages'] });
    },
  });
}
