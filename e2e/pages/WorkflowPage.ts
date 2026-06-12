import { Page } from '@playwright/test';
import { TIMEOUT } from '../helpers/types';
import { AppPage } from './AppPage';
import { CommonActions } from '../base/CommonActions';

export class WorkflowPage {
  readonly appPage: AppPage;

  readonly page: Page;

  readonly actions: CommonActions;

  readonly sidebarSettingsLink = '[data-testid="appSidebarDesktop"] >> text=Settings';

  readonly baseWorkflowText = 'text=Base Workflow';

  readonly selectedBaseWorkflowButton = '[name="selectedBaseWorkflow"] > button';

  readonly workflowDropdown = '[role="menu"] > div > button';

  readonly changeWorkflowButton = 'text=Change Base Workflow';

  readonly consentCheckbox = '[data-testid="consentCheckbox"]';

  readonly baseWorkflowUpdatedMessage = 'text=Base Workflow updated!';

  constructor(page: Page) {
    this.appPage = new AppPage(page);
    this.page = page;
    this.actions = new CommonActions(page);
  }

  async changeBaseWorkflow() {
    await this.appPage.goToAppPage();
    await this.appPage.checkIfAppExist();
    await this.actions.waitForElementVisiblity(this.sidebarSettingsLink);
    await this.page.waitForTimeout(TIMEOUT.SHORT_TIMEOUT);
    // click on setting sidebar option
    await this.actions.clickElement(this.sidebarSettingsLink);
    await this.actions.verifyURL('**/settings');
    await this.actions.waitForElementVisiblity(this.baseWorkflowText);
    await this.actions.clickElement(this.selectedBaseWorkflowButton);
    await this.page.waitForTimeout(TIMEOUT.SHORT_TIMEOUT);
    const totalWorkflowCount = await this.page.locator(this.workflowDropdown).count();
    const randomIndex = Math.floor(Math.random() * totalWorkflowCount);
    // select random workflow from dropdown
    await this.actions.clickElement(this.workflowDropdown, randomIndex);
    // check if agree checkbox is visible
    if (await this.page.isVisible(this.consentCheckbox)) {
      await this.actions.clickElement(this.consentCheckbox);
    }
    await this.actions.clickElement(this.changeWorkflowButton);
    //   verify worflow updated
    await this.actions.waitForElementVisiblity(this.baseWorkflowUpdatedMessage);
  }
}
