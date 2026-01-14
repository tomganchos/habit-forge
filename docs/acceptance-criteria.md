# Acceptance Criteria: Habit Forge

## Goal Management

### AC-1: Create Goal
**Given** user is on Today screen
**When** user taps "Add Goal" button
**Then** goal form modal opens
**And** user can fill in all fields (title, icon, unit, period, target, duration)
**And** upon save, goal appears in goal list
**And** "Getting Started" achievement is unlocked (first goal)

### AC-2: Edit Goal
**Given** user has at least one goal
**When** user taps on goal header (icon + title)
**Then** goal form opens pre-filled with goal data
**And** user can modify any field
**And** changes are saved on submit

### AC-3: Delete Goal
**Given** user is editing a goal
**When** user taps "Delete" button
**Then** goal is removed from list
**And** associated progress entries are deleted
**And** user returns to Today screen

### AC-4: Goal Validation
**Given** user is creating/editing a goal
**When** user leaves title empty
**Then** save is prevented
**And** user sees validation feedback

## Progress Tracking

### AC-5: Quick Add Progress
**Given** user has a count-based goal
**When** user taps "+1" button
**Then** progress increases by 1
**And** progress bar updates immediately
**And** percentage badge updates

### AC-6: Time-Based Quick Add
**Given** user has a time-based goal
**When** user taps "+15 min" button
**Then** progress increases by 15 minutes
**And** progress displays in hours/minutes format

### AC-7: Progress Percentage
**Given** goal target is 10
**When** user has logged 5 units
**Then** percentage shows 50%
**And** status color is yellow

### AC-8: Over-Achievement
**Given** goal target is 10
**When** user logs 20+ units (200%+)
**Then** status shows special (purple) color
**And** "Overachiever" achievement unlocks

## Calendar View

### AC-9: View Calendar
**Given** user navigates to Calendar screen
**When** user selects a goal
**Then** calendar shows current month
**And** days are colored by progress status
**And** today is highlighted with outline

### AC-10: Calendar Colors
**Given** user views calendar
**Then** days show correct status colors:
- Gray: no progress
- Red: <50% of target
- Yellow: 50-99% of target
- Green: 100-199% of target
- Purple: ≥200% of target

### AC-11: Navigate Months
**Given** user is viewing calendar
**When** user taps left arrow
**Then** previous month is shown
**When** user taps right arrow
**Then** next month is shown
**When** user taps month/year
**Then** current month is shown

### AC-12: Edit Past Progress
**Given** user is viewing calendar
**When** user taps on a past day
**Then** progress edit modal opens
**And** user can set progress value
**And** calendar updates on save

### AC-13: Future Day Restriction
**Given** user is viewing calendar
**When** user taps on a future day
**Then** save button is disabled
**And** user cannot save progress for future dates

## Achievements

### AC-14: Achievement Display
**Given** user navigates to Trophies screen
**Then** all achievements are shown
**And** unlocked achievements are highlighted
**And** locked achievements appear grayed out
**And** count shows "X / Y" unlocked

### AC-15: Achievement Unlock Animation
**Given** user performs action that unlocks achievement
**Then** celebration overlay appears
**And** confetti animation plays
**And** achievement details display
**And** overlay auto-dismisses after 3 seconds

### AC-16: Streak Achievements
**Given** user has daily goal
**When** user completes goal for 3 consecutive days
**Then** "On a Roll" (3-day streak) achievement unlocks

### AC-17: First Completion Achievement
**Given** user has never completed a goal
**When** user reaches 100% on any goal
**Then** "First Victory" achievement unlocks

## Settings

### AC-18: Enable Notifications
**Given** user is on Settings screen
**When** user taps "Enable" for notifications
**Then** browser permission dialog appears
**And** if granted, notifications are enabled
**And** test notification is sent

### AC-19: Set Reminder Time
**Given** notifications are enabled
**When** user changes reminder time
**Then** time is saved
**And** setting persists across sessions

### AC-20: Export Data
**Given** user is on Settings screen
**When** user taps "Export" button
**Then** JSON file downloads
**And** file contains all user data

## Data Persistence

### AC-21: Data Persists
**Given** user has created goals and logged progress
**When** user closes and reopens app
**Then** all data is preserved
**And** goals display correctly
**And** progress history is intact

### AC-22: Storage Schema
**Given** data is stored in localStorage
**Then** data follows typed schema
**And** includes version number for migrations

## Responsive Design

### AC-23: Mobile View
**Given** user views app on mobile device (<640px)
**Then** layout is single column
**And** all elements are touch-friendly
**And** text is readable

### AC-24: Desktop View
**Given** user views app on desktop (≥640px)
**Then** content is centered with max-width
**And** layout adapts appropriately

## Deployment

### AC-25: GitHub Pages
**Given** code is pushed to main branch
**When** CI pipeline completes
**Then** app is deployed to GitHub Pages
**And** app loads at configured URL

### AC-26: Build Success
**Given** all quality gates pass
**Then** production build completes without errors
**And** build artifacts are deployable
