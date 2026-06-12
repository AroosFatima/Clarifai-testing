import { TASK_ASSIST, TASK_TYPE } from '../../helpers/types';
import { test, expect } from '../../base/BaseTest';
import { taskName } from '../../pages/TasksPage';

test.describe('Adding Tasks', { tag: ['@data'] }, () => {
  test.use({ storageState: 'e2e/storage-state/clarifaiUser.json' });

  test('Add Task with task type classification', async ({ tasksPage }) => {
    await tasksPage.addTask(TASK_TYPE.CLASSIFICATION);
    const isTaskNameVisible = await tasksPage.actions.isVisible(`text=${taskName}`);
    expect(isTaskNameVisible).toBeTruthy();
  });

  test('Add Task with task type Detection', async ({ tasksPage }) => {
    await tasksPage.addTask(TASK_TYPE.DETECTION);
    const isTaskNameVisible = await tasksPage.actions.isVisible(`text=${taskName}`);
    expect(isTaskNameVisible).toBeTruthy();
  });

  test('Add Task with task type Segmentation', async ({ tasksPage }) => {
    await tasksPage.addTask(TASK_TYPE.SEGMENTATION);
    const isTaskNameVisible = await tasksPage.actions.isVisible(`text=${taskName}`);
    expect(isTaskNameVisible).toBeTruthy();
  });

  test('Add Task with task type Segmentation  and enable Assist Yes', async ({ tasksPage }) => {
    await tasksPage.addTask(TASK_TYPE.SEGMENTATION, TASK_ASSIST.YES);
    const isTaskNameVisible = await tasksPage.actions.isVisible(`text=${taskName}`);
    expect(isTaskNameVisible).toBeTruthy();
  });
});
