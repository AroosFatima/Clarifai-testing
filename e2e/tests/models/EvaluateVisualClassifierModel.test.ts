import { test, expect } from '../../base/BaseTest';

test.use({ storageState: 'e2e/storage-state/clarifaiUser.json' });

test.skip('Evaluate visual classifier model', { tag: ['@models'] }, async ({ modelPage }) => {
  test.setTimeout(2400000);
  await modelPage.trainVisualClassifierModel();
  expect(modelPage.actions.isVisible(modelPage.modelTrainedText)).toBeTruthy();
  await modelPage.evaluateVisualClassifierModel();
});
