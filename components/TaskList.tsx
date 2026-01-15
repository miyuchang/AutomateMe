import React from 'react';
import { Task } from '../types';
import { Trash2, Clock, CheckCircle2 } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
}

const formatDate = (timestamp: number) => {
  return new Intl.DateTimeFormat('zh-TW', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  }).format(new Date(timestamp));
};

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-slate-400 animate-fade-in">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 size={32} className="text-slate-300" />
        </div>
        <p className="text-lg font-medium">目前空空如也！</p>
        <p className="text-sm">還沒有列出無聊的任務。</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto mt-8 space-y-4 pb-20">
      <div className="flex items-center justify-between px-2 mb-2">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
          願望清單 ({tasks.length})
        </h3>
      </div>
      
      <div className="space-y-3">
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className="group relative bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 animate-slide-up hover:-translate-y-0.5"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <p className="text-slate-800 text-lg leading-snug font-medium break-words">
                  {task.content}
                </p>
                <div className="flex items-center mt-3 text-xs text-slate-400 gap-1.5">
                  <Clock size={12} />
                  <span>{formatDate(task.createdAt)}</span>
                </div>
              </div>
              
              <button
                onClick={() => onDelete(task.id)}
                className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg -mr-2 -mt-2"
                aria-label="刪除任務"
              >
                <Trash2 size={18} />
              </button>
            </div>
            
            {/* Decorative gradient line on the left */}
            <div className="absolute left-0 top-4 bottom-4 w-1 bg-gradient-to-b from-primary-400 to-primary-600 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;