# Architecture

## Overview

Habit Forge follows a simple, maintainable architecture optimized for a client-side PWA with local storage persistence.

```
┌─────────────────────────────────────────────────────────┐
│                        App.tsx                          │
│                    (Route handling)                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │
│  │   Screens   │  │  Components │  │     Hooks       │ │
│  │             │  │             │  │                 │ │
│  │ • Today     │  │ • GoalCard  │  │ • useGoals      │ │
│  │ • Calendar  │  │ • GoalForm  │  │ • useAchieve-   │ │
│  │ • Trophies  │  │ • Calendar  │  │   ments         │ │
│  │ • Settings  │  │ • Button    │  │                 │ │
│  └─────────────┘  └─────────────┘  └─────────────────┘ │
│                          │                              │
├──────────────────────────┼──────────────────────────────┤
│                          ▼                              │
│  ┌──────────────────────────────────────────────────┐  │
│  │                   Store Context                   │  │
│  │         (AppProvider + useApp hook)               │  │
│  └──────────────────────────────────────────────────┘  │
│                          │                              │
│                          ▼                              │
│  ┌──────────────────────────────────────────────────┐  │
│  │                  localStorage                     │  │
│  │    (Goals, Progress, Achievements, Settings)      │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## State Management

### AppContext (`src/store/context.tsx`)

Central state management using React Context. Manages:
- **Goals**: User-defined habits with targets
- **Progress**: Daily progress records per goal
- **Achievements**: Unlocked achievements
- **Settings**: User preferences (language)

```typescript
interface AppState {
  goals: Goal[];
  progress: Record<string, ProgressRecord[]>;
  achievements: Achievement[];
  settings: Settings;
}
```

### Storage (`src/store/storage.ts`)

Handles localStorage persistence with JSON serialization:
- `habit-forge-goals` - Goal definitions
- `habit-forge-progress` - Progress records
- `habit-forge-achievements` - Unlocked achievements
- `habit-forge-settings` - User settings

## Data Models

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
}
```

### Progress Record
```typescript
interface ProgressRecord {
  date: string;      // YYYY-MM-DD format
  value: number;     // Current progress value
}
```

### Achievement
```typescript
interface Achievement {
  id: string;
  unlockedAt: string;
}
```

## Routing

Simple hash-based routing handled in `App.tsx`:

| Route | Screen | Description |
|-------|--------|-------------|
| `/` | TodayScreen | Main dashboard |
| `/calendar` | CalendarScreen | Calendar view |
| `/trophies` | AchievementsScreen | Achievement gallery |
| `/settings` | SettingsScreen | App settings |

## Styling

- **CSS Modules**: Component-scoped styles (`.module.css`)
- **CSS Variables**: Design tokens in `src/index.css`
- **Dark Mode**: Automatic via `prefers-color-scheme`
- **iOS Safe Areas**: `env(safe-area-inset-*)` support

## PWA Architecture

```
┌─────────────────────────────────────────┐
│              Browser                     │
├─────────────────────────────────────────┤
│  ┌─────────────────────────────────┐    │
│  │         React App               │    │
│  └─────────────────────────────────┘    │
│                  │                       │
│                  ▼                       │
│  ┌─────────────────────────────────┐    │
│  │       Service Worker            │    │
│  │   (Workbox - generateSW)        │    │
│  └─────────────────────────────────┘    │
│                  │                       │
│                  ▼                       │
│  ┌─────────────────────────────────┐    │
│  │         Cache Storage           │    │
│  │  • App shell (HTML, JS, CSS)    │    │
│  │  • Static assets (icons, fonts) │    │
│  │  • Google Fonts                 │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

## Testing Strategy

### Unit Tests (Vitest)
- Utility functions (`src/utils/*.test.ts`)
- Run with: `npm test`

### E2E Tests (Playwright)
- User flows across all screens
- Cross-browser: Chromium, Firefox, WebKit, Mobile Chrome
- Run with: `npm run test:e2e`

## Build Pipeline

```
Source → Vite Build → PWA Plugin → Dist
                          │
                          ├── index.html
                          ├── assets/
                          ├── sw.js (Service Worker)
                          ├── workbox-*.js
                          └── manifest.webmanifest
```
