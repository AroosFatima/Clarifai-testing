import { Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { TASK_ASSIST, TASK_TYPE, TIMEOUT } from '../helpers/types';
import { AppPage } from './AppPage';
import { userData } from '../helpers/userData';
import { DataSetPage, datasetName } from './DataSet';
import { CommonActions } from '../base/CommonActions';

/* eslint-disable import/no-mutable-exports */
export let taskName = '';

export class TasksPage {
  readonly dataSet: DataSetPage;

  readonly appPage: AppPage;

  readonly page: Page;

  readonly actions: CommonActions;

  readonly sidebarLabelingTaskLink = '[data-testid="appSidebarDesktop"] >> text=Labeling Tasks';

  readonly createNewTaskButton = 'text=Create New Task';

  readonly newLabelingTaskText = 'text=New Labeling Task';

  readonly selectDatasetField = '[data-testid="select-dataset"]';

  readonly taskTypeField = 'button:has-text("Task Type")';

  readonly taskAssistField = "//div[@name='aiAssistOnOff']//button[@type='button']";

  readonly selectConceptField = '[placeholder="Select or add concepts"]';

  readonly selectFirstConcept = "[role='menu'] > [role='menuitem']";

  readonly workFlowField = '[placeholder="Select Workflow"]';

  readonly universalFlow = '[data-testid="content-Universal"]';

  readonly workingTaskWithField = "//div[@name='otherWorkersOnOff']//button[@type='button']";

  readonly noMenu = 'button[role="menuitem"]:has-text("No")';

  readonly taskNameField = '[placeholder="Task Name"]';

  readonly addInstructionButton = '[data-testid="task-creation-form"] >> text=+ Add';

  readonly instructinField = '.ql-editor';

  readonly createTaskButton = 'text=Create Task';

  constructor(page: Page) {
    this.dataSet = new DataSetPage(page);
    this.appPage = new AppPage(page);
    this.page = page;
    this.actions = new CommonActions(page);
  }

  /*
   *
   *   Add task
   *
   */
  async addTask(taskType: TASK_TYPE, taskAssist?: TASK_ASSIST) {
    await this.appPage.goToAppPage();
    await this.appPage.checkIfAppExist();
    await this.dataSet.checkIfDataSetExist();
    // click on labeling tasks sidebar menu
    await this.actions.clickElement(this.sidebarLabelingTaskLink);
    await this.actions.verifyURL('**/tasks');
    // verify the create new task button is visible
    await this.actions.isVisible(this.createNewTaskButton);
    // click on create new task button
    await this.actions.clickElement(this.createNewTaskButton);
    await this.addTaskFunc(taskType, taskAssist);
  }

  /*
   *
   *   Add task function
   *
   */
  async addTaskFunc(taskType: TASK_TYPE, taskAssist: TASK_ASSIST = TASK_ASSIST.NO) {
    // verify we are on new task page
    await this.actions.verifyURL('**/tasks/new');
    await this.actions.isVisible(this.newLabelingTaskText);
    await this.actions.clickElement(this.selectDatasetField);
    await this.actions.clickElement(`text=${datasetName}`);
    // click on task type
    await this.actions.clickElement(this.taskTypeField);
    // select task
    await this.actions.clickElement(`button[role="menuitem"]:has-text("${taskType}")`);
    // click on Would you like to enable AI Assist for this task?
    await this.actions.clickElement(this.taskAssistField);
    await this.actions.clickElement(`button[role="menuitem"]:has-text("${taskAssist}")`);
    // scroll
    await this.page.mouse.wheel(0, 400);
    await this.page.waitForTimeout(TIMEOUT.SHORT_TIMEOUT);

    if (taskAssist === TASK_ASSIST.YES) {
      await this.actions.enterPasteElementText(this.workFlowField, 'Universal');
      // // click on work flow field
      await this.actions.clickElement(this.workFlowField);
      // select first menu
      await this.actions.clickElement(this.universalFlow);
    }
    // type in the concept field
    await this.actions.enterPasteElementText(this.selectConceptField, 'name');
    await this.actions.clickElement(this.selectConceptField);
    // select or create new concept
    await this.actions.clickElement(this.selectFirstConcept);
    // click on Will there be anyone else working on this task with you?
    await this.actions.clickElement(this.workingTaskWithField);
    await this.actions.clickElement(this.noMenu, 1);

    // eslint-disable-next-line no-useless-concat
    taskName = `${'Test' + '-' + 'app' + '-' + 'task' + '-'}${faker.person.firstName()}`;
    await this.actions.enterPasteElementText(this.taskNameField, taskName);

    if (taskAssist === TASK_ASSIST.YES) {
      // click on add task instruction button
      await this.actions.clickElement(this.addInstructionButton);

      // type instructions
      await this.actions.enterPasteElementText(this.instructinField, userData.taskInstructionText);
    }

    await this.page.waitForTimeout(TIMEOUT.SHORT_TIMEOUT);
    await this.actions.clickElement(this.createTaskButton);

    // verify task is created and we are on task page
    await this.actions.verifyURL('**/tasks');
    // verify task name in the table
    await this.actions.waitForElementVisiblity(`text=${taskName}`);
  }
}
