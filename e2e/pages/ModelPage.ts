import { faker } from '@faker-js/faker';
import { Page } from '@playwright/test';
import { CommonActions } from '../base/CommonActions';
import { AppPage, appId, userId } from './AppPage';
import {
  addDatabaseVersion,
  addInputsToSpecificDataset,
  annotateNewBoundingBoxInImages,
  createNewApp,
  createNewDataset,
  postInputs,
} from '../helpers/apiCall/postCall';
import { DataSetPage, datasetName } from './DataSet';
import { APPINPUTTYPE, TIMEOUT } from '../helpers/types';
import { testConfig } from '../config/testConfig';
import { userData } from '../helpers/userData';

export class ModelPage {
  readonly actions: CommonActions;

  readonly appPage: AppPage;

  readonly dataSet: DataSetPage;

  readonly page: Page;

  readonly inputTypeFilter = '[data-testid="checkbox-filter-input_fieldsInputType"]';

  readonly modelTypeFilter = '[data-testid="filterBox-ModelType"]';

  readonly outputTypeFilter = '[data-testid="filterBox-Output Type"]';

  readonly sidebarModelLink = '[data-testid="appSidebarDesktop"] >> text=Models';

  readonly addModelButton = 'text=Add Model';

  readonly customModelOpetion = '[data-testid="CUSTOM"]';

  readonly continueButton = '[data-testid="continue"]';

  readonly selectModelTypeText = 'text=Select a model type';

  readonly embeddingModelText = 'text=Create a Transfer Learning Classifier Model';

  readonly visualDetectorModelText = 'text=Create a visual-detector model';

  readonly visualClassifierModelText = 'text=Create a visual-classifier model';

  readonly modelIdField = '[placeholder="Enter a model ID\\.\\.\\."]';

  readonly trainingDatasetField = '[name="train_info.dataset"] > button';

  readonly conceptField = '[placeholder="Select concepts"]';

  readonly selectPersonConcept = `[data-testid="auto-complete-result-${userData.CONCEPT_ID_1}"]`;

  readonly selectPuppyConcept = `[data-testid="auto-complete-result-${userData.CONCEPT_ID_2}"]`;

  readonly mutuallyExclusiveToggle = 'label:has-text("OFF")';

  readonly trainModelButton = 'text=Train Model';

  readonly continueConfigureModel = 'text=Continue to Configure Model';

  readonly modelTrainedText = 'text=Model is trained and ready';

  readonly sidebarWorkflowLink = '[data-testid="appSidebarDesktop"] >> text=Workflows';

  readonly generalImageDetectionText = '[data-testid="link-General-Detection"] >> text=General-Detection';

  readonly workflowUploadActionButton = '[data-testid="upload-action"]';

  readonly tryUploadInput = '[data-testid="inputs-action-bar"] > div[data-dialog="true"] > div';

  readonly workflowUploadInputFile = '[data-testid="uploader-input"]';

  readonly generalDetectionUrl = '**/workflows/General-Detection';

  readonly generalDetectionUploadImageLoading = 'text=Model / Workflow loading in progress...';

  readonly dogImageDetection = 'text=1dog';

  readonly showTrainingSetting = 'text=Show Training Settings (optional)';

  readonly learnRateField = '[placeholder="per_item_lrate"]';

  readonly numEpochsField = '[id="train_info\\.params\\.num_epochs"]';

  readonly hideTrainingSetting = 'text=Hide Training Settings (optional)';

  readonly calculateButton = 'text=Calculate';

  readonly viewResults = 'text=View Results';

  readonly moduleIframe = '[data-testid="module-page-iframe"]';

  readonly evaluateResultText = 'text=Evaluation results';

  readonly evaluateHighlightsText = 'text=Evaluation highlights';

  readonly modelIdExistError = '[data-alert-type="error"]';

  readonly checkedConcept = "//div[@class='check']//*[name()='svg']";

  constructor(page: Page) {
    this.page = page;
    this.actions = new CommonActions(page);
    this.appPage = new AppPage(page);
    this.dataSet = new DataSetPage(page);
  }

  async verifyFilterSectionIsPresent(locator: string): Promise<boolean> {
    return this.actions.isVisible(locator);
  }

  /*
   *
   *  trainTransferLearnModel
   *
   * */
  async trainTransferLearnModel() {
    const images = [userData.IMAGE_URL_1, userData.IMAGE_URL_2];
    const concepts = [userData.CONCEPT_ID_1, userData.CONCEPT_ID_2];
    await this.appPage.goToAppPage();
    await this.appPage.getUserIDFromUrl();
    this.appPage.createRandomAppId();
    await createNewApp();
    // post inputs api call
    await postInputs(images, concepts);
    this.dataSet.createRandomDatasetName();
    await createNewDataset();
    //  add Input To Specific Dataset api call
    await addInputsToSpecificDataset();
    // addDatabaseVersion api call
    await addDatabaseVersion();
    await this.page.reload();
    await this.appPage.searchAppName();
    await this.appPage.clickOnFirstAppCard();
    this.appPage.verifyAppNameOnAppPage();
    await this.clickOnModelSidebarLink();
    await this.clickOnAddModelButton();
    // eslint-disable-next-line no-empty
    if (await this.page.isVisible(this.customModelOpetion)) {
    } else {
      await this.clickOnAddModelButton();
    }
    // select custom model
    await this.actions.clickElement(this.customModelOpetion);
    await this.actions.clickElement(this.continueButton);
    await this.actions.waitForElementVisiblity(this.selectModelTypeText);

    // go  to add  tranfer learn model page
    await this.actions.navigateToURL(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      `${testConfig[process.env.ENV]}/${userId}/${appId}/models/new/embedding-classifier`,
    );

    let model_id = `Test-app-${faker.person.firstName()}-model-${faker.person.firstName()}`;
    await this.actions.waitForElementVisiblity(this.modelIdField);

    await this.actions.enterPasteElementText(this.modelIdField, model_id);
    await this.page.waitForTimeout(TIMEOUT.SHORT_TIMEOUT);
    // if model id is already exist then create new one
    if (await this.page.isVisible(this.modelIdExistError)) {
      model_id = `Test-app-${faker.person.firstName()}-model-${faker.person.firstName()}`;
      await this.actions.enterPasteElementText(this.modelIdField, model_id);
    }
    await this.actions.clickElement(this.continueConfigureModel);
    await this.page.waitForTimeout(TIMEOUT.SHORT_TIMEOUT);
    await this.actions.clickElement(this.trainingDatasetField);

    // select dataset name
    await this.actions.clickElement(`button[role="menuitem"]:has-text("${datasetName}")`);
    // scroll
    await this.page.mouse.wheel(0, 470);
    await this.page.waitForTimeout(TIMEOUT.SHORT_TIMEOUT);

    await this.selectConcepts(concepts);
    await this.page.waitForTimeout(TIMEOUT.SHORT_TIMEOUT);
    // enable  on Concepts mutually_exclusive
    await this.actions.clickElement(this.mutuallyExclusiveToggle);

    await this.page.waitForTimeout(TIMEOUT.SHORT_TIMEOUT);
    await this.actions.clickElement(this.trainModelButton);

    // verify we are on trained model page
    await this.actions.verifyURL(`**/models/${model_id}?tab=versions`);
    await this.actions.waitForElementVisiblity(this.modelTrainedText, -1, 1800000);
  }

  async trainVisualDetectorModel() {
    const images = [userData.IMAGE_URL_1, userData.IMAGE_URL_2];
    const concepts = [userData.CONCEPT_ID_1, userData.CONCEPT_ID_2];

    await this.appPage.goToAppPage();
    await this.appPage.getUserIDFromUrl();
    this.appPage.createRandomAppId();
    await createNewApp();
    // post inputs api call
    await postInputs(images, concepts);

    this.dataSet.createRandomDatasetName();
    await createNewDataset();
    await this.page.waitForTimeout(10000);
    await annotateNewBoundingBoxInImages();
    //  add Input To Specific Dataset api call
    await addInputsToSpecificDataset();
    await this.page.waitForTimeout(3000);
    // addDatabaseVersion api call
    await addDatabaseVersion();
    await this.page.reload();
    await this.appPage.searchAppName();
    await this.appPage.clickOnFirstAppCard();
    this.appPage.verifyAppNameOnAppPage();
    await this.clickOnModelSidebarLink();
    await this.clickOnAddModelButton();
    // eslint-disable-next-line no-empty
    if (await this.page.isVisible(this.customModelOpetion)) {
    } else {
      await this.clickOnAddModelButton();
    }
    // select custom model
    await this.actions.clickElement(this.customModelOpetion);
    await this.actions.clickElement(this.continueButton);
    await this.actions.waitForElementVisiblity(this.selectModelTypeText);

    // go  to add  tranfer learn model page
    await this.actions.navigateToURL(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      `${testConfig[process.env.ENV]}/${userId}/${appId}/models/new/visual-detector`,
    );

    let model_id = `Test-app-${faker.person.firstName()}-model-${faker.person.firstName()}`;
    await this.actions.waitForElementVisiblity(this.modelIdField);

    await this.actions.enterPasteElementText(this.modelIdField, model_id);
    await this.page.waitForTimeout(TIMEOUT.SHORT_TIMEOUT);
    // if model id is already exist then create new one
    if (await this.page.isVisible(this.modelIdExistError)) {
      model_id = `Test-app-${faker.person.firstName()}-model-${faker.person.firstName()}`;
      await this.actions.enterPasteElementText(this.modelIdField, model_id);
    }
    await this.actions.clickElement(this.continueConfigureModel);
    await this.page.waitForTimeout(TIMEOUT.SHORT_TIMEOUT);

    await this.actions.clickElement(this.trainingDatasetField);

    // select dataset name
    await this.actions.clickElement(`button[role="menuitem"]:has-text("${datasetName}")`);
    // scroll
    await this.page.mouse.wheel(0, 470);
    await this.page.waitForTimeout(TIMEOUT.SHORT_TIMEOUT);
    await this.selectConcepts(concepts);
    await this.page.waitForTimeout(TIMEOUT.SHORT_TIMEOUT);

    await this.actions.clickElement(this.trainModelButton);

    // verify we are on trained model page
    await this.actions.verifyURL(`**/models/${model_id}?tab=versions`);
    await this.actions.waitForElementVisiblity(this.modelTrainedText, -1, 1800000);
  }

  async trainVisualClassifierModel() {
    const images = [userData.IMAGE_URL_1, userData.IMAGE_URL_2];
    const concepts = [userData.CONCEPT_ID_1, userData.CONCEPT_ID_2];

    await this.appPage.goToAppPage();
    await this.appPage.getUserIDFromUrl();
    this.appPage.createRandomAppId();
    await createNewApp();
    // post inputs api call
    await postInputs(images, concepts);

    this.dataSet.createRandomDatasetName();
    await createNewDataset();
    //  add Input To Specific Dataset api call
    await addInputsToSpecificDataset();
    await this.page.waitForTimeout(3000);
    // addDatabaseVersion api call
    await addDatabaseVersion();
    await this.page.reload();
    await this.appPage.searchAppName();
    await this.appPage.clickOnFirstAppCard();
    this.appPage.verifyAppNameOnAppPage();
    await this.clickOnModelSidebarLink();
    await this.clickOnAddModelButton();

    // eslint-disable-next-line no-empty
    if (await this.page.isVisible(this.customModelOpetion)) {
    } else {
      await this.clickOnAddModelButton();
    }
    // select custom model
    await this.actions.clickElement(this.customModelOpetion);
    await this.actions.clickElement(this.continueButton);
    await this.actions.waitForElementVisiblity(this.selectModelTypeText);

    // go  to add  tranfer learn model page
    await this.actions.navigateToURL(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      `${testConfig[process.env.ENV]}/${userId}/${appId}/models/new/visual-classifier`,
    );
    let model_id = `Test-app-${faker.person.firstName()}-model-${faker.person.firstName()}`;
    await this.actions.waitForElementVisiblity(this.modelIdField);

    await this.actions.enterPasteElementText(this.modelIdField, model_id);
    await this.page.waitForTimeout(TIMEOUT.SHORT_TIMEOUT);
    // if model id is already exist then create new one
    if (await this.page.isVisible(this.modelIdExistError)) {
      model_id = `Test-app-${faker.person.firstName()}-model-${faker.person.firstName()}`;
      await this.actions.enterPasteElementText(this.modelIdField, model_id);
    }
    await this.actions.clickElement(this.continueConfigureModel);
    await this.page.waitForTimeout(TIMEOUT.SHORT_TIMEOUT);
    await this.actions.clickElement(this.trainingDatasetField);

    // select dataset name
    await this.actions.clickElement(`button[role="menuitem"]:has-text("${datasetName}")`);
    // scroll
    await this.page.mouse.wheel(0, 400);
    await this.page.waitForTimeout(TIMEOUT.SHORT_TIMEOUT);
    await this.selectConcepts(concepts);
    await this.page.waitForTimeout(TIMEOUT.SHORT_TIMEOUT);
    // Click text=Show Training Settings (optional)
    await this.actions.clickElement(this.showTrainingSetting);
    await this.actions.enterPasteElementText(this.learnRateField, userData.learnRateText);
    await this.actions.enterPasteElementText(this.numEpochsField, userData.numEpochsText);
    await this.actions.clickElement(this.hideTrainingSetting);
    await this.page.waitForTimeout(TIMEOUT.SHORT_TIMEOUT);
    // Click text=Train Model
    await this.actions.clickElement(this.trainModelButton);
    await this.actions.waitForElementVisiblity(this.modelTrainedText, -1, 1800000);
  }

  async evaluateVisualClassifierModel() {
    await this.page.waitForTimeout(TIMEOUT.SHORT_TIMEOUT);
    await this.actions.clickElement(this.calculateButton);
    await this.page.waitForTimeout(TIMEOUT.SHORT_TIMEOUT);
    await this.page.reload();
    await this.page.waitForTimeout(TIMEOUT.MEDIUM_TIMEOUT);
    await this.page.reload();
    await this.page.waitForTimeout(TIMEOUT.MEDIUM_TIMEOUT);
    await this.page.reload();
    await this.actions.waitForElementVisiblity(this.viewResults, 0, 200000);
    await this.actions.clickElement(this.viewResults);
    await this.actions.waitForIframeElementVisiblity(this.moduleIframe, this.evaluateResultText);
    await this.actions.waitForIframeElementVisiblity(this.moduleIframe, this.evaluateHighlightsText);
    await this.page.waitForTimeout(TIMEOUT.SHORT_TIMEOUT);
  }

  async clickOnModelSidebarLink() {
    await this.actions.clickElement(this.sidebarModelLink);
  }

  async clickOnAddModelButton() {
    await this.actions.waitForElementVisiblity(this.addModelButton);
    await this.page.waitForTimeout(TIMEOUT.SHORT_TIMEOUT);
    // click add model button
    await this.actions.clickElement(this.addModelButton);
  }

  async generalImageDetection() {
    const workflowType = { changeType: true, type: 'General-Detection' };
    await this.appPage.createApp(APPINPUTTYPE.IMAGE_TYPE, workflowType);
    // click on workflows sidebarbar menu
    await this.actions.clickElement(this.sidebarWorkflowLink);
    await this.actions.waitForElementVisiblity(this.generalImageDetectionText);
    // click on link-General-Detection
    await this.actions.clickElement(this.generalImageDetectionText);

    await this.actions.verifyURL(this.generalDetectionUrl);
    await this.page.waitForTimeout(TIMEOUT.SHORT_TIMEOUT);
    await this.actions.clickElement(this.workflowUploadActionButton);
    await this.page.waitForTimeout(TIMEOUT.SHORT_TIMEOUT);
    await this.actions.clickElement(this.tryUploadInput, 1);
    await this.page.waitForTimeout(TIMEOUT.SHORT_TIMEOUT);
    //  upload image
    await this.actions.selectFileToUpload(this.workflowUploadInputFile, 'e2e/helpers/files/puppy.jpeg');
    await this.page.waitForTimeout(TIMEOUT.SHORT_TIMEOUT);
    await this.actions.waitForElementVisiblity(this.dogImageDetection);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async selectConcepts(concepts: any) {
    // eslint-disable-next-line unicorn/no-for-loop, no-plusplus
    for (let i = 0; i < concepts.length; i++) {
      await this.actions.enterPasteElementText(this.conceptField, '');
      await this.page.waitForTimeout(TIMEOUT.SHORT_TIMEOUT);
      if (i === 0) {
        // click on concept field
        await this.actions.enterPasteElementText(this.conceptField, concepts[i]);
        await this.actions.clickElement(this.conceptField);
        if ((await this.page.isVisible(this.checkedConcept)) !== true) {
          // select some options
          await this.actions.clickElement(`[data-testid="auto-complete-result-${concepts[i]}"]`);
        }
      } else {
        await this.actions.enterPasteElementText(this.conceptField, concepts[i]);
        if ((await this.page.isVisible(this.checkedConcept)) !== true) {
          // select some options
          await this.actions.clickElement(`[data-testid="auto-complete-result-${concepts[i]}"]`);
        }
      }
    }

    // again click on concept field to close the dropdown
    await this.actions.clickElement(this.conceptField);
  }
}
