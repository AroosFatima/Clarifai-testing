import { faker } from '@faker-js/faker';
import { Page } from '@playwright/test';
import { CommonActions } from '../base/CommonActions';
import { APPINPUTTYPE, TIMEOUT, WORKFLOWTYPE, TestEnv } from '../helpers/types';
import { userData } from '../helpers/userData';
import { HomePage } from './HomePage';
import { testConfig } from '../config/testConfig';

// eslint-disable-next-line import/no-mutable-exports
export let appId = '';
// eslint-disable-next-line import/no-mutable-exports
export let userId = '';
export class AppPage {
  readonly actions: CommonActions;

  readonly homePage: HomePage;

  readonly page: Page;

  readonly myAppsLink = '[data-testid="headerNavProfile"]';

  readonly firstAppCard = '[data-testid="list-user_apps_page"] > div > a';

  readonly createButton = '[data-testid="navbar"] >> text=Create';

  readonly appIdField = '[placeholder="Enter Unique Identifier"]';

  readonly descriptionField = '[placeholder="Enter Short Description"]';

  readonly imageTypeField = 'label:has-text("Image/Video")';

  readonly textTypeField = 'label:has-text("Text/Document")';

  readonly advanceSetting = 'text=Advanced Settings';

  readonly appModalTestId = 'modal--create_application_dialog';

  readonly appWorkflow1 = 'Universal';

  readonly appWorkflow2 = 'baai-general-embedding-base-en-beta';

  readonly confirmCreateAppButton = '[data-testid="Confirm"]';

  readonly addModelTitle = 'text=Add a model';

  readonly cancelModelButton = '[data-testid="cancel"]';

  readonly searchAppNameField = '[data-testid="listingSearchInput"]';

  readonly blankApp = '.odules__Apps__components__CreateApplication__AppTypeSelector_styles_ts-selectedItem-sjsrjpg';

  constructor(page: Page) {
    this.page = page;
    this.actions = new CommonActions(this.page);
    this.homePage = new HomePage(this.page);
  }

  // eslint-disable-next-line class-methods-use-this
  createRandomAppId() {
    // eslint-disable-next-line no-useless-concat
    appId = `${'Test' + '-' + 'app' + '-'}${faker.person.firstName()}`;
  }

  async goToAppPage() {
    await this.homePage.goToExplore();
    // accept cookie if any
    await this.actions.acceptCookieFunc();
    await this.clickOnMyAppButton();
    await this.page.waitForTimeout(TIMEOUT.SHORT_TIMEOUT);
  }

  async clickOnMyAppButton() {
    await this.actions.waitForElementVisiblity(this.myAppsLink);
    // click on my app button
    await this.actions.clickElement(this.myAppsLink);
    await this.actions.verifyURL('**/apps');
  }

  /*
   *
   *  Create new app
   * @param ( image type or text type)
   *
   * */
  async createApp(inputType = APPINPUTTYPE.IMAGE_TYPE, workflowType?: WORKFLOWTYPE) {
    await this.goToAppPage();
    await this.clickOnCreateAppButton();
    await this.createAppFunc(inputType, workflowType);
    await this.cancelAddModelModal();
    await this.verifyAppNameOnAppPage();
  }

  async exploreAppSettings() {
    await this.page.getByRole('link', { name: 'Settings' }).click();
    await this.page.getByRole('button', { name: 'Create API Key' }).click();
    await this.page.getByRole('button', { name: 'Cancel' }).click();
    await this.page.getByRole('button', { name: 'Add Collaborators' }).click();
    await this.page.getByRole('button', { name: 'Cancel' }).click();
    await this.page.getByTestId('btn-appVisibility').click();
    await this.page.getByLabel('Public').check();
    await this.page.getByLabel('Private').check();
    await this.page.getByRole('button', { name: 'Cancel' }).click();
    // App Templates
    await this.actions.clickElement('.slider');
    await this.page.waitForTimeout(TIMEOUT.SHORT_TIMEOUT);
    await this.actions.clickElement('.slider');
  }

  async deleteApp() {
    await this.page.getByTestId('btn-deleteApp').click();
    await this.page.getByRole('button', { name: 'Cancel' }).click();
    await this.page.getByTestId('btn-deleteApp').click();
    await this.page.getByRole('button', { name: 'Confirm' }).click();
    await this.page.waitForTimeout(TIMEOUT.SHORT_TIMEOUT);
  }

  /*
   *
   *  Check if there is any existing app otherwise create new one
   *
   * */
  async checkIfAppExist() {
    try {
      this.clickOnFirstAppCard();
    } catch {
      await this.clickOnCreateAppButton();
      await this.createAppFunc(APPINPUTTYPE.IMAGE_TYPE);
      //  cancel model popup if any
      await this.cancelAddModelModal();
      //  verify app name
      await this.actions.waitForElementVisiblity(`[data-testid="app-viewer"] >> text=${appId} >> nth=2`);
    }
  }

  async verifyAppNameOnAppPage() {
    await this.actions.waitForElementVisiblity(`.appId >> text=${appId}`);
  }

  async clickOnFirstAppCard() {
    await this.actions.clickElement(this.firstAppCard);
  }

  async getUserIDFromUrl() {
    const currentPageUrl = this.page.url();
    // For example we have a url like this: "https://web-staging.clarifai.com/li3w56bw6k8s1/apps"
    // So first currentPageUrl.split(baseUrl)[1] will divide the url like this: ["","/li3w56bw6k8s1/apps"]
    // lasting .split("/") will  split the  ["","/li3w56bw6k8s1/apps"] into  ["","li3w56bw6k8s1","apps"]
    const testEnv = process.env.ENV as TestEnv;
    const splitedPart = currentPageUrl.split(testConfig[testEnv])[1].split('/');
    // just used 1 index for userid and 2 for appid
    userId = splitedPart[1];
  }

  async getAppIDAndUserIDFromUrl() {
    const currentPageUrl = this.page.url();
    // For example we have a url like this: "https://web-staging.clarifai.com/li3w56bw6k8s1/Testing-app-foo"
    // So first currentPageUrl.split(baseUrl)[1] will divide the url like this: ["","/li3w56bw6k8s1/Testing-app-foo"]
    // lasting .split("/") will  split the  ["","/li3w56bw6k8s1/Testing-app-foo"] into  ["","li3w56bw6k8s1","Testing-app-foo"]
    const testEnv = process.env.ENV as TestEnv;
    const splitedPart = currentPageUrl.split(testConfig[testEnv])[1].split('/');
    // just used 1 index for userid and 2 for appid
    userId = splitedPart[1];
    appId = splitedPart[2];
  }

  async clickOnCreateAppButton() {
    await this.actions.clickElement(this.createButton);
  }

  /*
   *
   *  Creat app function , we separate this function because maybe some other module needs it
   *
   * */

  async createAppFunc(inputType: string, workflowType?: WORKFLOWTYPE) {
    // eslint-disable-next-line no-useless-concat
    appId = `${'Test' + '-' + 'app' + '-'}${faker.person.firstName()}`;
    await this.actions.waitForElementVisiblity(this.blankApp);
    await this.actions.clickElement(this.blankApp);

    await this.actions.waitForElementVisiblity(this.appIdField);
    await this.actions.enterPasteElementText(this.appIdField, appId);
    await this.actions.enterPasteElementText(this.descriptionField, userData.appdesc);

    if (inputType === APPINPUTTYPE.IMAGE_TYPE) {
      // select input type image
      await this.actions.clickElement(this.imageTypeField);
    } else {
      // select input type text
      await this.actions.clickElement(this.textTypeField);
    }
    // click on advance settings
    await this.actions.clickElement(this.advanceSetting);
    await this.page.waitForTimeout(TIMEOUT.SHORT_TIMEOUT);

    if (inputType === APPINPUTTYPE.IMAGE_TYPE) {
      this.actions.clickElement(`[data-testid="${this.appModalTestId}"] button:has-text("${this.appWorkflow1}")`);
    } else {
      this.actions.clickElement(`[data-testid="${this.appModalTestId}"] button:has-text("${this.appWorkflow2}")`);
    }
    await this.page.waitForTimeout(TIMEOUT.SHORT_TIMEOUT);

    if (inputType === APPINPUTTYPE.IMAGE_TYPE) {
      if (workflowType?.changeType === true) {
        //  select one menu
        this.actions.clickElement(`button[role="menuitem"]:has-text("${workflowType.type}")`);
      } else {
        //  select one menu
        this.actions.clickElement(`button[role="menuitem"]:has-text("${this.appWorkflow1}")`);
      }
    } else {
      //  select one menu
      this.actions.clickElement(`button[role="menuitem"]:has-text("${this.appWorkflow2}")`);
    }
    await this.page.waitForTimeout(TIMEOUT.SHORT_TIMEOUT);
    this.actions.clickElement(this.confirmCreateAppButton);
  }

  async cancelAddModelModal() {
    await this.page.waitForTimeout(TIMEOUT.MEDIUM_TIMEOUT);
    await this.actions.waitForElementVisiblity(this.addModelTitle);
    await this.actions.clickElement(this.cancelModelButton);
  }

  async searchAppName() {
    await this.actions.enterPasteElementText(this.searchAppNameField, appId);
    //  verify if app name is visible
    await this.actions.waitForElementVisiblity(`//span[normalize-space()="${appId}"]`);
  }
}
