import { useState, useRef, useEffect } from 'react';
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
import { ConfirmDialog } from '@/components/ConfirmDialog/ConfirmDialog';
import styles from './GoalCard.module.css';

interface GoalCardProps {
  goal: Goal;
  progress: ProgressEntry[];
  onAddProgress: (goalId: string, value: number) => void;
  onEdit: (goal: Goal) => void;
  onDelete: (goalId: string) => void;
  onArchive: (goalId: string) => void;
}

export function GoalCard({
  goal,
  progress,
  onAddProgress,
  onEdit,
  onDelete,
  onArchive,
}: GoalCardProps): React.JSX.Element {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'delete' | 'archive' | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const today = getToday();
  const currentProgress = calculatePeriodProgress(goal, progress, today);
  const percentage = calculatePercentage(currentProgress, goal.target);
  const status = getStatusFromPercentage(percentage);
  const debt = calculateDebt(goal, progress);
  const increments = getSmartIncrements(goal.target, goal.unit);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
    return undefined;
  }, [menuOpen]);

  const formatValue = (value: number): string => {
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

  const getPeriodLabel = (): string => {
    switch (goal.period) {
      case 'day':
        return t.today.todayLabel;
      case 'week':
        return t.today.thisWeek;
      case 'month':
        return t.today.thisMonth;
    }
  };

  const handleDecrement = (value: number): void => {
    const newValue = Math.max(0, currentProgress - value);
    // Set progress to the new value (not add, but set absolute)
    onAddProgress(goal.id, newValue - currentProgress);
  };

  const handleMenuToggle = (): void => {
    setMenuOpen(!menuOpen);
  };

  const handleEditClick = (): void => {
    setMenuOpen(false);
    onEdit(goal);
  };

  const handleDeleteClick = (): void => {
    setMenuOpen(false);
    setConfirmAction('delete');
  };

  const handleArchiveClick = (): void => {
    setMenuOpen(false);
    setConfirmAction('archive');
  };

  const handleConfirm = (): void => {
    if (confirmAction === 'delete') {
      onDelete(goal.id);
    } else if (confirmAction === 'archive') {
      onArchive(goal.id);
    }
    setConfirmAction(null);
  };

  const handleCancelConfirm = (): void => {
    setConfirmAction(null);
  };

  const statusBadgeClass = styles.statusBadge ?? '';
  const progressFillClass = styles.progressFill ?? '';
  const progressOverflowClass = styles.progressOverflow ?? '';
  const quickAddClass = styles.quickAdd ?? '';
  const quickSubtractClass = styles.quickSubtract ?? '';

  return (
    <>
      <div className={styles.card} data-testid="goal-card">
        <div className={styles.header}>
          <button className={styles.editButton} onClick={() => onEdit(goal)} aria-label="Edit goal">
            <span className={styles.icon}>{goal.icon}</span>
            <span className={styles.title}>{goal.title}</span>
          </button>
          <span className={`${statusBadgeClass} status-${status}`}>{percentage}%</span>
          <div className={styles.menuContainer} ref={menuRef}>
            <button
              className={styles.menuButton}
              onClick={handleMenuToggle}
              aria-label="Goal options"
              aria-expanded={menuOpen}
            >
              <span className={styles.menuIcon}>...</span>
            </button>
            {menuOpen && (
              <div className={styles.menu}>
                <button className={styles.menuItem} onClick={handleEditClick}>
                  {t.goalForm.editGoal}
                </button>
                <button className={styles.menuItem} onClick={handleArchiveClick}>
                  {t.goalForm.archive}
                </button>
                <button
                  className={`${styles.menuItem} ${styles.menuItemDanger}`}
                  onClick={handleDeleteClick}
                >
                  {t.goalForm.delete}
                </button>
              </div>
            )}
          </div>
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
          {/* Decrement buttons */}
          {currentProgress > 0 &&
            increments.map((increment) => (
              <button
                key={`dec-${increment.value}`}
                className={quickSubtractClass}
                onClick={() => handleDecrement(increment.value)}
                disabled={currentProgress < increment.value}
              >
                -{increment.label}
              </button>
            ))}

          {/* Increment buttons */}
          {increments.map((increment) => (
            <button
              key={`inc-${increment.value}`}
              className={quickAddClass}
              onClick={() => onAddProgress(goal.id, increment.value)}
              data-testid={
                increment.value === 1 || increment.value === 5 ? 'add-progress-button' : undefined
              }
            >
              +{increment.label}
            </button>
          ))}
        </div>
      </div>

      {confirmAction === 'delete' && (
        <ConfirmDialog
          title={t.goalForm.deleteConfirmTitle}
          message={t.goalForm.deleteConfirmMessage}
          confirmLabel={t.goalForm.delete}
          cancelLabel={t.goalForm.cancel}
          variant="danger"
          onConfirm={handleConfirm}
          onCancel={handleCancelConfirm}
        />
      )}

      {confirmAction === 'archive' && (
        <ConfirmDialog
          title={t.goalForm.archiveConfirmTitle}
          message={t.goalForm.archiveConfirmMessage}
          confirmLabel={t.goalForm.archive}
          cancelLabel={t.goalForm.cancel}
          variant="primary"
          onConfirm={handleConfirm}
          onCancel={handleCancelConfirm}
        />
      )}
    </>
  );
}
