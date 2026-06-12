import { test, expect } from '../../base/BaseTest';

test.use({ storageState: 'e2e/storage-state/clarifaiUser.json' });

test('@workflow - Change base workflow', { tag: ['@workflow'] }, async ({ workflowPage }) => {
  await workflowPage.changeBaseWorkflow();
  expect(workflowPage.actions.isVisible(workflowPage.baseWorkflowUpdatedMessage)).toBeTruthy();
});
