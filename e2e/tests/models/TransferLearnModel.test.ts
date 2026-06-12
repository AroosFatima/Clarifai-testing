import { test, expect } from '../../base/BaseTest';

test.use({ storageState: 'e2e/storage-state/clarifaiUser.json' });

test.skip('Train Transfer learn model', { tag: ['@models'] }, async ({ modelPage }) => {
  await modelPage.trainTransferLearnModel();
  const isVisible = modelPage.actions.isVisible(modelPage.modelTrainedText);
  expect(isVisible).toBeTruthy();
});
