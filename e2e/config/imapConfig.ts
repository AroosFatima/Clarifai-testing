import type { ImapSimpleOptions } from 'imap-simple';

export const imapsConfig: ImapSimpleOptions = {
  imap: {
    user: 'postmaster@e2e.cf.ai',
    password: 'sTbLIheLVfW6NFgYoY9DSLvy',
    host: 'mail.e2e.cf.ai',
    port: 993,
    tls: true,
    authTimeout: 5000,
    tlsOptions: {
      rejectUnauthorized: false,
    },
  },
};

export const fetchOptions = {
  bodies: ['HEADER', 'TEXT'],
  markSeen: true,
};

export const pollingOptions = {
  wait_time_sec: 2, // Retry interval in seconds
  max_wait_time_sec: 30, // Retry timeout in seconds
};

export const SENDER_CLARIFAI_BOT_EMAIL = 'support@noreply.clarifai.com';
export const ACCOUNT_VERIFY_EMAIL_SUBJECT = 'Clarifai.com Verify Your E-mail Address';
