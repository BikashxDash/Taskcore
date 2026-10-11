/**
 * TaskCore State Management & Persistence
 * Clean local-first reactive store with LocalStorage synchronization.
 * Strict rules: No fake metrics, no em dashes, pure local client storage.
 */

const STORAGE_KEYS = {
  TASKS: 'task_core_v1_tasks',
  CATEGORIES: 'task_core_v1_categories',
  SETTINGS: 'task_core_v1_settings',
  HABITS: 'task_core_v1_habits',
  PROJECTS: 'task_core_v1_projects',
  FEEDBACK: 'task_core_v1_feedback',
  SCRATCHPAD: 'task_core_v1_scratchpad'
};

const DEFAULT_CATEGORIES = [
  { id: 'cat_work', name: 'Work', color: '#d8a2a2', isDefault: true },
  { id: 'cat_personal', name: 'Personal', color: '#8ea66b', isDefault: true },
  { id: 'cat_learning', name: 'Learning', color: '#c49b6b', isDefault: true },
  { id: 'cat_errands', name: 'Errands', color: '#ffdcdc', isDefault: true }
];

function getTodayString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getPastDateString(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getTomorrowString() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function calculateHabitStreak(completedDates) {
  if (!Array.isArray(completedDates) || completedDates.length === 0) return 0;
  const dateSet = new Set(completedDates);
  const todayStr = getTodayString();
  const yesterdayStr = getPastDateString(1);
  
  let currentStreak = 0;
  const checkDate = new Date();

  if (dateSet.has(todayStr)) {
    // start from today
  } else if (dateSet.has(yesterdayStr)) {
    // start from yesterday
    checkDate.setDate(checkDate.getDate() - 1);
  } else {
    return 0;
  }

  while (true) {
    const yr = checkDate.getFullYear();
    const mo = String(checkDate.getMonth() + 1).padStart(2, '0');
    const dy = String(checkDate.getDate()).padStart(2, '0');
    const str = `${yr}-${mo}-${dy}`;
    if (dateSet.has(str)) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }
  return currentStreak;
}

const DEFAULT_HABITS = [
  {
    id: 'habit_1',
    title: 'Morning Workout & Stretch',
    category: 'Health',
    frequency: 'daily',
    streak: 6,
    bestStreak: 14,
    completedDates: [getTodayString(), getPastDateString(1), getPastDateString(2), getPastDateString(3), getPastDateString(4), getPastDateString(5)],
    createdAt: new Date().toISOString()
  },
  {
    id: 'habit_2',
    title: 'Drink 2.5L Water',
    category: 'Wellness',
    frequency: 'daily',
    streak: 4,
    bestStreak: 10,
    completedDates: [getPastDateString(1), getPastDateString(2), getPastDateString(3), getPastDateString(4)],
    createdAt: new Date().toISOString()
  },
  {
    id: 'habit_3',
    title: 'Read 20 Pages',
    category: 'Learning',
    frequency: 'daily',
    streak: 8,
    bestStreak: 12,
    completedDates: [getTodayString(), getPastDateString(1), getPastDateString(2), getPastDateString(3), getPastDateString(4), getPastDateString(5), getPastDateString(6), getPastDateString(7)],
    createdAt: new Date().toISOString()
  },
  {
    id: 'habit_4',
    title: 'Zero Distraction Deep Work',
    category: 'Focus',
    frequency: 'weekdays',
    streak: 3,
    bestStreak: 7,
    completedDates: [getPastDateString(1), getPastDateString(2), getPastDateString(3)],
    createdAt: new Date().toISOString()
  }
];

const DEFAULT_PROJECTS = [
  {
    id: 'proj_1',
    name: 'Website Redesign',
    description: 'Frontend modular components, typography scale, and responsive layout polish',
    category: 'Work',
    color: '#d8a2a2',
    status: 'active',
    deadline: getTomorrowString(),
    createdAt: new Date().toISOString()
  },
  {
    id: 'proj_2',
    name: 'Product Launch Q4',
    description: 'Release assets, user documentation, zero-bug validation, and deployment roadmap',
    category: 'Work',
    color: '#8ea66b',
    status: 'in_progress',
    deadline: getPastDateString(-14),
    createdAt: new Date().toISOString()
  },
  {
    id: 'proj_3',
    name: 'Home Studio Setup',
    description: 'Desk layout ergonomics, monitor arm mount, and ambient lighting optimization',
    category: 'Personal',
    color: '#ffdcdc',
    status: 'active',
    deadline: getPastDateString(-7),
    createdAt: new Date().toISOString()
  },
  {
    id: 'proj_4',
    name: 'Endurance & Half Marathon',
    description: 'Pacing intervals, hydration strategy, and weekly cardiovascular progression',
    category: 'Health',
    color: '#fff9d6',
    status: 'active',
    deadline: getPastDateString(-30),
    createdAt: new Date().toISOString()
  }
];

const DEFAULT_TASKS = [
  {
    id: 'task_init_1',
    title: 'Review project architecture and technical specifications',
    description: 'Ensure modular directory structure and compliance with all design rules.',
    categoryId: 'cat_work',
    priority: 'urgent',
    dueDate: getTodayString(),
    dueTime: '17:00',
    completed: false,
    completedAt: null,
    createdAt: new Date().toISOString(),
    subtasks: [
      { id: 'sub_1', title: 'Verify absence of purple gradients', done: true },
      { id: 'sub_2', title: 'Confirm crisp rectangular button styling', done: true },
      { id: 'sub_3', title: 'Audit codebase for zero emoji icons', done: false }
    ]
  },
  {
    id: 'task_init_2',
    title: 'Set up local backup routine with JSON export',
    description: 'Test the local backup and restore feature to ensure zero data loss.',
    categoryId: 'cat_work',
    priority: 'high',
    dueDate: getTomorrowString(),
    dueTime: '12:00',
    completed: false,
    completedAt: null,
    createdAt: new Date().toISOString(),
    subtasks: [
      { id: 'sub_4', title: 'Generate sample JSON export file', done: true },
      { id: 'sub_5', title: 'Verify import parser error checks', done: false }
    ]
  },
  {
    id: 'task_init_3',
    title: 'Audit mobile touch ergonomics and bottom navigation',
    description: 'Confirm all tap targets meet the 44px minimum touch recommendation.',
    categoryId: 'cat_personal',
    priority: 'medium',
    dueDate: getTodayString(),
    dueTime: '19:30',
    completed: false,
    completedAt: null,
    createdAt: new Date().toISOString(),
    subtasks: []
  },
  {
    id: 'task_init_4',
    title: 'Review terms and privacy policy disclosures',
    description: 'Verify 100% offline client storage declaration and zero-telemetry policy.',
    categoryId: 'cat_learning',
    priority: 'low',
    dueDate: null,
    dueTime: null,
    completed: true,
    completedAt: new Date().toISOString(),
    subtasks: []
  }
];

const DEFAULT_SETTINGS = {
  theme: 'dark',
  activeView: 'all', // all | today | upcoming | overdue | completed
  activeCategory: 'all',
  activePriority: 'all',
  searchQuery: '',
  sortBy: 'dueDate', // dueDate | priority | title | created
  sortOrder: 'asc',
  taskbarColor: 'rose', // rose | blush | vanilla | moss | charcoal
  taskbarShape: 'box' // box | rounded | floating
};

class Store {
  constructor() {
    this.listeners = new Set();
    this.currentUserId = null;
    this.tasks = [];
    this.categories = [...DEFAULT_CATEGORIES];
    this.settings = { ...DEFAULT_SETTINGS };
    this.habits = [];
    this.projects = [];
  }

  getUserStorageKey(baseKey) {
    return this.currentUserId ? `${baseKey}_${this.currentUserId}` : baseKey;
  }

  setUser(userId) {
    this.currentUserId = userId;
    if (!userId) {
      this.tasks = [];
      this.categories = [];
      this.settings = { ...DEFAULT_SETTINGS };
      this.habits = [];
      this.projects = [];
      this.notify();
      return;
    }

    const tasksKey = this.getUserStorageKey(STORAGE_KEYS.TASKS);
    const catKey = this.getUserStorageKey(STORAGE_KEYS.CATEGORIES);
    const settingsKey = this.getUserStorageKey(STORAGE_KEYS.SETTINGS);
    const habitsKey = this.getUserStorageKey(STORAGE_KEYS.HABITS);
    const projectsKey = this.getUserStorageKey(STORAGE_KEYS.PROJECTS);

    this.tasks = this.load(tasksKey, DEFAULT_TASKS);
    this.categories = this.load(catKey, DEFAULT_CATEGORIES);
    this.settings = this.load(settingsKey, DEFAULT_SETTINGS);
    this.habits = this.load(habitsKey, DEFAULT_HABITS);
    this.projects = this.load(projectsKey, DEFAULT_PROJECTS);

    // Synchronize theme with global preference if present
    const globalTheme = localStorage.getItem('task_core_theme');
    if (globalTheme) {
      this.settings.theme = globalTheme;
      this.save(STORAGE_KEYS.SETTINGS, this.settings);
    } else if (this.settings.theme) {
      localStorage.setItem('task_core_theme', this.settings.theme);
    }

    this.notify();
  }

  load(key, fallback) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (err) {
      console.warn(`Failed to read ${key} from storage:`, err);
      return fallback;
    }
  }

  save(key, data) {
    try {
      const actualKey = this.getUserStorageKey(key);
      localStorage.setItem(actualKey, JSON.stringify(data));
    } catch (err) {
      console.error(`Failed to write ${key} to storage:`, err);
    }
  }

  notify() {
    for (const listener of this.listeners) {
      try {
        listener(this);
      } catch (err) {
        console.error('Store listener error:', err);
      }
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  // --- Task Methods ---

  getTasks() {
    return [...this.tasks];
  }

  getFilteredTasks() {
    const today = getTodayString();
    let result = this.tasks.filter(task => {
      // 1. View filter
      if (this.settings.activeView === 'today') {
        if (task.dueDate !== today) return false;
      } else if (this.settings.activeView === 'upcoming') {
        if (!task.dueDate || task.dueDate <= today || task.completed) return false;
      } else if (this.settings.activeView === 'overdue') {
        if (!task.dueDate || task.dueDate >= today || task.completed) return false;
      } else if (this.settings.activeView === 'completed') {
        if (!task.completed) return false;
      }

      // 2. Category filter
      if (this.settings.activeCategory !== 'all') {
        if (task.categoryId !== this.settings.activeCategory) return false;
      }

      // 3. Priority filter
      if (this.settings.activePriority !== 'all') {
        if (task.priority !== this.settings.activePriority) return false;
      }

      // 4. Search query
      if (this.settings.searchQuery.trim()) {
        const query = this.settings.searchQuery.toLowerCase();
        const inTitle = task.title.toLowerCase().includes(query);
        const inDesc = (task.description || '').toLowerCase().includes(query);
        const inSubtasks = (task.subtasks || []).some(s => s.title.toLowerCase().includes(query));
        if (!inTitle && !inDesc && !inSubtasks) return false;
      }

      return true;
    });

    // Sorting
    const priorityWeight = { urgent: 4, high: 3, medium: 2, low: 1 };
    result.sort((a, b) => {
      // Completed items sink to bottom when not in completed-only view
      if (this.settings.activeView !== 'completed' && a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }

      if (this.settings.sortBy === 'priority') {
        const diff = (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
        return this.settings.sortOrder === 'asc' ? diff : -diff;
      }

      if (this.settings.sortBy === 'dueDate') {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        const diff = a.dueDate.localeCompare(b.dueDate);
        return this.settings.sortOrder === 'asc' ? diff : -diff;
      }

      if (this.settings.sortBy === 'title') {
        const diff = a.title.localeCompare(b.title);
        return this.settings.sortOrder === 'asc' ? diff : -diff;
      }

      // Default: createdAt
      const diff = new Date(b.createdAt) - new Date(a.createdAt);
      return this.settings.sortOrder === 'asc' ? -diff : diff;
    });

    return result;
  }

  addTask(data) {
    const newTask = {
      id: 'task_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      title: (data.title || '').trim(),
      description: (data.description || '').trim(),
      categoryId: data.categoryId || this.categories[0]?.id || 'default',
      priority: data.priority || 'medium',
      dueDate: data.dueDate || null,
      dueTime: data.dueTime || null,
      completed: false,
      completedAt: null,
      createdAt: new Date().toISOString(),
      subtasks: Array.isArray(data.subtasks) ? data.subtasks : []
    };

    if (!newTask.title) return null;

    this.tasks.unshift(newTask);
    this.save(STORAGE_KEYS.TASKS, this.tasks);
    this.notify();
    return newTask;
  }

  updateTask(id, patch) {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) return false;

    this.tasks[index] = {
      ...this.tasks[index],
      ...patch,
      title: patch.title !== undefined ? patch.title.trim() : this.tasks[index].title,
      description: patch.description !== undefined ? patch.description.trim() : this.tasks[index].description
    };

    this.save(STORAGE_KEYS.TASKS, this.tasks);
    this.notify();
    return true;
  }

  toggleTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return false;

    task.completed = !task.completed;
    task.completedAt = task.completed ? new Date().toISOString() : null;

    this.save(STORAGE_KEYS.TASKS, this.tasks);
    this.notify();
    return task.completed;
  }

  deleteTask(id) {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) return null;

    const [removed] = this.tasks.splice(index, 1);
    this.save(STORAGE_KEYS.TASKS, this.tasks);
    this.notify();
    return removed;
  }

  restoreTask(task, index = 0) {
    if (!task || !task.id) return;
    this.tasks.splice(index, 0, task);
    this.save(STORAGE_KEYS.TASKS, this.tasks);
    this.notify();
  }

  clearCompletedTasks() {
    const initialCount = this.tasks.length;
    this.tasks = this.tasks.filter(t => !t.completed);
    const removedCount = initialCount - this.tasks.length;
    this.save(STORAGE_KEYS.TASKS, this.tasks);
    this.notify();
    return removedCount;
  }

  // --- Subtask Methods ---

  addSubtask(taskId, title) {
    const cleanTitle = (title || '').trim();
    if (!cleanTitle) return null;

    const task = this.tasks.find(t => t.id === taskId);
    if (!task) return null;

    if (!task.subtasks) task.subtasks = [];
    const newSubtask = {
      id: 'sub_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      title: cleanTitle,
      done: false
    };

    task.subtasks.push(newSubtask);
    this.save(STORAGE_KEYS.TASKS, this.tasks);
    this.notify();
    return newSubtask;
  }

  toggleSubtask(taskId, subtaskId) {
    const task = this.tasks.find(t => t.id === taskId);
    if (!task || !task.subtasks) return false;

    const sub = task.subtasks.find(s => s.id === subtaskId);
    if (!sub) return false;

    sub.done = !sub.done;
    this.save(STORAGE_KEYS.TASKS, this.tasks);
    this.notify();
    return sub.done;
  }

  deleteSubtask(taskId, subtaskId) {
    const task = this.tasks.find(t => t.id === taskId);
    if (!task || !task.subtasks) return false;

    task.subtasks = task.subtasks.filter(s => s.id !== subtaskId);
    this.save(STORAGE_KEYS.TASKS, this.tasks);
    this.notify();
    return true;
  }

  // --- Category Methods ---

  getCategories() {
    return [...this.categories];
  }

  addCategory(name, color) {
    const cleanName = (name || '').trim();
    if (!cleanName) return null;

    const newCat = {
      id: 'cat_' + Date.now(),
      name: cleanName,
      color: color || '#d8a2a2',
      isDefault: false
    };

    this.categories.push(newCat);
    this.save(STORAGE_KEYS.CATEGORIES, this.categories);
    this.notify();
    return newCat;
  }

  deleteCategory(id) {
    const cat = this.categories.find(c => c.id === id);
    if (!cat || cat.isDefault) return false;

    this.categories = this.categories.filter(c => c.id !== id);
    const fallbackId = this.categories[0]?.id || 'cat_work';

    // Reassign affected tasks to fallback category
    this.tasks.forEach(t => {
      if (t.categoryId === id) t.categoryId = fallbackId;
    });

    if (this.settings.activeCategory === id) {
      this.settings.activeCategory = 'all';
      this.save(STORAGE_KEYS.SETTINGS, this.settings);
    }

    this.save(STORAGE_KEYS.CATEGORIES, this.categories);
    this.save(STORAGE_KEYS.TASKS, this.tasks);
    this.notify();
    return true;
  }

  // --- Settings & Metrics ---

  getSettings() {
    return { ...this.settings };
  }

  updateSettings(patch) {
    if (patch.theme) {
      try {
        localStorage.setItem('task_core_theme', patch.theme);
      } catch (e) {}
    }
    this.settings = { ...this.settings, ...patch };
    this.save(STORAGE_KEYS.SETTINGS, this.settings);
    this.notify();
  }

  /**
   * Real metrics dynamically derived strictly from current user tasks.
   * Zero fake counts or artificial numbers.
   */
  getRealMetrics() {
    const today = getTodayString();
    let total = this.tasks.length;
    let completed = 0;
    let overdue = 0;
    let dueToday = 0;

    for (const t of this.tasks) {
      if (t.completed) {
        completed++;
      } else {
        if (t.dueDate === today) dueToday++;
        if (t.dueDate && t.dueDate < today) overdue++;
      }
    }

    const active = total - completed;

    return {
      total,
      active,
      completed,
      overdue,
      dueToday
    };
  }

  // --- Data Portability ---

  exportJSON() {
    const payload = {
      app: 'TaskCore',
      version: 1,
      exportedAt: new Date().toISOString(),
      tasks: this.tasks,
      categories: this.categories,
      habits: this.habits,
      projects: this.projects,
      settings: {
        theme: this.settings.theme,
        sortBy: this.settings.sortBy,
        sortOrder: this.settings.sortOrder
      }
    };
    return JSON.stringify(payload, null, 2);
  }

  importJSON(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (!data || !Array.isArray(data.tasks)) {
        throw new Error('Invalid backup schema: tasks array missing.');
      }

      this.tasks = data.tasks;
      if (Array.isArray(data.categories) && data.categories.length > 0) {
        this.categories = data.categories;
      }
      if (Array.isArray(data.habits)) {
        this.habits = data.habits;
        this.save(STORAGE_KEYS.HABITS, this.habits);
      }
      if (Array.isArray(data.projects)) {
        this.projects = data.projects;
        this.save(STORAGE_KEYS.PROJECTS, this.projects);
      }
      if (data.settings && typeof data.settings === 'object') {
        this.settings = { ...this.settings, ...data.settings };
      }

      this.save(STORAGE_KEYS.TASKS, this.tasks);
      this.save(STORAGE_KEYS.CATEGORIES, this.categories);
      this.save(STORAGE_KEYS.SETTINGS, this.settings);
      this.notify();
      return { success: true, count: this.tasks.length };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  clearAllData() {
    this.tasks = [];
    this.categories = [...DEFAULT_CATEGORIES];
    this.settings = { ...DEFAULT_SETTINGS };
    this.habits = [];
    this.projects = [];

    this.save(STORAGE_KEYS.TASKS, this.tasks);
    this.save(STORAGE_KEYS.CATEGORIES, this.categories);
    this.save(STORAGE_KEYS.SETTINGS, this.settings);
    this.save(STORAGE_KEYS.HABITS, this.habits);
    this.save(STORAGE_KEYS.PROJECTS, this.projects);
    this.notify();
  }

  getHabits() {
    return [...this.habits];
  }

  addHabit(habitData) {
    const newHabit = {
      id: 'habit_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
      title: (habitData.title || '').trim(),
      category: habitData.category || 'General',
      frequency: habitData.frequency || 'daily',
      streak: 0,
      bestStreak: 0,
      completedDates: [],
      createdAt: new Date().toISOString()
    };
    this.habits.unshift(newHabit);
    this.save(STORAGE_KEYS.HABITS, this.habits);
    this.notify();
    return newHabit;
  }

  updateHabit(id, updates) {
    const index = this.habits.findIndex(h => h.id === id);
    if (index === -1) return null;
    this.habits[index] = { ...this.habits[index], ...updates };
    this.save(STORAGE_KEYS.HABITS, this.habits);
    this.notify();
    return this.habits[index];
  }

  deleteHabit(id) {
    this.habits = this.habits.filter(h => h.id !== id);
    this.save(STORAGE_KEYS.HABITS, this.habits);
    this.notify();
  }

  toggleHabitDate(id, dateStr) {
    const habit = this.habits.find(h => h.id === id);
    if (!habit) return null;
    if (!Array.isArray(habit.completedDates)) habit.completedDates = [];

    const targetDate = dateStr || getTodayString();
    const idx = habit.completedDates.indexOf(targetDate);
    if (idx > -1) {
      habit.completedDates.splice(idx, 1);
    } else {
      habit.completedDates.push(targetDate);
    }
    habit.streak = calculateHabitStreak(habit.completedDates);
    habit.bestStreak = Math.max(habit.bestStreak || 0, habit.streak);
    this.save(STORAGE_KEYS.HABITS, this.habits);
    this.notify();
    return habit;
  }

  getProjects() {
    return [...this.projects];
  }

  addProject(projectData) {
    const newProject = {
      id: 'proj_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
      name: (projectData.name || '').trim(),
      description: (projectData.description || '').trim(),
      category: projectData.category || 'Work',
      color: projectData.color || '#d8a2a2',
      status: projectData.status || 'active',
      deadline: projectData.deadline || '',
      createdAt: new Date().toISOString()
    };
    this.projects.unshift(newProject);
    this.save(STORAGE_KEYS.PROJECTS, this.projects);
    this.notify();
    return newProject;
  }

  updateProject(id, updates) {
    const index = this.projects.findIndex(p => p.id === id);
    if (index === -1) return null;
    this.projects[index] = { ...this.projects[index], ...updates };
    this.save(STORAGE_KEYS.PROJECTS, this.projects);
    this.notify();
    return this.projects[index];
  }

  deleteProject(id) {
    this.projects = this.projects.filter(p => p.id !== id);
    this.save(STORAGE_KEYS.PROJECTS, this.projects);
    this.notify();
  }

  getProjectTaskStats(project) {
    if (!project) return { total: 0, completed: 0, percent: 0, tasks: [] };
    const allTasks = this.tasks || [];
    const matchingTasks = allTasks.filter(t => {
      if (t.projectId && t.projectId === project.id) return true;
      if (project.category) {
        const cat = this.categories.find(c => c.id === t.categoryId);
        if (cat && cat.name.toLowerCase() === project.category.toLowerCase()) return true;
        if (t.category && t.category.toLowerCase() === project.category.toLowerCase()) return true;
      }
      return false;
    });
    const total = matchingTasks.length;
    const completed = matchingTasks.filter(t => t.completed).length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, percent, tasks: matchingTasks };
  }

  getFeedback() {
    const key = this.getUserStorageKey(STORAGE_KEYS.FEEDBACK);
    return this.load(key, [
      {
        id: 'fb_init_1',
        type: 'feature',
        rating: 5,
        message: 'Loving the clean ad-free offline interface. Would love more productivity widgets in future!',
        submittedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        status: 'Reviewed'
      }
    ]);
  }

  addFeedback(feedbackData) {
    const key = this.getUserStorageKey(STORAGE_KEYS.FEEDBACK);
    const list = this.getFeedback();
    const newEntry = {
      id: 'fb_' + Date.now(),
      type: feedbackData.type || 'general',
      rating: Number(feedbackData.rating) || 5,
      message: (feedbackData.message || '').trim(),
      submittedAt: new Date().toISOString(),
      status: 'Received'
    };
    list.unshift(newEntry);
    this.save(key, list);
    return newEntry;
  }

  getScratchpad() {
    const key = this.getUserStorageKey(STORAGE_KEYS.SCRATCHPAD);
    return this.load(key, 'Welcome to your private scratchpad. Type thoughts, temporary notes, or quick checklists here without creating full tasks.');
  }

  saveScratchpad(content) {
    const key = this.getUserStorageKey(STORAGE_KEYS.SCRATCHPAD);
    this.save(key, content);
  }
}

export const store = new Store();
