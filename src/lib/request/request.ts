import axios from 'axios';

const email = process.env.NEXT_PUBLIC_API_EMAIL_HEADER;
const timeout = Number(process.env.NEXT_PUBLIC_TIMEOUT_TIME);
export const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  signal: AbortSignal.timeout(timeout),
  headers: {
    'dev-email-address': email,
  },
});
