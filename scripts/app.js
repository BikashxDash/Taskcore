/**
 * TaskCore Application Controller
 * Strict guidelines:
 * - No emoji icons (uses vector SVG from icons.js)
 * - No em dashes in UI strings or comments
 * - No fake metrics or customer counters
 * - Multi-device desktop and mobile navigation
 * - Privacy Policy and Terms of Service routing
 */

import { store } from './store.js';
import { auth } from './auth.js';
import { renderIcon } from './icons.js';

// DOM Element Selectors
const elements = {
  // Welcome Screen
  welcomeScreen: document.getElementById('welcomeScreen'),
  welcomeContinueBtn: document.getElementById('welcomeContinueBtn'),

  // Authentication Elements
  authScreen: document.getElementById('authScreen'),
  appContainer: document.getElementById('appContainer'),
  tabSignInBtn: document.getElementById('tabSignInBtn'),
  tabRegisterBtn: document.getElementById('tabRegisterBtn'),
  switchToRegisterBtn: document.getElementById('switchToRegisterBtn'),
  switchToSignInBtn: document.getElementById('switchToSignInBtn'),
  authSubtitle: document.getElementById('authSubtitle'),
  signInForm: document.getElementById('signInForm'),
  registerForm: document.getElementById('registerForm'),
  authErrorAlert: document.getElementById('authErrorAlert'),
  authErrorText: document.getElementById('authErrorText'),
  loginIdentifier: document.getElementById('loginIdentifier'),
  loginPassword: document.getElementById('loginPassword'),
  registerName: document.getElementById('registerName'),
  registerEmail: document.getElementById('registerEmail'),
  registerUsername: document.getElementById('registerUsername'),
  registerPassword: document.getElementById('registerPassword'),
  registerConfirmPassword: document.getElementById('registerConfirmPassword'),
  registerTermsCheck: document.getElementById('registerTermsCheck'),
  sidebarUserProfile: document.getElementById('sidebarUserProfile'),
  sidebarUserName: document.getElementById('sidebarUserName'),
  sidebarUserHandle: document.getElementById('sidebarUserHandle'),
  sidebarLogoutBtn: document.getElementById('sidebarLogoutBtn'),
  headerLogoutBtn: document.getElementById('headerLogoutBtn'),
  profileLogoutBtn: document.getElementById('profileLogoutBtn'),

  // Navigation & Views
  sidebar: document.getElementById('sidebar'),
  mobileMenuBtn: document.getElementById('mobileMenuBtn'),
  sidebarCloseBtn: document.getElementById('sidebarCloseBtn'),
  themeToggleBtn: document.getElementById('themeToggleBtn'),
  navButtons: document.querySelectorAll('.nav-item-btn'),
  categoryList: document.getElementById('categoryList'),
  addCategoryBtn: document.getElementById('addCategoryBtn'),
  
  // Header & Search
  searchInput: document.getElementById('searchInput'),
  searchClearBtn: document.getElementById('searchClearBtn'),
  currentViewTitle: document.getElementById('currentViewTitle'),
  
  // Real Metrics
  metricActive: document.getElementById('metricActive'),
  metricCompleted: document.getElementById('metricCompleted'),
  metricOverdue: document.getElementById('metricOverdue'),
  metricToday: document.getElementById('metricToday'),
  
  // Workspace Controls
  btnOpenNewTaskModal: document.getElementById('btnOpenNewTaskModal'),
  sortSelect: document.getElementById('sortSelect'),
  
  // Quick Add Form (Deprecated / Removed from inline workspace)
  quickAddForm: document.getElementById('quickAddForm'),
  quickAddInput: document.getElementById('quickAddInput'),
  quickAddCategory: document.getElementById('quickAddCategory'),
  quickAddPriority: document.getElementById('quickAddPriority'),
  quickAddDate: document.getElementById('quickAddDate'),
  
  // Task Feed
  taskListContainer: document.getElementById('taskListContainer'),
  emptyState: document.getElementById('emptyState'),
  
  // Task Modal
  taskModal: document.getElementById('taskModal'),
  modalTitleLabel: document.getElementById('modalTitleLabel'),
  taskModalCloseBtn: document.getElementById('taskModalCloseBtn'),
  taskModalCancelBtn: document.getElementById('taskModalCancelBtn'),
  taskModalSubmitBtn: document.getElementById('taskModalSubmitBtn'),
  taskModalForm: document.getElementById('taskModalForm'),
  modalTaskId: document.getElementById('modalTaskId'),
  modalTaskTitle: document.getElementById('modalTaskTitle'),
  modalTaskDescription: document.getElementById('modalTaskDescription'),
  modalTaskCategory: document.getElementById('modalTaskCategory'),
  modalTaskPriority: document.getElementById('modalTaskPriority'),
  modalTaskDate: document.getElementById('modalTaskDate'),
  modalTaskTime: document.getElementById('modalTaskTime'),
  modalSubtasksSection: document.getElementById('modalSubtasksSection'),
  modalSubtasksList: document.getElementById('modalSubtasksList'),
  modalNewSubtaskInput: document.getElementById('modalNewSubtaskInput'),
  modalAddSubtaskBtn: document.getElementById('modalAddSubtaskBtn'),
  modalDeleteBtn: document.getElementById('modalDeleteBtn'),
  
  // Category Modal
  categoryModal: document.getElementById('categoryModal'),
  categoryModalCloseBtn: document.getElementById('categoryModalCloseBtn'),
  categoryForm: document.getElementById('categoryForm'),
  categoryNameInput: document.getElementById('categoryNameInput'),
  categoryColorInput: document.getElementById('categoryColorInput'),
  
  // Backup / Restore
  exportBtn: document.getElementById('exportBtn'),
  importFileInput: document.getElementById('importFileInput'),
  importBtn: document.getElementById('importBtn'),
  
  // Legal & Profile Pages
  tasksWorkspace: document.getElementById('tasksWorkspace'),
  privacyView: document.getElementById('privacyView'),
  termsView: document.getElementById('termsView'),
  profileView: document.getElementById('profileView'),
  privacyNavBtns: document.querySelectorAll('[data-view-target="privacy"]'),
  termsNavBtns: document.querySelectorAll('[data-view-target="terms"]'),
  profileNavBtns: document.querySelectorAll('[data-view-target="profile"]'),
  backToTasksBtns: document.querySelectorAll('.back-to-tasks-btn'),
  
  // Mobile Bottom Nav (Taskbar)
  mobileBottomNav: document.getElementById('mobileBottomNav'),
  mobileNavTasks: document.getElementById('mobileNavTasks'),
  mobileNavHabits: document.getElementById('mobileNavHabits'),
  mobileNavAdd: document.getElementById('mobileNavAdd'),
  mobileNavProjects: document.getElementById('mobileNavProjects'),
  mobileNavProfile: document.getElementById('mobileNavProfile'),
  sidebarNavHabits: document.getElementById('sidebarNavHabits'),
  sidebarNavProjects: document.getElementById('sidebarNavProjects'),

  // Habits Tracker Elements
  habitsView: document.getElementById('habitsView'),
  habitsListContainer: document.getElementById('habitsListContainer'),
  habitsEmptyState: document.getElementById('habitsEmptyState'),
  btnOpenNewHabitModal: document.getElementById('btnOpenNewHabitModal'),
  btnCreateFirstHabit: document.getElementById('btnCreateFirstHabit'),
  habitModal: document.getElementById('habitModal'),
  habitModalCloseBtn: document.getElementById('habitModalCloseBtn'),
  habitModalCancelBtn: document.getElementById('habitModalCancelBtn'),
  habitModalForm: document.getElementById('habitModalForm'),
  modalHabitId: document.getElementById('modalHabitId'),
  modalHabitTitle: document.getElementById('modalHabitTitle'),
  modalHabitCategory: document.getElementById('modalHabitCategory'),
  modalHabitFrequency: document.getElementById('modalHabitFrequency'),
  habitModalTitleLabel: document.getElementById('habitModalTitleLabel'),
  metricActiveHabits: document.getElementById('metricActiveHabits'),
  metricCompletedHabits: document.getElementById('metricCompletedHabits'),
  metricBestStreak: document.getElementById('metricBestStreak'),
  metricHabitRate: document.getElementById('metricHabitRate'),

  // Projects Tracker Elements
  projectsView: document.getElementById('projectsView'),
  projectsListContainer: document.getElementById('projectsListContainer'),
  projectsEmptyState: document.getElementById('projectsEmptyState'),
  btnOpenNewProjectModal: document.getElementById('btnOpenNewProjectModal'),
  btnCreateFirstProject: document.getElementById('btnCreateFirstProject'),
  projectModal: document.getElementById('projectModal'),
  projectModalCloseBtn: document.getElementById('projectModalCloseBtn'),
  projectModalCancelBtn: document.getElementById('projectModalCancelBtn'),
  modalProjectDeleteBtn: document.getElementById('modalProjectDeleteBtn'),
  projectModalForm: document.getElementById('projectModalForm'),
  modalProjectId: document.getElementById('modalProjectId'),
  modalProjectName: document.getElementById('modalProjectName'),
  modalProjectDescription: document.getElementById('modalProjectDescription'),
  modalProjectCategory: document.getElementById('modalProjectCategory'),
  modalProjectStatus: document.getElementById('modalProjectStatus'),
  modalProjectDeadline: document.getElementById('modalProjectDeadline'),
  modalProjectColor: document.getElementById('modalProjectColor'),
  projectModalTitleLabel: document.getElementById('projectModalTitleLabel'),
  metricTotalProjects: document.getElementById('metricTotalProjects'),
  metricActiveProjects: document.getElementById('metricActiveProjects'),
  metricCompletedProjects: document.getElementById('metricCompletedProjects'),
  metricProjectAvgProgress: document.getElementById('metricProjectAvgProgress'),

  // Profile View Elements
  profileDisplayName: document.getElementById('profileDisplayName'),
  profileUserHandleEmail: document.getElementById('profileUserHandleEmail'),
  previewAccountName: document.getElementById('previewAccountName'),
  previewAccountEmail: document.getElementById('previewAccountEmail'),
  accountSuggestionCard: document.getElementById('accountSuggestionCard'),
  modifyAccountContainer: document.getElementById('modifyAccountContainer'),
  btnEditProfile: document.getElementById('btnEditProfile'),
  btnOpenAccountModify: document.getElementById('btnOpenAccountModify'),
  btnCloseAccountModifyTop: document.getElementById('btnCloseAccountModifyTop'),
  btnCancelAccountModify: document.getElementById('btnCancelAccountModify'),
  profileAccountForm: document.getElementById('profileAccountForm'),
  editProfileName: document.getElementById('editProfileName'),
  editProfileEmail: document.getElementById('editProfileEmail'),
  customizationToggleBtn: document.getElementById('customizationToggleBtn'),
  customizationOptionsContent: document.getElementById('customizationOptionsContent'),
  customizationToggleChevron: document.getElementById('customizationToggleChevron'),
  taskbarColorSwatches: document.getElementById('taskbarColorSwatches'),
  taskbarShapeGroup: document.getElementById('taskbarShapeGroup'),
  donateSectionBlock: document.getElementById('donateSectionBlock'),
  activeDonationBadge: document.getElementById('activeDonationBadge'),
  btnSelectFreePlan: document.getElementById('btnSelectFreePlan'),
  widgetTimerDisplay: document.getElementById('widgetTimerDisplay'),
  timerStatusBadge: document.getElementById('timerStatusBadge'),
  btnTimerToggle: document.getElementById('btnTimerToggle'),
  btnTimerReset: document.getElementById('btnTimerReset'),
  widgetQuoteText: document.getElementById('widgetQuoteText'),
  widgetQuoteAuthor: document.getElementById('widgetQuoteAuthor'),
  btnRefreshQuote: document.getElementById('btnRefreshQuote'),
  widgetScratchpadArea: document.getElementById('widgetScratchpadArea'),
  scratchpadStatus: document.getElementById('scratchpadStatus'),
  feedbackForm: document.getElementById('feedbackForm'),
  feedbackCategorySelect: document.getElementById('feedbackCategorySelect'),
  feedbackRatingGroup: document.getElementById('feedbackRatingGroup'),
  feedbackMessageArea: document.getElementById('feedbackMessageArea'),
  btnSubmitFeedback: document.getElementById('btnSubmitFeedback'),
  feedbackHistoryList: document.getElementById('feedbackHistoryList'),
  devicesListContainer: document.getElementById('devicesListContainer'),
  profileLogoutBtn: document.getElementById('profileLogoutBtn'),
  
  // Calendar Strip & Maximized Component
  taskCalendarSection: document.getElementById('taskCalendarSection'),
  calendarMonthLabel: document.getElementById('calendarMonthLabel'),
  calendarSelectedBadge: document.getElementById('calendarSelectedBadge'),
  calendarMaximizeBtn: document.getElementById('calendarMaximizeBtn'),
  calendarMaximizeIcon: document.getElementById('calendarMaximizeIcon'),
  calendarStripContainer: document.getElementById('calendarStripContainer'),
  calendarStripTrack: document.getElementById('calendarStripTrack'),
  calendarMaximizedView: document.getElementById('calendarMaximizedView'),
  calendarGridCells: document.getElementById('calendarGridCells'),
  
  // Toast Container
  toastContainer: document.getElementById('toastContainer')
};

// Internal active modal editing state
let currentEditingTaskId = null;

// Calendar Component State
let calendarSelectedDate = getTodayDateString();
let calendarIsMaximized = false;
let calendarMonthViewDate = new Date();

function getTodayDateString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const CALENDAR_MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const CALENDAR_DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function formatIsoDate(d) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function selectCalendarDate(dateStr) {
  calendarSelectedDate = dateStr;
  if (elements.quickAddDate) {
    elements.quickAddDate.value = dateStr;
  }
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    calendarMonthViewDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, 1);
  }
  renderCalendar();
}

function scrollStripToDate(dateStr, smooth = true) {
  if (!elements.calendarStripTrack) return;
  const targetCard = elements.calendarStripTrack.querySelector(`.cal-day-card[data-date="${dateStr}"]`);
  if (targetCard) {
    const trackWidth = elements.calendarStripTrack.clientWidth;
    const cardLeft = targetCard.offsetLeft;
    const cardWidth = targetCard.clientWidth;
    const targetScroll = cardLeft - (trackWidth / 2) + (cardWidth / 2);
    elements.calendarStripTrack.scrollTo({
      left: Math.max(0, targetScroll),
      behavior: smooth ? 'smooth' : 'auto'
    });
  }
}

function renderCalendarStrip(todayStr, selectedDate) {
  if (!elements.calendarStripTrack) return;
  elements.calendarStripTrack.innerHTML = '';

  const baseDate = new Date();
  const startOffset = 0;
  const totalDays = 45;

  for (let i = 0; i < totalDays; i++) {
    const d = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + startOffset + i);
    const dateStr = formatIsoDate(d);
    const dayNum = d.getDate();
    const dayName = CALENDAR_DAY_NAMES[d.getDay()];
    const isToday = (dateStr === todayStr);
    const isSelected = (dateStr === selectedDate);

    const taskCount = store.getTasks().filter(t => t.dueDate === dateStr && !t.completed).length;

    const card = document.createElement('button');
    card.type = 'button';
    card.className = `cal-day-card ${isToday ? 'is-today' : ''} ${isSelected ? 'is-selected' : ''}`;
    card.dataset.date = dateStr;
    card.setAttribute('role', 'tab');
    card.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    card.title = isToday ? `Today (${dayName}, ${dayNum})` : `${dayName}, ${dayNum}`;

    let html = '';
    if (isToday) {
      html += `<span class="cal-today-pill">TODAY</span>`;
    }
    html += `<span class="cal-day-number">${dayNum}</span>`;
    html += `<span class="cal-day-name">${dayName}</span>`;
    if (taskCount > 0 && !isToday) {
      html += `<div class="cal-task-dot-wrap"><span class="cal-task-dot" title="${taskCount} task(s)"></span></div>`;
    }
    card.innerHTML = html;

    card.addEventListener('click', () => {
      selectCalendarDate(dateStr);
    });

    elements.calendarStripTrack.appendChild(card);
  }
}

function renderMaximizedCalendarGrid(todayStr, selectedDate) {
  if (!elements.calendarGridCells) return;
  elements.calendarGridCells.innerHTML = '';

  const viewYear = calendarMonthViewDate.getFullYear();
  const viewMonthIndex = calendarMonthViewDate.getMonth();

  const firstDay = new Date(viewYear, viewMonthIndex, 1);
  const startWeekday = firstDay.getDay();
  const totalDays = new Date(viewYear, viewMonthIndex + 1, 0).getDate();
  const prevMonthLastDay = new Date(viewYear, viewMonthIndex, 0).getDate();

  // Leading days from previous month
  for (let i = startWeekday - 1; i >= 0; i--) {
    const dayNum = prevMonthLastDay - i;
    const prevDate = new Date(viewYear, viewMonthIndex - 1, dayNum);
    const dateStr = formatIsoDate(prevDate);
    const cell = createCalendarGridCell(prevDate, dateStr, dayNum, true, todayStr, selectedDate);
    elements.calendarGridCells.appendChild(cell);
  }

  // Days in current month
  for (let dayNum = 1; dayNum <= totalDays; dayNum++) {
    const curDate = new Date(viewYear, viewMonthIndex, dayNum);
    const dateStr = formatIsoDate(curDate);
    const cell = createCalendarGridCell(curDate, dateStr, dayNum, false, todayStr, selectedDate);
    elements.calendarGridCells.appendChild(cell);
  }

  // Trailing days for next month
  const totalRendered = startWeekday + totalDays;
  const remainingCells = (7 - (totalRendered % 7)) % 7;
  for (let d = 1; d <= remainingCells; d++) {
    const nextDate = new Date(viewYear, viewMonthIndex + 1, d);
    const dateStr = formatIsoDate(nextDate);
    const cell = createCalendarGridCell(nextDate, dateStr, d, true, todayStr, selectedDate);
    elements.calendarGridCells.appendChild(cell);
  }
}

function createCalendarGridCell(dateObj, dateStr, dayNum, isOtherMonth, todayStr, selectedDate) {
  const dayName = CALENDAR_DAY_NAMES[dateObj.getDay()];
  const isToday = (dateStr === todayStr);
  const isSelected = (dateStr === selectedDate);
  const taskCount = store.getTasks().filter(t => t.dueDate === dateStr && !t.completed).length;

  const cell = document.createElement('button');
  cell.type = 'button';
  cell.className = `cal-grid-cell ${isOtherMonth ? 'is-other-month' : ''} ${isToday ? 'is-today' : ''} ${isSelected ? 'is-selected' : ''}`;
  cell.dataset.date = dateStr;
  cell.title = isToday ? `Today (${dayName}, ${dayNum})` : `${dayName}, ${dayNum}`;

  let html = '';
  if (isToday) {
    html += `<span class="cal-grid-today-badge">TODAY</span>`;
  }
  html += `<span class="cal-day-number">${dayNum}</span>`;
  html += `<span class="cal-day-name">${dayName}</span>`;
  if (taskCount > 0 && !isToday) {
    html += `<div class="cal-task-dot-wrap"><span class="cal-task-dot" title="${taskCount} task(s)"></span></div>`;
  }
  cell.innerHTML = html;

  cell.addEventListener('click', () => {
    selectCalendarDate(dateStr);
  });

  return cell;
}

function renderCalendar() {
  if (!elements.taskCalendarSection) return;

  const todayStr = getTodayDateString();
  const selectedDate = calendarSelectedDate || todayStr;

  const viewYear = calendarMonthViewDate.getFullYear();
  const viewMonthIndex = calendarMonthViewDate.getMonth();
  if (elements.calendarMonthLabel) {
    elements.calendarMonthLabel.textContent = `${CALENDAR_MONTH_NAMES[viewMonthIndex]} ${viewYear}`;
  }

  if (elements.calendarSelectedBadge) {
    if (selectedDate === todayStr) {
      elements.calendarSelectedBadge.textContent = 'Today';
    } else {
      const parts = selectedDate.split('-');
      if (parts.length === 3) {
        const mIndex = parseInt(parts[1], 10) - 1;
        elements.calendarSelectedBadge.textContent = `${CALENDAR_MONTH_NAMES[mIndex].substring(0, 3)} ${parseInt(parts[2], 10)}`;
      } else {
        elements.calendarSelectedBadge.textContent = selectedDate;
      }
    }
  }

  renderCalendarStrip(todayStr, selectedDate);

  if (calendarIsMaximized) {
    renderMaximizedCalendarGrid(todayStr, selectedDate);
  }
}

function toggleCalendarMaximize() {
  calendarIsMaximized = !calendarIsMaximized;
  if (calendarIsMaximized) {
    if (elements.calendarMaximizedView) elements.calendarMaximizedView.style.display = 'flex';
    if (elements.calendarStripContainer) elements.calendarStripContainer.style.display = 'none';
    if (elements.calendarMaximizeIcon) elements.calendarMaximizeIcon.innerHTML = renderIcon('minimize');
    if (elements.calendarMaximizeBtn) elements.calendarMaximizeBtn.title = 'Minimize to Row Format';
  } else {
    if (elements.calendarMaximizedView) elements.calendarMaximizedView.style.display = 'none';
    if (elements.calendarStripContainer) elements.calendarStripContainer.style.display = 'block';
    if (elements.calendarMaximizeIcon) elements.calendarMaximizeIcon.innerHTML = renderIcon('maximize');
    if (elements.calendarMaximizeBtn) elements.calendarMaximizeBtn.title = 'Maximize Calendar';
    setTimeout(() => {
      scrollStripToDate(calendarSelectedDate || getTodayDateString(), false);
    }, 40);
  }
  renderCalendar();
}

/**
 * Toast Notification Dispatcher
 */
function showToast(message, actionText = null, actionCallback = null) {
  // Disabled bottom-right notification messages per user request
  return;
}

/**
 * Switch top-level view: tasks, privacy, terms, profile
 */
function switchAppView(viewName) {
  const isAuth = auth.isAuthenticated();

  if (!isAuth) {
    if (viewName === 'privacy' || viewName === 'terms') {
      if (elements.authScreen) elements.authScreen.style.display = 'none';
      if (elements.appContainer) elements.appContainer.style.display = 'flex';
      if (elements.tasksWorkspace) elements.tasksWorkspace.style.display = 'none';
      if (elements.profileView) elements.profileView.classList.remove('is-active');
      if (elements.habitsView) elements.habitsView.classList.remove('is-active');
      if (elements.projectsView) elements.projectsView.classList.remove('is-active');
      if (elements.sidebar) elements.sidebar.style.display = 'none';
      elements.privacyView?.classList.toggle('is-active', viewName === 'privacy');
      elements.termsView?.classList.toggle('is-active', viewName === 'terms');
    } else {
      if (elements.authScreen) elements.authScreen.style.display = 'flex';
      if (elements.appContainer) elements.appContainer.style.display = 'none';
      if (elements.mobileBottomNav) elements.mobileBottomNav.style.display = 'none';
      if (elements.sidebar) elements.sidebar.style.display = '';
      elements.privacyView?.classList.remove('is-active');
      elements.termsView?.classList.remove('is-active');
      elements.profileView?.classList.remove('is-active');
      elements.habitsView?.classList.remove('is-active');
      elements.projectsView?.classList.remove('is-active');
    }
  } else {
    if (elements.sidebar) elements.sidebar.style.display = '';
    if (elements.authScreen) elements.authScreen.style.display = 'none';
    if (elements.appContainer) elements.appContainer.style.display = 'flex';
    if (elements.mobileBottomNav) elements.mobileBottomNav.style.display = '';
    if (elements.tasksWorkspace) elements.tasksWorkspace.style.display = viewName === 'tasks' ? 'block' : 'none';
    elements.habitsView?.classList.toggle('is-active', viewName === 'habits');
    elements.projectsView?.classList.toggle('is-active', viewName === 'projects');
    elements.profileView?.classList.toggle('is-active', viewName === 'profile');
    elements.privacyView?.classList.toggle('is-active', viewName === 'privacy');
    elements.termsView?.classList.toggle('is-active', viewName === 'terms');
    if (viewName === 'profile') {
      renderProfileView();
    }
    if (viewName === 'habits') {
      renderHabitsView();
    }
    if (viewName === 'projects') {
      renderProjectsView();
    }
  }

  // Update mobile bottom nav active classes
  if (elements.mobileNavTasks) elements.mobileNavTasks.classList.toggle('active', viewName === 'tasks');
  if (elements.mobileNavHabits) elements.mobileNavHabits.classList.toggle('active', viewName === 'habits');
  if (elements.mobileNavProjects) elements.mobileNavProjects.classList.toggle('active', viewName === 'projects');
  if (elements.mobileNavProfile) elements.mobileNavProfile.classList.toggle('active', viewName === 'profile');

  // Update sidebar active classes
  if (elements.sidebarNavHabits) elements.sidebarNavHabits.classList.toggle('active', viewName === 'habits');
  if (elements.sidebarNavProjects) elements.sidebarNavProjects.classList.toggle('active', viewName === 'projects');

  window.scrollTo({ top: 0, behavior: 'instant' });

  // Close mobile sidebar if open
  elements.sidebar?.classList.remove('is-open');

  // Update hash
  if (viewName === 'tasks') {
    if (window.location.hash) history.pushState(null, '', ' ');
  } else {
    window.location.hash = viewName;
  }
}

/**
 * Apply application color theme and taskbar styling according to user settings
 */
function applyTaskbarAppearance() {
  const settings = store.getSettings();
  const color = settings.appColor || settings.taskbarColor || localStorage.getItem('task_core_accent') || 'rose';
  const shape = settings.taskbarShape || 'box';

  // Apply global application accent color on root document
  document.documentElement.setAttribute('data-accent', color);

  if (!elements.mobileBottomNav) return;
  elements.mobileBottomNav.className = 'mobile-bottom-nav';
  elements.mobileBottomNav.classList.add(`taskbar-color-${color}`);
  elements.mobileBottomNav.classList.add(`taskbar-shape-${shape}`);
}

/**
 * Toggle Customization Options Accordion
 */
function toggleCustomizationOptions() {
  if (!elements.customizationOptionsContent || !elements.customizationToggleBtn) return;
  const isClosed = elements.customizationOptionsContent.style.display === 'none' || !elements.customizationOptionsContent.style.display;
  if (isClosed) {
    elements.customizationOptionsContent.style.display = 'flex';
    elements.customizationToggleBtn.setAttribute('aria-expanded', 'true');
  } else {
    elements.customizationOptionsContent.style.display = 'none';
    elements.customizationToggleBtn.setAttribute('aria-expanded', 'false');
  }
}

/**
 * Account Modification Suggestion Handlers
 */
function openAccountModify() {
  if (!elements.modifyAccountContainer) return;
  const isHidden = elements.modifyAccountContainer.style.display === 'none' || !elements.modifyAccountContainer.style.display;
  if (isHidden) {
    elements.modifyAccountContainer.style.display = 'flex';
    if (elements.editProfileName) elements.editProfileName.focus();
  } else {
    closeAccountModify();
  }
}

function closeAccountModify() {
  if (elements.modifyAccountContainer) elements.modifyAccountContainer.style.display = 'none';
  if (elements.accountSuggestionCard) elements.accountSuggestionCard.style.display = 'flex';
  if (elements.editProfileNewPassword) elements.editProfileNewPassword.value = '';
}

/**
 * Render User Profile View
 */
function renderProfileView() {
  const user = auth.getCurrentUser();
  if (!user) return;

  // Populate any unrendered icons in profile view
  elements.profileView?.querySelectorAll('[data-icon]').forEach(el => {
    if (!el.innerHTML.trim()) {
      el.innerHTML = renderIcon(el.getAttribute('data-icon'));
    }
  });

  // Account identity
  if (elements.profileDisplayName) elements.profileDisplayName.textContent = user.name;
  if (elements.profileUserHandleEmail) elements.profileUserHandleEmail.textContent = '@' + user.username;
  if (elements.editProfileName) elements.editProfileName.value = user.name;
  if (elements.editProfileEmail) elements.editProfileEmail.value = user.email;

  // Customization settings
  const settings = store.getSettings();
  const currentColor = settings.appColor || settings.taskbarColor || localStorage.getItem('task_core_accent') || 'rose';
  const currentShape = settings.taskbarShape || 'box';

  applyTaskbarAppearance();

  // Swatches active class
  document.querySelectorAll('[data-taskbar-color]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-taskbar-color') === currentColor);
  });

  // Shapes active class
  document.querySelectorAll('[data-taskbar-shape]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-taskbar-shape') === currentShape);
  });

  // Donation Patron state
  const donation = auth.getSubscription();
  const currentPlanId = donation.planId || 'free';
  const isPatron = currentPlanId !== 'free';

  if (elements.activeDonationBadge) {
    elements.activeDonationBadge.style.display = isPatron ? 'inline-flex' : 'none';
    elements.activeDonationBadge.textContent = donation.name ? `${donation.name}` : 'Active Patron';
  }

  const amounts = { '1m': '₹29', '3m': '₹89', '6m': '₹159', '1y': '₹299' };
  document.querySelectorAll('.donate-card').forEach(card => {
    const plan = card.id.replace('donatePlan', '');
    const isActive = (plan === currentPlanId);
    card.classList.toggle('is-active', isActive);
    const actionSpan = card.querySelector('.btn-donate-action span');
    if (actionSpan) {
      actionSpan.textContent = isActive ? 'Active Support' : `Donate ${amounts[plan] || ''}`;
    }
  });

  // Render widgets and feedback in profile
  renderQuoteWidget();
  initScratchpad();
  renderFeedbackHistory();

  // Devices list
  if (elements.devicesListContainer) {
    const devices = auth.getDevices();
    elements.devicesListContainer.innerHTML = '';
    devices.forEach(dev => {
      const card = document.createElement('div');
      card.className = 'device-card';

      const left = document.createElement('div');
      left.className = 'device-left';

      const iconBox = document.createElement('div');
      iconBox.className = 'device-icon-box';
      iconBox.innerHTML = renderIcon(dev.type === 'smartphone' ? 'smartphone' : 'laptop');

      const col = document.createElement('div');
      col.className = 'user-meta-col';

      const title = document.createElement('div');
      title.className = 'device-title';
      title.textContent = dev.name;

      const meta = document.createElement('div');
      meta.className = 'device-meta';
      meta.textContent = `${dev.lastActive} ${dev.isCurrent ? '(This Browser)' : ''}`;

      col.appendChild(title);
      col.appendChild(meta);
      left.appendChild(iconBox);
      left.appendChild(col);
      card.appendChild(left);

      if (!dev.isCurrent) {
        const revokeBtn = document.createElement('button');
        revokeBtn.type = 'button';
        revokeBtn.className = 'btn btn-secondary btn-sm';
        revokeBtn.textContent = 'Revoke';
        revokeBtn.dataset.revokeDevice = dev.id;
        card.appendChild(revokeBtn);
      } else {
        const activeBadge = document.createElement('span');
        activeBadge.className = 'badge badge-low';
        activeBadge.textContent = 'Current';
        card.appendChild(activeBadge);
      }

      elements.devicesListContainer.appendChild(card);
    });
  }
}

// Pomodoro Timer State
let timerTotalSeconds = 1500;
let timerRemainingSeconds = 1500;
let timerIntervalId = null;
let timerRunning = false;

function updateTimerDisplay() {
  const m = Math.floor(timerRemainingSeconds / 60);
  const s = timerRemainingSeconds % 60;
  if (elements.widgetTimerDisplay) {
    elements.widgetTimerDisplay.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
}

function startPomodoroTimer() {
  if (timerIntervalId) clearInterval(timerIntervalId);
  timerRunning = true;
  if (elements.timerStatusBadge) {
    elements.timerStatusBadge.textContent = 'Active';
    elements.timerStatusBadge.style.color = 'var(--color-success)';
  }
  if (elements.btnTimerToggle) {
    elements.btnTimerToggle.innerHTML = `${renderIcon('pause')} Pause`;
  }
  timerIntervalId = setInterval(() => {
    if (timerRemainingSeconds > 0) {
      timerRemainingSeconds--;
      updateTimerDisplay();
    } else {
      pausePomodoroTimer();
      if (elements.timerStatusBadge) {
        elements.timerStatusBadge.textContent = 'Completed';
      }
      showToast('Focus session complete! Great job focusing.');
    }
  }, 1000);
}

function pausePomodoroTimer() {
  timerRunning = false;
  if (timerIntervalId) {
    clearInterval(timerIntervalId);
    timerIntervalId = null;
  }
  if (elements.timerStatusBadge) {
    elements.timerStatusBadge.textContent = 'Paused';
    elements.timerStatusBadge.style.color = 'var(--text-muted)';
  }
  if (elements.btnTimerToggle) {
    elements.btnTimerToggle.innerHTML = `${renderIcon('play')} Resume`;
  }
}

function resetPomodoroTimer() {
  pausePomodoroTimer();
  timerRemainingSeconds = timerTotalSeconds;
  updateTimerDisplay();
  if (elements.timerStatusBadge) {
    elements.timerStatusBadge.textContent = 'Ready';
    elements.timerStatusBadge.style.color = 'var(--text-muted)';
  }
  if (elements.btnTimerToggle) {
    elements.btnTimerToggle.innerHTML = `${renderIcon('play')} Start`;
  }
}

// Focus Mindset Quotes
const FOCUS_QUOTES = [
  { quote: "Focus is saying no to the 100 other good ideas.", author: "Steve Jobs" },
  { quote: "Simplicity is the prerequisite for reliability.", author: "Edsger W. Dijkstra" },
  { quote: "Action is the foundational key to all success.", author: "Pablo Picasso" },
  { quote: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
  { quote: "It is not enough to be busy; so are the ants. What are we busy about?", author: "Henry David Thoreau" },
  { quote: "Done is better than perfect.", author: "Sheryl Sandberg" },
  { quote: "Deep work is the ability to focus without distraction on a demanding task.", author: "Cal Newport" },
  { quote: "The secret of getting ahead is getting started.", author: "Mark Twain" }
];
let currentQuoteIndex = 0;

function renderQuoteWidget() {
  const item = FOCUS_QUOTES[currentQuoteIndex % FOCUS_QUOTES.length];
  if (elements.widgetQuoteText) {
    elements.widgetQuoteText.style.opacity = '0.2';
    setTimeout(() => {
      elements.widgetQuoteText.textContent = `"${item.quote}"`;
      elements.widgetQuoteText.style.opacity = '1';
    }, 120);
  }
  if (elements.widgetQuoteAuthor) {
    elements.widgetQuoteAuthor.style.opacity = '0.2';
    setTimeout(() => {
      elements.widgetQuoteAuthor.textContent = item.author;
      elements.widgetQuoteAuthor.style.opacity = '1';
    }, 120);
  }
}

// Scratchpad initialization
let scratchpadLoaded = false;
let scratchpadSaveTimer = null;
function initScratchpad() {
  if (!scratchpadLoaded && elements.widgetScratchpadArea) {
    elements.widgetScratchpadArea.value = store.getScratchpad();
    scratchpadLoaded = true;
  }
}

// Feedback History
let selectedFeedbackRating = 5;
function renderFeedbackHistory() {
  if (!elements.feedbackHistoryList) return;
  const list = store.getFeedback();
  if (list.length === 0) {
    elements.feedbackHistoryList.innerHTML = '<div style="font-size: 12px; color: var(--text-muted); font-style: italic;">No feedback submitted yet.</div>';
    return;
  }
  elements.feedbackHistoryList.innerHTML = '';
  list.slice(0, 5).forEach(item => {
    const div = document.createElement('div');
    div.className = 'feedback-history-item';
    const stars = '★'.repeat(item.rating) + '☆'.repeat(5 - item.rating);
    const typeLabel = {
      feature: 'Feature Request',
      bug: 'Bug Report',
      ux: 'Design & Usability',
      appreciation: 'Appreciation'
    }[item.type] || item.type;
    const dateStr = new Date(item.submittedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

    div.innerHTML = `
      <div class="feedback-history-header">
        <div style="display: flex; align-items: center; gap: 6px;">
          <span class="feedback-history-badge">${escapeHtml(typeLabel)}</span>
          <span style="color: var(--primary-base); font-size: 11px;">${stars}</span>
        </div>
        <span>${escapeHtml(dateStr)}</span>
      </div>
      <p class="feedback-history-msg">${escapeHtml(item.message)}</p>
    `;
    elements.feedbackHistoryList.appendChild(div);
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Render Habits Tracker View
 */
function renderHabitsView() {
  if (!elements.habitsView) return;
  const habits = store.getHabits();
  const todayStr = getTodayDateString();

  const completedTodayCount = habits.filter(h => (h.completedDates || []).includes(todayStr)).length;
  const bestStreak = habits.length > 0 ? Math.max(0, ...habits.map(h => h.bestStreak || h.streak || 0)) : 0;
  const completionRate = habits.length > 0 ? Math.round((completedTodayCount / habits.length) * 100) : 0;

  if (elements.metricActiveHabits) elements.metricActiveHabits.textContent = habits.length;
  if (elements.metricCompletedHabits) elements.metricCompletedHabits.textContent = completedTodayCount;
  if (elements.metricBestStreak) elements.metricBestStreak.textContent = `${bestStreak}d`;
  if (elements.metricHabitRate) elements.metricHabitRate.textContent = `${completionRate}%`;

  if (habits.length === 0) {
    if (elements.habitsEmptyState) elements.habitsEmptyState.style.display = 'flex';
    if (elements.habitsListContainer) elements.habitsListContainer.style.display = 'none';
    return;
  }

  if (elements.habitsEmptyState) elements.habitsEmptyState.style.display = 'none';
  if (elements.habitsListContainer) elements.habitsListContainer.style.display = 'flex';

  // Last 7 days ending with today
  const last7Days = [];
  const baseD = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(baseD.getFullYear(), baseD.getMonth(), baseD.getDate() - i);
    const dateStr = formatIsoDate(d);
    const dayName = CALENDAR_DAY_NAMES[d.getDay()].substring(0, 1);
    const dayNum = d.getDate();
    const isToday = (dateStr === todayStr);
    last7Days.push({ dateStr, dayName, dayNum, isToday });
  }

  elements.habitsListContainer.innerHTML = '';

  habits.forEach(habit => {
    const isDoneToday = (habit.completedDates || []).includes(todayStr);
    const card = document.createElement('div');
    card.className = `habit-card ${isDoneToday ? 'is-completed-today' : ''}`;
    card.dataset.habitId = habit.id;

    let weekBubblesHtml = '';
    last7Days.forEach(day => {
      const isChecked = (habit.completedDates || []).includes(day.dateStr);
      weekBubblesHtml += `
        <button type="button" class="habit-day-bubble ${isChecked ? 'is-checked' : ''} ${day.isToday ? 'is-today' : ''}" data-habit-id="${habit.id}" data-date="${day.dateStr}" title="${day.dateStr} (${isChecked ? 'Completed' : 'Not completed'})">
          <span class="habit-day-name">${day.dayName}</span>
          <span class="habit-day-num">${day.dayNum}</span>
        </button>
      `;
    });

    const streakCount = habit.streak || 0;
    const streakClass = streakCount > 0 ? '' : 'is-zero';

    card.innerHTML = `
      <div class="habit-card-top">
        <div class="habit-meta-col">
          <h3 class="habit-card-title">${escapeHtml(habit.title)}</h3>
          <div class="habit-badges-row">
            <span class="habit-category-tag">${escapeHtml(habit.category || 'General')}</span>
            <span class="habit-frequency-tag">${escapeHtml(habit.frequency === 'weekdays' ? 'Weekdays' : habit.frequency === 'weekends' ? 'Weekends' : 'Daily')}</span>
            <span class="habit-streak-pill ${streakClass}">
              <span data-icon="flame"></span>
              <span>${streakCount} day streak</span>
            </span>
          </div>
        </div>
        <div class="habit-card-actions">
          <button type="button" class="btn btn-ghost btn-sm btn-icon-only habit-edit-btn" data-habit-id="${habit.id}" title="Edit Habit" aria-label="Edit Habit">
            <span data-icon="edit"></span>
          </button>
          <button type="button" class="btn btn-ghost btn-sm btn-icon-only habit-delete-btn" data-habit-id="${habit.id}" title="Delete Habit" aria-label="Delete Habit">
            <span data-icon="trash"></span>
          </button>
        </div>
      </div>
      <div class="habit-card-bottom">
        <div class="habit-week-strip" aria-label="Recent 7 days completion">
          ${weekBubblesHtml}
        </div>
        <button type="button" class="btn-habit-checkin ${isDoneToday ? 'is-done' : ''}" data-habit-id="${habit.id}" data-action="checkin">
          <span data-icon="${isDoneToday ? 'check' : 'plus'}"></span>
          <span>${isDoneToday ? 'Done Today' : 'Check In'}</span>
        </button>
      </div>
    `;

    // Populate vector SVG icons
    card.querySelectorAll('[data-icon]').forEach(el => {
      const iconName = el.getAttribute('data-icon');
      el.innerHTML = renderIcon(iconName);
    });

    // Event binding: Checkin button
    const checkinBtn = card.querySelector('[data-action="checkin"]');
    checkinBtn?.addEventListener('click', () => {
      store.toggleHabitDate(habit.id, todayStr);
      renderHabitsView();
      showToast(isDoneToday ? 'Habit marked uncompleted' : 'Great momentum! Habit completed for today');
    });

    // Event binding: Individual day bubbles
    card.querySelectorAll('.habit-day-bubble').forEach(bubble => {
      bubble.addEventListener('click', () => {
        const dStr = bubble.dataset.date;
        store.toggleHabitDate(habit.id, dStr);
        renderHabitsView();
      });
    });

    // Event binding: Edit
    card.querySelector('.habit-edit-btn')?.addEventListener('click', () => {
      openHabitModal(habit.id);
    });

    // Event binding: Delete
    card.querySelector('.habit-delete-btn')?.addEventListener('click', () => {
      if (confirm(`Delete habit "${habit.title}"?`)) {
        store.deleteHabit(habit.id);
        renderHabitsView();
        showToast('Habit deleted');
      }
    });

    elements.habitsListContainer.appendChild(card);
  });
}

let currentEditingHabitId = null;

function openHabitModal(habitId = null) {
  currentEditingHabitId = habitId;
  if (!elements.habitModal) return;

  if (habitId) {
    const habit = store.getHabits().find(h => h.id === habitId);
    if (habit) {
      if (elements.habitModalTitleLabel) elements.habitModalTitleLabel.textContent = 'Edit Habit';
      if (elements.modalHabitId) elements.modalHabitId.value = habit.id;
      if (elements.modalHabitTitle) elements.modalHabitTitle.value = habit.title;
      if (elements.modalHabitCategory) elements.modalHabitCategory.value = habit.category || 'Health';
      if (elements.modalHabitFrequency) elements.modalHabitFrequency.value = habit.frequency || 'daily';
    }
  } else {
    if (elements.habitModalTitleLabel) elements.habitModalTitleLabel.textContent = 'New Habit';
    if (elements.modalHabitId) elements.modalHabitId.value = '';
    if (elements.modalHabitTitle) elements.modalHabitTitle.value = '';
    if (elements.modalHabitCategory) elements.modalHabitCategory.value = 'Health';
    if (elements.modalHabitFrequency) elements.modalHabitFrequency.value = 'daily';
  }

  elements.habitModal.classList.add('is-open');
  setTimeout(() => elements.modalHabitTitle?.focus(), 50);
}

function closeHabitModal() {
  if (elements.habitModal) elements.habitModal.classList.remove('is-open');
  currentEditingHabitId = null;
}

function handleHabitFormSubmit(e) {
  e.preventDefault();
  const title = (elements.modalHabitTitle?.value || '').trim();
  if (!title) return;

  const category = elements.modalHabitCategory?.value || 'Health';
  const frequency = elements.modalHabitFrequency?.value || 'daily';

  if (currentEditingHabitId) {
    store.updateHabit(currentEditingHabitId, { title, category, frequency });
    showToast('Habit updated successfully');
  } else {
    store.addHabit({ title, category, frequency });
    showToast('New habit created! Stay consistent');
  }

  closeHabitModal();
  renderHabitsView();
}

/**
 * Render Projects Tracker View
 */
function renderProjectsView() {
  if (!elements.projectsView) return;
  const projects = store.getProjects();
  
  const totalCount = projects.length;
  const activeCount = projects.filter(p => p.status === 'active' || p.status === 'in_progress').length;
  const completedCount = projects.filter(p => p.status === 'completed').length;
  
  let sumPercent = 0;
  projects.forEach(p => {
    const stats = store.getProjectTaskStats(p);
    sumPercent += stats.percent;
  });
  const avgProgress = totalCount > 0 ? Math.round(sumPercent / totalCount) : 0;

  if (elements.metricTotalProjects) elements.metricTotalProjects.textContent = totalCount;
  if (elements.metricActiveProjects) elements.metricActiveProjects.textContent = activeCount;
  if (elements.metricCompletedProjects) elements.metricCompletedProjects.textContent = completedCount;
  if (elements.metricProjectAvgProgress) elements.metricProjectAvgProgress.textContent = `${avgProgress}%`;

  if (totalCount === 0) {
    if (elements.projectsEmptyState) elements.projectsEmptyState.style.display = 'flex';
    if (elements.projectsListContainer) elements.projectsListContainer.style.display = 'none';
    return;
  }

  if (elements.projectsEmptyState) elements.projectsEmptyState.style.display = 'none';
  if (elements.projectsListContainer) elements.projectsListContainer.style.display = 'grid';

  elements.projectsListContainer.innerHTML = '';

  projects.forEach(project => {
    const stats = store.getProjectTaskStats(project);
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.projectId = project.id;

    const statusLabels = {
      active: 'Active',
      in_progress: 'In Progress',
      completed: 'Completed',
      on_hold: 'On Hold'
    };
    const statusText = statusLabels[project.status] || 'Active';
    const statusClass = `status-${project.status || 'active'}`;

    let deadlineDisplay = 'No deadline';
    if (project.deadline) {
      deadlineDisplay = `Due ${project.deadline}`;
    }

    card.innerHTML = `
      <div class="project-card-header">
        <div class="project-card-title-col">
          <h3 class="project-card-title" title="${escapeHtml(project.name)}">${escapeHtml(project.name)}</h3>
          <div class="project-badges-row">
            <span class="project-category-badge" style="border-left: 3px solid ${project.color || 'var(--primary-base)'};">${escapeHtml(project.category || 'General')}</span>
            <span class="project-status-pill ${statusClass}">${statusText}</span>
          </div>
        </div>
      </div>
      ${project.description ? `<p class="project-card-desc">${escapeHtml(project.description)}</p>` : ''}
      <div class="project-progress-block">
        <div class="project-progress-header">
          <span>Task Progress</span>
          <span class="project-progress-ratio">${stats.completed} / ${stats.total} tasks (${stats.percent}%)</span>
        </div>
        <div class="project-progress-track">
          <div class="project-progress-fill" style="width: ${stats.percent}%; background-color: ${project.color || 'var(--primary-base)'};"></div>
        </div>
      </div>
      <div class="project-card-footer">
        <span class="project-deadline-pill">
          <span data-icon="calendar"></span>
          <span>${escapeHtml(deadlineDisplay)}</span>
        </span>
        <div class="project-actions">
          <button type="button" class="btn-project-view-tasks" data-project-id="${project.id}" data-category="${escapeHtml(project.category)}" title="View Tasks in this Project">
            <span data-icon="tasks"></span>
            <span>Tasks</span>
          </button>
          <button type="button" class="btn btn-ghost btn-sm btn-icon-only project-edit-btn" data-project-id="${project.id}" title="Edit Project" aria-label="Edit Project">
            <span data-icon="edit"></span>
          </button>
          <button type="button" class="btn btn-ghost btn-sm btn-icon-only project-delete-btn" data-project-id="${project.id}" title="Delete Project" aria-label="Delete Project">
            <span data-icon="trash"></span>
          </button>
        </div>
      </div>
    `;

    // Populate vector SVG icons
    card.querySelectorAll('[data-icon]').forEach(el => {
      const iconName = el.getAttribute('data-icon');
      el.innerHTML = renderIcon(iconName);
    });

    // Event binding: View Tasks
    card.querySelector('.btn-project-view-tasks')?.addEventListener('click', () => {
      const targetCat = store.getCategories().find(c => c.name.toLowerCase() === (project.category || '').toLowerCase());
      if (targetCat) {
        store.updateSettings({ activeCategory: targetCat.id, activeView: 'all' });
      } else {
        store.updateSettings({ activeCategory: 'all', activeView: 'all', searchQuery: project.name });
      }
      switchAppView('tasks');
    });

    // Event binding: Edit
    card.querySelector('.project-edit-btn')?.addEventListener('click', () => {
      openProjectModal(project.id);
    });

    // Event binding: Delete
    card.querySelector('.project-delete-btn')?.addEventListener('click', () => {
      if (confirm(`Delete project "${project.name}"?`)) {
        store.deleteProject(project.id);
        renderProjectsView();
        showToast('Project deleted');
      }
    });

    elements.projectsListContainer.appendChild(card);
  });
}

let currentEditingProjectId = null;

function openProjectModal(projectId = null) {
  currentEditingProjectId = projectId;
  if (!elements.projectModal) return;

  if (projectId) {
    const project = store.getProjects().find(p => p.id === projectId);
    if (project) {
      if (elements.projectModalTitleLabel) elements.projectModalTitleLabel.textContent = 'Edit Project';
      if (elements.modalProjectId) elements.modalProjectId.value = project.id;
      if (elements.modalProjectName) elements.modalProjectName.value = project.name;
      if (elements.modalProjectDescription) elements.modalProjectDescription.value = project.description || '';
      if (elements.modalProjectCategory) elements.modalProjectCategory.value = project.category || 'Work';
      if (elements.modalProjectStatus) elements.modalProjectStatus.value = project.status || 'active';
      if (elements.modalProjectDeadline) elements.modalProjectDeadline.value = project.deadline || '';
      if (elements.modalProjectColor) elements.modalProjectColor.value = project.color || '#d8a2a2';
      if (elements.modalProjectDeleteBtn) elements.modalProjectDeleteBtn.style.display = 'inline-flex';
    }
  } else {
    if (elements.projectModalTitleLabel) elements.projectModalTitleLabel.textContent = 'New Project';
    if (elements.modalProjectId) elements.modalProjectId.value = '';
    if (elements.modalProjectName) elements.modalProjectName.value = '';
    if (elements.modalProjectDescription) elements.modalProjectDescription.value = '';
    if (elements.modalProjectCategory) elements.modalProjectCategory.value = 'Work';
    if (elements.modalProjectStatus) elements.modalProjectStatus.value = 'active';
    if (elements.modalProjectDeadline) elements.modalProjectDeadline.value = '';
    if (elements.modalProjectColor) elements.modalProjectColor.value = '#d8a2a2';
    if (elements.modalProjectDeleteBtn) elements.modalProjectDeleteBtn.style.display = 'none';
  }

  elements.projectModal.classList.add('is-open');
  setTimeout(() => elements.modalProjectName?.focus(), 50);
}

function closeProjectModal() {
  if (elements.projectModal) elements.projectModal.classList.remove('is-open');
  currentEditingProjectId = null;
}

function handleProjectFormSubmit(e) {
  e.preventDefault();
  const name = (elements.modalProjectName?.value || '').trim();
  if (!name) return;

  const description = (elements.modalProjectDescription?.value || '').trim();
  const category = elements.modalProjectCategory?.value || 'Work';
  const status = elements.modalProjectStatus?.value || 'active';
  const deadline = elements.modalProjectDeadline?.value || '';
  const color = elements.modalProjectColor?.value || '#d8a2a2';

  if (currentEditingProjectId) {
    store.updateProject(currentEditingProjectId, { name, description, category, status, deadline, color });
    showToast('Project updated successfully');
  } else {
    store.addProject({ name, description, category, status, deadline, color });
    showToast('New project created!');
  }

  closeProjectModal();
  renderProjectsView();
}

/**
 * Format date label cleanly without em dashes
 */
function formatDateLabel(dateStr) {
  if (!dateStr) return null;
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;

  d.setDate(d.getDate() + 1);
  const tomorrowStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  if (dateStr === todayStr) {
    return { text: 'Today', status: 'today' };
  } else if (dateStr === tomorrowStr) {
    return { text: 'Tomorrow', status: 'upcoming' };
  } else if (dateStr < todayStr) {
    return { text: 'Overdue: ' + dateStr, status: 'overdue' };
  } else {
    return { text: dateStr, status: 'future' };
  }
}

/**
 * Render Categories in Sidebar & Selects
 */
function renderCategories() {
  const categories = store.getCategories();
  const settings = store.getSettings();

  // Populate Sidebar category buttons
  elements.categoryList.innerHTML = '';
  categories.forEach(cat => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.className = `nav-item-btn ${settings.activeCategory === cat.id ? 'active' : ''}`;
    btn.dataset.category = cat.id;

    const left = document.createElement('div');
    left.className = 'nav-item-left';

    const dot = document.createElement('span');
    dot.className = 'category-dot';
    dot.style.backgroundColor = cat.color;

    const name = document.createElement('span');
    name.textContent = cat.name;

    left.appendChild(dot);
    left.appendChild(name);

    btn.appendChild(left);

    // Count tasks in category
    const count = store.getTasks().filter(t => t.categoryId === cat.id && !t.completed).length;
    const badge = document.createElement('span');
    badge.className = 'nav-count-badge';
    badge.textContent = count;
    btn.appendChild(badge);

    btn.addEventListener('click', () => {
      switchAppView('tasks');
      store.updateSettings({ activeCategory: cat.id, activeView: 'all' });
    });

    li.appendChild(btn);
    elements.categoryList.appendChild(li);
  });

  // Populate Selects
  const populateSelect = (selectEl) => {
    if (!selectEl) return;
    const currentVal = selectEl.value;
    selectEl.innerHTML = '';
    categories.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat.id;
      opt.textContent = cat.name;
      selectEl.appendChild(opt);
    });
    if (currentVal && categories.some(c => c.id === currentVal)) {
      selectEl.value = currentVal;
    }
  };

  if (elements.quickAddCategory) {
    populateSelect(elements.quickAddCategory);
  }
  populateSelect(elements.modalTaskCategory);
}

/**
 * Render Real Metrics (Calculated from actual tasks, zero fake counters)
 */
function renderMetrics() {
  const metrics = store.getRealMetrics();
  elements.metricActive.textContent = metrics.active;
  elements.metricCompleted.textContent = metrics.completed;
  elements.metricOverdue.textContent = metrics.overdue;
  elements.metricToday.textContent = metrics.dueToday;
}

/**
 * Render Task List
 */
function renderTasks() {
  const tasks = store.getFilteredTasks();
  const categories = store.getCategories();
  const catMap = new Map(categories.map(c => [c.id, c]));

  elements.taskListContainer.innerHTML = '';

  if (tasks.length === 0) {
    elements.emptyState.style.display = 'flex';
  } else {
    elements.emptyState.style.display = 'none';

    tasks.forEach(task => {
      const card = document.createElement('article');
      card.className = `task-card ${task.completed ? 'is-completed' : ''}`;
      card.dataset.id = task.id;

      // Checkbox Toggle Button
      const checkBtn = document.createElement('button');
      checkBtn.className = 'task-checkbox-btn';
      checkBtn.setAttribute('aria-label', task.completed ? 'Mark task incomplete' : 'Mark task complete');
      checkBtn.innerHTML = task.completed ? renderIcon('checkSquare') : renderIcon('square');
      checkBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        store.toggleTask(task.id);
      });
      card.appendChild(checkBtn);

      // Task Body
      const body = document.createElement('div');
      body.className = 'task-body';

      // Title Row
      const mainRow = document.createElement('div');
      mainRow.className = 'task-main-row';

      const title = document.createElement('h3');
      title.className = 'task-title-text';
      title.textContent = task.title;
      mainRow.appendChild(title);
      body.appendChild(mainRow);

      // Metadata Row
      const metaRow = document.createElement('div');
      metaRow.className = 'task-meta-row';

      // Priority Badge
      const prioBadge = document.createElement('span');
      prioBadge.className = `badge badge-${task.priority}`;
      prioBadge.innerHTML = `${renderIcon('flag')} ${task.priority.toUpperCase()}`;
      metaRow.appendChild(prioBadge);

      // Category Tag
      const cat = catMap.get(task.categoryId);
      if (cat) {
        const catBadge = document.createElement('span');
        catBadge.className = 'badge badge-category';
        catBadge.innerHTML = `<span class="category-dot" style="background-color: ${cat.color}"></span> ${cat.name}`;
        metaRow.appendChild(catBadge);
      }

      // Due Date Tag
      if (task.dueDate) {
        const dateInfo = formatDateLabel(task.dueDate);
        const dateBadge = document.createElement('span');
        dateBadge.className = `badge badge-date is-${dateInfo.status}`;
        dateBadge.innerHTML = `${renderIcon('calendar')} ${dateInfo.text}${task.dueTime ? ' ' + task.dueTime : ''}`;
        metaRow.appendChild(dateBadge);
      }

      // Subtasks Counter
      if (task.subtasks && task.subtasks.length > 0) {
        const doneCount = task.subtasks.filter(s => s.done).length;
        const subBadge = document.createElement('span');
        subBadge.className = 'subtask-progress-badge';
        subBadge.innerHTML = `${renderIcon('check')} ${doneCount}/${task.subtasks.length} checklist`;
        metaRow.appendChild(subBadge);
      }

      body.appendChild(metaRow);
      card.appendChild(body);

      // Actions Column
      const actions = document.createElement('div');
      actions.className = 'task-actions-col';

      // Edit Button
      const editBtn = document.createElement('button');
      editBtn.className = 'btn btn-ghost btn-sm btn-icon-only';
      editBtn.setAttribute('aria-label', 'Edit task');
      editBtn.innerHTML = renderIcon('edit');
      editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openEditTaskModal(task.id);
      });
      actions.appendChild(editBtn);

      // Delete Button
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn btn-ghost btn-sm btn-icon-only';
      deleteBtn.setAttribute('aria-label', 'Delete task');
      deleteBtn.innerHTML = renderIcon('trash');
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const removedTask = store.deleteTask(task.id);
        if (removedTask) {
          showToast('Task removed', 'Undo', () => {
            store.restoreTask(removedTask);
          });
        }
      });
      actions.appendChild(deleteBtn);

      card.appendChild(actions);

      // Clicking task body opens editor
      body.addEventListener('click', () => {
        openEditTaskModal(task.id);
      });

      elements.taskListContainer.appendChild(card);
    });
  }

  // Update dynamic view heading
  const settings = store.getSettings();
  const viewTitles = {
    all: 'All Tasks',
    today: 'Today Agenda',
    upcoming: 'Upcoming Tasks',
    overdue: 'Overdue Tasks',
    completed: 'Completed Archive'
  };
  if (settings.activeCategory !== 'all') {
    const activeCat = catMap.get(settings.activeCategory);
    elements.currentViewTitle.textContent = activeCat ? `Category: ${activeCat.name}` : 'Filtered Tasks';
  } else {
    elements.currentViewTitle.textContent = viewTitles[settings.activeView] || 'Tasks';
  }

  // Update active state on view buttons
  elements.navButtons.forEach(btn => {
    const view = btn.dataset.view;
    if (view) {
      if (view === 'habits') {
        btn.classList.toggle('active', false);
      } else {
        btn.classList.toggle('active', settings.activeCategory === 'all' && settings.activeView === view);
      }
    }
  });

  // Update Mobile nav active button
  elements.mobileNavTasks?.classList.toggle('active', settings.activeView === 'all');
  elements.mobileNavHabits?.classList.toggle('active', false);
}

/**
 * Open Task Create Modal
 */
function openNewTaskModal(prefillDate = null) {
  currentEditingTaskId = null;
  if (elements.modalTitleLabel) elements.modalTitleLabel.textContent = 'New Task';
  if (elements.modalTaskId) elements.modalTaskId.value = '';
  if (elements.modalTaskTitle) elements.modalTaskTitle.value = '';
  if (elements.modalTaskDescription) elements.modalTaskDescription.value = '';

  const currentSettings = store.getSettings();
  if (elements.modalTaskCategory) {
    const cats = store.getCategories();
    if (currentSettings.activeCategory && currentSettings.activeCategory !== 'all' && cats.some(c => c.id === currentSettings.activeCategory)) {
      elements.modalTaskCategory.value = currentSettings.activeCategory;
    } else if (cats.length > 0) {
      elements.modalTaskCategory.value = cats[0].id;
    }
  }

  if (elements.modalTaskPriority) {
    elements.modalTaskPriority.value = 'medium';
  }

  if (elements.modalTaskDate) {
    elements.modalTaskDate.value = prefillDate || calendarSelectedDate || '';
  }

  if (elements.modalTaskTime) {
    elements.modalTaskTime.value = '';
  }

  if (elements.modalSubtasksSection) {
    elements.modalSubtasksSection.style.display = 'none';
  }
  if (elements.modalSubtasksList) {
    elements.modalSubtasksList.innerHTML = '';
  }
  if (elements.modalNewSubtaskInput) {
    elements.modalNewSubtaskInput.value = '';
  }

  if (elements.modalDeleteBtn) {
    elements.modalDeleteBtn.style.display = 'none';
  }

  if (elements.taskModalSubmitBtn) {
    elements.taskModalSubmitBtn.textContent = 'Add Task';
  }

  elements.taskModal?.classList.add('is-open');
  setTimeout(() => {
    elements.modalTaskTitle?.focus();
  }, 60);
}

/**
 * Open Task Edit Modal
 */
function openEditTaskModal(taskId) {
  const task = store.getTasks().find(t => t.id === taskId);
  if (!task) return;

  currentEditingTaskId = taskId;
  if (elements.modalTitleLabel) elements.modalTitleLabel.textContent = 'Edit Task';
  if (elements.modalTaskId) elements.modalTaskId.value = task.id;
  if (elements.modalTaskTitle) elements.modalTaskTitle.value = task.title;
  if (elements.modalTaskDescription) elements.modalTaskDescription.value = task.description || '';
  if (elements.modalTaskCategory) elements.modalTaskCategory.value = task.categoryId;
  if (elements.modalTaskPriority) elements.modalTaskPriority.value = task.priority;
  if (elements.modalTaskDate) elements.modalTaskDate.value = task.dueDate || '';
  if (elements.modalTaskTime) elements.modalTaskTime.value = task.dueTime || '';

  if (elements.modalSubtasksSection) {
    elements.modalSubtasksSection.style.display = '';
  }
  if (elements.modalDeleteBtn) {
    elements.modalDeleteBtn.style.display = '';
  }
  if (elements.taskModalSubmitBtn) {
    elements.taskModalSubmitBtn.textContent = 'Save Changes';
  }

  renderModalSubtasks(task);
  elements.taskModal?.classList.add('is-open');
}

function closeEditTaskModal() {
  elements.taskModal?.classList.remove('is-open');
  currentEditingTaskId = null;
}

/**
 * Render Subtasks in Modal
 */
function renderModalSubtasks(task) {
  elements.modalSubtasksList.innerHTML = '';
  const subtasks = task.subtasks || [];

  subtasks.forEach(sub => {
    const item = document.createElement('div');
    item.className = `subtask-item ${sub.done ? 'is-done' : ''}`;

    const checkBtn = document.createElement('button');
    checkBtn.type = 'button';
    checkBtn.className = 'btn-ghost btn-sm';
    checkBtn.innerHTML = sub.done ? renderIcon('checkSquare') : renderIcon('square');
    checkBtn.addEventListener('click', () => {
      store.toggleSubtask(task.id, sub.id);
      const updatedTask = store.getTasks().find(t => t.id === task.id);
      renderModalSubtasks(updatedTask);
    });
    item.appendChild(checkBtn);

    const span = document.createElement('span');
    span.className = 'subtask-text';
    span.textContent = sub.title;
    item.appendChild(span);

    const delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.className = 'btn btn-ghost btn-sm btn-icon-only';
    delBtn.innerHTML = renderIcon('close');
    delBtn.addEventListener('click', () => {
      store.deleteSubtask(task.id, sub.id);
      const updatedTask = store.getTasks().find(t => t.id === task.id);
      renderModalSubtasks(updatedTask);
    });
    item.appendChild(delBtn);

    elements.modalSubtasksList.appendChild(item);
  });
}

/**
 * Display Authentication Error Alert
 */
function showAuthError(message) {
  if (!message) {
    elements.authErrorAlert?.classList.remove('visible');
    if (elements.authErrorText) elements.authErrorText.textContent = '';
  } else {
    if (elements.authErrorText) elements.authErrorText.textContent = message;
    elements.authErrorAlert?.classList.add('visible');
  }
}

/**
 * Apply Theme (Dark or Light) and synchronize UI controls and storage
 */
function applyTheme(theme) {
  const activeTheme = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', activeTheme);
  try {
    localStorage.setItem('task_core_theme', activeTheme);
  } catch (e) {}

  if (elements.themeToggleBtn) {
    elements.themeToggleBtn.innerHTML = renderIcon(activeTheme === 'dark' ? 'sun' : 'moon');
    const label = activeTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    elements.themeToggleBtn.setAttribute('title', label);
    elements.themeToggleBtn.setAttribute('aria-label', label);
  }
}

/**
 * Check authentication status and update interface
 */
function checkAuthState() {
  const isAuth = auth.isAuthenticated();
  if (isAuth) {
    const user = auth.getCurrentUser();
    store.setUser(user.userId);
    const userSettings = store.getSettings();
    const activeTheme = userSettings.theme || localStorage.getItem('task_core_theme') || 'light';
    applyTheme(activeTheme);
    if (elements.authScreen) elements.authScreen.style.display = 'none';
    if (elements.appContainer) elements.appContainer.style.display = 'flex';
    if (elements.mobileBottomNav) elements.mobileBottomNav.style.display = '';
    if (elements.sidebar) elements.sidebar.style.display = '';
    if (elements.sidebarUserName) elements.sidebarUserName.textContent = user.name;
    if (elements.sidebarUserHandle) elements.sidebarUserHandle.textContent = '@' + user.username;
    renderCategories();
    renderMetrics();
    renderTasks();
    renderCalendar();
  } else {
    store.setUser(null);
    const savedTheme = localStorage.getItem('task_core_theme') || 'light';
    applyTheme(savedTheme);
    if (elements.authScreen) elements.authScreen.style.display = 'flex';
    if (elements.appContainer) elements.appContainer.style.display = 'none';
    if (elements.mobileBottomNav) elements.mobileBottomNav.style.display = 'none';
  }
}

/**
 * Setup Event Listeners
 */
function setupEvents() {
  // Store Subscription
  store.subscribe(() => {
    renderCategories();
    renderMetrics();
    renderTasks();
    renderCalendar();
    if (elements.habitsView?.classList.contains('is-active')) {
      renderHabitsView();
    }
    if (elements.projectsView?.classList.contains('is-active')) {
      renderProjectsView();
    }
  });

  // Authentication View Toggles (Sign In <-> Create Account)
  const switchToSignIn = () => {
    if (elements.signInForm) elements.signInForm.style.display = 'flex';
    if (elements.registerForm) elements.registerForm.style.display = 'none';
    showAuthError('');
    elements.loginIdentifier?.focus();
  };

  const switchToRegister = () => {
    if (elements.registerForm) elements.registerForm.style.display = 'flex';
    if (elements.signInForm) elements.signInForm.style.display = 'none';
    showAuthError('');
    elements.registerName?.focus();
  };

  elements.switchToRegisterBtn?.addEventListener('click', switchToRegister);
  elements.switchToSignInBtn?.addEventListener('click', switchToSignIn);
  elements.tabSignInBtn?.addEventListener('click', switchToSignIn);
  elements.tabRegisterBtn?.addEventListener('click', switchToRegister);

  // Password Visibility Toggle Handlers
  document.querySelectorAll('.auth-password-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-toggle-target');
      const targetInput = document.getElementById(targetId);
      if (!targetInput) return;

      const isPassword = targetInput.type === 'password';
      targetInput.type = isPassword ? 'text' : 'password';

      const iconSpan = btn.querySelector('.password-toggle-icon');
      if (iconSpan) {
        const nextIcon = isPassword ? 'eyeOff' : 'eye';
        iconSpan.setAttribute('data-icon', nextIcon);
        iconSpan.innerHTML = renderIcon(nextIcon);
      }
      btn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
      btn.setAttribute('title', isPassword ? 'Hide password' : 'Show password');
      targetInput.focus();
    });
  });

  // Sign In Form Submission
  elements.signInForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    showAuthError('');
    const identifier = elements.loginIdentifier.value;
    const password = elements.loginPassword.value;

    const res = await auth.login({ identifier, password });
    if (!res.success) {
      showAuthError(res.error);
      return;
    }

    elements.loginPassword.value = '';
    showToast('Signed in successfully');
    checkAuthState();
  });

  // Registration Form Submission
  elements.registerForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    showAuthError('');
    const name = elements.registerName.value;
    const email = elements.registerEmail.value;
    const username = elements.registerUsername.value;
    const password = elements.registerPassword.value;
    const confirmPassword = elements.registerConfirmPassword.value;
    const termsAccepted = elements.registerTermsCheck?.checked;

    if (password !== confirmPassword) {
      showAuthError('Passwords do not match.');
      return;
    }
    if (!termsAccepted) {
      showAuthError('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }

    const res = await auth.register({ name, email, username, password });
    if (!res.success) {
      showAuthError(res.error);
      return;
    }

    elements.registerPassword.value = '';
    elements.registerConfirmPassword.value = '';
    showToast('Account created successfully');
    checkAuthState();
  });

  // Logout Handlers
  const handleLogout = () => {
    auth.logout();
    showToast('Signed out');
    checkAuthState();
  };

  elements.sidebarLogoutBtn?.addEventListener('click', handleLogout);
  elements.headerLogoutBtn?.addEventListener('click', handleLogout);
  elements.profileLogoutBtn?.addEventListener('click', handleLogout);

  // Mobile Menu Toggles
  elements.mobileMenuBtn?.addEventListener('click', () => {
    elements.sidebar.classList.toggle('is-open');
  });

  elements.sidebarCloseBtn?.addEventListener('click', () => {
    elements.sidebar.classList.remove('is-open');
  });

  // Theme Toggle
  elements.themeToggleBtn?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    store.updateSettings({ theme: next });
    showToast(`Switched to ${next === 'dark' ? 'Dark' : 'Light'} theme`);
  });

  // Navigation Buttons
  elements.navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      if (view === 'habits') {
        switchAppView('habits');
        return;
      }
      if (view === 'projects') {
        switchAppView('projects');
        return;
      }
      if (view) {
        switchAppView('tasks');
        store.updateSettings({ activeView: view, activeCategory: 'all' });
      }
    });
  });

  // Open New Task Modal from Toolbar
  elements.btnOpenNewTaskModal?.addEventListener('click', () => {
    openNewTaskModal();
  });

  // Calendar Strip & Maximized View Event Handlers
  elements.calendarMaximizeBtn?.addEventListener('click', toggleCalendarMaximize);

  // Smooth mouse wheel scrolling for calendar horizontal strip
  elements.calendarStripTrack?.addEventListener('wheel', (e) => {
    if (e.deltaY !== 0) {
      e.preventDefault();
      elements.calendarStripTrack.scrollLeft += e.deltaY;
    }
  }, { passive: false });

  // Search Input
  elements.searchInput?.addEventListener('input', (e) => {
    const query = e.target.value;
    elements.searchClearBtn.classList.toggle('visible', query.length > 0);
    store.updateSettings({ searchQuery: query });
  });

  elements.searchClearBtn?.addEventListener('click', () => {
    elements.searchInput.value = '';
    elements.searchClearBtn.classList.remove('visible');
    store.updateSettings({ searchQuery: '' });
  });

  // Sort Selector
  elements.sortSelect?.addEventListener('change', (e) => {
    store.updateSettings({ sortBy: e.target.value });
  });

  // Task Modal Submit (Supports both Create and Edit)
  elements.taskModalForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = elements.modalTaskTitle.value.trim();
    if (!title) return;

    if (currentEditingTaskId) {
      store.updateTask(currentEditingTaskId, {
        title,
        description: elements.modalTaskDescription.value.trim(),
        categoryId: elements.modalTaskCategory.value,
        priority: elements.modalTaskPriority.value,
        dueDate: elements.modalTaskDate.value || null,
        dueTime: elements.modalTaskTime.value || null
      });
      closeEditTaskModal();
      showToast('Task updated');
    } else {
      store.addTask({
        title,
        description: elements.modalTaskDescription.value.trim(),
        categoryId: elements.modalTaskCategory.value,
        priority: elements.modalTaskPriority.value,
        dueDate: elements.modalTaskDate.value || null,
        dueTime: elements.modalTaskTime.value || null
      });
      closeEditTaskModal();
      showToast('Task added');
    }
  });

  // Task Edit Modal Delete
  elements.modalDeleteBtn?.addEventListener('click', () => {
    if (!currentEditingTaskId) return;
    const removed = store.deleteTask(currentEditingTaskId);
    closeEditTaskModal();
    if (removed) {
      showToast('Task deleted', 'Undo', () => {
        store.restoreTask(removed);
      });
    }
  });

  // Modal Subtask Add
  elements.modalAddSubtaskBtn?.addEventListener('click', () => {
    const title = elements.modalNewSubtaskInput.value.trim();
    if (!title || !currentEditingTaskId) return;
    store.addSubtask(currentEditingTaskId, title);
    elements.modalNewSubtaskInput.value = '';
    const updatedTask = store.getTasks().find(t => t.id === currentEditingTaskId);
    renderModalSubtasks(updatedTask);
  });

  elements.modalNewSubtaskInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      elements.modalAddSubtaskBtn.click();
    }
  });

  // Close Modal Buttons
  elements.taskModalCloseBtn?.addEventListener('click', closeEditTaskModal);
  elements.taskModalCancelBtn?.addEventListener('click', closeEditTaskModal);
  elements.taskModal?.addEventListener('click', (e) => {
    if (e.target === elements.taskModal) closeEditTaskModal();
  });

  // Category Modal
  elements.addCategoryBtn?.addEventListener('click', () => {
    elements.categoryModal.classList.add('is-open');
    elements.categoryNameInput.focus();
  });

  elements.categoryModalCloseBtn?.addEventListener('click', () => {
    elements.categoryModal.classList.remove('is-open');
  });

  elements.categoryModal?.addEventListener('click', (e) => {
    if (e.target === elements.categoryModal) {
      elements.categoryModal.classList.remove('is-open');
    }
  });

  elements.categoryForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = elements.categoryNameInput.value.trim();
    const color = elements.categoryColorInput.value;
    if (name) {
      store.addCategory(name, color);
      elements.categoryNameInput.value = '';
      elements.categoryModal.classList.remove('is-open');
      showToast(`Category "${name}" created`);
    }
  });

  // Backup / Export
  elements.exportBtn?.addEventListener('click', () => {
    const jsonStr = store.exportJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `task_core_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('JSON backup downloaded');
  });

  // Restore / Import
  elements.importBtn?.addEventListener('click', () => {
    elements.importFileInput.click();
  });

  elements.importFileInput?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const res = store.importJSON(event.target?.result);
      if (res.success) {
        showToast(`Imported ${res.count} tasks successfully`);
      } else {
        showToast(`Import failed: ${res.error}`);
      }
      elements.importFileInput.value = '';
    };
    reader.readAsText(file);
  });

  // Legal Pages Navigation
  elements.privacyNavBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      switchAppView('privacy');
    });
  });

  elements.termsNavBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      switchAppView('terms');
    });
  });

  elements.backToTasksBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      switchAppView('tasks');
    });
  });

  // Mobile Bottom Nav (Taskbar)
  elements.mobileNavTasks?.addEventListener('click', () => {
    switchAppView('tasks');
    store.updateSettings({ activeView: 'all', activeCategory: 'all' });
  });

  elements.mobileNavHabits?.addEventListener('click', () => {
    switchAppView('habits');
  });

  elements.sidebarNavHabits?.addEventListener('click', () => {
    switchAppView('habits');
  });

  elements.mobileNavProjects?.addEventListener('click', () => {
    switchAppView('projects');
  });

  elements.sidebarNavProjects?.addEventListener('click', () => {
    switchAppView('projects');
  });

  elements.mobileNavAdd?.addEventListener('click', () => {
    if (elements.habitsView?.classList.contains('is-active')) {
      openHabitModal();
    } else if (elements.projectsView?.classList.contains('is-active')) {
      openProjectModal();
    } else {
      switchAppView('tasks');
      openNewTaskModal();
    }
  });

  elements.mobileNavProfile?.addEventListener('click', () => {
    switchAppView('profile');
  });

  // Habits View and Modal Events
  elements.btnOpenNewHabitModal?.addEventListener('click', () => openHabitModal());
  elements.btnCreateFirstHabit?.addEventListener('click', () => openHabitModal());
  elements.habitModalCloseBtn?.addEventListener('click', closeHabitModal);
  elements.habitModalCancelBtn?.addEventListener('click', closeHabitModal);
  elements.habitModalForm?.addEventListener('submit', handleHabitFormSubmit);
  elements.habitModal?.addEventListener('click', (e) => {
    if (e.target === elements.habitModal) closeHabitModal();
  });

  // Projects View and Modal Events
  elements.btnOpenNewProjectModal?.addEventListener('click', () => openProjectModal());
  elements.btnCreateFirstProject?.addEventListener('click', () => openProjectModal());
  elements.projectModalCloseBtn?.addEventListener('click', closeProjectModal);
  elements.projectModalCancelBtn?.addEventListener('click', closeProjectModal);
  elements.projectModalForm?.addEventListener('submit', handleProjectFormSubmit);
  elements.modalProjectDeleteBtn?.addEventListener('click', () => {
    if (currentEditingProjectId) {
      if (confirm('Are you sure you want to delete this project?')) {
        store.deleteProject(currentEditingProjectId);
        closeProjectModal();
        renderProjectsView();
        showToast('Project deleted');
      }
    }
  });
  elements.projectModal?.addEventListener('click', (e) => {
    if (e.target === elements.projectModal) closeProjectModal();
  });

  // Profile Navigation Buttons (Sidebar & elsewhere)
  elements.profileNavBtns?.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      switchAppView('profile');
    });
  });

  // Customization Accordion Toggle
  elements.customizationToggleBtn?.addEventListener('click', toggleCustomizationOptions);

  // Application & Taskbar Color Swatches
  elements.taskbarColorSwatches?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-taskbar-color]');
    if (!btn) return;
    const color = btn.getAttribute('data-taskbar-color');
    store.updateSettings({ appColor: color, taskbarColor: color });
    localStorage.setItem('task_core_accent', color);
    applyTaskbarAppearance();
    renderProfileView();
    showToast('Application color updated to ' + color);
  });

  // Taskbar Shape Buttons
  elements.taskbarShapeGroup?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-taskbar-shape]');
    if (!btn) return;
    const shape = btn.getAttribute('data-taskbar-shape');
    store.updateSettings({ taskbarShape: shape });
    applyTaskbarAppearance();
    renderProfileView();
    showToast('Taskbar shape updated to ' + shape);
  });

  // Account Modification Suggestion & Pencil Toggle
  elements.btnEditProfile?.addEventListener('click', openAccountModify);
  elements.btnOpenAccountModify?.addEventListener('click', openAccountModify);
  elements.btnCloseAccountModifyTop?.addEventListener('click', closeAccountModify);
  elements.btnCancelAccountModify?.addEventListener('click', closeAccountModify);

  // Profile Account Modification Form
  elements.profileAccountForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = elements.editProfileName.value.trim();
    const email = elements.editProfileEmail.value.trim();
    const newPassword = elements.editProfileNewPassword.value;
    const res = await auth.updateProfile({ name, email, newPassword });
    if (!res.success) {
      showToast(res.error);
      return;
    }
    elements.editProfileNewPassword.value = '';
    closeAccountModify();
    showToast('Account details updated successfully');
    renderProfileView();
    if (elements.sidebarUserName) elements.sidebarUserName.textContent = name;
  });

  // Donation Support Buttons (1m, 3m, 6m, 1y)
  document.querySelectorAll('.btn-donate-action').forEach(btn => {
    btn.addEventListener('click', () => {
      const plan = btn.getAttribute('data-donate-plan');
      auth.updateDonation(plan);
      const planNames = { '1m': '1 Month (₹29)', '3m': '3 Months (₹89)', '6m': '6 Months (₹159)', '1y': '1 Year (₹300)' };
      showToast(`Thank you for donating! Activated ${planNames[plan] || 'Supporter'} tier.`);
      renderProfileView();
    });
  });

  // Switch to Free Plan
  elements.btnSelectFreePlan?.addEventListener('click', () => {
    auth.updateDonation('free');
    showToast('Plan set to Community Free Edition.');
    renderProfileView();
  });

  // Pomodoro Timer Presets
  document.querySelectorAll('.btn-timer-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-timer-preset').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const timeSec = Number(btn.getAttribute('data-time')) || 1500;
      timerTotalSeconds = timeSec;
      timerRemainingSeconds = timeSec;
      pausePomodoroTimer();
      updateTimerDisplay();
      if (elements.timerStatusBadge) {
        elements.timerStatusBadge.textContent = 'Ready';
        elements.timerStatusBadge.style.color = 'var(--text-muted)';
      }
      if (elements.btnTimerToggle) {
        elements.btnTimerToggle.innerHTML = `${renderIcon('play')} Start`;
      }
    });
  });

  // Pomodoro Timer Controls
  elements.btnTimerToggle?.addEventListener('click', () => {
    if (timerRunning) {
      pausePomodoroTimer();
    } else {
      startPomodoroTimer();
    }
  });

  elements.btnTimerReset?.addEventListener('click', resetPomodoroTimer);

  // Quote Refresh Button
  elements.btnRefreshQuote?.addEventListener('click', () => {
    currentQuoteIndex++;
    if (elements.btnRefreshQuote) {
      elements.btnRefreshQuote.style.transition = 'transform 0.25s ease';
      elements.btnRefreshQuote.style.transform = 'rotate(180deg)';
      setTimeout(() => {
        if (elements.btnRefreshQuote) {
          elements.btnRefreshQuote.style.transition = '';
          elements.btnRefreshQuote.style.transform = '';
        }
      }, 260);
    }
    renderQuoteWidget();
  });

  // Scratchpad Autosave
  elements.widgetScratchpadArea?.addEventListener('input', (e) => {
    if (elements.scratchpadStatus) {
      elements.scratchpadStatus.textContent = 'Saving...';
      elements.scratchpadStatus.style.color = 'var(--text-muted)';
    }
    clearTimeout(scratchpadSaveTimer);
    scratchpadSaveTimer = setTimeout(() => {
      store.saveScratchpad(e.target.value);
      if (elements.scratchpadStatus) {
        elements.scratchpadStatus.textContent = 'Auto-Saved';
        elements.scratchpadStatus.style.color = 'var(--color-success)';
      }
    }, 400);
  });

  // Feedback Rating Stars
  elements.feedbackRatingGroup?.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-rating-star');
    if (!btn) return;
    const rating = Number(btn.getAttribute('data-rating')) || 5;
    selectedFeedbackRating = rating;
    document.querySelectorAll('.btn-rating-star').forEach(b => {
      b.classList.toggle('active', Number(b.getAttribute('data-rating')) === rating);
    });
  });

  // Feedback Form Submit
  elements.feedbackForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const type = elements.feedbackCategorySelect?.value || 'feature';
    const message = (elements.feedbackMessageArea?.value || '').trim();
    if (!message) return;

    store.addFeedback({ type, rating: selectedFeedbackRating, message });
    elements.feedbackMessageArea.value = '';
    renderFeedbackHistory();
    showToast('Thank you for your feedback! It helps guide future updates.');
  });

  // Devices Revoke Buttons
  elements.devicesListContainer?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-revoke-device]');
    if (!btn) return;
    const deviceId = btn.getAttribute('data-revoke-device');
    auth.revokeDevice(deviceId);
    showToast('Device session revoked');
    renderProfileView();
  });

  // Profile Logout Button
  elements.profileLogoutBtn?.addEventListener('click', handleLogout);

  // Desktop Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    const isTyping = activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select';

    if (e.key === 'Escape') {
      if (elements.taskModal.classList.contains('is-open')) closeEditTaskModal();
      if (elements.habitModal?.classList.contains('is-open')) closeHabitModal();
      if (elements.projectModal?.classList.contains('is-open')) closeProjectModal();
      if (elements.categoryModal.classList.contains('is-open')) elements.categoryModal.classList.remove('is-open');
      if (elements.sidebar.classList.contains('is-open')) elements.sidebar.classList.remove('is-open');
      if (elements.searchInput.value) {
        elements.searchInput.value = '';
        store.updateSettings({ searchQuery: '' });
      }
      return;
    }

    if (!isTyping) {
      if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        if (elements.habitsView?.classList.contains('is-active')) {
          openHabitModal();
        } else if (elements.projectsView?.classList.contains('is-active')) {
          openProjectModal();
        } else {
          openNewTaskModal();
        }
      } else if (e.key === '/') {
        e.preventDefault();
        elements.searchInput.focus();
      }
    }
  });

  // Hash route listener
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'privacy' || hash === 'terms' || hash === 'profile' || hash === 'habits' || hash === 'projects') {
      switchAppView(hash);
    } else {
      switchAppView('tasks');
    }
  });
}

// Welcome Screen Controller
let welcomeDismissTimer = null;

function dismissWelcomeScreen() {
  if (!elements.welcomeScreen || elements.welcomeScreen.classList.contains('is-hidden')) return;
  if (welcomeDismissTimer) {
    clearTimeout(welcomeDismissTimer);
    welcomeDismissTimer = null;
  }
  elements.welcomeScreen.classList.add('is-hidden');
  setTimeout(() => {
    if (elements.welcomeScreen) {
      elements.welcomeScreen.style.display = 'none';
    }
  }, 600);
}

function initWelcomeScreen() {
  if (!elements.welcomeScreen) return;

  elements.welcomeContinueBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    dismissWelcomeScreen();
  });

  elements.welcomeScreen.addEventListener('click', () => {
    dismissWelcomeScreen();
  });

  window.addEventListener('keydown', () => {
    if (elements.welcomeScreen && !elements.welcomeScreen.classList.contains('is-hidden')) {
      dismissWelcomeScreen();
    }
  });

  // Auto-dismiss after 4.2 seconds
  welcomeDismissTimer = setTimeout(() => {
    dismissWelcomeScreen();
  }, 4200);
}

// Initial Boot
function init() {
  const savedTheme = localStorage.getItem('task_core_theme') || store.getSettings().theme || 'light';
  applyTheme(savedTheme);

  // Populate dynamic icons in initial HTML placeholders
  document.querySelectorAll('[data-icon]').forEach(el => {
    const iconName = el.getAttribute('data-icon');
    el.innerHTML = renderIcon(iconName);
  });

  initWelcomeScreen();
  setupEvents();
  checkAuthState();
  applyTaskbarAppearance();
  renderCalendar();

  // Handle URL hash on initial load
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash === 'privacy' || initialHash === 'terms' || initialHash === 'profile' || initialHash === 'habits' || initialHash === 'projects') {
    switchAppView(initialHash);
  }
}

document.addEventListener('DOMContentLoaded', init);
