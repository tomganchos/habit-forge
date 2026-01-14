import type { Goal, ProgressEntry, CalendarStatus, StorageSchema, AchievementType } from '@/types';
import { getPeriodDates, getToday, parseDate, addDays } from './date';

export function calculatePeriodProgress(
  goal: Goal,
  progress: ProgressEntry[],
  date: string
): number {
  const { start, end } = getPeriodDates(goal.period, date);

  const total = progress
    .filter((p) => p.goalId === goal.id && p.date >= start && p.date <= end)
    .reduce((sum, p) => sum + p.value, 0);

  return total;
}

export function calculatePercentage(current: number, target: number): number {
  if (target <= 0) return 0;
  return Math.round((current / target) * 100);
}

export function getStatusFromPercentage(percentage: number): CalendarStatus {
  if (percentage === 0) return 'none';
  if (percentage < 50) return 'red';
  if (percentage < 100) return 'yellow';
  if (percentage < 200) return 'green';
  return 'special';
}

export function getDayStatus(
  goal: Goal,
  progress: ProgressEntry[],
  date: string
): { status: CalendarStatus; percentage: number } {
  const current = calculatePeriodProgress(goal, progress, date);
  const percentage = calculatePercentage(current, goal.target);
  const status = getStatusFromPercentage(percentage);

  return { status, percentage };
}

// Calculate "debt" - how much is behind schedule
export function calculateDebt(
  goal: Goal,
  progress: ProgressEntry[],
  today: string = getToday()
): number {
  const createdDate = goal.createdAt.split('T')[0] ?? today;
  const startDate = createdDate > today ? today : createdDate;

  let totalExpected = 0;
  let totalAchieved = 0;

  // For daily goals, count each day
  if (goal.period === 'day') {
    let currentDate = startDate;
    while (currentDate <= today) {
      totalExpected += goal.target;
      const dayProgress = progress
        .filter((p) => p.goalId === goal.id && p.date === currentDate)
        .reduce((sum, p) => sum + p.value, 0);
      totalAchieved += dayProgress;
      currentDate = addDays(currentDate, 1);
    }
  } else if (goal.period === 'week') {
    // For weekly goals, count full weeks
    const { start: weekStart } = getPeriodDates('week', today);
    let currentWeekStart = getPeriodDates('week', startDate).start;

    while (currentWeekStart <= weekStart) {
      totalExpected += goal.target;
      const { start, end } = getPeriodDates('week', currentWeekStart);
      const weekProgress = progress
        .filter((p) => p.goalId === goal.id && p.date >= start && p.date <= end)
        .reduce((sum, p) => sum + p.value, 0);
      totalAchieved += weekProgress;
      currentWeekStart = addDays(currentWeekStart, 7);
    }
  } else {
    // For monthly goals, count full months
    const startParsed = parseDate(startDate);
    const todayParsed = parseDate(today);

    let currentYear = startParsed.getFullYear();
    let currentMonth = startParsed.getMonth();

    while (
      currentYear < todayParsed.getFullYear() ||
      (currentYear === todayParsed.getFullYear() && currentMonth <= todayParsed.getMonth())
    ) {
      totalExpected += goal.target;
      const { start, end } = getPeriodDates(
        'month',
        `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-01`
      );
      const monthProgress = progress
        .filter((p) => p.goalId === goal.id && p.date >= start && p.date <= end)
        .reduce((sum, p) => sum + p.value, 0);
      totalAchieved += monthProgress;

      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
    }
  }

  const debt = totalExpected - totalAchieved;
  return Math.max(0, debt);
}

// Calculate current streak
export function calculateStreak(goal: Goal, progress: ProgressEntry[]): number {
  const today = getToday();
  let streak = 0;
  let currentDate = today;
  let continueLoop = true;

  while (continueLoop && streak <= 365) {
    const { status } = getDayStatus(goal, progress, currentDate);
    if (status === 'green' || status === 'special') {
      streak++;
      currentDate = addDays(currentDate, -1);
    } else if (status === 'yellow' && currentDate === today) {
      // Allow yellow for today (in progress)
      currentDate = addDays(currentDate, -1);
    } else {
      continueLoop = false;
    }
  }

  return streak;
}

// Check for achievement unlocks
export function checkAchievements(storage: StorageSchema): AchievementType[] {
  const newUnlocks: AchievementType[] = [];
  const { goals, progress, achievements } = storage;

  const isUnlocked = (id: AchievementType) => achievements.some((a) => a.id === id && a.unlockedAt);

  // First goal
  if (goals.length > 0 && !isUnlocked('first_goal')) {
    newUnlocks.push('first_goal');
  }

  // Check for completions and streaks
  for (const goal of goals) {
    const today = getToday();
    const { percentage } = getDayStatus(goal, progress, today);
    const streak = calculateStreak(goal, progress);

    // First completion
    if (percentage >= 100 && !isUnlocked('first_completion')) {
      newUnlocks.push('first_completion');
    }

    // Overachiever
    if (percentage >= 200 && !isUnlocked('overachiever')) {
      newUnlocks.push('overachiever');
    }

    // Streaks
    if (streak >= 3 && !isUnlocked('streak_3')) {
      newUnlocks.push('streak_3');
    }
    if (streak >= 7 && !isUnlocked('streak_7')) {
      newUnlocks.push('streak_7');
    }
    if (streak >= 30 && !isUnlocked('streak_30')) {
      newUnlocks.push('streak_30');
    }
  }

  // Perfect week check
  if (goals.length > 0 && !isUnlocked('perfect_week')) {
    const { start, end } = getPeriodDates('week', getToday());
    let allPerfect = true;

    for (const goal of goals) {
      if (goal.archived) continue;
      let currentDate = start;
      while (currentDate <= end) {
        const { percentage } = getDayStatus(goal, progress, currentDate);
        if (percentage < 100) {
          allPerfect = false;
          break;
        }
        currentDate = addDays(currentDate, 1);
      }
      if (!allPerfect) break;
    }

    if (allPerfect) {
      newUnlocks.push('perfect_week');
    }
  }

  return [...new Set(newUnlocks)]; // Remove duplicates
}
