import React from 'react';
import { Typography, Space } from 'antd';
import { useTaskContext } from '../../hooks/useTaskContext';
import '../../styles/components/TaskSummary.css';

const { Text } = Typography;

export const TaskSummary: React.FC = () => {
  const { getTaskSummary } = useTaskContext();
  const summary = getTaskSummary();

  return (
    <div className="task-summary-container">
      <div className="task-summary-content">
        <Space size="large" className="task-summary-stats">
          <div className="summary-item">
            <Text className="summary-number completed">
              {summary.completed}
            </Text>
            <Text className="summary-label">completadas</Text>
          </div>
          
          <div className="summary-separator">•</div>
          
          <div className="summary-item">
            <Text className="summary-number pending">
              {summary.pending}
            </Text>
            <Text className="summary-label">pendientes</Text>
          </div>
          
          <div className="summary-separator">•</div>
          
          <div className="summary-item">
            <Text className="summary-number total">
              {summary.total}
            </Text>
            <Text className="summary-label">total</Text>
          </div>
        </Space>
      </div>
    </div>
  );
}; 