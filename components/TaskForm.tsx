import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';

interface TaskFormProps {
  onAdd: (content: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAdd }) => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    
    onAdd(value.trim());
    setValue('');
    // Keep focus for rapid entry if on desktop, maybe lose it on mobile? 
    // Usually keeping focus is better for "wishlist" style apps.
    inputRef.current?.focus(); 
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <form 
        onSubmit={handleSubmit}
        className={`
          relative group transition-all duration-300 ease-in-out
          bg-white rounded-2xl p-2
          ${isFocused ? 'shadow-2xl shadow-primary-500/20 scale-[1.01]' : 'shadow-xl shadow-slate-200/60'}
        `}
      >
        <div className="relative flex items-center">
          <div className="absolute left-4 text-slate-400">
            <Sparkles size={20} className={isFocused ? 'text-primary-500 animate-pulse' : ''} />
          </div>
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent pl-12 pr-14 py-4 text-lg text-slate-800 placeholder:text-slate-400 focus:outline-none rounded-xl"
            placeholder="想要自動化什麼無聊的任務？"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={!value.trim()}
            className={`
              absolute right-2 p-2.5 rounded-xl flex items-center justify-center transition-all duration-200
              ${value.trim() 
                ? 'bg-primary-600 text-white hover:bg-primary-700 hover:scale-105 active:scale-95 shadow-md shadow-primary-600/30' 
                : 'bg-slate-100 text-slate-300 cursor-not-allowed'}
            `}
          >
            <Send size={20} className={value.trim() ? 'translate-x-0.5' : ''} />
          </button>
        </div>
      </form>
      <div className="mt-3 text-center text-xs text-slate-400 font-medium tracking-wide uppercase">
        按 Enter 鍵儲存
      </div>
    </div>
  );
};

export default TaskForm;