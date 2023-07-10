import {
  setDoc,
  collection,
  doc,
  updateDoc,
  getDocs,
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

const INITIAL_STATE_DATA: any[] = [];

export const useDb = () => {
  const [firestoreGames, setFirestoreGames] = useState<dbType[] | undefined>(
    INITIAL_STATE_DATA
  );

  const gamesColletionRef = collection(db, 'games');

  const getDbValues = useCallback(async () => {
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
      console.log(error);
    }
  }, [gamesColletionRef]);

  const addToDb = useCallback(
    async (favorite: boolean, gameReview: number, id: number, JWT: string) => {
      const dbEntry = {
        favorite,
        gameReview,
        id,
        JWT,
      };

      try {
        if (firestoreGames?.filter((game) => game.id === id).length === 1) {
          const docId = firestoreGames?.filter((game) => game.id === id)[0].id;
          await updateDoc(doc(db, 'games', String(docId)), dbEntry);
          return;
        }

        await setDoc(doc(db, 'games', String(id)), dbEntry);
      } catch (error) {
        console.log(error);
      }
    },
    [firestoreGames]
  );

  useEffect(() => {
    getDbValues();
  }, [getDbValues]);

  return { firestoreGames, addToDb };
};
