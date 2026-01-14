// Date utility functions

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseDate(dateString: string): Date {
  return new Date(dateString + 'T00:00:00');
}

export function getToday(): string {
  return formatDate(new Date());
}

export function addDays(dateString: string, days: number): string {
  const date = parseDate(dateString);
  date.setDate(date.getDate() + days);
  return formatDate(date);
}

export function getStartOfWeek(dateString: string): string {
  const date = parseDate(dateString);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day; // Monday as start of week
  date.setDate(date.getDate() + diff);
  return formatDate(date);
}

export function getEndOfWeek(dateString: string): string {
  const start = getStartOfWeek(dateString);
  return addDays(start, 6);
}

export function getStartOfMonth(dateString: string): string {
  const date = parseDate(dateString);
  date.setDate(1);
  return formatDate(date);
}

export function getEndOfMonth(dateString: string): string {
  const date = parseDate(dateString);
  date.setMonth(date.getMonth() + 1);
  date.setDate(0);
  return formatDate(date);
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getMonthDates(year: number, month: number): string[] {
  const days = getDaysInMonth(year, month);
  return Array.from({ length: days }, (_, i) => {
    const date = new Date(year, month, i + 1);
    return formatDate(date);
  });
}

export function getPeriodDates(
  period: 'day' | 'week' | 'month',
  dateString: string
): {
  start: string;
  end: string;
} {
  switch (period) {
    case 'day':
      return { start: dateString, end: dateString };
    case 'week':
      return { start: getStartOfWeek(dateString), end: getEndOfWeek(dateString) };
    case 'month':
      return { start: getStartOfMonth(dateString), end: getEndOfMonth(dateString) };
  }
}

export function isDateInPast(dateString: string): boolean {
  return dateString < getToday();
}

export function isDateInFuture(dateString: string): boolean {
  return dateString > getToday();
}

export function formatDisplayDate(dateString: string): string {
  const date = parseDate(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export function formatMonthYear(year: number, month: number): string {
  const date = new Date(year, month, 1);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
}

export function getWeekdayNames(): string[] {
  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
}

export function getCalendarGrid(year: number, month: number): (string | null)[] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = getDaysInMonth(year, month);

  // Adjust for Monday start (0 = Monday, 6 = Sunday)
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;

  const grid: (string | null)[] = [];

  // Add empty cells for days before the first of the month
  for (let i = 0; i < startOffset; i++) {
    grid.push(null);
  }

  // Add the days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    grid.push(formatDate(date));
  }

  return grid;
}
