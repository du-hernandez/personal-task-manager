export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface TaskFilters {
  status: 'all' | 'completed' | 'pending';
}

export interface TaskSummary {
  total: number;
  completed: number;
  pending: number;
}

export interface TaskContextType {
  tasks: Task[];
  completedTasks: Task[];
  pendingTasks: Task[];
  filteredTasks: Task[];
  loading: boolean;
  error: string | null;
  currentFilter: 'all' | 'completed';
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  toggleTask: (taskId: string) => void;
  filterTasks: (filter: 'all' | 'completed') => void;
  loadTasks: () => Promise<void>;
  getTaskSummary: () => TaskSummary;
} 