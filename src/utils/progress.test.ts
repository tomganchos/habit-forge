import { describe, it, expect } from 'vitest';
import {
  calculatePeriodProgress,
  calculatePercentage,
  getStatusFromPercentage,
  getDayStatus,
} from './progress';
import type { Goal, ProgressEntry } from '@/types';

const createGoal = (overrides: Partial<Goal> = {}): Goal => ({
  id: 'test-goal',
  title: 'Test Goal',
  icon: '💪',
  unit: 'count',
  period: 'day',
  target: 10,
  duration: { type: 'forever' },
  createdAt: '2024-01-01T00:00:00Z',
  archived: false,
  ...overrides,
});

const createProgress = (overrides: Partial<ProgressEntry> = {}): ProgressEntry => ({
  id: 'test-progress',
  goalId: 'test-goal',
  date: '2024-01-15',
  value: 5,
  createdAt: '2024-01-15T10:00:00Z',
  ...overrides,
});

describe('calculatePeriodProgress', () => {
  it('sums progress for the day', () => {
    const goal = createGoal({ period: 'day' });
    const progress: ProgressEntry[] = [
      createProgress({ date: '2024-01-15', value: 3 }),
      createProgress({ id: 'p2', date: '2024-01-15', value: 2 }),
    ];

    expect(calculatePeriodProgress(goal, progress, '2024-01-15')).toBe(5);
  });

  it('sums progress for the week', () => {
    const goal = createGoal({ period: 'week' });
    const progress: ProgressEntry[] = [
      createProgress({ date: '2024-01-15', value: 3 }), // Monday
      createProgress({ id: 'p2', date: '2024-01-17', value: 2 }), // Wednesday
      createProgress({ id: 'p3', date: '2024-01-22', value: 10 }), // Next week
    ];

    // Week of Jan 15-21
    expect(calculatePeriodProgress(goal, progress, '2024-01-15')).toBe(5);
  });

  it('excludes progress from other goals', () => {
    const goal = createGoal();
    const progress: ProgressEntry[] = [
      createProgress({ goalId: 'test-goal', date: '2024-01-15', value: 3 }),
      createProgress({ id: 'p2', goalId: 'other-goal', date: '2024-01-15', value: 10 }),
    ];

    expect(calculatePeriodProgress(goal, progress, '2024-01-15')).toBe(3);
  });
});

describe('calculatePercentage', () => {
  it('calculates correct percentage', () => {
    expect(calculatePercentage(5, 10)).toBe(50);
    expect(calculatePercentage(10, 10)).toBe(100);
    expect(calculatePercentage(15, 10)).toBe(150);
  });

  it('rounds to nearest integer', () => {
    expect(calculatePercentage(1, 3)).toBe(33);
    expect(calculatePercentage(2, 3)).toBe(67);
  });

  it('returns 0 for zero target', () => {
    expect(calculatePercentage(5, 0)).toBe(0);
  });
});

describe('getStatusFromPercentage', () => {
  it('returns none for 0%', () => {
    expect(getStatusFromPercentage(0)).toBe('none');
  });

  it('returns red for <50%', () => {
    expect(getStatusFromPercentage(1)).toBe('red');
    expect(getStatusFromPercentage(49)).toBe('red');
  });

  it('returns yellow for 50-99%', () => {
    expect(getStatusFromPercentage(50)).toBe('yellow');
    expect(getStatusFromPercentage(99)).toBe('yellow');
  });

  it('returns green for 100-199%', () => {
    expect(getStatusFromPercentage(100)).toBe('green');
    expect(getStatusFromPercentage(199)).toBe('green');
  });

  it('returns special for 200%+', () => {
    expect(getStatusFromPercentage(200)).toBe('special');
    expect(getStatusFromPercentage(300)).toBe('special');
  });
});

describe('getDayStatus', () => {
  it('combines progress and status correctly', () => {
    const goal = createGoal({ target: 10 });
    const progress: ProgressEntry[] = [createProgress({ value: 5 })];

    const result = getDayStatus(goal, progress, '2024-01-15');
    expect(result.percentage).toBe(50);
    expect(result.status).toBe('yellow');
  });

  it('returns none status with 0 progress', () => {
    const goal = createGoal();
    const progress: ProgressEntry[] = [];

    const result = getDayStatus(goal, progress, '2024-01-15');
    expect(result.percentage).toBe(0);
    expect(result.status).toBe('none');
  });
});
