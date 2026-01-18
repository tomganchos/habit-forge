# Components Reference

## Layout Components

### Layout (`src/components/Layout/`)
Main app shell with header and navigation.

```tsx
<Layout>
  <ScreenContent />
</Layout>
```

**Props:** `children: ReactNode`

### Navigation (`src/components/Navigation/`)
Bottom tab bar with 4 navigation items.

| Tab | Icon | Route | Screen |
|-----|------|-------|--------|
| Today | Home | `/` | TodayScreen |
| Calendar | Calendar | `/calendar` | CalendarScreen |
| Trophies | Trophy | `/trophies` | AchievementsScreen |
| Settings | Cog | `/settings` | SettingsScreen |

## Goal Components

### GoalCard (`src/components/GoalCard/`)
Displays a single goal with progress and controls.

**Props:**
```typescript
interface GoalCardProps {
  goal: Goal;
  progress: number;
  onAddProgress: (amount: number) => void;
  onEdit: () => void;
}
```

**Features:**
- Icon and title display
- Progress bar with percentage
- Smart increment/decrement buttons
- Edit button (opens GoalForm)
- Color-coded progress status

### GoalForm (`src/components/GoalForm/`)
Modal form for creating/editing goals.

**Props:**
```typescript
interface GoalFormProps {
  goal?: Goal;           // Existing goal for edit mode
  onSave: (goal: NewGoal) => void;
  onDelete?: () => void; // Only in edit mode
  onCancel: () => void;
}
```

**Form Fields:**
- Icon selector (emoji grid)
- Title input
- Unit dropdown (count/time)
- Period dropdown (day/week/month)
- Target input
- Duration dropdown + conditional fields

## Calendar Components

### Calendar (`src/components/Calendar/`)
Monthly calendar grid with status-colored days.

**Props:**
```typescript
interface CalendarProps {
  year: number;
  month: number;         // 0-indexed
  goalId: string;
  progressRecords: ProgressRecord[];
  target: number;
  onDayClick: (date: string) => void;
}
```

**Features:**
- Day grid with week headers
- Status color coding
- Click handler for day selection
- Current day highlight

## UI Components

### Button (`src/components/Button/`)
Reusable button component with variants.

**Props:**
```typescript
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}
```

**Variants:**
| Variant | Background | Use Case |
|---------|------------|----------|
| primary | Purple | Main actions |
| secondary | Gray | Cancel, back |
| danger | Red | Delete actions |

### AchievementCelebration (`src/components/AchievementCelebration/`)
Full-screen celebration overlay with confetti.

**Props:**
```typescript
interface AchievementCelebrationProps {
  achievement: AchievementDefinition;
  onClose: () => void;
}
```

## Screen Components

### TodayScreen (`src/screens/TodayScreen/`)
Main dashboard showing all goals with today's progress.

**Features:**
- Goal list with GoalCards
- "Add Goal" button
- Empty state for new users
- GoalForm modal

### CalendarScreen (`src/screens/CalendarScreen/`)
Calendar view for historical progress.

**Features:**
- Goal selector tabs
- Monthly calendar grid
- Month navigation arrows
- Day detail modal for editing

### AchievementsScreen (`src/screens/AchievementsScreen/`)
Trophy gallery showing all achievements.

**Features:**
- Grid of achievement cards
- Locked/unlocked states
- Unlock date display

### SettingsScreen (`src/screens/SettingsScreen/`)
App settings and preferences.

**Features:**
- Language selector dropdown
- Extensible for future settings

## Component File Structure

Each component follows this structure:

```
ComponentName/
├── ComponentName.tsx       # Main component
├── ComponentName.module.css # Scoped styles
└── index.ts                # Re-export
```

## Styling Patterns

### CSS Variables Usage
```css
.component {
  background: var(--color-bg);
  color: var(--color-text);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}
```

### Responsive Patterns
```css
/* Mobile-first approach */
.grid {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

### Dark Mode Handling
Dark mode is automatic via CSS variables that change based on `prefers-color-scheme`.
