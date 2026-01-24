import { useState } from 'react';
import { useApp } from '@/store/context';
import { useTranslation } from '@/i18n';
import type { Goal, NewGoal } from '@/types';
import { GoalCard } from '@/components/GoalCard/GoalCard';
import { GoalForm } from '@/components/GoalForm/GoalForm';
import { Button } from '@/components/Button/Button';
import { getToday } from '@/utils/date';
import styles from './TodayScreen.module.css';

export function TodayScreen(): React.JSX.Element {
  const { state, addGoal, updateGoal, deleteGoal, archiveGoal, setProgress } = useApp();
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  const activeGoals = state.goals.filter((g) => !g.archived);
  const today = getToday();

  const handleAddProgress = (goalId: string, value: number): void => {
    const currentValue =
      state.progress.find((p) => p.goalId === goalId && p.date === today)?.value ?? 0;
    setProgress(goalId, today, currentValue + value);
  };

  const handleSaveGoal = (goalData: NewGoal): void => {
    if (editingGoal) {
      updateGoal(editingGoal.id, goalData);
    } else {
      addGoal(goalData);
    }
    setShowForm(false);
    setEditingGoal(null);
  };

  const handleEditGoal = (goal: Goal): void => {
    setEditingGoal(goal);
    setShowForm(true);
  };

  const handleDeleteGoal = (goalId: string): void => {
    deleteGoal(goalId);
  };

  const handleDeleteGoalFromForm = (): void => {
    if (editingGoal) {
      deleteGoal(editingGoal.id);
      setShowForm(false);
      setEditingGoal(null);
    }
  };

  const handleArchiveGoal = (goalId: string): void => {
    archiveGoal(goalId);
  };

  const handleCloseForm = (): void => {
    setShowForm(false);
    setEditingGoal(null);
  };

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t.today.title}</h1>
        <Button onClick={() => setShowForm(true)} data-testid="add-goal-button">
          {t.today.addGoal}
        </Button>
      </div>

      {activeGoals.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyText}>{t.today.noGoals}</p>
          <p className={styles.emptyHint}>{t.today.noGoalsHint}</p>
        </div>
      ) : (
        <div className={styles.goals}>
          {activeGoals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              progress={state.progress}
              onAddProgress={handleAddProgress}
              onEdit={handleEditGoal}
              onDelete={handleDeleteGoal}
              onArchive={handleArchiveGoal}
            />
          ))}
        </div>
      )}

      {showForm && (
        <GoalForm
          goal={editingGoal ?? undefined}
          onSave={handleSaveGoal}
          onDelete={editingGoal ? handleDeleteGoalFromForm : undefined}
          onCancel={handleCloseForm}
        />
      )}
    </div>
  );
}
