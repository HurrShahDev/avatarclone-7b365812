import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCDlDH0RhXIUBCnIDuFBguLm4WlWJr8MUk",
  authDomain: "avatarclone-7ab30.firebaseapp.com",
  projectId: "avatarclone-7ab30",
  storageBucket: "avatarclone-7ab30.firebasestorage.app",
  messagingSenderId: "1001756020640",
  appId: "1:1001756020640:web:3206e5ce4df89ff9ff9ec5",
  measurementId: "G-N5PVCGT0B0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
