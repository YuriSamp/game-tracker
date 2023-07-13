import { setDoc, doc, FirestoreError, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';

type userPreferences = {
  [key: number]: {
    favorite: boolean;
    gameReview: number;
  };
};

const collection = 'userPreferences';

export const useDb = () => {
  const [userPreferences, setUserPreferneces] = useState<userPreferences>({});
  const [firestoreError, setfirestoreError] = useState<FirestoreError>();
  const { user } = useAuth();

  const saveUserPreferences = async (
    id: number,
    gamePrefernece: { favorite: boolean; gameReview: number },
    preferences: userPreferences
  ) => {
    const dbEntry = {
      ...preferences,
      [id]: gamePrefernece,
    };

    try {
      await setDoc(doc(db, collection, user), dbEntry);
      setUserPreferneces(dbEntry);
    } catch (error) {
      setfirestoreError(error as FirestoreError);
    }
  };

  useEffect(() => {
    const getGames = async () => {
      const docRef = doc(db, collection, user);
      const _userPreferences = await getDoc(docRef);

      if (_userPreferences.exists()) {
        setUserPreferneces(_userPreferences.data());
      }
    };

    if (user) {
      getGames();
      return;
    }
    setUserPreferneces({});
  }, [user]);

  return {
    userPreferences,
    saveUserPreferences,
    firestoreError,
  };
};
