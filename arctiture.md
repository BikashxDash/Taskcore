# Architecture Specification (arctiture.md)

## 1. System Overview
The application is structured as a client-side single page web application (SPA) built with vanilla HTML5, CSS3, and ES6+ JavaScript. It operates completely offline and requires zero external build dependencies or server runtime.

```
+-------------------------------------------------------------+
|                      Browser Window                         |
|                                                             |
|  +-------------------------------------------------------+  |
|  |                     App Shell                         |  |
|  |  +-----------------+  +----------------------------+  |  |
|  |  | Sidebar /       |  | Header / Filter Bar        |  |  |
|  |  | Bottom Nav      |  +----------------------------+  |  |
|  |  | - Navigation    |  | Main Workspace             |  |  |
|  |  | - Categories    |  | - Task Quick Add Bar       |  |  |
|  |  | - Legal Links   |  | - Task List & Cards        |  |  |
|  |  +-----------------+  | - Real Metric Badges       |  |  |
|  |                       +----------------------------+  |  |
|  +-------------------------------------------------------+  |
|                                                             |
|  +-------------------------------------------------------+  |
|  |                   Overlay Layer                       |  |
|  |  - Task Edit Modal / Bottom Sheet                     |  |
|  |  - Privacy Policy View                                |  |
|  |  - Terms & Conditions View                            |  |
|  |  - Toast Notification Manager                         |  |
|  +-------------------------------------------------------+  |
|                                                             |
|  +-------------------------------------------------------+  |
|  |                   State & Storage                     |  |
|  |  - TaskStore (CRUD, Filter, Search, Sort)             |  |
|  |  - CategoryStore                                      |  |
|  |  - SettingsStore (Theme, Density)                     |  |
|  |  - LocalStorage Engine + JSON Export/Import           |  |
|  +-------------------------------------------------------+  |
+-------------------------------------------------------------+
```

## 2. Directory & File Architecture
The codebase is arranged in a modular, maintainable structure:
- `index.html`: Semantic markup containing the mandatory authentication card, main application shell, modal templates, and legal views.
- `styles/main.css`: Design system tokens, auth card styles, responsive grid/flex layouts, and component rules.
- `scripts/auth.js`: Authentication manager providing SHA-256 password hashing, user registration, login, and session tracking.
- `scripts/store.js`: Central state container with multi-user isolation, reactive subscribers, and localStorage synchronization.
- `scripts/app.js`: Application controller, event listeners, view routing, keyboard shortcuts, and UI renderers.
- `scripts/icons.js`: Clean SVG icon definitions without emoji fallbacks.
- `assets/favicon.svg`: Custom vector favicon (geometric checkmark in crisp square container).
- Documentation files: `prd.md`, `arctiture.md`, `rules.md`, `design.md`, `tasks.md`, `memory.md`.

## 3. Data Schema

### 3.0 User & Session Objects
```javascript
// User Object (task_core_users_v1)
{
  id: "usr_1728391200000_abc",
  name: "Alex Morgan",
  email: "alex@example.com",
  username: "alexm",
  passwordHash: "7b4c8...", // SHA-256 digest
  createdAt: "2026-10-08T12:00:00.000Z"
}

// Active Session Object (task_core_session_v1)
{
  userId: "usr_1728391200000_abc",
  name: "Alex Morgan",
  email: "alex@example.com",
  username: "alexm",
  loggedInAt: "2026-10-08T12:05:00.000Z"
}
```

### 3.1 Task Object
```javascript
{
  id: "task_1728391200000_abc",
  title: "Complete quarterly financial review",
  description: "Check variance against baseline budget.",
  categoryId: "work",
  priority: "high", // urgent | high | medium | low
  dueDate: "2026-10-15", // YYYY-MM-DD or null
  dueTime: "17:00", // HH:MM or null
  completed: false,
  completedAt: null, // ISO string or null
  createdAt: "2026-10-08T12:00:00.000Z",
  subtasks: [
    { id: "sub_1", title: "Collect department reports", done: true },
    { id: "sub_2", title: "Compile summary spreadsheet", done: false }
  ]
}
```

### 3.2 Category Object
```javascript
{
  id: "work",
  name: "Work",
  color: "#d8a2a2", // Dusty rose hex color
  isDefault: true
}
```

### 3.3 Application Settings Object
```javascript
{
  theme: "dark", // dark | light
  sortBy: "dueDate", // dueDate | priority | created | title
  sortOrder: "asc", // asc | desc
  filterCategory: "all",
  filterView: "all", // all | today | upcoming | overdue | completed
  appColor: "rose", // rose | blush | vanilla | moss | charcoal (controls data-accent across entire app)
  taskbarColor: "rose", // synchronized with appColor
  taskbarShape: "box" // box | rounded | floating
}
```

## 4. State Management Strategy
- **Unidirectional Data Flow**: UI triggers actions -> Store mutates data -> Store persists to localStorage -> Store invokes registered render listeners.
- **Data Integrity**: Every mutation validates task schema; invalid entries are cleaned on initial load.
- **Storage Resilience**: LocalStorage read and write operations are wrapped in try-catch guards to handle storage quota limits gracefully.
- **Import / Export**: Clean JSON serialized export with schema version tag (`version: 1`).

## 5. View Routing & Overlays
A lightweight hash-based / state-driven navigation system switches between primary views without full page reloads:
- `#tasks`: Main task board and list.
- `#profile`: User Profile, Account Modification, Taskbar Customization, Subscriptions, and Device Audit.
- `#privacy`: Dedicated Privacy Policy view.
- `#terms`: Dedicated Terms and Conditions view.
- Modal dialogues: Accessible native `<dialog>` elements or role="dialog" overlays with trap focus, Esc key dismiss, and backdrop blur.

## 6. Performance & Security Considerations
- Zero external CDN dependencies; all CSS, SVGs, and JavaScript run locally.
- Content Security Policy friendly (no dynamic eval or untrusted string-to-DOM injections).
- Sanitized text nodes: User task titles and notes are inserted using textContent to prevent cross-site scripting (XSS).
- Efficient DOM updates: List rendering uses keyed task cards and minimal re-creation.

## 7. Unified Page Geometry & Rounded Corners Architecture
Every view in the application follows a standardized card-based containment pattern:
- **Tasks Workspace (`#tasksWorkspace`)**: Unboxed direct canvas layout where calendar, status metrics bar, toolbar, and task feed sit directly on the application canvas without nested background container card.
- **User Profile (`#profileView`)**: Unboxed direct canvas layout where profile header, credentials, taskbar preferences, licensing, and device monitors sit directly on the application canvas without redundant outer background container.
- **Privacy Policy (`#privacyView`)**: Contained in `.legal-article` with 14px rounded corners (`--radius-xl`).
- **Terms of Service (`#termsView`)**: Contained in `.legal-article` with 14px rounded corners (`--radius-xl`).
- **Authentication Screen (`#authScreen`)**: Contained in `.auth-card` with 14px rounded corners (`--radius-xl`).
- **Modal Dialogs**: Styled with 14px rounded corners (`--radius-xl`), transforming to a top-rounded drawer on mobile.
- **Mobile Edge Pacing**: Outer containers maintain 12px margins on phones so rounded corners remain crisp and visible.

## 8. Animated Ad-Free Banner & Direct Profile Edit Architecture
- **Ad-Free Forever Banner (`.ad-free-banner`)**: Positions at the top of `#profileView`, featuring continuous GPU-accelerated micro-animations: a breathing shield pulse badge, a soft shimmering light sweep (`adFreeShimmer`), and an emerald status indicator dot (`adFreeDotPulse`).
- **Profile Picture & User Info Alignment**: `.profile-top-banner` sits directly below the ad-free banner, displaying the user avatar, display name, handle (`@username`), and an aligned pencil edit button (`#btnEditProfile`).
- **Direct Expandable Form (`#modifyAccountContainer`)**: Clicking the pencil icon toggles the inline modification form directly, removing intermediary suggestion cards and preview blocks for a frictionless editing experience.
- **Form Dismissal**: Canceling, closing (X), or submitting smoothly collapses the form and reactively updates profile attributes and navigation state.

## 9. Horizontal Scrollable Calendar & Maximize Architecture
- **Component Mount**: `#taskCalendarSection` sits at the top of `#tasksWorkspace`, directly above the single-row metrics strip and workspace toolbar.
- **Row Format Track**: `#calendarStripTrack` renders an active 45-day window starting cleanly from today (index 0), each card displaying the day number on top and 3-letter day underneath, eliminating auto-scroll on refresh.
- **Current Day Highlighting**: Distinguishes current day with `.is-today`, highlighted with a clean 2px solid border (`var(--border-strong)`) and zero dot icon (`.cal-task-dot` omitted for today while preserved on other scheduled dates).
- **Maximized Grid Engine**: `#calendarMaximizedView` generates a full 7-column month grid.
- **Bidirectional State Sync**: Clicking any day card sets `calendarSelectedDate` and pre-populates the due date in the New Task modal.

## 10. Modal Task Creation Flow Architecture
- **Workspace Layout**: The inline quick add form was removed to maximize vertical screen efficiency and reduce clutter.
- **Creation Entry Points**:
  - Desktop: Primary "+ Add Task" button in `.toolbar-controls` (`#btnOpenNewTaskModal`).
  - Mobile: Primary floating action button in `#mobileBottomNav` (`#mobileNavAdd`).
  - Global: Keyboard shortcut `N` (when outside text inputs).
- **Dual Modal Lifecycle**: `#taskModal` dynamically switches between "New Task" creation mode (clean inputs, default category, hidden delete action, "Add Task" button) and "Edit Task" mode (pre-filled fields, subtasks checklist, delete action, "Save Changes" button).

## 11. Habits Subsystem Architecture
- **Taskbar Navigation**: Replaced `#mobileNavToday` with `#mobileNavHabits` (with the `repeat` icon and "Habits" label). Also exposed via `#sidebarNavHabits` on desktop.
- **Data Persistence**: Local-first scoped storage key `task_core_v1_habits_<userId>` via `scripts/store.js`. Supports complete CRUD actions (`getHabits`, `addHabit`, `updateHabit`, `deleteHabit`, `toggleHabitDate`).
- **Streak Calculation Engine**: `calculateHabitStreak(completedDates)` dynamically evaluates unbroken day sequences counting back from today or yesterday, returning real-time streak values with zero mocked metrics.
- **Habits View (`#habitsView`)**:
  - Header with title, subtitle, and primary "+ Add Habit" button (`#btnOpenHabitModal`).
  - Single-row metrics strip displaying total tracked habits, completed today count, and top active streak.
  - Interactive Habit Cards (`.habit-card`) featuring habit title, frequency badge, streak indicator pill, 7-day completion bubbles (interactive day check/uncheck), and primary Check In button.
- **Habit Modal (`#habitModal`)**: Supports creating new habits and editing existing habits with title, frequency (Daily, Weekdays, Weekends), and optional description.

## 12. Projects Subsystem Architecture
- **Taskbar Navigation**: Replaced `#mobileNavMenu` ("Lists" with folder icon) with `#mobileNavProjects` (with the `briefcase` icon and "Projects" label). Also added `#sidebarNavProjects` in desktop sidebar under Views.
- **Data Persistence**: Local-first scoped storage key `task_core_v1_projects_<userId>` via `scripts/store.js`. Supports complete CRUD actions (`getProjects`, `addProject`, `updateProject`, `deleteProject`, `getProjectTaskStats`).
- **Dynamic Task Progress Engine**: `getProjectTaskStats(project)` dynamically evaluates linked and category-aligned tasks, computing total tasks, completed tasks, and completion percentage without mock numbers.
- **Projects View (`#projectsView`)**:
  - Header toolbar with title, subtitle, and "+ Add Project" button (`#btnOpenNewProjectModal`).
  - Single-row metrics strip displaying Total Projects, Active Projects, Completed Projects, and Average Task Progress across all projects.
  - Responsive project cards grid (`.projects-grid-feed`, `.project-card`) featuring project title, category tag, status pill, description, progress bar with ratio and percentage, deadline pill, "View Tasks" shortcut button, and edit/delete actions.
- **Project Modal (`#projectModal`)**: Supports creating and editing projects with name, description, category, status (Active, In Progress, Completed, On Hold), deadline, and custom accent color.

## 13. Donate Patronage, Productivity Widgets, and Feedback Architecture
- **Donate Patronage Subsystem (`#donateSectionBlock`)**:
  - Replaces traditional subscription billing with a community patronage model designed to fund future ad-free engineering.
  - 4 Payment Tiers configured in Indian Rupees:
    - 1 Month: ₹29 (`1m`)
    - 3 Months: ₹89 (`3m`)
    - 6 Months: ₹159 (`6m`)
    - 1 Year: ₹299 (`1y`)
  - Free Community Tier (`free`) remains accessible with a dedicated reset option.
  - Managed by `auth.updateDonation(planId)` in `scripts/auth.js` and synced to the active session. Patrons receive an "Active Patron" badge and full feature access.
  - Mobile Responsive Behavior: On mobile screen widths (<= 768px), donate cards are presented side-by-side in a horizontally scrollable row with scroll-snap alignment instead of a vertical list, allowing fast swipe comparison without taking up vertical page space.
- **Productivity Widgets Subsystem (`#widgetsSectionBlock`)**:
  - Positioned within `#profileView` for unified personal dashboard control.
  - Multi-column grid containing three interactive modules:
    1. **Focus Sprint Timer**: Pomodoro sprint countdown with 25m, 15m, and 5m presets, Start/Pause toggling, Reset action, and non-blocking toast notification upon sprint completion.
    2. **Daily Focus Mindset**: Rotates through inspirational productivity aphorisms with a refresh trigger.
    3. **Quick Thought Scratchpad**: Auto-saving notepad stored under `task_core_v1_scratchpad_<userId>` in `scripts/store.js` using debounced input listeners.
- **User Feedback Subsystem (`#feedbackSectionBlock`)**:
  - Positioned at the bottom of `#profileView`.
  - Includes topic selector (Feature Request, Bug Report, Performance, General), 1 to 5 star rating buttons, suggestion text area, and submit action.
  - Submissions are persistently stored under `task_core_v1_feedback_<userId>` in `scripts/store.js` and rendered in a dynamic history feed with star indicators and relative date stamps.
