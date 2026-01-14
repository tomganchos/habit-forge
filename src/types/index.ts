// Goal types
export type GoalUnit = 'count' | 'time';
export type GoalPeriod = 'day' | 'week' | 'month';
export type DurationType = 'forever' | 'end_date' | 'n_periods';

export interface GoalDuration {
  type: DurationType;
  endDate?: string; // ISO date string
  periods?: number;
}

export interface Goal {
  id: string;
  title: string;
  icon: string;
  unit: GoalUnit;
  period: GoalPeriod;
  target: number;
  duration: GoalDuration;
  createdAt: string; // ISO date string
  archived: boolean;
}

// Progress tracking
export interface ProgressEntry {
  id: string;
  goalId: string;
  date: string; // ISO date string (YYYY-MM-DD)
  value: number;
  createdAt: string; // ISO timestamp
}

// Achievements
export type AchievementType =
  | 'first_goal'
  | 'first_completion'
  | 'streak_3'
  | 'streak_7'
  | 'streak_30'
  | 'perfect_week'
  | 'overachiever';

export interface Achievement {
  id: AchievementType;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string; // ISO timestamp
}

// Language
export type Language = 'en' | 'ru' | 'fr' | 'it' | 'ee' | 'es';

// Settings
export interface Settings {
  notificationsEnabled: boolean;
  reminderTime: string; // HH:MM format
  theme: 'light' | 'dark' | 'system';
  language: Language;
}

// Calendar status
export type CalendarStatus = 'none' | 'red' | 'yellow' | 'green' | 'special';

export interface DayStatus {
  date: string;
  status: CalendarStatus;
  percentage: number;
}

// Storage schema
export interface StorageSchema {
  version: number;
  goals: Goal[];
  progress: ProgressEntry[];
  achievements: Achievement[];
  settings: Settings;
}

// Default values
export const DEFAULT_SETTINGS: Settings = {
  notificationsEnabled: false,
  reminderTime: '09:00',
  theme: 'system',
  language: 'en',
};

export const ACHIEVEMENT_DEFINITIONS: Omit<Achievement, 'unlockedAt'>[] = [
  {
    id: 'first_goal',
    title: 'Getting Started',
    description: 'Created your first goal',
    icon: '🎯',
  },
  {
    id: 'first_completion',
    title: 'First Victory',
    description: 'Completed a goal for the first time',
    icon: '🏆',
  },
  {
    id: 'streak_3',
    title: 'On a Roll',
    description: 'Maintained a 3-day streak',
    icon: '🔥',
  },
  {
    id: 'streak_7',
    title: 'Week Warrior',
    description: 'Maintained a 7-day streak',
    icon: '⚡',
  },
  {
    id: 'streak_30',
    title: 'Habit Master',
    description: 'Maintained a 30-day streak',
    icon: '👑',
  },
  {
    id: 'perfect_week',
    title: 'Perfect Week',
    description: 'Hit 100% on all goals for a week',
    icon: '✨',
  },
  {
    id: 'overachiever',
    title: 'Overachiever',
    description: 'Reached 200% on any goal',
    icon: '🚀',
  },
];

// Utility type for creating new goals
export type NewGoal = Omit<Goal, 'id' | 'createdAt' | 'archived'>;
