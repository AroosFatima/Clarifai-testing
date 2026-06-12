export enum AccountType {
  Internal,
  External,
}

interface Credentials {
  email: string;
  password: string;
}

export interface Account extends Credentials {
  firstName: string;
  lastName: string;
}

export const generateRandomId = (len: number): string => {
  const charSet = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let randomStr = '';

  for (let i = 0; i < len; i += 1) {
    const randomPos = Math.floor(Math.random() * charSet.length);
    randomStr += charSet.slice(randomPos, randomPos + 1);
  }
  return randomStr;
};

export const generateExternalUser = (): Account => {
  const testId = generateRandomId(21);
  const account: Account = {
    email: `clarifai.developer+mrk-${testId}@e2e.cf.ai`,
    password: 'SomeValidPassword!1',
    firstName: `fName-${testId}`,
    lastName: `lName-${testId}`,
  };
  return account;
};

export const generateInternalUser = (): Account => {
  const testId = generateRandomId(21);
  const account: Account = {
    email: `clarifai.automation+mrk-${testId}@clarifai.com`,
    password: 'SomeValidPassword!1',
    firstName: `fName-${testId}`,
    lastName: `lName-${testId}`,
  };
  return account;
};
