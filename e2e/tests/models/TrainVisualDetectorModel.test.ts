import { test, expect } from '../../base/BaseTest';

test.use({ storageState: 'e2e/storage-state/clarifaiUser.json' });

test.skip('Train Visual detector model', { tag: ['@models'] }, async ({ modelPage }) => {
  test.setTimeout(2400000);
  await modelPage.trainVisualDetectorModel();
  const isVisible = modelPage.actions.isVisible(modelPage.modelTrainedText);
  expect(isVisible).toBeTruthy();
});
