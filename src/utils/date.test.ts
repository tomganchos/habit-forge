import { describe, it, expect } from 'vitest';
import {
  formatDate,
  parseDate,
  addDays,
  getStartOfWeek,
  getEndOfWeek,
  getStartOfMonth,
  getEndOfMonth,
  getDaysInMonth,
  getPeriodDates,
  getCalendarGrid,
} from './date';

describe('formatDate', () => {
  it('formats a date to YYYY-MM-DD string', () => {
    const date = new Date(2024, 0, 15); // January 15, 2024
    expect(formatDate(date)).toBe('2024-01-15');
  });

  it('pads single digit months and days', () => {
    const date = new Date(2024, 4, 5); // May 5, 2024
    expect(formatDate(date)).toBe('2024-05-05');
  });
});

describe('parseDate', () => {
  it('parses a YYYY-MM-DD string to a Date', () => {
    const date = parseDate('2024-01-15');
    expect(date.getFullYear()).toBe(2024);
    expect(date.getMonth()).toBe(0); // January
    expect(date.getDate()).toBe(15);
  });
});

describe('addDays', () => {
  it('adds days to a date string', () => {
    expect(addDays('2024-01-15', 5)).toBe('2024-01-20');
  });

  it('subtracts days when negative', () => {
    expect(addDays('2024-01-15', -5)).toBe('2024-01-10');
  });

  it('handles month boundaries', () => {
    expect(addDays('2024-01-31', 1)).toBe('2024-02-01');
  });
});

describe('getStartOfWeek', () => {
  it('returns Monday of the week', () => {
    // Wednesday, January 17, 2024
    expect(getStartOfWeek('2024-01-17')).toBe('2024-01-15'); // Monday
  });

  it('returns the same day if already Monday', () => {
    expect(getStartOfWeek('2024-01-15')).toBe('2024-01-15');
  });

  it('handles Sunday correctly', () => {
    // Sunday, January 21, 2024
    expect(getStartOfWeek('2024-01-21')).toBe('2024-01-15');
  });
});

describe('getEndOfWeek', () => {
  it('returns Sunday of the week', () => {
    // Wednesday, January 17, 2024
    expect(getEndOfWeek('2024-01-17')).toBe('2024-01-21'); // Sunday
  });
});

describe('getStartOfMonth', () => {
  it('returns the first day of the month', () => {
    expect(getStartOfMonth('2024-01-15')).toBe('2024-01-01');
  });
});

describe('getEndOfMonth', () => {
  it('returns the last day of the month', () => {
    expect(getEndOfMonth('2024-01-15')).toBe('2024-01-31');
  });

  it('handles February correctly', () => {
    expect(getEndOfMonth('2024-02-15')).toBe('2024-02-29'); // Leap year
  });
});

describe('getDaysInMonth', () => {
  it('returns 31 for January', () => {
    expect(getDaysInMonth(2024, 0)).toBe(31);
  });

  it('returns 29 for February in leap year', () => {
    expect(getDaysInMonth(2024, 1)).toBe(29);
  });

  it('returns 28 for February in non-leap year', () => {
    expect(getDaysInMonth(2023, 1)).toBe(28);
  });
});

describe('getPeriodDates', () => {
  it('returns same date for day period', () => {
    const result = getPeriodDates('day', '2024-01-15');
    expect(result.start).toBe('2024-01-15');
    expect(result.end).toBe('2024-01-15');
  });

  it('returns week boundaries for week period', () => {
    const result = getPeriodDates('week', '2024-01-17');
    expect(result.start).toBe('2024-01-15');
    expect(result.end).toBe('2024-01-21');
  });

  it('returns month boundaries for month period', () => {
    const result = getPeriodDates('month', '2024-01-15');
    expect(result.start).toBe('2024-01-01');
    expect(result.end).toBe('2024-01-31');
  });
});

describe('getCalendarGrid', () => {
  it('returns a grid with null padding for offset days', () => {
    // January 2024 starts on Monday, so no padding needed
    const grid = getCalendarGrid(2024, 0);
    expect(grid[0]).toBe('2024-01-01');
    expect(grid.length).toBe(31); // No padding, January starts on Monday
  });

  it('includes padding for months not starting on Monday', () => {
    // February 2024 starts on Thursday (offset of 3)
    const grid = getCalendarGrid(2024, 1);
    expect(grid[0]).toBeNull();
    expect(grid[1]).toBeNull();
    expect(grid[2]).toBeNull();
    expect(grid[3]).toBe('2024-02-01');
  });
});
