import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase/config';
import { setCookie } from 'nookies';

const createCookie = (JWT: string) => {
  setCookie(null, 'JWTAuth', JWT as string, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  });
};

export const useAuth = () => {
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const createUser = async (email: string, password: string) => {
    try {
      const user = await createUserWithEmailAndPassword(email, password);
      const JWT = await user?.user.getIdToken();
      if (JWT) {
        createCookie(JWT);
        return;
      }
      throw Error('Sem JWT pra você');
    } catch (error) {}
  };

  const login = async (email: string, password: string) => {
    try {
      const user = await signInWithEmailAndPassword(email, password);
      const JWT = await user?.user.getIdToken();

      if (JWT) {
        createCookie(JWT);
        return;
      }
      throw Error('Sem JWT pra você');
    } catch (error) {}
  };

  return { login, createUser };
};
