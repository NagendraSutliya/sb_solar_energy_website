import React, { useState, useEffect } from 'react';
import { Plus, Check, Clock, Tag } from 'lucide-react';
import { getStoredTasks, saveStoredTasks, type Task } from '../../data/crmData';

const TasksManagement: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('11:00 AM');
  const [newType, setNewType] = useState('Deal');

  useEffect(() => {
    setTasks(getStoredTasks());
  }, []);

  const handleToggle = (id: string) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
    saveStoredTasks(updated);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: newTitle.trim(),
      time: newTime,
      type: newType,
      completed: false,
    };

    const updated = [...tasks, newTask];
    setTasks(updated);
    saveStoredTasks(updated);
    setNewTitle('');
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
            Tasks & Activities
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Stay on top of customer follow-ups, calls, and contract signings
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task List */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 mb-2">Upcoming Tasks</h2>

          <div className="divide-y divide-slate-100">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => handleToggle(task.id)}
                className="py-3.5 flex items-start gap-4 hover:bg-slate-50/80 px-2 rounded-xl transition-all cursor-pointer group"
              >
                <div
                  className={`w-5 h-5 mt-0.5 rounded-md border flex items-center justify-center transition-all shrink-0 ${
                    task.completed
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'border-slate-300 bg-white group-hover:border-slate-400'
                  }`}
                >
                  {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div className="flex-1">
                  <p
                    className={`text-sm font-semibold transition-all ${
                      task.completed ? 'line-through text-slate-400' : 'text-slate-800'
                    }`}
                  >
                    {task.title}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {task.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" />
                      {task.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Quick Task Form */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-2xs h-fit">
          <h2 className="text-base font-bold text-slate-900 mb-4">Add Quick Task</h2>
          <form onSubmit={handleAddTask} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Task Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Call client for subsidy paper signing"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Time
              </label>
              <input
                type="text"
                placeholder="e.g. 2:30 PM"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Type
              </label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option value="Deal">Deal</option>
                <option value="Call">Call</option>
                <option value="Email">Email</option>
                <option value="Meeting">Meeting</option>
                <option value="Site Survey">Site Survey</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TasksManagement;
