import { axiosClient } from './axiosClient';
import type { Task } from '../types/task.types';

export class TaskService {

  static async getTasks(): Promise<Task[]> {
    try {
      const response = await axiosClient.get<Task[]>('/tasks');
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw new Error('Failed to fetch tasks');
    }
  }
} 