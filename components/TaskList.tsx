import React from 'react';
import { Task } from '../types';
import { Clock, Loader2, X } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  onDelete: (id: string) => void;
}

const formatDate = (timestamp: number) => {
  if (!timestamp) return '';
  return new Intl.DateTimeFormat('zh-TW', {
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(new Date(timestamp));
};

const TaskList: React.FC<TaskListProps> = ({ tasks, isLoading, onDelete }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 w-full animate-fade-in">
        <Loader2 size={40} className="text-primary-500 animate-spin mb-4" />
        <p className="text-slate-400 font-medium">正在讀取大家的願望...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-slate-400 animate-fade-in w-full">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <Clock size={32} className="text-slate-300" />
        </div>
        <p className="text-lg font-medium">目前空空如也！</p>
        <p className="text-sm">還沒有列出無聊的任務，快來搶頭香。</p>
      </div>
    );
  }

  return (
    <div className="w-full mt-12 pb-20">
      <div className="flex items-center justify-center mb-6">
        <div className="h-1 w-24 bg-slate-200 rounded-full"></div>
      </div>
      
      {/* Sticky Note Wall Container */}
      <div className="flex flex-wrap justify-center items-start gap-6 sm:gap-8 px-4">
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className={`
              relative group flex flex-col justify-between
              w-full sm:w-64 min-h-[16rem] sm:min-h-[16rem]
              p-6 shadow-lg hover:shadow-2xl hover:scale-105 hover:z-20
              transition-all duration-300 ease-out cursor-default
              ${task.color} text-slate-800
              animate-fade-in
            `}
            style={{ 
              transform: `rotate(${task.rotation}deg)`,
              // Add a slight random top margin to break the grid further visually
              marginTop: `${index % 2 === 0 ? '0px' : '20px'}`,
              animationDelay: `${Math.min(index * 50, 1000)}ms`
            }}
          >
            {/* Pin / Tape effect (Optional visual) */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black/10 shadow-inner sm:block hidden"></div>

            {/* Delete Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(task.id);
              }}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-black/5 hover:bg-black/10 text-slate-600 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all duration-200 focus:opacity-100"
              title="刪除"
            >
              <X size={16} />
            </button>

            <div className="flex-1 overflow-hidden mt-2">
              <p className="font-handwriting text-xl leading-relaxed font-medium break-words whitespace-pre-wrap" style={{ fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif' }}>
                {task.content}
              </p>
            </div>
            
            <div className="mt-4 pt-4 border-t border-black/5 flex justify-between items-end">
              <div className="flex items-center text-xs text-slate-700/60 font-medium gap-1">
                <Clock size={12} />
                <span>{formatDate(task.createdAt)}</span>
              </div>
            </div>
            
            {/* Paper texture overlay (subtle) */}
            <div className="absolute inset-0 bg-white opacity-[0.03] pointer-events-none"></div>
            {/* Bottom edge curl shadow effect */}
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-black/10 to-transparent pointer-events-none rounded-tl-3xl"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;