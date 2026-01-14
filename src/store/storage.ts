import type { StorageSchema, Goal, ProgressEntry, Achievement, Settings } from '@/types';
import { DEFAULT_SETTINGS, ACHIEVEMENT_DEFINITIONS } from '@/types';

const STORAGE_KEY = 'habit-forge-data';
const CURRENT_VERSION = 1;

// Migration functions for future schema changes
type Migration = (data: unknown) => StorageSchema;

const migrations: Record<number, Migration> = {
  // Example: migrate from version 0 to 1
  // 1: (data) => ({ ...data, newField: 'default' }),
};

function getDefaultSchema(): StorageSchema {
  return {
    version: CURRENT_VERSION,
    goals: [],
    progress: [],
    achievements: ACHIEVEMENT_DEFINITIONS.map((a) => ({ ...a })),
    settings: { ...DEFAULT_SETTINGS },
  };
}

function migrateData(data: unknown): StorageSchema {
  if (typeof data !== 'object' || data === null) {
    return getDefaultSchema();
  }

  const parsed = data as Partial<StorageSchema>;
  let version = parsed.version ?? 0;

  // Apply migrations sequentially
  let migrated = data;
  while (version < CURRENT_VERSION) {
    const migration = migrations[version + 1];
    if (migration) {
      migrated = migration(migrated);
    }
    version++;
  }

  // Ensure all required fields exist
  const schema = migrated as Partial<StorageSchema>;
  return {
    version: CURRENT_VERSION,
    goals: schema.goals ?? [],
    progress: schema.progress ?? [],
    achievements: schema.achievements ?? ACHIEVEMENT_DEFINITIONS.map((a) => ({ ...a })),
    settings: { ...DEFAULT_SETTINGS, ...schema.settings },
  };
}

export function loadStorage(): StorageSchema {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return getDefaultSchema();
    }
    const parsed: unknown = JSON.parse(raw);
    return migrateData(parsed);
  } catch {
    console.error('Failed to load storage, using defaults');
    return getDefaultSchema();
  }
}

export function saveStorage(data: StorageSchema): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save storage:', error);
  }
}

// Goal operations
export function addGoal(storage: StorageSchema, goal: Goal): StorageSchema {
  return {
    ...storage,
    goals: [...storage.goals, goal],
  };
}

export function updateGoal(
  storage: StorageSchema,
  goalId: string,
  updates: Partial<Goal>
): StorageSchema {
  return {
    ...storage,
    goals: storage.goals.map((g) => (g.id === goalId ? { ...g, ...updates } : g)),
  };
}

export function deleteGoal(storage: StorageSchema, goalId: string): StorageSchema {
  return {
    ...storage,
    goals: storage.goals.filter((g) => g.id !== goalId),
    progress: storage.progress.filter((p) => p.goalId !== goalId),
  };
}

export function archiveGoal(storage: StorageSchema, goalId: string): StorageSchema {
  return updateGoal(storage, goalId, { archived: true });
}

// Progress operations
export function addProgress(storage: StorageSchema, entry: ProgressEntry): StorageSchema {
  // Check if there's already an entry for this goal and date
  const existingIndex = storage.progress.findIndex(
    (p) => p.goalId === entry.goalId && p.date === entry.date
  );

  if (existingIndex >= 0) {
    // Update existing entry
    const newProgress = [...storage.progress];
    const existing = newProgress[existingIndex];
    if (existing) {
      newProgress[existingIndex] = { ...existing, value: existing.value + entry.value };
    }
    return { ...storage, progress: newProgress };
  }

  return {
    ...storage,
    progress: [...storage.progress, entry],
  };
}

export function setProgress(
  storage: StorageSchema,
  goalId: string,
  date: string,
  value: number
): StorageSchema {
  const existingIndex = storage.progress.findIndex((p) => p.goalId === goalId && p.date === date);

  if (existingIndex >= 0) {
    const newProgress = [...storage.progress];
    const existing = newProgress[existingIndex];
    if (existing) {
      newProgress[existingIndex] = { ...existing, value };
    }
    return { ...storage, progress: newProgress };
  }

  const newEntry: ProgressEntry = {
    id: crypto.randomUUID(),
    goalId,
    date,
    value,
    createdAt: new Date().toISOString(),
  };

  return {
    ...storage,
    progress: [...storage.progress, newEntry],
  };
}

// Achievement operations
export function unlockAchievement(
  storage: StorageSchema,
  achievementId: Achievement['id']
): StorageSchema {
  return {
    ...storage,
    achievements: storage.achievements.map((a) =>
      a.id === achievementId && !a.unlockedAt ? { ...a, unlockedAt: new Date().toISOString() } : a
    ),
  };
}

// Settings operations
export function updateSettings(storage: StorageSchema, settings: Partial<Settings>): StorageSchema {
  return {
    ...storage,
    settings: { ...storage.settings, ...settings },
  };
}

// Query helpers
export function getGoalProgress(
  storage: StorageSchema,
  goalId: string,
  startDate: string,
  endDate: string
): ProgressEntry[] {
  return storage.progress.filter(
    (p) => p.goalId === goalId && p.date >= startDate && p.date <= endDate
  );
}

export function getProgressForDate(storage: StorageSchema, goalId: string, date: string): number {
  const entry = storage.progress.find((p) => p.goalId === goalId && p.date === date);
  return entry?.value ?? 0;
}
