import React, { useEffect } from 'react';
import { useTaskContext } from '../../hooks/useTaskContext';
import { Header } from '../common/Header';
import { TaskInput } from '../common/TaskInput';
import { FilterButtons } from '../common/FilterButtons';
import { VirtualizedTaskList } from '../TaskList/VirtualizedTaskList';
import { TaskSummary } from '../common/TaskSummary';
import { ErrorBoundary } from '../common/ErrorBoundary';
import '../../styles/components/AppLayout.css';

export const AppLayout: React.FC = () => {
  const { loadTasks, loading, error } = useTaskContext();

  useEffect(() => {
    loadTasks();
  }, []);

  if (loading) {
    return (
      <div className="app-container">
        <div className="loading-container">
          <h2>Cargando tareas...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <div className="error-container">
          <h2>Error: {error}</h2>
          <button onClick={loadTasks}>Reintentar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header />
      <main className="app-main">
        <div className="app-content">
          <ErrorBoundary>
            <TaskInput />
          </ErrorBoundary>
          <ErrorBoundary>
            <FilterButtons />
          </ErrorBoundary>
          <ErrorBoundary>
            <VirtualizedTaskList />
          </ErrorBoundary>
          <ErrorBoundary>
            <TaskSummary />
          </ErrorBoundary>
        </div>
      </main>
    </div>
  );
}; 