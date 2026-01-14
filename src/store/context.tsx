import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { StorageSchema, Goal, Settings, NewGoal, AchievementType } from '@/types';
import {
  loadStorage,
  saveStorage,
  addGoal as addGoalToStorage,
  updateGoal as updateGoalInStorage,
  deleteGoal as deleteGoalFromStorage,
  archiveGoal as archiveGoalInStorage,
  setProgress as setProgressInStorage,
  updateSettings as updateSettingsInStorage,
  unlockAchievement as unlockAchievementInStorage,
} from './storage';
import { generateId } from '@/utils/id';
import { getToday } from '@/utils/date';
import { checkAchievements } from '@/utils/progress';

// Action types
type Action =
  | { type: 'LOAD'; payload: StorageSchema }
  | { type: 'ADD_GOAL'; payload: NewGoal }
  | { type: 'UPDATE_GOAL'; payload: { id: string; updates: Partial<Goal> } }
  | { type: 'DELETE_GOAL'; payload: string }
  | { type: 'ARCHIVE_GOAL'; payload: string }
  | { type: 'SET_PROGRESS'; payload: { goalId: string; date: string; value: number } }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<Settings> }
  | { type: 'UNLOCK_ACHIEVEMENT'; payload: AchievementType }
  | { type: 'CHECK_ACHIEVEMENTS' };

// Reducer
function reducer(state: StorageSchema, action: Action): StorageSchema {
  switch (action.type) {
    case 'LOAD':
      return action.payload;

    case 'ADD_GOAL': {
      const newGoal: Goal = {
        ...action.payload,
        id: generateId(),
        createdAt: new Date().toISOString(),
        archived: false,
      };
      return addGoalToStorage(state, newGoal);
    }

    case 'UPDATE_GOAL':
      return updateGoalInStorage(state, action.payload.id, action.payload.updates);

    case 'DELETE_GOAL':
      return deleteGoalFromStorage(state, action.payload);

    case 'ARCHIVE_GOAL':
      return archiveGoalInStorage(state, action.payload);

    case 'SET_PROGRESS':
      return setProgressInStorage(
        state,
        action.payload.goalId,
        action.payload.date,
        action.payload.value
      );

    case 'UPDATE_SETTINGS':
      return updateSettingsInStorage(state, action.payload);

    case 'UNLOCK_ACHIEVEMENT':
      return unlockAchievementInStorage(state, action.payload);

    case 'CHECK_ACHIEVEMENTS': {
      const newAchievements = checkAchievements(state);
      let newState = state;
      for (const achievement of newAchievements) {
        newState = unlockAchievementInStorage(newState, achievement);
      }
      return newState;
    }

    default:
      return state;
  }
}

// Context type
interface AppContextType {
  state: StorageSchema;
  addGoal: (goal: NewGoal) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  archiveGoal: (id: string) => void;
  setProgress: (goalId: string, date: string, value: number) => void;
  updateSettings: (settings: Partial<Settings>) => void;
  today: string;
  newlyUnlockedAchievements: AchievementType[];
  clearNewAchievements: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

// Provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, null, loadStorage);
  const [newlyUnlocked, setNewlyUnlocked] = useReducer(
    (
      prev: AchievementType[],
      action: { type: 'add'; achievements: AchievementType[] } | { type: 'clear' }
    ) => {
      if (action.type === 'add') {
        return [...prev, ...action.achievements];
      }
      return [];
    },
    []
  );

  // Save to localStorage on state change
  useEffect(() => {
    saveStorage(state);
  }, [state]);

  // Check for achievements after state changes
  useEffect(() => {
    const newAchievements = checkAchievements(state);
    if (newAchievements.length > 0) {
      // Filter to only truly new ones
      const alreadyUnlocked = state.achievements.filter((a) => a.unlockedAt).map((a) => a.id);
      const trulyNew = newAchievements.filter((a) => !alreadyUnlocked.includes(a));

      if (trulyNew.length > 0) {
        dispatch({ type: 'CHECK_ACHIEVEMENTS' });
        setNewlyUnlocked({ type: 'add', achievements: trulyNew });
      }
    }
  }, [state.goals.length, state.progress.length, state]);

  const value: AppContextType = {
    state,
    addGoal: (goal) => dispatch({ type: 'ADD_GOAL', payload: goal }),
    updateGoal: (id, updates) => dispatch({ type: 'UPDATE_GOAL', payload: { id, updates } }),
    deleteGoal: (id) => dispatch({ type: 'DELETE_GOAL', payload: id }),
    archiveGoal: (id) => dispatch({ type: 'ARCHIVE_GOAL', payload: id }),
    setProgress: (goalId, date, value) =>
      dispatch({ type: 'SET_PROGRESS', payload: { goalId, date, value } }),
    updateSettings: (settings) => dispatch({ type: 'UPDATE_SETTINGS', payload: settings }),
    today: getToday(),
    newlyUnlockedAchievements: newlyUnlocked,
    clearNewAchievements: () => setNewlyUnlocked({ type: 'clear' }),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Hook to use the context
export function useApp(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
