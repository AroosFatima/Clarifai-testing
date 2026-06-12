import { test as baseTest } from './BaseCoverage';
import { SignupPage } from '../pages/SignupPage';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { ModelPage } from '../pages/ModelPage';
import { AccountPage } from '../pages/AccountPage';
import { AppPage } from '../pages/AppPage';
import { TasksPage } from '../pages/TasksPage';
import { DataSetPage } from '../pages/DataSet';
import { InputPage } from '../pages/InputPage';
import { WorkflowPage } from '../pages/WorkflowPage';

export const test = baseTest.extend<{
  homePage: HomePage;
  loginPage: LoginPage;
  modelPage: ModelPage;
  signupPage: SignupPage;
  accountPage: AccountPage;
  appPage: AppPage;
  datasetPage: DataSetPage;
  tasksPage: TasksPage;
  inputPage: InputPage;
  workflowPage: WorkflowPage;
}>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  modelPage: async ({ page }, use) => {
    await use(new ModelPage(page));
  },
  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },
  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },
  appPage: async ({ page }, use) => {
    await use(new AppPage(page));
  },
  datasetPage: async ({ page }, use) => {
    await use(new DataSetPage(page));
  },
  tasksPage: async ({ page }, use) => {
    await use(new TasksPage(page));
  },
  inputPage: async ({ page }, use) => {
    await use(new InputPage(page));
  },
  workflowPage: async ({ page }, use) => {
    await use(new WorkflowPage(page));
  },
});

export const expect = test.expect;
