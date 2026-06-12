import type { Page } from '@playwright/test';
import { CommonActions } from '../base/CommonActions';
import type { Account } from '../utils/accountUtil';

export class ExplorePage {
  readonly actions: CommonActions;

  readonly page: Page;

  readonly exploreURL = '/explore';

  readonly clarifaiHomeLogo = '[data-testid="clarifai-logo"]';

  readonly loginBtn = 'button:has-text("Login")';

  readonly signupBtn = 'button:has-text("Sign up")';

  readonly resendEmailBtn = 'button:has-text("Resend Email")';

  readonly exploreTab = '[data-testid="tabsFeaturedExploreLink"]';

  readonly modelsTab = '[data-testid="tabsFeaturedModelsLink"]';

  readonly workflowsTab = '[data-testid="tabsFeaturedWorkflowsLink"]';

  readonly modulesTab = '[data-testid="tabsFeaturedModulesLink"]';

  readonly loginSelectors = {
    emailInput: '[placeholder="Email"]',
    passwordInput: '[placeholder="Password"]',
    signInBtn: '[data-testid="signInButton"]',
  };

  readonly signupSelectors = {
    firstNameInput: '[placeholder="First Name"]',
    lastNameInput: '[placeholder="Last Name"]',
    emailInput: '[placeholder="Email"]',
    passwordInput: '[placeholder="Password"]',
    createAccBtn: 'button:has-text("Create account")',
    consentCheckBtn: '[data-testid="legal-consent"]',
    cookiesConsentBtn: '[id="hs-eu-confirmation-button"]',
  };

  constructor(page: Page) {
    this.page = page;
    this.actions = new CommonActions(this.page);
  }

  async goToHome(): Promise<void> {
    await this.actions.navigateToURL(this.exploreURL);
  }

  async goToLogin(): Promise<void> {
    await this.actions.navigateToURL(this.exploreURL);
    await this.actions.clickElement(this.loginBtn);
  }

  async goToSignup(): Promise<void> {
    await this.actions.navigateToURL(this.exploreURL);
    await this.actions.clickElement(this.signupBtn);
  }

  async goToExplore(): Promise<void> {
    await this.actions.navigateToURL(this.exploreURL);
    await Promise.all([this.page.waitForNavigation(), this.actions.clickElement(this.exploreTab)]);
  }

  async goToModels(): Promise<void> {
    await this.actions.navigateToURL(this.exploreURL);
    await Promise.all([this.page.waitForNavigation(), this.actions.clickElement(this.modelsTab)]);
  }

  async goToWorkflows(): Promise<void> {
    await this.actions.navigateToURL(this.exploreURL);
    await Promise.all([this.page.waitForNavigation(), this.actions.clickElement(this.workflowsTab)]);
  }

  async verifyTabIsPresent(locator: string): Promise<boolean> {
    return this.actions.isVisible(locator);
  }

  async submitSignUpForm(account: Account): Promise<void> {
    await this.actions.enterPasteElementText(this.signupSelectors.firstNameInput, account.firstName);
    await this.actions.enterPasteElementText(this.signupSelectors.lastNameInput, account.lastName);
    await this.actions.enterPasteElementText(this.signupSelectors.emailInput, account.email);
    await this.actions.checkBtnElement(this.signupSelectors.consentCheckBtn, true);
    await this.actions.enterPasteElementText(this.signupSelectors.passwordInput, account.password);
    await this.actions.clickElement(this.signupSelectors.createAccBtn);
    await this.actions.waitForTime(3000);
  }

  async loginToApp(email: string, password: string): Promise<void> {
    await this.actions.enterPasteElementText(this.loginSelectors.emailInput, email);
    await this.actions.enterPasteElementText(this.loginSelectors.passwordInput, password);
    await this.actions.clickElement(this.loginSelectors.signInBtn);
  }
}
