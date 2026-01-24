import type { GoalUnit } from '@/types';

export interface Increment {
  value: number;
  label: string;
}

/**
 * Calculate smart increment values based on goal target and unit.
 * Returns appropriate increment buttons for the target value.
 */
export function getSmartIncrements(target: number, unit: GoalUnit): Increment[] {
  if (unit === 'time') {
    return getTimeIncrements(target);
  }
  return getCountIncrements(target);
}

function getCountIncrements(target: number): Increment[] {
  const increments: Increment[] = [];

  // Always show 1, 5, and 10 for quick-add
  increments.push({ value: 1, label: '1' });
  increments.push({ value: 5, label: '5' });
  increments.push({ value: 10, label: '10' });

  // Show 25 if target >= 50
  if (target >= 50) {
    increments.push({ value: 25, label: '25' });
  }

  // Show 50 if target >= 100
  if (target >= 100) {
    increments.push({ value: 50, label: '50' });
  }

  // Show 100 if target >= 200
  if (target >= 200) {
    increments.push({ value: 100, label: '100' });
  }

  return increments;
}

function getTimeIncrements(target: number): Increment[] {
  const increments: Increment[] = [];

  // Always show 5min, 15min, and 30min for quick-add
  increments.push({ value: 5, label: '5m' });
  increments.push({ value: 15, label: '15m' });
  increments.push({ value: 30, label: '30m' });

  // Show 1 hour if target >= 90
  if (target >= 90) {
    increments.push({ value: 60, label: '1h' });
  }

  // Show 2 hours if target >= 180
  if (target >= 180) {
    increments.push({ value: 120, label: '2h' });
  }

  return increments;
}
