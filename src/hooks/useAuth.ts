import {
  AuthError,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { useCallback, useEffect, useState } from 'react';

export const useAuth = () => {
  const [error, setError] = useState<AuthError>();
  const [user, setUser] = useState('');

  const createUser = useCallback(async (email: string, password: string) => {
    setError(undefined);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error as AuthError);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setError(undefined);

    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, email, password);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user?.uid) {
        setUser(user?.uid);
      }
    });
  }, []);

  return { login, createUser, user, error };
};
