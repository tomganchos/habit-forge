# Habit Forge Documentation

Habit Forge is a Progressive Web App (PWA) for tracking habits and building better routines. Built with React, TypeScript, and Vite.

## Table of Contents

- [Architecture](./architecture.md) - Technical architecture and design decisions
- [Features](./features.md) - Complete feature documentation
- [Components](./components.md) - UI component reference
- [Internationalization](./i18n.md) - Multi-language support
- [PWA Setup](./pwa.md) - Progressive Web App configuration
- [Changelog](./CHANGELOG.md) - Version history and changes

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
npm run test:e2e
```

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool |
| CSS Modules | Scoped styling |
| vite-plugin-pwa | PWA support |
| Vitest | Unit testing |
| Playwright | E2E testing |

## Project Structure

```
habit-forge/
├── docs/                 # Documentation
├── e2e/                  # Playwright E2E tests
├── public/               # Static assets & PWA icons
├── scripts/              # Build scripts
└── src/
    ├── components/       # Reusable UI components
    ├── hooks/            # Custom React hooks
    ├── i18n/             # Internationalization
    ├── screens/          # Page components
    ├── store/            # State management
    ├── types/            # TypeScript definitions
    └── utils/            # Utility functions
```

## Deployment

The app is deployed to GitHub Pages via GitHub Actions. Every push to `main` triggers a build and deployment.

**Live URL**: https://tomganchos.github.io/habit-forge/
