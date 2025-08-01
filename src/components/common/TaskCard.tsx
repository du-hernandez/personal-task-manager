import React from 'react';
import { Card, Checkbox, Typography, Space } from 'antd';
import { CheckCircleOutlined, CheckCircleFilled } from '@ant-design/icons';
import { useTaskContext } from '../../hooks/useTaskContext';
import type { Task } from '../../services/types/task.types';
import '../../styles/components/TaskCard.css';

const { Text, Paragraph } = Typography;

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { toggleTask } = useTaskContext();

  const handleToggle = async () => {
    await toggleTask(task.id);
  };

  const cardClassName = `task-card ${task.completed ? 'completed' : 'pending'}`;

  return (
    <Card
      className={cardClassName}
      bodyStyle={{ padding: '1rem' }}
      hoverable
    >
      <div className="task-card-content">
        <div className="task-checkbox-container">
          <Checkbox
            checked={task.completed}
            onChange={handleToggle}
            className="task-checkbox"
          >
            {task.completed ? (
              <CheckCircleFilled className="task-check-icon completed" />
            ) : (
              <CheckCircleOutlined className="task-check-icon pending" />
            )}
          </Checkbox>
        </div>
        
        <div className="task-content">
          <Text
            className={`task-title ${task.completed ? 'completed' : 'pending'}`}
            strong
            delete={task.completed}
          >
            {task.title}
          </Text>
          
          {task.description && (
            <Paragraph
              className={`task-description ${task.completed ? 'completed' : 'pending'}`}
              ellipsis={{ rows: 2, expandable: true }}
            >
              {task.description}
            </Paragraph>
          )}
        </div>
      </div>
    </Card>
  );
}; 