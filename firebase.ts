import { getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
