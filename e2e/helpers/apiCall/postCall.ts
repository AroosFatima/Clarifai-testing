import { testConfig } from '../../config/testConfig';
import { appId, userId } from '../../pages/AppPage';
import { datasetName } from '../../pages/DataSet';
import { userData } from '../userData';
import { headers } from './headers';

const ENV = process.env.ENV;
let apiBaseUrl = '';

if (ENV === 'staging') {
  apiBaseUrl = testConfig.stagingApiBaseUrl;
} else if (ENV === 'dev') {
  apiBaseUrl = testConfig.devApiBaseUrl;
}

const input_id_arr: string[] = [];

export async function createNewApp(workflow: string = 'Universal') {
  const raw = JSON.stringify({ apps: [{ id: appId, description: 'testing', default_language: 'en', default_workflow_id: workflow }] });

  const requestOptions = {
    method: 'POST',
    body: raw,
    headers,
  };

  await fetch(`${apiBaseUrl}/users/${userId}/apps`, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.log(`Error in create New App  APi ======>`, error);
    });
}

export async function createNewDataset() {
  const raw = JSON.stringify({ datasets: [{ id: datasetName, description: 'testing' }] });

  const requestOptions = {
    method: 'POST',
    body: raw,
    headers,
  };

  await fetch(`${apiBaseUrl}/users/${userId}/apps/${appId}/datasets`, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.log(`Erro while creating New Dataset ====>`, error);
    });
}

// post multiple inputs with multiple concepts
export async function postInputs(images: string[], concepts: string[]) {
  const data = [];
  // eslint-disable-next-line unicorn/no-for-loop, no-plusplus
  for (let i = 0; i < images.length; i++) {
    data.push({
      data: {
        image: {
          url: images[i],
          allow_duplicate_url: true,
        },
        concepts: [
          {
            id: concepts[i],
            value: 1,
          },
        ],
      },
    });
  }
  const raw = JSON.stringify({
    inputs: data,
  });

  const requestOptions = {
    method: 'POST',
    body: raw,
    headers,
  };

  await fetch(`${apiBaseUrl}/users/${userId}/apps/${appId}/inputs`, requestOptions)
    .then((response) => response.json())
    // eslint-disable-next-line promise/always-return, @typescript-eslint/no-explicit-any
    .then((result: any) => {
      result.inputs.forEach((item: { id: string }) => {
        input_id_arr.push(item.id);
      });
    })
    .catch((error) => {
      console.log('Error in Post inputs api', error);
    });
}

// Add input to specific dataset
// index indicate the specific input to be added in the specific dataset
export async function addInputsToSpecificDataset() {
  const data = [];
  for (const element of input_id_arr) {
    data.push({
      input: {
        id: element,
      },
    });
  }
  const raw = JSON.stringify({
    dataset_inputs: data,
  });

  const requestOptions = {
    method: 'POST',
    body: raw,
    headers,
  };

  await fetch(`${apiBaseUrl}/users/${userId}/apps/${appId}/datasets/${datasetName}/inputs`, requestOptions)
    .then((response) => response.text())
    .catch((error) => {
      console.log(`Error while adding Input To Specific Dataset =====>`, error);
    });
}

// Add database version
export async function addDatabaseVersion() {
  const raw = JSON.stringify({
    dataset_versions: [
      {
        id: `dataset-version-${Date.now()}`,
        description: 'New dataset version',
      },
    ],
  });

  const requestOptions = {
    method: 'POST',
    body: raw,
    headers,
  };

  await fetch(`${apiBaseUrl}/users/${userId}/apps/${appId}/datasets/${datasetName}/versions`, requestOptions)
    .then((response) => response.text())
    .catch((error) => {
      console.log(`Error while adding Database Version ======>`, error);
    });
}

export async function annotateNewBoundingBoxInImages() {
  const raw = JSON.stringify({
    annotations: [
      {
        input_id: input_id_arr[0],
        data: {
          regions: [
            {
              region_info: {
                bounding_box: {
                  top_row: 0.5,
                  left_col: 0.63,
                  bottom_row: 0.7,
                  right_col: 0.7,
                },
              },
              data: {
                concepts: [
                  {
                    id: userData.CONCEPT_ID_1,
                    value: 1,
                  },
                ],
              },
            },
          ],
        },
      },
      {
        input_id: input_id_arr[1],
        data: {
          regions: [
            {
              region_info: {
                bounding_box: {
                  top_row: 0.1,
                  left_col: 0.3,
                  bottom_row: 0.9,
                  right_col: 0.65,
                },
              },
              data: {
                concepts: [
                  {
                    id: userData.CONCEPT_ID_2,
                    value: 1,
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  });

  const requestOptions = {
    method: 'POST',
    body: raw,
    headers,
  };

  await fetch(`${apiBaseUrl}/users/${userId}/apps/${appId}/annotations`, requestOptions)
    .then((response) => response.text())
    .catch((error) => {
      console.log(`annotateNewBoundingBoxInImages APi error`, error);
    });
}
