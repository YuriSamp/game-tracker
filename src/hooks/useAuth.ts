import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase/config';
import { setCookie } from 'nookies';

export const useAuth = () => {
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const createUser = async (email: string, password: string) => {
    try {
      const user = await createUserWithEmailAndPassword(email, password);
      const JWT = await user?.user.getIdToken();

      setCookie(null, 'JWTAuth', JWT as string, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
    } catch (error) {}
  };

  const login = async (email: string, password: string) => {
    try {
      const user = await signInWithEmailAndPassword(email, password);
      const JWT = await user?.user.getIdToken();

      setCookie(null, 'JWTAuth', JWT as string, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
    } catch (error) {}
  };

  return { login, createUser };
};
