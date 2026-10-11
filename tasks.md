# Task Implementation Plan (tasks.md)

## Phase 1: Planning and Specification Documentation
- [x] Create `prd.md` (Product Requirements Document)
- [x] Create `arctiture.md` (System Architecture and Data Model)
- [x] Create `rules.md` (Strict Constraints and Negative Guidelines)
- [x] Create `design.md` (Design System, Tokens, and Component Specs)
- [x] Create `tasks.md` (Implementation Checklist and Milestones)
- [x] Create `memory.md` (Project Memory and Status Log)

## Phase 2: Assets and Visual Foundation
- [x] Create `assets/favicon.svg`: Custom vector checkmark icon (square with subtle 4px radius, crisp geometric check).
- [x] Create `styles/main.css`:
  - [x] Design tokens (dark and light palettes, typography, spacing).
  - [x] Zero purple gradient enforcement.
  - [x] Rectangular button styles (border-radius: 6px, no pill shapes).
  - [x] Responsive grid and flexbox layout (mobile bottom bar + desktop sidebar).
  - [x] Standard hardware-accelerated transitions (no crazy scroll animations, no cursor effects).
  - [x] Form input styling, task card states, and modal dialog overlays.

## Phase 3: Markup and Semantic Structure
- [x] Create `index.html`:
  - [x] Semantic layout (`<header>`, `<nav>`, `<main>`, `<aside>`, `<dialog>`).
  - [x] Custom favicon link.
  - [x] Desktop sidebar navigation with views (All Tasks, Today, Upcoming, Overdue, Completed, Categories).
  - [x] Mobile bottom navigation bar for high touch ergonomics.
  - [x] Quick-add task bar with title input, category selector, priority badge, and due date.
  - [x] Task list container with empty state illustrations (SVG based, no AI slop photos).
  - [x] Task detail drawer / edit modal for comprehensive editing and subtask checklists.
  - [x] Privacy Policy view (accessible via sidebar and footer).
  - [x] Terms and Conditions view (accessible via sidebar and footer).
  - [x] Data management controls (JSON Backup, Import, Clear Data).
  - [x] Zero "Made with AI" watermarks or badges.

## Phase 4: Scripting and State Management
- [x] Create `scripts/icons.js`:
  - [x] Clean vector SVG definitions (Check, Plus, Trash, Edit, Calendar, Flag, Search, Filter, Folder, Shield, FileText, Download, Upload, Close).
  - [x] Strict ban on unicode emojis.
- [x] Create `scripts/store.js`:
  - [x] Task state management (add, edit, toggle, delete, bulk delete, subtask toggle).
  - [x] Category state management (add category, delete category, custom colors).
  - [x] Filter and search engine (query, category, status, priority, date range).
  - [x] LocalStorage synchronization with error boundaries.
  - [x] JSON export and import validation.
- [x] Create `scripts/app.js`:
  - [x] DOM controller and event binding.
  - [x] Desktop keyboard shortcuts (N for new task, / for search, Esc to dismiss).
  - [x] View navigation handler (#tasks, #privacy, #terms).
  - [x] Toast notification system for non-intrusive feedback and task undo.
  - [x] Real metric calculations (real count of active, completed, overdue tasks; zero fake social proof).

## Phase 5: Verification and Quality Assurance
- [x] Check against all negative constraints:
  - [x] Verify no purple gradients in CSS.
  - [x] Verify no pill-shaped buttons in UI.
  - [x] Verify no fake reviews or fake metrics.
  - [x] Verify no vague hero text.
  - [x] Verify zero emoji characters in all files.
  - [x] Verify zero em dashes in all files.
  - [x] Verify no crazy scroll or cursor animations.
  - [x] Verify custom favicon loads properly.
  - [x] Verify "Made with AI" tag is absent.
  - [x] Verify Privacy Policy and T&C pages render cleanly and accurately.
- [x] Mobile and desktop viewport verification.

## Phase 6: Mandatory Authentication System
- [x] Create `scripts/auth.js`:
  - [x] SHA-256 client cryptographic password hashing via Web Crypto API.
  - [x] User registration with validation (name, email, username, password length, terms agreement).
  - [x] User login with credential verification and session persistence.
  - [x] Session management (active user session tracking, log out).
- [x] Add Authentication UI in `index.html`:
  - [x] Mandatory auth card blocking access for unauthenticated visitors.
  - [x] Tab switcher between Sign In and Create Account.
  - [x] User profile badge with avatar and logout action in sidebar and top header.
- [x] Add Authentication styles in `styles/main.css`:
  - [x] Centered card layout with rectangular buttons and crisp border styling.
  - [x] Form input groups with vector SVG icons.
- [x] Integrate multi-user task isolation in `scripts/store.js` and `scripts/app.js`:
  - [x] Scoped localStorage keys per user ID (`setUser(userId)`).
  - [x] Dynamic session synchronization across login and logout.

## Phase 7: Mobile Profile, Taskbar Customization, and Subscriptions
- [x] Update mobile bottom navigation bar last button to Profile (`#mobileNavProfile`).
- [x] Implement `#profileView` container with 5 dedicated functional sections:
  - [x] Account Credentials view with current identity preview.
  - [x] Taskbar Customization:
    - [x] 4 solid color themes (Slate Navy, Deep Charcoal, Midnight Navy, Forest Pine).
    - [x] 3 geometric shape styles (Box 0px, Top Rounded 8px, Floating Bar 8px).
    - [x] Strict prohibition of purple gradients and pill shapes.
  - [x] Subscriptions hub with Community Edition ($0) and Supporter Tier ($19 one-time).
  - [x] Logged-in Devices monitor with session list and device revocation action.
  - [x] App version information (v1.2.0 Build 2026.10.08) and direct links to Privacy Policy and Terms of Service.

## Phase 8: Opt-In Account Modification Suggestion Pattern
- [x] Present account modification as an opt-in suggestion card across both desktop and mobile views:
  - [x] Account status preview card displaying Full Name, Email Address, and SHA-256 security status.
  - [x] Suggestion prompt card with "Want to modify your account?" invitation and "Modify Account" action button.
  - [x] Expandable modification form container hidden by default to keep the profile tidy.
  - [x] Seamless expand/collapse actions via "Modify Account", "Cancel", and top close buttons.
  - [x] Automatic form reset and collapse back to suggestion mode upon successful update.
## Phase 9: Uniform Rounded Corners Across Every Page
- [x] Apply consistent rounded corners (`border-radius: var(--radius-xl)` = 14px) across all views and cards:
  - [x] Tasks Workspace page enclosed in `.workspace-card` with 14px rounded corners and subtle border.
  - [x] User Profile page `.profile-card` styled with 14px rounded corners.
  - [x] Privacy Policy page `.legal-article` styled with 14px rounded corners.
  - [x] Terms of Service page `.legal-article` styled with 14px rounded corners.
  - [x] Authentication screen `.auth-card` styled with 14px rounded corners.
  - [x] Task and category modal dialogs `.modal-dialog` styled with 14px rounded corners.
  - [x] Mobile phone responsive viewports padded with 12px margins so rounded card corners remain distinct and never clipped flat.

## Phase 10: Bespoke 4-Color Palette Integration
- [x] Integrated user color palette across entire visual hierarchy:
  - [x] Brand Primary Accent: Dusty Rose (`#d8a2a2`) for action buttons, links, active swatches, and focus rings.
  - [x] Soft Rose Blush (`#ffdcdc`) for light card surfaces, category tags, and secondary accents.
  - [x] Vanilla Butter Cream (`#fff9d6`) for high-contrast primary typography in dark mode and canvas in light mode.
  - [x] Meadow Moss (`#8ea66b`) for structural borders, success indicators, category tags, and secondary icons.
  - [x] Updated mobile bottom nav taskbar themes with Dusty Rose as the primary default.
  - [x] Synchronized custom SVG favicon with palette checkmark and card colors.

## Phase 11: Horizontal Scrollable Calendar with Maximize Option
- [x] Implement calendar strip in row format above task add box:
  - [x] Date number prominently rendered on top with 3-letter day underneath.
  - [x] Prominent TODAY badge and dedicated green ring styling for current day.
  - [x] Smooth horizontal track scrolling with mouse wheel and touch swipe.
  - [x] Streamlined header controls containing exclusively the maximize vector symbol.
  - [x] Maximize toggle displaying full month calendar grid with 7 weekday headers.
  - [x] Minimize toggle collapsing back into row format.
  - [x] Two-way synchronization with quick-add date input and active day highlights.

## Phase 12: Phone Screen Header Streamlining
- [x] Streamline top header specifically for phone screens (< 768px):
  - [x] Removed Sign Out button from top header on phones (available via Profile tab).
  - [x] Removed search bar from top header on phones.
  - [x] Removed hamburger menu button on phones.
  - [x] Placed app name "TaskCore" with logo prominently on the top header.
  - [x] Kept theme toggle button neatly on the right side.

## Phase 13: Calendar and Metrics Reordering
- [x] Reordered workspace layout for all screen sizes:
  - [x] Positioned horizontal calendar at the top of the workspace card.
  - [x] Positioned active, completed, due today, and overdue metrics strip directly beneath the calendar.
  - [x] Maintained quick task add box below the metrics strip with 12px vertical spacing.

## Phase 14: Single Row Status Indicators with Symbols and Numbers Only
- [x] Streamline status indicators across all screen sizes:
  - [x] Eliminated grid structure, placing all 4 indicators in a single horizontal row.
  - [x] Removed text labels, displaying exclusively vector symbol plus count number.
  - [x] Assigned purposeful accent colors: Active (`#d8a2a2`), Completed (`#8ea66b`), Due Today (`#ffdcdc`), Overdue (`#ef4444`).
  - [x] Maintained responsive single-row layout across desktop and mobile screens.

## Phase 15: Removal of Inline Add Task Field from Task Page
- [x] Remove inline quick add task form (`#quickAddForm`) from the main task workspace:
  - [x] Removed `<form class="quick-add-box" id="quickAddForm">` and inline inputs from `index.html`.
  - [x] Added clean "+ Add Task" button to desktop toolbar controls (`#btnOpenNewTaskModal`).
  - [x] Configured modal (`#taskModal`) to support both creating new tasks and editing existing tasks.
  - [x] Wired mobile bottom nav FAB button (`#mobileNavAdd`) and keyboard shortcut (`N`) to open the New Task modal.
  - [x] Updated empty state description to remove references to the quick add input above.
  - [x] Cleaned up obsolete quick-add styles in `styles/main.css` and ensured responsive mobile layout.

## Phase 16: Clear Completed Removal and Single-Line Mobile Toolbar
- [x] Remove Clear Completed button across all screens:
  - [x] Removed `#clearCompletedBtn` element from `index.html`.
  - [x] Removed `#clearCompletedBtn` reference and click event binding from `scripts/app.js`.
- [x] Configure mobile toolbar to keep All Tasks heading and sorting box in a single line:
  - [x] Set `.toolbar-strip` to `flex-direction: row; align-items: center; justify-content: space-between; flex-wrap: nowrap;`.
  - [x] Optimized `#sortSelect` width and heading margins for 375px mobile viewports.
  - [x] Verified zero horizontal overflow and clean alignment on mobile and desktop.

## Phase 17: Removal of Task Page Background Container
- [x] Remove background card container from the task page across all screen sizes:
  - [x] Removed background color, border, border-radius, and container padding from `.workspace-card` in `styles/main.css`.
  - [x] Allowed calendar, metrics indicators, toolbar, and task cards to sit directly on the application canvas.
  - [x] Preserved responsive viewport gutters and verified layout aesthetics on desktop and mobile.

## Phase 18: Theme Persistence Bugfix on Refresh
- [x] Resolve theme reset issue where refreshing the page reverted to dark mode:
  - [x] Added early head execution script in `index.html` to read `localStorage` and set `data-theme` before page render, avoiding flash of dark mode.
  - [x] Synchronized theme preference across global storage (`task_core_theme`) and user profile store settings.
  - [x] Created `applyTheme()` helper function to dynamically set DOM attribute, storage, toggle button icon, and labels.
  - [x] Connected `applyTheme()` to `checkAuthState()`, `setupEvents()`, and `init()`.
  - [x] Verified persistence across reloads in both light and dark modes in browser.

## Phase 19: Elimination of Calendar Auto-Scroll on Refresh
- [x] Eliminate distracting horizontal sliding/scrolling animation upon page refresh:
  - [x] Removed `setTimeout` calling `scrollStripToDate` during `init()` boot sequence.
  - [x] Removed `scroll-behavior: smooth;` from `.calendar-strip-track` in `styles/main.css`.
  - [x] Configured calendar strip to start at `startOffset = 0`, placing Today at the first card position immediately.
  - [x] Verified calendar remains completely motionless and static on page load and reload.

## Phase 20: Profile Page Streamlining and Background Container Removal
- [x] Remove background card container from the profile page across all screens:
  - [x] Set `.profile-card` to transparent background, zero border, and zero padding on desktop and mobile in `styles/main.css`.
  - [x] Let profile sections and cards sit naturally on the application canvas without redundant container nesting.
- [x] Remove email display from username side:
  - [x] Updated `#profileUserHandleEmail` in `index.html` to show only `@username`.
  - [x] Updated `renderProfileView` in `scripts/app.js` to assign `@` + `user.username` without appending the email address.
- [x] Remove Sign Out button from profile page top banner:
  - [x] Removed `#profileLogoutBtn` from `index.html`.
- [x] Remove Return to Tasks button from profile page top banner:
  - [x] Removed `.back-to-tasks-btn` from profile top banner in `index.html`.
- [x] Verified visual layout on mobile and desktop viewports.

## Phase 21: Animated Ad-Free Banner and Profile Pencil Edit Refinement
- [x] Add top banner showing the application is 100% ad-free forever:
  - [x] Created `.ad-free-banner` in `index.html` positioned at the top of the profile view.
  - [x] Included animated shield pulse badge, shimmer sweep animation, and pulsing green status dot.
- [x] Position profile section directly under the ad-free banner:
  - [x] Aligned `.profile-top-banner` directly underneath `.ad-free-banner`.
- [x] Remove Account Credentials preview section and "Want to modify your account?" suggestion card:
  - [x] Removed `.account-preview-card` and `#accountSuggestionCard` from `index.html`.
  - [x] Cleaned up obsolete references from `styles/main.css` and `scripts/app.js`.
- [x] Add pencil icon button aligned with the profile picture section:
  - [x] Added `#btnEditProfile` with pencil SVG icon in `.profile-top-banner`.
  - [x] Wired click event to toggle `#modifyAccountContainer` for smooth profile editing.
- [x] Verified full interaction and responsive layout on mobile and desktop viewports.

## Phase 22: Customization Accordion and App-Wide Color Theming
- [x] Rename section to Customization and implement collapsible accordion behavior:
  - [x] Renamed "Taskbar Customization (Colors & Shapes)" to "Customization" in `index.html`.
  - [x] Wrapped options in collapsible `#customizationOptionsContent` which is hidden by default (`style="display: none;"`).
  - [x] Added `#customizationToggleBtn` with palette icon, chevron arrow, and aria-expanded state handling.
  - [x] Clicking Customization smoothly expands the options; clicking again collapses them.
- [x] Extend color customization to the entire application:
  - [x] Added `data-accent` global CSS token mappings in `styles/main.css` for Dusty Rose, Soft Blush, Vanilla Cream, Meadow Moss, and Velvet Charcoal.
  - [x] Connected root element attribute (`document.documentElement.setAttribute('data-accent', color)`) to update buttons, active states, calendar highlights, and borders across the entire app.
  - [x] Added early head loading script logic and localStorage synchronization for instantaneous accent persistence without flashing.
  - [x] Verified collapse/expand states and application-wide color updates in browser.

## Phase 23: Calendar Today Date Dot Removal and Border Highlighting
- [x] Remove the dot (.) icon from current date across all calendar views:
  - [x] Updated `renderCalendarStrip` in `scripts/app.js` to only render task dots when `!isToday`.
  - [x] Updated `createCalendarGridCell` in `scripts/app.js` to omit task dots on the current date.
  - [x] Added safety rule in `styles/main.css` (`.cal-day-card.is-today .cal-task-dot-wrap, .cal-grid-cell.is-today .cal-task-dot-wrap { display: none !important; }`).
- [x] Highlight current date with prominent border:
  - [x] Updated `.cal-day-card.is-today` and `.cal-grid-cell.is-today` to use crisp `border: 2px solid var(--border-strong)`.
  - [x] Adjusted padding to maintain exact geometric dimensions without layout shifts.
  - [x] Ensured other days with tasks retain their task indicator dots.
- [x] Verified visually in browser across horizontal strip and maximized month grid views.

## Phase 24: Taskbar Today Replacement with Habits Tracker
- [x] Remove the Today button from mobile bottom taskbar:
  - [x] Removed `#mobileNavToday` from `#mobileBottomNav` in `index.html`.
- [x] Add Habits button in its place on the mobile taskbar:
  - [x] Added `#mobileNavHabits` with clean vector `repeat` icon and "Habits" label in `#mobileBottomNav`.
  - [x] Added desktop sidebar navigation item `#sidebarNavHabits` under Views for cross-device consistency.
- [x] Implement complete Habits tracking system:
  - [x] Added vector icons `repeat` and `flame` to `scripts/icons.js`.
  - [x] Added scoped LocalStorage habits persistence, streak calculations, and CRUD handlers to `scripts/store.js`.
  - [x] Created responsive `#habitsView` with summary metrics strip, streak indicators, 7-day completion strip, check-in toggles, and habit management.
  - [x] Created `#habitModal` for creating and editing habits with target frequency and custom descriptions.
  - [x] Integrated view switching (`switchAppView('habits')`), responsive styling, keyboard shortcuts, and verified across mobile and desktop viewports.

## Phase 25: Taskbar Lists Replacement with Projects Tracker
- [x] Remove Lists button from mobile bottom taskbar:
  - [x] Removed `#mobileNavMenu` ("Lists" with folder icon) from `#mobileBottomNav` in `index.html`.
- [x] Add Projects button in its place on the mobile taskbar:
  - [x] Added `#mobileNavProjects` with clean vector `briefcase` icon and "Projects" label in `#mobileBottomNav`.
  - [x] Added desktop sidebar navigation item `#sidebarNavProjects` under Views for cross-device consistency.
- [x] Implement complete Projects tracking system:
  - [x] Added vector icons `briefcase` and `layers` to `scripts/icons.js`.
  - [x] Added scoped LocalStorage projects persistence (`task_core_v1_projects_<userId>`), default projects, and CRUD handlers (`getProjects`, `addProject`, `updateProject`, `deleteProject`, `getProjectTaskStats`) in `scripts/store.js`.
  - [x] Created responsive `#projectsView` with summary metrics strip (Total, Active, Completed, Average Task Progress), project cards with dynamic progress bars, task ratios, deadlines, and action buttons in `index.html`.
  - [x] Created `#projectModal` for creating and editing projects with name, description, category, status, deadline, and accent color.
  - [x] Styled Projects container, cards, progress tracks, and responsive layout in `styles/main.css`.
  - [x] Integrated view switching (`switchAppView('projects')`), event handlers, shortcut `N`, and verified across mobile (375x812) and desktop (1280x800) in browser.

## Phase 26: Donate Tiers, Productivity Widgets, and User Feedback
- [x] Replace Subscription with Donate for Ad-Free Future Development:
  - [x] Renamed Subscription section to "Donate & Support Development" (`#donateSectionBlock`).
  - [x] Configured 4 donation payment tiers in Indian Rupees:
    - 1 Month: ₹29 (`1m`)
    - 3 Months: ₹89 (`3m`)
    - 6 Months: ₹159 (`6m`)
    - 1 Year: ₹299 (`1y`)
  - [x] Maintained Free Community Tier (`free`) with toggle back option.
  - [x] Added "Active Patron" badge and reactive selection state in `scripts/auth.js` (`updateDonation`).
  - [x] Outlined patron perks: Ad-free forever pledge, unrestricted app features access, and priority roadmap voting.
- [x] Add Productivity Widgets section on the Profile page:
  - [x] Built `#widgetsSectionBlock` with a responsive multi-column grid (`.widgets-grid`).
  - [x] Implemented Focus Sprint Timer (Pomodoro timer with 25m, 15m, and 5m presets, Start/Pause/Reset controls, and completion toast).
  - [x] Implemented Daily Focus Mindset widget with refresh button rotating through curated aphorisms.
  - [x] Implemented Quick Thought Scratchpad with debounced auto-save directly to LocalStorage (`scripts/store.js`).
- [x] Add Feedback & Suggestions section at the end of the Profile page:
  - [x] Built `#feedbackSectionBlock` featuring feedback category dropdown, 1 to 5 star rating selector, suggestion textarea, and submit button.
  - [x] Connected persistent feedback storage in `scripts/store.js` (`addFeedback`, `getFeedback`).
  - [x] Implemented recent feedback feed display with date stamps and rating stars.
- [x] Verified interactions and responsive layout across mobile (375x812) and desktop (1280x800) in browser.

## Phase 27: Comprehensive UI Polish & Micro-Interactions
- [x] Typography and Rendering Upgrade:
  - [x] Loaded Google Fonts Inter (`300`, `400`, `500`, `600`, `700`) with preconnect and font-feature-settings (`cv02`, `cv03`, `cv04`, `cv11`).
  - [x] Refined text rendering (`optimizeLegibility`, antialiasing).
- [x] Custom Sleek Scrollbars:
  - [x] Replaced default OS scrollbars with refined 6px scrollbars styled in theme colors.
- [x] Multi-Tier Shadow & Elevation System:
  - [x] Implemented `--shadow-xs`, `--shadow-sm`, `--shadow-md`, `--shadow-lg` for dark and light modes.
  - [x] Standardized all cards and modals to uniform 6px (`--radius-md`) geometry adhering to strict 4px-6px design guidelines.
- [x] Tactile Button and Input States:
  - [x] Added tactile active press transitions (`transform: translateY(1px)`) and subtle highlights to buttons.
  - [x] Added smooth focus halos (`box-shadow: 0 0 0 3px var(--color-primary-subtle)`) to form inputs.
- [x] Widget and Feedback Micro-Interactions:
  - [x] Housed Focus Sprint Timer in an inset digital cockpit display with monospace tabular-nums readout.
  - [x] Added cross-fade transitions and 180-degree rotation click feedback to Daily Focus Mindset rotator.
  - [x] Enhanced Feedback rating buttons with star glyphs (`1 ★` to `5 ★`) and responsive hover/active states.
  - [x] Verified 0 console errors and validated browser rendering across all views.

## Phase 28: Mobile Side-by-Side Horizontal Scroll for Donate Cards
- [x] Eliminate vertical list stacking of donate cards on mobile screens:
  - [x] Removed `grid-template-columns: 1fr` from `@media (max-width: 600px)` for `.donation-grid`.
  - [x] Implemented flex row layout with `flex-wrap: nowrap` and `overflow-x: auto` under `@media (max-width: 768px)`.
  - [x] Added `scroll-snap-type: x mandatory` and `-webkit-overflow-scrolling: touch` for smooth swipe navigation.
  - [x] Configured fixed mobile card width (`flex: 0 0 240px; min-width: 240px; max-width: 250px; scroll-snap-align: start`) ensuring adjacent cards peek into view.
  - [x] Added mobile-only `.donate-scroll-hint` ("Scroll sideways ->") for intuitive UX discovery.
  - [x] Bumped stylesheet version to `v=8` in `index.html`.
