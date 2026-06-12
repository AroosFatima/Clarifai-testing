import { appId } from '../../pages/AppPage';
import { test, expect } from '../../base/BaseTest';
import { createNewApp, createNewDataset, addDatabaseVersion } from '../../helpers/apiCall/postCall';

test.use({ storageState: 'e2e/storage-state/clarifaiUser.json' });

test('@userJourney - User Journey Path A', async ({ page, appPage, modelPage }:any) => {
  await appPage.goToAppPage();
  await appPage.getUserIDFromUrl();
  await appPage.createRandomAppId();
  await createNewApp();
  expect(appPage.actions.isVisible(`[data-testid="app-viewer"] >> text=${appId} >> nth=2`)).toBeTruthy();
});
