import React from 'react';
import { useTasks } from './hooks/useTasks';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Bot, Zap } from 'lucide-react';

const App: React.FC = () => {
  const { tasks, addTask, deleteTask } = useTasks();

  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-50 font-sans selection:bg-primary-100">
      
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-200/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-200/20 rounded-full blur-[100px]" />
      </div>

      <header className="w-full max-w-lg mx-auto pt-12 pb-8 px-6 text-center z-10 animate-fade-in">
        <div className="inline-flex items-center justify-center p-3 mb-6 bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="bg-primary-50 p-2 rounded-xl text-primary-600">
            <Bot size={32} />
          </div>
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Automate<span className="text-primary-600">Me</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-xs mx-auto leading-relaxed">
          今天有什麼無聊的任務在浪費你的時間？
        </p>
      </header>

      <main className="w-full px-4 md:px-6 z-10 flex-1 flex flex-col items-center">
        <TaskForm onAdd={addTask} />
        <TaskList tasks={tasks} onDelete={deleteTask} />
      </main>

      <footer className="w-full py-6 text-center text-slate-400 text-sm z-10">
        <p className="flex items-center justify-center gap-1.5">
          <span>使用</span>
          <Zap size={14} className="text-amber-400 fill-amber-400" />
          <span>Local Storage 儲存</span>
        </p>
      </footer>
    </div>
  );
};

export default App;