# Project Memory (memory.md)

## 1. Project Identity
- **Name**: Task Core (Clean Task Manager)
- **Target Form Factors**: Responsive Mobile Phones (<768px) and Desktop Computers (>=768px)
- **Tech Stack**: Vanilla HTML5, Vanilla CSS3, ES6+ JavaScript, Client-side LocalStorage
- **Server Dependencies**: None (Zero backend required, 100% private and offline-capable)

## 2. Hard Constraints Checklist
The following negative constraints were explicitly mandated and must be strictly enforced:
- **No purple gradients**: Backgrounds and buttons use solid colors and clean neutral borders.
- **No pill-shaped buttons**: All buttons and tags use rectangular boundaries with max 6px subtle rounding.
- **No fake reviews**: Zero fake customer quotes, ratings, or testimonial cards.
- **No fake metrics**: Only real, dynamically computed task counts (active, completed, overdue).
- **No vague hero text**: Direct, functional titles and UI labels only.
- **No emoji icons**: Exclusively clean geometric SVG vectors.
- **No em dashes**: The em dash character ("-") is banned across all UI text, code, documentation, and legal copy.
- **No crazy scroll animations**: Standard native browser scrolling without parallax or inertia manipulation.
- **No AI slop photos**: Zero artificial 3D avatar figures, stock models, or decorative blobs.
- **No AI slop copy**: Zero marketing buzzwords or corporate filler text.
- **No cursor animations**: Native OS cursor only.
- **No fake customer counters**: Zero fictitious social proof numbers.
- **Custom favicon**: Custom vector checkmark favicon in `assets/favicon.svg`.
- **Remove "Made with AI" tag**: Zero AI tags, badges, or watermarks.
- **Privacy Policy Page**: Fully articulated, transparent zero-tracking policy included in app navigation.
- **Terms and Conditions (T&C) Page**: Standard terms of use and local storage licensing included in app navigation.

## 3. Decisions & Architecture Log
- **Storage Strategy**: LocalStorage with schema versioning (`task_core_v1_tasks`, `task_core_v1_categories`, `task_core_v1_settings`).
- **Data Export/Import**: Built-in JSON serialization to guarantee user data ownership and backup freedom.
- **View Management**: Dual-view system allowing instant switching between the Task Workspace, Privacy Policy, and Terms & Conditions without full-page reloads.
- **Mobile Ergonomics**: Bottom navigation bar providing one-thumb reach to Tasks, Today, New Task, Lists, and Profile.
- **Desktop Ergonomics**: Fixed 260px sidebar with live count badges, quick filter access, and keyboard shortcuts.
- **Mandatory Authentication Engine**: Access locked by default. Multi-user registration, SHA-256 client hashing, session persistence, and isolated task stores per user (`scripts/auth.js`).
- **Profile & Appearance Hub**: User profile screen supporting account status preview, opt-in account modification suggestion card, live taskbar color and shape styling, subscription licensing, and device session monitoring.
- **Opt-In Account Modification Pattern**: Account credential modification is presented as a suggestion prompt rather than an exposed form. The user can review verified details and expand the modification form on click across both desktop and mobile viewports.
- **Consistent Rounded Corners Geometry**: All pages (Tasks, Profile, Privacy Policy, Terms of Service, and Auth) are enclosed in cards with 14px rounded corners (`--radius-xl`) and subtle neutral borders. On mobile phones, outer viewports retain 12px margins so corner curves remain crisp and visible.
- **Bespoke 4-Color Luxury Palette**: Complete visual hierarchy configured with Dusty Rose (`#D8A2A2`), Soft Rose Blush (`#FFDCDC`), Vanilla Butter Cream (`#FFF9D6`), and Meadow Moss (`#8EA66B`). Zero purple gradients, high contrast ratios exceeding WCAG AA standards.
- **Horizontal Scrollable Calendar**: Row format day strip positioned directly on top of the task creation section. Each card displays the date number on top and 3-letter day name underneath, with dedicated TODAY badge for the current day. Features wheel and touch horizontal scrolling, date selection synchronization with the quick-add date field, task dot indicators, and an interactive symbol-only Maximize toggle that opens a full month calendar grid.
- **Phone Header Streamlining**: On mobile phone screens (< 768px), the top header removes the hamburger menu, search bar, and sign out button, displaying the clean application brand "TaskCore" with logo on the left and theme toggle on the right.
- **Top Calendar & Metrics Alignment**: For all screen formats, the calendar strip occupies the top-most position in the workspace card, followed by the active, completed, due today, and overdue metrics strip, followed by the quick task capture box.
- **Single Row Symbol Status Bar**: Replaced 2x2/4x1 grid metric cards with a single horizontal flex row displaying exclusively vector symbols and numbers (Active, Completed, Due Today, Overdue). Fits neatly on all viewports without line breaks.
- **Modal-Based Task Creation Flow**: Removed the inline quick add task input from the main task workspace page to produce a clean, distraction-free agenda feed. Replaced with a crisp "+ Add Task" button in the desktop toolbar and the existing center FAB button on mobile bottom navigation. The task modal (`#taskModal`) handles both new task creation and existing task editing seamlessly.
- **Streamlined Toolbar & Single-Line Mobile Layout**: Removed the Clear Completed button across all screens for a cleaner interface. On mobile screens (< 768px), aligned the All Tasks heading and the sorting dropdown in a single horizontal row (`space-between`, no wrapping) for maximum vertical efficiency.
- **Unboxed Canvas Workspace**: Removed the outer background container (`.workspace-card` background and border) from the task page across all screen sizes, allowing calendar, metrics, toolbar, and task cards to sit cleanly directly on the app canvas without box-in-box nesting.
- **Robust Theme Persistence Across Reloads**: Integrated early inline script in document head, dedicated `applyTheme()` engine in `scripts/app.js`, and bidirectional synchronization between `localStorage` (`task_core_theme`) and store settings to eliminate flash of unstyled content and guarantee light/dark mode persistence upon browser refresh.
- **Motionless Calendar Refresh**: Removed delayed programmatic `scrollStripToDate` during app boot and removed `scroll-behavior: smooth` from CSS. The calendar strip begins cleanly with Today at index 0, eliminating any distracting sliding or auto-scrolling on page refresh.
- **Streamlined Profile Canvas**: Removed the outer background card container (`.profile-card` background, border, and padding) from the profile page across all screen sizes, providing a unified canvas appearance. The profile top banner displays only the user handle (`@username`) without appending the email address beside it. Removed the Sign Out button and Return to Tasks button from the profile page header for an uncluttered interface.
- **Ad-Free Forever Banner & Direct Pencil Edit**: Added a top banner (`.ad-free-banner`) highlighting the app's lifetime ad-free and privacy promise with live micro-animations (shield breathing pulse, shimmer sweep, and emerald status dot). Positioned the profile picture and user info section directly underneath. Removed the static "Account Credentials" preview card and "Want to modify your account?" card, replacing them with a sleek pencil icon button (`#btnEditProfile`) aligned with the profile section that toggles the modification form directly.
- **Customization Accordion & App-Wide Color Theming**: Renamed "Taskbar Customization (Colors & Shapes)" to "Customization", presented as an accordion card that is collapsed by default. Clicking the header smoothly expands/collapses the options with a rotating chevron. Extended color selection from just the mobile taskbar to the entire application using global CSS `data-accent` tokens, synchronizing primary buttons, active calendar cards, focus states, and borders across the entire app.
- **Taskbar Today Replaced with Habits Tracker**: Removed the redundant "Today" button from the mobile taskbar and introduced a dedicated "Habits" button in its place (navigating to `#habitsView`). Features full daily habit tracking, streak counters, 7-day completion bubbles, one-click check-ins, and habit creation/editing modals with complete local-first persistence per user.
- **Taskbar Lists Replaced with Projects Tracker**: Removed the "Lists" button from the mobile taskbar and introduced a dedicated "Projects" button in its place (navigating to `#projectsView`). Features project milestone management, category alignment, live task progress tracking, customizable accent colors, deadline indicators, and full CRUD support across desktop and mobile.
- **Donate & Patron Tiers for Ad-Free Development**: Replaced subscription model with a community Patron & Donation tier system supporting 1 Month (₹29), 3 Months (₹89), 6 Months (₹159), and 1 Year (₹300). Allows patrons to support future ad-free development while unlocking unrestricted access to all features.
- **Productivity Widgets Integration**: Added dedicated Productivity Widgets section directly on the profile view containing a Pomodoro Focus Sprint Timer (25m/15m/5m presets), Daily Focus Mindset quote rotator, and an auto-saving Quick Thought Scratchpad.
- **Direct Feedback and Suggestions Section**: Added a feedback module at the bottom of the profile page with category selection, 1 to 5 star rating buttons, suggestion notes, and persistent submission history.

## 4. Current Status
- Documentation files complete: prd.md, arctiture.md, rules.md, design.md, tasks.md, memory.md.
- Application implementation complete: index.html, styles/main.css, scripts/auth.js, scripts/app.js, scripts/store.js, scripts/icons.js, assets/favicon.svg.
- Mandatory authentication system active: user registration, sign in, logout, and multi-user data isolation.
- Mobile profile and taskbar customization active: 5 solid color themes, 3 rectangular shape styles, subscription plans, device revocation, app version display, and direct legal links.
- Uniform rounded corners geometry active on every page and modal container across desktop and mobile.
- Custom 4-color palette active and fully integrated across dark and light modes.
- Horizontal scrollable row calendar with maximize and minimize options active.
- Phone screen header streamlined with app title TaskCore.
- Calendar positioned above the metrics strip across all viewports.
- Status indicators displayed in single row with symbols and numbers only.
- Inline add task field removed from task page; modal-based creation active via toolbar button, mobile FAB, and keyboard shortcut (N).
- Clear Completed button removed across all screens.
- Mobile toolbar header ("All Tasks") and sorting box aligned in a single line.
- Background container removed from task page for both desktop and mobile screens.
- Theme persistence on browser refresh fully resolved and verified.
- Calendar auto-scroll on refresh eliminated; Today displays immediately at index 0.
- Profile page streamlined: outer background container removed, email hidden beside username, Sign Out and Return to Tasks buttons removed.
- Animated Ad-Free Forever banner active at top of profile page; profile section aligned under banner with direct pencil edit button.
- Customization accordion active: collapsed by default, click to expand; controls entire app's accent color theme and taskbar shape.
- Calendar current date highlight active: removed dot (.) icon from current date, highlighting it cleanly with a prominent 2px solid border while retaining task dots on other scheduled dates.
- Taskbar Today button replaced with Habits tracker: complete daily habit check-in, streak momentum, 7-day strip, and habit modal active.
- Taskbar Lists button replaced with Projects tracker: project dashboard, progress tracking, category filtering, and modal active.
- Donate 4-tier patronage system active: ₹29 (1m), ₹89 (3m), ₹159 (6m), and ₹299 (1y) in Indian Rupees to support future ad-free development and full app features.
- Productivity Widgets section active on profile page: Focus Sprint Timer, Daily Focus Mindset quote rotator, and Quick Scratchpad.
- Feedback & Suggestions section active at the bottom of profile page with category tagging, 5-star ratings with star glyphs, and persistent submission history.
- Premium UI Polish active: Google Fonts Inter typography loaded with advanced font feature settings, custom 6px scrollbars, multi-tier elevation shadows, tactile button active presses, smooth focus halos, and strict 4px-6px radii across all cards and modals.
- Mobile side-by-side horizontal scroll for donate cards active: replaced vertical 1-column mobile list with swipeable scroll-snap row layout and visual scroll hint.
- All anti-slop constraints audited and passing with zero violations.
- Application active and running at http://localhost:5050.





