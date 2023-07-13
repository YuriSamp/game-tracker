import {
  AuthError,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState('');

  const createUser = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await setPersistence(auth, browserLocalPersistence).then(async () =>
        signInWithEmailAndPassword(auth, email, password)
      );
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user?.uid) {
        setUser(user?.uid);
        return;
      }
      setUser('');
    });
  }, []);

  return { login, createUser, user };
};
