import React from 'react';
import { List, Empty } from 'antd';
import VirtualList from 'rc-virtual-list';
import { useTaskContext } from '../../hooks/useTaskContext';
import { TaskCard } from '../common/TaskCard';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { UI_CONSTANTS } from '../../utils/constants';
import '../../styles/components/VirtualizedTaskList.css';

const CONTAINER_HEIGHT = 500;
const ITEM_HEIGHT = UI_CONSTANTS.VIRTUALIZATION_ITEM_HEIGHT;

export const VirtualizedTaskList: React.FC = () => {
  const { filteredTasks, loading, error } = useTaskContext();

  if (loading) {
    return <LoadingSpinner message="Cargando tareas..." />;
  }

  if (error) {
    return (
      <div className="task-list-error">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <div className="task-list-empty">
        <Empty
          description="No hay tareas para mostrar"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </div>
    );
  }

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    // Optimizar scroll para evitar flickering
    e.currentTarget.style.willChange = 'scroll-position';
    
    // Reset después del scroll
    setTimeout(() => {
      e.currentTarget.style.willChange = 'auto';
    }, 100);
    
    if (import.meta.env.DEV) {
      console.log('Scroll position:', e.currentTarget.scrollTop);
    }
  };

  return (
    <div className="virtualized-task-list-container">
      <List className="virtualized-task-list">
        <VirtualList
          data={filteredTasks}
          height={CONTAINER_HEIGHT}
          itemHeight={ITEM_HEIGHT}
          itemKey="id"
          onScroll={onScroll}
        >
          {(task) => (
            <List.Item key={task.id} className="virtualized-task-list-item">
              <TaskCard task={task} />
            </List.Item>
          )}
        </VirtualList>
      </List>
    </div>
  );
}; 