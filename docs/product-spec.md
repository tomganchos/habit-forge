# Product Specification: Habit Forge

## Vision

Habit Forge is a simple, effective habit tracking app that helps users build better routines through consistent daily tracking and positive reinforcement.

## Target Users

- People wanting to build new habits
- Users who prefer local-first, privacy-focused apps
- Anyone looking for a simple habit tracker without account requirements

## Core Features

### 1. Goal Management

Users can create and manage goals (habits) they want to track.

**Goal Properties:**
- **Title**: Name of the habit (e.g., "Exercise", "Read", "Meditate")
- **Icon**: Visual identifier from a preset list
- **Unit**: How progress is measured
  - Count (times/occurrences)
  - Time (minutes)
- **Period**: Tracking frequency
  - Daily
  - Weekly
  - Monthly
- **Target**: Numeric goal per period
- **Duration**: How long to track
  - Forever (ongoing)
  - Until specific date
  - For N periods

**Actions:**
- Create new goal
- Edit existing goal
- Delete goal (with confirmation)
- Archive goal (hide from active list)

### 2. Progress Tracking

Users log progress toward their goals.

**Features:**
- Quick-add buttons for common increments
  - Count: +1
  - Time: +15 min, +1 hour
- Manual entry for specific values
- Edit progress for any past day (via calendar)
- Progress shown as current/target with percentage

**Calculations:**
- Period progress: Sum of entries within current period
- Completion percentage: (current / target) × 100
- "Catch-up" amount: Difference between expected and actual progress (shown with neutral wording)

### 3. Calendar View

Monthly visualization of progress history.

**Status Colors:**
- None (gray): No progress
- Red: Less than 50% of target
- Yellow: 50-99% of target
- Green: 100-199% of target
- Special (purple): 200%+ of target (overachievement)

**Features:**
- Navigate between months
- Click day to edit progress
- Current day highlighted
- Legend showing color meanings

### 4. Achievements

Gamification through unlockable achievements.

**Achievement Types:**
- First Goal: Created first goal
- First Victory: Completed a goal for the first time
- Streak achievements: 3-day, 7-day, 30-day streaks
- Perfect Week: 100% on all goals for a week
- Overachiever: Reached 200% on any goal

**Celebration:**
- Animation on unlock
- Confetti effect
- Achievement card display

### 5. Settings

Configuration and data management.

**Features:**
- Notification permission request
- Reminder time setting
- Data export (JSON)
- App info

## Data Model

### Goal
```typescript
interface Goal {
  id: string;
  title: string;
  icon: string;
  unit: 'count' | 'time';
  period: 'day' | 'week' | 'month';
  target: number;
  duration: GoalDuration;
  createdAt: string;
  archived: boolean;
}
```

### Progress Entry
```typescript
interface ProgressEntry {
  id: string;
  goalId: string;
  date: string; // YYYY-MM-DD
  value: number;
  createdAt: string;
}
```

### Achievement
```typescript
interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}
```

## Storage

- All data stored in localStorage
- Typed schema with version number
- Migration support for schema changes
- Export functionality for backup

## Non-Goals (Out of Scope)

- User accounts / cloud sync
- Social features
- Mobile native app
- Multiple themes (beyond system dark/light)
- Habit templates
- Statistics/analytics beyond calendar view
