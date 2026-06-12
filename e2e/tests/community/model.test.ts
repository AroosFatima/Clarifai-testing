import { test, expect } from '../../base/BaseTest';

test.describe('Model Lifecycle', () => {
  test('Can search and view models', { tag: ['@community'] }, async ({ page, homePage }) => {
    await homePage.goToHome();
    await homePage.goToModels();
    await expect(page).toHaveURL(/models/);
  });
});
