/** @format */

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

/* const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
}; */

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
