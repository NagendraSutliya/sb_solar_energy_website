import React, { useState } from 'react';
import { Plus, Check } from 'lucide-react';

interface TaskItem {
  id: string;
  title: string;
  subtitle: string;
  section: 'today' | 'overdue';
  completed: boolean;
}

const INITIAL_TASKS: TaskItem[] = [
  {
    id: '1',
    title: 'Call Aarav about contract',
    subtitle: '10:30 AM · Deal',
    section: 'today',
    completed: false,
  },
  {
    id: '2',
    title: 'Send proposal to Vikram',
    subtitle: '1:00 PM · Email',
    section: 'today',
    completed: false,
  },
  {
    id: '3',
    title: 'Follow up with Sneha',
    subtitle: '4:30 PM · Call',
    section: 'today',
    completed: false,
  },
  {
    id: '4',
    title: 'Verify Aravalli Solar documents',
    subtitle: 'Yesterday',
    section: 'overdue',
    completed: false,
  },
  {
    id: '5',
    title: 'Update Mahi Solar pricing',
    subtitle: '2 days ago',
    section: 'overdue',
    completed: false,
  },
];

const TasksManagement: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const todayTasks = filteredTasks.filter((t) => t.section === 'today');
  const overdueTasks = filteredTasks.filter((t) => t.section === 'overdue');

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Tasks
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            3 due today · 2 overdue
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 w-56 sm:w-64 shadow-2xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
          />

          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#f59e0b] hover:bg-amber-600 active:scale-[0.98] text-slate-950 rounded-xl text-sm font-bold shadow-xs transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            New task
          </button>
        </div>
      </div>

      {/* 2 Column Layout matching Tasks.png */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Task lists (7 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-100 shadow-xs space-y-6">
          {/* Today Section */}
          <div>
            <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
              Today
            </h2>
            <div className="divide-y divide-slate-50">
              {todayTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className="py-3.5 flex items-center justify-between hover:bg-slate-50/70 px-2 rounded-xl transition-all cursor-pointer group"
                >
                  <div>
                    <p
                      className={`text-sm font-semibold transition-all ${
                        task.completed ? 'line-through text-slate-400' : 'text-slate-900'
                      }`}
                    >
                      {task.title}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {task.subtitle}
                    </p>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all shrink-0 ${
                      task.completed
                        ? 'bg-[#f59e0b] border-[#f59e0b] text-slate-950 font-bold'
                        : 'border-slate-300 bg-white group-hover:border-slate-400'
                    }`}
                  >
                    {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Overdue Section */}
          <div>
            <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
              Overdue
            </h2>
            <div className="divide-y divide-slate-50">
              {overdueTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className="py-3.5 flex items-center justify-between hover:bg-slate-50/70 px-2 rounded-xl transition-all cursor-pointer group"
                >
                  <div>
                    <p
                      className={`text-sm font-semibold transition-all ${
                        task.completed ? 'line-through text-slate-400' : 'text-slate-900'
                      }`}
                    >
                      {task.title}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {task.subtitle}
                    </p>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all shrink-0 ${
                      task.completed
                        ? 'bg-[#f59e0b] border-[#f59e0b] text-slate-950 font-bold'
                        : 'border-slate-300 bg-white group-hover:border-slate-400'
                    }`}
                  >
                    {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: This week summary (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-100 shadow-xs h-fit">
          <h2 className="text-base font-bold text-slate-900 mb-2">
            This week
          </h2>

          <div className="mt-4">
            <div className="text-4xl font-extrabold text-slate-900 tracking-tight">
              12
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              tasks planned
            </p>
          </div>

          <div className="mt-8">
            <div className="text-4xl font-extrabold text-slate-900 tracking-tight">
              8
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              completed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksManagement;
