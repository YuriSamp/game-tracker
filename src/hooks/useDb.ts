import {
  addDoc,
  collection,
  updateDoc,
  doc,
  getDoc,
  getDocs,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { useState } from 'react';

export const useDb = () => {
  // const [cache, setCache] = useState<string[]>([]);
  const gamesColletionRef = collection(db, 'games');

  const getDocsFromDb = async () => {
    const games = await getDocs(gamesColletionRef);
    console.log(games.docs.map((doc) => doc.data));
  };

  const addToDb = async (favorite: boolean, gameReview: number, id: number) => {
    const dbEntry = {
      favorite,
      gameReview,
      id,
    };

    try {
      const res = await addDoc(gamesColletionRef, dbEntry);
      console.log(res.id);
      // setCache((prev) => [...prev, res.id]);
      // console.log(cache);
      return;
    } catch (error) {}
  };

  return { addToDb, getDocsFromDb };
};
