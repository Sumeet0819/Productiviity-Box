import React, { useState } from 'react';
import { CheckCircle2, Circle, Plus, Trash2, ListTodo } from 'lucide-react';

const Todo = () => {
    // Initialize with some dummy tasks
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Review quarterly goals', completed: false },
        { id: 2, text: 'Design weather widget UI', completed: true },
        { id: 3, text: 'Sync with the backend team', completed: false }
    ]);
    const [newTaskText, setNewTaskText] = useState('');

    const toggleTask = (id) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const addTask = (e) => {
        e.preventDefault();
        if (newTaskText.trim() === '') return;
        
        const newTask = {
            id: Date.now(),
            text: newTaskText.trim(),
            completed: false
        };
        
        setTasks([...tasks, newTask]);
        setNewTaskText('');
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    // Calculate progress for the progress bar
    const completedCount = tasks.filter(t => t.completed).length;
    const progress = tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);

    return (
        <div className="w-full max-w-[320px] min-h-[420px] flex flex-col p-8 bg-white rounded-[2rem] shadow-[0_12px_40px_rgb(0,0,0,0.06)] border border-slate-100 font-sans">
            
            {/* -- Header Section -- */}
            <div className="flex w-full items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className="bg-orange-100/50 p-2.5 rounded-2xl text-orange-400 border border-orange-100">
                        <ListTodo size={20} strokeWidth={2.5} />
                    </div>
                    <h2 className="font-bold text-lg text-slate-800 tracking-tight">Tasks</h2>
                </div>
                <span className="text-xs font-bold font-mono tracking-wider text-slate-400 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                    {completedCount}/{tasks.length}
                </span>
            </div>

            {/* -- Progress Bar -- */}
            <div className="w-full h-1.5 bg-slate-50 border border-slate-100 rounded-full mb-6 overflow-hidden">
                <div 
                    className="h-full bg-orange-400 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* -- Task List Section -- */}
            <div className="flex flex-col gap-2.5 mb-2 max-h-[200px] overflow-y-auto pr-1">
                {tasks.length === 0 ? (
                    <p className="text-sm text-slate-400 font-medium text-center py-6 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
                        All caught up! 🎉
                    </p>
                ) : (
                    tasks.map(task => (
                        <div 
                            key={task.id} 
                            className={`group flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                                task.completed 
                                ? "bg-slate-50 border-slate-100 opacity-70" 
                                : "bg-white border-slate-100 hover:border-orange-200 hover:shadow-sm"
                            }`}
                            onClick={() => toggleTask(task.id)}
                        >
                            <div className="flex items-center gap-3 overflow-hidden">
                                {/* Toggle Icon */}
                                {task.completed ? (
                                    <CheckCircle2 size={18} className="text-orange-400 shrink-0" strokeWidth={2.5} />
                                ) : (
                                    <Circle size={18} className="text-slate-300 group-hover:text-orange-300 shrink-0 transition-colors" strokeWidth={2.5} />
                                )}
                                
                                {/* Task Text */}
                                <span className={`text-[13px] font-semibold truncate transition-all ${
                                    task.completed ? "text-slate-400 line-through decoration-slate-300" : "text-slate-700"
                                }`}>
                                    {task.text}
                               </span>
                            </div>
                            
                            {/* Delete Button (Appears on Hover) */}
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteTask(task.id);
                                }}
                                className="text-slate-300 opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all p-1 rounded-lg"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* -- Add Task Input Section -- */}
            <form onSubmit={addTask} className="relative mt-auto">
                <input 
                    type="text" 
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    placeholder="Add new task..." 
                    className="w-full bg-white border-2 border-slate-100 text-slate-700 text-sm font-semibold rounded-[1.25rem] px-4 py-3.5 pr-12 focus:outline-none focus:border-orange-300 focus:bg-slate-50 transition-all placeholder:text-slate-300 shadow-sm"
                />
                <button 
                    type="submit"
                    disabled={newTaskText.trim() === ''}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-400 text-white p-2 rounded-xl hover:bg-orange-500 disabled:opacity-50 disabled:hover:bg-orange-400 transition-colors shadow-sm shadow-orange-400/30"
                >
                    <Plus size={16} strokeWidth={3.5} />
                </button>
            </form>
        </div>
    );
};

export default Todo;