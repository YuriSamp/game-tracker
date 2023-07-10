import {
  AuthError,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';

import { auth } from '@/lib/firebase/config';
import { setCookie } from 'nookies';
import { useCallback, useState } from 'react';

const createCookie = (JWT: string) => {
  setCookie(null, 'JWTAuth', JWT as string, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  });
};

export const useAuth = () => {
  const [error, setError] = useState<any>();
  const [user, setUser] = useState<UserCredential>();

  const createUser = useCallback(async (email: string, password: string) => {
    setError(undefined);
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      const JWT = await user?.user.getIdToken();
      createCookie(JWT);
      setUser(user);

      return user;
    } catch (error) {
      setError(error as AuthError);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setError(undefined);
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      const JWT = await user?.user.getIdToken();
      createCookie(JWT);
      setUser(user);

      return user;
    } catch (err) {
      setError(err as AuthError);
    }
  }, []);

  return { login, createUser, user, error };
};
