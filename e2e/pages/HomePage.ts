import type { Page } from '@playwright/test';
import { CommonActions } from '../base/CommonActions';

export class HomePage {
  readonly actions: CommonActions;

  readonly page: Page;

  readonly homeUrl = '/explore';

  readonly clarifaiHomeLogo = '[data-testid="clarifai-logo"]';

  readonly loginBtn = 'button:has-text("Login")';

  readonly signupBtn = 'button:has-text("Sign up")';

  readonly exploreTab = '[data-testid="tabsFeaturedExploreLink"]';

  readonly modelsTab = '[data-testid="tabsFeaturedModelsLink"]';

  readonly workflowsTab = '[data-testid="tabsFeaturedWorkflowsLink"]';

  readonly modulesTab = '[data-testid="tabsFeaturedModulesLink"]';

  readonly avatarButton = '[data-testid="avatar-badge"]';

  constructor(page: Page) {
    this.page = page;
    this.actions = new CommonActions(this.page);
  }

  async goToHome(): Promise<void> {
    await this.actions.navigateToURL(this.homeUrl);
  }

  async goToLogin(): Promise<void> {
    await this.actions.navigateToURL(this.homeUrl);
    await this.actions.clickElement(this.loginBtn);
  }

  async goToSignup(): Promise<void> {
    await this.actions.navigateToURL(this.homeUrl);
    await this.actions.clickElement(this.signupBtn);
  }

  async goToExplore(): Promise<void> {
    await this.actions.navigateToURL(this.homeUrl);
    await Promise.all([this.page.waitForURL(this.homeUrl), this.actions.clickElement(this.exploreTab)]);
  }

  async goToModels(): Promise<void> {
    await this.actions.navigateToURL(this.homeUrl);
    await Promise.all([this.page.waitForURL(this.homeUrl), this.actions.clickElement(this.modelsTab)]);
  }

  async goToWorkflows(): Promise<void> {
    await this.actions.navigateToURL(this.homeUrl);
    await Promise.all([this.page.waitForURL(this.homeUrl), this.actions.clickElement(this.workflowsTab)]);
  }

  async verifyTabIsPresent(locator: string): Promise<boolean> {
    return this.actions.isVisible(locator);
  }
}
