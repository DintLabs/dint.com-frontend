
import { getAuth } from "firebase/auth";
import { getDatabase,ref,set } from "firebase/database";
import { initializeApp } from 'firebase/app';

 const firebaseConfig = {
    apiKey: "AIzaSyAEeo_gs2YjZb_2SVCowrA0y_WHSoqg71E",
    authDomain: "dint-3d4ac.firebaseapp.com",
    databaseURL: "https://dint-3d4ac-default-rtdb.firebaseio.com",
    projectId: "dint-3d4ac",
    storageBucket: "dint-3d4ac.appspot.com",
    messagingSenderId: "249686432294",
    appId: "1:249686432294:web:6a939362861134f09264e7"
  };


  const app = initializeApp(firebaseConfig);


export const auth = getAuth();
export const db = getDatabase();

