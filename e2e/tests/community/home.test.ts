import { test, expect } from '../../base/BaseTest';

test.describe('Explore Page', { tag: ['@community'] }, () => {
  test('Explore tabs exist', async ({ homePage }) => {
    await homePage.goToHome();
    expect(await homePage.verifyTabIsPresent(homePage.exploreTab)).toBeTruthy();
    expect(await homePage.verifyTabIsPresent(homePage.modelsTab)).toBeTruthy();
    expect(await homePage.verifyTabIsPresent(homePage.workflowsTab)).toBeTruthy();
    expect(await homePage.verifyTabIsPresent(homePage.modulesTab)).toBeTruthy();
  });

  test('Navigate from home page to other pages', async ({ page, homePage }) => {
    await homePage.goToHome();
    await expect(page).toHaveURL(/explore/);
    await homePage.goToExplore();
    await expect(page).toHaveURL(/explore/);
    await homePage.goToModels();
    await expect(page).toHaveURL(/models/);
    await homePage.goToWorkflows();
    await expect(page).toHaveURL(/workflows/);
  });
});
