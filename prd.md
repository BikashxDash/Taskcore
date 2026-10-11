# Product Requirements Document (PRD)

## 1. Executive Summary
This document specifies the requirements for a high-performance, distraction-free Task Management Application built for desktop and mobile web browsers. The product focuses on utility, speed, and visual clarity without decorative clutter or synthetic marketing elements.

## 2. Product Objectives
- Deliver a fast, responsive task management tool that works smoothly across mobile phones and desktop computers.
- Provide full local-first data persistence with zero mandatory cloud accounts or external tracking.
- Adhere strictly to clean utility design standards: no purple gradients, no pill-shaped buttons, no emojis, no em dashes, and no artificial metrics.
- Include transparent, legally standard Privacy Policy and Terms and Conditions pages directly in the application.

## 3. Target Audience
- Knowledge workers, students, engineers, and power users who need reliable task management without bloat.
- Mobile users who demand fast thumb-friendly task capture on the move.
- Desktop users who need rapid keyboard navigation, clear filters, and multi-pane organization.

## 4. Key Functional Requirements

### 4.1 Task Lifecycle Management
- **Task Creation**: Fast capture bar with title, optional notes/description, priority, due date, category, and checklist items.
- **Task Editing**: Direct inline editing for title and detailed modal/drawer for deep editing.
- **Task Completion**: Toggle status with immediate visual feedback, strikethrough, and completion timestamp.
- **Task Deletion**: Single-item deletion with undo toast notification, plus batch clear for completed tasks.
- **Subtasks (Checklist)**: Ability to add mini-checklists inside tasks with completion ratios (e.g. 2 of 5 done).

### 4.2 Categorization, Priorities, and Tags
- **Categories / Lists**: Pre-loaded default categories (Work, Personal, Learning, Errands) and user-defined custom categories with custom color tags.
- **Priority Levels**: Four distinct operational levels: Urgent, High, Medium, Low, each marked by clean, accessible indicator bars.
- **Due Dates & Time Tracking**: Support for due dates, overdue warnings, today flags, and upcoming schedules.

### 4.3 Search, Sorting, and Filtering
- **Full-Text Search**: Instant search filtering by task title, description notes, and subtask contents.
- **Quick Views**:
  - All Tasks
  - Today (tasks due today)
  - Upcoming (tasks due in next 7 days)
  - Overdue (tasks past due date)
  - Completed
- **Sorting Options**: Sort by Due Date, Priority (Highest first), Alphabetical, or Creation Date.

### 4.4 Data Persistence and Portability
- **Local Storage Engine**: Automatic synchronous persistence to browser localStorage.
- **Backup & Restore**: Export all tasks and categories as a clean JSON file; import existing JSON backups.
- **Reset Option**: Clear all data with double-confirmation modal.

### 4.5 Responsive Experience
- **Mobile Phones (< 768px)**:
  - Fixed bottom navigation bar with 5 key actions: Tasks, Today, Add, Lists, and Profile.
  - Profile button replaces generic legal button to provide quick one-thumb account, taskbar customization, and subscription access.
  - Bottom-sheet drawers for task details and editing.
  - Generous touch targets (minimum 44px by 44px).
  - No horizontal scrolling.
- **Desktop (>= 768px)**:
  - Left collapsible sidebar with category management, quick views, and profile badge.
  - Multi-column central feed with quick add bar at top.
  - Comprehensive keyboard shortcuts (e.g. 'N' for new task, '/' for search, 'Esc' to close dialogs).

### 4.6 Compliance and Legal Pages
- **Privacy Policy Page**: Clear explanation that all data remains local in the user's browser, with zero server telemetry and zero third-party trackers.
- **Terms and Conditions (T&C) Page**: Standard terms of use, local data responsibility, and software licensing.

### 4.7 Mandatory Authentication System
- **Mandatory User Access**: Access to the task manager workspace is locked behind authentication. Unauthenticated users cannot view or mutate tasks.
- **Account Registration**: New users can register with Full Name, Email, Username, Password (minimum 6 characters), and mandatory terms acceptance.
- **User Login**: Existing users authenticate with their Username or Email and password.
- **Client-Side Cryptographic Security**: Passwords hashed locally using SHA-256 via Web Crypto API before storage.
- **Session Persistence**: Active session stored locally to maintain login state across reloads.
- **Multi-User Isolation**: Each user account maintains their own separate task list, categories, and settings.
- **Sign Out Capability**: Dedicated sign out actions in the sidebar and header to lock the workspace.

### 4.8 Mobile Profile, Customization, and Subscriptions
- **Taskbar Customization**:
  - Color palettes: Dusty Rose, Soft Blush, Vanilla Cream, Meadow Moss, Velvet Charcoal (zero purple gradients).
  - Shape styles: Edge-to-Edge Box (0px), Top Rounded (8px), Floating Bar (8px) (strictly no pill shapes).
- **Account Modification Suggestion Pattern**:
  - Account status preview card displaying current full name, email, and password security status.
  - Suggestion prompt card offering "Want to modify your account?" with a "Modify Account" action button.
  - Expandable modification container hidden by default on both desktop and mobile; reveals editable name, email, and password fields on demand.
  - Collapse controls (Cancel and Top Close) and automatic collapse upon successful save.
- **Subscription Tiers**: Community Edition ($0 lifetime) and Supporter Tier ($19 one-time) with feature transparency.
- **Session & Device Audit**: List logged-in devices with active status and revoke options.
- **App Version Display**: Direct display of TaskCore build version and local storage engine status.

## 5. Non-Functional Requirements
- **Performance**: Initial load time under 1 second; zero-latency input response.
- **Accessibility**: Full keyboard accessibility, semantic HTML elements, WCAG 2.1 AA compliant contrast.
- **Cross-Browser Compatibility**: Support modern evergreen browsers (Chrome, Firefox, Safari, Edge, Mobile Safari, Android Chrome).
- **Design Cleanliness**: Strict adherence to no-slop rules (detailed in rules.md).


