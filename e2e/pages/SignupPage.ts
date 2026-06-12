import type { Page } from '@playwright/test';
import type { Account } from '../utils/accountUtil';
import { CommonActions } from '../base/CommonActions';

export class SignupPage {
  readonly actions: CommonActions;

  readonly page: Page;

  readonly signupUrl = '/signup';

  readonly firstNameInput = '[placeholder="First Name"]';

  readonly lastNameInput = '[placeholder="Last Name"]';

  readonly emailInput = '[placeholder="Email"]';

  readonly passwordInput = '[placeholder="Password"]';

  readonly createAccBtn = 'button:has-text("Create account")';

  readonly consentCheckBtn = '[data-testid="legal-consent"]';

  readonly cookiesConsentBtn = '[id="hs-eu-confirmation-button"]';

  readonly captchaIframe = '[title="reCAPTCHA"]';

  readonly captchaCheckBtn = '[id="recaptcha-anchor"]';

  constructor(page: Page) {
    this.page = page;
    this.actions = new CommonActions(this.page);
  }

  async checkCaptacha(): Promise<void> {
    const locatorOnFrame = await this.page.frameLocator(this.captchaIframe).locator(this.captchaCheckBtn);
    await locatorOnFrame.click();
  }

  async submitSignUpForm(account: Account): Promise<void> {
    await this.actions.enterPasteElementText(this.firstNameInput, account.firstName);
    await this.actions.enterPasteElementText(this.lastNameInput, account.lastName);
    await this.actions.enterPasteElementText(this.emailInput, account.email);
    await this.checkCaptacha();
    await this.actions.waitForTime(3000);
    await this.actions.checkBtnElement(this.consentCheckBtn, true);
    await this.actions.enterPasteElementText(this.passwordInput, account.password);
    await this.actions.waitForTime(1000);
    await this.actions.clickElement(this.createAccBtn);
  }
}
