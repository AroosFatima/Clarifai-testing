export type TestEnv = 'development' | 'staging' | 'local';

export enum TIMEOUT {
  SELECTOR_TIMEOUT = 30000,
  URL_TIMEOUT = 50000,
  SHORT_TIMEOUT = 5000,
  MEDIUM_TIMEOUT = 10000,
  LONG_TIMEOUT = 30000,
}

export enum APPINPUTTYPE {
  IMAGE_TYPE = 'Image/Video',
  TEXT_TYPE = 'Text/Document',
}

export enum TASK_TYPE {
  CLASSIFICATION = 'Classification',
  DETECTION = 'Detection',
  SEGMENTATION = 'Segmentation',
}

export enum TASK_ASSIST {
  NO = 'No',
  YES = 'Yes',
}

export enum SHARING_TASK {
  NO = 'No',
  YES = 'Yes',
}
export enum INPUT_TYPES {
  FILES = 'files',
  TEXT = 'text',
  URL = 'url',
}

export enum CONCEPTNAMES {
  CAT = 'cat',
  DOG = 'dog',
  PERSON = 'person',
}

export type WORKFLOWTYPE = { changeType: boolean; type: string };

export type UPLOADFILETYPE =
  | string
  | string[]
  | { name: string; mimeType: string; buffer: Buffer }
  | { name: string; mimeType: string; buffer: Buffer }[];
