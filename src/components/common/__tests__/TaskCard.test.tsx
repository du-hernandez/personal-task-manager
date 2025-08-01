import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { TaskCard } from '../TaskCard';
import type { Task } from '../../../services/types/task.types';

// Mock del hook useTaskContext
const mockToggleTask = vi.fn();

vi.mock('../../../hooks/useTaskContext', () => ({
  useTaskContext: () => ({
    toggleTask: mockToggleTask,
  }),
}));

describe('TaskCard', () => {
  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    completed: false,
  };

  const mockCompletedTask: Task = {
    id: '2',
    title: 'Completed Task',
    description: 'Completed Description',
    completed: true,
  };

  describe('Renderizado de información', () => {
    it('Debe renderizar el titulo de la tarea correctamente', () => {
      render(<TaskCard task={mockTask} />);
      
      expect(screen.getByText('Test Task')).toBeInTheDocument();
    });

    it('Debe renderizar la descripción de la tarea correctamente', () => {
      render(<TaskCard task={mockTask} />);
      
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('Debe renderizar la tarea sin descripción', () => {
      const taskWithoutDescription: Task = {
        ...mockTask,
        description: '',
      };
      
      render(<TaskCard task={taskWithoutDescription} />);
      
      expect(screen.getByText('Test Task')).toBeInTheDocument();
      expect(screen.queryByText('Test Description')).not.toBeInTheDocument();
    });

    it('Debe renderizar el titulo de la tarea completada correctamente', () => {
      render(<TaskCard task={mockCompletedTask} />);
      
      expect(screen.getByText('Completed Task')).toBeInTheDocument();
    });

    it('Debe renderizar la descripción de la tarea completada correctamente', () => {
      render(<TaskCard task={mockCompletedTask} />);
      
      expect(screen.getByText('Completed Description')).toBeInTheDocument();
    });
  });

  describe('Estados visuales', () => {
    it('Debe renderizar la tarea pendiente con la clase pending', () => {
      render(<TaskCard task={mockTask} />);
      
      const taskCard = screen.getByText('Test Task').closest('.task-card');
      expect(taskCard).toHaveClass('pending');
    });

    it('Debe renderizar la tarea completada con la clase completed', () => {
      render(<TaskCard task={mockCompletedTask} />);
      
      const taskCard = screen.getByText('Completed Task').closest('.task-card');
      expect(taskCard).toHaveClass('completed');
    });
  });
}); 