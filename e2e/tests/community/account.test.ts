import { test, expect } from '../../base/BaseTest';
import { testConfig } from '../../config/testConfig';

test.describe('Update Account Settings Information', { tag: ['@community'] }, () => {
  test.use({ storageState: testConfig.clarifaiUserStorageStatePath });
  test('Edit profile settings details', async ({ accountPage }) => {
    await accountPage.goToAccountSettings();
    await accountPage.updateContactInfo();

    await accountPage.actions.waitForElementVisiblity('text=Contact information updated');
    const isContactUpdated = await accountPage.actions.isMessageDisplayed('Contact information updated');
    expect(isContactUpdated).toBeTruthy();

    await accountPage.addEmailAddress();
    await accountPage.actions.waitForElementVisiblity('text=Email Added');
    const isEmailAdded = await accountPage.actions.isMessageDisplayed('Email Added');
    expect(isEmailAdded).toBeTruthy();

    /* To be updated once email server is setupped */
    // const emailMsg = await checkEmailInbox(email);
    // expect(emailMsg).not.toBeNull();
  });
});
