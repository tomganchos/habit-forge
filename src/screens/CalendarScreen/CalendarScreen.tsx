import { useState } from 'react';
import { useApp } from '@/store/context';
import { useTranslation } from '@/i18n';
import { Calendar } from '@/components/Calendar/Calendar';
import { formatDisplayDate, getToday } from '@/utils/date';
import { getProgressForDate } from '@/store/storage';
import styles from './CalendarScreen.module.css';

export function CalendarScreen() {
  const { state, setProgress } = useApp();
  const { t } = useTranslation();
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<number>(0);

  const activeGoals = state.goals.filter((g) => !g.archived);
  const selectedGoal = activeGoals.find((g) => g.id === selectedGoalId);

  const handleSelectGoal = (goalId: string) => {
    setSelectedGoalId(goalId);
    setSelectedDate(null);
  };

  const handleSelectDate = (date: string) => {
    if (!selectedGoal) return;

    setSelectedDate(date);
    const currentValue = getProgressForDate(state, selectedGoal.id, date);
    setEditValue(currentValue);
  };

  const handleSaveProgress = () => {
    if (!selectedGoal || !selectedDate) return;

    setProgress(selectedGoal.id, selectedDate, editValue);
    setSelectedDate(null);
  };

  return (
    <div className={styles.screen}>
      <h1 className={styles.title}>{t.calendar.title}</h1>

      {activeGoals.length === 0 ? (
        <div className={styles.empty}>
          <p>{t.calendar.noGoals}</p>
        </div>
      ) : (
        <>
          <div className={styles.goalSelector}>
            {activeGoals.map((goal) => {
              const goalButtonClass = styles.goalButton ?? '';
              const selectedClass = selectedGoalId === goal.id ? (styles.selected ?? '') : '';

              return (
                <button
                  key={goal.id}
                  className={`${goalButtonClass} ${selectedClass}`}
                  onClick={() => handleSelectGoal(goal.id)}
                >
                  <span className={styles.goalIcon}>{goal.icon}</span>
                  <span className={styles.goalTitle}>{goal.title}</span>
                </button>
              );
            })}
          </div>

          {selectedGoal ? (
            <Calendar
              goal={selectedGoal}
              progress={state.progress}
              onSelectDate={handleSelectDate}
            />
          ) : (
            <div className={styles.selectHint}>
              <p>{t.calendar.selectGoal}</p>
            </div>
          )}

          {selectedDate && selectedGoal && (
            <div className={styles.editOverlay} onClick={() => setSelectedDate(null)}>
              <div className={styles.editCard} onClick={(e) => e.stopPropagation()}>
                <h3 className={styles.editTitle}>{formatDisplayDate(selectedDate)}</h3>
                <p className={styles.editGoal}>
                  {selectedGoal.icon} {selectedGoal.title}
                </p>
                <div className={styles.editField}>
                  <label className={styles.editLabel}>
                    {t.calendar.progress} ({selectedGoal.unit === 'time' ? t.calendar.progressMinutes : t.calendar.progressCount})
                  </label>
                  <input
                    type="number"
                    className={styles.editInput}
                    value={editValue}
                    onChange={(e) => setEditValue(Math.max(0, parseInt(e.target.value, 10) || 0))}
                    min={0}
                    data-testid="edit-progress-input"
                  />
                </div>
                <div className={styles.editActions}>
                  <button className={styles.cancelButton} onClick={() => setSelectedDate(null)}>
                    {t.goalForm.cancel}
                  </button>
                  <button
                    className={styles.saveButton}
                    onClick={handleSaveProgress}
                    disabled={selectedDate > getToday()}
                    data-testid="save-progress-button"
                  >
                    {t.goalForm.save}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
