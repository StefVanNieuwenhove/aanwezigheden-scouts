/** @format */

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAcZPOJa1A4UH9taW1dO5wjVjozCMcXyps',
  authDomain: 'scouts-teralwina.firebaseapp.com',
  projectId: 'scouts-teralwina',
  storageBucket: 'scouts-teralwina.appspot.com',
  messagingSenderId: '837880349344',
  appId: '1:837880349344:web:4d09eb2e5a92a98bfc7fc5',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
