import { appId } from '../../pages/AppPage';
import { test, expect } from '../../base/BaseTest';
import { createNewApp, createNewDataset, addDatabaseVersion } from '../../helpers/apiCall/postCall';

test.describe('@datasets Datasets', () => {
  test.use({ storageState: 'e2e/storage-state/clarifaiUser.json' });

  test('Create and Edit Dataset', async ({ page, appPage, datasetPage }) => {
    await appPage.createApp();
    expect(appPage.actions.isVisible(`[data-testid="app-viewer"] >> text=${appId} >> nth=2`)).toBeTruthy();
    await appPage.goToAppPage();
    // Create New Dataset
    await datasetPage.createRandomDatasetName();
    await page.reload();
    await appPage.searchAppName();
    await appPage.clickOnFirstAppCard();
    await appPage.verifyAppNameOnAppPage();
    // // Open dataset from sidebar
    await datasetPage.clickOnDataSetSidebarOption();
    // await datasetPage.selectSpecificDataset();
    // Add Inputs
    // await datasetPage.addInputs();
    // // Open dataset from sidebar
    // await datasetPage.clickOnDataSetSidebarOption();
    // await datasetPage.selectSpecificDataset();
    // // Edit Notes
    // await datasetPage.editNotes();
    // // Edit Description
    // await datasetPage.editDescription();
    // // Change Image
    // await datasetPage.changeImage();
    // // Delete Dataset
    // await datasetPage.deleteDataset();
  });
});
