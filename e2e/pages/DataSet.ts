import { Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { TIMEOUT } from '../helpers/types';
import { AppPage, appId } from './AppPage';
import { userData } from '../helpers/userData';
import { CommonActions } from '../base/CommonActions';
// eslint-disable-next-line import/no-cycle
import { postInputs } from '../helpers/apiCall/postCall';

// eslint-disable-next-line import/no-mutable-exports
export let datasetName = '';
export class DataSetPage {
  readonly appPage: AppPage;

  readonly page: Page;

  readonly actions: CommonActions;

  readonly sidebarDatasetLink = '[href="/rabiastg/rabia-test/datasets"]';

  readonly datasetText = 'h1:has-text("Datasets")';

  readonly firstDatasetRowLink = '.tr > div:nth-child(1) > a';

  readonly firstDatasetRowDiv = '.tr > div:nth-child(1) > a > div';

  readonly addInputButton = 'text=Upload Inputs';

  readonly createDatasetButton = 'text=Create Dataset';

  readonly nameInputField = '[data-testid="new-dataset-form-id-input"]';

  readonly descriptionInputField = '[data-testid="new-dataset-form-description-input"]';

  readonly addDatasetButton = '[data-testid="appContent"] >> text=Create';

  readonly editNotesBtn = '[data-testid="cfcomp-Card-actionList"] >> text=Edit';

  readonly editDescriptionBtn = '[data-testid="description-edit"]';

  readonly saveBtn = 'text=Save';

  readonly notesTextarea = '[data-testid="markdown-card"] textarea';

  readonly descriptionInput = '[data-testid="field-value-Description"] input';

  readonly successToast = 'text=Dataset Updated.';

  readonly threeDotsBtn = '[data-testid="cfcomp-PageTitleArea-actionList"] button';

  readonly deleteDatasetBtn = '[data-testid="dataset-view-delete-dataset"]';

  constructor(page: Page) {
    this.appPage = new AppPage(page);
    this.page = page;
    this.actions = new CommonActions(page);
  }

  // eslint-disable-next-line class-methods-use-this
  createRandomDatasetName() {
    datasetName = `Test-app-${faker.person.firstName()}-dataset-${faker.person.lastName()}`;
  }

  async addDataset() {
    await this.appPage.searchAppName();
    await this.appPage.clickOnFirstAppCard();
    await this.appPage.verifyAppNameOnAppPage();
    await this.clickOnDataSetSidebarOption();
    // click on create dataset button
    await this.actions.clickElement(this.createDatasetButton);
    await this.addDataSetFunc();
  }

  async addInputs() {
    const images = [userData.IMAGE_URL_1, userData.IMAGE_URL_2];
    const concepts = [userData.CONCEPT_ID_1, userData.CONCEPT_ID_2];
    await this.actions.clickElement(this.addInputButton);
    // post inputs api call
    await postInputs(images, concepts);
  }

  async editNotes() {
    await this.actions.clickElement(this.editNotesBtn);
    await this.actions.clickElement(this.notesTextarea);
    await this.actions.enterTypeElementText(this.notesTextarea, 'Edited');
    await this.actions.clickElement(this.saveBtn);
    await this.actions.isVisible(this.successToast);
  }

  async editDescription() {
    await this.actions.clickElement(this.editDescriptionBtn);
    await this.actions.clickElement(this.descriptionInput);
    await this.actions.enterTypeElementText(this.descriptionInput, 'Edited');
    await this.actions.clickElement(this.saveBtn);
  }

  async changeImage() {
    await this.page.waitForTimeout(TIMEOUT.SHORT_TIMEOUT);
    await this.page.locator('input[type="file"]').setInputFiles('D:/clarifai-web/e2e/helpers/assets/puppy.jpeg');
  }

  async deleteDataset() {
    await this.page.locator(this.threeDotsBtn).nth(4).click();
    await this.page.locator(this.deleteDatasetBtn).click();
    await this.page.waitForURL(`https://web-staging.clarifai.com/rabiastg/${appId}/datasets`);
  }

  /*
   *
   *  add dataset function , maybe some other module needs it so we make it separate
   *
   * */
  async addDataSetFunc() {
    // verify we are on  create dataset page
    // dataset name input field verification
    await this.actions.waitForElementVisiblity(this.nameInputField);

    datasetName = await this.page.locator(this.nameInputField).inputValue();

    await this.actions.enterPasteElementText(this.descriptionInputField, userData.dataSetDesText);
    await this.actions.clickElement(this.addDatasetButton);
    await this.actions.waitForElementVisiblity(this.addInputButton);
  }

  //   async clickOnViewDatasets() {
  //     await this.basePage.clickOnElement(
  //       this.page.getByRole(Selectors.button, Selectors.viewDataSetText)
  //     );
  //   }

  async clickOnDataSetSidebarOption() {
    await this.actions.clickElement(this.sidebarDatasetLink);
  }

  /*
   *
   *  Select first dataset from the table
   *
   * */
  async selectSpecificDataset() {
    // verify that we are on view  Dataset page
    await this.actions.waitForElementVisiblity(this.datasetText);

    await this.page.waitForTimeout(TIMEOUT.SHORT_TIMEOUT);
    datasetName = (await this.page.locator(this.firstDatasetRowDiv).first().textContent()) as string;

    //  click on first dataset on the table
    await this.actions.clickElement(this.firstDatasetRowLink);
    await this.actions.waitForElementVisiblity(this.addInputButton);
  }

  /*
   *
   *  Check if there is any existing dataset otherwise create new one
   *
   * */
  async checkIfDataSetExist() {
    await this.clickOnDataSetSidebarOption();
    //  checking if we are on dataset page
    await this.actions.verifyURL('**/datasets');
    await this.actions.waitForElementVisiblity(this.datasetText);
    await this.page.waitForTimeout(TIMEOUT.SHORT_TIMEOUT);
    // checking if any dataset is available
    // if yes then click on it
    // otherwise create new dataset
    if (await this.page.isVisible(this.firstDatasetRowLink)) {
      await this.selectSpecificDataset();
    } else {
      // click on create dataset button
      await this.actions.clickElement(this.createDatasetButton);
      await this.addDataSetFunc();
    }
  }
}
