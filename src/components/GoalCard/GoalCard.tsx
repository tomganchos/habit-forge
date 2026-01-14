import type { Goal, ProgressEntry } from '@/types';
import {
  calculatePeriodProgress,
  calculatePercentage,
  getStatusFromPercentage,
  calculateDebt,
} from '@/utils/progress';
import { getToday } from '@/utils/date';
import { getSmartIncrements } from '@/utils/increments';
import { useTranslation } from '@/i18n';
import styles from './GoalCard.module.css';

interface GoalCardProps {
  goal: Goal;
  progress: ProgressEntry[];
  onAddProgress: (goalId: string, value: number) => void;
  onEdit: (goal: Goal) => void;
}

export function GoalCard({ goal, progress, onAddProgress, onEdit }: GoalCardProps) {
  const { t } = useTranslation();
  const today = getToday();
  const currentProgress = calculatePeriodProgress(goal, progress, today);
  const percentage = calculatePercentage(currentProgress, goal.target);
  const status = getStatusFromPercentage(percentage);
  const debt = calculateDebt(goal, progress);
  const increments = getSmartIncrements(goal.target, goal.unit);

  const formatValue = (value: number) => {
    if (goal.unit === 'time') {
      const hours = Math.floor(value / 60);
      const minutes = value % 60;
      if (hours > 0) {
        return `${hours}h ${minutes}m`;
      }
      return `${minutes}m`;
    }
    return value.toString();
  };

  const getPeriodLabel = () => {
    switch (goal.period) {
      case 'day':
        return t.today.todayLabel;
      case 'week':
        return t.today.thisWeek;
      case 'month':
        return t.today.thisMonth;
    }
  };

  const statusBadgeClass = styles.statusBadge ?? '';
  const progressFillClass = styles.progressFill ?? '';
  const progressOverflowClass = styles.progressOverflow ?? '';

  return (
    <div className={styles.card} data-testid="goal-card">
      <div className={styles.header}>
        <button className={styles.editButton} onClick={() => onEdit(goal)} aria-label="Edit goal">
          <span className={styles.icon}>{goal.icon}</span>
          <span className={styles.title}>{goal.title}</span>
        </button>
        <span className={`${statusBadgeClass} status-${status}`}>{percentage}%</span>
      </div>

      <div className={styles.progressSection}>
        <div className={styles.progressInfo}>
          <span className={styles.progressText}>
            {formatValue(currentProgress)} / {formatValue(goal.target)}
          </span>
          <span className={styles.periodLabel}>{getPeriodLabel()}</span>
        </div>

        <div className={styles.progressBar}>
          <div
            className={`${progressFillClass} status-${status}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
          {percentage > 100 && (
            <div
              className={`${progressOverflowClass} status-special`}
              style={{ width: `${Math.min(percentage - 100, 100)}%` }}
            />
          )}
        </div>
      </div>

      {debt > 0 && (
        <p className={styles.debt}>
          <span className={styles.debtLabel}>{t.today.catchUp}</span> {formatValue(debt)}
        </p>
      )}

      <div className={styles.actions}>
        {increments.map((increment) => (
          <button
            key={increment.value}
            className={styles.quickAdd}
            onClick={() => onAddProgress(goal.id, increment.value)}
            data-testid={increment.value === 1 || increment.value === 5 ? 'add-progress-button' : undefined}
          >
            <span className={styles.quickAddIcon}>+</span>
            <span>{increment.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
