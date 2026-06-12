/* eslint-disable no-await-in-loop */
import * as imaps from 'imap-simple';
import { promisify } from 'util';
import { imapsConfig, fetchOptions, pollingOptions, SENDER_CLARIFAI_BOT_EMAIL, ACCOUNT_VERIFY_EMAIL_SUBJECT } from '../config/imapConfig';

const SENDER_EMAIL = SENDER_CLARIFAI_BOT_EMAIL;
const SUBJECT_EMAIL = ACCOUNT_VERIFY_EMAIL_SUBJECT;

export async function checkEmailInbox(toEmail: string, searchEmailType: 'SEEN' | 'UNSEEN' = 'UNSEEN'): Promise<imaps.MessageBodyPart[][]> {
  const searchCriteria = [searchEmailType, ['TO', toEmail], ['FROM', SENDER_EMAIL], ['SUBJECT', SUBJECT_EMAIL]];
  const connection = await imaps.connect(imapsConfig);
  console.log('Connected to email server!');
  await connection.openBox('INBOX');

  let found_emails: imaps.MessageBodyPart[][] = null;
  let done_waiting_time = 0;
  do {
    const results = await connection.search(searchCriteria, fetchOptions);
    const emails = results.map((res) => res.parts.filter((part) => part.which === 'TEXT'));
    if (emails.length > 0) {
      found_emails = emails;
      console.log('Found emails!');
      connection.end();
      break;
    }
    done_waiting_time += pollingOptions.wait_time_sec;
    if (done_waiting_time >= pollingOptions.max_wait_time_sec) {
      connection.end();
      console.log('Timeout, found no emails.');
      break;
    }
    await promisify(setTimeout)(pollingOptions.wait_time_sec * 1000);
  } while (!found_emails);

  return found_emails;
}

export const getVerifyEmailKeyFromEmail = (email: imaps.MessageBodyPart[]): string => {
  const rawtext = email[0].body as string;
  const expression = /(?<=verify-email\?key=3d)([^ ]+)/i;
  const replaceExpression = /=\s+/;
  console.log(rawtext.match(expression)[0]);
  const key = rawtext.match(expression)[0].replace(replaceExpression, '');
  return key;
};
