/* eslint-disable import/no-duplicates */
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { FIREBASE_CONFIG } from 'frontend/config';

console.log(FIREBASE_CONFIG);
const firebaseApp = initializeApp(FIREBASE_CONFIG);

export const authInstance = getAuth(firebaseApp);
export const fireStoreInstance = getFirestore(firebaseApp);
