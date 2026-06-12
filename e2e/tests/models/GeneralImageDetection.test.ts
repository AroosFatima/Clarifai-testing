import { test, expect } from '../../base/BaseTest';

test.use({ storageState: 'e2e/storage-state/clarifaiUser.json' });

test('Detect image detection', { tag: ['@models'] }, async ({ modelPage }) => {
  await modelPage.generalImageDetection();
  const isVisible = modelPage.actions.isVisible(modelPage.dogImageDetection);
  expect(isVisible).toBeTruthy();
});
