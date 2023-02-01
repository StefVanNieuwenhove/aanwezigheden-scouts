/** @format */

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCt0esEO27gupFxsMmg6an7scpd36q5JAY',
  authDomain: 'aanwezigheden-scouts-client.firebaseapp.com',
  projectId: 'aanwezigheden-scouts-client',
  storageBucket: 'aanwezigheden-scouts-client.appspot.com',
  messagingSenderId: '799038011769',
  appId: '1:799038011769:web:5a58712a1e7eb4a48a17a8',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
