import { useState, useCallback } from 'react';
import { AppProvider, useApp } from '@/store/context';
import { I18nProvider } from '@/i18n';
import { Layout } from '@/components/Layout/Layout';
import { Navigation, type Screen } from '@/components/Navigation/Navigation';
import { AchievementCelebration } from '@/components/AchievementCelebration/AchievementCelebration';
import { TodayScreen } from '@/screens/TodayScreen/TodayScreen';
import { CalendarScreen } from '@/screens/CalendarScreen/CalendarScreen';
import { AchievementsScreen } from '@/screens/AchievementsScreen/AchievementsScreen';
import { SettingsScreen } from '@/screens/SettingsScreen/SettingsScreen';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('today');
  const { state, newlyUnlockedAchievements, clearNewAchievements } = useApp();
  const [celebratingIndex, setCelebratingIndex] = useState(0);

  const handleCloseCelebration = useCallback(() => {
    if (celebratingIndex < newlyUnlockedAchievements.length - 1) {
      setCelebratingIndex((i) => i + 1);
    } else {
      clearNewAchievements();
      setCelebratingIndex(0);
    }
  }, [celebratingIndex, newlyUnlockedAchievements.length, clearNewAchievements]);

  const currentAchievementId = newlyUnlockedAchievements[celebratingIndex];
  const currentAchievement = currentAchievementId
    ? state.achievements.find((a) => a.id === currentAchievementId)
    : null;

  const renderScreen = () => {
    switch (currentScreen) {
      case 'today':
        return <TodayScreen />;
      case 'calendar':
        return <CalendarScreen />;
      case 'achievements':
        return <AchievementsScreen />;
      case 'settings':
        return <SettingsScreen />;
    }
  };

  return (
    <Layout>
      <Navigation currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      {renderScreen()}
      {currentAchievement && (
        <AchievementCelebration achievement={currentAchievement} onClose={handleCloseCelebration} />
      )}
    </Layout>
  );
}

export function App() {
  return (
    <AppProvider>
      <I18nProvider>
        <AppContent />
      </I18nProvider>
    </AppProvider>
  );
}
