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

export const getLeden = async () => {
  try {
    const leden = [];
    const querySnapshot = await getDocs(collection(db, 'Leden'));
    querySnapshot.forEach((doc) => {
      const lid = { id: doc.id, ...doc.data() };
      leden.push(lid);
    });
    return leden;
  } catch (error) {
    console.error(error);
  }
};

export const getLidById = async (id) => {
  try {
    const lid = await getDoc(doc(db, 'Leden', id));
    if (lid.exists()) {
      const data = { id: lid.id, ...lid.data() };
      return data;
    } else {
      console.log('No such document!');
    }
  } catch (error) {
    console.log(error);
  }
};

export const getLedenByTak = async (tak) => {
  try {
    const leden = [];
    const q = query(collection(db, 'Leden'), where('tak', '==', `${tak}`));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const lid = { id: doc.id, ...doc.data() };
      leden.push(lid);
    });
    return leden;
  } catch (error) {
    console.log(error);
  }
};

export const lidAanwezig = async (id) => {
  try {
    const data = await getDoc(doc(db, 'Leden', id));
    const value = data.data().aanwezig;
    await updateDoc(doc(db, 'Leden', id), {
      aanwezig: value + 1,
    });
  } catch (error) {
    console.log(error);
  }
};

export const lidAfwezig = async (id) => {
  try {
    const data = await getDoc(doc(db, 'Leden', id));
    const value = data.data().aanwezig;
    if (value <= 0) return;
    await updateDoc(doc(db, 'Leden', id), {
      aanwezig: value - 1,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createLid = async ({ voornaam, familienaam, tak }) => {
  try {
    console.log(voornaam, familienaam, tak);
    const id = uuidv4();
    await setDoc(doc(db, 'Leden', id), {
      voornaam: voornaam,
      familienaam: familienaam,
      tak: tak,
      aanwezig: 0,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteLid = async (id) => {
  try {
    await deleteDoc(doc(db, 'Leden', id));
  } catch (error) {
    console.log(error);
  }
};
