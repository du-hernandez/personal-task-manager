export const APP_CONFIG = {
  TITLE: import.meta.env.VITE_APP_TITLE,
  API_BASE_URL: import.meta.env.VITE_BASE_URL,
  API_KEY: import.meta.env.VITE_API_KEY,
} as const;

export const TASK_FILTERS = {
  ALL: 'all',
  COMPLETED: 'completed',
} as const;

export const TASK_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
} as const;

export const API_ENDPOINTS = {
  TASKS: '/tasks',
} as const;

export const UI_CONSTANTS = {
  DEBOUNCE_DELAY: 300,
  VIRTUALIZATION_ITEM_HEIGHT: 100,
  VIRTUALIZATION_OVERSCAN: 5,
} as const; 