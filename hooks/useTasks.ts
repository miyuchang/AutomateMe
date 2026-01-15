import { useState, useEffect, useCallback } from 'react';
import { Task } from '../types';

const API_URL = 'https://script.google.com/macros/s/AKfycbyWoamxuSZcoYiTmZW8adqqn6E2T64Yp2RWt9rW3mbRXsE5L684FFwTjVdBWCqLeA34Ug/exec';

const STICKY_COLORS = [
  'bg-yellow-200', // Classic Yellow
  'bg-rose-200',   // Pink
  'bg-blue-200',   // Blue
  'bg-green-200',  // Green
  'bg-purple-200', // Purple
  'bg-orange-200', // Orange
];

interface ApiTask {
  id: string;
  time: string;
  content: string;
  category: string;
}

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data: ApiTask[] = await response.json();
      
      // Transform API data to App data
      // Newest is at the bottom of the sheet usually, so we reverse it to show newest first
      const transformedTasks: Task[] = data.map((item, index) => {
        // Use a deterministic way to generate color/rotation based on ID or content length
        // so it doesn't flicker wildly on re-renders.
        const seed = item.content.length + index;
        return {
          id: item.id, // Use the ID from backend
          content: item.content,
          createdAt: new Date(item.time).getTime(),
          color: STICKY_COLORS[seed % STICKY_COLORS.length],
          rotation: (seed % 10) - 5, // Random rotation between -5 and 5
        };
      }).reverse();

      setTasks(transformedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = useCallback(async (content: string) => {
    try {
      // Send 'create' action
      await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ 
          action: 'create',
          content: content, 
          category: 'general' 
        })
      });
    } catch (error) {
      console.warn("POST (create) request finished:", error);
    } finally {
      // Refresh the list
      fetchTasks();
    }
  }, [fetchTasks]);

  const deleteTask = useCallback(async (id: string) => {
    if (!window.confirm("確定要刪除這張願望卡嗎？")) return;

    // Optimistic update: Remove it from UI immediately for better feel
    setTasks(prev => prev.filter(t => t.id !== id));

    try {
      // Send 'delete' action
      await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ 
          action: 'delete',
          id: id 
        })
      });
    } catch (error) {
      console.warn("POST (delete) request finished:", error);
      // If needed, we could revert the optimistic update here on error,
      // but strictly following the "refresh after" pattern:
    } finally {
      // Sync with backend to ensure state is correct
      fetchTasks();
    }
  }, [fetchTasks]);

  return { tasks, isLoading, addTask, deleteTask, refreshTasks: fetchTasks };
};