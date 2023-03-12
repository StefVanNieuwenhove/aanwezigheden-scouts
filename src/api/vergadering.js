/** @format */

import {
  doc,
  updateDoc,
  setDoc,
  collection,
  getDocs,
  getDoc,
  query,
  where,
  deleteDoc,
  runTransaction,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import db from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';
import { lidAanwezig, lidAfwezig } from './leden';

export const getVergaderingById = async (id) => {
  try {
    if (!id) return;
    const vergadering = await getDoc(doc(db, 'Vergadering', id));
    if (vergadering.exists()) {
      return vergadering.data();
    } else {
      console.log('No such document!');
    }
  } catch (error) {
    console.log(error);
  }
};

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

export const createVergadering = async (
  vergadering,
  leden,
  tak,
  datum,
  user
) => {
  try {
    const id = uuidv4();
    await setDoc(doc(db, 'Vergadering', id), {
      naam: vergadering,
      leden: leden,
      tak: tak,
      datum: datum,
      user: user,
    });
    leden.forEach((lid) => {
      lidAanwezig(lid);
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateVergaderingAddLid = async (id, lid, user) => {
  try {
    await updateDoc(doc(db, 'Vergadering', id), {
      leden: arrayUnion(lid),
    });
    lidAanwezig(lid);
  } catch (error) {
    console.log(error);
  }
};

export const updateVergaderingRemoveLid = async (id, lid, user) => {
  try {
    await updateDoc(doc(db, 'Vergadering', id), {
      leden: arrayRemove(lid),
    });
    lidAfwezig(lid);
  } catch (error) {
    console.log(error);
  }
};

export const deleteVergadering = async (id) => {
  try {
    await deleteDoc(doc(db, 'Vergadering', id));
  } catch (error) {
    console.log(error);
  }
};
