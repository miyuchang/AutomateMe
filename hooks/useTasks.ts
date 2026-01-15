import { useState, useEffect, useCallback } from 'react';
import { Task } from '../types';

const STORAGE_KEY = 'automate_me_tasks';

const STICKY_COLORS = [
  'bg-yellow-200', // Classic Yellow
  'bg-rose-200',   // Pink
  'bg-blue-200',   // Blue
  'bg-green-200',  // Green
  'bg-purple-200', // Purple
  'bg-orange-200', // Orange
];

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const item = window.localStorage.getItem(STORAGE_KEY);
      if (!item) return [];
      
      const parsedTasks = JSON.parse(item);
      
      // Migration: Add color and rotation to old tasks if missing
      return parsedTasks.map((t: any) => ({
        ...t,
        color: t.color || STICKY_COLORS[Math.floor(Math.random() * STICKY_COLORS.length)],
        rotation: t.rotation !== undefined ? t.rotation : (Math.random() * 6 - 3)
      }));

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
      // Randomly assign a pastel color
      color: STICKY_COLORS[Math.floor(Math.random() * STICKY_COLORS.length)],
      // Random rotation between -3 and 3 degrees for organic look
      rotation: Math.random() * 6 - 3, 
    };
    setTasks((prev) => [newTask, ...prev]);
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  return { tasks, addTask, deleteTask };
};