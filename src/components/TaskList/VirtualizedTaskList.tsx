import React from 'react';
import { List, Empty, Spin } from 'antd';
import VirtualList from 'rc-virtual-list';
import { useTaskContext } from '../../hooks/useTaskContext';
import { TaskCard } from '../common/TaskCard';
import { UI_CONSTANTS } from '../../utils/constants';
import '../../styles/components/VirtualizedTaskList.css';

const CONTAINER_HEIGHT = 400;
const ITEM_HEIGHT = UI_CONSTANTS.VIRTUALIZATION_ITEM_HEIGHT;

export const VirtualizedTaskList: React.FC = () => {
  const { filteredTasks, loading, error } = useTaskContext();

  if (loading) {
    return (
      <div className="task-list-loading">
        <Spin size="large" />
        <p>Cargando tareas...</p>
      </div>
    );
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
    // Aquí se puede implementar infinite scroll si es necesario
    // Por ahora solo log para debugging
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