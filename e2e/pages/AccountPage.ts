import type { Page } from '@playwright/test';
import { generateExternalUser } from '../utils/accountUtil';
import { CommonActions } from '../base/CommonActions';

export class AccountPage {
  readonly actions: CommonActions;

  readonly page: Page;

  readonly accountSettingsUrl = '/settings';

  readonly userIdInput = '[data-testid="modal--onboarding_dialog"] [placeholder="User ID"]';

  readonly countrySelect = 'div[name=country] > button';

  readonly onbCompanyInput = '[data-testid="modal--onboarding_dialog"] [placeholder="Company"]';

  readonly onbJobTitleInput = '[data-testid="modal--onboarding_dialog"] [placeholder="Job Title"]';

  readonly companyInput = '[placeholder="Company"]';

  readonly jobTitleInput = '[placeholder="Job Title"]';

  readonly jobRoleSelect = 'div[name=jobRole] > button';

  readonly goBtn = '[data-testid="modal--onboarding_dialog"] button:has-text("Complete your profile")';

  readonly addNewEmailInput = '[placeholder="Add new email"]';

  readonly addEmailBtn = 'button:has-text("Add Email")';

  readonly deleteAccBtn = '[data-testid="btn-deleteAccount"]';

  readonly changeUserIdBtn = 'button:has-text("Change User id")';

  readonly changeUserIdInput = '[data-testid="modal-Change User-ID-change-user-id-dialog"] [placeholder="Insert ID"]';

  readonly cancelBtn = '[data-testid="modal-Change User-ID-change-user-id-dialog"] button:has-text("Cancel")';

  readonly confirmBtn = '[data-testid="modal-Change User-ID-change-user-id-dialog"] button:has-text("Confirm")';

  readonly updateContactInfoBtn = 'button:has-text("Update Contact Information")';

  readonly firstNameInput = '[placeholder="First Name"]';

  readonly lastNameInput = '[placeholder="Last Name"]';

  constructor(page: Page) {
    this.page = page;
    this.actions = new CommonActions(this.page);
  }

  async goToAccountSettings(): Promise<void> {
    await this.actions.navigateToURL(this.accountSettingsUrl);
  }

  async addEmailAddress(): Promise<string> {
    const emailAddress = generateExternalUser().email;
    await this.actions.enterTypeElementText(this.addNewEmailInput, emailAddress);
    await this.actions.clickElement(this.addEmailBtn);
    return emailAddress;
  }

  async updateUserId(userId: string): Promise<void> {
    await this.actions.clickElement(this.changeUserIdBtn);
    await this.actions.enterPasteElementText(this.changeUserIdInput, userId);
    await this.actions.clickElement(this.confirmBtn);
  }

  async deleteAccount(): Promise<void> {
    await this.actions.clickElement(this.deleteAccBtn);
  }

  async updateContactInfo(): Promise<void> {
    const externalUser = generateExternalUser();
    await this.actions.enterPasteElementText(this.firstNameInput, externalUser.firstName);
    await this.actions.enterPasteElementText(this.lastNameInput, externalUser.lastName);
    await this.actions.enterPasteElementText(this.companyInput, 'SomeCompany');
    await this.actions.enterPasteElementText(this.jobTitleInput, 'DeveOps Engineer');
    await this.selectCountry();
    await this.selectJobRole();
    await this.actions.waitForTime(3000);
    await this.actions.clickElement(this.updateContactInfoBtn);
  }

  async selectJobRole(jobRole = 'Data Science / Machine Learning'): Promise<void> {
    await this.actions.clickElement(this.jobRoleSelect);
    const jobLocator = `button[role="menuitem"]:has-text("${jobRole}")`;
    await this.actions.clickElement(jobLocator);
  }

  async selectCountry(country = 'United States'): Promise<void> {
    await this.actions.clickElement(this.countrySelect);
    const countryLocator = `button[role="menuitem"]:has-text("${country}")`;
    await this.actions.clickElement(countryLocator);
  }

  async submitOnboardingDetails(companyName = 'Clarifai', jobTitle = 'Engineer'): Promise<void> {
    await this.selectCountry();
    await this.actions.enterPasteElementText(this.onbCompanyInput, companyName);
    await this.actions.enterPasteElementText(this.onbJobTitleInput, jobTitle);
    await this.selectJobRole();
    await this.actions.clickElement(this.goBtn);
  }
}
