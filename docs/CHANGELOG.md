# Changelog

All notable changes to Habit Forge are documented in this file.

## [Unreleased]

### Added
- PWA support with service worker for offline functionality
- iOS home screen installation support
- PWA icons (192x192, 512x512, apple-touch-icon)
- Safe area insets for iPhone notch handling
- Documentation structure in `/docs`

## [1.0.0] - 2025-01-18

### Added
- Initial release of Habit Forge
- Goal management (create, edit, delete habits)
- Multiple goal types: count-based and time-based
- Flexible periods: daily, weekly, monthly
- Duration options: forever, end date, N periods
- Smart increment buttons based on target value
- Decrement buttons for correcting mistakes
- Progress tracking with visual progress bars
- Color-coded status (red, yellow, green, purple)
- Calendar view for historical progress
- Month navigation in calendar
- Click-to-edit progress from calendar
- Achievement system with 10 achievements
- Achievement celebration with confetti animation
- Internationalization with 6 languages (en, ru, fr, it, ee, es)
- Automatic browser language detection
- Dark mode (automatic via system preference)
- localStorage persistence
- GitHub Pages deployment via GitHub Actions
- Responsive design for mobile and desktop
- E2E tests with Playwright (48 tests)
- Unit tests with Vitest

### Technical
- React 18 with TypeScript
- Vite build system
- CSS Modules for styling
- CSS custom properties for theming
- Context-based state management
- Hash-based routing

---

## Version Format

This project uses [Semantic Versioning](https://semver.org/):
- **MAJOR**: Incompatible API/data changes
- **MINOR**: New features, backwards compatible
- **PATCH**: Bug fixes, backwards compatible

## Categories

- **Added**: New features
- **Changed**: Changes to existing functionality
- **Deprecated**: Features to be removed
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security fixes
