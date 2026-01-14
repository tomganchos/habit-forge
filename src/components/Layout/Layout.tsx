import type { ReactNode } from 'react';
import styles from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>✓</span>
          <span className={styles.logoText}>Habit Forge</span>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
