import { useEffect } from 'react';
import { useTaskContext } from '../../hooks/useTaskContext';
import { APP_CONFIG } from '../../utils/constants';

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
      <header className="app-header">
        <h1>{APP_CONFIG.TITLE}</h1>
      </header>
      <main className="app-main">
        {/* Aquí irán los componentes de la aplicación */}
        <p>Contenido de la aplicación</p>
      </main>
    </div>
  );
}; 