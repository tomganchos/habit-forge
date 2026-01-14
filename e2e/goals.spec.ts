import { test, expect } from '@playwright/test';

test.describe('Goal Management', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('should create a new goal', async ({ page }) => {
    await page.goto('/');

    // Click add goal button
    await page.click('[data-testid="add-goal-button"]');

    // Fill in goal form
    await page.fill('[data-testid="goal-title-input"]', 'Exercise');
    await page.fill('[data-testid="goal-target-input"]', '5');

    // Save goal
    await page.click('[data-testid="save-goal-button"]');

    // Verify goal appears in list
    await expect(page.getByTestId('goal-card')).toBeVisible();
    await expect(page.getByText('Exercise')).toBeVisible();

    // Achievement celebration should appear
    await expect(page.getByTestId('achievement-celebration')).toBeVisible();
  });

  test('should add progress to a goal', async ({ page }) => {
    // Create a goal first
    await page.goto('/');
    await page.click('[data-testid="add-goal-button"]');
    await page.fill('[data-testid="goal-title-input"]', 'Read');
    await page.fill('[data-testid="goal-target-input"]', '10');
    await page.click('[data-testid="save-goal-button"]');

    // Close achievement popup if visible
    const celebration = page.getByTestId('achievement-celebration');
    if (await celebration.isVisible()) {
      await celebration.click();
    }

    // Wait for the goal card to be visible
    await expect(page.getByTestId('goal-card')).toBeVisible();

    // Add progress
    await page.click('[data-testid="add-progress-button"]');

    // Verify progress updated
    await expect(page.getByText('1 / 10')).toBeVisible();
    await expect(page.getByText('10%')).toBeVisible();
  });

  test('should edit an existing goal', async ({ page }) => {
    // Create a goal first
    await page.goto('/');
    await page.click('[data-testid="add-goal-button"]');
    await page.fill('[data-testid="goal-title-input"]', 'Meditate');
    await page.fill('[data-testid="goal-target-input"]', '15');
    await page.click('[data-testid="save-goal-button"]');

    // Close achievement popup if visible
    const celebration = page.getByTestId('achievement-celebration');
    if (await celebration.isVisible()) {
      await celebration.click();
    }

    // Click on goal to edit
    await page.click('text=Meditate');

    // Edit the title
    await page.fill('[data-testid="goal-title-input"]', 'Daily Meditation');
    await page.click('[data-testid="save-goal-button"]');

    // Verify updated title
    await expect(page.getByText('Daily Meditation')).toBeVisible();
  });
});
