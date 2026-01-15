import React from 'react';
import { useTasks } from './hooks/useTasks';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Bot, Cloud, RotateCw } from 'lucide-react';

const App: React.FC = () => {
  const { tasks, isLoading, addTask, deleteTask, refreshTasks } = useTasks();

  return (
    <div className="min-h-screen flex flex-col items-center bg-stone-100 font-sans selection:bg-yellow-200 selection:text-slate-900 overflow-x-hidden relative">
      
      {/* Decorative background elements - Corkboard feel */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-100/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-100/30 rounded-full blur-[120px]" />
      </div>

      {/* Manual Refresh Button - Top Right */}
      <button 
        onClick={refreshTasks}
        disabled={isLoading}
        className="fixed top-4 right-4 z-50 p-2.5 bg-white/80 backdrop-blur-sm border border-slate-200 shadow-sm rounded-full text-slate-500 hover:text-primary-600 hover:bg-white hover:shadow-md transition-all active:scale-95 disabled:opacity-50"
        title="手動重新整理"
      >
        <RotateCw size={20} className={isLoading ? "animate-spin" : ""} />
      </button>

      <header className="w-full max-w-lg mx-auto pt-12 pb-8 px-6 text-center z-10 animate-fade-in relative">
        <div className="inline-flex items-center justify-center p-3 mb-6 bg-white rounded-2xl shadow-sm border border-stone-200">
          <div className="bg-primary-50 p-2 rounded-xl text-primary-600">
            <Bot size={32} />
          </div>
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-3">
          Automate<span className="text-primary-600">Me</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-xs mx-auto leading-relaxed">
          有什麼無聊的任務在浪費你的時間？
        </p>
      </header>

      {/* Main container widened for Sticky Wall */}
      <main className="w-full max-w-7xl px-4 md:px-8 z-10 flex-1 flex flex-col items-center">
        <TaskForm onAdd={addTask} />
        <TaskList tasks={tasks} isLoading={isLoading} onDelete={deleteTask} />
      </main>

      <footer className="w-full py-8 text-center text-slate-400 text-sm z-10 relative">
        <p className="flex items-center justify-center gap-1.5">
          <span>使用</span>
          <Cloud size={14} className="text-blue-400 fill-blue-400" />
          <span>Google Sheets 雲端儲存</span>
        </p>
      </footer>
    </div>
  );
};

export default App;