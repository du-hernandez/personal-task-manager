import React, { memo } from 'react';
import { Spin, Typography } from 'antd';

const { Text } = Typography;

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'default' | 'large';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = memo(({ 
  message = 'Cargando...', 
  size = 'large' 
}) => {
  return (
    <div className="loading-spinner-container">
      <Spin size={size} />
      <Text className="loading-text">{message}</Text>
    </div>
  );
}); 