# UX/UI Specification: Habit Forge

## Design Principles

1. **Simplicity First**: Minimal interface, focused on core actions
2. **Mobile-First**: Designed for phone screens, scales up to desktop
3. **Immediate Feedback**: Every action has visible result
4. **Positive Reinforcement**: Celebrate success, frame challenges neutrally
5. **Accessibility**: WCAG 2.1 AA compliance target

## Color System

### Light Mode
```css
--color-primary: #6366f1;      /* Indigo - main brand color */
--color-primary-hover: #4f46e5;
--color-primary-light: #e0e7ff;

--color-success: #22c55e;      /* Green - positive */
--color-warning: #eab308;      /* Yellow - partial */
--color-danger: #ef4444;       /* Red - behind */
--color-special: #8b5cf6;      /* Purple - overachievement */

--color-bg: #ffffff;
--color-bg-secondary: #f9fafb;
--color-bg-tertiary: #f3f4f6;

--color-text: #111827;
--color-text-secondary: #6b7280;
```

### Dark Mode
Automatically inverts backgrounds and adjusts status colors for readability.

### Calendar Status Colors
- **None** (gray): No activity recorded
- **Red** (<50%): Behind schedule, needs attention
- **Yellow** (50-99%): In progress, almost there
- **Green** (100-199%): Goal met, well done!
- **Special/Purple** (≥200%): Exceptional performance

## Typography

- **Font Family**: System UI stack
- **Font Sizes**:
  - Title: 1.5rem (24px)
  - Heading: 1.125rem (18px)
  - Body: 1rem (16px)
  - Small: 0.875rem (14px)
  - Caption: 0.75rem (12px)

## Spacing

Based on 4px grid:
- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)

## Components

### Navigation

Bottom-style tab bar with 4 items:
1. Today (📋) - Default screen
2. Calendar (📅) - Progress history
3. Trophies (🏆) - Achievements
4. Settings (⚙️) - Configuration

**Behavior:**
- Active tab highlighted with primary color
- Tap to switch screens
- Icons + labels for clarity

### Goal Card

Displays on Today screen, one per goal.

**Elements:**
- Icon + title (tappable to edit)
- Status badge with percentage
- Progress bar (visual indicator)
- Progress text (current / target)
- Period label ("Today", "This week", "This month")
- Catch-up info (if behind, neutral wording)
- Quick-add buttons

**Interactions:**
- Tap card header → edit goal
- Tap quick-add → increment progress

### Goal Form

Modal overlay for creating/editing goals.

**Fields:**
- Icon selector (grid of emoji)
- Title input
- Unit dropdown (count/time)
- Period dropdown (day/week/month)
- Target number input
- Duration selector with conditional fields

**Actions:**
- Save button (primary)
- Cancel button (secondary)
- Delete button (danger, edit mode only)

### Calendar

Month grid showing progress history.

**Elements:**
- Month/year header with navigation
- Weekday labels (Mon-Sun)
- Day cells with status color
- Today highlighted with outline
- Legend showing color meanings

**Interactions:**
- Tap day → open progress edit modal
- Arrow buttons → change month
- Tap month/year → return to current month

### Achievement Celebration

Full-screen overlay on unlock.

**Elements:**
- Semi-transparent backdrop
- Confetti animation
- Achievement card (icon, title, description)
- Auto-dismiss after 3 seconds or tap

### Settings

List of configuration options.

**Sections:**
- Notifications
  - Enable/disable toggle
  - Time picker (when enabled)
- About
  - App name and version
- Data
  - Export button

## Responsive Behavior

### Mobile (< 640px)
- Single column layout
- Full-width components
- Bottom navigation prominent
- Compact calendar cells

### Tablet/Desktop (≥ 640px)
- Max content width 800px
- Larger touch targets
- Navigation tabs in row
- Calendar cells show percentage

## Animations

### Transitions
- Screen changes: instant (no animation)
- Modal open: scale up with fade (0.2s)
- Modal close: fade out (0.15s)
- Button hover: subtle background change

### Achievement Celebration
- Card: bounce-in animation (0.5s)
- Confetti: fall from top (2s)
- Auto-dismiss: fade out (0.3s)

## Accessibility

### Requirements
- All interactive elements keyboard accessible
- Focus visible indicators
- Color not sole indicator (icons/text supplement)
- Sufficient color contrast (4.5:1 minimum)
- Screen reader friendly labels
- Reduced motion support via media query

### ARIA
- Modals use `role="dialog"`
- Navigation uses `aria-current="page"`
- Progress bars use `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
