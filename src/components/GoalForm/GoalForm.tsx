import { useState } from 'react';
import type { Goal, NewGoal, GoalUnit, GoalPeriod, DurationType } from '@/types';
import { useTranslation } from '@/i18n';
import { Button } from '@/components/Button/Button';
import styles from './GoalForm.module.css';

const ICONS = ['💪', '📚', '🏃', '💧', '🧘', '✍️', '🎯', '⏰', '🎨', '🎸', '💤', '🥗'];

interface GoalFormProps {
  goal?: Goal;
  onSave: (goal: NewGoal) => void;
  onDelete?: () => void;
  onCancel: () => void;
}

export function GoalForm({ goal, onSave, onDelete, onCancel }: GoalFormProps) {
  const { t } = useTranslation();
  const [title, setTitle] = useState(goal?.title ?? '');
  const [icon, setIcon] = useState(goal?.icon ?? '💪');
  const [unit, setUnit] = useState<GoalUnit>(goal?.unit ?? 'count');
  const [period, setPeriod] = useState<GoalPeriod>(goal?.period ?? 'day');
  const [target, setTarget] = useState(goal?.target ?? 1);
  const [durationType, setDurationType] = useState<DurationType>(goal?.duration.type ?? 'forever');
  const [endDate, setEndDate] = useState(goal?.duration.endDate ?? '');
  const [periods, setPeriods] = useState(goal?.duration.periods ?? 30);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newGoal: NewGoal = {
      title: title.trim(),
      icon,
      unit,
      period,
      target,
      duration: {
        type: durationType,
        ...(durationType === 'end_date' ? { endDate } : {}),
        ...(durationType === 'n_periods' ? { periods } : {}),
      },
    };

    onSave(newGoal);
  };

  const getPeriodSuffix = () => {
    switch (period) {
      case 'day':
        return t.common.days;
      case 'week':
        return t.common.weeks;
      case 'month':
        return t.common.months;
    }
  };

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <form
        className={styles.form}
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        data-testid="goal-form"
      >
        <h2 className={styles.title}>{goal ? t.goalForm.editGoal : t.goalForm.newGoal}</h2>

        <div className={styles.field}>
          <label className={styles.label}>{t.goalForm.icon}</label>
          <div className={styles.iconGrid}>
            {ICONS.map((i) => (
              <button
                key={i}
                type="button"
                className={`${styles.iconButton} ${icon === i ? styles.iconSelected : ''}`}
                onClick={() => setIcon(i)}
              >
                {i}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="goal-title">
            {t.goalForm.title}
          </label>
          <input
            id="goal-title"
            type="text"
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t.goalForm.titlePlaceholder}
            required
            data-testid="goal-title-input"
          />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="goal-unit">
              {t.goalForm.unit}
            </label>
            <select
              id="goal-unit"
              className={styles.select}
              value={unit}
              onChange={(e) => setUnit(e.target.value as GoalUnit)}
            >
              <option value="count">{t.goalForm.unitCount}</option>
              <option value="time">{t.goalForm.unitTime}</option>
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="goal-period">
              {t.goalForm.period}
            </label>
            <select
              id="goal-period"
              className={styles.select}
              value={period}
              onChange={(e) => setPeriod(e.target.value as GoalPeriod)}
            >
              <option value="day">{t.goalForm.periodDay}</option>
              <option value="week">{t.goalForm.periodWeek}</option>
              <option value="month">{t.goalForm.periodMonth}</option>
            </select>
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="goal-target">
            {t.goalForm.target} ({unit === 'time' ? t.goalForm.targetMinutes : t.goalForm.targetCount})
          </label>
          <input
            id="goal-target"
            type="number"
            className={styles.input}
            value={target}
            onChange={(e) => setTarget(Math.max(1, parseInt(e.target.value, 10) || 1))}
            min={1}
            required
            data-testid="goal-target-input"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="goal-duration">
            {t.goalForm.duration}
          </label>
          <select
            id="goal-duration"
            className={styles.select}
            value={durationType}
            onChange={(e) => setDurationType(e.target.value as DurationType)}
          >
            <option value="forever">{t.goalForm.durationForever}</option>
            <option value="end_date">{t.goalForm.durationEndDate}</option>
            <option value="n_periods">{t.goalForm.durationPeriods}</option>
          </select>
        </div>

        {durationType === 'end_date' && (
          <div className={styles.field}>
            <label className={styles.label} htmlFor="goal-end-date">
              {t.goalForm.endDate}
            </label>
            <input
              id="goal-end-date"
              type="date"
              className={styles.input}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
        )}

        {durationType === 'n_periods' && (
          <div className={styles.field}>
            <label className={styles.label} htmlFor="goal-periods">
              {t.goalForm.numberOfPeriods} {getPeriodSuffix()}
            </label>
            <input
              id="goal-periods"
              type="number"
              className={styles.input}
              value={periods}
              onChange={(e) => setPeriods(Math.max(1, parseInt(e.target.value, 10) || 1))}
              min={1}
              required
            />
          </div>
        )}

        <div className={styles.actions}>
          {goal && onDelete && (
            <Button type="button" variant="danger" onClick={onDelete}>
              {t.goalForm.delete}
            </Button>
          )}
          <div className={styles.spacer} />
          <Button type="button" variant="secondary" onClick={onCancel}>
            {t.goalForm.cancel}
          </Button>
          <Button type="submit" data-testid="save-goal-button">
            {goal ? t.goalForm.save : t.goalForm.create}
          </Button>
        </div>
      </form>
    </div>
  );
}
