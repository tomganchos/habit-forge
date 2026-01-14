import { useTranslation } from '@/i18n';
import styles from './Navigation.module.css';

export type Screen = 'today' | 'calendar' | 'achievements' | 'settings';

interface NavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function Navigation({ currentScreen, onNavigate }: NavigationProps) {
  const { t } = useTranslation();

  const navItems: { id: Screen; label: string; icon: string }[] = [
    { id: 'today', label: t.nav.today, icon: '📋' },
    { id: 'calendar', label: t.nav.calendar, icon: '📅' },
    { id: 'achievements', label: t.nav.achievements, icon: '🏆' },
    { id: 'settings', label: t.nav.settings, icon: '⚙️' },
  ];

  return (
    <nav className={styles.nav}>
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`${styles.navItem} ${currentScreen === item.id ? styles.active : ''}`}
          onClick={() => onNavigate(item.id)}
          aria-current={currentScreen === item.id ? 'page' : undefined}
        >
          <span className={styles.icon}>{item.icon}</span>
          <span className={styles.label}>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
