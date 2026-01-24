import { useState, useEffect } from 'react';
import { useApp } from '@/store/context';
import { useTranslation } from '@/i18n';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/Button/Button';
import type { Language, Settings } from '@/types';
import styles from './SettingsScreen.module.css';

type Theme = Settings['theme'];

const THEMES: { value: Theme; labelKey: 'themeLight' | 'themeDark' | 'themeSystem' }[] = [
  { value: 'light', labelKey: 'themeLight' },
  { value: 'dark', labelKey: 'themeDark' },
  { value: 'system', labelKey: 'themeSystem' },
];

const LANGUAGES: { code: Language; name: string }[] = [
  { code: 'en', name: 'English' },
  { code: 'ru', name: 'Русский' },
  { code: 'fr', name: 'Français' },
  { code: 'it', name: 'Italiano' },
  { code: 'ee', name: 'Eesti' },
  { code: 'es', name: 'Español' },
];

export function SettingsScreen() {
  const { state, updateSettings } = useApp();
  const { t, language, setLanguage } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [notificationPermission, setNotificationPermission] = useState<
    NotificationPermission | 'unsupported'
  >('default');

  useEffect(() => {
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    } else {
      setNotificationPermission('unsupported');
    }
  }, []);

  const handleRequestPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);

      if (permission === 'granted') {
        updateSettings({ notificationsEnabled: true });
        // Show a test notification
        new Notification(t.appName, {
          body: t.settings.notifEnabled,
          icon: '/favicon.svg',
        });
      }
    }
  };

  const handleToggleNotifications = () => {
    if (notificationPermission !== 'granted') {
      void handleRequestPermission();
    } else {
      updateSettings({ notificationsEnabled: !state.settings.notificationsEnabled });
    }
  };

  const handleReminderTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({ reminderTime: e.target.value });
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value as Theme);
  };

  const getNotificationStatus = () => {
    if (notificationPermission === 'unsupported') {
      return t.settings.notifUnsupported;
    }
    if (notificationPermission === 'denied') {
      return t.settings.notifBlocked;
    }
    if (notificationPermission === 'default') {
      return t.settings.notifClickToEnable;
    }
    if (state.settings.notificationsEnabled) {
      return t.settings.notifEnabled;
    }
    return t.settings.notifDisabled;
  };

  return (
    <div className={styles.screen}>
      <h1 className={styles.title}>{t.settings.title}</h1>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>{t.settings.language}</h2>
        <div className={styles.setting}>
          <div className={styles.settingInfo}>
            <h3 className={styles.settingName}>{t.settings.language}</h3>
            <p className={styles.settingDescription}>{t.settings.languageDesc}</p>
          </div>
          <select
            className={styles.languageSelect}
            value={language}
            onChange={handleLanguageChange}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>{t.settings.theme}</h2>
        <div className={styles.setting}>
          <div className={styles.settingInfo}>
            <h3 className={styles.settingName}>{t.settings.theme}</h3>
            <p className={styles.settingDescription}>{t.settings.themeDesc}</p>
          </div>
          <select className={styles.languageSelect} value={theme} onChange={handleThemeChange}>
            {THEMES.map((themeOption) => (
              <option key={themeOption.value} value={themeOption.value}>
                {t.settings[themeOption.labelKey]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>{t.settings.notifications}</h2>

        <div className={styles.setting}>
          <div className={styles.settingInfo}>
            <h3 className={styles.settingName}>{t.settings.dailyReminders}</h3>
            <p className={styles.settingDescription}>{getNotificationStatus()}</p>
          </div>
          <Button
            variant={state.settings.notificationsEnabled ? 'primary' : 'secondary'}
            size="sm"
            onClick={handleToggleNotifications}
            disabled={
              notificationPermission === 'unsupported' || notificationPermission === 'denied'
            }
          >
            {state.settings.notificationsEnabled ? t.settings.enabled : t.settings.enable}
          </Button>
        </div>

        {state.settings.notificationsEnabled && (
          <div className={styles.setting}>
            <div className={styles.settingInfo}>
              <h3 className={styles.settingName}>{t.settings.reminderTime}</h3>
              <p className={styles.settingDescription}>{t.settings.reminderTimeDesc}</p>
            </div>
            <input
              type="time"
              className={styles.timeInput}
              value={state.settings.reminderTime}
              onChange={handleReminderTimeChange}
            />
          </div>
        )}
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>{t.settings.about}</h2>
        <div className={styles.about}>
          <p>
            <strong>{t.appName}</strong> {t.settings.version}
          </p>
          <p className={styles.aboutText}>{t.settings.aboutText}</p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>{t.settings.data}</h2>
        <div className={styles.setting}>
          <div className={styles.settingInfo}>
            <h3 className={styles.settingName}>{t.settings.exportData}</h3>
            <p className={styles.settingDescription}>{t.settings.exportDataDesc}</p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              const data = JSON.stringify(state, null, 2);
              const blob = new Blob([data], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'habit-forge-data.json';
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            {t.settings.export}
          </Button>
        </div>
      </div>
    </div>
  );
}
