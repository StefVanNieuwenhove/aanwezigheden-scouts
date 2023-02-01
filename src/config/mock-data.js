/** @format */

import { collection, doc, setDoc } from 'firebase/firestore';
import db from './firebase';
import { v4 as uuidv4 } from 'uuid';

const collectionRef = collection(db, 'Leden');

const seed = async () => {
  await setDoc(doc(collectionRef, uuidv4()), {
    firstname: 'John',
    lastname: 'Doe',
    tak: 'kapoen',
    aanwezig: 0,
  });
  await setDoc(doc(collectionRef, uuidv4()), {
    firstname: 'Tom',
    lastname: 'Tommen',
    tak: 'wouter',
    aanwezig: 0,
  });
};
