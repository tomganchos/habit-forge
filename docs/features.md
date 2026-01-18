# Features

## Goal Management

### Creating Goals
Users can create habits with customizable parameters:

| Parameter | Options | Description |
|-----------|---------|-------------|
| Icon | 12 emoji options | Visual identifier |
| Title | Free text | Goal name |
| Unit | Count, Time | Measurement type |
| Period | Day, Week, Month | Tracking frequency |
| Target | Number | Goal threshold |
| Duration | Forever, End Date, N Periods | Goal lifespan |

### Smart Increments
Progress buttons adapt based on target value:

**Count-based goals:**
| Target Range | Available Increments |
|--------------|---------------------|
| 1-9 | +1 |
| 10-24 | +1, +5 |
| 25-49 | +1, +5, +10 |
| 50-99 | +1, +5, +10, +25 |
| 100-199 | +1, +5, +10, +25, +50 |
| 200+ | +1, +5, +10, +25, +50, +100 |

**Time-based goals:**
| Target Range | Available Increments |
|--------------|---------------------|
| 1-29 min | +1m, +5m |
| 30-59 min | +1m, +5m, +15m |
| 60-89 min | +1m, +5m, +15m, +30m |
| 90-179 min | +1m, +5m, +15m, +30m, +1h |
| 180+ min | +1m, +5m, +15m, +30m, +1h, +2h |

Decrement buttons (-1, -5, etc.) appear when progress > 0.

### Progress Tracking
- Real-time progress updates
- Visual progress bar with percentage
- Color-coded status (red < 50%, yellow < 100%, green 100%, purple > 100%)
- Period-aware calculations (daily/weekly/monthly)

## Calendar View

### Monthly Overview
- Grid calendar showing current month
- Color-coded days based on progress status
- Navigation between months
- Goal selector for filtering view

### Day Status Colors
| Status | Color | Condition |
|--------|-------|-----------|
| None | Gray | No progress |
| Red | Red | < 50% of target |
| Yellow | Yellow | 50-99% of target |
| Green | Green | 100% of target |
| Special | Purple | > 100% of target |

### Progress Editing
Click any day to view/edit progress for that date.

## Achievements System

### Available Achievements

| ID | Name | Condition |
|----|------|-----------|
| `getting_started` | Getting Started | Create first goal |
| `first_victory` | First Victory | Complete 100% of any goal |
| `overachiever` | Overachiever | Reach 200% on any goal |
| `week_warrior` | Week Warrior | 7-day streak |
| `month_master` | Month Master | 30-day streak |
| `triple_threat` | Triple Threat | Complete 3 goals in one day |
| `early_bird` | Early Bird | Log progress before 6 AM |
| `night_owl` | Night Owl | Log progress after 11 PM |
| `perfectionist` | Perfectionist | Hit exactly 100% |
| `habit_collector` | Habit Collector | Create 5 goals |

### Celebration Animation
Confetti animation plays when achievements unlock.

## Internationalization (i18n)

### Supported Languages
| Code | Language |
|------|----------|
| en | English |
| ru | Russian (Русский) |
| fr | French (Français) |
| it | Italian (Italiano) |
| ee | Estonian (Eesti) |
| es | Spanish (Español) |

### Implementation
- React Context-based (`I18nProvider`)
- Automatic browser language detection
- Manual override in Settings
- Persisted preference in localStorage

## PWA Features

### Installation
- "Add to Home Screen" on iOS Safari
- Install prompt on Android Chrome
- Desktop Chrome/Edge install button

### Offline Support
- Service Worker caches all assets
- Works fully offline after first load
- Auto-update on new versions

### iOS Optimizations
- Apple touch icon (180x180)
- Status bar styling
- Safe area inset handling
- Standalone display mode

## Dark Mode

Automatic dark mode support via `prefers-color-scheme` media query:
- Inverted color palette
- Adjusted contrast for accessibility
- Status colors adapted for dark backgrounds

## Settings

| Setting | Options | Description |
|---------|---------|-------------|
| Language | 6 languages | UI language |

Future settings can be added to the Settings screen.
