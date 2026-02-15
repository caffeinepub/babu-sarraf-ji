import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../useActor';
import { useInternetIdentity } from '../useInternetIdentity';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

// Local storage key for tasks
const TASKS_STORAGE_KEY = 'dailyTargetTasks';

// Helper to get tasks from localStorage
function getTasksFromStorage(principalString: string): Task[] {
  try {
    const stored = localStorage.getItem(`${TASKS_STORAGE_KEY}_${principalString}`);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading tasks from storage:', error);
  }
  return [];
}

// Helper to save tasks to localStorage
function saveTasksToStorage(principalString: string, tasks: Task[]): void {
  try {
    localStorage.setItem(`${TASKS_STORAGE_KEY}_${principalString}`, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to storage:', error);
  }
}

// Hook to fetch daily tasks
export function useDailyTasks() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();
  const principalString = identity?.getPrincipal().toString() || '';

  return useQuery<Task[]>({
    queryKey: ['dailyTasks', principalString],
    queryFn: async () => {
      if (!actor || !principalString) return [];
      
      // For now, use localStorage since backend stores single task per day
      // This provides the multi-task to-do list functionality
      return getTasksFromStorage(principalString);
    },
    enabled: !!actor && !actorFetching && !!principalString,
    retry: false,
  });
}

// Hook to add a new task
export function useAddTask() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const principalString = identity?.getPrincipal().toString() || '';

  return useMutation({
    mutationFn: async (text: string) => {
      if (!actor || !principalString) throw new Error('Not authenticated');

      const currentTasks = getTasksFromStorage(principalString);
      const newTask: Task = {
        id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        text,
        completed: false,
      };
      const updatedTasks = [...currentTasks, newTask];
      saveTasksToStorage(principalString, updatedTasks);
      return updatedTasks;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dailyTasks', principalString] });
    },
  });
}

// Hook to update a task (toggle completed or edit text)
export function useUpdateTask() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const principalString = identity?.getPrincipal().toString() || '';

  return useMutation({
    mutationFn: async ({ taskId, completed, text }: { taskId: string; completed?: boolean; text?: string }) => {
      if (!actor || !principalString) throw new Error('Not authenticated');

      const currentTasks = getTasksFromStorage(principalString);
      const updatedTasks = currentTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            ...(completed !== undefined && { completed }),
            ...(text !== undefined && { text }),
          };
        }
        return task;
      });
      saveTasksToStorage(principalString, updatedTasks);
      return updatedTasks;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dailyTasks', principalString] });
    },
  });
}

// Hook to delete a task
export function useDeleteTask() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const principalString = identity?.getPrincipal().toString() || '';

  return useMutation({
    mutationFn: async (taskId: string) => {
      if (!actor || !principalString) throw new Error('Not authenticated');

      const currentTasks = getTasksFromStorage(principalString);
      const updatedTasks = currentTasks.filter((task) => task.id !== taskId);
      saveTasksToStorage(principalString, updatedTasks);
      return updatedTasks;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dailyTasks', principalString] });
    },
  });
}

// Hook to reset all tasks (for next day)
export function useResetTasks() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const principalString = identity?.getPrincipal().toString() || '';

  return useMutation({
    mutationFn: async () => {
      if (!actor || !principalString) throw new Error('Not authenticated');

      saveTasksToStorage(principalString, []);
      return [];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dailyTasks', principalString] });
    },
  });
}
