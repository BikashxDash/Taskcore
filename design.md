# Design System & UI Specification (design.md)

## 1. Design Philosophy
The interface prioritizes utility, readability, and immediate responsiveness. It avoids decorative fluff, neon glows, purple gradients, and novelty widgets in favor of crisp typography, structural borders, and purposeful contrast.

## 2. Color System
The application utilizes a curated 4-color palette extracted directly from user specification:
1. `#D8A2A2`: Dusty Rose (Brand Primary accent, active states, key interactive controls)
2. `#FFDCDC`: Soft Rose Blush (Elevated cards, light surfaces, tags, secondary accent)
3. `#FFF9D6`: Vanilla Butter Cream (Primary typography in dark mode, clean base canvas in light mode)
4. `#8EA66B`: Meadow Moss (Structural borders, success indicators, category tags, secondary iconography)

### 2.1 Dark Mode Palette (Default)
- **Background Base**: `#181213` (Deep velvet charcoal)
- **Background Surface**: `#241a1c` (Deep rose-charcoal surface)
- **Background Elevated**: `#302325` (Elevated rose-tinted panels)
- **Border Subtle**: `#302325`
- **Border Default**: `#4f3b3e`
- **Border Strong**: `#8ea66b` (Meadow moss)
- **Text Primary**: `#fff9d6` (Vanilla butter cream)
- **Text Secondary**: `#ffdcdc` (Soft rose blush)
- **Text Muted**: `#a69496` (Muted rose ash)

### 2.2 Functional Accent Colors
- **Brand Primary**: `#d8a2a2` (Dusty rose)
- **Brand Primary Hover**: `#c58f8f`
- **Success / Completed**: `#8ea66b` (Meadow moss)
- **Warning / Urgent**: `#d97706` (Solid amber)
- **Danger / Delete**: `#b91c1c` (Solid crimson)
- **Information / Tag**: `#8ea66b` (Meadow moss)

### 2.3 Strict Color Constraints
- **Zero purple gradients**: No linear gradients transitioning between indigo, violet, and purple.
- **Solid background surfaces**: Clean solid colors with 1px border lines rather than blurry glassmorphism.

## 3. Typography Hierarchy
- **Font Stack**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`
- **App Title**: 20px / 1.25rem, Semi-Bold (600), tracking -0.01em
- **Section Heading**: 15px / 0.9375rem, Medium (500), uppercase with slight letter spacing
- **Task Title**: 15px / 0.9375rem, Regular (400) / Medium (500)
- **Body & Notes**: 14px / 0.875rem, Regular (400)
- **Metadata & Badges**: 12px / 0.75rem, Medium (500)
- **Punctuation Policy**: Strict ban on the em dash character ("-"). Use hyphens ("-") or parentheses.

## 4. Component Specifications

### 4.1 Buttons
- **Shape**: Rectangular with subtle corner radius: `border-radius: 6px`.
- **Pill Shape Ban**: Never use `border-radius: 9999px` or pill ovals.
- **Sizes**:
  - Small: Height 32px, padding 0 10px, font-size 12px
  - Medium: Height 38px, padding 0 14px, font-size 14px
  - Large: Height 44px, padding 0 18px, font-size 15px
- **Variants**:
  - Primary: Background `#d8a2a2`, text `#181213` (font-weight 600 for WCAG AA contrast), border 1px solid `#c58f8f`
  - Secondary: Background `#302325`, text `#fff9d6`, border 1px solid `#4f3b3e`
  - Danger: Background `#b91c1c`, text `#fff9d6`, border 1px solid `#991b1b`
  - Ghost: Background transparent, text `#a69496`, border 1px solid transparent

### 4.2 Form Inputs and Selects
- Height: 38px (Desktop), 44px (Mobile touch target)
- Border radius: `6px`
- Background: `#181213`
- Border: 1px solid `#4f3b3e`
- Focus State: 2px solid `#d8a2a2` with zero outline blur

### 4.3 Task Cards & Items
- Border radius: `10px` (`--radius-lg`)
- Border: 1px solid `#4f3b3e`
- Background: `#241a1c`
- Hover state: Border color changes to `#8ea66b`
- Active state: Subtle elevation with 0 2px 4px rgba(0,0,0,0.2)

### 4.4 Iconography
- All icons rendered as inline SVG vectors.
- Dimension: 16px by 16px (standard) or 20px by 20px (touch buttons).
- Stroke width: 1.75px.
- Zero emojis in all interfaces.

### 4.5 Modals and Drawers
- Desktop: Centered dialog box, max-width 580px, border-radius 14px (`--radius-xl`), 1px solid `#4f3b3e`.
- Mobile: Bottom sheet sliding from bottom edge, border-radius 14px 14px 0 0, 100% viewport width.

### 4.6 Page Containers & Card Layout
- Every page (Tasks, Profile, Privacy Policy, Terms of Service, and Auth) is enclosed within a dedicated container card.
- Container border radius: `14px` (`--radius-xl`) with 1px solid neutral border.
- Mobile phones (< 768px): Page containers maintain 12px outer horizontal margins so rounded corner geometry is visible and never clipped flat against display bezels.

### 4.7 Calendar Strip & Maximize Component
- **Placement**: Sits at the very top of the workspace card, directly above the task statistics metrics strip.
- **Row Format**: Horizontally scrollable strip displaying date number on top and 3-letter day name underneath.
- **Current Day Highlighting**: Distinguishes today with a dedicated TODAY pill badge and green border (`--border-strong: #8ea66b`).
- **Selected Day**: Highlighted with Dusty Rose (`#d8a2a2`) and inverse dark text for WCAG AA readability.
- **Maximize View**: Expands into a full monthly calendar grid with 7 weekday headers, previous/next month navigation, and minimize toggle.
- **Input Synchronization**: Selecting any date updates the quick-add task date picker instantly.

### 4.8 Task Status Indicators Bar
- **Layout**: Single horizontal row without grid formatting across all viewport sizes (desktop and mobile).
- **Format**: Strictly vector symbol plus numeric count (zero word labels).
- **Status Elements**:
  - Active Tasks: Tasks icon with Dusty Rose (`#d8a2a2`) accent.
  - Completed: Checkmark icon with Meadow Moss (`#8ea66b`) accent.
  - Due Today: Clock icon with Soft Blush (`#ffdcdc`) accent.
  - Overdue: Alert circle icon with Crimson warning (`#ef4444`) accent.

## 5. Responsive Layout Strategy
- **Mobile (< 768px)**:
  - Top header with search bar and filter trigger.
  - Scrollable task feed with touch tap actions.
  - Fixed bottom navigation bar with 5 primary tabs: Tasks, Today, Add, Categories, Profile.
- **Desktop (>= 768px)**:
  - Fixed left sidebar (width 270px) containing navigation, categories, and legal page links.
  - Central work area with fast inline task capture bar.
  - Modal drawer for detailed task inspection and editing.
