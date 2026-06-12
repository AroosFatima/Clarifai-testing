import { Page } from '@playwright/test';
import { INPUT_TYPES, TIMEOUT } from '../helpers/types';
import { AppPage } from './AppPage';
import { userData } from '../helpers/userData';
import { datasetName } from './DataSet';
import { CommonActions } from '../base/CommonActions';

export class InputPage {
  readonly actions: CommonActions;

  readonly appPage: AppPage;

  readonly page: Page;

  readonly sidebarInputLink = '[data-testid="appSidebarDesktop"] >> text=Inputs';

  readonly inputPageUrl = '**/inputs?addInputs=&datasetId=';

  readonly uploadInputsButton = 'text=Upload Inputs';

  readonly metroImage = 'e2e/helpers/files/metro-north.jpg';

  readonly removeInputButton = 'text=Remove inputs';

  readonly inputTextField = 'textarea[name="text"]';

  readonly inputUrlField = 'textarea[name="urls"]';

  readonly allowDuplicateUrlToggle = 'label[role="presentation"]:has-text("Allow duplicate URLs")';

  readonly uploaderButton = '[data-testid="uploader-button"]';

  readonly completeText = '.title';

  readonly inputImageGrid = '[data-testid="grid-thumbnail"]';

  readonly inputGridImageCheckbox = '[data-testid="select-checkbox"]';

  readonly moveDatasetButton = '[data-testid="toolbar-movedataset-btn"]';

  readonly selectDatasetField = '[placeholder="Select Datasets"]';

  readonly addInput1Button = 'text=Add 1 inputs';

  readonly addInputToDatasetText = 'text=Adding inputs to dataset...';

  readonly completedOneFile = 'text=1 File';

  constructor(page: Page) {
    this.actions = new CommonActions(page);
    this.appPage = new AppPage(page);
    this.page = page;
  }

  async addInput(inputType: INPUT_TYPES) {
    await this.appPage.goToAppPage();
    await this.appPage.checkIfAppExist();
    await this.clickOnInputSidebarOption();
    await this.actions.verifyURL(this.inputPageUrl);
    await this.clickOnUploadInputButton();

    await this.addInputFunc(inputType);
  }

  /*
   *
   *  add Input function , maybe some other module needs it so we make it separate
   *
   * */
  async addInputFunc(inputType: INPUT_TYPES = INPUT_TYPES.FILES) {
    await this.page.waitForTimeout(TIMEOUT.SHORT_TIMEOUT);

    if (inputType === INPUT_TYPES.FILES) {
      // select input files tab
      await this.actions.clickElement(`[data-testid="tab-${INPUT_TYPES.FILES}"]`);

      await this.actions.selectFileToUpload('button > input[type="file"]', this.metroImage);
      // verify file is selected
      await this.actions.waitForElementVisiblity(this.removeInputButton);
    } else if (inputType === INPUT_TYPES.TEXT) {
      // select input text tab
      await this.actions.clickElement(`[data-testid="tab-${INPUT_TYPES.TEXT}"]`);
      await this.actions.enterPasteElementText(this.inputTextField, 'Testing');
    } else {
      // select input url tab
      await this.actions.clickElement(`[data-testid="tab-${INPUT_TYPES.URL}"]`);
      await this.actions.enterPasteElementText(this.inputUrlField, userData.IMAGE_URL_1);
      await this.actions.clickElement(this.allowDuplicateUrlToggle);
    }

    // click on upload input button
    await this.actions.clickElement(this.uploaderButton);
    await this.page.waitForTimeout(TIMEOUT.SHORT_TIMEOUT);
  }

  async clickOnInputSidebarOption() {
    await this.actions.clickElement(this.sidebarInputLink);
  }

  async clickOnUploadInputButton() {
    await this.actions.clickElement(this.uploadInputsButton);
  }

  // add input to specific dataset
  async addInputToSpecificDataset() {
    await this.page.waitForTimeout(TIMEOUT.SHORT_TIMEOUT);
    await this.clickOnInputSidebarOption();
    await this.actions.verifyURL(this.inputPageUrl);
    await this.actions.hoverOnElement(this.inputImageGrid, 0);
    await this.actions.checkBtnElement(this.inputGridImageCheckbox);
    await this.actions.clickElement(this.moveDatasetButton);
    await this.actions.clickElement(this.selectDatasetField);
    await this.actions.clickElement(`[data-testid="autocomplete-result-${datasetName}"]`);
    await this.page.waitForTimeout(TIMEOUT.SHORT_TIMEOUT);
    await this.actions.clickElement(this.addInput1Button);
    await this.actions.waitForElementVisiblity(this.addInputToDatasetText);
  }
}
