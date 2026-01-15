import { useState, useEffect, useCallback } from 'react';
import { Task } from '../types';

const STORAGE_KEY = 'automate_me_tasks';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const item = window.localStorage.getItem(STORAGE_KEY);
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Error writing to localStorage", error);
    }
  }, [tasks]);

  const addTask = useCallback((content: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      content,
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  return { tasks, addTask, deleteTask };
};