import { userData } from '../userData';

const ENV = process.env.ENV;
let PAT = '';

if (ENV === 'staging' && userData.stagingPAT) {
  PAT = userData.stagingPAT;
} else if (ENV === 'dev' && userData.devPAT) {
  PAT = userData.devPAT;
}

export const headers = {
  'Content-Type': 'application/json',
  Authorization: `Key ${PAT}`,
};
