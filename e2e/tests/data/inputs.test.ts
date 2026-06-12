import { test, expect } from '../../base/BaseTest';
import { INPUT_TYPES } from '../../helpers/types';

test.describe('Input Lifecycle', { tag: ['@data'] }, () => {
  test.use({ storageState: 'e2e/storage-state/clarifaiUser.json' });

  test('Add input by upload locally', async ({ inputPage }) => {
    await inputPage.addInput(INPUT_TYPES.FILES);
    expect(inputPage.actions.isVisible(inputPage.completedOneFile)).toBeTruthy();
  });

  test('Add input by text', async ({ inputPage }) => {
    await inputPage.addInput(INPUT_TYPES.TEXT);
    expect(inputPage.actions.isVisible(inputPage.completedOneFile)).toBeTruthy();
  });

  test('Add input by url', async ({ inputPage }) => {
    await inputPage.addInput(INPUT_TYPES.URL);
    expect(inputPage.actions.isVisible(inputPage.completedOneFile)).toBeTruthy();
  });

  test('Add input to a specific dataset', async ({ inputPage, datasetPage }) => {
    await datasetPage.addDataset();
    await inputPage.addInputToSpecificDataset();
    expect(inputPage.actions.isVisible(inputPage.addInputToDatasetText)).toBeTruthy();
  });
});
