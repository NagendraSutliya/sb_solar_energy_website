export interface Deal {
  id: string;
  name: string;
  customer: string;
  projectType: string;
  value: number;
  stage: 'qualified' | 'proposal_sent' | 'negotiation' | 'closing';
  tag: string;
  tagColor: 'blue' | 'purple' | 'amber' | 'emerald' | 'orange' | 'indigo';
  owner: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  time: string;
  type: string;
  completed: boolean;
}

export const INITIAL_DEALS: Deal[] = [
  {
    id: 'deal-1',
    name: 'Sneha Rao',
    customer: 'Sneha Rao',
    projectType: 'Rooftop solar, 5 kW',
    value: 190000,
    stage: 'qualified',
    tag: 'Call Thu',
    tagColor: 'indigo',
    owner: 'Aman',
    createdAt: '2026-10-22',
  },
  {
    id: 'deal-2',
    name: 'Karan Joshi',
    customer: 'Karan Joshi',
    projectType: 'Commercial, 20 kW',
    value: 640000,
    stage: 'qualified',
    tag: 'New',
    tagColor: 'purple',
    owner: 'Rahul',
    createdAt: '2026-10-23',
  },
  {
    id: 'deal-3',
    name: 'Vikram Khanna',
    customer: 'Vikram Khanna',
    projectType: 'Solar pump system',
    value: 275000,
    stage: 'proposal_sent',
    tag: 'Follow up',
    tagColor: 'amber',
    owner: 'Rahul',
    createdAt: '2026-10-20',
  },
  {
    id: 'deal-4',
    name: 'Meera Iyer',
    customer: 'Meera Iyer',
    projectType: 'Rooftop solar, 3 kW',
    value: 125000,
    stage: 'proposal_sent',
    tag: 'Viewed',
    tagColor: 'blue',
    owner: 'Neha',
    createdAt: '2026-10-21',
  },
  {
    id: 'deal-5',
    name: 'Priya Mehta',
    customer: 'Priya Mehta',
    projectType: 'Hotel solar, 50 kW',
    value: 310000,
    stage: 'negotiation',
    tag: 'Discount ask',
    tagColor: 'orange',
    owner: 'Neha',
    createdAt: '2026-10-18',
  },
  {
    id: 'deal-6',
    name: 'Aarav Sharma',
    customer: 'Aarav Sharma',
    projectType: 'Factory rooftop, 100 kW',
    value: 420000,
    stage: 'closing',
    tag: 'Contract out',
    tagColor: 'emerald',
    owner: 'Rahul',
    createdAt: '2026-10-15',
  },
  {
    id: 'deal-7',
    name: 'Nisha Verma',
    customer: 'Nisha Verma',
    projectType: 'Residential, 4 kW',
    value: 160000,
    stage: 'closing',
    tag: 'Verbal yes',
    tagColor: 'emerald',
    owner: 'Rahul',
    createdAt: '2026-10-19',
  },
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Call Aarav about contract',
    time: '10:30 AM',
    type: 'Deal',
    completed: false,
  },
  {
    id: 'task-2',
    title: 'Send proposal to Vikram',
    time: '1:00 PM',
    type: 'Email',
    completed: false,
  },
  {
    id: 'task-3',
    title: 'Follow up with Sneha',
    time: '4:30 PM',
    type: 'Call',
    completed: false,
  },
];

export const REVENUE_MONTHS = [
  { month: 'Nov', height: '38%', value: '₹6.8L' },
  { month: 'Dec', height: '46%', value: '₹7.9L' },
  { month: 'Jan', height: '38%', value: '₹6.4L' },
  { month: 'Feb', height: '62%', value: '₹11.2L' },
  { month: 'Mar', height: '54%', value: '₹9.5L' },
  { month: 'Apr', height: '74%', value: '₹13.8L' },
  { month: 'May', height: '68%', value: '₹12.6L' },
  { month: 'Jun', height: '82%', value: '₹15.4L' },
  { month: 'Jul', height: '78%', value: '₹14.5L' },
  { month: 'Aug', height: '86%', value: '₹16.2L' },
  { month: 'Sep', height: '80%', value: '₹15.1L' },
  { month: 'Oct', height: '100%', value: '₹18.4L', isCurrent: true },
];

export const STAGE_CONFIG = [
  { id: 'qualified', label: 'Qualified', count: 24, progress: 95 },
  { id: 'proposal_sent', label: 'Proposal sent', count: 18, progress: 72 },
  { id: 'negotiation', label: 'Negotiation', count: 14, progress: 56 },
  { id: 'closing', label: 'Closing', count: 8, progress: 32 },
] as const;

export const OWNERS = ['All owners', 'Rahul', 'Neha', 'Aman'] as const;

// Storage helpers
const STORAGE_KEY_DEALS = 'sb_orbit_deals_v1';
const STORAGE_KEY_TASKS = 'sb_orbit_tasks_v1';

export function getStoredDeals(): Deal[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DEALS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_DEALS, JSON.stringify(INITIAL_DEALS));
      return INITIAL_DEALS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_DEALS;
  }
}

export function saveStoredDeals(deals: Deal[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_DEALS, JSON.stringify(deals));
    window.dispatchEvent(new CustomEvent('orbit-deals-updated'));
  } catch (e) {
    console.error('Failed to save deals to localStorage', e);
  }
}

export function getStoredTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_TASKS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(INITIAL_TASKS));
      return INITIAL_TASKS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_TASKS;
  }
}

export function saveStoredTasks(tasks: Task[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(tasks));
    window.dispatchEvent(new CustomEvent('orbit-tasks-updated'));
  } catch (e) {
    console.error('Failed to save tasks to localStorage', e);
  }
}
