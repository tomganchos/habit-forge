import { useState } from 'react';
import type { Goal, ProgressEntry } from '@/types';
import { useTranslation } from '@/i18n';
import { getCalendarGrid, formatMonthYear, getToday, parseDate } from '@/utils/date';
import { getDayStatus } from '@/utils/progress';
import { Button } from '@/components/Button/Button';
import styles from './Calendar.module.css';

interface CalendarProps {
  goal: Goal;
  progress: ProgressEntry[];
  onSelectDate?: (date: string) => void;
}

export function Calendar({ goal, progress, onSelectDate }: CalendarProps) {
  const { t } = useTranslation();
  const today = getToday();
  const todayDate = parseDate(today);
  const [year, setYear] = useState(todayDate.getFullYear());
  const [month, setMonth] = useState(todayDate.getMonth());

  const grid = getCalendarGrid(year, month);
  const weekdays = [
    t.weekdays.mon,
    t.weekdays.tue,
    t.weekdays.wed,
    t.weekdays.thu,
    t.weekdays.fri,
    t.weekdays.sat,
    t.weekdays.sun,
  ];

  const handlePrevMonth = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  };

  const handleToday = () => {
    setYear(todayDate.getFullYear());
    setMonth(todayDate.getMonth());
  };

  return (
    <div className={styles.calendar} data-testid="calendar">
      <div className={styles.header}>
        <Button variant="ghost" size="sm" onClick={handlePrevMonth}>
          ←
        </Button>
        <button className={styles.monthYear} onClick={handleToday}>
          {formatMonthYear(year, month)}
        </button>
        <Button variant="ghost" size="sm" onClick={handleNextMonth}>
          →
        </Button>
      </div>

      <div className={styles.weekdays}>
        {weekdays.map((day) => (
          <div key={day} className={styles.weekday}>
            {day}
          </div>
        ))}
      </div>

      <div className={styles.grid}>
        {grid.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className={styles.empty} />;
          }

          const { status, percentage } = getDayStatus(goal, progress, date);
          const isToday = date === today;
          const dayNumber = parseDate(date).getDate();

          const dayClass = styles.day ?? '';
          const todayClass = isToday ? (styles.today ?? '') : '';

          return (
            <button
              key={date}
              className={`${dayClass} status-${status} ${todayClass}`}
              onClick={() => onSelectDate?.(date)}
              title={`${percentage}%`}
              data-testid={`calendar-day-${date}`}
              data-status={status}
            >
              <span className={styles.dayNumber}>{dayNumber}</span>
              {percentage > 0 && <span className={styles.percentage}>{percentage}%</span>}
            </button>
          );
        })}
      </div>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={`${styles.legendColor ?? ''} status-red`} />
          <span>{t.calendar.lessThan50}</span>
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendColor ?? ''} status-yellow`} />
          <span>{t.calendar.between50and99}</span>
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendColor ?? ''} status-green`} />
          <span>{t.calendar.between100and199}</span>
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendColor ?? ''} status-special`} />
          <span>{t.calendar.moreThan200}</span>
        </div>
      </div>
    </div>
  );
}
