import { useMemo } from 'react';
import type { Task } from '../services/types/task.types';
import { filterTasks } from '../utils/helpers';

export const useTaskFilters = (tasks: Task[], currentFilter: 'all' | 'completed') => {
  const filteredTasks = useMemo(() => 
    filterTasks(tasks, currentFilter), 
    [tasks, currentFilter]
  );

  const completedTasks = useMemo(() => 
    tasks.filter(task => task.completed), 
    [tasks]
  );

  const pendingTasks = useMemo(() => 
    tasks.filter(task => !task.completed), 
    [tasks]
  );

  return {
    filteredTasks,
    completedTasks,
    pendingTasks,
  };
}; 