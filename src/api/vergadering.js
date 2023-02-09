/** @format */

import {
  doc,
  updateDoc,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
  getDoc,
  query,
  where,
} from 'firebase/firestore';
import db from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';
import { lidAanwezig } from './leden';

export const getVergaderingByTak = async (tak) => {
  try {
    const vergaderingen = [];
    const q = query(
      collection(db, 'Vergadering'),
      where('tak', '==', `${tak}`)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const vergadering = { id: doc.id, ...doc.data() };
      vergaderingen.push(vergadering);
    });
    return vergaderingen;
  } catch (error) {
    console.log(error);
  }
};

export const createVergadering = async (vergadering, leden, tak, datum) => {
  try {
    const id = uuidv4();
    await setDoc(doc(db, 'Vergadering', id), {
      naam: vergadering,
      leden: leden,
      tak: tak,
      datum: datum,
    });
    leden.map((lid) => {
      lidAanwezig(lid);
    });
  } catch (error) {
    console.log(error);
  }
};
