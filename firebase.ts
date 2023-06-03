import { getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAAqoK5qCF37f7SFbLRDln27TOlNQU0myU',
  authDomain: 'chatgpt-free-larryh21.firebaseapp.com',
  projectId: 'chatgpt-free-larryh21',
  storageBucket: 'chatgpt-free-larryh21.appspot.com',
  messagingSenderId: '285316896679',
  appId: '1:285316896679:web:bf13b87834021527908882',
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
