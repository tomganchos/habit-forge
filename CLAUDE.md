# Habit Forge

A React + TypeScript habit tracking web application built with Vite, designed to deploy on GitHub Pages.

## Project Overview

Habit Forge helps users track daily habits and build better routines. It features:
- Goal creation with customizable units (count/time), periods (day/week/month), and durations
- Progress logging with quick-add buttons
- Calendar month view with color-coded status
- Achievement system with celebration animations
- Local-first storage (localStorage) with typed schema
- Browser notifications for reminders

## Folder Structure

```
habit-forge/
├── .claude/agents/      # AI subagent definitions
├── .github/workflows/   # CI/CD configuration
├── docs/                # Project documentation
├── e2e/                 # Playwright end-to-end tests
├── public/              # Static assets
└── src/
    ├── components/      # Reusable UI components
    │   ├── AchievementCelebration/
    │   ├── Button/
    │   ├── Calendar/
    │   ├── GoalCard/
    │   ├── GoalForm/
    │   ├── Layout/
    │   └── Navigation/
    ├── hooks/           # Custom React hooks
    ├── screens/         # Page-level components
    │   ├── AchievementsScreen/
    │   ├── CalendarScreen/
    │   ├── SettingsScreen/
    │   └── TodayScreen/
    ├── store/           # State management
    │   ├── context.tsx  # React context provider
    │   └── storage.ts   # localStorage operations
    ├── test/            # Test utilities and setup
    ├── types/           # TypeScript type definitions
    └── utils/           # Utility functions
        ├── date.ts      # Date manipulation
        ├── id.ts        # ID generation
        └── progress.ts  # Progress calculations
```

## Commands

```bash
# Development
npm run dev          # Start dev server
npm run preview      # Preview production build

# Quality checks
npm run lint         # Run ESLint
npm run lint:fix     # Fix lint errors
npm run format       # Format code with Prettier
npm run format:check # Check formatting
npm run typecheck    # Run TypeScript type checking

# Testing
npm run test         # Run unit tests (Vitest)
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
npm run test:e2e     # Run Playwright e2e tests
npm run test:e2e:ui  # Run e2e tests with UI

# Build
npm run build        # Build for production
```

## Coding Standards

### TypeScript
- Strict mode enabled with all strict checks
- Use `interface` for object types (enforced by ESLint)
- Prefer nullish coalescing (`??`) over logical OR
- No non-null assertions (`!`)
- Use explicit return types for exported functions

### React
- Functional components with hooks only
- Use `@/` path alias for imports
- CSS Modules for styling (`.module.css`)
- Small, composable components
- Keep state as close to usage as possible

### File Organization
- One component per file
- Component folder contains: `Component.tsx` + `Component.module.css`
- Export components from their folder index when needed
- Colocate tests with source files (`*.test.ts`)

### Naming Conventions
- PascalCase: Components, Types, Interfaces
- camelCase: Functions, variables, hooks
- kebab-case: CSS classes, file names for non-components
- UPPER_SNAKE_CASE: Constants

## Quality Gates

All of the following must pass before merging:

1. **Lint**: `npm run lint` - No errors or warnings
2. **Format**: `npm run format:check` - Code is formatted
3. **Typecheck**: `npm run typecheck` - No type errors
4. **Unit Tests**: `npm run test` - All tests pass
5. **E2E Tests**: `npm run test:e2e` - All e2e tests pass
6. **Build**: `npm run build` - Builds without errors

## Development Workflow

1. Create feature branch from `main`
2. Implement changes following coding standards
3. Run `npm run lint:fix && npm run format` to auto-fix issues
4. Run all quality gates locally
5. Create pull request with clear description
6. CI runs all checks automatically
7. After review and green CI, merge to main
8. Auto-deploy to GitHub Pages

## Acceptance Criteria

### MVP Features

#### Goals
- [ ] Create goal with: title, icon, unit (count/time), period (day/week/month), target, duration
- [ ] Edit existing goals
- [ ] Delete goals
- [ ] Archive goals (soft delete)

#### Progress Tracking
- [ ] Log progress for current day
- [ ] Quick-add buttons for common increments
- [ ] Show progress as percentage of target
- [ ] Calculate and display "catch-up" amount (neutral wording)

#### Calendar View
- [ ] Month view with status colors per day
- [ ] Status: red (<50%), yellow (50-99%), green (100-199%), special (≥200%)
- [ ] Navigate between months
- [ ] Edit progress for any day

#### Achievements
- [ ] Unlock achievements based on progress
- [ ] Show celebration animation on unlock
- [ ] Display all achievements with locked/unlocked state

#### Settings
- [ ] Request notification permission
- [ ] Set reminder time
- [ ] Export data as JSON

### Technical Requirements
- [ ] All data persisted in localStorage
- [ ] Typed storage schema with migration support
- [ ] Works offline
- [ ] Responsive design (mobile-first)
- [ ] Deployed to GitHub Pages

## Subagents

Project-level subagents are defined in `.claude/agents/`. Use them proactively:

- **coder**: Implement features, refactor, update UI
- **code-reviewer**: Review diffs for quality, security, edge cases
- **test-runner**: Run all checks, fix failures while preserving intent
- **product-qa**: Verify functionality against acceptance criteria
