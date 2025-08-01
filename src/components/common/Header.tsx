import React from 'react';
import { Typography } from 'antd';
import { APP_CONFIG } from '../../utils/constants';
import '../../styles/components/Header.css';

const { Title } = Typography;

export const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <Title level={1} className="header-title">
          {APP_CONFIG.TITLE}
        </Title>
      </div>
    </header>
  );
}; 