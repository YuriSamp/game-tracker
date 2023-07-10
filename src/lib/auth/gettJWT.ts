import { parseCookies } from 'nookies';

export const getJWT = () => {
  const cookies = parseCookies();
  return cookies.JWTAuth;
};
