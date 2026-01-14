# Test Plan: Habit Forge

## Testing Strategy

### Test Levels

1. **Unit Tests** (Vitest + Testing Library)
   - Utility functions
   - Hooks
   - Component rendering
   - State management

2. **Integration Tests** (Vitest + Testing Library)
   - Component interactions
   - Context/state integration
   - Storage operations

3. **End-to-End Tests** (Playwright)
   - User flows
   - Cross-browser testing
   - Visual regression (optional)

## Unit Test Coverage

### Utils

#### `src/utils/date.ts`
- [ ] `formatDate` - converts Date to YYYY-MM-DD string
- [ ] `parseDate` - converts string to Date object
- [ ] `getToday` - returns today's date string
- [ ] `addDays` - adds/subtracts days correctly
- [ ] `getStartOfWeek` - returns Monday of the week
- [ ] `getEndOfWeek` - returns Sunday of the week
- [ ] `getStartOfMonth` - returns first day of month
- [ ] `getEndOfMonth` - returns last day of month
- [ ] `getDaysInMonth` - handles all months including February
- [ ] `getCalendarGrid` - correct grid with empty cells for offset

#### `src/utils/progress.ts`
- [ ] `calculatePeriodProgress` - sums progress within period
- [ ] `calculatePercentage` - handles edge cases (0 target)
- [ ] `getStatusFromPercentage` - returns correct status thresholds
- [ ] `getDayStatus` - combines progress and status correctly
- [ ] `calculateDebt` - calculates catch-up amount
- [ ] `calculateStreak` - counts consecutive completion days
- [ ] `checkAchievements` - detects newly unlocked achievements

### Store

#### `src/store/storage.ts`
- [ ] `loadStorage` - returns default schema if empty
- [ ] `loadStorage` - handles corrupted JSON gracefully
- [ ] `saveStorage` - persists to localStorage
- [ ] `addGoal` - adds goal to array
- [ ] `updateGoal` - updates existing goal
- [ ] `deleteGoal` - removes goal and related progress
- [ ] `setProgress` - creates or updates progress entry
- [ ] `unlockAchievement` - sets unlockedAt timestamp

### Components

#### `GoalCard`
- [ ] Renders goal title and icon
- [ ] Displays correct percentage
- [ ] Shows appropriate status color
- [ ] Quick-add buttons work
- [ ] Displays catch-up amount when behind

#### `Calendar`
- [ ] Renders correct number of days
- [ ] Highlights today
- [ ] Shows correct status colors
- [ ] Navigation works
- [ ] Click handler fires with date

#### `GoalForm`
- [ ] Renders all form fields
- [ ] Validates required fields
- [ ] Submits correct data
- [ ] Shows delete button in edit mode

## E2E Test Scenarios

### Critical User Flows

#### E2E-1: Create Goal Flow
```
1. Open app
2. Click "Add Goal"
3. Select icon
4. Enter title "Exercise"
5. Set unit to "count"
6. Set period to "day"
7. Set target to 5
8. Save goal
9. Verify goal appears in list
10. Verify "Getting Started" achievement unlocks
```

#### E2E-2: Log Progress Flow
```
1. Open app with existing goal
2. Click "+1" quick add button
3. Verify progress updates
4. Click multiple times
5. Verify percentage updates
6. Verify progress bar animates
```

#### E2E-3: Calendar View Flow
```
1. Open app with existing goal and progress
2. Navigate to Calendar screen
3. Select goal
4. Verify calendar shows correct colors
5. Click on a past day
6. Edit progress value
7. Save
8. Verify calendar color updates
```

#### E2E-4: Achievement Trigger Flow
```
1. Open fresh app (no localStorage)
2. Create first goal
3. Verify celebration animation shows
4. Verify "Getting Started" achievement
5. Add progress to reach 100%
6. Verify "First Victory" achievement triggers
```

### Cross-Browser Testing

Test on:
- Chrome (latest)
- Firefox (latest)
- Safari/WebKit (latest)
- Mobile Chrome (Pixel 5 viewport)

## Test Data

### Mock Goals
```typescript
const mockGoal = {
  id: 'test-goal-1',
  title: 'Exercise',
  icon: '💪',
  unit: 'count',
  period: 'day',
  target: 5,
  duration: { type: 'forever' },
  createdAt: '2024-01-01T00:00:00Z',
  archived: false,
};
```

### Mock Progress
```typescript
const mockProgress = {
  id: 'test-progress-1',
  goalId: 'test-goal-1',
  date: '2024-01-15',
  value: 3,
  createdAt: '2024-01-15T10:00:00Z',
};
```

## Test Environment

### Setup
- Clear localStorage before each test
- Mock date when needed for consistency
- Use test IDs for element selection

### CI Configuration
- Run unit tests: `npm run test`
- Run e2e tests: `npm run test:e2e`
- Generate coverage report
- Fail pipeline on any test failure

## Quality Metrics

### Coverage Targets
- Statements: 80%
- Branches: 75%
- Functions: 80%
- Lines: 80%

### Performance
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Performance: > 90

## Regression Testing

Before each release:
1. Run full test suite
2. Manual smoke test of critical flows
3. Verify on all target browsers
4. Check console for errors
