import { createContext, useContext, useReducer, useCallback, useMemo } from 'react';
import type { Task, TaskContextType, TaskSummary } from '../services/types/task.types';
import { TaskService } from '../services/api/taskService';
import { calculateTaskSummary, filterTasks, generateTaskId } from '../utils/helpers';

// Estado inicial
const initialState = {
  tasks: [] as Task[],
  loading: false,
  error: null as string | null,
  currentFilter: 'all' as 'all' | 'completed',
};

// Tipos para el reducer
type TaskAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'TOGGLE_TASK'; payload: string }
  | { type: 'SET_FILTER'; payload: 'all' | 'completed' };

// Reducer para manejar el estado
const taskReducer = (state: typeof initialState, action: TaskAction) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    
    case 'ADD_TASK':
      return { ...state, tasks: [action.payload, ...state.tasks] };
    
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    
    case 'SET_FILTER':
      return { ...state, currentFilter: action.payload };
    
    default:
      return state;
  }
};

// Crear el contexto
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Hook personalizado para usar el contexto
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

// Provider del contexto
export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Calcular tareas filtradas y resumen
  const filteredTasks = useMemo(() => 
    filterTasks(state.tasks, state.currentFilter), 
    [state.tasks, state.currentFilter]
  );

  const completedTasks = useMemo(() => 
    state.tasks.filter(task => task.completed), 
    [state.tasks]
  );

  const pendingTasks = useMemo(() => 
    state.tasks.filter(task => !task.completed), 
    [state.tasks]
  );

  const getTaskSummary = useCallback((): TaskSummary => 
    calculateTaskSummary(state.tasks), 
    [state.tasks]
  );

  // Cargar tareas desde la API
  const loadTasks = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const tasks = await TaskService.getTasks();
      dispatch({ type: 'SET_TASKS', payload: tasks });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Error loading tasks' 
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Agregar nueva tarea
  const addTask = useCallback(async (taskData: Omit<Task, 'id'>) => {
    try {
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const newTask: Task = {
        ...taskData,
        id: generateTaskId(),
      };

      dispatch({ type: 'ADD_TASK', payload: newTask });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Error adding task' 
      });
    }
  }, []);

  // Toggle tarea completada para marcarla como completada o no
  const toggleTask = useCallback(async (taskId: string) => {
    try {
        
      dispatch({ type: 'SET_ERROR', payload: null });
      dispatch({ type: 'TOGGLE_TASK', payload: taskId });

    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Error updating task' 
      });
    }
  }, []);

  // Filtrar tareas
  const filterTasksHandler = useCallback((filter: 'all' | 'completed') => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  }, []);

  // Memoizar el contexto para evitar re-renders innecesarios
  const contextValue = useMemo((): TaskContextType => ({
    tasks: state.tasks,
    completedTasks,
    pendingTasks,
    filteredTasks,
    loading: state.loading,
    error: state.error,
    currentFilter: state.currentFilter,
    addTask,
    toggleTask,
    filterTasks: filterTasksHandler,
    loadTasks,
    getTaskSummary,
  }), [
    state.tasks,
    completedTasks,
    pendingTasks,
    filteredTasks,
    state.loading,
    state.error,
    state.currentFilter,
    addTask,
    toggleTask,
    filterTasksHandler,
    loadTasks,
    getTaskSummary,
  ]);

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
}; 