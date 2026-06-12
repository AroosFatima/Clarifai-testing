import { testConfig } from '../../config/testConfig';
import { test, expect } from '../../base/BaseTest';
import { TestEnv } from '../../helpers/types';

test.describe('Login to App', { tag: ['@community'] }, () => {
  test.use({ storageState: undefined });
  test('Login invalid', async ({ loginPage }) => {
    const ENV = process.env.ENV;
    const testEnv = ENV as TestEnv;
    await loginPage.actions.navigateToURL(`${testConfig[testEnv]}`);
    await loginPage.loginToApp('monsterwir@gmail.com', 'password');
    await loginPage.actions.waitForElementVisiblity('[data-alert-type="error"]');
    const isErrorMsgDisplayed = await loginPage.actions.isMessageDisplayed('Invalid username or password.');
    expect(isErrorMsgDisplayed).toBeTruthy();
  });
});
