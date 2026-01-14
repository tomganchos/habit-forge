import { useEffect, useState } from 'react';
import type { Achievement, AchievementType } from '@/types';
import { useTranslation } from '@/i18n';
import styles from './AchievementCelebration.module.css';

interface AchievementCelebrationProps {
  achievement: Achievement;
  onClose: () => void;
}

const CONFETTI_COLORS = ['#6366f1', '#8b5cf6', '#22c55e', '#eab308', '#ef4444'];
const CONFETTI_COUNT = 50;

export function AchievementCelebration({ achievement, onClose }: AchievementCelebrationProps) {
  const { t } = useTranslation();
  const [confetti, setConfetti] = useState<
    { id: number; left: number; color: string; delay: number }[]
  >([]);

  useEffect(() => {
    const pieces = Array.from({ length: CONFETTI_COUNT }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)] ?? '#6366f1',
      delay: Math.random() * 0.5,
    }));
    setConfetti(pieces);

    const timeout = setTimeout(onClose, 3000);
    return () => clearTimeout(timeout);
  }, [onClose]);

  const getAchievementTitle = (id: AchievementType): string => {
    const titles: Record<AchievementType, string> = {
      first_goal: t.achievements.firstGoal,
      first_completion: t.achievements.firstVictory,
      streak_3: t.achievements.streak3,
      streak_7: t.achievements.streak7,
      streak_30: t.achievements.streak30,
      perfect_week: t.achievements.perfectWeek,
      overachiever: t.achievements.overachiever,
    };
    return titles[id];
  };

  const getAchievementDesc = (id: AchievementType): string => {
    const descs: Record<AchievementType, string> = {
      first_goal: t.achievements.firstGoalDesc,
      first_completion: t.achievements.firstVictoryDesc,
      streak_3: t.achievements.streak3Desc,
      streak_7: t.achievements.streak7Desc,
      streak_30: t.achievements.streak30Desc,
      perfect_week: t.achievements.perfectWeekDesc,
      overachiever: t.achievements.overachieverDesc,
    };
    return descs[id];
  };

  return (
    <div className={styles.overlay} onClick={onClose} data-testid="achievement-celebration">
      <div className={styles.confettiContainer}>
        {confetti.map((piece) => (
          <div
            key={piece.id}
            className={styles.confetti}
            style={{
              left: `${piece.left}%`,
              backgroundColor: piece.color,
              animationDelay: `${piece.delay}s`,
            }}
          />
        ))}
      </div>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <div className={styles.icon}>{achievement.icon}</div>
        <h2 className={styles.title}>{t.achievements.celebrationTitle}</h2>
        <h3 className={styles.achievementName}>{getAchievementTitle(achievement.id)}</h3>
        <p className={styles.description}>{getAchievementDesc(achievement.id)}</p>
      </div>
    </div>
  );
}
