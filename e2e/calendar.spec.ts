import { test, expect } from '@playwright/test';

test.describe('Calendar View', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage and create a goal
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    // Create a goal
    await page.click('[data-testid="add-goal-button"]');
    await page.fill('[data-testid="goal-title-input"]', 'Test Goal');
    await page.fill('[data-testid="goal-target-input"]', '5');
    await page.click('[data-testid="save-goal-button"]');

    // Close achievement popup if visible
    const celebration = page.getByTestId('achievement-celebration');
    if (await celebration.isVisible()) {
      await celebration.click();
    }
  });

  test('should display calendar when goal is selected', async ({ page }) => {
    // Navigate to calendar
    await page.click('text=Calendar');

    // Select the goal
    await page.click('text=Test Goal');

    // Calendar should be visible
    await expect(page.getByTestId('calendar')).toBeVisible();
  });

  test('should show correct status colors based on progress', async ({ page }) => {
    // Add some progress first (tap +1 multiple times to reach different percentages)
    await page.click('[data-testid="add-progress-button"]');
    await page.click('[data-testid="add-progress-button"]');
    await page.click('[data-testid="add-progress-button"]');

    // Wait for the UI to update
    await page.waitForTimeout(500);

    // Navigate to calendar
    await page.click('text=Calendar');

    // Select the goal
    await page.click('text=Test Goal');

    // Get today's date using local time (same as the app does)
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const today = `${year}-${month}-${day}`;

    // Check that today has a status color (should be yellow at 60%)
    const todayCell = page.getByTestId(`calendar-day-${today}`);
    await expect(todayCell).toBeVisible();

    // The cell should have yellow status (60% = 3/5)
    const status = await todayCell.getAttribute('data-status');
    expect(status).toBe('yellow');
  });

  test('should allow editing progress from calendar', async ({ page }) => {
    // Navigate to calendar
    await page.click('text=Calendar');

    // Select the goal
    await page.click('text=Test Goal');

    // Get today's date using local time
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const today = `${year}-${month}-${day}`;

    // Click on today's cell
    await page.click(`[data-testid="calendar-day-${today}"]`);

    // Edit dialog should appear
    await expect(page.getByTestId('edit-progress-input')).toBeVisible();

    // Set progress to 5 (100%)
    await page.fill('[data-testid="edit-progress-input"]', '5');
    await page.click('[data-testid="save-progress-button"]');

    // Wait for dialog to close and calendar to update
    await page.waitForTimeout(300);

    // Check that the status is now green
    const todayCell = page.getByTestId(`calendar-day-${today}`);
    const status = await todayCell.getAttribute('data-status');
    expect(status).toBe('green');
  });

  test('should navigate between months', async ({ page }) => {
    // Navigate to calendar
    await page.click('text=Calendar');

    // Select the goal
    await page.click('text=Test Goal');

    // Wait for calendar to load
    await expect(page.getByTestId('calendar')).toBeVisible();

    // Click previous month button
    await page.click('button:has-text("←")');

    // Wait for navigation
    await page.waitForTimeout(200);

    // Click next month twice to go forward
    await page.click('button:has-text("→")');
    await page.waitForTimeout(200);
    await page.click('button:has-text("→")');

    // Verify calendar is still visible (navigation worked)
    await expect(page.getByTestId('calendar')).toBeVisible();
  });
});
