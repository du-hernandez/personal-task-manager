import React, { useState } from 'react';
import { Input, Button, Form, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTaskContext } from '../../hooks/useTaskContext';
import type { Task } from '../../services/types/task.types';
import { validateTask } from '../../utils/helpers';
import '../../styles/components/TaskInput.css';

const { TextArea } = Input;

interface TaskInputForm {
  title: string;
  description: string;
}

export const TaskInput: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { addTask } = useTaskContext();

  const handleSubmit = async (values: TaskInputForm) => {
    if (!validateTask(values)) {
      message.error('Por favor ingresa un título válido');
      return;
    }

    setLoading(true);
    try {
      const newTask: Omit<Task, 'id'> = {
        title: values.title.trim(),
        description: values.description.trim(),
        completed: false,
      };

      await addTask(newTask);
      form.resetFields();
      message.success('Tarea agregada exitosamente');
    } catch (error) {
      message.error('Error al agregar la tarea');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-input-container">
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="inline"
        className="task-input-form"
      >
        <Form.Item
          name="title"
          rules={[
            { required: true, message: 'Ingresa un título' },
            { min: 1, message: 'El título debe tener al menos 1 carácter' },
          ]}
          className="task-input-field"
        >
          <Input
            placeholder="Agregar nueva tarea..."
            size="large"
            className="task-input"
          />
        </Form.Item>

        <Form.Item
          name="description"
          className="task-description-field"
        >
          <TextArea
            placeholder="Descripción (opcional)"
            rows={1}
            className="task-description"
          />
        </Form.Item>

        <Form.Item className="task-submit-field">
          <Button
            type="primary"
            htmlType="submit"
            icon={<PlusOutlined />}
            size="large"
            loading={loading}
            className="task-submit-button"
            // disabled={form.isFieldValidating('title') || form.isFieldValidating('description')}
          />
        </Form.Item>
      </Form>
    </div>
  );
}; 