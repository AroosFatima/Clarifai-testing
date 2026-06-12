import { chromium, webkit, firefox, FullConfig, Browser, expect } from '@playwright/test';
import { testConfig } from '../config/testConfig';
import { LoginPage } from '../pages/LoginPage';
import { userData } from '../helpers/userData';
import { AppPage } from '../pages/AppPage';

const clarifaiUserStorageStatePath = testConfig.clarifaiUserStorageStatePath;
// const externalUserStorageStatePath = testConfig.externalUserStorageStatePath;

// const cleanUpAllureDir = async (): Promise<void> => {
//   rmdir('./storage-state', { recursive: true }, (error) => {
//     if (error) {
//       console.log(error.message);
//     } else {
//       console.log('Directory: allure-results deleted!');
//     }
//   });
// };

const globalSetup = async (config: FullConfig): Promise<void> => {
  const { baseURL, browserName, channel, headless } = config.projects[0].use;

  // await cleanUpAllureDir();
  let browser: Browser;
  switch (browserName) {
    case 'chromium':
      browser = await chromium.launch({ channel, headless });
      break;
    case 'firefox':
      browser = await firefox.launch({ channel, headless });
      break;
    case 'webkit':
      browser = await webkit.launch({ channel, headless });
      break;
    default:
      throw new Error('Browser configuration not found in playwright.config.ts');
  }

  // const clarifaiUser = generateInternalUser();
  // await signupAndSaveAuthState(browser, baseURL, clarifaiUser, clarifaiUserStorageStatePath);

  // const externalUser = generateExternalUser();
  // await signupAndSaveAuthState(browser, baseURL, externalUser, externalUserStorageStatePath);

  await signInAndSaveAuthState(browser, baseURL, clarifaiUserStorageStatePath);
  await browser.close();
};

// let signupAndSaveAuthState = async (browser: Browser, baseURL: string, account: Account, storagePath: string): Promise<void> => {
//   const page = await browser.newPage({ viewport: { width: 1630, height: 900 } });
//   const signupPage = new SignupPage(page);
//   const accountPage = new AccountPage(page);
//   await signupPage.actions.navigateToURL(`${baseURL}/signup`);
//   await signupPage.submitSignUpForm(account);
//   const key = await checkEmailInbox(account.email).then((emails) => {
//     return getVerifyEmailKeyFromEmail(emails[0]);
//   });
//   await signupPage.actions.navigateToURL(`${baseURL}/verify-email?key=${key}`);
//   await accountPage.submitOnboardingDetails();
//   const isContactUpdated = await accountPage.actions.isMessageDisplayed('Contact information updated');
//   expect(isContactUpdated).toBeTruthy();
//   await page.context().storageState({ path: storagePath });
//   console.log(`Authenticated storage state saved at ${storagePath}`);
// };

let signInAndSaveAuthState = async (browser: Browser, baseURL: string | undefined, storagePath: string): Promise<void> => {
  const page = await browser.newPage({ viewport: { width: 1630, height: 900 } });
  const loginPage = new LoginPage(page);
  const appPage = new AppPage(page);
  await loginPage.actions.navigateToURL(`${baseURL}`);

  await loginPage.loginToApp('rabia.ali+playwright@clarifai.com', 'Rabia@12345');

  await loginPage.actions.waitForTime(3000);
  await appPage.actions.waitForElementVisiblity(appPage.myAppsLink);
  expect(appPage.actions.isVisible(appPage.myAppsLink)).toBeTruthy();
  await page.context().storageState({ path: storagePath });
  console.log(`Authenticated storage state saved at ${storagePath}`);
};

export default globalSetup;
