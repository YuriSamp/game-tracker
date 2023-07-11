import {
  setDoc,
  collection,
  doc,
  updateDoc,
  getDocs,
  FirestoreError,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { getJWT } from '@/lib/auth/gettJWT';
import { useCallback, useEffect, useState } from 'react';

type dbType = {
  favorite: boolean;
  gameReview: number;
  id: number;
  JWT: string;
};

const INITIAL_STATE_DATA: dbType[] = [];

export const useDb = () => {
  const [firestoreGames, setFirestoreGames] = useState<dbType[] | undefined>(
    INITIAL_STATE_DATA
  );
  const [firestoreError, setfirestoreError] = useState<FirestoreError>();

  const getDbValues = useCallback(async () => {
    const gamesColletionRef = collection(db, 'games');
    try {
      const JWT = getJWT();
      if (JWT === undefined) {
        setFirestoreGames(undefined);
      }

      const dbGames = await getDocs(gamesColletionRef);

      setFirestoreGames(
        dbGames?.docs
          .map((doc) => doc.data())
          .filter((doc) => doc.JWT === JWT) as unknown as dbType[]
      );
    } catch (error) {
      setfirestoreError(error as FirestoreError);
    }
  }, []);

  const addToDb = useCallback(
    async (favorite: boolean, gameReview: number, id: number, JWT: string) => {
      const dbEntry = {
        favorite,
        gameReview,
        id,
        JWT,
      };

      try {
        if (
          firestoreGames?.filter((game) => game.id === id && game.JWT === JWT)
            .length === 1
        ) {
          const docId = firestoreGames?.filter((game) => game.id === id)[0].id;
          const firebaseDocID = String(docId) + JWT.slice(-10, -1);
          await updateDoc(doc(db, 'games', firebaseDocID), dbEntry);
          return;
        }

        const firebaseDocID = String(id) + JWT.slice(-10, -1);
        await setDoc(doc(db, 'games', firebaseDocID), dbEntry);
      } catch (error) {
        setfirestoreError(error as FirestoreError);
      }
    },
    [firestoreGames]
  );

  useEffect(() => {
    getDbValues();
  }, [getDbValues]);

  return { firestoreGames, addToDb, firestoreError };
};
