import React, { memo } from 'react';
import { Button, Space } from 'antd';
import { useTaskContext } from '../../hooks/useTaskContext';
import '../../styles/components/FilterButtons.css';

export const FilterButtons: React.FC = memo(() => {
  const { currentFilter, filterTasks } = useTaskContext();

  const handleFilterChange = (filter: 'all' | 'completed') => {
    filterTasks(filter);
  };

  return (
    <div className="filter-buttons-container">
      <Space size="middle" className="filter-buttons">
        <Button
          type={currentFilter === 'all' ? 'primary' : 'default'}
          size="large"
          onClick={() => handleFilterChange('all')}
          className={`filter-button ${currentFilter === 'all' ? 'active' : ''}`}
        >
          Todas las tareas
        </Button>
        <Button
          type={currentFilter === 'completed' ? 'primary' : 'default'}
          size="large"
          onClick={() => handleFilterChange('completed')}
          className={`filter-button ${currentFilter === 'completed' ? 'active' : ''}`}
        >
          Solo completadas
        </Button>
      </Space>
    </div>
  );
}); 