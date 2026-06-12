import type { Page } from '@playwright/test';
import { CommonActions } from '../base/CommonActions';

export class LoginPage {
  readonly actions: CommonActions;

  readonly page: Page;

  readonly emailInput = '[placeholder="Email"]';

  readonly passwordInput = '[placeholder="Password"]';

  readonly signInBtn = '[data-testid="signInButton"]';

  readonly loginNavbarButton = 'text=Log in';

  constructor(page: Page) {
    this.page = page;
    this.actions = new CommonActions(this.page);
  }

  async loginToApp(email: string, password: string): Promise<void> {
    await this.actions.clickElement(this.loginNavbarButton);
    await this.actions.enterPasteElementText(this.emailInput, email);
    await this.actions.enterPasteElementText(this.passwordInput, password);
    await this.actions.clickElement(this.signInBtn);
  }
}
