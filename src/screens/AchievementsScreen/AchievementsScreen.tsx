import { useApp } from '@/store/context';
import { useTranslation } from '@/i18n';
import type { AchievementType } from '@/types';
import styles from './AchievementsScreen.module.css';

export function AchievementsScreen() {
  const { state } = useApp();
  const { t, language } = useTranslation();

  const unlockedCount = state.achievements.filter((a) => a.unlockedAt).length;
  const totalCount = state.achievements.length;

  const formatDate = (isoString: string | undefined) => {
    if (!isoString) return '';
    const localeMap: Record<string, string> = {
      en: 'en-US',
      ru: 'ru-RU',
      fr: 'fr-FR',
      it: 'it-IT',
      ee: 'et-EE',
      es: 'es-ES',
    };
    return new Date(isoString).toLocaleDateString(localeMap[language] ?? 'en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

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
    <div className={styles.screen}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t.achievements.title}</h1>
        <span className={styles.count}>
          {unlockedCount} / {totalCount}
        </span>
      </div>

      <div className={styles.grid}>
        {state.achievements.map((achievement) => {
          const isUnlocked = Boolean(achievement.unlockedAt);
          const cardClass = styles.card ?? '';
          const stateClass = isUnlocked ? (styles.unlocked ?? '') : (styles.locked ?? '');

          return (
            <div
              key={achievement.id}
              className={`${cardClass} ${stateClass}`}
              data-testid={`achievement-${achievement.id}`}
              data-unlocked={isUnlocked}
            >
              <div className={styles.icon}>{achievement.icon}</div>
              <div className={styles.info}>
                <h3 className={styles.name}>{getAchievementTitle(achievement.id)}</h3>
                <p className={styles.description}>{getAchievementDesc(achievement.id)}</p>
                {isUnlocked && (
                  <p className={styles.date}>
                    {t.achievements.unlockedOn} {formatDate(achievement.unlockedAt)}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
