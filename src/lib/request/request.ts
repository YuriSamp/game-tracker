import axios from 'axios';

const email = process.env.NEXT_PUBLIC_API_EMAIL_HEADER;

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'dev-email-address': email,
  },
});

request.defaults.timeout = 5000;

export { request };
