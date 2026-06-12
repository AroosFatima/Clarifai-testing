export const userData = {
  /// ////////////////////////////////////////////////////////////////////////////////
  stagingPAT: process.env.E2E_STAGING_PAT,
  devPAT: process.env.E2E_DEV_PAT,
  // credentials
  username: process.env.E2E_TEST_USER,
  password: process.env.E2E_TEST_PASS,
  // apicall data
  // Change these to whatever inputs you want to add
  IMAGE_URL_1: 'https://samples.clarifai.com/metro-north.jpg',
  IMAGE_URL_2: 'https://samples.clarifai.com/puppy.jpeg',
  CONCEPT_ID_1: 'person',
  CONCEPT_ID_2: 'dog',

  //    app data
  appdesc: 'Testing',

  // DataSet
  dataSetDesText: 'Testing',

  // task
  taskInstructionText: 'The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.)',

  // Model
  learnRateText: '0.005',
  numEpochsText: '1',
};
