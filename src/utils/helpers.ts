import type { Task, TaskSummary } from '../services/types/task.types';

/**
 * Calcula el resumen de tareas
 */
export const calculateTaskSummary = (tasks: Task[]): TaskSummary => {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const pending = total - completed;

  return { total, completed, pending };
};

/**
 * Filtra tareas según el estado
 */
export const filterTasks = (tasks: Task[], filter: 'all' | 'completed'): Task[] => {
  switch (filter) {
    case 'completed':
      return tasks.filter(task => task.completed);
    case 'all':
    default:
      return tasks;
  }
};

/**
 * Genera un ID único para las tareas
 */
export const generateTaskId = (): string => {
  return crypto.randomUUID();
};

/**
 * Valida si una tarea es válida
 */
export const validateTask = (task: Partial<Task>): boolean => {
  return !!(task.title && task.title.trim().length > 0);
};
