import { test, expect } from '@playwright/test';

test.describe('Achievements', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('should unlock "Getting Started" achievement on first goal', async ({ page }) => {
    await page.goto('/');

    // Create first goal
    await page.click('[data-testid="add-goal-button"]');
    await page.fill('[data-testid="goal-title-input"]', 'First Goal');
    await page.fill('[data-testid="goal-target-input"]', '1');
    await page.click('[data-testid="save-goal-button"]');

    // Achievement celebration should appear
    await expect(page.getByTestId('achievement-celebration')).toBeVisible();
    await expect(page.getByText('Getting Started')).toBeVisible();
  });

  test('should unlock "First Victory" achievement on 100% completion', async ({ page }) => {
    await page.goto('/');

    // Create a goal with target 1
    await page.click('[data-testid="add-goal-button"]');
    await page.fill('[data-testid="goal-title-input"]', 'Quick Win');
    await page.fill('[data-testid="goal-target-input"]', '1');
    await page.click('[data-testid="save-goal-button"]');

    // Close first achievement popup
    await page.click('[data-testid="achievement-celebration"]');

    // Complete the goal
    await page.click('[data-testid="add-progress-button"]');

    // First Victory achievement should trigger
    await expect(page.getByTestId('achievement-celebration')).toBeVisible();
    await expect(page.getByText('First Victory')).toBeVisible();
  });

  test('should display achievements in Trophies screen', async ({ page }) => {
    await page.goto('/');

    // Navigate to achievements
    await page.click('text=Trophies');

    // Should see all achievements
    await expect(page.getByTestId('achievement-first_goal')).toBeVisible();
    await expect(page.getByTestId('achievement-first_completion')).toBeVisible();
    await expect(page.getByTestId('achievement-streak_3')).toBeVisible();
    await expect(page.getByTestId('achievement-streak_7')).toBeVisible();
    await expect(page.getByTestId('achievement-streak_30')).toBeVisible();
    await expect(page.getByTestId('achievement-perfect_week')).toBeVisible();
    await expect(page.getByTestId('achievement-overachiever')).toBeVisible();

    // All should be locked initially
    const firstGoal = page.getByTestId('achievement-first_goal');
    await expect(firstGoal).toHaveAttribute('data-unlocked', 'false');
  });

  test('should show unlocked achievement in Trophies screen after earning it', async ({
    page,
  }) => {
    await page.goto('/');

    // Create first goal to earn "Getting Started"
    await page.click('[data-testid="add-goal-button"]');
    await page.fill('[data-testid="goal-title-input"]', 'Test');
    await page.fill('[data-testid="goal-target-input"]', '1');
    await page.click('[data-testid="save-goal-button"]');

    // Close achievement popup
    await page.click('[data-testid="achievement-celebration"]');

    // Navigate to achievements
    await page.click('text=Trophies');

    // "Getting Started" should now be unlocked
    const firstGoal = page.getByTestId('achievement-first_goal');
    await expect(firstGoal).toHaveAttribute('data-unlocked', 'true');
  });

  test('should unlock "Overachiever" at 200% progress', async ({ page }) => {
    await page.goto('/');

    // Create a goal with target 1
    await page.click('[data-testid="add-goal-button"]');
    await page.fill('[data-testid="goal-title-input"]', 'Overachieve');
    await page.fill('[data-testid="goal-target-input"]', '1');
    await page.click('[data-testid="save-goal-button"]');

    // Close "Getting Started" achievement
    await page.click('[data-testid="achievement-celebration"]');

    // Add progress to reach 100%
    await page.click('[data-testid="add-progress-button"]');

    // Close "First Victory" achievement
    await page.click('[data-testid="achievement-celebration"]');

    // Add more progress to reach 200%
    await page.click('[data-testid="add-progress-button"]');

    // "Overachiever" achievement should trigger
    await expect(page.getByTestId('achievement-celebration')).toBeVisible();
    await expect(page.getByText('Overachiever')).toBeVisible();
  });
});
