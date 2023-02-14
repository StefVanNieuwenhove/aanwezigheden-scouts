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

export const updateVergaderingAddLid = async (id, lid) => {
  try {
    console.log(id, lid);
    const data = await getDoc(doc(db, 'Vergadering', id));
    const leden = data.data().leden;
    leden.push(lid);
    await updateDoc(doc(db, 'Vergadering', id), {
      leden: leden,
    });
    lidAanwezig(lid);
  } catch (error) {
    console.log(error);
  }
};

export const updateVergaderingRemoveLid = async (id, lid) => {
  try {
    const data = await getDoc(doc(db, 'Vergadering', id));
    const leden = data.data().leden;
    const index = leden.indexOf(lid);
    if (index > -1) {
      leden.splice(index, 1);
    }
    await updateDoc(doc(db, 'Vergadering', id), {
      leden: leden,
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
