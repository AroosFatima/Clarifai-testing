import { appId } from '../../pages/AppPage';
import { test, expect } from '../../base/BaseTest';

test.describe('App Lifecycle', { tag: ['@community'] }, () => {
  test.use({ storageState: 'e2e/storage-state/clarifaiUser.json' });

  test('create and delete a new app', async ({ appPage }) => {
    await appPage.createApp();
    await appPage.exploreAppSettings();
    expect(appPage.actions.isVisible(`[data-testid="app-viewer"] >> text=${appId} >> nth=2`)).toBeTruthy();

    await appPage.deleteApp();
    expect(appPage.actions.verifyURL('**/apps')).toBeTruthy();
  });
});
